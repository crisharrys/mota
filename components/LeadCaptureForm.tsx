'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, AlertCircle, Phone, User, MessageSquare } from 'lucide-react';
import { formatPhone } from '@/lib/utils';

export default function LeadCaptureForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState('Instalação');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Por favor, digite seu nome.');
      return;
    }
    if (phone.replace(/\D/g, '').length < 10) {
      setError('Informe um WhatsApp válido com DDD.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, serviceType, message }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSuccess(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#25D366', '#ffffff'],
      });
    } catch (err: any) {
      setError(err.message || 'Erro ao enviar. Tente pelo WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contato" className="py-20 relative">
      <div className="max-w-xl mx-auto px-5 sm:px-8">
        
        <div className="p-7 sm:p-10 rounded-3xl bg-[#04142b]/90 border border-sky-400/25 backdrop-blur-xl shadow-2xl">
          
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-1">
              Contato Rápido
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-100 font-display">
              Solicite seu <span className="text-gradient-cyan">Orçamento</span>
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Sem compromisso. Retornamos em poucos minutos.
            </p>
          </div>

          {success ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Mensagem Recebida! ❄️</h3>
              <p className="text-xs text-slate-300 mb-6">
                Obrigado, <strong>{name}</strong>. Romero Mota entrará em contato em breve.
              </p>
              <a
                href={`https://wa.me/5511947321510?text=${encodeURIComponent(
                  `Olá Romero! Enviei meu contato pelo site (${name} - ${serviceType}) e gostaria de agilizar meu orçamento!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-white font-bold text-xs shadow-md"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Agilizar no WhatsApp</span>
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Seu Nome *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-sky-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Como podemos te chamar?"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-sky-950/40 border border-sky-500/20 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp com DDD *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-emerald-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="(11) 99999-9999"
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-sky-950/40 border border-sky-500/20 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">O que você precisa? *</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#031122] border border-sky-500/20 text-slate-100 text-xs focus:outline-none focus:border-sky-400"
                >
                  <option value="Instalação">Instalação de Ar-Condicionado</option>
                  <option value="Venda">Comprar Aparelho Novo Inverter</option>
                  <option value="Manutenção">Manutenção / Recarga de Gás</option>
                  <option value="Higienização">Higienização Química Antibactericida</option>
                  <option value="PMOC">Contrato PMOC para Empresa</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Detalhes (Opcional)</label>
                <textarea
                  rows={2}
                  placeholder="Ex: Quarto de 15m², já tenho o aparelho..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-sky-950/40 border border-sky-500/20 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-sky-400 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Enviando...' : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Enviar Solicitação de Orçamento</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Quick Direct WhatsApp Link underneath */}
          <div className="mt-6 pt-5 border-t border-sky-500/15 text-center">
            <span className="text-xs text-slate-400 block mb-2">Prefere falar agora?</span>
            <a
              href="https://wa.me/5511947321510?text=Ol%C3%A1%20Romero!%20Gostaria%20de%20um%20or%C3%A7amento."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Chamar direto: (11) 94732-1510</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
