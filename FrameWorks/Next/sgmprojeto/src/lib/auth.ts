// src/lib/auth.ts

import { SignJWT, jwtVerify, JWTPayload } from 'jose';
import { NextRequest } from 'next/server';

// Define a estrutura do nosso payload (o conteúdo do token)
// É uma extensão do JWTPayload padrão do 'jose'
export interface CustomJWTPayload extends JWTPayload {
  id: string;
  email: string;
  role: string;
}

// Chave secreta para assinar o token
const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

/**
 * Cria um novo token JWT com base nos dados do usuário.
 */
export const signToken = async (payload: { id: string, email: string, role: string }): Promise<string> => {
  const customPayload: CustomJWTPayload = {
    ...payload,
    iss: 'urn:sgm:issuer', // Opcional: emissor
    aud: 'urn:sgm:audience', // Opcional: audiência
  };

  return await new SignJWT(customPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d') // Token válido por 1 dia
    .sign(secretKey);
};

/**
 * Verifica a validade de um token e retorna seu payload se for válido.
 */
export const verifyToken = async (token: string): Promise<CustomJWTPayload | null> => {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    // Verificação de segurança para garantir que o payload tem o que esperamos
    if (payload && typeof payload.id === 'string' && typeof payload.email === 'string' && typeof payload.role === 'string') {
      return payload as CustomJWTPayload;
    }
    return null;
  } catch (error) {
    console.error('Token verification failed');
    return null;
  }
};

/**
 * Extrai o token de uma NextRequest, verifica e retorna o payload do usuário (sessão).
 */
export const getAuth = async (req: NextRequest): Promise<CustomJWTPayload | null> => {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.substring(7); // Remove "Bearer "
  return await verifyToken(token);
};