import { NextRequest, NextResponse } from 'next/server';
import { getAllOrdensServico, createOrdemServico } from '../../../controllers/ordemServicoController';

export async function GET() {
    return getAllOrdensServico();
}

export async function POST(req: NextRequest) {
    const data = await req.json();
    return createOrdemServico(data);
}
