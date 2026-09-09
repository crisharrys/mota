'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, MessageSquare, Menu, X, Shield, Settings, Sparkles } from 'lucide-react';
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

  const navLinks = [
    { label: 'Serviços', href: '#servicos' },
    { label: 'Calculadora BTUs', href: '#calculadora' },
    { label: 'Equipamentos', href: '#equipamentos' },
    { label: 'Marcas', href: '#marcas' },
    { label: 'Diferenciais', href: '#diferenciais' },
    { label: 'Orçamento', href: '#contato' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#020914]/85 backdrop-blur-md border-b border-sky-500/15 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-slate-300 hover:text-sky-400 transition-colors relative group py-1"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-sky-400 to-sky-200 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA Buttons & Admin */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Quick WhatsApp CTA */}
            <a
              href="https://wa.me/5511947321510?text=Ol%C3%A1%2C%20Romero!%20Vim%20pelo%20site%20da%20Mota%20Ar-Condicionado%20e%20gostaria%20de%20um%20or%C3%A7amento."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm transition-all duration-300 shadow-md shadow-emerald-500/20 hover:scale-105"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>WhatsApp: (11) 94732-1510</span>
            </a>

            {/* Admin shortcut */}
            <Link
              href="/admin/login"
              title="Acesso Administrativo"
              className="p-2 rounded-full text-slate-400 hover:text-sky-300 hover:bg-sky-950/40 border border-slate-800 hover:border-sky-500/30 transition-all"
            >
              <Settings className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/admin/login"
              className="p-2 text-slate-400 hover:text-sky-300"
              title="Admin"
            >
              <Settings className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-sky-950/40 text-slate-200 border border-sky-500/20 focus:outline-none"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl bg-[#041326]/95 backdrop-blur-xl border border-sky-500/20 shadow-2xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-slate-200 hover:bg-sky-500/10 hover:text-sky-400 font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 border-t border-sky-500/20 flex flex-col gap-2">
              <a
                href="https://wa.me/5511947321510?text=Ol%C3%A1%2C%20Romero!%20Vim%20pelo%20site%20da%20Mota%20Ar-Condicionado%20e%20gostaria%20de%20um%20or%C3%A7amento."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-500 text-white font-semibold text-sm shadow-md"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>WhatsApp: (11) 94732-1510</span>
              </a>
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-2 text-xs text-slate-400 hover:text-sky-300"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Área Restrita (Admin)</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
