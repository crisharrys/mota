'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Cpu, 
  CheckCircle, 
  ThumbsUp, 
  FileCheck2, 
  Truck 
} from 'lucide-react';

const differentials = [
  {
    icon: Cpu,
    title: 'Ferramental Digital de Ponta',
    description: 'Utilizamos vacuômetro digital de alta precisão (atingindo vácuo inferior a 500 microns), manifolds digitais e balança de precisão para carga de gás.',
  },
  {
    icon: ShieldCheck,
    title: 'Tubulação 100% Cobre Eletrolítico',
    description: 'Não economizamos em segurança. Jamais utilizamos tubos de alumínio. Aplicamos apenas tubos de cobre puro com isolamento térmico blindado.',
  },
  {
    icon: Sparkles,
    title: 'Obra Limpa & Proteção Total',
    description: 'Furadeira com coletor de pó e proteção de pisos e móveis. Seu ambiente fica exatamente como estava, apenas muito mais fresco e agradável.',
  },
  {
    icon: FileCheck2,
    title: 'Garantia por Escrito & PMOC',
    description: 'Você recebe ordem de serviço técnica detalhada e termo de garantia formal, além de laudos PMOC assinados para empresas.',
  },
  {
    icon: Clock,
    title: 'Pontualidade e Agilidade',
    description: 'Cumprimos rigorosamente o horário agendado. Sem atrasos intermináveis nem falta de comunicação.',
  },
  {
    icon: Truck,
    title: 'Cobertura em Toda a Grande SP',
    description: 'Atendimento na Capital (Zona Sul, Oeste, Leste, Norte, Centro), Região do ABC, Alphaville, Tamboré, Osasco e Guarulhos.',
  },
];

export default function DifferentialSection() {
  return (
    <section id="diferenciais" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <ThumbsUp className="w-3.5 h-3.5" />
            Por que Escolher Romero Mota?
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Padrão de Excelência em <span className="text-gradient-cyan">Cada Detalhe</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Muito mais que um serviço comum: oferecemos segurança, transparência e engenharia térmica de alto nível para o seu patrimônio.
          </p>
        </div>

        {/* Differentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentials.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="p-7 rounded-2xl bg-[#04142b]/70 border border-sky-500/20 hover:border-sky-400/50 hover:bg-[#071f3f]/80 transition-all duration-300 group shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-500/15 border border-sky-400/30 text-sky-300 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-sky-500/25 transition-all">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-sky-200 transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
