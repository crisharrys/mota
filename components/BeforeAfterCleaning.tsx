'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, AlertTriangle, ShieldCheck, Zap, Wind, CheckCircle2, MessageSquare } from 'lucide-react';

export default function BeforeAfterCleaning() {
  const [viewState, setViewState] = useState<'after' | 'before'>('after');

  return (
    <section className="py-20 relative">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Saúde & Eficiência Energética
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight font-display">
            Você Sabe o Que Está <span className="text-gradient-cyan">Respirando?</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 font-light">
            Um aparelho sem higienização periódica acumula até 10x mais ácaros e bactérias que um vaso sanitário, além de aumentar sua conta de luz em até 40%.
          </p>
        </div>

        {/* Interactive Comparison Card */}
        <div className="p-7 sm:p-10 rounded-3xl bg-[#04142b]/90 border border-sky-400/30 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          
          {/* Toggle Pills */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <button
              type="button"
              onClick={() => setViewState('after')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                viewState === 'after'
                  ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-105'
                  : 'bg-sky-950/40 text-slate-400 hover:text-white border border-sky-500/20'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Ar Higienizado (Padrão Romero Mota)</span>
            </button>

            <button
              type="button"
              onClick={() => setViewState('before')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                viewState === 'before'
                  ? 'bg-amber-600 text-white shadow-[0_0_20px_rgba(217,119,6,0.4)] scale-105'
                  : 'bg-sky-950/40 text-slate-400 hover:text-white border border-sky-500/20'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Aparelho Sem Limpeza (+6 Meses)</span>
            </button>
          </div>

          {/* Dynamic Content Display */}
          {viewState === 'after' ? (
            <motion.div
              key="after"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/25 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-white text-sm mb-1">Ar 100% Puro & Desinfetado</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Aplicação de bactericida atóxico hospitalar registrado na Anvisa. Elimina mofo, ácaros e alérgenos.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold mt-4 block">
                  ✓ ZERO ODORES OU CRISES ALÉRGICAS
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/25 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-white text-sm mb-1">Economia de Energia Real</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Serpentinas desobstruídas permitem que o compressor atinja a temperatura com muito menos esforço elétrico.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold mt-4 block">
                  ✓ ATÉ 30% DE QUEDA NA CONTA DE LUZ
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/25 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                    <Wind className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-white text-sm mb-1">Vazão de Ar e Silêncio</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    A turbina limpa gira sem peso extra, resfriando o ambiente duas vezes mais rápido e em silêncio total.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold mt-4 block">
                  ✓ CONFORTO TÉRMICO MÁXIMO
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="before"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/25 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-white text-sm mb-1">Proliferação de Fungos</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    A umidade presa nas aletas cria colônias de bactérias e mofo negro expelidos diretamente no ambiente.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-amber-400 font-bold mt-4 block">
                  ⚠ CAUSA RINITES, TOSSES E ODOR
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/25 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-white text-sm mb-1">Desperdício de Energia</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    O motor precisa operar em regime forçado contínuo para tentar gelar, dobrando o desgaste das peças.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-amber-400 font-bold mt-4 block">
                  ⚠ CONTA DE LUZ DISPARADA
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/25 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                    <Wind className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-white text-sm mb-1">Drenos Entupidos & Pingueira</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Lodo acumulado na bandeja transborda água pela parede e queima o sensor térmico da placa.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-amber-400 font-bold mt-4 block">
                  ⚠ RISCO DE QUEIMA E VAZAMENTO
                </span>
              </div>
            </motion.div>
          )}

          {/* Direct CTA */}
          <div className="mt-8 pt-6 border-t border-sky-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-300">
              Agende uma higienização química no local sem sujar sua parede ou piso.
            </span>

            <a
              href="https://wa.me/5511947321510?text=Ol%C3%A1%20Romero!%20Gostaria%20de%20agendar%20uma%20higieniza%C3%A7%C3%A3o%20qu%C3%ADmica%20para%20meu%20ar-condicionado."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-md transition-all hover:scale-105"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Agendar Higienização no WhatsApp</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
