'use client';

import React, { useEffect, useRef, useState } from 'react';

/*
  Vídeo scrubado pelo scroll: nunca damos play(). O progresso da seção vira
  currentTime, quadro a quadro. É a técnica que a Apple usa nas páginas de
  produto — e depende de o arquivo estar codificado com keyframes densos,
  senão o navegador engasga ao buscar um tempo arbitrário.

  Se o arquivo não existir, o componente avisa por onError e o hero cai para
  a cena 3D. O site nunca fica quebrado esperando o vídeo.
*/

export const VIDEO_SOURCES = [
  { src: '/video/sala.webm', type: 'video/webm' },
  { src: '/video/sala.mp4', type: 'video/mp4' },
];

export default function VideoScrub({
  progressRef,
  onUnavailable,
  poster,
}: {
  progressRef: React.MutableRefObject<number>;
  onUnavailable: () => void;
  poster?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const target = useRef(0);
  const current = useRef(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let raf = 0;
    const tick = () => {
      const d = v.duration;
      if (d && Number.isFinite(d)) {
        target.current = Math.min(
          d - 0.05,
          Math.max(0, progressRef.current * d)
        );
        // amortece o scrub: sem isso o vídeo treme a cada frame de scroll
        current.current = reduced
          ? target.current
          : current.current + (target.current - current.current) * 0.18;
        if (Math.abs(current.current - v.currentTime) > 0.012) {
          try {
            v.currentTime = current.current;
          } catch {
            /* o navegador ainda não pode buscar; tentamos no próximo frame */
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [progressRef]);

  return (
    <video
      ref={videoRef}
      className="h-full w-full object-cover"
      style={{ opacity: ready ? 1 : 0, transition: 'opacity 700ms ease-out' }}
      muted
      playsInline
      preload="auto"
      poster={poster}
      disablePictureInPicture
      aria-hidden="true"
      tabIndex={-1}
      onLoadedMetadata={() => setReady(true)}
      onError={onUnavailable}
    >
      {VIDEO_SOURCES.map((s) => (
        <source key={s.src} src={s.src} type={s.type} />
      ))}
    </video>
  );
}
