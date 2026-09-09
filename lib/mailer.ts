import nodemailer from 'nodemailer';
import { getSettings } from './storage';
import { Lead } from './types';

/*
  O e-mail usa fontes web-safe de propósito: cliente de e-mail não carrega
  webfont de forma confiável. O que viaja do site para cá é o vocabulário do
  painel — legenda serigrafada, fio de 1px, âmbar como único acento.
*/

const PANEL = '#f3eee4';
const GROUND = '#e3cfa8';
const EDGE = '#c3b79f';
const INK = '#17212e';
const INK2 = '#454f5b';
const INK3 = '#575f6b';
const ACCENT = '#c2410c';

function esc(v: unknown): string {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function row(label: string, value: string, isHtml = false): string {
  return `
    <tr>
      <td style="padding:11px 0;border-bottom:1px solid ${EDGE};vertical-align:top;width:34%;">
        <span style="font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:bold;letter-spacing:1.6px;text-transform:uppercase;color:${INK3};">${esc(label)}</span>
      </td>
      <td style="padding:11px 0;border-bottom:1px solid ${EDGE};vertical-align:top;">
        <span style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:${INK};">${isHtml ? value : esc(value)}</span>
      </td>
    </tr>`;
}

export async function sendLeadNotificationEmail(
  lead: Lead
): Promise<{ success: boolean; message?: string }> {
  try {
    const settings = getSettings();
    const { smtp } = settings;

    if (!smtp || !smtp.enabled || !smtp.host || !smtp.user || !smtp.pass) {
      return { success: false, message: 'SMTP desabilitado ou não configurado.' };
    }

    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: Number(smtp.port) || 587,
      secure: Boolean(smtp.secure),
      auth: { user: smtp.user, pass: smtp.pass },
    });

    const digits = String(lead.phone).replace(/\D/g, '');
    const waHref = `https://wa.me/55${digits}?text=${encodeURIComponent(
      `Olá ${lead.name}, tudo bem? Aqui é o Romerio da MOTA Ar-Condicionado. Recebi seu pedido de orçamento para ${lead.serviceType}.`
    )}`;

    const subject = `Novo lead: ${lead.name} — ${lead.serviceType}`;

    const html = `
<div style="background:${GROUND};padding:28px 16px;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;margin:0 auto;background:${PANEL};border:1px solid ${EDGE};border-radius:3px;">
    <tr>
      <td style="padding:18px 24px 14px;border-bottom:1px solid ${EDGE};">
        <span style="font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:${INK2};">MOTA · Novo contato pelo site</span>
      </td>
    </tr>
    <tr>
      <td style="padding:22px 24px 6px;">
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:24px;font-weight:bold;color:${INK};line-height:1.2;">${esc(lead.name)}</div>
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${INK2};margin-top:6px;">${esc(lead.serviceType)}</div>
      </td>
    </tr>
    <tr>
      <td style="padding:14px 24px 4px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          ${row('WhatsApp', `<a href="${waHref}" style="color:${ACCENT};font-weight:bold;text-decoration:none;">${esc(lead.phone)}</a>`, true)}
          ${lead.email ? row('E-mail', lead.email) : ''}
          ${lead.roomSize ? row('Ambiente', lead.roomSize) : ''}
          ${lead.preferredTime ? row('Horário', lead.preferredTime) : ''}
          ${row('Recebido', new Date(lead.createdAt).toLocaleString('pt-BR'))}
        </table>
      </td>
    </tr>
    ${
      lead.message
        ? `<tr>
      <td style="padding:16px 24px 0;">
        <span style="font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:bold;letter-spacing:1.6px;text-transform:uppercase;color:${INK3};">Mensagem</span>
        <div style="margin-top:8px;padding:14px;background:#ded5c1;border:1px solid ${EDGE};border-radius:2px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.55;color:${INK};white-space:pre-wrap;">${esc(lead.message)}</div>
      </td>
    </tr>`
        : ''
    }
    <tr>
      <td style="padding:22px 24px 26px;">
        <a href="${waHref}" style="display:inline-block;background:${ACCENT};color:#fff8f2;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;letter-spacing:1.4px;text-transform:uppercase;padding:14px 24px;border-radius:3px;text-decoration:none;">Responder no WhatsApp</a>
      </td>
    </tr>
    <tr>
      <td style="padding:12px 24px;border-top:1px solid ${EDGE};">
        <span style="font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:1.4px;text-transform:uppercase;color:${INK3};">Enviado pelo site MOTA Serviços de Ar-Condicionado</span>
      </td>
    </tr>
  </table>
</div>`;

    const info = await transporter.sendMail({
      from: `"${smtp.fromName || 'MOTA Ar-Condicionado'}" <${smtp.fromEmail || smtp.user}>`,
      to: smtp.notifyEmail || settings.email,
      subject,
      html,
    });

    return { success: true, message: `E-mail enviado (ID: ${info.messageId})` };
  } catch (error: any) {
    console.error('Erro ao enviar e-mail via SMTP:', error);
    return {
      success: false,
      message: error.message || 'Erro desconhecido ao enviar e-mail',
    };
  }
}

export async function testSmtpConnection(
  customConfig?: any
): Promise<{ success: boolean; message: string }> {
  try {
    const settings = getSettings();
    const config = customConfig || settings.smtp;

    if (!config.host || !config.user || !config.pass) {
      return {
        success: false,
        message: 'Dados de SMTP incompletos (host, usuário ou senha ausentes).',
      };
    }

    const transporter = nodemailer.createTransport({
      host: config.host,
      port: Number(config.port) || 587,
      secure: Boolean(config.secure),
      auth: { user: config.user, pass: config.pass },
    });

    await transporter.verify();

    if (config.notifyEmail) {
      await transporter.sendMail({
        from: `"${config.fromName || 'MOTA Ar-Condicionado'}" <${config.fromEmail || config.user}>`,
        to: config.notifyEmail,
        subject: 'Teste de conexão SMTP — MOTA Ar-Condicionado',
        html: `
<div style="background:${GROUND};padding:28px 16px;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:520px;margin:0 auto;background:${PANEL};border:1px solid ${EDGE};border-radius:3px;">
    <tr><td style="padding:18px 24px 14px;border-bottom:1px solid ${EDGE};">
      <span style="font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:${INK2};">MOTA · Teste de SMTP</span>
    </td></tr>
    <tr><td style="padding:22px 24px 24px;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:19px;font-weight:bold;color:${INK};">Conexão funcionando.</div>
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${INK2};margin-top:8px;line-height:1.55;">O servidor de e-mail está respondendo. Os leads do site chegam neste endereço.</div>
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:${INK3};margin-top:14px;">${new Date().toLocaleString('pt-BR')}</div>
    </td></tr>
  </table>
</div>`,
      });
    }

    return {
      success: true,
      message: 'Conexão e disparo de e-mail efetuados com sucesso!',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Falha ao autenticar no servidor SMTP.',
    };
  }
}
