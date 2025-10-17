// src/services/userService.ts

import dbConnect from '@/lib/mongodb';
import User, { IUser } from '@/models/User';
import bcrypt from 'bcryptjs';
import { signToken, CustomJWTPayload } from '@/lib/auth';

// Tipo para os dados de registro
type RegisterUserData = Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>;

/**
 * Registra um novo usuário no banco de dados.
 */
export const registerUser = async (userData: RegisterUserData): Promise<IUser> => {
  await dbConnect();

  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error('Este e-mail já está cadastrado.');
  }

  const user = new User(userData);
  await user.save();

  // Garante que a senha não seja retornada na resposta
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

/**
 * Autentica um usuário. ESTA VERSÃO CONTÉM LOGS DE DEPURAÇÃO.
 */
export const loginUser = async (email: string, password: string): Promise<{ user: Omit<IUser, 'password'>; token: string }> => {
  await dbConnect();

  // Busca o usuário no banco e pede para incluir a senha (+password)
  const user = await User.findOne({ email }).select('+password');

  // --- INÍCIO DA DEPURAÇÃO ---
  console.log("\n\n--- [INICIANDO DEBUG DE LOGIN] ---");

  // 1. O usuário foi encontrado no banco de dados?
  if (!user) {
    console.log(`[ETAPA 1 - FALHA] Nenhum usuário encontrado com o email: ${email}`);
    console.log("--- [FIM DO DEBUG] ---\n\n");
    throw new Error('Credenciais inválidas.');
  }

  console.log(`[ETAPA 1 - SUCESSO] Usuário encontrado: ${user.name} (ID: ${user._id})`);

  // 2. Mostra as informações que serão comparadas
  console.log(`[ETAPA 2 - INFO] Senha que veio do formulário: "${password}"`);
  console.log(`[ETAPA 2 - INFO] Hash da senha que veio do banco: "${user.password}"`);

  // 3. Compara as senhas
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  // 4. Mostra o resultado da comparação
  if (isPasswordMatch) {
    console.log("[ETAPA 3 - RESULTADO] SUCESSO! As senhas correspondem.");
  } else {
    console.log("[ETAPA 3 - RESULTADO] FALHA! As senhas NÃO correspondem.");
  }
  
  console.log("--- [FIM DO DEBUG] ---\n\n");
  // --- FIM DA DEPURAÇÃO ---

  // Se a comparação falhar, lança o erro que você está vendo na tela
  if (!isPasswordMatch) {
    throw new Error('Credenciais inválidas.');
  }

  // Se a comparação for bem-sucedida, continua para criar o token
  const payload: CustomJWTPayload = {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  const token = await signToken(payload);

  const userObject = user.toObject();
  delete userObject.password;

  return { user: userObject, token };
};