'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { site, whatsappUrl } from '@/lib/site';
import { Snowflake } from './Snowflake';

// Ambos só são baixados no cliente.
const RoomCanvas = dynamic(() => import('./RoomCanvas'), { ssr: false });
const VideoScrub = dynamic(() => import('./VideoScrub'), { ssr: false });

const STAGES = [
  {
    at: 0,
    hour: '15h',
    title: 'O sol entra às três da tarde e o apartamento vira um forno.',
    body: 'Você fecha a cortina, liga o ventilador, não resolve. O calor já está dentro da laje.',
  },
  {
    at: 0.4,
    hour: '18h',
    title: 'O sol vai embora e o calor fica.',
    body: 'A parede devolve a noite inteira o que absorveu durante o dia. É por isso que só abrir a janela não adianta.',
  },
  {
    at: 0.72,
    hour: '21h',
    title: 'Agora sim. Fresco, silencioso, e assim a noite toda.',
    body: 'Instalação com vácuo aferido e tubulação de cobre — o que faz o aparelho segurar esse estado sem forçar o compressor.',
  },
];

export default function HeroRoom() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [stage, setStage] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [pct, setPct] = useState(0);
  /*
    'probing' → ainda não sabemos se existe vídeo
    'video'   → usa o vídeo scrubado
    'scene'   → cai para a cena 3D
    O site nunca fica esperando um arquivo que talvez não exista.
  */
  const [source, setSource] = useState<
    'probing' | 'video' | 'depth' | 'scene'
  >('depth');

  useEffect(() => setMounted(true), []);

  /*
    Ordem de preferência do hero:
      1. vídeo scrubado      (o mais real)
      2. foto com mapa de profundidade  (paralaxe real sobre imagem real)
      3. cena 3D             (sempre funciona, não depende de arquivo)
  */
  useEffect(() => {
    let alive = true;
    const ok = async (url: string, kind: string) => {
      try {
        const r = await fetch(url, { method: 'HEAD' });
        return r.ok && (r.headers.get('content-type') || '').startsWith(kind);
      } catch {
        return false;
      }
    };
    (async () => {
      if (await ok('/video/sala.mp4', 'video')) return alive && setSource('video');
      const [img, dep] = await Promise.all([
        ok('/images/sala.jpg', 'image'),
        ok('/images/sala-depth.png', 'image'),
      ]);
      if (img && dep) return alive && setSource('depth');
      if (alive) setSource('scene');
    })();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    // ?p=0..1 fixa o momento do dia — serve para compartilhar um estado e para inspeção
    const forced = (() => {
      const v = new URLSearchParams(window.location.search).get('p');
      if (v === null) return null;
      const n = Number.parseFloat(v);
      return Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : null;
    })();
    const update = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p =
        forced !== null
          ? forced
          : total > 0
            ? Math.min(1, Math.max(0, -rect.top / total))
            : 0;
      progressRef.current = p;
      setPct(p);
      let s = 0;
      for (let i = STAGES.length - 1; i >= 0; i--) {
        if (p >= STAGES[i].at) {
          s = i;
          break;
        }
      }
      setStage(s);
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const night = pct > 0.55;

  // o campo de gelo precisa saber se está sobre fundo claro para trocar de cor
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--frost-on-light',
      night ? '0' : '1'
    );
  }, [night]);

  // e só pode cair quando o ar condicionado estiver no modo ligado (estágio 2 / noite fresca)
  useEffect(() => {
    const isAcOn = pct >= 0.68;
    const cold = isAcOn ? Math.min(1, (pct - 0.68) / 0.18) : 0;
    document.documentElement.style.setProperty('--frost-cold', String(cold));
  }, [pct]);
  const ink = '#ffffff';
  const ink2 = 'rgba(255, 255, 255, 0.85)';

  return (
    <section ref={sectionRef} className="relative h-[180vh]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* fallback pintado: é o que aparece antes do WebGL subir */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: night
              ? 'linear-gradient(180deg,#071426 0%,#040d1a 100%)'
              : 'linear-gradient(180deg,#cfe3f5 0%,#e8dcc4 55%,#c9a173 100%)',
            transition: 'background 600ms linear',
          }}
        />

        {mounted && source !== 'probing' && (
          <div
            className="absolute inset-0"
            style={{ width: '100%', height: '100%' }}
          >
            {source === 'video' ? (
              <VideoScrub
                progressRef={progressRef}
                onUnavailable={() => setSource('scene')}
              />
            ) : (
              <RoomCanvas
                progressRef={progressRef}
                mode={source === 'depth' ? 'depth' : 'scene'}
              />
            )}
          </div>
        )}


        {/* véu cinematográfico para o texto branco ganhar leitura perfeita sobre a cena */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(2,8,16,0.92) 0%, rgba(2,8,16,0.58) 26%, rgba(2,8,16,0.12) 48%, rgba(2,8,16,0) 65%)',
          }}
        />
        {/* vinheta superior para o topo persistente (logo e botões) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-28"
          style={{
            background:
              'linear-gradient(to bottom, rgba(2,8,16,0.65) 0%, rgba(2,8,16,0) 100%)',
          }}
        />

        {/* topo persistente */}
        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-3 px-5 py-5 sm:px-9 sm:py-7">
          <span
            className="inline-flex items-center gap-2.5"
            style={{ color: ink, transition: 'color 600ms linear' }}
          >
            <Snowflake className="h-6 w-6 sm:h-7 sm:w-7" />
            <span className="text-lg font-bold tracking-[0.02em] sm:text-xl">
              MOTA
            </span>
          </span>

          {/* Controlador Interativo de Clima / Modo Ar Condicionado */}
          <button
            type="button"
            onClick={() => {
              const el = sectionRef.current;
              if (!el) return;
              if (pct < 0.68) {
                // Ativar modo ar condicionado ligado (21h / noite climatizada)
                const targetY = el.offsetTop + (el.offsetHeight - window.innerHeight) * 0.78;
                window.scrollTo({ top: targetY, behavior: 'smooth' });
              } else {
                // Modo dia / desligar ar condicionado (15h)
                window.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2.5 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 text-[0.74rem] sm:text-[0.82rem] font-semibold border backdrop-blur-md transition-all duration-300 hover:scale-105 shadow-md"
            style={{
              background: pct >= 0.68 ? 'rgba(56, 189, 248, 0.18)' : 'rgba(245, 158, 11, 0.16)',
              borderColor: pct >= 0.68 ? 'rgba(56, 189, 248, 0.45)' : 'rgba(245, 158, 11, 0.35)',
              color: pct >= 0.68 ? '#38bdf8' : '#fbbf24',
            }}
            title={pct >= 0.68 ? 'Clique para voltar ao dia / desligar ar' : 'Clique para ligar o ar condicionado'}
          >
            <span
              className="h-2 w-2 rounded-full animate-pulse"
              style={{
                background: pct >= 0.68 ? '#38bdf8' : '#f59e0b',
                boxShadow: pct >= 0.68 ? '0 0 8px #38bdf8' : '0 0 8px #f59e0b',
              }}
            />
            <span>
              {pct >= 0.68 ? 'Ar Ligado (18°C Fresco)' : 'Ar Desligado (32°C Calor)'}
            </span>
            <span className="hidden sm:inline-block opacity-75 text-[0.7rem] font-normal underline underline-offset-2 ml-0.5">
              {pct >= 0.68 ? '• ver dia ☀️' : '• ligar ar ❄️'}
            </span>
          </button>

          <a
            href={whatsappUrl('Olá Romerio! Vim pelo site e queria um orçamento.')}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-5 py-2.5 text-[0.8rem] font-semibold tracking-[0.01em] transition-transform duration-200 hover:scale-[1.03] sm:px-6 sm:py-3 sm:text-[0.9rem]"
            style={{
              background: night ? '#38bdf8' : '#0f2b45',
              color: night ? '#04121f' : '#f5faff',
            }}
          >
            Falar no WhatsApp
          </a>
        </div>

        {/* narrativa */}
        <div className="absolute inset-x-0 bottom-0 z-20 px-5 pb-12 sm:px-9 sm:pb-16">
          <div className="relative h-[15.5rem] max-w-[36rem] sm:h-[15rem]">
            {STAGES.map((s, i) => (
              <div
                key={i}
                className="absolute inset-0 flex flex-col justify-end"
                style={{
                  opacity: stage === i ? 1 : 0,
                  transform: `translateY(${stage === i ? 0 : stage > i ? -14 : 14}px)`,
                  transition: 'opacity 520ms ease-out, transform 520ms ease-out',
                  pointerEvents: stage === i ? 'auto' : 'none',
                }}
              >
                <span
                  className="mb-3 block text-[0.78rem] font-semibold tracking-[0.22em]"
                  style={{ color: '#38bdf8' }}
                >
                  {s.hour}
                </span>
                <h1
                  className="text-balance text-[2rem] font-bold leading-[1.06] tracking-[-0.03em] sm:text-[2.9rem] lg:text-[3.4rem] drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]"
                  style={{ color: '#ffffff' }}
                >
                  {s.title}
                </h1>
                <p
                  className="mt-4 max-w-[46ch] text-[0.95rem] leading-[1.6] sm:text-[1.05rem] drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)]"
                  style={{ color: 'rgba(255, 255, 255, 0.88)' }}
                >
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          {/* trilho de progresso do dia */}
          <div className="mt-8 flex items-center gap-4">
            <div
              className="h-[3px] w-full max-w-[22rem] overflow-hidden rounded-full"
              style={{
                background: 'rgba(255, 255, 255, 0.25)',
              }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${pct * 100}%`,
                  background: '#38bdf8',
                }}
              />
            </div>
            <span
              className="whitespace-nowrap text-[0.72rem] tracking-[0.16em] font-medium"
              style={{ color: 'rgba(255, 255, 255, 0.78)' }}
            >
              {pct < 0.02 ? 'ROLE PARA ANOITECER' : `${Math.round(pct * 100)}%`}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
