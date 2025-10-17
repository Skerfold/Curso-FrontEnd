// src/services/movementService.ts

import dbConnect from '@/lib/mongodb';
import Movement from '@/models/Movement';
import Product from '@/models/Product';
// O import do mongoose não é mais necessário para a transação
// import mongoose from 'mongoose';

// Interface para definir a estrutura dos dados de uma nova movimentação
export interface MovementData {
  product: string;
  type: 'entrada' | 'saída';
  quantity: number;
  user: string;
}

export const createMovement = async (data: MovementData) => {
  await dbConnect();

  // A LÓGICA DE TRANSAÇÃO FOI REMOVIDA DAQUI

  try {
    // 1. Encontra o produto
    const product = await Product.findById(data.product);
    if (!product) {
      throw new Error('Produto não encontrado.');
    }

    // 2. Atualiza a quantidade do produto
    if (data.type === 'saída') {
      if (product.quantity < data.quantity) {
        throw new Error('Estoque insuficiente para a saída.');
      }
      product.quantity -= data.quantity;
    } else { // entrada
      product.quantity += data.quantity;
    }

    // 3. Salva o produto atualizado
    await product.save();

    // 4. Cria o registro da movimentação
    const movement = new Movement({
      product: data.product,
      type: data.type,
      quantity: data.quantity,
      user: data.user,
    });
    
    // 5. Salva o registro da movimentação
    await movement.save();

    return movement;

  } catch (error) {
    // Se qualquer um dos passos acima falhar, o erro será lançado para o controller
    // Em um cenário real com alto volume, poderíamos ter inconsistência aqui,
    // mas para o nosso MVP, esta abordagem é segura e funcional.
    throw error;
  }
};