'use client';

import React, { useEffect, useRef } from 'react';

/*
  Campo de gelo do site original, restaurado como fundo fixo da página inteira.
  Reage ao scroll: rolar empurra as partículas, e o atrito devolve elas ao
  flutuar parado.

  Duas coisas mudaram em relação ao original:
  · escala por devicePixelRatio, senão fica borrado em tela retina;
  · a cor acompanha o fundo — azul mais fundo enquanto o hero está claro,
    gelo claro depois que a sala esfria — porque partícula branca some
    completamente sobre o estado de dia.
*/

interface Particle {
  x: number;
  y: number;
  size: number;
  baseSpeedY: number;
  baseSpeedX: number;
  opacity: number;
  spin: number;
  spinSpeed: number;
  type: 'crystal' | 'dust' | 'flake';
  depth: number;
}

export default function FrostCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let lastTime = performance.now();

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onScroll = () => {
      const y = window.scrollY;
      scrollVelocity += (y - lastScrollY) * 0.15;
      lastScrollY = y;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });

    const count = Math.min(Math.floor((width * height) / 14000), 90);
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const depth = 0.3 + Math.random() * 0.7;
      const r = Math.random();
      const type: Particle['type'] =
        r < 0.25 ? 'crystal' : r < 0.7 ? 'dust' : 'flake';
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size:
          type === 'crystal'
            ? 5 + Math.random() * 5
            : type === 'flake'
              ? 2.5 + Math.random() * 3
              : 1 + Math.random() * 2,
        baseSpeedY: (0.3 + Math.random() * 0.6) * depth,
        baseSpeedX: (Math.random() - 0.5) * 0.4 * depth,
        opacity: 0.1 + Math.random() * 0.5,
        spin: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.02,
        type,
        depth,
      });
    }

    const snowflake = (
      x: number,
      y: number,
      radius: number,
      angle: number,
      op: number,
      stroke: string,
      fill: string
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.strokeStyle = stroke.replace('%A', String(op));
      ctx.fillStyle = fill.replace('%A', String(op * 0.8));
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -radius);
        const off = radius * 0.55;
        const len = radius * 0.35;
        ctx.moveTo(0, -off);
        ctx.lineTo(len, -off - len * 0.5);
        ctx.moveTo(0, -off);
        ctx.lineTo(-len, -off - len * 0.5);
        ctx.stroke();
        ctx.rotate(Math.PI / 3);
      }
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      scrollVelocity *= 0.92;
      if (Math.abs(scrollVelocity) < 0.01) scrollVelocity = 0;

      ctx.clearRect(0, 0, width, height);

      /*
        O gelo só cai com o ar ligado. Antes disso a sala está quente —
        partícula de gelo ali contradiz a própria narrativa da página.
      */
      const cold =
        Number(
          getComputedStyle(document.documentElement).getPropertyValue(
            '--frost-cold'
          )
        ) || 0;

      if (cold < 0.05) {
        ctx.clearRect(0, 0, width, height);
        raf = requestAnimationFrame(render);
        return;
      }

      // 1 = fundo claro (hero de dia) · 0 = fundo escuro
      const onLight =
        Number(
          getComputedStyle(document.documentElement).getPropertyValue(
            '--frost-on-light'
          )
        ) || 0;

      const strokeC = onLight > 0.5
        ? 'rgba(2,132,199,%A)'
        : 'rgba(186,230,253,%A)';
      const fillC = onLight > 0.5
        ? 'rgba(14,165,233,%A)'
        : 'rgba(224,242,254,%A)';
      const boost = (onLight > 0.5 ? 1.35 : 1) * cold;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!reduced) {
          const push = scrollVelocity * p.depth * 0.8;
          p.y += (p.baseSpeedY + push) * (dt * 60);
          p.x += (p.baseSpeedX + Math.sin(now * 0.001 + i) * 0.2) * (dt * 60);
          p.spin += (p.spinSpeed + scrollVelocity * 0.002) * (dt * 60);
        }

        const shimmer = reduced ? 0 : Math.sin(now * 0.0015 + i * 2) * 0.15;
        const op = Math.min(1, Math.max(0, (p.opacity + shimmer) * boost));
        if (op <= 0.01) continue;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        } else if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        else if (p.x < -20) p.x = width + 20;

        if (p.type === 'crystal') {
          snowflake(p.x, p.y, p.size, p.spin, op, strokeC, fillC);
        } else if (p.type === 'flake') {
          const g = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.size * 2
          );
          if (onLight > 0.5) {
            g.addColorStop(0, `rgba(14,165,233,${op * 0.8})`);
            g.addColorStop(0.4, `rgba(56,189,248,${op * 0.45})`);
            g.addColorStop(1, 'rgba(56,189,248,0)');
          } else {
            g.addColorStop(0, `rgba(224,242,254,${op * 0.9})`);
            g.addColorStop(0.4, `rgba(125,211,252,${op * 0.5})`);
            g.addColorStop(1, 'rgba(56,189,248,0)');
          }
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle =
            onLight > 0.5
              ? `rgba(3,105,161,${op * 0.5})`
              : `rgba(186,230,253,${op * 0.6})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5] h-full w-full"
      style={{ filter: 'drop-shadow(0 0 6px rgba(56,189,248,0.25))' }}
    />
  );
}
