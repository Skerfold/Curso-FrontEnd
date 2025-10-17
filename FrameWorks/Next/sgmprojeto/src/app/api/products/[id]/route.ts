// src/app/api/products/[id]/route.ts

import { NextResponse, NextRequest } from 'next/server';
import * as productController from '@/controllers/productController';

// Interface para definir o formato do 'context' que o Next.js nos envia
interface IContext {
  params: {
    id: string; // O 'id' aqui corresponde ao nome da pasta '[id]'
  };
}

/**
 * Rota para: GET /api/products/[id]
 * Chama o controller para buscar um produto específico.
 */
export async function GET(req: NextRequest, context: IContext) {
  const { status, body } = await productController.getById(req, context);
  return NextResponse.json(body, { status });
}

/**
 * Rota para: PUT /api/products/[id]
 * Chama o controller para atualizar um produto específico.
 */
export async function PUT(req: NextRequest, context: IContext) {
  const { status, body } = await productController.update(req, context);
  return NextResponse.json(body, { status });
}

/**
 * Rota para: DELETE /api/products/[id]
 * Chama o controller para remover um produto específico.
 */
export async function DELETE(req: NextRequest, context: IContext) {
  const { status, body } = await productController.remove(req, context);
  return NextResponse.json(body, { status });
}