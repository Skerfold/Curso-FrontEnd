// src/models/Movement.ts

import mongoose, { Document, Schema, model, Model } from 'mongoose';

export interface IMovement extends Document {
  product: mongoose.Schema.Types.ObjectId;
  // V---- CORREÇÃO 1: Mudamos de 'operator' para 'user' ----V
  // Agora o nome do campo bate com o que o resto da aplicação usa.
  user: mongoose.Schema.Types.ObjectId; 
  // V---- CORREÇÃO 2: Adicionamos 'entrada' e 'saída' à lista de valores permitidos ----V
  type: 'entrada' | 'saída';
  quantity: number;
  createdAt: Date;
}

const MovementSchema: Schema<IMovement> = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  user: { // <-- O nome aqui também foi corrigido de 'operator' para 'user'
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['entrada', 'saída'], // <-- A lista de valores permitidos agora está correta
  },
  quantity: {
    type: Number,
    required: true,
    min: 1, // Movimentações devem ser de pelo menos 1 item
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Evita a recriação do modelo se ele já existir
const Movement: Model<IMovement> = mongoose.models.Movement || model<IMovement>('Movement', MovementSchema);

export default Movement;