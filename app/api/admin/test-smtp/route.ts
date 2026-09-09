import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { testSmtpConnection } from '@/lib/mailer';

export async function POST(req: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ success: false, message: 'Não autorizado' }, { status: 401 });
  }

  try {
    const customConfig = await req.json();
    const result = await testSmtpConnection(customConfig);

    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Falha ao testar conexão SMTP' },
      { status: 500 }
    );
  }
}
