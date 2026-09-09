'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Wrench, Settings2, ArrowUpRight } from 'lucide-react';

const coreServices = [
  {
    num: '01',
    title: 'Venda de Equipamentos',
    desc: 'Aparelhos novos Split Inverter das melhores marcas do mercado (Daikin, Fujitsu, LG, Gree e Midea) com máxima economia e nota fiscal.',
    icon: ShoppingCart,
    tag: 'Novos & Inverter',
  },
  {
    num: '02',
    title: 'Instalação Especializada',
    desc: 'Procedimento padronizado com vacuômetro digital (< 500 microns) e tubulação 100% cobre. Sem perda de garantia do fabricante.',
    icon: Wrench,
    tag: 'Padrão Técnico',
  },
  {
    num: '03',
    title: 'Manutenção & Higienização',
    desc: 'Conserto ágil, recarga precisa de gás (R-410A / R-32), reparo de placas e sanitização química contra ácaros, bactérias e odores.',
    icon: Settings2,
    tag: 'Preventiva & Corretiva',
  },
];

export default function ServicesGrid() {
  return (
    <section id="servicos" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        
        {/* Section Header - Clean & Direct */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-2">
            Nossos Serviços
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight font-display">
            Simples, Direto e <span className="text-gradient-cyan">Sem Enrolação</span>
          </h2>
        </div>

        {/* 3 Core Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreServices.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <motion.div
                key={srv.num}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-7 rounded-3xl bg-[#04142b]/75 border border-sky-500/20 hover:border-sky-400/50 hover:bg-[#061c3b]/85 transition-all duration-300 backdrop-blur-md shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl font-black text-sky-400/40 group-hover:text-sky-400 transition-colors">
                      {srv.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold text-sky-400 uppercase tracking-wider block mb-1">
                    {srv.tag}
                  </span>

                  <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-white">
                    {srv.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {srv.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-sky-500/15">
                  <a
                    href={`https://wa.me/5511947321510?text=${encodeURIComponent(`Olá Romero! Gostaria de um orçamento para o serviço de ${srv.title}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full text-xs font-bold text-sky-300 hover:text-white group-hover:translate-x-0.5 transition-all"
                  >
                    <span>Solicitar Orçamento</span>
                    <ArrowUpRight className="w-4 h-4 text-sky-400" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
