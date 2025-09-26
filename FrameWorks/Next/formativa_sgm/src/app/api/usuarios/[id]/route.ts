import { NextRequest, NextResponse } from 'next/server';
import { getUsuarioById, updateUsuario, deleteUsuario } from '../../../../controllers/usuarioController';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    return getUsuarioById(params.id);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const data = await req.json();
    return updateUsuario(params.id, data);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    return deleteUsuario(params.id);
}
