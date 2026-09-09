'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Wind, Zap, Award, Snowflake, ArrowRight, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Sales Copy & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs sm:text-sm font-medium mb-6 shadow-sm">
              <Snowflake className="w-4 h-4 text-sky-400 animate-spin-slow" />
              <span>Especialista em Climatização • São Paulo & Região</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-100 tracking-tight leading-[1.12] mb-6">
              Ar Puro, <span className="text-gradient-cyan">Temperatura Perfeita</span> e Conforto o Ano Todo.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">
              Venda, instalação especializada e manutenção preventiva de ar-condicionado. 
              Garantia do fabricante preservada, vácuo de precisão digital e atendimento ágil 
              em São Paulo, ABC e Alphaville com <strong>Romero Mota</strong>.
            </p>

            {/* Highlights List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 w-full max-w-lg">
              {[
                'Instalação com Vacuômetro Digital',
                'Economia de até 70% com Inverter',
                'Higienização com Laudo e PMOC',
                'Garantia Técnica por Escrito',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a
                href="https://wa.me/5511947321510?text=Ol%C3%A1%2C%20Romero!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20ar-condicionado."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-base shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.55)] transition-all duration-300 hover:scale-[1.02]"
              >
                <MessageSquare className="w-5 h-5 fill-current" />
                <span>Solicitar Orçamento Grátis</span>
              </a>

              <a
                href="#calculadora"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-sky-950/40 hover:bg-sky-900/50 text-sky-200 hover:text-white border border-sky-500/30 hover:border-sky-400/60 font-semibold text-base transition-all duration-300 backdrop-blur-md"
              >
                <span>Calcular BTUs do Ambiente</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Direct Contact info pill */}
            <div className="mt-8 flex items-center gap-3 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Plantão WhatsApp: <strong>(11) 94732-1510</strong> • Atendimento Rápido</span>
            </div>
          </motion.div>

          {/* Right Column: High-End Visual Showcase Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Outer Ambient Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/20 to-blue-600/20 rounded-3xl blur-2xl -z-10" />

            <div className="relative rounded-3xl p-6 sm:p-8 bg-[#04142b]/85 border border-sky-400/25 backdrop-blur-xl shadow-2xl">
              
              {/* Top Bar of the Card */}
              <div className="flex items-center justify-between pb-5 border-b border-sky-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300">
                    <Snowflake className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-100 text-sm">Romero Mota</h3>
                    <p className="text-xs text-sky-400">Técnico Certificado HVAC</p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Disponível Hoje
                </span>
              </div>

              {/* Climate Control Visualizer */}
              <div className="my-6 p-6 rounded-2xl bg-gradient-to-b from-[#061e3d] to-[#020b18] border border-sky-500/20 text-center relative overflow-hidden">
                <div className="absolute top-2 right-3 text-[10px] text-sky-400/80 font-mono">
                  MODO RESFRIAMENTO
                </div>
                
                <div className="flex items-baseline justify-center gap-1 my-3">
                  <span className="text-6xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-sky-100 to-sky-300 tracking-tight font-display">
                    18
                  </span>
                  <span className="text-3xl font-bold text-sky-400">°C</span>
                </div>

                <p className="text-xs text-slate-300 flex items-center justify-center gap-2">
                  <Wind className="w-3.5 h-3.5 text-sky-400 animate-bounce" />
                  Fluxo Contínuo de Ar Gelado & Filtrado
                </p>

                {/* Simulated Airflow Stream Bars */}
                <div className="flex items-center justify-center gap-1.5 mt-4">
                  {[40, 65, 90, 100, 85, 60, 45].map((val, i) => (
                    <div
                      key={i}
                      className="w-1.5 bg-gradient-to-t from-sky-500/40 to-sky-300 rounded-full animate-pulse"
                      style={{ height: `${val * 0.3}px`, animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>

              {/* Feature Grid inside the Card */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-500/15">
                  <Zap className="w-4 h-4 text-sky-400 mb-1" />
                  <div className="text-xs font-bold text-slate-100">Tecnologia Inverter</div>
                  <div className="text-[11px] text-slate-400">Máximo silêncio e economia</div>
                </div>

                <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-500/15">
                  <ShieldCheck className="w-4 h-4 text-sky-400 mb-1" />
                  <div className="text-xs font-bold text-slate-100">Garantia Técnica</div>
                  <div className="text-[11px] text-slate-400">Procedimento padrão fábrica</div>
                </div>
              </div>

              {/* Bottom Quick Call */}
              <div className="mt-5 pt-4 border-t border-sky-500/15 flex items-center justify-between">
                <div className="text-xs text-slate-300">
                  Precisa de atendimento urgente?
                </div>
                <a
                  href="tel:+5511947321510"
                  className="text-xs font-bold text-sky-400 hover:text-sky-300 underline underline-offset-4"
                >
                  Ligar (11) 94732-1510
                </a>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
