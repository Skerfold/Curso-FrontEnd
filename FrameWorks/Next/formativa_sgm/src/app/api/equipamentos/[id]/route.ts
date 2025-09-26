import { NextRequest, NextResponse } from 'next/server';
import { getEquipamentoById, updateEquipamento, deleteEquipamento } from '../../../../controllers/equipamentoController';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    return getEquipamentoById(params.id);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const data = await req.json();
    return updateEquipamento(params.id, data);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    return deleteEquipamento(params.id);
}
