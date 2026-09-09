import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Lock } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-sky-500/20 bg-[#020710] text-slate-400 text-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand & Bio */}
          <div>
            <Logo size="md" className="mb-4" />
            <p className="text-xs text-slate-400 leading-relaxed mt-3">
              Especialistas em climatização residencial, comercial e corporativa em São Paulo. 
              Venda, instalação padronizada com vácuo digital, manutenção preventiva e elaboração de contratos PMOC.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-sky-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Garantia de Fábrica Preservada</span>
            </div>
          </div>

          {/* Col 2: Serviços Rápidos */}
          <div>
            <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4 border-l-2 border-sky-400 pl-2">
              Nossos Serviços
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#servicos" className="hover:text-sky-300 transition-colors">Venda de Aparelhos Inverter</a></li>
              <li><a href="#servicos" className="hover:text-sky-300 transition-colors">Instalação com Vacuômetro Digital</a></li>
              <li><a href="#servicos" className="hover:text-sky-300 transition-colors">Higienização Química Antibactericida</a></li>
              <li><a href="#servicos" className="hover:text-sky-300 transition-colors">Manutenção e Recarga de Gás (R-410A / R-32)</a></li>
              <li><a href="#servicos" className="hover:text-sky-300 transition-colors">Contratos de Manutenção PMOC</a></li>
              <li><a href="#servicos" className="hover:text-sky-300 transition-colors">Infraestrutura embutida para Obras</a></li>
            </ul>
          </div>

          {/* Col 3: Regiões Atendidas */}
          <div>
            <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4 border-l-2 border-sky-400 pl-2">
              Regiões Atendidas
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>• São Paulo - SP (Todas as Zonas)</li>
              <li>• Moema, Morumbi, Vila Mariana, Pinheiros</li>
              <li>• Itaim Bibi, Brooklin, Jardins, Perdizes</li>
              <li>• Tatuapé, Mooca, Santana, Casa Verde</li>
              <li>• Alphaville e Tamboré</li>
              <li>• Grande ABC (Santo André, SBC, SCS)</li>
              <li>• Guarulhos e Osasco</li>
            </ul>
          </div>

          {/* Col 4: Contato & Plantão */}
          <div>
            <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4 border-l-2 border-sky-400 pl-2">
              Central de Atendimento
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2.5 text-slate-200">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+5511947321510" className="hover:text-emerald-300 font-semibold">
                  (11) 94732-1510 (Romero Mota)
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-slate-200">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                <span>São Paulo - SP e Região Metropolitana</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-200">
                <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Segunda a Sábado: 08h às 19h</span>
              </div>
            </div>

            <div className="mt-5">
              <a
                href="https://wa.me/5511947321510?text=Ol%C3%A1%2C%20Romero!%20Vim%20pelo%20site%20da%20Mota%20Ar-Condicionado."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30 text-xs font-bold transition-all"
              >
                <span>Chamar no WhatsApp Direto</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom divider */}
        <div className="mt-12 pt-8 border-t border-sky-500/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {currentYear} <strong>MOTA Serviços de Ar-Condicionado</strong> • Todos os direitos reservados.
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/admin/login"
              className="flex items-center gap-1 text-slate-400 hover:text-sky-400 transition-colors"
            >
              <Lock className="w-3 h-3" />
              <span>Painel Administrativo</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
