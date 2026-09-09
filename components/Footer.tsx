import React from 'react';
import Link from 'next/link';
import { Phone, Lock } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-sky-500/15 bg-[#020710] py-12 text-slate-400 text-xs">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Logo and brief info */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <Logo size="sm" showSubtitle={false} />
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="text-slate-400">
            Romero Mota • São Paulo - SP e Grande SP
          </span>
        </div>

        {/* WhatsApp & Admin */}
        <div className="flex items-center gap-6">
          <a
            href="https://wa.me/5511947321510?text=Ol%C3%A1%20Romero!"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>(11) 94732-1510</span>
          </a>

          <Link
            href="/admin/login"
            className="flex items-center gap-1 text-slate-500 hover:text-sky-400 transition-colors"
          >
            <Lock className="w-3 h-3" />
            <span>Admin</span>
          </Link>
        </div>

      </div>

      <div className="text-center text-slate-600 text-[11px] mt-6">
        © {currentYear} MOTA Serviços de Ar-Condicionado. Todos os direitos reservados.
      </div>
    </footer>
  );
}
