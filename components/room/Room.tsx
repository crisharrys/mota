'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/*
  A sala. Um valor só governa tudo: p (0 = 15h com sol batendo, 1 = noite
  climatizada e aconchegante). O sol desce, o split acorda por volta de p=0.5,
  o ar frio começa a sair e as luminárias quentes assumem.

  Nada aqui usa setState — p chega por ref e tudo é mutado no useFrame.
*/

export interface RoomDriver {
  p: number;
  px: number;
  py: number;
}

const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (e0: number, e1: number, x: number) => {
  const t = clamp01((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
};

const C = {
  sunHot: new THREE.Color('#fff0c4'),
  sunDusk: new THREE.Color('#ff7a2f'),
  sunNight: new THREE.Color('#2b4a72'),
  ambDay: new THREE.Color('#cfd8e3'),
  ambNight: new THREE.Color('#16304c'),
  skyDay: new THREE.Color('#a8d4f5'),
  skyDusk: new THREE.Color('#f0873c'),
  skyNight: new THREE.Color('#050d1a'),
  lamp: new THREE.Color('#ffab5e'),
  cold: new THREE.Color('#9fdcff'),
};

/* ---------- materiais reutilizados ---------- */

function useMats() {
  return useMemo(() => {
    const wall = new THREE.MeshStandardMaterial({
      color: '#d9d2c6',
      roughness: 0.95,
      metalness: 0,
    });
    const wallBack = new THREE.MeshStandardMaterial({
      color: '#cfc7ba',
      roughness: 0.95,
    });
    const ceiling = new THREE.MeshStandardMaterial({
      color: '#f0ece5',
      roughness: 1,
    });
    const floor = new THREE.MeshStandardMaterial({
      color: '#a97c52',
      roughness: 0.62,
      metalness: 0.04,
    });
    const rug = new THREE.MeshStandardMaterial({
      color: '#7c8b93',
      roughness: 1,
    });
    const sofa = new THREE.MeshStandardMaterial({
      color: '#6d7b86',
      roughness: 0.92,
    });
    const cushion = new THREE.MeshStandardMaterial({
      color: '#8b959c',
      roughness: 0.95,
    });
    const wood = new THREE.MeshStandardMaterial({
      color: '#6b4a2f',
      roughness: 0.5,
    });
    const frame = new THREE.MeshStandardMaterial({
      color: '#2a2f36',
      roughness: 0.4,
      metalness: 0.3,
    });
    const acBody = new THREE.MeshStandardMaterial({
      color: '#f4f6f8',
      roughness: 0.35,
      metalness: 0.05,
    });
    const acVent = new THREE.MeshStandardMaterial({
      color: '#2b3138',
      roughness: 0.6,
    });
    const plant = new THREE.MeshStandardMaterial({
      color: '#3f6b46',
      roughness: 0.9,
    });
    const pot = new THREE.MeshStandardMaterial({
      color: '#8e6650',
      roughness: 0.85,
    });
    return {
      wall,
      wallBack,
      ceiling,
      floor,
      rug,
      sofa,
      cushion,
      wood,
      frame,
      acBody,
      acVent,
      plant,
      pot,
    };
  }, []);
}

/* ---------- o split ---------- */

function SplitUnit({
  driver,
  mats,
}: {
  driver: React.MutableRefObject<RoomDriver>;
  mats: ReturnType<typeof useMats>;
}) {
  const louver = useRef<THREE.Mesh>(null);
  const led = useRef<THREE.Mesh>(null);
  const ledMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: C.cold,
        transparent: true,
        opacity: 0,
      }),
    []
  );

  useFrame(() => {
    const on = smooth(0.46, 0.62, driver.current.p);
    if (louver.current) louver.current.rotation.x = lerp(0, -0.72, on);
    ledMat.opacity = on;
  });

  return (
    <group position={[-2.55, 2.06, -1.1]} rotation={[0, Math.PI / 2, 0]}>
      {/* corpo */}
      <mesh castShadow receiveShadow material={mats.acBody}>
        <boxGeometry args={[1.62, 0.42, 0.26]} />
      </mesh>
      {/* frente arredondada */}
      <mesh position={[0, 0.03, 0.13]} material={mats.acBody} castShadow>
        <boxGeometry args={[1.6, 0.3, 0.06]} />
      </mesh>
      {/* boca de insuflamento */}
      <mesh position={[0, -0.15, 0.1]} material={mats.acVent}>
        <boxGeometry args={[1.44, 0.12, 0.1]} />
      </mesh>
      {/* aleta que abre quando liga */}
      <mesh
        ref={louver}
        position={[0, -0.2, 0.14]}
        material={mats.acBody}
        castShadow
      >
        <boxGeometry args={[1.44, 0.1, 0.03]} />
      </mesh>
      {/* led de operação */}
      <mesh ref={led} position={[0.62, -0.05, 0.17]} material={ledMat}>
        <circleGeometry args={[0.018, 12]} />
      </mesh>
    </group>
  );
}

/* ---------- fluxo de ar frio ---------- */

function ColdAir({ driver }: { driver: React.MutableRefObject<RoomDriver> }) {
  const COUNT = 220;
  const ref = useRef<THREE.Points>(null);
  const mat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: C.cold,
        size: 0.05,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      }),
    []
  );

  const { geo, seeds } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const s = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      s[i] = Math.random();
      pos[i * 3] = -2.4 + Math.random() * 0.3;
      pos[i * 3 + 1] = 1.85;
      pos[i * 3 + 2] = -1.1 + (Math.random() - 0.5) * 1.5;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return { geo: g, seeds: s };
  }, []);

  useFrame((state, delta) => {
    const on = smooth(0.5, 0.68, driver.current.p);
    mat.opacity = on * 0.55;
    if (on < 0.01) return;
    const arr = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      const sp = 0.55 + seeds[i] * 0.7;
      arr[i * 3] += delta * sp; // sai do aparelho para dentro da sala
      arr[i * 3 + 1] -= delta * (0.16 + seeds[i] * 0.2); // e desce, ar frio é denso
      arr[i * 3 + 2] +=
        Math.sin(state.clock.elapsedTime * 0.7 + seeds[i] * 9) * delta * 0.12;
      if (arr[i * 3] > 2.4 || arr[i * 3 + 1] < 0.05) {
        arr[i * 3] = -2.4 + Math.random() * 0.3;
        arr[i * 3 + 1] = 1.85;
        arr[i * 3 + 2] = -1.1 + (Math.random() - 0.5) * 1.5;
      }
    }
    geo.attributes.position.needsUpdate = true;
  });

  return <points ref={ref} geometry={geo} material={mat} frustumCulled={false} />;
}

/* ---------- poeira no facho de sol ---------- */

function SunDust({ driver }: { driver: React.MutableRefObject<RoomDriver> }) {
  const COUNT = 110;
  const mat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: '#ffeec9',
        size: 0.021,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );
  const { geo, seeds } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const s = new Float32Array(COUNT * 2);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = 0.4 + Math.random() * 3.4;
      pos[i * 3 + 1] = 0.2 + Math.random() * 2.9;
      pos[i * 3 + 2] = -1.9 + Math.random() * 3.4;
      s[i * 2] = Math.random();
      s[i * 2 + 1] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return { geo: g, seeds: s };
  }, []);

  useFrame((state, delta) => {
    // a poeira só é visível enquanto o facho existe
    mat.opacity = (1 - smooth(0.1, 0.5, driver.current.p)) * 0.26;
    if (mat.opacity < 0.01) return;
    const arr = geo.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 1] += delta * (0.02 + seeds[i * 2] * 0.05);
      arr[i * 3] += Math.sin(t * 0.3 + seeds[i * 2 + 1] * 8) * delta * 0.05;
      if (arr[i * 3 + 1] > 3.1) arr[i * 3 + 1] = 0.15;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return <points geometry={geo} material={mat} frustumCulled={false} />;
}

/* ---------- luz do sol entrando pela janela ---------- */

function SunLight({ driver }: { driver: React.MutableRefObject<RoomDriver> }) {
  const beam = useRef<THREE.Group>(null);
  const patch = useRef<THREE.Mesh>(null);

  // O feixe é discreto; quem conta a história é a mancha de sol no chão.
  const beamMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#ffe6b0',
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      }),
    []
  );

  const patchMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#fff1c8',
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  useFrame(() => {
    const p = driver.current.p;
    const day = 1 - smooth(0.08, 0.52, p);
    const low = smooth(0, 0.5, p);

    beamMat.opacity = day * 0.03;
    beamMat.color.copy(C.sunHot).lerp(C.sunDusk, smooth(0.12, 0.46, p));

    if (beam.current) {
      beam.current.rotation.z = lerp(-0.62, -0.12, low);
      beam.current.position.y = lerp(2.35, 1.15, low);
    }

    // a mancha de sol deita e se alonga pelo chão conforme o sol baixa
    patchMat.opacity = day * 0.5;
    patchMat.color.copy(C.sunHot).lerp(C.sunDusk, smooth(0.12, 0.46, p));
    if (patch.current) {
      patch.current.position.x = lerp(1.35, -1.5, low);
      patch.current.position.z = lerp(-1.15, -0.35, low);
      patch.current.scale.set(lerp(1, 1.75, low), lerp(1, 1.5, low), 1);
    }
  });

  return (
    <>
      {/* feixe volumétrico, discreto */}
      <group ref={beam} position={[1.55, 2.35, -0.75]} rotation={[0, 0, -0.62]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} material={beamMat} position={[0, 0, -0.7 + i * 0.7]}>
            <planeGeometry args={[3.6, 1.5]} />
          </mesh>
        ))}
      </group>

      {/* mancha de sol no chão — é o que lê como "o sol está entrando" */}
      <mesh
        ref={patch}
        material={patchMat}
        rotation={[-Math.PI / 2, 0, 0.22]}
        position={[1.35, 0.02, -1.15]}
      >
        <planeGeometry args={[2.5, 1.9]} />
      </mesh>
    </>
  );
}

/* ---------- luminárias aconchegantes ---------- */

function CozyLamps({
  driver,
  mats,
}: {
  driver: React.MutableRefObject<RoomDriver>;
  mats: ReturnType<typeof useMats>;
}) {
  const l1 = useRef<THREE.PointLight>(null);
  const l2 = useRef<THREE.PointLight>(null);
  const cool = useRef<THREE.PointLight>(null);
  const shadeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#e8d9c0',
        roughness: 0.9,
        emissive: new THREE.Color(C.lamp),
        emissiveIntensity: 0,
      }),
    []
  );

  useFrame(() => {
    const warm = smooth(0.42, 0.9, driver.current.p);
    if (l1.current) l1.current.intensity = warm * 17;
    if (l2.current) l2.current.intensity = warm * 10;
    shadeMat.emissiveIntensity = warm * 2.6;
    if (cool.current) cool.current.intensity = smooth(0.5, 0.8, driver.current.p) * 3.4;
  });

  return (
    <>
      {/* abajur de chão, canto direito */}
      <group position={[2.35, 0, -1.55]}>
        <mesh position={[0, 0.02, 0]} material={mats.frame}>
          <cylinderGeometry args={[0.19, 0.22, 0.04, 20]} />
        </mesh>
        <mesh position={[0, 0.72, 0]} material={mats.frame}>
          <cylinderGeometry args={[0.022, 0.022, 1.42, 10]} />
        </mesh>
        <mesh position={[0, 1.52, 0]} material={shadeMat} castShadow>
          <cylinderGeometry args={[0.2, 0.28, 0.34, 22, 1, true]} />
        </mesh>
        <pointLight
          ref={l1}
          position={[0, 1.45, 0]}
          color={C.lamp}
          distance={9}
          decay={2}
          castShadow={false}
        />
      </group>

      {/* luminária de mesa, atrás do sofá */}
      <group position={[-1.75, 0.52, -2.05]}>
        <mesh position={[0, 0.2, 0]} material={shadeMat}>
          <cylinderGeometry args={[0.13, 0.18, 0.22, 18, 1, true]} />
        </mesh>
        <pointLight
          ref={l2}
          position={[0, 0.2, 0]}
          color={C.lamp}
          distance={7}
          decay={2}
        />
      </group>

      {/* respiro frio saindo do aparelho: a sala fica azul, não preta */}
      <pointLight
        ref={cool}
        position={[-2.1, 1.95, -1.1]}
        color={C.cold}
        distance={7}
        decay={2}
        intensity={0}
      />
    </>
  );
}

/* ---------- a sala ---------- */

export default function Room({
  driver,
}: {
  driver: React.MutableRefObject<RoomDriver>;
}) {
  const mats = useMats();
  const { camera } = useThree();

  const sun = useRef<THREE.DirectionalLight>(null);
  const amb = useRef<THREE.HemisphereLight>(null);
  const skyMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: C.skyDay }),
    []
  );
  const glowMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#fff6dc',
        transparent: true,
        opacity: 0.3,
      }),
    []
  );

  useFrame((state, delta) => {
    const d = driver.current;
    const p = d.p;

    // sol: alto e branco → baixo e laranja → sumindo
    if (sun.current) {
      const arc = smooth(0, 1, p);
      sun.current.position.set(
        lerp(7.5, 11.5, arc),
        lerp(7.2, -0.6, arc),
        lerp(2.2, -1.2, arc)
      );
      sun.current.intensity = (1 - smooth(0.25, 0.62, p)) * 2.9;
      const c = sun.current.color;
      c.copy(C.sunHot).lerp(C.sunDusk, smooth(0.15, 0.5, p));
      c.lerp(C.sunNight, smooth(0.55, 0.85, p));
    }

    // ambiente esfria
    if (amb.current) {
      amb.current.color.copy(C.ambDay).lerp(C.ambNight, smooth(0.2, 0.75, p));
      amb.current.intensity = lerp(0.95, 0.3, smooth(0.15, 0.8, p));
    }

    // o céu visto pela janela faz a jornada inteira
    skyMat.color.copy(C.skyDay).lerp(C.skyDusk, smooth(0.12, 0.46, p));
    skyMat.color.lerp(C.skyNight, smooth(0.5, 0.86, p));
    glowMat.opacity = (1 - smooth(0.1, 0.55, p)) * 0.32;

    // câmera: parallax no ponteiro + leve avanço para dentro da sala
    const aspect = state.size.width / Math.max(1, state.size.height);
    const portrait = aspect < 1;
    // em retrato o fov corta na horizontal: recua e baixa o alvo
    const back = portrait ? 2.9 : 0;
    const tx = d.px * (portrait ? 0.2 : 0.55);
    const ty = (portrait ? 1.25 : 1.45) + d.py * 0.28;
    const tz = lerp(4.5, 3.6, smooth(0, 1, p)) + back;
    camera.position.x = lerp(camera.position.x, tx, 1 - Math.pow(0.001, delta));
    camera.position.y = lerp(camera.position.y, ty, 1 - Math.pow(0.001, delta));
    camera.position.z = lerp(camera.position.z, tz, 1 - Math.pow(0.002, delta));
    camera.lookAt(d.px * 0.2, portrait ? 1.1 : 1.3, -2);
  });

  return (
    <>
      <hemisphereLight ref={amb} intensity={0.95} groundColor="#8a7358" />
      <directionalLight
        ref={sun}
        castShadow
        intensity={2.9}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={7}
        shadow-camera-bottom={-7}
        shadow-camera-far={30}
        shadow-bias={-0.0012}
      />

      {/* piso */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, -0.5]}
        receiveShadow
        material={mats.floor}
      >
        <planeGeometry args={[11, 9]} />
      </mesh>

      {/* tapete */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0.15, 0.012, -0.5]}
        receiveShadow
        material={mats.rug}
      >
        <planeGeometry args={[4.1, 3]} />
      </mesh>

      {/* parede do fundo */}
      <mesh position={[0, 1.75, -3.1]} receiveShadow material={mats.wallBack}>
        <planeGeometry args={[11, 3.5]} />
      </mesh>

      {/* parede esquerda (onde mora o split) */}
      <mesh
        position={[-2.75, 1.75, -0.5]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
        material={mats.wall}
      >
        <planeGeometry args={[6, 3.5]} />
      </mesh>

      {/* teto */}
      <mesh
        position={[0, 3.5, -0.5]}
        rotation={[Math.PI / 2, 0, 0]}
        receiveShadow
        material={mats.ceiling}
      >
        <planeGeometry args={[11, 9]} />
      </mesh>

      {/* parede direita, recortada pela janela */}
      <group position={[2.78, 0, -0.5]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh position={[0, 3.15, 0]} material={mats.wall} receiveShadow>
          <planeGeometry args={[6, 0.7]} />
        </mesh>
        <mesh position={[0, 0.3, 0]} material={mats.wall} receiveShadow>
          <planeGeometry args={[6, 0.6]} />
        </mesh>
        <mesh position={[-2.35, 1.7, 0]} material={mats.wall} receiveShadow>
          <planeGeometry args={[1.3, 2.2]} />
        </mesh>
        <mesh position={[2.35, 1.7, 0]} material={mats.wall} receiveShadow>
          <planeGeometry args={[1.3, 2.2]} />
        </mesh>

        {/* o céu, visto de dentro */}
        <mesh position={[0, 1.7, -0.16]} material={skyMat}>
          <planeGeometry args={[3.4, 2.2]} />
        </mesh>
        <mesh position={[0, 2.3, -0.14]} material={glowMat}>
          <planeGeometry args={[3.4, 1.1]} />
        </mesh>

        {/* caixilho */}
        <mesh position={[0, 1.7, -0.05]} material={mats.frame}>
          <boxGeometry args={[3.5, 0.07, 0.09]} />
        </mesh>
        <mesh position={[0, 0.62, -0.05]} material={mats.frame}>
          <boxGeometry args={[3.5, 0.09, 0.11]} />
        </mesh>
        <mesh position={[0, 2.82, -0.05]} material={mats.frame}>
          <boxGeometry args={[3.5, 0.09, 0.11]} />
        </mesh>
        <mesh position={[-1.72, 1.7, -0.05]} material={mats.frame}>
          <boxGeometry args={[0.09, 2.3, 0.11]} />
        </mesh>
        <mesh position={[1.72, 1.7, -0.05]} material={mats.frame}>
          <boxGeometry args={[0.09, 2.3, 0.11]} />
        </mesh>
      </group>

      {/* sofá */}
      <group position={[-0.55, 0, -2.0]}>
        <mesh position={[0, 0.34, 0]} castShadow receiveShadow material={mats.sofa}>
          <boxGeometry args={[2.5, 0.42, 0.95]} />
        </mesh>
        <mesh position={[0, 0.75, -0.42]} castShadow material={mats.sofa}>
          <boxGeometry args={[2.5, 0.78, 0.24]} />
        </mesh>
        <mesh position={[-1.18, 0.66, 0]} castShadow material={mats.sofa}>
          <boxGeometry args={[0.24, 0.62, 0.95]} />
        </mesh>
        <mesh position={[1.18, 0.66, 0]} castShadow material={mats.sofa}>
          <boxGeometry args={[0.24, 0.62, 0.95]} />
        </mesh>
        <mesh position={[-0.62, 0.62, -0.2]} castShadow material={mats.cushion} rotation={[0.22, 0.1, 0]}>
          <boxGeometry args={[0.44, 0.44, 0.16]} />
        </mesh>
        <mesh position={[0.66, 0.62, -0.2]} castShadow material={mats.cushion} rotation={[0.22, -0.14, 0]}>
          <boxGeometry args={[0.44, 0.44, 0.16]} />
        </mesh>
        {/* pés */}
        {[-1.05, 1.05].map((x) =>
          [-0.35, 0.35].map((z) => (
            <mesh key={`${x}${z}`} position={[x, 0.07, z]} material={mats.wood}>
              <cylinderGeometry args={[0.045, 0.035, 0.14, 8]} />
            </mesh>
          ))
        )}
      </group>

      {/* mesa de centro */}
      <group position={[0.35, 0, -0.35]}>
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow material={mats.wood}>
          <boxGeometry args={[1.25, 0.06, 0.68]} />
        </mesh>
        {[-0.52, 0.52].map((x) =>
          [-0.24, 0.24].map((z) => (
            <mesh key={`${x}${z}`} position={[x, 0.2, z]} material={mats.wood}>
              <cylinderGeometry args={[0.03, 0.025, 0.4, 8]} />
            </mesh>
          ))
        )}
      </group>

      {/* mesa lateral atrás do sofá */}
      <mesh position={[-1.75, 0.25, -2.05]} castShadow material={mats.wood}>
        <boxGeometry args={[0.5, 0.5, 0.4]} />
      </mesh>

      {/* planta */}
      <group position={[-2.2, 0, -0.15]}>
        <mesh position={[0, 0.22, 0]} castShadow material={mats.pot}>
          <cylinderGeometry args={[0.21, 0.16, 0.44, 16]} />
        </mesh>
        {[
          [0, 0.78, 0, 0, 0],
          [0.16, 0.68, 0.1, 0.4, 0.25],
          [-0.15, 0.72, -0.08, -0.35, -0.3],
          [0.05, 0.62, -0.18, 0.15, -0.5],
        ].map(([x, y, z, rx, rz], i) => (
          <mesh
            key={i}
            position={[x, y, z]}
            rotation={[rx, 0, rz]}
            castShadow
            material={mats.plant}
          >
            <boxGeometry args={[0.1, 0.72, 0.02]} />
          </mesh>
        ))}
      </group>

      <SplitUnit driver={driver} mats={mats} />
      <SunLight driver={driver} />
      <SunDust driver={driver} />
      <ColdAir driver={driver} />
      <CozyLamps driver={driver} mats={mats} />
    </>
  );
}
