import { NextRequest, NextResponse } from 'next/server';
import { getAllManutencoes, createManutencao } from '../../../controllers/manutencaoController';

export async function GET() {
    return getAllManutencoes();
}

export async function POST(req: NextRequest) {
    const data = await req.json();
    return createManutencao(data);
}
