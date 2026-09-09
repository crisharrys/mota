import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminPassword, createSessionToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json(
        { success: false, message: 'Senha é obrigatória.' },
        { status: 400 }
      );
    }

    const isValid = verifyAdminPassword(password);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: 'Senha incorreta.' },
        { status: 401 }
      );
    }

    const token = createSessionToken();

    const response = NextResponse.json({
      success: true,
      message: 'Login realizado com sucesso.',
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: 'mota_admin_session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Erro ao processar login.' },
      { status: 500 }
    );
  }
}
