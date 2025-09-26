import { NextRequest, NextResponse } from 'next/server';
import { getManutencaoById, updateManutencao, deleteManutencao } from '../../../../controllers/manutencaoController';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    return getManutencaoById(params.id);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const data = await req.json();
    return updateManutencao(params.id, data);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    return deleteManutencao(params.id);
}
