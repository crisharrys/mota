'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Wrench, 
  ShieldAlert, 
  Sparkles, 
  Building2, 
  Layers, 
  CheckCircle, 
  ArrowUpRight,
  Gauge,
  ThermometerSnowflake
} from 'lucide-react';

const services = [
  {
    id: 'venda',
    title: 'Venda de Equipamentos Novos',
    badge: 'Melhor Custo-Benefício',
    description: 'Aparelhos Split Hi-Wall, Inverter, Multi-Split, Cassete e Piso Teto direto dos melhores distribuidores com nota fiscal e garantia total.',
    icon: ShoppingCart,
    accent: 'from-blue-500/20 to-sky-500/10',
    borderColor: 'border-sky-500/30',
    highlights: ['Modelos Inverter econômicos', 'Consultoria de dimensionamento', 'Principais marcas do mercado'],
    featured: true,
  },
  {
    id: 'instalacao',
    title: 'Instalação Técnica Especializada',
    badge: 'Procedimento Padrão Fábrica',
    description: 'Execução rigorosa com vacuômetro digital, tubulação 100% cobre com espessura correta e isolamento térmico blindado. Sem perder a garantia do fabricante.',
    icon: Wrench,
    accent: 'from-sky-500/20 to-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    highlights: ['Processo de vácuo profundo (<500 microns)', 'Tubulação em cobre eletrolítico', 'Suportes reforçados e antivibração'],
    featured: true,
  },
  {
    id: 'manutencao',
    title: 'Manutenção Preventiva e Corretiva',
    badge: 'Diagnóstico Ágil',
    description: 'Identificação rápida de ruídos, vazamento de gás refrigerante, falhas elétricas, troca de capacitores, reparo em placas eletrônicas e compressores.',
    icon: Gauge,
    accent: 'from-indigo-500/20 to-blue-500/10',
    borderColor: 'border-indigo-500/30',
    highlights: ['Recarga precisa de gás R-410A e R-32', 'Troca de peças originais', 'Testes de pressão e vedação'],
  },
  {
    id: 'higienizacao',
    title: 'Higienização Profunda Antibactericida',
    badge: 'Saúde Respiratória',
    description: 'Sanitização química da serpentina, turbina e bandeja de condensado. Elimina 99,9% de fungos, ácaros, poeira e odores desagradáveis.',
    icon: Sparkles,
    accent: 'from-emerald-500/20 to-teal-500/10',
    borderColor: 'border-teal-500/30',
    highlights: ['Produtos biodegradáveis aprovados Anvisa', 'Aumento da vazão de ar gelado', 'Redução do consumo de energia'],
  },
  {
    id: 'pmoc',
    title: 'Contratos PMOC Corporativos',
    badge: 'Conformidade Legal',
    description: 'Plano de Manutenção, Operação e Controle conforme a Lei Federal 13.589/2018 para comércios, clínicas, escritórios e condomínios.',
    icon: Building2,
    accent: 'from-cyan-500/20 to-blue-500/10',
    borderColor: 'border-cyan-500/30',
    highlights: ['Emissão de laudo técnico periódico', 'Evite multas pesadas de fiscalização', 'Vida útil estendida dos aparelhos'],
  },
  {
    id: 'infraestrutura',
    title: 'Infraestrutura em Obras e Reformas',
    badge: 'Linha Frigorígena Embutida',
    description: 'Passagem antecipada de tubulações, pontos elétricos e drenos embutidos em paredes e forros de gesso antes da pintura e acabamento.',
    icon: Layers,
    accent: 'from-sky-500/20 to-blue-500/10',
    borderColor: 'border-sky-500/30',
    highlights: ['Sem canos aparentes no ambiente', 'Planejamento junto a arquitetos e engenheiros', 'Testes de estanqueidade com nitrogênio'],
  },
];

export default function ServicesGrid() {
  return (
    <section id="servicos" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <ThermometerSnowflake className="w-3.5 h-3.5" />
            Nossas Soluções Térmicas
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Serviços Especializados em <span className="text-gradient-cyan">Ar-Condicionado</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            Do projeto e venda de aparelhos até a instalação e manutenção contínua. 
            Tudo com transparência, pontualidade e o mais alto rigor técnico.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv, index) => {
            const Icon = srv.icon;
            return (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative rounded-2xl p-7 bg-[#04142b]/70 border ${srv.borderColor} backdrop-blur-md shadow-xl hover:shadow-[0_15px_35px_-10px_rgba(56,189,248,0.25)] hover:border-sky-400/60 transition-all duration-300 flex flex-col justify-between overflow-hidden`}
              >
                {/* Background ambient gradient flare */}
                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${srv.accent} rounded-full blur-3xl -z-10 opacity-60 group-hover:opacity-100 transition-opacity`} />

                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="w-13 h-13 p-3.5 rounded-xl bg-sky-500/15 border border-sky-400/30 text-sky-300 group-hover:scale-110 group-hover:bg-sky-500/25 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-sky-950/60 text-sky-300 border border-sky-500/25">
                      {srv.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-slate-100 group-hover:text-sky-200 transition-colors mb-3">
                    {srv.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {srv.description}
                  </p>

                  {/* Highlights checklist */}
                  <ul className="space-y-2 mb-6">
                    {srv.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA to WhatsApp with specific service context */}
                <div className="pt-4 border-t border-sky-500/15 flex items-center justify-between">
                  <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors">
                    Orçamento sob medida
                  </span>
                  <a
                    href={`https://wa.me/5511947321510?text=${encodeURIComponent(`Olá Romero! Gostaria de um orçamento para o serviço de ${srv.title}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-sky-400 hover:text-sky-300 group-hover:translate-x-1 transition-all"
                  >
                    <span>Solicitar</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Banner with original visual card reference */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#061e3d] via-[#082a54] to-[#04142b] border border-sky-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-100">Não sabe qual capacidade ou modelo escolher?</h4>
              <p className="text-sm text-slate-300">Fale direto com o Romero Mota pelo WhatsApp para uma consultoria técnica sem compromisso.</p>
            </div>
          </div>

          <a
            href="https://wa.me/5511947321510?text=Ol%C3%A1%20Romero!%20Preciso%20de%20ajuda%20para%20escolher%20o%20ar-condicionado%20ideal."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all shrink-0 hover:scale-105"
          >
            Falar com Romero no WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
