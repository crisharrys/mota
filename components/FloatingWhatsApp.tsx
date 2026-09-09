'use client';

import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* Floating greeting bubble */}
      {showTooltip && (
        <div className="pointer-events-auto mb-3 max-w-xs p-3.5 rounded-2xl bg-[#04142b]/95 border border-sky-400/30 text-slate-100 shadow-2xl backdrop-blur-md flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1 shrink-0 animate-ping" />
          <div>
            <div className="text-xs font-bold text-slate-100 flex items-center justify-between">
              <span>Romero Mota</span>
              <button
                type="button"
                onClick={() => setShowTooltip(false)}
                className="text-slate-400 hover:text-white p-0.5 ml-2"
                aria-label="Fechar balão"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5 leading-tight">
              Olá! Precisa de orçamento para ar-condicionado? Fale comigo agora no WhatsApp!
            </p>
          </div>
        </div>
      )}

      {/* Main floating button */}
      <a
        href="https://wa.me/5511947321510?text=Ol%C3%A1%2C%20Romero!%20Vim%20pelo%20site%20da%20Mota%20Ar-Condicionado%20e%20gostaria%20de%20um%20or%C3%A7amento."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar no WhatsApp"
        className="pointer-events-auto relative group flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_4px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_30px_rgba(37,211,102,0.7)] transition-all duration-300 hover:scale-110 active:scale-95"
      >
        {/* Pulsing beacon rings */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />
        
        {/* SVG WhatsApp icon */}
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 fill-current"
        >
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 17.8c-1.48 0-2.94-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a7.88 7.88 0 0 1-1.21-4.23c0-4.36 3.55-7.91 7.91-7.91 2.11 0 4.1.82 5.6 2.31a7.87 7.87 0 0 1 2.32 5.59c.01 4.36-3.54 7.91-7.91 7.91zm4.33-5.91c-.24-.12-1.41-.7-1.63-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.19-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.41-.54-.42l-.46-.01c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.65.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.41-.58 1.61-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
        </svg>
      </a>
    </div>
  );
}
