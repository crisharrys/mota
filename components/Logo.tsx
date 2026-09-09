import React from 'react';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', showSubtitle = true, className = '' }: LogoProps) {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  const subSizes = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-xs',
  };

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {/* Snowflake circle emblem identical to client logo */}
      <div className={`relative ${iconSizes[size]} rounded-full border-2 border-sky-400/90 flex items-center justify-center bg-gradient-to-br from-sky-500/20 to-mota-navy shadow-[0_0_15px_rgba(56,189,248,0.35)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_22px_rgba(56,189,248,0.6)] group-hover:border-sky-300`}>
        <svg
          viewBox="0 0 100 100"
          className="w-4/5 h-4/5 text-sky-400 group-hover:text-sky-300 transition-colors duration-300"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Main 6 arms */}
          <line x1="50" y1="12" x2="50" y2="88" />
          <line x1="17.1" y1="31" x2="82.9" y2="69" />
          <line x1="17.1" y1="69" x2="82.9" y2="31" />

          {/* V-branches on Vertical */}
          <path d="M40 22 L50 32 L60 22" />
          <path d="M40 78 L50 68 L60 78" />

          {/* V-branches on Top-Left to Bottom-Right */}
          <path d="M22 41 L34 40 L31 28" />
          <path d="M78 59 L66 60 L69 72" />

          {/* V-branches on Bottom-Left to Top-Right */}
          <path d="M22 59 L34 60 L31 72" />
          <path d="M78 41 L66 40 L69 28" />

          {/* Center core */}
          <circle cx="50" cy="50" r="6" fill="currentColor" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-black tracking-wider text-slate-50 group-hover:text-white transition-colors ${textSizes[size]}`} style={{ letterSpacing: '0.08em' }}>
            MOTA
          </span>
          <span className="w-1 h-1 rounded-full bg-sky-400 animate-pulse" />
        </div>
        {showSubtitle && (
          <span className={`font-medium uppercase tracking-widest text-sky-400/90 group-hover:text-sky-300 transition-colors ${subSizes[size]}`}>
            Serviços de Ar-Condicionado
          </span>
        )}
      </div>
    </Link>
  );
}
