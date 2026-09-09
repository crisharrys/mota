'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, AlertCircle, Phone, Mail, User, Clock, MessageSquare, Sparkles } from 'lucide-react';
import { formatPhone } from '@/lib/utils';

export default function LeadCaptureForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: 'Instalação de Ar-Condicionado',
    roomSize: '',
    preferredTime: 'Qualquer Horário',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const serviceOptions = [
    'Instalação de Ar-Condicionado',
    'Venda + Instalação de Equipamento',
    'Manutenção Preventiva / Corretiva',
    'Higienização Química Antibactericida',
    'Contrato PMOC para Empresa/Condomínio',
    'Infraestrutura em Obra/Reforma',
    'Outro Serviço Especializado',
  ];

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('Por favor, informe seu nome completo.');
      return;
    }

    if (formData.phone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Por favor, digite um número de WhatsApp ou telefone válido com DDD.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Erro ao enviar dados.');
      }

      // Success
      setSuccess(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#0ea5e9', '#25D366', '#ffffff'],
      });
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Ocorreu um erro ao enviar. Tente novamente ou use o WhatsApp direto.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSuccess(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      serviceType: 'Instalação de Ar-Condicionado',
      roomSize: '',
      preferredTime: 'Qualquer Horário',
      message: '',
    });
  };

  return (
    <section id="contato" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Direct Info & WhatsApp Call */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Atendimento Imediato
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight">
                Solicite seu <span className="text-gradient-cyan">Orçamento Grátis</span> e Sem Compromisso
              </h2>

              <p className="mt-4 text-slate-300 text-base leading-relaxed">
                Preencha o formulário para receber uma proposta técnica detalhada no seu e-mail ou WhatsApp. Se preferir agilidade total, chame diretamente no WhatsApp do Romero.
              </p>

              {/* Direct WhatsApp Callout Card */}
              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-[#061e3d] to-[#04142b] border border-sky-500/30 shadow-xl">
                <div className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">
                  Atendimento Direto com o Especialista
                </div>
                <div className="text-xl font-bold text-white mb-1">
                  Romero Mota
                </div>
                <p className="text-xs text-slate-300 mb-4">
                  Tire dúvidas em tempo real, envie fotos da sua tubulação ou solicite visita técnica.
                </p>

                <a
                  href="https://wa.me/5511947321510?text=Ol%C3%A1%2C%20Romero!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20ar-condicionado."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm shadow-md shadow-emerald-500/20 transition-all hover:scale-105"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>WhatsApp: (11) 94732-1510</span>
                </a>
              </div>

              {/* Coverage notice */}
              <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Atendemos toda a cidade de São Paulo, Grande ABC e Alphaville.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-10 rounded-3xl bg-[#04142b]/85 border border-sky-400/30 backdrop-blur-xl shadow-2xl relative">
              
              {success ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto mb-5 animate-bounce">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-100 mb-2">
                    Solicitação Recebida com Sucesso! ❄️
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
                    Obrigado, <strong>{formData.name}</strong>! Recebemos seus dados e entraremos em contato o mais rápido possível através do WhatsApp informado.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={`https://wa.me/5511947321510?text=${encodeURIComponent(`Olá Romero! Acabei de enviar meus dados no site da Mota Ar-Condicionado (${formData.name} - ${formData.serviceType}) e gostaria de agilizar meu atendimento!`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-500/30 transition-all flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                      <span>Agilizar no WhatsApp Agora</span>
                    </a>

                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-5 py-3 rounded-xl bg-sky-950/50 hover:bg-sky-900 text-sky-300 text-xs font-semibold border border-sky-500/30"
                    >
                      Enviar Outra Mensagem
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-sky-500/15 pb-4 mb-2">
                    <h3 className="text-xl font-bold text-slate-100">
                      Preencha para receber um orçamento
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Retornamos em até 30 minutos em horário comercial.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Nome & WhatsApp Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Seu Nome Completo *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-sky-400 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          required
                          placeholder="Ex: Carlos Oliveira"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-sky-950/40 border border-sky-500/20 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-sm transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        WhatsApp / Celular com DDD *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-emerald-400 absolute left-3.5 top-3.5" />
                        <input
                          type="tel"
                          required
                          placeholder="(11) 99999-9999"
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-sky-950/40 border border-sky-500/20 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 text-sm transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* E-mail & Tipo de Serviço */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Seu E-mail (Opcional)
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-sky-400 absolute left-3.5 top-3.5" />
                        <input
                          type="email"
                          placeholder="exemplo@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-sky-950/40 border border-sky-500/20 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-sm transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Tipo de Serviço Desejado *
                      </label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#031122] border border-sky-500/25 text-slate-100 focus:outline-none focus:border-sky-400 text-sm transition-all"
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#04142b] text-slate-100">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Metragem & Horário */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Metragem / Tipo de Imóvel
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: 25m², Apartamento, Sala Comercial"
                        value={formData.roomSize}
                        onChange={(e) => setFormData({ ...formData, roomSize: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-sky-950/40 border border-sky-500/20 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-400 text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Melhor Horário para Contato
                      </label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#031122] border border-sky-500/25 text-slate-100 focus:outline-none focus:border-sky-400 text-sm transition-all"
                      >
                        <option value="Qualquer Horário" className="bg-[#04142b]">Qualquer Horário</option>
                        <option value="Manhã (08h às 12h)" className="bg-[#04142b]">Manhã (08h às 12h)</option>
                        <option value="Tarde (12h às 18h)" className="bg-[#04142b]">Tarde (12h às 18h)</option>
                        <option value="Noite (18h às 20h)" className="bg-[#04142b]">Noite (18h às 20h)</option>
                      </select>
                    </div>
                  </div>

                  {/* Mensagem adicional */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Conte mais sobre sua necessidade (Opcional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Ex: Já tenho a tubulação passada no gesso e preciso instalar um aparelho de 12.000 BTUs..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-sky-950/40 border border-sky-500/20 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-400 text-sm transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-base shadow-[0_0_20px_rgba(56,189,248,0.35)] transition-all hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Enviando solicitação...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Solicitar Orçamento Agora</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-slate-400">
                    🔒 Seus dados estão 100% seguros e serão utilizados apenas para a elaboração do seu orçamento.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
