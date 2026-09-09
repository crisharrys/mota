'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Wrench, Settings2, Wind, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';

export default function HeroSection() {
  const [targetTemp, setTargetTemp] = useState<number>(18);

  const temperatures = [16, 18, 20, 22];

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center">
        
        {/* Subtle Author Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 text-xs font-medium mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span>Romero Mota • Soluções Térmicas em São Paulo</span>
        </motion.div>

        {/* Minimalist Punchy Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-100 tracking-tight leading-[1.1] mb-6 font-display"
        >
          Ar Gelado. <span className="text-gradient-cyan">Silencioso.</span><br />
          Sem Complicações.
        </motion.h1>

        {/* Short Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto mb-10 leading-relaxed font-light"
        >
          Venda das melhores marcas Inverter, instalação padronizada com vácuo digital e manutenção rápida para sua casa ou empresa.
        </motion.p>

        {/* The 3 Core Pillars (direct from client card) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#04142b]/80 border border-sky-500/20 text-xs sm:text-sm font-semibold text-slate-200 shadow-sm backdrop-blur-md">
            <ShoppingCart className="w-4 h-4 text-sky-400" />
            <span>Venda de Novos</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#04142b]/80 border border-sky-500/20 text-xs sm:text-sm font-semibold text-slate-200 shadow-sm backdrop-blur-md">
            <Wrench className="w-4 h-4 text-sky-400" />
            <span>Instalação Padrão</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#04142b]/80 border border-sky-500/20 text-xs sm:text-sm font-semibold text-slate-200 shadow-sm backdrop-blur-md">
            <Settings2 className="w-4 h-4 text-sky-400" />
            <span>Manutenção & Gás</span>
          </div>
        </motion.div>

        {/* Creative Interactive Thermostat Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-md mx-auto p-6 sm:p-7 rounded-3xl bg-[#04142b]/90 border border-sky-400/30 backdrop-blur-xl shadow-2xl relative overflow-hidden mb-10"
        >
          {/* Subtle glow behind card */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 via-transparent to-transparent pointer-events-none" />

          <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
            <span className="flex items-center gap-1.5 text-sky-400 font-semibold uppercase tracking-wider text-[10px]">
              <Wind className="w-3.5 h-3.5 animate-bounce" />
              Controle de Conforto
            </span>
            <span className="text-emerald-400 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Pronto Atendimento
            </span>
          </div>

          {/* Temperature Big Display */}
          <div className="my-3 flex items-baseline justify-center gap-1">
            <span className="text-6xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-sky-100 to-sky-400 tracking-tighter font-display">
              {targetTemp}
            </span>
            <span className="text-3xl font-bold text-sky-400">°C</span>
          </div>

          <p className="text-xs text-slate-300 mb-5">
            Selecione a temperatura desejada para o seu ambiente:
          </p>

          {/* Temperature selector buttons */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {temperatures.map((temp) => (
              <button
                key={temp}
                type="button"
                onClick={() => setTargetTemp(temp)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  targetTemp === temp
                    ? 'bg-sky-400 text-[#020914] shadow-md shadow-sky-400/40 scale-105'
                    : 'bg-sky-950/60 text-slate-300 hover:text-white border border-sky-500/20'
                }`}
              >
                {temp}°C
              </button>
            ))}
          </div>

          {/* Direct CTA */}
          <a
            href={`https://wa.me/5511947321510?text=${encodeURIComponent(
              `Olá Romero! Gostaria de um orçamento para climatizar meu espaço a ${targetTemp}°C com ar-condicionado!`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm shadow-md shadow-emerald-500/25 transition-all hover:scale-[1.02]"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Pedir Orçamento no WhatsApp</span>
          </a>
        </motion.div>

        {/* Trust pill */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-sky-400" />
          <span>Garantia de fábrica mantida com processo 100% técnico</span>
        </div>

      </div>
    </section>
  );
}
