'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Wind, Box, Flame, ArrowRight, MessageSquare, Zap, ShieldCheck } from 'lucide-react';

const products = [
  {
    id: 'split-inverter',
    name: 'Split Hi-Wall Inverter',
    category: 'Residencial & Escritórios',
    capacities: '9.000 a 24.000 BTUs',
    efficiency: 'Selo Procel A • Até 70% de economia',
    description: 'O modelo mais silencioso e versátil do mercado. Tecnologia de ponta que ajusta a velocidade do compressor e mantém a temperatura estável sem picos de luz.',
    features: [
      'Gás Ecológico R-32 / R-410A',
      'Filtro antibactericida e ionizador',
      'Controle por Wi-Fi e comando de voz',
      'Garantia estendida do compressor',
    ],
    idealFor: 'Quartos, salas de estar, home offices e consultórios.',
    tag: 'Campeão de Vendas',
  },
  {
    id: 'multi-split',
    name: 'Multi-Split Inverter',
    category: 'Apartamentos & Casas',
    capacities: 'Bi-Split, Tri-Split, Quadri e Penta',
    efficiency: 'Apenas 1 condensadora externa',
    description: 'Solução perfeita para condomínios com espaço técnico limitado na fachada. Climatiza de 2 a 5 ambientes de forma totalmente independente.',
    features: [
      'Economia de espaço na sacada técnica',
      'Controle de temperatura individual por cômodo',
      'Design compacto e sofisticado',
      'Alta eficiência energética Inverter',
    ],
    idealFor: 'Apartamentos com vários quartos e restrição de fachada.',
    tag: 'Economia de Espaço',
  },
  {
    id: 'cassete',
    name: 'Cassete 4 Vias',
    category: 'Alto Padrão & Corporativo',
    capacities: '18.000 a 60.000 BTUs',
    efficiency: 'Distribuição 360° embutida no gesso',
    description: 'Embutido no teto ou forro de gesso, deixando apenas o painel elegante visível. Distribui o ar gelado em todas as direções de maneira harmoniosa.',
    features: [
      'Bomba de dreno de fábrica embutida',
      'Aletas individuais com controle de fluxo',
      'Estética limpa sem poluição visual',
      'Baixíssimo nível de ruído',
    ],
    idealFor: 'Salas integradas, clínicas, lojas e restaurantes.',
    tag: 'Design Sofisticado',
  },
  {
    id: 'piso-teto',
    name: 'Piso Teto Alta Potência',
    category: 'Comercial & Grande Porte',
    capacities: '36.000 a 60.000 BTUs',
    efficiency: 'Vazão de ar de longo alcance',
    description: 'Equipamento robusto projetado para espaços amplos com pé-direito alto e grande fluxo de pessoas. Pode ser fixado no teto ou no piso.',
    features: [
      'Flecha de ar potente de até 15 metros',
      'Serpentina de cobre de alta durabilidade',
      'Fácil acesso para manutenção e limpeza',
      'Excelente resistência para operação contínua',
    ],
    idealFor: 'Academias, galpões, igrejas, auditórios e salões.',
    tag: 'Alta Potência',
  },
];

export default function ProductsCatalog() {
  const [activeProduct, setActiveProduct] = useState(products[0].id);

  return (
    <section id="equipamentos" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Box className="w-3.5 h-3.5" />
            Venda & Fornecimento
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Equipamentos de Climatização de <span className="text-gradient-cyan">Primeira Linha</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Trabalhamos com os modelos mais modernos e econômicos do mercado, com instalação garantida e assistência técnica de confiança.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((prod, idx) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-[#04142b]/75 border border-sky-500/25 backdrop-blur-md shadow-xl hover:border-sky-400/50 hover:shadow-[0_10px_30px_rgba(56,189,248,0.15)] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Tag and Capacity */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-bold">
                    {prod.tag}
                  </span>
                  <span className="text-xs font-mono font-semibold text-slate-300">
                    {prod.capacities}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-100 mb-2">
                  {prod.name}
                </h3>

                <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-4">
                  <Zap className="w-4 h-4" />
                  <span>{prod.efficiency}</span>
                </div>

                <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                  {prod.description}
                </p>

                {/* Features */}
                <div className="space-y-2.5 mb-6">
                  {prod.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Ideal for badge */}
                <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-500/15 text-xs text-slate-300 mb-6">
                  <strong className="text-sky-300">Ambientes Indicados:</strong> {prod.idealFor}
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="pt-5 border-t border-sky-500/15 flex items-center justify-between gap-4">
                <span className="text-xs text-slate-400">
                  Comprar ou Instalar
                </span>
                <a
                  href={`https://wa.me/5511947321510?text=${encodeURIComponent(`Olá Romero! Tenho interesse no ${prod.name} (${prod.capacities}). Gostaria de saber os preços e condições!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-md transition-all hover:scale-105"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Consultar Valores</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
