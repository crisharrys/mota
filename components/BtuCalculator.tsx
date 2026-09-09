'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Sun, Moon, Users, Monitor, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';

export default function BtuCalculator() {
  const [area, setArea] = useState<number>(18);
  const [sunlight, setSunlight] = useState<'morning' | 'afternoon'>('afternoon');
  const [people, setPeople] = useState<number>(2);
  const [electronics, setElectronics] = useState<number>(2);

  // Calculation formula
  const calculatedBtu = useMemo(() => {
    // 600 BTU/m² for morning sun, 800 BTU/m² for strong afternoon sun
    const basePerMeter = sunlight === 'afternoon' ? 800 : 600;
    const areaBtu = area * basePerMeter;
    const peopleBtu = Math.max(0, people - 1) * 600;
    const elecBtu = electronics * 600;
    return areaBtu + peopleBtu + elecBtu;
  }, [area, sunlight, people, electronics]);

  // Closest standard market capacity
  const recommendedTier = useMemo(() => {
    if (calculatedBtu <= 9500) {
      return {
        btu: '9.000 BTUs',
        title: '9.000 BTUs / Inverter',
        desc: 'Ideal para dormitórios, home office e ambientes compactos de até 15m².',
        tag: 'Mais Econômico'
      };
    } else if (calculatedBtu <= 13000) {
      return {
        btu: '12.000 BTUs',
        title: '12.000 BTUs / Inverter',
        desc: 'Excelente para suítes, quartos médios e salas de estar de até 20m².',
        tag: 'Mais Vendido'
      };
    } else if (calculatedBtu <= 19500) {
      return {
        btu: '18.000 BTUs',
        title: '18.000 BTUs / Inverter',
        desc: 'Perfeito para salas de estar com jantar integradas e consultórios de até 30m².',
        tag: 'Alta Performance'
      };
    } else if (calculatedBtu <= 26000) {
      return {
        btu: '24.000 BTUs',
        title: '24.000 BTUs / Inverter',
        desc: 'Projetado para salas amplas, academias e espaços comerciais de até 40m².',
        tag: 'Super Conforto'
      };
    } else if (calculatedBtu <= 33000) {
      return {
        btu: '30.000 BTUs',
        title: '30.000 BTUs / Split ou Cassete',
        desc: 'Para grandes ambientes residenciais ou salas comerciais abertas até 50m².',
        tag: 'Potência Máxima'
      };
    } else {
      return {
        btu: '36.000 a 60.000 BTUs',
        title: 'Multi-Split ou Piso-Teto / Cassete',
        desc: 'Ambientes corporativos amplos ou sistemas multi-ambientes personalizados.',
        tag: 'Projeto Especial'
      };
    }
  }, [calculatedBtu]);

  const whatsappMessage = encodeURIComponent(
    `Olá Romero! Fiz a simulação na Calculadora de BTUs do site da Mota Ar-Condicionado: Ambiente de ${area}m², sol da ${sunlight === 'afternoon' ? 'tarde' : 'manhã'}, ${people} pessoas e ${electronics} aparelhos eletrônicos. O sistema recomendou um modelo de ${recommendedTier.btu}. Gostaria de um orçamento para esse equipamento e instalação!`
  );

  return (
    <section id="calculadora" className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Calculator className="w-4 h-4" />
            Ferramenta Interativa
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Calculadora Inteligente de <span className="text-gradient-cyan">BTUs</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Descubra a capacidade exata necessária para climatizar o seu cômodo ou empresa com economia de energia e máximo conforto térmico.
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 p-7 sm:p-9 rounded-3xl bg-[#04142b]/80 border border-sky-500/25 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                <span>Características do seu ambiente</span>
              </h3>

              <div className="space-y-6">
                
                {/* Metragem Quadrada Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-slate-200">
                      Área do Ambiente (m²)
                    </label>
                    <span className="text-lg font-bold text-sky-400 font-mono">
                      {area} m²
                    </span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="80"
                    step="1"
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full h-2 bg-sky-950 rounded-lg appearance-none cursor-pointer accent-sky-400"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>6 m² (Quarto pequeno)</span>
                    <span>40 m² (Sala ampla)</span>
                    <span>80 m² (Espaço comercial)</span>
                  </div>
                </div>

                {/* Incidência Solar Toggle */}
                <div>
                  <label className="text-sm font-semibold text-slate-200 block mb-2">
                    Incidência Solar no Ambiente
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSunlight('morning')}
                      className={`p-3.5 rounded-xl border text-sm font-medium flex items-center justify-center gap-2.5 transition-all ${
                        sunlight === 'morning'
                          ? 'bg-sky-500/20 border-sky-400 text-sky-200 shadow-sm shadow-sky-500/30'
                          : 'bg-sky-950/30 border-sky-500/15 text-slate-400 hover:border-sky-500/30'
                      }`}
                    >
                      <Moon className="w-4 h-4 text-sky-300" />
                      <span>Sol da Manhã / Suave</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSunlight('afternoon')}
                      className={`p-3.5 rounded-xl border text-sm font-medium flex items-center justify-center gap-2.5 transition-all ${
                        sunlight === 'afternoon'
                          ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-sm shadow-amber-500/30'
                          : 'bg-sky-950/30 border-sky-500/15 text-slate-400 hover:border-amber-500/30'
                      }`}
                    >
                      <Sun className="w-4 h-4 text-amber-400" />
                      <span>Sol da Tarde / Intenso</span>
                    </button>
                  </div>
                </div>

                {/* Número de Pessoas & Eletrônicos Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Pessoas */}
                  <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-500/15">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                        <Users className="w-4 h-4 text-sky-400" />
                        <span>Pessoas no local</span>
                      </div>
                      <span className="text-base font-bold text-sky-400 font-mono">{people}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => setPeople(Math.max(1, people - 1))}
                        className="w-8 h-8 rounded-lg bg-sky-900/50 hover:bg-sky-800 text-sky-200 flex items-center justify-center font-bold"
                      >
                        -
                      </button>
                      <input
                        type="range"
                        min="1"
                        max="15"
                        value={people}
                        onChange={(e) => setPeople(Number(e.target.value))}
                        className="w-full h-1.5 bg-sky-950 rounded-lg accent-sky-400 cursor-pointer"
                      />
                      <button
                        type="button"
                        onClick={() => setPeople(Math.min(15, people + 1))}
                        className="w-8 h-8 rounded-lg bg-sky-900/50 hover:bg-sky-800 text-sky-200 flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Eletrônicos */}
                  <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-500/15">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                        <Monitor className="w-4 h-4 text-sky-400" />
                        <span>Eletrônicos (TV, PC)</span>
                      </div>
                      <span className="text-base font-bold text-sky-400 font-mono">{electronics}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => setElectronics(Math.max(0, electronics - 1))}
                        className="w-8 h-8 rounded-lg bg-sky-900/50 hover:bg-sky-800 text-sky-200 flex items-center justify-center font-bold"
                      >
                        -
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={electronics}
                        onChange={(e) => setElectronics(Number(e.target.value))}
                        className="w-full h-1.5 bg-sky-950 rounded-lg accent-sky-400 cursor-pointer"
                      />
                      <button
                        type="button"
                        onClick={() => setElectronics(Math.min(10, electronics + 1))}
                        className="w-8 h-8 rounded-lg bg-sky-900/50 hover:bg-sky-800 text-sky-200 flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-sky-500/15 text-xs text-slate-400">
              * Cálculo baseado nas normas técnicas da ABNT para climatização residencial e comercial.
            </div>
          </div>

          {/* Result & Recommendation Column */}
          <div className="lg:col-span-5 p-7 sm:p-9 rounded-3xl bg-gradient-to-b from-[#061e3d] via-[#082a54] to-[#04142b] border border-sky-400/30 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            
            {/* Top Tag */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Resultado da Simulação
                </span>
                <span className="px-3 py-1 rounded-full bg-sky-400/20 text-sky-300 text-xs font-semibold border border-sky-400/30">
                  {recommendedTier.tag}
                </span>
              </div>

              {/* Calculated exact value */}
              <div className="mb-2">
                <span className="text-xs text-slate-300 uppercase tracking-wider font-semibold">
                  Cálculo Térmico Estimado:
                </span>
                <div className="text-2xl font-bold text-slate-200 font-mono">
                  {calculatedBtu.toLocaleString('pt-BR')} BTUs/h
                </div>
              </div>

              {/* Recommended Equipment Big Callout */}
              <div className="my-6 p-6 rounded-2xl bg-[#020b18]/80 border border-sky-400/40 text-center relative overflow-hidden shadow-inner">
                <div className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-1">
                  Capacidade Recomendada
                </div>
                <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-sky-400 font-display">
                  {recommendedTier.btu}
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  {recommendedTier.desc}
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-300 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Garante resfriamento rápido e uniforme.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Evita sobrecarga no compressor e economiza luz.</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Quote Button */}
            <div className="pt-4 border-t border-sky-500/20">
              <a
                href={`https://wa.me/5511947321510?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm sm:text-base shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all hover:scale-[1.02]"
              >
                <MessageSquare className="w-5 h-5 fill-current" />
                <span>Pedir Orçamento de {recommendedTier.btu}</span>
              </a>
              <p className="text-center text-[11px] text-slate-400 mt-2">
                Receba valores de aparelhos e instalação direto no WhatsApp
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
