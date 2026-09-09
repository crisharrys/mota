'use client';

import React from 'react';
import { Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

const brands = [
  { name: 'Daikin', tier: 'Japonesa Premium', desc: 'Líder mundial em tecnologia e durabilidade' },
  { name: 'Fujitsu General', tier: 'Alta Eficiência', desc: 'Referência absoluta em silêncio e economia' },
  { name: 'LG Dual Inverter', tier: 'Smart & Voice', desc: 'Até 70% de economia e conectividade Wi-Fi' },
  { name: 'Samsung WindFree', tier: 'Sem Vento Direto', desc: 'Refrigeração suave através de microfuros' },
  { name: 'Gree Electric', tier: 'Maior do Mundo', desc: 'Robustez e serpentinas em cobre maciço' },
  { name: 'Midea / Carrier', tier: 'Líder de Mercado', desc: 'Ótima relação custo-benefício e assistência' },
  { name: 'Elgin', tier: 'Tradição Nacional', desc: 'Garantia comprovada e peças fáceis' },
  { name: 'Springer', tier: 'Pioneirismo', desc: 'Confiabilidade para residências e empresas' },
];

export default function BrandsSection() {
  return (
    <section id="marcas" className="py-20 border-y border-sky-500/15 bg-[#020b18]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            Parceiros de Confiança
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            Trabalhamos com as <span className="text-gradient-cyan">Melhores Marcas</span> Globais
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Instalação e assistência autorizada mantendo os critérios rigorosos de cada montadora.
          </p>
        </div>

        {/* Brand Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {brands.map((b) => (
            <div
              key={b.name}
              className="p-5 rounded-2xl bg-[#04142b]/60 border border-sky-500/15 hover:border-sky-400/40 hover:bg-[#071f3f]/80 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-mono text-sky-400 font-semibold mb-1">
                  {b.tier}
                </div>
                <h3 className="text-lg font-bold text-slate-100 group-hover:text-white transition-colors">
                  {b.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-normal">
                  {b.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-sky-500/10 flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                <CheckCircle2 className="w-3 h-3 shrink-0" />
                <span>Instalação Padrão de Fábrica</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
