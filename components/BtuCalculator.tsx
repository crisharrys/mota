'use client';

import React, { useState, useMemo } from 'react';
import { Calculator, Sun, Moon, MessageSquare } from 'lucide-react';

export default function BtuCalculator() {
  const [area, setArea] = useState<number>(18);
  const [sunlight, setSunlight] = useState<'mild' | 'strong'>('strong');

  const recommendation = useMemo(() => {
    const factor = sunlight === 'strong' ? 800 : 600;
    const btuTotal = area * factor;

    if (btuTotal <= 9500) {
      return { btu: '9.000 BTUs', desc: 'Ideal para quartos pequenos e home offices de até 15m².' };
    } else if (btuTotal <= 13500) {
      return { btu: '12.000 BTUs', desc: 'Perfeito para quartos médios e salas de até 20m².' };
    } else if (btuTotal <= 20000) {
      return { btu: '18.000 BTUs', desc: 'Excelente para salas integradas e consultórios de até 30m².' };
    } else if (btuTotal <= 27000) {
      return { btu: '24.000 BTUs', desc: 'Indicado para salas amplas e espaços comerciais de até 40m².' };
    } else {
      return { btu: '30.000+ BTUs', desc: 'Projetos especiais, Cassete ou Multi-Split para grandes áreas.' };
    }
  }, [area, sunlight]);

  return (
    <section id="calculadora" className="py-20 relative">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        
        {/* Card Container */}
        <div className="p-7 sm:p-10 rounded-3xl bg-[#04142b]/85 border border-sky-400/25 backdrop-blur-xl shadow-2xl">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5" />
              Simulador Rápido
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-display">
              Calculadora de <span className="text-gradient-cyan">BTUs</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Descubra a capacidade ideal para o seu espaço em segundos.
            </p>
          </div>

          <div className="space-y-6">
            
            {/* Area Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-200">Tamanho do Ambiente</span>
                <span className="text-base font-bold text-sky-400 font-mono">{area} m²</span>
              </div>
              <input
                type="range"
                min="8"
                max="60"
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-2 bg-sky-950 rounded-lg appearance-none cursor-pointer accent-sky-400"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>8 m²</span>
                <span>30 m²</span>
                <span>60 m²</span>
              </div>
            </div>

            {/* Sunlight Buttons */}
            <div>
              <span className="text-xs font-bold text-slate-200 block mb-2">Incidência do Sol</span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSunlight('mild')}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    sunlight === 'mild'
                      ? 'bg-sky-500/20 border-sky-400 text-sky-200'
                      : 'bg-sky-950/30 border-sky-500/15 text-slate-400'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5 text-sky-300" />
                  <span>Sol Suave / Manhã</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSunlight('strong')}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    sunlight === 'strong'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                      : 'bg-sky-950/30 border-sky-500/15 text-slate-400'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sol Intenso / Tarde</span>
                </button>
              </div>
            </div>

            {/* Instant Result Box */}
            <div className="p-5 rounded-2xl bg-[#020b18]/80 border border-sky-400/30 text-center">
              <span className="text-[11px] font-semibold text-sky-400 uppercase tracking-widest block mb-1">
                Capacidade Recomendada
              </span>
              <div className="text-3xl sm:text-4xl font-black text-white font-display">
                {recommendation.btu}
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {recommendation.desc}
              </p>
            </div>

            {/* Direct CTA */}
            <a
              href={`https://wa.me/5511947321510?text=${encodeURIComponent(
                `Olá Romero! Fiz o cálculo no site para um espaço de ${area}m² com sol ${
                  sunlight === 'strong' ? 'intenso' : 'suave'
                }. O sistema recomendou ${recommendation.btu}. Gostaria de um orçamento!`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm shadow-md transition-all hover:scale-[1.01]"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Orçar Aparelho de {recommendation.btu}</span>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}
