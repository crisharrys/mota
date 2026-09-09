'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, ArrowLeft, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import Logo from '@/components/Logo';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Senha incorreta.');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Erro ao realizar login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 relative">
      
      {/* Return to Site Button */}
      <div className="absolute top-6 left-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-950/40 border border-sky-500/20 text-slate-300 hover:text-white hover:border-sky-400/40 text-xs font-semibold transition-all backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Site</span>
        </Link>
      </div>

      <div className="w-full max-w-md">
        
        {/* Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#04142b]/90 border border-sky-400/30 backdrop-blur-xl shadow-2xl relative">
          
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo size="md" showSubtitle={false} />
            </div>
            <h1 className="text-xl font-bold text-slate-100">
              Painel Administrativo
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Acesso restrito para Romerio Mota & Gestão do Sistema
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Senha do Administrador
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-sky-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-sky-950/50 border border-sky-500/20 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-400 text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-md shadow-sky-500/25 transition-all hover:scale-[1.01] disabled:opacity-50"
            >
              {loading ? 'Verificando...' : 'Entrar no Sistema'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-sky-500/15 text-center">
            <p className="text-[11px] text-slate-400">
              💡 Senha padrão inicial: <code className="text-sky-300 bg-sky-950/80 px-1.5 py-0.5 rounded border border-sky-500/20">admin123</code> (alterável no painel)
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
