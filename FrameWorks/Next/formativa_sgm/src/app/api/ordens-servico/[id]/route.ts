import { NextRequest, NextResponse } from 'next/server';
import { getOrdemServicoById, updateOrdemServico, deleteOrdemServico } from '../../../../controllers/ordemServicoController';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    return getOrdemServicoById(params.id);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const data = await req.json();
    return updateOrdemServico(params.id, data);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    return deleteOrdemServico(params.id);
}
