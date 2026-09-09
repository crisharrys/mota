'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, MessageSquare, Menu, X, Settings } from 'lucide-react';
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
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      
      {/* Top Utility Bar (Inspiração Thermo Tune com Romero Mota) */}
      <div className="bg-[#0ea5e9] text-[#020914] text-[11px] sm:text-xs font-bold py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4">
          <div className="flex items-center gap-4">
            <a
              href="tel:+5511947321510"
              className="flex items-center gap-1.5 hover:underline"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Plantão: (11) 94732-1510</span>
            </a>
            <span className="hidden md:inline">•</span>
            <a
              href="mailto:contato@motaarcondicionado.com.br"
              className="hidden md:flex items-center gap-1.5 hover:underline"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>contato@motaarcondicionado.com.br</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[11px]">
              <MapPin className="w-3 h-3" />
              <span>São Paulo, ABC e Alphaville</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="text-emerald-950 bg-emerald-300/60 px-2 py-0.5 rounded-full text-[10px] font-black">
              ATENDIMENTO HOJE
            </span>
          </div>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-[#020914]/90 backdrop-blur-xl border-b border-sky-500/20 py-3 shadow-xl'
            : 'bg-[#020914]/60 backdrop-blur-md py-4 border-b border-sky-500/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <a href="#inicio" className="text-xs font-semibold text-slate-300 hover:text-sky-400 transition-colors">
              Início
            </a>
            <a href="#experiencia" className="text-xs font-semibold text-slate-300 hover:text-sky-400 transition-colors">
              Simulador 3D
            </a>
            <a href="#raio-x" className="text-xs font-semibold text-slate-300 hover:text-sky-400 transition-colors">
              Raio-X Técnico
            </a>
            <a href="#calculadora" className="text-xs font-semibold text-slate-300 hover:text-sky-400 transition-colors">
              Calculadora BTUs
            </a>
            <a href="#servicos" className="text-xs font-semibold text-slate-300 hover:text-sky-400 transition-colors">
              Serviços
            </a>
            <a href="#contato" className="text-xs font-semibold text-slate-300 hover:text-sky-400 transition-colors">
              Orçamento
            </a>
          </nav>

          {/* Right Action Button (Get a Quote style) */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/5511947321510?text=Ol%C3%A1%20Romero!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20ar-condicionado."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-400 to-cyan-500 hover:from-sky-300 hover:to-cyan-400 text-[#020914] font-black text-xs uppercase tracking-wider shadow-md shadow-sky-500/30 transition-all hover:scale-105"
            >
              Solicitar Orçamento
            </a>

            <Link
              href="/admin/login"
              title="Acesso Administrativo"
              className="p-2 rounded-full text-slate-400 hover:text-sky-300 hover:bg-sky-950/40 border border-slate-800 transition-all"
            >
              <Settings className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-sky-950/40 text-slate-200 border border-sky-500/20"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mx-4 mt-3 p-4 rounded-2xl bg-[#041326]/95 backdrop-blur-xl border border-sky-500/25 shadow-2xl flex flex-col gap-3">
            <a
              href="#inicio"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-200 hover:text-sky-400 font-medium text-xs"
            >
              Início
            </a>
            <a
              href="#experiencia"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-200 hover:text-sky-400 font-medium text-xs"
            >
              Simulador 3D
            </a>
            <a
              href="#raio-x"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-200 hover:text-sky-400 font-medium text-xs"
            >
              Raio-X Técnico
            </a>
            <a
              href="#calculadora"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-200 hover:text-sky-400 font-medium text-xs"
            >
              Calculadora BTUs
            </a>
            <a
              href="#servicos"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-200 hover:text-sky-400 font-medium text-xs"
            >
              Serviços
            </a>
            <a
              href="#contato"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-200 hover:text-sky-400 font-medium text-xs"
            >
              Solicitar Orçamento
            </a>
            
            <a
              href="https://wa.me/5511947321510?text=Ol%C3%A1%20Romero!"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-cyan-500 text-[#020914] font-black text-xs uppercase"
            >
              Solicitar Orçamento no WhatsApp
            </a>
          </div>
        )}

      </div>
    </header>
  );
}
