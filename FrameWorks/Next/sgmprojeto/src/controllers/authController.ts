// src/controllers/authController.ts

import { NextRequest } from 'next/server';
import * as userService from '@/services/userService';

/**
 * Lida com a requisição de registro de um novo usuário.
 */
export const register = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password || !role) {
      return { status: 400, body: { message: 'Todos os campos são obrigatórios: nome, e-mail, senha e função.' } };
    }

    const newUser = await userService.registerUser(body);
    return { status: 201, body: newUser };

  } catch (error: unknown) {
    if (error instanceof Error && error.message.includes('e-mail já está cadastrado')) {
      return { status: 409, body: { message: error.message } };
    }

    console.error(error);
    return { status: 500, body: { message: 'Erro interno ao registrar usuário.' } };
  }
};

/**
 * Lida com a requisição de login de um usuário.
 */
export const login = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return { status: 400, body: { message: 'E-mail e senha são obrigatórios.' } };
        }

        const { user, token } = await userService.loginUser(email, password);
        // O cookie é opcional, mas uma boa prática para o futuro.
        // A resposta principal é o corpo JSON.
        return { status: 200, body: { user, token } };

    } catch (error: unknown) {
        if (error instanceof Error && error.message.includes('Credenciais inválidas')) {
            // Retorna 401 Unauthorized, que é o status correto para falha de login
            return { status: 401, body: { message: error.message } };
        }
        
        console.error(error);
        return { status: 500, body: { message: 'Erro interno ao fazer login.' } };
    }
};