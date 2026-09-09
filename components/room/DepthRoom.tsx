'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
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

const vert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
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
  varying vec2 vUv;

  void main() {
    // Zoom suave (1.07x) para que o deslocamento de paralaxe nunca exponha bordas clamping
    vec2 centeredUv = (vUv - 0.5) * 0.93 + 0.5;
    vec2 uv = centeredUv;
    float depth = texture2D(uDepth, uv).r;
    for (int i = 0; i < 8; i++) {
      uv = centeredUv + uOffset * uStrength * (depth - 0.5);
      depth = texture2D(uDepth, uv).r;
    }

    vec4 base = texture2D(uImage, uv);

    // Dia -> noite. O que está longe (janela exterior) escurece antes do que está dentro.
    float far = 1.0 - depth;
    vec3 night = base.rgb * vec3(0.18, 0.25, 0.38);
    night *= mix(1.0, 0.32, far);

    // Iluminação noturna aconchegante: spots de teto e abajur
    float warmPool = smoothstep(0.28, 0.95, depth) * 0.52;
    // Fluxo do ar condicionado: brisa fresca emanando do split no alto à esquerda (UV ~ 0.21, 0.73)
    float acDist = distance(uv, vec2(0.21, 0.73));
    float acBreeze = smoothstep(0.48, 0.04, acDist) * 0.32;
    float coolFlow = smoothstep(0.15, 0.85, 1.0 - vUv.y) * 0.16 + acBreeze;
    night += uWarm * warmPool + uCool * coolFlow;

    vec3 color = mix(base.rgb, night, uNight);

    // Leve vinheta cinematográfica
    float d = distance(vUv, vec2(0.5));
    color *= 1.0 - smoothstep(0.42, 0.98, d) * 0.28;

    gl_FragColor = vec4(color, 1.0);
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
  const { viewport, size } = useThree();
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
        },
      }),
    [image, depth]
  );

  const target = useRef(new THREE.Vector2());

  useFrame((state, delta) => {
    const d = driver.current;
    const u = material.uniforms;

    // O ponteiro empurra a paralaxe; o scroll empurra a hora do dia.
    target.current.set(-d.px * 0.5, -d.py * 0.35);
    (u.uOffset.value as THREE.Vector2).lerp(
      target.current,
      1 - Math.pow(0.0015, delta)
    );

    // a paralaxe respira um pouco sozinha, para a cena nunca ficar morta
    const t = state.clock.elapsedTime;
    (u.uOffset.value as THREE.Vector2).x += Math.sin(t * 0.22) * 0.012;
    (u.uOffset.value as THREE.Vector2).y += Math.cos(t * 0.17) * 0.008;

    u.uNight.value += (d.p - u.uNight.value) * (1 - Math.pow(0.004, delta));
  });

  // o plano preenche a viewport inteira, recortando como object-fit: cover
  const aspect = size.width / size.height;
  const w = viewport.width;
  const h = viewport.height;
  const planeAspect = 16 / 9;
  const scale: [number, number, number] =
    aspect > planeAspect ? [w, w / planeAspect, 1] : [h * planeAspect, h, 1];

  return (
    <mesh ref={mesh} material={material} scale={scale}>
      <planeGeometry args={[1, 1, 1, 1]} />
    </mesh>
  );
}
