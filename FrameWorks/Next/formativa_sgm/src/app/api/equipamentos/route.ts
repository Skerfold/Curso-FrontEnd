import { NextRequest, NextResponse } from 'next/server';
import { getAllEquipamentos, createEquipamento } from '../../../controllers/equipamentoController';

export async function GET() {
    return getAllEquipamentos();
}

export async function POST(req: NextRequest) {
    const data = await req.json();
    return createEquipamento(data);
}
