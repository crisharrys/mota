import nodemailer from 'nodemailer';
import { getSettings } from './storage';
import { Lead } from './types';

export async function sendLeadNotificationEmail(lead: Lead): Promise<{ success: boolean; message?: string }> {
  try {
    const settings = getSettings();
    const { smtp } = settings;

    if (!smtp || !smtp.enabled || !smtp.host || !smtp.user || !smtp.pass) {
      // SMTP not enabled or incomplete
      return { success: false, message: 'SMTP desabilitado ou não configurado.' };
    }

    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: Number(smtp.port) || 587,
      secure: Boolean(smtp.secure),
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
    });

    const subject = `❄️ Novo Lead Recebido: ${lead.name} - ${lead.serviceType}`;
    const html = `
      <div style="font-family: Arial, sans-serif; background-color: #041326; color: #f8fafc; padding: 25px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #38bdf8;">
        <div style="text-align: center; border-bottom: 1px solid rgba(56,189,248,0.2); padding-bottom: 15px; margin-bottom: 20px;">
          <h1 style="color: #38bdf8; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 1px;">Mota Serviços de Ar-Condicionado</h1>
          <p style="color: #94a3b8; margin: 5px 0 0 0; font-size: 14px;">Notificação de Novo Contato no Site</p>
        </div>

        <div style="background: rgba(8, 33, 66, 0.7); padding: 20px; border-radius: 8px; border: 1px solid rgba(56,189,248,0.15);">
          <p style="margin: 0 0 10px 0;"><strong style="color: #7dd3fc;">Nome do Cliente:</strong> ${lead.name}</p>
          <p style="margin: 0 0 10px 0;"><strong style="color: #7dd3fc;">WhatsApp / Telefone:</strong> <a href="https://wa.me/55${lead.phone.replace(/\D/g, '')}" style="color: #25D366; text-decoration: none; font-weight: bold;">${lead.phone} (Chamar no WhatsApp)</a></p>
          ${lead.email ? `<p style="margin: 0 0 10px 0;"><strong style="color: #7dd3fc;">E-mail:</strong> ${lead.email}</p>` : ''}
          <p style="margin: 0 0 10px 0;"><strong style="color: #7dd3fc;">Serviço Desejado:</strong> ${lead.serviceType}</p>
          ${lead.roomSize ? `<p style="margin: 0 0 10px 0;"><strong style="color: #7dd3fc;">Ambiente / Metragem:</strong> ${lead.roomSize}</p>` : ''}
          ${lead.preferredTime ? `<p style="margin: 0 0 10px 0;"><strong style="color: #7dd3fc;">Horário Preferencial:</strong> ${lead.preferredTime}</p>` : ''}
          
          <div style="margin-top: 15px; padding-top: 15px; border-top: 1px dashed rgba(56,189,248,0.2);">
            <strong style="color: #7dd3fc;">Mensagem / Detalhes:</strong>
            <p style="background: #020914; padding: 12px; border-radius: 6px; color: #e2e8f0; margin-top: 8px; white-space: pre-wrap;">${lead.message || 'Sem mensagem adicional.'}</p>
          </div>
        </div>

        <div style="text-align: center; margin-top: 25px;">
          <a href="https://wa.me/55${lead.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá ${lead.name}, tudo bem? Aqui é o Romero da Mota Ar-Condicionado! Recebi seu pedido de orçamento para ${lead.serviceType}.`)}" style="background-color: #25D366; color: white; padding: 12px 25px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
            Responder no WhatsApp
          </a>
        </div>

        <div style="text-align: center; margin-top: 25px; font-size: 12px; color: #64748b;">
          Enviado automaticamente pelo site oficial Mota Serviços de Ar-Condicionado.
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"${smtp.fromName || 'Mota Climatização'}" <${smtp.fromEmail || smtp.user}>`,
      to: smtp.notifyEmail || settings.email,
      subject,
      html,
    });

    return { success: true, message: `E-mail enviado com sucesso (ID: ${info.messageId})` };
  } catch (error: any) {
    console.error('Erro ao enviar e-mail via SMTP:', error);
    return { success: false, message: error.message || 'Erro desconhecido ao enviar e-mail' };
  }
}

export async function testSmtpConnection(customConfig?: any): Promise<{ success: boolean; message: string }> {
  try {
    const settings = getSettings();
    const config = customConfig || settings.smtp;

    if (!config.host || !config.user || !config.pass) {
      return { success: false, message: 'Dados de SMTP incompletos (host, usuário ou senha ausentes).' };
    }

    const transporter = nodemailer.createTransport({
      host: config.host,
      port: Number(config.port) || 587,
      secure: Boolean(config.secure),
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });

    // Verify connection configuration
    await transporter.verify();

    // Optionally send test email
    if (config.notifyEmail) {
      await transporter.sendMail({
        from: `"${config.fromName || 'Mota Teste'}" <${config.fromEmail || config.user}>`,
        to: config.notifyEmail,
        subject: '❄️ Teste de Conexão SMTP - Mota Ar-Condicionado',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background: #082142; color: white; border-radius: 8px;">
            <h2 style="color: #38bdf8;">Conexão SMTP Configurada com Sucesso! ❄️</h2>
            <p>Seu servidor SMTP está comunicando perfeitamente com a plataforma Mota Ar-Condicionado.</p>
            <p>Data do teste: ${new Date().toLocaleString('pt-BR')}</p>
          </div>
        `,
      });
    }

    return { success: true, message: 'Conexão e disparo de e-mail efetuados com sucesso!' };
  } catch (error: any) {
    return { success: false, message: error.message || 'Falha ao autenticar no servidor SMTP.' };
  }
}
