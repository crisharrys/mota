'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  baseSpeedY: number;
  baseSpeedX: number;
  opacity: number;
  maxOpacity: number;
  spin: number;
  spinSpeed: number;
  type: 'crystal' | 'dust' | 'flake';
  depth: number; // 0.2 (distant) to 1.0 (close)
}

export default function FrostCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic scroll tracking
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let lastTime = performance.now();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      // Boost velocity proportional to scroll
      scrollVelocity += delta * 0.15;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // Generate balanced particle field
    const particleCount = Math.min(Math.floor((width * height) / 14000), 90);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const depth = 0.3 + Math.random() * 0.7;
      const randType = Math.random();
      const type = randType < 0.25 ? 'crystal' : randType < 0.7 ? 'dust' : 'flake';

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: type === 'crystal' ? 5 + Math.random() * 5 : type === 'flake' ? 2.5 + Math.random() * 3 : 1 + Math.random() * 2,
        baseSpeedY: (0.3 + Math.random() * 0.6) * depth,
        baseSpeedX: (Math.random() - 0.5) * 0.4 * depth,
        speedY: (0.3 + Math.random() * 0.6) * depth,
        speedX: (Math.random() - 0.5) * 0.4 * depth,
        opacity: 0.1 + Math.random() * 0.5,
        maxOpacity: 0.3 + Math.random() * 0.6,
        spin: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.02,
        type,
        depth,
      });
    }

    // Helper: Draw 6-armed Snowflake Crystal
    const drawSnowflake = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      radius: number,
      angle: number,
      opacity: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(angle);
      context.strokeStyle = `rgba(186, 230, 253, ${opacity})`;
      context.fillStyle = `rgba(224, 242, 254, ${opacity * 0.8})`;
      context.lineWidth = 1;
      context.lineCap = 'round';

      // Draw 6 symmetrical branches
      for (let i = 0; i < 6; i++) {
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(0, -radius);
        // Secondary sub-twigs
        const twigOffset = radius * 0.55;
        const twigLength = radius * 0.35;
        context.moveTo(0, -twigOffset);
        context.lineTo(twigLength, -twigOffset - twigLength * 0.5);
        context.moveTo(0, -twigOffset);
        context.lineTo(-twigLength, -twigOffset - twigLength * 0.5);
        context.stroke();
        context.rotate(Math.PI / 3);
      }

      // Subtle ice center dot
      context.beginPath();
      context.arc(0, 0, radius * 0.2, 0, Math.PI * 2);
      context.fill();

      context.restore();
    };

    // Render loop
    const render = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // Friction to return to idle floating speed
      scrollVelocity *= 0.92;
      if (Math.abs(scrollVelocity) < 0.01) scrollVelocity = 0;

      ctx.clearRect(0, 0, width, height);

      // Render cold atmospheric gradient glow in background
      const ambientGlow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.35,
        50,
        width * 0.5,
        height * 0.45,
        Math.max(width, height) * 0.8
      );
      ambientGlow.addColorStop(0, 'rgba(14, 165, 233, 0.035)');
      ambientGlow.addColorStop(0.5, 'rgba(3, 105, 161, 0.015)');
      ambientGlow.addColorStop(1, 'rgba(2, 9, 20, 0)');
      ctx.fillStyle = ambientGlow;
      ctx.fillRect(0, 0, width, height);

      // Update and render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Velocity influenced by scroll: scrolling down creates an upwards rush or downwards airflow
        const scrollEffect = scrollVelocity * p.depth * 0.8;
        p.y += (p.baseSpeedY + scrollEffect) * (dt * 60);
        p.x += (p.baseSpeedX + Math.sin(currentTime * 0.001 + i) * 0.2) * (dt * 60);
        p.spin += (p.spinSpeed + scrollVelocity * 0.002) * (dt * 60);

        // Gentle breathing opacity shimmer
        const shimmer = Math.sin(currentTime * 0.0015 + i * 2) * 0.15;
        const currentOpacity = Math.max(0.08, Math.min(1, p.opacity + shimmer));

        // Screen wrap
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        } else if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }

        if (p.x > width + 20) p.x = -20;
        else if (p.x < -20) p.x = width + 20;

        // Draw particle based on type
        if (p.type === 'crystal') {
          drawSnowflake(ctx, p.x, p.y, p.size, p.spin, currentOpacity);
        } else if (p.type === 'flake') {
          // Soft glowing frost flake
          const radial = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
          radial.addColorStop(0, `rgba(224, 242, 254, ${currentOpacity * 0.9})`);
          radial.addColorStop(0.4, `rgba(125, 211, 252, ${currentOpacity * 0.5})`);
          radial.addColorStop(1, 'rgba(56, 189, 248, 0)');

          ctx.fillStyle = radial;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Ambient micro frost dust
          ctx.fillStyle = `rgba(186, 230, 253, ${currentOpacity * 0.6})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Deep luxury ambient gradient layers */}
      <div className="absolute inset-0 bg-[#020914] -z-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(14,165,233,0.14),rgba(2,9,20,0))] -z-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(3,105,161,0.08),transparent_50%)] -z-20" />
      {/* Interactive Cold Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ filter: 'drop-shadow(0 0 6px rgba(56,189,248,0.25))' }}
      />
    </div>
  );
}
