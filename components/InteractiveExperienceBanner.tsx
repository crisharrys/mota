'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, 
  Snowflake, 
  Wrench, 
  Zap, 
  ShieldCheck, 
  Wind, 
  Gauge, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  MessageSquare
} from 'lucide-react';

export default function InteractiveExperienceBanner() {
  const [activeTab, setActiveTab] = useState<'cooling' | 'installer' | 'unit'>('cooling');
  const [sunPower, setSunPower] = useState<number>(50); // 0 (full cold) to 100 (full hot sun)

  // Calculate current ambient temperature based on sun vs AC slider
  const ambientTemp = Math.round(18 + (sunPower / 100) * 18); // 18°C to 36°C

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Experiência Visual Interativa 3D
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight font-display">
            A Física da Climatização em <span className="text-gradient-cyan">Ação Real</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base font-light">
            Veja como o sol escaldante é neutralizado pela engenharia de Romero Mota e observe o rigor cirúrgico da nossa instalação técnica.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('cooling')}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2.5 ${
              activeTab === 'cooling'
                ? 'bg-sky-500 text-white shadow-[0_0_25px_rgba(56,189,248,0.4)] scale-105'
                : 'bg-[#04142b]/80 text-slate-300 hover:text-white border border-sky-500/20'
            }`}
          >
            <Sun className="w-4 h-4 text-amber-400" />
            <span>1. Sol Entrando vs. Eficiência do Ar</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('installer')}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2.5 ${
              activeTab === 'installer'
                ? 'bg-sky-500 text-white shadow-[0_0_25px_rgba(56,189,248,0.4)] scale-105'
                : 'bg-[#04142b]/80 text-slate-300 hover:text-white border border-sky-500/20'
            }`}
          >
            <Wrench className="w-4 h-4 text-emerald-400" />
            <span>2. O Instalador em Ação (Padrão de Obra)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('unit')}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2.5 ${
              activeTab === 'unit'
                ? 'bg-sky-500 text-white shadow-[0_0_25px_rgba(56,189,248,0.4)] scale-105'
                : 'bg-[#04142b]/80 text-slate-300 hover:text-white border border-sky-500/20'
            }`}
          >
            <Snowflake className="w-4 h-4 text-sky-300" />
            <span>3. Design 3D & Tecnologia Inverter</span>
          </button>
        </div>

        {/* Main Display Cinema Stage */}
        <div className="relative rounded-[32px] overflow-hidden border border-sky-400/35 bg-[#020914] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9)]">
          
          <AnimatePresence mode="wait">
            
            {/* TAB 1: SUNLIGHT VS COOLING FLOW */}
            {activeTab === 'cooling' && (
              <motion.div
                key="cooling"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative min-h-[520px] sm:min-h-[600px] flex flex-col justify-between p-6 sm:p-10"
              >
                {/* Background 3D Render Image */}
                <div className="absolute inset-0 -z-10">
                  <Image
                    src="/images/ac-split-room.jpg"
                    alt="Ar Condicionado Split 3D no ambiente com sol entrando"
                    fill
                    priority
                    className="object-cover object-center brightness-90 transition-all duration-700"
                  />
                  {/* Dynamic heat vs frost overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none transition-all duration-500"
                    style={{
                      background: `radial-gradient(circle at 10% 40%, rgba(245, 158, 11, ${sunPower * 0.0035}) 0%, transparent 60%),
                                   radial-gradient(circle at 75% 30%, rgba(56, 189, 248, ${(100 - sunPower) * 0.004}) 0%, transparent 60%),
                                   linear-gradient(to top, rgba(2,9,20,0.9) 0%, rgba(2,9,20,0.2) 50%, rgba(2,9,20,0.7) 100%)`
                    }}
                  />
                </div>

                {/* Top HUD Badges */}
                <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
                  <div className="p-3 px-4 rounded-2xl bg-[#04142b]/85 border border-sky-400/30 backdrop-blur-md flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${ambientTemp > 24 ? 'bg-amber-400 animate-ping' : 'bg-sky-400 animate-pulse'}`} />
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                        Temperatura do Ambiente
                      </span>
                      <span className="text-xl font-black text-white font-mono">
                        {ambientTemp}°C {ambientTemp <= 20 ? '❄️ Ar Gelado' : ambientTemp <= 25 ? '🍃 Clima Conforto' : '☀️ Calor Intenso'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 px-4 rounded-2xl bg-[#04142b]/85 border border-emerald-500/30 backdrop-blur-md text-right">
                    <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-wider block">
                      Eficiência Inverter Romero Mota
                    </span>
                    <span className="text-xs font-bold text-white">
                      {sunPower > 50 ? 'Compressor Modular Acelerando' : 'Modo Eco Contínuo Ativado'}
                    </span>
                  </div>
                </div>

                {/* Bottom Interactive Control Panel */}
                <div className="relative z-10 max-w-xl mx-auto w-full p-6 rounded-3xl bg-[#04142b]/90 border border-sky-400/40 backdrop-blur-xl shadow-2xl">
                  <div className="flex items-center justify-between text-xs font-bold mb-2">
                    <span className="flex items-center gap-1.5 text-sky-300">
                      <Snowflake className="w-4 h-4 text-sky-400" />
                      Ar Inverter Ligado (18°C)
                    </span>
                    <span className="flex items-center gap-1.5 text-amber-300">
                      <Sun className="w-4 h-4 text-amber-400" />
                      Sol da Tarde Entrando (36°C)
                    </span>
                  </div>

                  {/* Interactive Thermal Slider */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sunPower}
                    onChange={(e) => setSunPower(Number(e.target.value))}
                    className="w-full h-3 bg-gradient-to-r from-sky-500 via-teal-400 to-amber-500 rounded-lg appearance-none cursor-pointer accent-white"
                  />

                  <p className="text-[11px] text-slate-300 text-center mt-3">
                    Arraste o controle para simular como a tecnologia Inverter de alta potência combate os raios solares em tempo real.
                  </p>

                  <div className="mt-4 pt-3 border-t border-sky-500/20 flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-medium">
                      Quer essa climatização na sua casa?
                    </span>
                    <a
                      href="https://wa.me/5511947321510?text=Ol%C3%A1%20Romero!%20Vi%20a%20simula%C3%A7%C3%A3o%203D%20no%20site%20e%20quero%20um%20ar-condicionado%20Inverter%20potente%20para%20minha%20sala."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-current" />
                      <span>Pedir Orçamento</span>
                    </a>
                  </div>
                </div>

              </motion.div>
            )}

            {/* TAB 2: INSTALLER WORK AT ACTION */}
            {activeTab === 'installer' && (
              <motion.div
                key="installer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative min-h-[520px] sm:min-h-[600px] flex flex-col justify-between p-6 sm:p-10"
              >
                {/* Background Installer Photo */}
                <div className="absolute inset-0 -z-10">
                  <Image
                    src="/images/installer-working.jpg"
                    alt="Técnico Romero Mota instalando ar-condicionado com vacuômetro digital"
                    fill
                    priority
                    className="object-cover object-center brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020914] via-transparent to-[#020914]/80" />
                </div>

                {/* Top Badges */}
                <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
                  <div className="p-3 px-4 rounded-2xl bg-[#04142b]/90 border border-sky-400/40 backdrop-blur-md">
                    <span className="text-[10px] text-sky-400 font-mono font-bold uppercase tracking-wider block">
                      PADRÃO DE INSTALAÇÃO CIRÚRGICA
                    </span>
                    <span className="text-sm font-bold text-white">
                      Romero Mota • Obra Limpa & Ferramental de Concessionária
                    </span>
                  </div>

                  <div className="p-3 px-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 backdrop-blur-md">
                    <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Garantia de Fábrica 100% Preservada
                    </span>
                  </div>
                </div>

                {/* Hotspot Floating Cards */}
                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto w-full">
                  
                  <div className="p-4 rounded-2xl bg-[#04142b]/90 border border-sky-400/30 backdrop-blur-md shadow-xl">
                    <div className="flex items-center gap-2 text-xs font-bold text-sky-400 mb-1">
                      <Gauge className="w-4 h-4" />
                      <span>Vacuômetro Digital Testo</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      Aferição do vácuo abaixo de 500 microns para eliminar 100% da umidade que corrói o motor.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#04142b]/90 border border-sky-400/30 backdrop-blur-md shadow-xl">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Tubulação 100% Cobre Puro</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      Zero tubos de alumínio frágil. Curvador hidráulico sem amassar ou reduzir a passagem de gás.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#04142b]/90 border border-sky-400/30 backdrop-blur-md shadow-xl">
                    <div className="flex items-center gap-2 text-xs font-bold text-teal-400 mb-1">
                      <Sparkles className="w-4 h-4" />
                      <span>Proteção Total do Seu Piso</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      Lona especial e aspirador acoplado para não deixar poeira na sua mobília ou piso de madeira.
                    </p>
                  </div>

                </div>

                {/* CTA Callout */}
                <div className="relative z-10 pt-4 flex items-center justify-between border-t border-sky-500/20">
                  <span className="text-xs text-slate-300">
                    Atendimento em São Paulo, Alphaville e ABC.
                  </span>
                  <a
                    href="https://wa.me/5511947321510?text=Ol%C3%A1%20Romero!%20Gostaria%20de%20agendar%20uma%20instala%C3%A7%C3%A3o%20com%20voc%C3%AA."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Agendar com Romero no WhatsApp</span>
                  </a>
                </div>

              </motion.div>
            )}

            {/* TAB 3: 3D UNIT CLOSE-UP */}
            {activeTab === 'unit' && (
              <motion.div
                key="unit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative min-h-[520px] sm:min-h-[600px] flex flex-col justify-between p-6 sm:p-10"
              >
                {/* Background 3D Unit Image */}
                <div className="absolute inset-0 -z-10">
                  <Image
                    src="/images/ac-unit-3d.jpg"
                    alt="Ar Condicionado Split 3D Studio close up com gelo e vapor"
                    fill
                    priority
                    className="object-cover object-center brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020914] via-transparent to-[#020914]/70" />
                </div>

                {/* Top Info */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="p-3 px-4 rounded-2xl bg-[#04142b]/90 border border-sky-400/40 backdrop-blur-md">
                    <span className="text-[10px] text-sky-400 font-mono font-bold uppercase tracking-wider block">
                      TECNOLOGIA INVERTER DE ÚLTIMA GERAÇÃO
                    </span>
                    <span className="text-base font-bold text-white">
                      Display Digital Oculto 18°C & Gás Ecológico R-32
                    </span>
                  </div>

                  <span className="px-3.5 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-mono font-bold">
                    Selo Procel A+++
                  </span>
                </div>

                {/* Bottom Features & Action */}
                <div className="relative z-10 max-w-2xl p-6 rounded-3xl bg-[#04142b]/90 border border-sky-400/35 backdrop-blur-xl">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Economia Máxima e Silêncio de 19 dB
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light mb-4">
                    O compressor inverter ajusta a rotação continuamente, evitando os picos de partida dos modelos comuns. Você tem conforto térmico constante sem sustos na conta de energia.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-sky-500/20">
                    <div className="flex items-center gap-3 text-xs text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Até 70% de economia energética</span>
                    </div>

                    <a
                      href="https://wa.me/5511947321510?text=Ol%C3%A1%20Romero!%20Gostaria%20de%20um%20or%C3%A7amento%20para%20adquirir%20um%20aparelho%20Inverter%20novo."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                      <span>Comprar Este Modelo</span>
                    </a>
                  </div>
                </div>

              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
