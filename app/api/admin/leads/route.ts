import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getLeads, updateLeadStatus, deleteLead } from '@/lib/storage';

export async function GET() {
  if (!isAuthenticated()) {
    return NextResponse.json({ success: false, message: 'Não autorizado' }, { status: 401 });
  }

  const leads = getLeads();
  return NextResponse.json({ success: true, leads });
}

export async function PUT(req: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ success: false, message: 'Não autorizado' }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ success: false, message: 'ID e status são obrigatórios' }, { status: 400 });
    }

    const updated = updateLeadStatus(id, status);
    if (!updated) {
      return NextResponse.json({ success: false, message: 'Lead não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ success: false, message: 'Não autorizado' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID do lead é obrigatório' }, { status: 400 });
    }

    const deleted = deleteLead(id);
    if (!deleted) {
      return NextResponse.json({ success: false, message: 'Lead não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Lead removido com sucesso' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
