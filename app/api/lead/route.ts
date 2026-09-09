import { NextRequest, NextResponse } from 'next/server';
import { addLead } from '@/lib/storage';
import { sendLeadNotificationEmail } from '@/lib/mailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.phone) {
      return NextResponse.json(
        { success: false, message: 'Nome e telefone são obrigatórios.' },
        { status: 400 }
      );
    }

    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';

    // 1. Save lead to local JSON storage
    const newLead = addLead({
      name: String(body.name).trim(),
      phone: String(body.phone).trim(),
      email: body.email ? String(body.email).trim() : undefined,
      serviceType: body.serviceType || 'Instalação de Ar-Condicionado',
      roomSize: body.roomSize || '',
      preferredTime: body.preferredTime || 'Qualquer Horário',
      message: body.message || '',
      ip: String(ip),
    });

    // 2. Trigger SMTP notification (async, non-blocking failure)
    let emailStatus: { success: boolean; message?: string } = { success: false, message: '' };
    try {
      emailStatus = await sendLeadNotificationEmail(newLead);
    } catch (e: any) {
      console.error('Falha no envio de e-mail:', e);
    }

    return NextResponse.json({
      success: true,
      message: 'Lead recebido com sucesso!',
      leadId: newLead.id,
      emailSent: emailStatus.success,
    });
  } catch (error: any) {
    console.error('Erro na rota /api/lead:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Erro interno no servidor.' },
      { status: 500 }
    );
  }
}
