'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  Sun, 
  Moon, 
  MessageSquare, 
  Bed, 
  Tv, 
  Briefcase, 
  Store, 
  TrendingDown, 
  Sparkles,
  Zap
} from 'lucide-react';

interface RoomType {
  id: string;
  name: string;
  icon: any;
  defaultArea: number;
  multiplier: number;
}

const roomTypes: RoomType[] = [
  { id: 'bedroom', name: 'Quarto / Suíte', icon: Bed, defaultArea: 14, multiplier: 1.0 },
  { id: 'living', name: 'Sala Integrada', icon: Tv, defaultArea: 24, multiplier: 1.1 },
  { id: 'clinic', name: 'Consultório / Clínica', icon: Briefcase, defaultArea: 20, multiplier: 1.2 },
  { id: 'store', name: 'Comércio / Escritório', icon: Store, defaultArea: 35, multiplier: 1.25 },
];

export default function BtuCalculatorPro() {
  const [selectedRoom, setSelectedRoom] = useState<RoomType>(roomTypes[0]);
  const [area, setArea] = useState<number>(14);
  const [sunlight, setSunlight] = useState<'mild' | 'intense'>('intense');

  // Handle room change
  const handleRoomSelect = (room: RoomType) => {
    setSelectedRoom(room);
    setArea(room.defaultArea);
  };

  const calculation = useMemo(() => {
    const baseBtuPerMeter = sunlight === 'intense' ? 800 : 600;
    const rawBtu = area * baseBtuPerMeter * selectedRoom.multiplier;

    let btuLabel = '9.000 BTUs';
    let modelType = 'Split Hi-Wall Inverter';
    let annualSavings = 'R$ 1.120';
    let bestBrand = 'Daikin / Fujitsu / LG';

    if (rawBtu <= 9800) {
      btuLabel = '9.000 BTUs';
      modelType = 'Split Hi-Wall Inverter';
      annualSavings = 'R$ 1.120';
      bestBrand = 'Daikin Advance / LG Dual Inverter';
    } else if (rawBtu <= 13800) {
      btuLabel = '12.000 BTUs';
      modelType = 'Split Hi-Wall Inverter';
      annualSavings = 'R$ 1.480';
      bestBrand = 'Fujitsu High Spec / Daikin Eco';
    } else if (rawBtu <= 20500) {
      btuLabel = '18.000 BTUs';
      modelType = 'Split Inverter ou Cassete 1 Via';
      annualSavings = 'R$ 1.950';
      bestBrand = 'LG Dual Voice / Gree G-Top';
    } else if (rawBtu <= 27500) {
      btuLabel = '24.000 BTUs';
      modelType = 'Split Inverter ou Cassete 4 Vias';
      annualSavings = 'R$ 2.400';
      bestBrand = 'Daikin Cassete / Samsung WindFree';
    } else {
      btuLabel = '30.000 a 36.000+ BTUs';
      modelType = 'Cassete 4 Vias ou Piso-Teto';
      annualSavings = 'R$ 3.200';
      bestBrand = 'Carrier / Midea / Daikin VRF';
    }

    return {
      rawBtu: Math.round(rawBtu),
      btuLabel,
      modelType,
      annualSavings,
      bestBrand,
    };
  }, [area, sunlight, selectedRoom]);

  return (
    <section id="calculadora" className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5" />
            Engenharia Térmica de Precisão
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight font-display">
            Simulador de Ambientes & <span className="text-gradient-cyan">Economia</span>
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base font-light">
            Dimensione a capacidade correta e veja quanto você economiza na conta de luz ao trocar aparelhos velhos por sistemas Inverter instalados por Romero Mota.
          </p>
        </div>

        {/* Main Card */}
        <div className="p-7 sm:p-10 rounded-3xl bg-gradient-to-b from-[#061e3d]/90 via-[#04142b]/95 to-[#020b18] border border-sky-400/30 backdrop-blur-2xl shadow-2xl">
          
          {/* Step 1: Select Room Type */}
          <div className="mb-8">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3">
              1. Selecione o Tipo de Ambiente:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {roomTypes.map((room) => {
                const Icon = room.icon;
                const isSelected = selectedRoom.id === room.id;
                return (
                  <button
                    key={room.id}
                    type="button"
                    onClick={() => handleRoomSelect(room)}
                    className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-sky-500/25 border-sky-400 text-white shadow-[0_0_20px_rgba(56,189,248,0.25)] scale-[1.02]'
                        : 'bg-sky-950/30 border-sky-500/15 text-slate-400 hover:text-slate-200 hover:border-sky-500/30'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-sky-300' : 'text-slate-500'}`} />
                    <span className="text-xs font-bold leading-tight">{room.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Sliders & Sunlight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-sky-500/20">
            
            {/* Area Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  2. Metragem do Local:
                </span>
                <span className="text-lg font-bold text-sky-400 font-mono">
                  {area} m²
                </span>
              </div>
              <input
                type="range"
                min="6"
                max="80"
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-2.5 bg-sky-950 rounded-lg appearance-none cursor-pointer accent-sky-400"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>6 m²</span>
                <span>40 m²</span>
                <span>80 m²</span>
              </div>
            </div>

            {/* Sunlight Exposure */}
            <div>
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                3. Incidência de Sol:
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSunlight('mild')}
                  className={`py-3 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    sunlight === 'mild'
                      ? 'bg-sky-500/20 border-sky-400 text-sky-200 shadow-sm'
                      : 'bg-sky-950/30 border-sky-500/15 text-slate-400'
                  }`}
                >
                  <Moon className="w-4 h-4 text-sky-300" />
                  <span>Sol Suave / Manhã</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSunlight('intense')}
                  className={`py-3 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    sunlight === 'intense'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-sm'
                      : 'bg-sky-950/30 border-sky-500/15 text-slate-400'
                  }`}
                >
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Sol Intenso / Tarde</span>
                </button>
              </div>
            </div>

          </div>

          {/* Results Dynamic Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch mb-8">
            
            {/* Box 1: Recommended Capacity */}
            <div className="p-6 rounded-2xl bg-[#020b18]/80 border border-sky-400/35 text-center flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest block mb-1">
                  Capacidade Recomendada
                </span>
                <div className="text-3xl font-black text-white font-display">
                  {calculation.btuLabel}
                </div>
                <div className="text-xs text-slate-300 mt-1 font-medium">
                  {calculation.modelType}
                </div>
              </div>
              <span className="text-[10px] text-slate-500 mt-3 block font-mono">
                Carga Térmica: {calculation.rawBtu.toLocaleString('pt-BR')} BTUs/h
              </span>
            </div>

            {/* Box 2: Annual Energy Savings */}
            <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-center flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-1 flex items-center justify-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5" />
                  Economia na Conta de Luz
                </span>
                <div className="text-3xl font-black text-emerald-300 font-display">
                  até {calculation.annualSavings}
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  estimada por ano vs aparelhos antigos
                </div>
              </div>
              <span className="text-[10px] text-emerald-400/80 mt-3 block font-mono">
                Tecnologia Inverter Selo Procel A+++
              </span>
            </div>

            {/* Box 3: Top Recommended Brands */}
            <div className="p-6 rounded-2xl bg-sky-950/30 border border-sky-500/20 text-center flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest block mb-1">
                  Marcas Recomendadas
                </span>
                <div className="text-base font-bold text-white mt-1">
                  {calculation.bestBrand}
                </div>
                <div className="text-xs text-slate-400 mt-1 font-light">
                  Instalação mantendo a garantia do fabricante
                </div>
              </div>
              <span className="text-[10px] text-sky-300 mt-3 block">
                Com vácuo digital e cobre puro
              </span>
            </div>

          </div>

          {/* Action Button */}
          <div className="text-center">
            <a
              href={`https://wa.me/5511947321510?text=${encodeURIComponent(
                `Olá Romero! Fiz a simulação no site para ${selectedRoom.name} de ${area}m² com sol ${
                  sunlight === 'intense' ? 'intenso' : 'suave'
                }. O sistema recomendou ${calculation.btuLabel} (${calculation.modelType}). Gostaria de um orçamento!`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all hover:scale-105"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Solicitar Orçamento de {calculation.btuLabel} no WhatsApp</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
