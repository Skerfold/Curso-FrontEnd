// Verifique se o seu src/controllers/movementController.ts está assim:

import { NextRequest } from 'next/server';
import * as movementService from '@/services/movementService';
import { getAuth } from '@/lib/auth';

export const createMovement = async (req: NextRequest) => {
  try {
    const session = await getAuth(req);
    if (!session) {
      return { status: 401, body: { message: 'Não autorizado. Token inválido ou ausente.' } };
    }

    const body = await req.json();
    const { productId: product, type, quantity }: { productId: string; type: 'entrada' | 'saída'; quantity: number } = body;

    if (!product || !type || !quantity) {
      return { status: 400, body: { message: 'Campos obrigatórios: productId, type, quantity.' } };
    }
    
    const movementData: movementService.MovementData = {
      product,
      type,
      quantity,
      user: session.id,
    };

    const newMovement = await movementService.createMovement(movementData);
    // O controller retorna o status e o corpo para a ROTA manusear
    return { status: 201, body: newMovement };

  } catch (error: unknown) {
    if (error instanceof Error) {
        return { status: 400, body: { message: error.message } };
    }
    console.error(error);
    return { status: 500, body: { message: 'Erro interno ao registrar movimentação.' } };
  }
};