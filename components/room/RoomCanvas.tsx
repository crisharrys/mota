'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Room, { RoomDriver } from './Room';
import DepthRoom from './DepthRoom';

/*
  O driver viaja por ref, nunca por state: o scroll e o ponteiro atualizam um
  objeto mutável e o loop de render lê dele. Assim a cena responde a cada
  frame sem provocar um único re-render do React.
*/

export default function RoomCanvas({
  progressRef,
  mode = 'depth',
}: {
  progressRef: React.MutableRefObject<number>;
  mode?: 'scene' | 'depth';
}) {
  const driver = useRef<RoomDriver>({ p: 0, px: 0, py: 0 });
  const [ready, setReady] = useState(false);
  const reduced = useRef(false);

  // O measure do R3F devolve 0 dentro de sticky + overflow:hidden no primeiro
  // paint e não remede sozinho. Um resize após o mount resolve.
  useEffect(() => {
    const t = window.setTimeout(() => window.dispatchEvent(new Event('resize')), 60);
    const t2 = window.setTimeout(() => window.dispatchEvent(new Event('resize')), 320);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reduced.current = mq.matches;
    const onChange = () => (reduced.current = mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // ponteiro: parallax dentro da sala (mouse); no toque o scroll já é o arrasto
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || reduced.current) return;
      driver.current.px = (e.clientX / window.innerWidth) * 2 - 1;
      driver.current.py = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  // o scroll da seção alimenta p
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      driver.current.p = progressRef.current;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [progressRef]);

  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 1.45, 4.5], fov: 52, near: 0.1, far: 60 }}
      onCreated={() => setReady(true)}
      resize={{ scroll: false, debounce: { scroll: 0, resize: 80 } }}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        opacity: ready ? 1 : 0,
        transition: 'opacity 900ms ease-out',
      }}
    >
      {mode === 'depth' ? (
        <DepthRoom
          driver={driver}
          imageUrl="/images/sala.jpg"
          depthUrl="/images/sala-depth.png"
        />
      ) : (
        <Room driver={driver} />
      )}
    </Canvas>
  );
}
