// src/app/api/movements/route.ts

import { NextRequest, NextResponse } from 'next/server';
import * as movementController from '@/controllers/movementController';

/**
 * Rota para criar uma nova movimentação de estoque.
 * Esta função age como o "porteiro" da API.
 */
export async function POST(req: NextRequest) {
  // 1. Passa a requisição para o nosso controller, que contém a lógica de negócio.
  const { status, body } = await movementController.createMovement(req);

  // 2. Pega o status e o corpo retornados pelo controller...
  // 3. ...e os usa para construir uma resposta HTTP real com NextResponse.json().
  // É esta linha que estava faltando e que conserta o erro.
  return NextResponse.json(body, { status });
}