'use client';

import React, { useMemo, useState } from 'react';
import { Snowflake } from './Snowflake';
import { banks, plates, coverage, site, whatsappUrl } from '@/lib/site';

function Shell({
  id,
  children,
  className = '',
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`px-5 py-20 sm:px-8 sm:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-[1120px]">{children}</div>
    </section>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="max-w-[20ch] text-balance text-[2rem] font-bold leading-[1.07] tracking-[-0.03em] sm:text-[2.9rem]">
      {children}
    </h2>
  );
}

/* ---------------- serviços ---------------- */

export function Services() {
  return (
    <Shell id="servicos">
      <H2>Seis serviços. Todos com o técnico na obra, não um intermediário.</H2>
      <div className="mt-14 grid gap-x-14 gap-y-2 md:grid-cols-2">
        {banks.map((b) => (
          <a
            key={b.id}
            href={whatsappUrl(`Olá Romerio! Queria falar sobre ${b.name}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-2 border-t py-7 transition-colors duration-200"
            style={{ borderColor: 'var(--line)' }}
          >
            <span className="flex items-baseline justify-between gap-4">
              <span className="text-[1.35rem] font-semibold tracking-[-0.015em] transition-colors duration-200 group-hover:text-[color:var(--cyan)] sm:text-[1.6rem]">
                {b.name}
              </span>
              <span
                aria-hidden="true"
                className="translate-x-0 text-[1.1rem] opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                style={{ color: 'var(--cyan)' }}
              >
                →
              </span>
            </span>
            <span
              className="max-w-[46ch] text-[0.94rem] leading-[1.62]"
              style={{ color: 'var(--ink-2)' }}
            >
              {b.detail}
            </span>
          </a>
        ))}
      </div>
    </Shell>
  );
}

/* ---------------- método ---------------- */

export function Method() {
  return (
    <Shell id="metodo">
      <H2>Por que a instalação decide a vida do aparelho.</H2>
      <p
        className="mt-5 max-w-[58ch] text-[1rem] leading-[1.65]"
        style={{ color: 'var(--ink-2)' }}
      >
        Não tem selo nem prêmio para mostrar aqui. O que dá para mostrar é o
        procedimento — e você pode cobrar cada passo na hora do serviço.
      </p>

      <div className="mt-16 grid gap-x-12 gap-y-14 md:grid-cols-2">
        {plates.map((p) => (
          <div key={p.n} className="flex gap-6">
            <span
              className="tnum shrink-0 text-[2.6rem] font-bold leading-none tracking-[-0.04em]"
              style={{ color: 'transparent', WebkitTextStroke: '1px var(--cyan)' }}
              aria-hidden="true"
            >
              {p.n}
            </span>
            <div>
              <h3 className="text-[1.3rem] font-semibold tracking-[-0.015em]">
                {p.title}
              </h3>
              <span
                className="tnum mt-1.5 block text-[0.82rem] font-medium tracking-[0.06em]"
                style={{ color: 'var(--amber)' }}
              >
                {p.spec}
              </span>
              <p
                className="mt-3.5 max-w-[46ch] text-[0.94rem] leading-[1.66]"
                style={{ color: 'var(--ink-2)' }}
              >
                {p.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}

/* ---------------- simulador ---------------- */

const AREAS = [6, 9, 12, 15, 20, 25, 30, 40];
const CAPS = [7000, 9000, 12000, 18000, 22000, 24000, 30000, 36000];

export function Sizer() {
  const [area, setArea] = useState(12);
  const [people, setPeople] = useState(2);
  const [sun, setSun] = useState(false);

  const raw = area * (sun ? 800 : 600) + Math.max(0, people - 2) * 600;
  const rec = CAPS.find((c) => c >= raw) ?? CAPS[CAPS.length - 1];

  const msg = `Olá Romerio! Simulei no site: ${area} m², ${people} pessoa${
    people === 1 ? '' : 's'
  }${sun ? ', sol forte' : ''}. Deu ${rec.toLocaleString('pt-BR')} BTUs. Pode confirmar?`;

  return (
    <Shell id="simulador">
      <div
        className="rounded-[28px] p-7 sm:p-12"
        style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}
      >
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <H2>Aparelho grande demais gela rápido e estraga cedo.</H2>
            <p
              className="mt-5 max-w-[48ch] text-[0.97rem] leading-[1.65]"
              style={{ color: 'var(--ink-2)' }}
            >
              Superdimensionar faz o compressor ligar e desligar sem parar, sem
              tempo de tirar a umidade do ar. Veja a faixa antes de comprar.
            </p>

            <fieldset className="mt-10">
              <legend
                className="mb-3 text-[0.8rem] font-semibold tracking-[0.14em]"
                style={{ color: 'var(--ink-3)' }}
              >
                ÁREA EM M²
              </legend>
              <div className="flex flex-wrap gap-2">
                {AREAS.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setArea(a)}
                    aria-pressed={a === area}
                    className="tnum h-11 w-14 rounded-full text-[0.9rem] font-semibold transition-all duration-200"
                    style={{
                      background: a === area ? 'var(--cyan)' : 'transparent',
                      color: a === area ? '#04121f' : 'var(--ink-2)',
                      border: `1px solid ${a === area ? 'var(--cyan)' : 'var(--line)'}`,
                    }}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-8">
              <legend
                className="mb-3 text-[0.8rem] font-semibold tracking-[0.14em]"
                style={{ color: 'var(--ink-3)' }}
              >
                PESSOAS
              </legend>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPeople(p)}
                    aria-pressed={p === people}
                    aria-label={`${p} pessoa${p === 1 ? '' : 's'}`}
                    className="tnum h-11 w-11 rounded-full text-[0.9rem] font-semibold transition-all duration-200"
                    style={{
                      background: p === people ? 'var(--cyan)' : 'transparent',
                      color: p === people ? '#04121f' : 'var(--ink-2)',
                      border: `1px solid ${p === people ? 'var(--cyan)' : 'var(--line)'}`,
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </fieldset>

            <button
              type="button"
              onClick={() => setSun((s) => !s)}
              aria-pressed={sun}
              className="mt-8 inline-flex h-12 items-center gap-3 rounded-full px-6 text-[0.9rem] font-semibold transition-all duration-200"
              style={{
                background: sun ? 'rgba(255,171,94,0.14)' : 'transparent',
                border: `1px solid ${sun ? 'var(--amber)' : 'var(--line)'}`,
                color: sun ? 'var(--amber)' : 'var(--ink-2)',
              }}
            >
              <span
                className="block h-2.5 w-2.5 rounded-full"
                style={{
                  background: sun ? 'var(--amber)' : 'var(--ink-3)',
                  boxShadow: sun ? '0 0 12px 1px var(--amber)' : 'none',
                }}
                aria-hidden="true"
              />
              {sun ? 'Sol forte na janela' : 'Sombra ou sol fraco'}
            </button>
          </div>

          <div className="flex flex-col justify-center">
            <span
              className="text-[0.8rem] font-semibold tracking-[0.14em]"
              style={{ color: 'var(--ink-3)' }}
            >
              INDICAÇÃO
            </span>
            <p
              className="tnum mt-3 text-[3.4rem] font-bold leading-none tracking-[-0.045em] sm:text-[4.2rem]"
              style={{ color: 'var(--cyan)' }}
            >
              {rec.toLocaleString('pt-BR')}
              <span className="ml-2 align-top text-[1rem] font-semibold tracking-normal">
                BTU
              </span>
            </p>
            <p
              className="tnum mt-3 text-[0.85rem]"
              style={{ color: 'var(--ink-3)' }}
            >
              cálculo bruto {raw.toLocaleString('pt-BR')}
            </p>
            <p
              className="mt-6 max-w-[34ch] text-[0.9rem] leading-[1.62]"
              style={{ color: 'var(--ink-2)' }}
            >
              É uma estimativa de partida. Pé-direito alto, laje exposta ou
              muita vidraça mudam a conta — o número final sai depois de olhar o
              ambiente.
            </p>
            <a
              href={whatsappUrl(msg)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost mt-8 inline-flex h-12 items-center justify-center px-6 text-[0.88rem]"
            >
              Confirmar com o Romerio
            </a>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ---------------- orçamento ---------------- */

export function Quote() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [need, setNeed] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');

  const toggle = (id: string) =>
    setNeed((n) => (n.includes(id) ? n.filter((x) => x !== id) : [...n, id]));

  const chosen = useMemo(
    () => banks.filter((b) => need.includes(b.id)),
    [need]
  );

  const message = useMemo(() => {
    const who = name ? ` Meu nome é ${name}.` : '';
    if (chosen.length === 0)
      return `Olá Romerio! Vim pelo site e gostaria de um orçamento.${who}`;
    return `Olá Romerio! Vim pelo site.${who} Preciso de: ${chosen
      .map((c) => c.name)
      .join(', ')}.`;
  }, [chosen, name]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!name.trim()) return setError('Escreva seu nome.');
    if (phone.replace(/\D/g, '').length < 10)
      return setError('O telefone precisa ter DDD e número.');

    setStatus('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          serviceType:
            chosen.map((c) => c.name).join(' + ') || 'Orçamento geral',
          message,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus('sent');
    } catch {
      setStatus('sent');
      setError(
        'Não consegui registrar aqui, mas o WhatsApp abre normalmente — pode seguir por lá.'
      );
    }
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
  }

  return (
    <Shell id="orcamento">
      <H2>Diga o que precisa. O Romerio responde no WhatsApp.</H2>

      <form onSubmit={submit} className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <span
            className="text-[0.8rem] font-semibold tracking-[0.14em]"
            style={{ color: 'var(--ink-3)' }}
          >
            O QUE VOCÊ PRECISA
          </span>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {banks.map((b) => {
              const on = need.includes(b.id);
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => toggle(b.id)}
                  aria-pressed={on}
                  className="h-11 rounded-full px-5 text-[0.9rem] font-semibold transition-all duration-200"
                  style={{
                    background: on ? 'var(--cyan)' : 'transparent',
                    color: on ? '#04121f' : 'var(--ink-2)',
                    border: `1px solid ${on ? 'var(--cyan)' : 'var(--line)'}`,
                  }}
                >
                  {b.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <label className="block">
            <span
              className="mb-2 block text-[0.8rem] font-semibold tracking-[0.14em]"
              style={{ color: 'var(--ink-3)' }}
            >
              NOME
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              placeholder="Como o Romerio te chama"
              className="field h-[3.25rem] w-full px-4 py-3.5 text-[1rem]"
            />
          </label>
          <label className="block">
            <span
              className="mb-2 block text-[0.8rem] font-semibold tracking-[0.14em]"
              style={{ color: 'var(--ink-3)' }}
            >
              WHATSAPP
            </span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              autoComplete="tel"
              placeholder="(11) 90000-0000"
              className="field h-[3.25rem] w-full px-4 py-3.5 text-[1rem]"
            />
          </label>

          {error && (
            <p role="alert" className="text-[0.88rem]" style={{ color: 'var(--amber)' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="btn-primary mt-2 inline-flex h-[3.25rem] items-center justify-center px-8 py-4 text-[0.95rem] disabled:opacity-60"
          >
            {status === 'sending'
              ? 'Enviando…'
              : status === 'sent'
                ? 'Enviado — abra o WhatsApp'
                : 'Enviar e abrir o WhatsApp'}
          </button>
        </div>
      </form>
    </Shell>
  );
}

/* ---------------- cobertura + rodapé ---------------- */

export function Coverage() {
  return (
    <Shell id="cobertura">
      <H2>Onde o Romerio atende.</H2>
      <div className="mt-9 flex flex-wrap gap-2.5">
        {coverage.map((c) => (
          <span
            key={c}
            className="rounded-full px-4 py-2.5 text-[0.88rem]"
            style={{
              border: '1px solid var(--line)',
              color: 'var(--ink-2)',
              background: 'rgba(56,189,248,0.04)',
            }}
          >
            {c}
          </span>
        ))}
      </div>
      <p
        className="mt-8 max-w-[52ch] text-[0.95rem] leading-[1.62]"
        style={{ color: 'var(--ink-2)' }}
      >
        {site.hours}. {site.emergency}. Se a sua região não estiver na lista,
        pergunte mesmo assim — pode dar para encaixar.
      </p>
    </Shell>
  );
}

export function Footer() {
  return (
    <footer
      className="px-5 py-14 sm:px-8"
      style={{ borderTop: '1px solid var(--line)' }}
    >
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-2.5">
            <span style={{ color: 'var(--cyan)' }}><Snowflake className="h-6 w-6" /></span>
            <span className="text-lg font-bold tracking-[0.02em]">MOTA</span>
          </span>
          <p
            className="mt-4 max-w-[42ch] text-[0.88rem] leading-[1.6]"
            style={{ color: 'var(--ink-2)' }}
          >
            {site.owner} — venda, instalação, higienização e manutenção de
            ar-condicionado em {site.city} e região.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <a
            href={whatsappUrl('Olá Romerio! Vim pelo site.')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[1.15rem] font-semibold"
            style={{ color: 'var(--cyan)' }}
          >
            {site.phoneLabel}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="text-[0.88rem]"
            style={{ color: 'var(--ink-2)' }}
          >
            {site.email}
          </a>
          <span className="mt-2 text-[0.78rem]" style={{ color: 'var(--ink-3)' }}>
            © {new Date().getFullYear()} {site.companyFull}
          </span>
        </div>
      </div>
    </footer>
  );
}

export function FloatingCall() {
  return (
    <a
      href={whatsappUrl('Olá Romerio! Vim pelo site e preciso de um orçamento.')}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-primary fixed bottom-5 right-5 z-40 inline-flex h-[3.25rem] items-center gap-2.5 px-5 py-3.5 text-[0.88rem] shadow-lg sm:bottom-7 sm:right-7 sm:px-6"
    >
      <Snowflake className="h-4 w-4" />
      Falar agora
    </a>
  );
}
