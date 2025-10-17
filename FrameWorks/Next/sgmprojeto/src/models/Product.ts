// src/models/Product.ts

import mongoose, { Schema, Document } from 'mongoose';

// 1. Interface (para o TypeScript)
// Descreve como um documento de Produto deve se parecer no nosso código.
export interface IProduct extends Document {
  name: string;
  sku: string; // SKU = Stock Keeping Unit (Código de Controle de Estoque)
  minQuantity: number;
  quantity: number;
}

// 2. Schema (para o Mongoose e MongoDB)
// Define a estrutura e as regras do documento no banco de dados.
const ProductSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'O nome do produto é obrigatório.'],
    trim: true // Remove espaços em branco do início и do fim
  },
  sku: {
    type: String,
    required: [true, 'O SKU é obrigatório.'],
    unique: true, // Garante que não haverá dois produtos com o mesmo SKU
    trim: true
  },
  minQuantity: {
    type: Number,
    required: [true, 'A quantidade mínima é obrigatória.'],
    default: 0, // Se não for fornecida, o valor padrão será 0
    min: [0, 'A quantidade mínima não pode ser negativa.']
  },
  quantity: {
    type: Number,
    required: [true, 'A quantidade atual é obrigatória.'],
    default: 0,
    min: [0, 'A quantidade atual не pode ser negativa.']
  },
}, {
  // 3. Opções do Schema
  timestamps: true // Adiciona automaticamente os campos `createdAt` e `updatedAt`
});

// 4. Exportação do Model
// Este padrão evita que o model seja recompilado em cada recarregamento do Next.js em desenvolvimento.
export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);