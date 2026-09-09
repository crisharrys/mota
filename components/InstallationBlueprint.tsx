'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  ShieldCheck, 
  Layers, 
  Gauge, 
  Zap, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface Hotspot {
  id: string;
  number: string;
  title: string;
  short: string;
  icon: any;
  motaStandard: string;
  amateurRisk: string;
  benefit: string;
}

const hotspots: Hotspot[] = [
  {
    id: 'vacuum',
    number: '01',
    title: 'Vácuo Profundo Digital',
    short: 'Vacuômetro < 500 microns',
    icon: Gauge,
    motaStandard: 'Bomba de duplo estágio + vacuômetro digital aferindo vácuo real abaixo de 500 microns para purgar toda umidade.',
    amateurRisk: 'Instaladores comuns apenas "abrem o gás" para purgar (crime ambiental e arruína a vida do compressor em poucos meses).',
    benefit: 'Garante 10 a 15 anos de vida útil do compressor e mantém a garantia da fabricante intacta.',
  },
  {
    id: 'copper',
    number: '02',
    title: 'Tubulação 100% Cobre Maciço',
    short: 'Zero tubos de alumínio',
    icon: Layers,
    motaStandard: 'Tubos de cobre eletrolítico com espessura de parede normatizada (0.79mm) e flangeamento perfeito com mesa excêntrica.',
    amateurRisk: 'Uso de tubos de alumínio frágeis que oxidam, ressecam e causam vazamento de gás tóxico em menos de 1 ano.',
    benefit: 'Máxima condutividade térmica, resistência à alta pressão e zero dor de cabeça com quebra de paredes.',
  },
  {
    id: 'insulation',
    number: '03',
    title: 'Isolamento Blindado Armaflex',
    short: 'Proteção individual anti-gotas',
    icon: ShieldCheck,
    motaStandard: 'Isolamento térmico elastomérico tubular separado para cada linha frigorígena, com fita vinílica UV de acabamento.',
    amateurRisk: 'Tubos colados juntos no mesmo isolador fino, gerando condensação intensa que goteja e mancha forros de gesso.',
    benefit: 'Seu forro de gesso e sua pintura permanecem 100% secos e impecáveis, sem bolhas nem mofo.',
  },
  {
    id: 'gas',
    number: '04',
    title: 'Pesagem de Gás em Balança',
    short: 'Carga por gramas exatas',
    icon: Cpu,
    motaStandard: 'Recarga e complemento de fluido refrigerante (R-410A / R-32) com balança de precisão digital seguindo a tabela da montadora.',
    amateurRisk: 'Colocar gás "no olhômetro" ou pela pressão do manômetro comum, sobrecarregando as válvulas e queimando a placa Inverter.',
    benefit: 'Rendimento térmico máximo com consumo elétrico mínimo em conformidade com o manual.',
  },
  {
    id: 'electric',
    number: '05',
    title: 'Elétrica & Proteção Térmica',
    short: 'Fiação e disjuntor dedicado',
    icon: Zap,
    motaStandard: 'Cabo flexível antichama com terminais ilhós prensados, disjuntor curva C dedicado e aterramento testado.',
    amateurRisk: 'Emendas mal feitas com fita isolante simples ligadas direto na tomada comum com risco iminente de curto-circuito.',
    benefit: 'Segurança absoluta para a sua família, patrimônio e eletrônicos residenciais.',
  },
];

export default function InstallationBlueprint() {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot>(hotspots[0]);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5" />
            Engenharia de Precisão
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight font-display">
            O Raio-X da <span className="text-gradient-cyan">Instalação Perfeita</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            Descubra porque mais de 90% dos problemas em ar-condicionado são causados por instalações amadoras — e como o padrão técnico de Romero Mota blinda o seu investimento.
          </p>
        </div>

        {/* Blueprint Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Hotspot Selector Tabs */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 px-1">
              PONTOS CRÍTICOS DE INSPEÇÃO TÉCNICA:
            </span>

            {hotspots.map((h) => {
              const Icon = h.icon;
              const isSelected = activeHotspot.id === h.id;
              return (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => setActiveHotspot(h)}
                  className={`w-full p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between gap-4 group ${
                    isSelected
                      ? 'bg-[#061e3d] border-sky-400 text-white shadow-[0_0_25px_rgba(56,189,248,0.25)] scale-[1.01]'
                      : 'bg-[#04142b]/60 border-sky-500/15 text-slate-300 hover:bg-[#061833]/80 hover:border-sky-500/30'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={`font-mono text-sm font-black ${isSelected ? 'text-sky-400' : 'text-slate-500'}`}>
                      {h.number}
                    </span>
                    <div>
                      <div className="text-sm font-bold group-hover:text-white transition-colors">
                        {h.title}
                      </div>
                      <div className="text-xs text-sky-400/80 font-mono">
                        {h.short}
                      </div>
                    </div>
                  </div>

                  <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-sky-400 translate-x-1' : 'text-slate-600'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Hotspot Blueprint Card & Comparison */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHotspot.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="p-7 sm:p-9 rounded-3xl bg-gradient-to-b from-[#061e3d] via-[#04152b] to-[#020b18] border border-sky-400/35 backdrop-blur-xl shadow-2xl relative overflow-hidden"
              >
                {/* Hotspot Header */}
                <div className="flex items-center justify-between pb-6 border-b border-sky-500/20">
                  <div>
                    <span className="text-[11px] font-mono text-sky-400 font-bold uppercase tracking-wider block">
                      DIAGNÓSTICO TÉCNICO #{activeHotspot.number}
                    </span>
                    <h3 className="text-2xl font-black text-white mt-1">
                      {activeHotspot.title}
                    </h3>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/40 text-sky-300 flex items-center justify-center">
                    <activeHotspot.icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Comparison Blocks: Romero Mota vs Amador */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-6">
                  
                  {/* Padrão Romero Mota (Approved) */}
                  <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 relative">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Padrão Romero Mota</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {activeHotspot.motaStandard}
                    </p>
                  </div>

                  {/* Instalação Amadora (Warning) */}
                  <div className="p-5 rounded-2xl bg-red-950/30 border border-red-500/30 relative">
                    <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider mb-2">
                      <XCircle className="w-4 h-4 text-red-400" />
                      <span>Instalação Amadora Comum</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {activeHotspot.amateurRisk}
                    </p>
                  </div>

                </div>

                {/* Real Benefit Callout */}
                <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-500/20 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-200">
                    <strong className="text-sky-300 block mb-0.5">Resultado Garantido:</strong>
                    {activeHotspot.benefit}
                  </div>
                </div>

                {/* Direct Action */}
                <div className="mt-8 pt-5 border-t border-sky-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-400">
                    Exija laudo e comprovação técnica no seu serviço.
                  </div>

                  <a
                    href={`https://wa.me/5511947321510?text=${encodeURIComponent(
                      `Olá Romero! Vi o Raio-X Técnico no site sobre ${activeHotspot.title}. Gostaria de agendar uma instalação nesse padrão!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-md transition-all hover:scale-105"
                  >
                    <span>Instalar com Esse Padrão</span>
                  </a>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
