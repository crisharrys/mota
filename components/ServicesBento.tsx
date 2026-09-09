'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Wrench, 
  Settings2, 
  Sparkles, 
  Building2, 
  Layers, 
  ArrowUpRight,
  ShieldCheck,
  Zap,
  CheckCircle2
} from 'lucide-react';

export default function ServicesBento() {
  return (
    <section id="servicos" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Wrench className="w-3.5 h-3.5" />
            Ecossistema de Soluções Térmicas
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight font-display">
            Serviços com Padrão de <span className="text-gradient-cyan">Concessionária</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            Do projeto e venda de equipamentos de ponta até a instalação cirúrgica e contratos PMOC. 
            Sem gambiarras, com garantia por escrito e ferramentas calibradas.
          </p>
        </div>

        {/* Bento Grid Layout (Asymmetric, Creative & Luxury) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Venda de Novos (Big Bento Box - 7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-7 p-8 rounded-3xl bg-gradient-to-br from-[#061e3d] to-[#04142b] border border-sky-400/30 backdrop-blur-xl shadow-2xl flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-60 h-60 bg-sky-500/10 rounded-full blur-3xl -z-10 group-hover:bg-sky-500/20 transition-all" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] font-mono text-sky-400 font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-sky-950/60 border border-sky-500/25">
                  Venda de Equipamentos Novos
                </span>
                <div className="w-11 h-11 rounded-xl bg-sky-500/20 border border-sky-400/30 text-sky-300 flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
                As Melhores Marcas Globais com Preço Direto
              </h3>
              
              <p className="text-sm text-slate-300 leading-relaxed mb-6 font-light">
                Compre seu Split Hi-Wall, Multi-Split, Cassete ou Piso Teto com orientação técnica precisa de quem realmente entende de instalação. Modelos Inverter com nota fiscal e garantia total.
              </p>

              {/* Brand Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {['Daikin', 'Fujitsu', 'LG Dual Inverter', 'Samsung WindFree', 'Gree', 'Midea', 'Carrier', 'Elgin'].map((b) => (
                  <span key={b} className="text-xs font-semibold px-3 py-1 rounded-lg bg-[#020b18]/80 text-sky-300 border border-sky-500/20">
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-sky-500/20 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">
                Economia de até 70% na conta de luz
              </span>
              <a
                href="https://wa.me/5511947321510?text=Ol%C3%A1%20Romero!%20Gostaria%20de%20comprar%20um%20ar-condicionado%20novo."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-white group-hover:translate-x-1 transition-all"
              >
                <span>Consultar Modelos</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Card 2: Instalação de Precisão (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-5 p-8 rounded-3xl bg-[#04142b]/80 border border-sky-500/25 backdrop-blur-xl shadow-2xl flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/25">
                  Instalação Especializada
                </span>
                <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                  <Wrench className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-2xl font-black text-white mb-3">
                Vácuo Digital & Cobre Puro
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed mb-6 font-light">
                Procedimento cirúrgico seguindo estritamente o manual da montadora. Vacuômetro digital testo (&lt;500 microns), isolamento blindado e sem sujeira na sua parede.
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sem perda de garantia da montadora</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Tubulação 100% cobre eletrolítico</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-sky-500/20 flex items-center justify-between">
              <span className="text-xs text-slate-400">Garantia Técnica</span>
              <a
                href="https://wa.me/5511947321510?text=Ol%C3%A1%20Romero!%20Preciso%20de%20uma%20instala%C3%A7%C3%A3o%20de%20ar-condicionado."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-white group-hover:translate-x-1 transition-all"
              >
                <span>Agendar Instalação</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Card 3: Manutenção Corretiva & Gás (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-4 p-7 rounded-3xl bg-[#04142b]/80 border border-sky-500/25 backdrop-blur-xl shadow-xl flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-300 flex items-center justify-center mb-5">
                <Settings2 className="w-5 h-5" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Manutenção & Recarga de Gás</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-light mb-4">
                Identificação precisa de vazamentos com nitrogênio, conserto de placas eletrônicas e recarga com balança (R-410A e R-32).
              </p>
            </div>
            <a
              href="https://wa.me/5511947321510?text=Ol%C3%A1%20Romero!%20Meu%20ar-condicionado%20parou%20de%20gelar%20e%20preciso%20de%20manuten%C3%A7%C3%A3o."
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-sky-400 flex items-center justify-between pt-3 border-t border-sky-500/15"
            >
              <span>Reparo Imediato</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Card 4: Higienização Química Antibactericida (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-4 p-7 rounded-3xl bg-[#04142b]/80 border border-sky-500/25 backdrop-blur-xl shadow-xl flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-500/15 text-teal-300 flex items-center justify-center mb-5">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Higienização Química Anvisa</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-light mb-4">
                Sanitização hospitalar da serpentina, turbina e bandeja de dreno. Elimina 99,9% de fungos, ácaros e mau cheiro.
              </p>
            </div>
            <a
              href="https://wa.me/5511947321510?text=Ol%C3%A1%20Romero!%20Gostaria%20de%20uma%20higieniza%C3%A7%C3%A3o%20completa%20no%20meu%20ar."
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-teal-400 flex items-center justify-between pt-3 border-t border-sky-500/15"
            >
              <span>Ar Puro & Limpo</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Card 5: Contratos PMOC & Empresas (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-4 p-7 rounded-3xl bg-[#04142b]/80 border border-sky-500/25 backdrop-blur-xl shadow-xl flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-300 flex items-center justify-center mb-5">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Contratos PMOC Corporativos</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-light mb-4">
                Plano de Manutenção, Operação e Controle conforme a Lei Federal 13.589/2018 para clínicas, escritórios e condomínios.
              </p>
            </div>
            <a
              href="https://wa.me/5511947321510?text=Ol%C3%A1%20Romero!%20Preciso%20de%20um%20contrato%20PMOC%20para%20minha%20empresa."
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-cyan-400 flex items-center justify-between pt-3 border-t border-sky-500/15"
            >
              <span>Adequação Legal</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
