import { NextRequest, NextResponse } from 'next/server';
import { getAllUsuarios, createUsuario } from '../../../controllers/usuarioController';

export async function GET() {
    return getAllUsuarios();
}

export async function POST(req: NextRequest) {
    const data = await req.json();
    return createUsuario(data);
}
