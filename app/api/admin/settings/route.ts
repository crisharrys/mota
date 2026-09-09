import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated, hashPassword } from '@/lib/auth';
import { getSettings, saveSettings } from '@/lib/storage';

export async function GET() {
  if (!isAuthenticated()) {
    return NextResponse.json({ success: false, message: 'Não autorizado' }, { status: 401 });
  }

  const settings = getSettings();
  // Strip sensitive password hash before sending to client
  const { adminPasswordHash, ...safeSettings } = settings;

  return NextResponse.json({ success: true, settings: safeSettings });
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ success: false, message: 'Não autorizado' }, { status: 401 });
  }

  try {
    const body = await req.json();

    // If changing password
    const updateData: any = { ...body };
    if (body.newPassword && body.newPassword.trim().length >= 6) {
      updateData.adminPasswordHash = hashPassword(body.newPassword.trim());
      delete updateData.newPassword;
    }

    const saved = saveSettings(updateData);
    const { adminPasswordHash, ...safeSettings } = saved;

    return NextResponse.json({
      success: true,
      message: 'Configurações atualizadas com sucesso!',
      settings: safeSettings,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Erro ao salvar configurações' },
      { status: 500 }
    );
  }
}
