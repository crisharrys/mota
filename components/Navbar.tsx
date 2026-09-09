'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageSquare, Menu, X, Settings } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#020914]/80 backdrop-blur-xl border-b border-sky-500/15 py-3.5 shadow-xl shadow-black/50'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Logo size="md" />

          {/* Clean Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#servicos" className="text-sm font-medium text-slate-300 hover:text-sky-400 transition-colors">
              Serviços
            </a>
            <a href="#calculadora" className="text-sm font-medium text-slate-300 hover:text-sky-400 transition-colors">
              Calculadora
            </a>
            <a href="#contato" className="text-sm font-medium text-slate-300 hover:text-sky-400 transition-colors">
              Orçamento
            </a>
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/5511947321510?text=Ol%C3%A1%2C%20Romero!%20Vim%20pelo%20site%20da%20Mota%20Ar-Condicionado%20e%20gostaria%20de%20um%20or%C3%A7amento."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-xs transition-all duration-300 shadow-md shadow-emerald-500/20 hover:scale-105"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>(11) 94732-1510</span>
            </a>

            <Link
              href="/admin/login"
              title="Painel Administrativo"
              className="p-2 rounded-full text-slate-400 hover:text-sky-300 hover:bg-sky-950/40 border border-slate-800 hover:border-sky-500/30 transition-all"
            >
              <Settings className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-sky-950/40 text-slate-200 border border-sky-500/20 focus:outline-none"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl bg-[#041326]/95 backdrop-blur-xl border border-sky-500/20 shadow-2xl flex flex-col gap-3 animate-in fade-in duration-200">
            <a
              href="#servicos"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-200 hover:text-sky-400 font-medium text-sm"
            >
              Serviços
            </a>
            <a
              href="#calculadora"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-200 hover:text-sky-400 font-medium text-sm"
            >
              Calculadora de BTUs
            </a>
            <a
              href="#contato"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-200 hover:text-sky-400 font-medium text-sm"
            >
              Solicitar Orçamento
            </a>
            <div className="pt-2 border-t border-sky-500/15 flex items-center justify-between">
              <a
                href="https://wa.me/5511947321510?text=Ol%C3%A1%2C%20Romero!%20Vim%20pelo%20site%20da%20Mota%20Ar-Condicionado."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-emerald-400"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>(11) 94732-1510</span>
              </a>
              <Link
                href="/admin/login"
                className="text-xs text-slate-400 hover:text-sky-300"
              >
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
