'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Users, 
  Settings, 
  Mail, 
  LogOut, 
  ExternalLink, 
  MessageSquare, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Shield, 
  Save, 
  RefreshCw,
  Send,
  Download,
  AlertCircle
} from 'lucide-react';
import Logo from '@/components/Logo';
import { Lead, SiteSettings } from '@/lib/types';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'leads' | 'settings' | 'smtp' | 'security'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [settings, setSettings] = useState<Partial<SiteSettings>>({});
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [testSmtpLoading, setTestSmtpLoading] = useState(false);
  const [testSmtpResult, setTestSmtpResult] = useState<{ success?: boolean; message?: string } | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [leadsRes, settingsRes] = await Promise.all([
        fetch('/api/admin/leads'),
        fetch('/api/admin/settings'),
      ]);

      if (leadsRes.status === 401 || settingsRes.status === 401) {
        router.push('/admin/login');
        return;
      }

      const leadsData = await leadsRes.json();
      const settingsData = await settingsRes.json();

      if (leadsData.success) setLeads(leadsData.leads || []);
      if (settingsData.success) setSettings(settingsData.settings || {});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const handleUpdateLeadStatus = async (id: string, status: Lead['status']) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Deseja realmente remover este lead da lista?')) return;
    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveSettings = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaveStatus(null);
    try {
      const payload: any = { ...settings };
      if (newPassword.trim().length >= 6) {
        payload.newPassword = newPassword.trim();
      }

      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setSaveStatus({ success: true, message: 'Alterações salvas com sucesso!' });
        setNewPassword('');
        setTimeout(() => setSaveStatus(null), 4000);
      } else {
        setSaveStatus({ success: false, message: data.message || 'Erro ao salvar.' });
      }
    } catch (err: any) {
      setSaveStatus({ success: false, message: err.message || 'Erro de conexão.' });
    }
  };

  const handleTestSmtp = async () => {
    setTestSmtpLoading(true);
    setTestSmtpResult(null);
    try {
      const res = await fetch('/api/admin/test-smtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings.smtp || {}),
      });
      const data = await res.json();
      setTestSmtpResult({
        success: data.success,
        message: data.message,
      });
    } catch (err: any) {
      setTestSmtpResult({ success: false, message: err.message || 'Falha ao testar.' });
    } finally {
      setTestSmtpLoading(false);
    }
  };

  const exportLeadsCSV = () => {
    if (!leads.length) return;
    const headers = ['Data', 'Nome', 'WhatsApp', 'Email', 'Servico', 'Ambiente', 'Horario', 'Status', 'Mensagem'];
    const rows = leads.map((l) => [
      new Date(l.createdAt).toLocaleString('pt-BR'),
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.email || ''}"`,
      `"${l.serviceType}"`,
      `"${l.roomSize || ''}"`,
      `"${l.preferredTime || ''}"`,
      l.status,
      `"${(l.message || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_mota_arcondicionado_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter((l) => {
    const term = searchTerm.toLowerCase();
    return (
      l.name.toLowerCase().includes(term) ||
      l.phone.includes(term) ||
      l.serviceType.toLowerCase().includes(term) ||
      (l.email && l.email.toLowerCase().includes(term))
    );
  });

  return (
    <div className="min-h-screen bg-[#020914] text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="border-b border-sky-500/20 bg-[#04142b]/90 backdrop-blur-md px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Logo size="sm" showSubtitle={false} />
            <div className="border-l border-sky-500/20 pl-4">
              <span className="text-sm font-bold text-white">Central Administrativa</span>
              <p className="text-[11px] text-sky-400">Romero Mota • Mota Ar-Condicionado</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-950/40 border border-sky-500/20 hover:border-sky-400 text-xs font-semibold text-sky-300 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Ver Site no Ar</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/30 border border-red-500/30 hover:bg-red-900/40 text-xs font-semibold text-red-300 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 flex flex-col">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-sky-500/20 pb-4">
          <button
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'leads'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
                : 'bg-sky-950/40 text-slate-300 hover:bg-sky-900/50 hover:text-white border border-sky-500/15'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Leads & Orçamentos ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'settings'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
                : 'bg-sky-950/40 text-slate-300 hover:bg-sky-900/50 hover:text-white border border-sky-500/15'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Dados da Empresa</span>
          </button>

          <button
            onClick={() => setActiveTab('smtp')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'smtp'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
                : 'bg-sky-950/40 text-slate-300 hover:bg-sky-900/50 hover:text-white border border-sky-500/15'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Configuração SMTP / E-mail</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'security'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
                : 'bg-sky-950/40 text-slate-300 hover:bg-sky-900/50 hover:text-white border border-sky-500/15'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Segurança / Senha</span>
          </button>
        </div>

        {/* Status Toast */}
        {saveStatus && (
          <div
            className={`mb-6 p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              saveStatus.success
                ? 'bg-emerald-950/50 border border-emerald-500/40 text-emerald-300'
                : 'bg-red-950/50 border border-red-500/40 text-red-300'
            }`}
          >
            {saveStatus.success ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{saveStatus.message}</span>
          </div>
        )}

        {/* Tab 1: Leads */}
        {activeTab === 'leads' && (
          <div className="flex-1 flex flex-col">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Buscar por nome, telefone ou serviço..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 rounded-xl bg-sky-950/40 border border-sky-500/20 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-400 w-72"
                />
                <button
                  onClick={fetchDashboardData}
                  className="p-2 rounded-xl bg-sky-950/40 border border-sky-500/20 text-sky-400 hover:text-white"
                  title="Recarregar lista"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>

              <button
                onClick={exportLeadsCSV}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-sky-900/40 hover:bg-sky-800/60 border border-sky-500/30 text-xs font-bold text-sky-200"
              >
                <Download className="w-4 h-4" />
                <span>Exportar (.CSV)</span>
              </button>
            </div>

            {/* Leads Table / Cards */}
            {filteredLeads.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-[#04142b]/60 border border-sky-500/15">
                <Users className="w-10 h-10 text-sky-400/40 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-200">Nenhum lead encontrado</h3>
                <p className="text-xs text-slate-400 mt-1">Os contatos capturados pelo site aparecerão listados aqui.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredLeads.map((lead) => {
                  const rawPhone = lead.phone.replace(/\D/g, '');
                  const waLink = `https://wa.me/55${rawPhone}?text=${encodeURIComponent(
                    `Olá ${lead.name}! Aqui é o Romero Mota da Mota Serviços de Ar-Condicionado. Recebi seu pedido de orçamento para ${lead.serviceType}.`
                  )}`;

                  return (
                    <div
                      key={lead.id}
                      className="p-5 rounded-2xl bg-[#04142b]/80 border border-sky-500/20 hover:border-sky-400/40 backdrop-blur-md shadow-lg transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                    >
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2.5 mb-2">
                          <span className="font-bold text-base text-white">{lead.name}</span>
                          <span className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                            {lead.phone}
                          </span>
                          {lead.email && (
                            <span className="text-xs text-slate-400 bg-sky-950/40 px-2 py-0.5 rounded">
                              {lead.email}
                            </span>
                          )}
                          <span className="text-[11px] text-slate-400 flex items-center gap-1 ml-auto">
                            <Clock className="w-3 h-3 text-sky-400" />
                            {new Date(lead.createdAt).toLocaleString('pt-BR')}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2 text-xs text-sky-300 font-medium mb-3">
                          <span className="bg-sky-500/15 px-2.5 py-1 rounded-md border border-sky-400/25">
                            {lead.serviceType}
                          </span>
                          {lead.roomSize && (
                            <span className="bg-sky-950/60 text-slate-300 px-2 py-1 rounded-md">
                              Ambiente: {lead.roomSize}
                            </span>
                          )}
                          {lead.preferredTime && (
                            <span className="bg-sky-950/60 text-slate-300 px-2 py-1 rounded-md">
                              Horário: {lead.preferredTime}
                            </span>
                          )}
                        </div>

                        {lead.message && (
                          <p className="text-xs text-slate-300 bg-black/40 p-3 rounded-xl border border-sky-500/10">
                            &quot;{lead.message}&quot;
                          </p>
                        )}
                      </div>

                      {/* Status and Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3 shrink-0 w-full lg:w-auto justify-end">
                        {/* Status Select */}
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as any)}
                          className="px-3 py-2 rounded-xl bg-[#031122] border border-sky-500/30 text-xs font-semibold text-slate-200 focus:outline-none"
                        >
                          <option value="new">🟡 Novo / Não Atendido</option>
                          <option value="contacted">🔵 Em Atendimento</option>
                          <option value="quoted">🟣 Proposta Enviada</option>
                          <option value="closed">🟢 Fechado / Concluído</option>
                          <option value="archived">⚪ Arquivado</option>
                        </select>

                        {/* WhatsApp CTA */}
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold shadow-md transition-all"
                        >
                          <MessageSquare className="w-3.5 h-3.5 fill-current" />
                          <span>Chamar no WhatsApp</span>
                        </a>

                        {/* Delete */}
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-950/30 transition-all"
                          title="Excluir Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Settings */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="p-8 rounded-3xl bg-[#04142b]/80 border border-sky-500/20 max-w-3xl space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-sky-500/20 pb-3">
              Informações do Negócio & Contatos
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nome Comercial</label>
                <input
                  type="text"
                  value={settings.companyName || ''}
                  onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-sky-950/40 border border-sky-500/25 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Responsável Técnico</label>
                <input
                  type="text"
                  value={settings.ownerName || ''}
                  onChange={(e) => setSettings({ ...settings, ownerName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-sky-950/40 border border-sky-500/25 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Telefone / WhatsApp (Visível)</label>
                <input
                  type="text"
                  value={settings.phone || ''}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-sky-950/40 border border-sky-500/25 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Número WhatsApp (Somente dígitos)</label>
                <input
                  type="text"
                  value={settings.whatsapp || ''}
                  onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-sky-950/40 border border-sky-500/25 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">E-mail Principal</label>
                <input
                  type="email"
                  value={settings.email || ''}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-sky-950/40 border border-sky-500/25 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Horário de Funcionamento</label>
                <input
                  type="text"
                  value={settings.operatingHours || ''}
                  onChange={(e) => setSettings({ ...settings, operatingHours: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-sky-950/40 border border-sky-500/25 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Região e Endereço Base</label>
              <input
                type="text"
                value={settings.address || ''}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-sky-950/40 border border-sky-500/25 text-xs text-white"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold shadow-md transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Alterações</span>
            </button>
          </form>
        )}

        {/* Tab 3: SMTP */}
        {activeTab === 'smtp' && (
          <form onSubmit={handleSaveSettings} className="p-8 rounded-3xl bg-[#04142b]/80 border border-sky-500/20 max-w-3xl space-y-6">
            <div className="flex items-center justify-between border-b border-sky-500/20 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">Configuração do Servidor SMTP</h3>
                <p className="text-xs text-slate-400">Usado para disparar e-mails automáticos a cada novo lead recebido.</p>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.smtp?.enabled || false}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      smtp: { ...settings.smtp!, enabled: e.target.checked } as any,
                    })
                  }
                  className="w-4 h-4 rounded text-sky-500 focus:ring-sky-400"
                />
                <span className="text-xs font-bold text-sky-300">Ativar SMTP</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Servidor SMTP (Host)</label>
                <input
                  type="text"
                  placeholder="smtp.gmail.com ou smtp.titan.email"
                  value={settings.smtp?.host || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      smtp: { ...settings.smtp!, host: e.target.value } as any,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-sky-950/40 border border-sky-500/25 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Porta</label>
                <input
                  type="number"
                  placeholder="587 ou 465"
                  value={settings.smtp?.port || 587}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      smtp: { ...settings.smtp!, port: Number(e.target.value) } as any,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-sky-950/40 border border-sky-500/25 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Usuário / E-mail de Autenticação</label>
                <input
                  type="text"
                  placeholder="contato@motaarcondicionado.com.br"
                  value={settings.smtp?.user || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      smtp: { ...settings.smtp!, user: e.target.value } as any,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-sky-950/40 border border-sky-500/25 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Senha do SMTP / App Password</label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={settings.smtp?.pass || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      smtp: { ...settings.smtp!, pass: e.target.value } as any,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-sky-950/40 border border-sky-500/25 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">E-mail Remetente (From)</label>
                <input
                  type="email"
                  placeholder="notificacoes@motaarcondicionado.com.br"
                  value={settings.smtp?.fromEmail || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      smtp: { ...settings.smtp!, fromEmail: e.target.value } as any,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-sky-950/40 border border-sky-500/25 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Destinatário das Notificações (To)</label>
                <input
                  type="email"
                  placeholder="romeromota1510@gmail.com"
                  value={settings.smtp?.notifyEmail || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      smtp: { ...settings.smtp!, notifyEmail: e.target.value } as any,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-sky-950/40 border border-sky-500/25 text-xs text-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.smtp?.secure || false}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      smtp: { ...settings.smtp!, secure: e.target.checked } as any,
                    })
                  }
                  className="w-4 h-4 rounded text-sky-500 focus:ring-sky-400"
                />
                <span className="text-xs text-slate-300">Conexão SSL Segura (porta 465)</span>
              </label>
            </div>

            {testSmtpResult && (
              <div
                className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${
                  testSmtpResult.success
                    ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
                    : 'bg-red-950/60 border border-red-500/40 text-red-300'
                }`}
              >
                {testSmtpResult.success ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span>{testSmtpResult.message}</span>
              </div>
            )}

            <div className="flex items-center gap-4 pt-4 border-t border-sky-500/15">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold shadow-md transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Salvar Configuração SMTP</span>
              </button>

              <button
                type="button"
                onClick={handleTestSmtp}
                disabled={testSmtpLoading}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-950/50 hover:bg-sky-900 border border-sky-500/30 text-sky-300 hover:text-white text-xs font-semibold transition-all disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{testSmtpLoading ? 'Testando Conexão...' : 'Testar Conexão SMTP'}</span>
              </button>
            </div>
          </form>
        )}

        {/* Tab 4: Security */}
        {activeTab === 'security' && (
          <form onSubmit={handleSaveSettings} className="p-8 rounded-3xl bg-[#04142b]/80 border border-sky-500/20 max-w-lg space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-sky-500/20 pb-3">
              Alterar Senha do Administrador
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nova Senha de Acesso (Mínimo 6 caracteres)
              </label>
              <input
                type="password"
                placeholder="Digite a nova senha segura"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-sky-950/40 border border-sky-500/25 text-xs text-white focus:outline-none focus:border-sky-400"
              />
            </div>

            <button
              type="submit"
              disabled={newPassword.length < 6}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold shadow-md transition-all disabled:opacity-40"
            >
              <Save className="w-4 h-4" />
              <span>Atualizar Senha</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
