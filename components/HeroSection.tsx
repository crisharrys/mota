'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wrench, 
  ShieldCheck, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2, 
  Gauge, 
  Zap, 
  Sparkles,
  RotateCw,
  Sliders,
  Cpu
} from 'lucide-react';

interface Hotspot {
  id: string;
  label: string;
  value: string;
  x: string; // percentage position on image
  y: string;
  description: string;
}

const inspectionHotspots: Hotspot[] = [
  {
    id: 'gauge',
    label: 'Manômetro & Vácuo',
    value: 'Pressão 125 PSI • Vácuo < 500μ',
    x: '52%',
    y: '37%',
    description: 'Aferição de vácuo profundo com vacuômetro digital Testo e carga de fluido ecológico R-32.',
  },
  {
    id: 'tablet',
    label: 'Diagnóstico Digital PMOC',
    value: 'Laudo 100% Conforme Anvisa',
    x: '62%',
    y: '57%',
    description: 'Relatório técnico digital gerado no local com assinatura técnica e termo de garantia.',
  },
  {
    id: 'fans',
    label: 'Turbinas Inverter Duplas',
    value: 'Fluxo Livre • 19 dB Ruído',
    x: '38%',
    y: '38%',
    description: 'Motor Inverter sem vibrações bruscas, garantindo silêncio e até 70% de economia elétrica.',
  },
];

export default function HeroSection() {
  const [fanSpeed, setFanSpeed] = useState<'normal' | 'turbo' | 'off'>('normal');
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(inspectionHotspots[0]);

  return (
    <section id="inicio" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-[#020914]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Split Grid Layout (Inspiração Thermo Tune com Romero Mota) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Bold Typography & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            {/* Top Sub-badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-400 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span>Engenharia Térmica em São Paulo</span>
            </div>

            {/* Giant Punchy Headline (Precision HVAC Maintenance & Repair style) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] font-display mb-6">
              Instalação e <span className="text-gradient-cyan">Manutenção de Precisão</span> em Ar-Condicionado
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed font-light max-w-xl">
              Sistemas calibrados por <strong>Romero Mota</strong> com vacuômetro digital, tubulação 100% cobre e rigor cirúrgico de fábrica para garantir máxima performance, economia de energia e silêncio absoluto.
            </p>

            {/* Technical Checklist Pills */}
            <div className="space-y-3 mb-8 w-full max-w-md">
              {[
                'Vácuo profundo digital certificado (< 500 microns)',
                'Tubulação 100% cobre puro (sem alumínio frágil)',
                'Garantia do fabricante integralmente preservada',
                'Atendimento ágil em São Paulo, ABC e Alphaville',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 border border-sky-400/30">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a
                href="https://wa.me/5511947321510?text=Ol%C3%A1%20Romero!%20Vim%20pelo%20site%20da%20Mota%20Ar-Condicionado%20e%20gostaria%20de%20um%20or%C3%A7amento%20de%20precis%C3%A3o."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-sky-400 via-sky-500 to-cyan-500 hover:from-sky-300 hover:to-cyan-400 text-[#020914] font-black text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(56,189,248,0.4)] transition-all hover:scale-105"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Solicitar Orçamento no WhatsApp</span>
              </a>

              <a
                href="#calculadora"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-sky-950/40 hover:bg-sky-900/50 text-sky-200 hover:text-white border border-sky-500/30 text-sm font-bold transition-all"
              >
                <span>Calcular BTUs</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Direct Phone Highlight */}
            <div className="mt-8 flex items-center gap-2 text-xs text-slate-400">
              <span>Plantão com Romero Mota:</span>
              <a href="tel:+5511947321510" className="text-emerald-400 font-bold hover:underline">
                (11) 94732-1510
              </a>
            </div>
          </motion.div>

          {/* Right Column: Interactive Animated Condenser Experience */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            {/* Outer Ambient Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/25 to-cyan-500/20 rounded-[32px] blur-2xl -z-10" />

            {/* Image Frame with Interactive Overlays */}
            <div className="relative rounded-[32px] overflow-hidden border border-sky-400/40 bg-[#04142b] shadow-2xl">
              
              {/* The Photographic Image: Technician Inspecting Condenser Unit */}
              <div className="relative w-full h-[420px] sm:h-[500px]">
                <img
                  src="/images/hvac-condenser-rooftop.jpg"
                  alt="Técnico Romero Mota inspecionando condensadora de ar condicionado em São Paulo"
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020914] via-transparent to-black/30 pointer-events-none" />

                {/* ANIMATED CONDENSER FANS (Simulated Interactive Turbine Rotation) */}
                {fanSpeed !== 'off' && (
                  <>
                    {/* Top Fan Turbine Overlay */}
                    <div 
                      className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-sky-400/30 pointer-events-none"
                      style={{ top: '23%', left: '33%' }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: fanSpeed === 'turbo' ? 0.6 : 1.8,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        className="w-full h-full rounded-full border-4 border-dashed border-sky-400/40 opacity-70"
                      />
                    </div>

                    {/* Bottom Fan Turbine Overlay */}
                    <div 
                      className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-sky-400/30 pointer-events-none"
                      style={{ top: '56%', left: '33%' }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: fanSpeed === 'turbo' ? 0.6 : 1.8,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        className="w-full h-full rounded-full border-4 border-dashed border-sky-400/40 opacity-70"
                      />
                    </div>
                  </>
                )}

                {/* INTERACTIVE PULSING HOTSPOTS */}
                {inspectionHotspots.map((h) => {
                  const isSelected = selectedHotspot?.id === h.id;
                  return (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => setSelectedHotspot(isSelected ? null : h)}
                      style={{ top: h.y, left: h.x }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group focus:outline-none"
                      title={h.label}
                    >
                      <span className="relative flex h-6 w-6">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                        <span className={`relative inline-flex rounded-full h-6 w-6 border-2 border-white items-center justify-center text-[10px] font-black shadow-lg transition-transform group-hover:scale-125 ${
                          isSelected ? 'bg-emerald-400 text-black' : 'bg-sky-500 text-white'
                        }`}>
                          +
                        </span>
                      </span>
                    </button>
                  );
                })}

                {/* Hotspot Popover Detail Card */}
                {selectedHotspot && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="absolute bottom-16 left-4 right-4 sm:left-6 sm:right-6 z-30 p-4 rounded-2xl bg-[#020914]/95 border border-sky-400/50 backdrop-blur-xl shadow-2xl"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        {selectedHotspot.label}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400 font-bold">
                        {selectedHotspot.value}
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed font-light">
                      {selectedHotspot.description}
                    </p>
                  </motion.div>
                )}

              </div>

              {/* Bottom Interactive Control Bar of the Image */}
              <div className="p-4 sm:p-5 bg-[#031122] border-t border-sky-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
                
                {/* Fan Speed Controls */}
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-semibold text-[11px] flex items-center gap-1">
                    <RotateCw className="w-3.5 h-3.5 text-sky-400" />
                    Turbinas:
                  </span>
                  <div className="flex rounded-lg bg-sky-950/60 p-0.5 border border-sky-500/20">
                    <button
                      type="button"
                      onClick={() => setFanSpeed('normal')}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
                        fanSpeed === 'normal' ? 'bg-sky-400 text-black' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Normal (19 dB)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFanSpeed('turbo')}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
                        fanSpeed === 'turbo' ? 'bg-cyan-400 text-black' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Turbo 100%
                    </button>
                    <button
                      type="button"
                      onClick={() => setFanSpeed('off')}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
                        fanSpeed === 'off' ? 'bg-red-500/30 text-red-300' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Pausar
                    </button>
                  </div>
                </div>

                {/* Hotspot helper text */}
                <span className="text-[11px] text-sky-400/80 font-mono">
                  💡 Clique nos pontos (+) para inspecionar
                </span>

              </div>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
