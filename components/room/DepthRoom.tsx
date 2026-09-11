'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomDriver } from './Room';

/*
  Deslocamento por profundidade: uma foto real ganha paralaxe de verdade.

  O plano recebe duas texturas — a foto e um mapa de profundidade em tons de
  cinza (branco = perto, preto = longe). No fragment shader, a UV de cada
  pixel é deslocada na direção do olhar proporcionalmente à profundidade
  daquele ponto. Mover a câmera empurra o primeiro plano mais que o fundo, e
  o cérebro lê aquilo como volume.

  É a mesma ideia das "fotos 3D": nenhum modelo, nenhuma malha — só uma
  imagem que sabe onde é fundo e onde é frente.
*/

/*
  Quad em espaço de tela: a foto cobre a viewport inteira sem depender da
  câmera. Antes o plano ficava no mundo 3D e a câmera, inclinada para baixo,
  enxergava um trapézio — sobravam cunhas diagonais nas bordas.
*/
const vert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy * 2.0, 0.0, 1.0);
  }
`;

const frag = /* glsl */ `
  uniform sampler2D uImage;
  uniform sampler2D uDepth;
  uniform vec2  uOffset;      // deslocamento do ponteiro / da câmera
  uniform float uStrength;    // quanto a paralaxe empurra
  uniform float uNight;       // 0 dia, 1 noite
  uniform vec3  uWarm;        // cor das luminárias
  uniform vec3  uCool;        // cor do ar frio
  uniform float uScreenAspect;
  uniform float uImageAspect;
  uniform vec2  uFocus;       // onde o recorte se ancora quando a tela é estreita
  varying vec2 vUv;

  void main() {
    // object-fit: cover — a região visível da foto tem o formato da tela,
    // ancorada no foco e presa dentro da imagem
    float r = uScreenAspect / uImageAspect;
    vec2 fit = r > 1.0 ? vec2(1.0, 1.0 / r) : vec2(r, 1.0);
    vec2 center = clamp(uFocus, fit * 0.5, 1.0 - fit * 0.5);

    // 0.93: margem para que a paralaxe nunca empurre a amostra para fora da foto
    vec2 centeredUv = center + (vUv - 0.5) * fit * 0.93;
    vec2 uv = centeredUv;
    float depth = texture2D(uDepth, uv).r;
    for (int i = 0; i < 8; i++) {
      uv = centeredUv + uOffset * uStrength * (depth - 0.5);
      depth = texture2D(uDepth, uv).r;
    }

    vec4 base = texture2D(uImage, uv);

    /*
      Noite. A luz MULTIPLICA a superfície em vez de somar uma cor por cima:
      somar cor chapada é neblina; multiplicar é o abajur iluminando o tecido
      do sofá com a textura do próprio sofá. Isso é o que dá o aconchego.
      Tudo aqui está em espaço linear (a conversão para sRGB vem no fim).
    */
    vec3 albedo = base.rgb;
    float far = 1.0 - depth;

    // corrige a proporção para as poças de luz saírem redondas, não ovais
    vec2 asp = vec2(1.79, 1.0);

    // ambiente frio e fraco — o que está longe (janela, fundo) apaga primeiro
    vec3 ambient = vec3(0.045, 0.07, 0.13) * mix(1.0, 0.4, far);

    // abajur de pé ao lado do sofá: a poça quente principal
    float lamp = smoothstep(0.46, 0.0, distance(uv * asp, vec2(0.305, 0.57) * asp));
    // o próprio cúpula do abajur acesa
    float shade = smoothstep(0.045, 0.0, distance(uv * asp, vec2(0.305, 0.575) * asp));
    // luz de cava no forro: um banho quente e suave vindo de cima
    float cove = smoothstep(0.62, 1.0, vUv.y) * 0.5;

    vec3 warm = uWarm * (lamp * 1.5 + cove);

    // o split respira ar frio no alto à esquerda
    float breeze = smoothstep(0.34, 0.0, distance(uv * asp, vec2(0.211, 0.745) * asp));
    vec3 cool = uCool * breeze * 0.85;

    vec3 night = albedo * (ambient + warm + cool) + uWarm * shade * 0.6;

    /*
      Linha do tempo, no mesmo relógio do placar do hero:
        0.00–0.30  dia, a foto como ela é
        0.25–0.66  pôr do sol: dourado e mais baixo — o sol vai, o calor fica
        0.68       o ar liga (placar vira 18°C) — só aqui a sala esfria
        0.64–0.94  noite fria e aconchegante
    */
    float p = clamp(uNight, 0.0, 1.0);
    float dusk = smoothstep(0.25, 0.55, p) * (1.0 - smoothstep(0.66, 0.9, p));
    vec3 day = albedo * mix(vec3(1.0), vec3(0.62, 0.44, 0.30), dusk);

    // Misturar em linear faz o escuro chegar só no fim: metade do valor
    // linear parece ~75% do brilho para o olho. A curva devolve a mistura
    // ao que se percebe — metade do caminho parece metade da luz.
    float nightK = smoothstep(0.64, 0.94, p);
    nightK = 1.0 - pow(1.0 - nightK, 2.2);

    vec3 color = mix(day, night, nightK);

    // Leve vinheta cinematográfica
    float d = distance(vUv, vec2(0.5));
    color *= 1.0 - smoothstep(0.42, 0.98, d) * 0.28;

    gl_FragColor = vec4(color, 1.0);

    // A foto é lida como sRGB e convertida para linear no sampling; sem
    // converter de volta aqui, os meios-tons saem afundados e a sala de
    // meio-dia aparece com cara de fim de tarde.
    #include <colorspace_fragment>
  }
`;

export default function DepthRoom({
  driver,
  imageUrl,
  depthUrl,
}: {
  driver: React.MutableRefObject<RoomDriver>;
  imageUrl: string;
  depthUrl: string;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  const [image, depth] = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const a = loader.load(imageUrl);
    const b = loader.load(depthUrl);
    for (const t of [a, b]) {
      t.minFilter = THREE.LinearFilter;
      t.magFilter = THREE.LinearFilter;
      t.wrapS = THREE.ClampToEdgeWrapping;
      t.wrapT = THREE.ClampToEdgeWrapping;
    }
    a.colorSpace = THREE.SRGBColorSpace;
    return [a, b];
  }, [imageUrl, depthUrl]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vert,
        fragmentShader: frag,
        uniforms: {
          uImage: { value: image },
          uDepth: { value: depth },
          uOffset: { value: new THREE.Vector2(0, 0) },
          uStrength: { value: 0.085 },
          uNight: { value: 0 },
          uWarm: { value: new THREE.Color('#ff9d4d') },
          uCool: { value: new THREE.Color('#2b7fd4') },
          uScreenAspect: { value: 16 / 9 },
          uImageAspect: { value: 1376 / 768 },
          uFocus: { value: new THREE.Vector2(0.5, 0.5) },
        },
        depthTest: false,
        depthWrite: false,
      }),
    [image, depth]
  );

  const target = useRef(new THREE.Vector2());

  useFrame((state, delta) => {
    const d = driver.current;
    const u = material.uniforms;

    const screen = state.size.width / Math.max(1, state.size.height);
    u.uScreenAspect.value = screen;

    const img = image.image as HTMLImageElement | undefined;
    if (img && img.width) u.uImageAspect.value = img.width / img.height;

    /*
      Em tela estreita (celular em pé) só cabe uma fatia da foto. O recorte
      ancora à esquerda do centro para manter o split e o abajur em cena —
      são eles que contam a história do ar ligando e da noite aconchegante.
      0.28 é o menor foco que ainda mostra o split inteiro num celular de
      375px (a quina esquerda dele fica em x ≈ 0.17 da foto).
    */
    (u.uFocus.value as THREE.Vector2).set(screen < 1 ? 0.28 : 0.5, 0.5);

    // O ponteiro empurra a paralaxe; o scroll empurra a hora do dia.
    // O respiro entra no alvo, e não somado a cada quadro: somado, a
    // amplitude dobrava em telas de 120 Hz.
    const t = state.clock.elapsedTime;
    target.current.set(
      -d.px * 0.5 + Math.sin(t * 0.22) * 0.1,
      -d.py * 0.35 + Math.cos(t * 0.17) * 0.07
    );
    (u.uOffset.value as THREE.Vector2).lerp(
      target.current,
      1 - Math.pow(0.0015, delta)
    );

    u.uNight.value += (d.p - u.uNight.value) * (1 - Math.pow(0.004, delta));
  });

  // quad unitário: o vertex shader leva direto para espaço de tela
  return (
    <mesh ref={mesh} material={material} frustumCulled={false}>
      <planeGeometry args={[1, 1, 1, 1]} />
    </mesh>
  );
}
