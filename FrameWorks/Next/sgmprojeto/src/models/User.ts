// src/models/User.ts

import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// 1. Interface (para o TypeScript)
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: 'Gestor de Estoque' | 'Operador de Estoque';
}

// 2. Schema (para o Mongoose e MongoDB)
const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'O nome é obrigatório.'],
  },
  email: {
    type: String,
    required: [true, 'O e-mail é obrigatório.'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'A senha é obrigatória.'],
    select: false,
  },
  role: {
    type: String,
    required: true,
    enum: ['Gestor de Estoque', 'Operador de Estoque'],
    default: 'Operador de Estoque',
  },
}, {
  timestamps: true
});

// 3. Hook (Middleware) do Mongoose para criptografar a senha
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    // --- CORREÇÃO APLICADA AQUI ---
    // Verificamos se o 'error' é uma instância de Error antes de passá-lo para 'next'.
    // Isso é muito mais seguro do que usar 'any'.
    if (error instanceof Error) {
      return next(error);
    }
    // Caso algo inesperado que não seja um Error seja capturado, criamos um novo Error.
    return next(new Error('Erro inesperado ao criptografar a senha.'));
  }
});

// 4. Exportação do Model
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);