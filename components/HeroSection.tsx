'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wind, 
  MessageSquare, 
  ShieldCheck, 
  Zap, 
  VolumeX, 
  Sparkles, 
  ChevronRight,
  Gauge,
  CheckCircle2,
  Award
} from 'lucide-react';

interface ClimateMode {
  id: string;
  name: string;
  temp: number;
  fanSpeed: string;
  noise: string;
  purity: string;
  economy: string;
  color: string;
  glowColor: string;
  desc: string;
}

const climateModes: ClimateMode[] = [
  {
    id: 'turbo',
    name: 'Turbo Congelamento',
    temp: 16,
    fanSpeed: 'Potência Máxima',
    noise: '24 dB',
    purity: '99.9% Ionizado',
    economy: 'Modo Rápido',
    color: 'from-cyan-400 to-blue-500',
    glowColor: 'rgba(56, 189, 248, 0.5)',
    desc: 'Resfriamento ultrarrápido para dias de calor escaldante em São Paulo.',
  },
  {
    id: 'comfort',
    name: 'Conforto Térmico Ideal',
    temp: 19,
    fanSpeed: 'Automático Suave',
    noise: '20 dB',
    purity: 'Filtro Hospitalar Ativo',
    economy: 'Até 70% Menos Energia',
    color: 'from-sky-300 via-sky-400 to-blue-600',
    glowColor: 'rgba(14, 165, 233, 0.45)',
    desc: 'A temperatura perfeita recomendada por especialistas para descanso e produtividade.',
  },
  {
    id: 'night',
    name: 'Silêncio Noturno Sleep',
    temp: 22,
    fanSpeed: 'Brisa Silenciosa',
    noise: '19 dB (Inaudível)',
    purity: 'Ar Puro Constante',
    economy: 'Máxima Eficiência',
    color: 'from-teal-300 to-sky-400',
    glowColor: 'rgba(45, 212, 191, 0.4)',
    desc: 'Operação ultrassilenciosa para noites inteiras de sono profundo sem resfriados.',
  },
  {
    id: 'eco',
    name: 'Brisa Inteligente Eco',
    temp: 24,
    fanSpeed: 'Eco Inverter Contínuo',
    noise: '18 dB',
    purity: 'Proteção Antialérgica',
    economy: 'Consumo Mínimo A+++',
    color: 'from-emerald-300 to-sky-400',
    glowColor: 'rgba(52, 211, 153, 0.4)',
    desc: 'Equilíbrio térmico sustentável com zero desperdício na conta de luz.',
  },
];

export default function HeroSection() {
  const [activeMode, setActiveMode] = useState<ClimateMode>(climateModes[1]);

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Top Header Badge */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-sky-500/15 via-sky-400/10 to-transparent border border-sky-400/30 text-sky-300 text-xs font-semibold mb-6 shadow-sm backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span>Romero Mota • Engenharia Térmica de Alto Padrão em São Paulo</span>
            <span className="hidden sm:inline text-sky-500/60">•</span>
            <span className="hidden sm:inline text-slate-300 font-normal">WhatsApp (11) 94732-1510</span>
          </motion.div>

          {/* Main Explosive Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-100 tracking-tight leading-[1.08] font-display"
          >
            O Clima Perfeito Não é Sorte.{' '}
            <span className="text-gradient-cyan">É Engenharia.</span>
          </motion.h1>

          {/* Punchy Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-300 mt-6 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Venda das melhores marcas Inverter, instalação padronizada com vacuômetro digital 
            e manutenção com garantia por escrito. O fim definitivo do calor, do ruído e do ar pesado.
          </motion.p>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE CLIMATE ENGINE CONSOLE (Awwwards / Apple Pro Level)           */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative max-w-4xl mx-auto rounded-[32px] p-6 sm:p-9 bg-gradient-to-b from-[#061833]/90 via-[#041226]/95 to-[#020914] border border-sky-400/35 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(2,11,24,0.8)] overflow-hidden"
        >
          {/* Dynamic Ambient Glow Behind Unit */}
          <div 
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-[110px] pointer-events-none transition-all duration-700 -z-10"
            style={{ background: activeMode.glowColor }}
          />

          {/* Top Telemetry Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-sky-500/20 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300">
                <Wind className="w-4 h-4 animate-bounce" />
              </div>
              <div>
                <span className="font-bold text-white uppercase tracking-wider text-[11px] block">
                  Simulador de Eficiência Térmica
                </span>
                <span className="text-sky-400/90 text-[10px]">
                  Unidade Evaporadora Inverter Pro Series
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Romero Mota Disponível Hoje
              </span>
            </div>
          </div>

          {/* Realistic AC Unit Visualizer Housing */}
          <div className="my-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#031124] via-[#051a38] to-[#031124] border border-sky-500/35 relative shadow-2xl overflow-hidden">
            
            {/* Embedded 3D Render Image of the AC Unit */}
            <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden mb-6 border border-sky-400/30 shadow-inner group">
              <img
                src="/images/ac-unit-3d.jpg"
                alt="Ar Condicionado Split 3D Inverter com display LED 18°C"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#031124] via-transparent to-transparent pointer-events-none" />
              
              {/* Badge overlay on 3D image */}
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#020914]/80 backdrop-blur-md border border-sky-400/30 text-[10px] font-mono text-sky-300 font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>UNIDADE EVAPORADORA 3D • DISPLAY 18°C</span>
              </div>
            </div>

            {/* AC Unit Telemetry & Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
              
              {/* Left: Unit Branding & Features */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-400/40 flex items-center justify-center text-sky-300 shadow-md">
                  <Zap className="w-6 h-6 text-sky-400" />
                </div>
                <div>
                  <div className="text-[10px] text-sky-400 font-mono font-bold uppercase tracking-wider">
                    SISTEMA INTELIGENTE INVERTER
                  </div>
                  <div className="text-xl font-black text-white">
                    {activeMode.name}
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    {activeMode.desc}
                  </div>
                </div>
              </div>

              {/* Right: Big Crisp LED Display */}
              <div className="flex items-center gap-3 bg-[#020914]/90 px-6 py-4 rounded-2xl border border-sky-400/50 shadow-[0_0_25px_rgba(56,189,248,0.25)]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMode.temp}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-baseline gap-1"
                  >
                    <span className="text-5xl sm:text-6xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-sky-100 to-sky-300">
                      {activeMode.temp}
                    </span>
                    <span className="text-2xl font-bold text-sky-400 font-mono">°C</span>
                  </motion.div>
                </AnimatePresence>
                
                <div className="border-l border-sky-500/20 pl-3 flex flex-col gap-0.5 text-[10px] font-mono text-sky-300">
                  <span className="text-emerald-400 font-bold">● ONLINE</span>
                  <span>R-32 GÁS</span>
                  <span>VÁCUO OK</span>
                </div>
              </div>

            </div>

            {/* Dynamic Airflow Waves Emitter Graphic */}
            <div className="mt-6 pt-5 border-t border-sky-500/20 flex flex-col gap-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5 text-sky-300 font-medium">
                  <Wind className="w-3.5 h-3.5" />
                  Fluxo Contínuo de Ar Refrigerado:
                </span>
                <span className="text-sky-400 font-mono">{activeMode.fanSpeed}</span>
              </div>

              {/* Animated airflow stream bars */}
              <div className="h-4 w-full bg-[#020b18] rounded-full overflow-hidden p-0.5 flex gap-1 items-center relative">
                {Array.from({ length: 32 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      opacity: [0.2, 0.9, 0.2],
                      scaleY: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.05,
                      ease: 'easeInOut',
                    }}
                    className="flex-1 h-full rounded-full bg-gradient-to-r from-sky-400 to-cyan-300"
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Interactive Mode Switcher Buttons */}
          <div className="mb-6">
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-3">
              Alterne o Modo de Climatização:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {climateModes.map((mode) => {
                const isActive = activeMode.id === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setActiveMode(mode)}
                    className={`p-3.5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden ${
                      isActive
                        ? 'bg-sky-500/25 border-sky-400 text-white shadow-[0_0_20px_rgba(56,189,248,0.3)] scale-[1.02]'
                        : 'bg-sky-950/30 border-sky-500/15 text-slate-400 hover:text-slate-200 hover:border-sky-500/35'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold font-mono">
                        {mode.temp}°C
                      </span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                      )}
                    </div>
                    <div className="text-[11px] font-semibold text-slate-200 leading-tight">
                      {mode.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Telemetry HUD Grid (Noise, Economy, Filter) */}
          <div className="grid grid-cols-3 gap-3 mb-8 p-4 rounded-2xl bg-sky-950/30 border border-sky-500/15 text-center">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Ruído Acústico</span>
              <span className="text-sm font-black text-slate-100 font-mono flex items-center justify-center gap-1 mt-0.5">
                <VolumeX className="w-3.5 h-3.5 text-sky-400" />
                {activeMode.noise}
              </span>
            </div>
            <div className="border-x border-sky-500/20">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Economia Inverter</span>
              <span className="text-sm font-black text-emerald-400 font-mono flex items-center justify-center gap-1 mt-0.5">
                <Zap className="w-3.5 h-3.5" />
                {activeMode.economy}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Purificação do Ar</span>
              <span className="text-sm font-black text-sky-300 font-mono flex items-center justify-center gap-1 mt-0.5">
                <Sparkles className="w-3.5 h-3.5" />
                {activeMode.purity}
              </span>
            </div>
          </div>

          {/* Bottom High-Conversion Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-sky-500/20">
            <div className="text-xs text-slate-300 flex items-center gap-2 text-center sm:text-left">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Instalação padrão fábrica com vacuômetro digital e tubulação de cobre.</span>
            </div>

            <a
              href={`https://wa.me/5511947321510?text=${encodeURIComponent(
                `Olá Romero! Gostaria de um orçamento para instalar ar-condicionado no modo ${activeMode.name} (${activeMode.temp}°C). Pode me passar valores?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all hover:scale-105 shrink-0"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Orçar no WhatsApp com Romero</span>
            </a>
          </div>

        </motion.div>

        {/* The 3 Pillars Highlight Bar */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            {
              title: 'Venda de Novos',
              desc: 'Daikin, Fujitsu, LG, Gree e Midea com nota fiscal e garantia total.',
              tag: 'Inverter Procel A',
            },
            {
              title: 'Instalação de Precisão',
              desc: 'Vácuo profundo < 500 microns e tubos 100% cobre maciço.',
              tag: 'Sem Perda de Garantia',
            },
            {
              title: 'Manutenção & PMOC',
              desc: 'Recarga de gás R-410A/R-32 e higienização antibactericida.',
              tag: 'Laudo Anvisa',
            },
          ].map((card, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#04142b]/70 border border-sky-500/20 backdrop-blur-md flex flex-col justify-between shadow-lg text-left"
            >
              <div>
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest block mb-1">
                  {card.tag}
                </span>
                <h3 className="text-base font-bold text-white mb-1">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
