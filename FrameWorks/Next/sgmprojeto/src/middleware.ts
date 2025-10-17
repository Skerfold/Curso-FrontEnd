// src/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

/**
 * Esta é a função principal do middleware.
 * Ela será executada para cada requisição que corresponder ao 'matcher' abaixo.
 */
export async function middleware(req: NextRequest) {
  // 1. Extrai o token do cabeçalho 'Authorization'
  // O formato padrão é "Bearer eyJhbGciOiJIUzI1NiIsIn..."
  const token = req.headers.get('authorization')?.split(' ')[1];

  // 2. Se não houver token, barra a requisição imediatamente
  if (!token) {
    return new NextResponse(
      JSON.stringify({ message: 'Autenticação necessária. Token não fornecido.' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // 3. Tenta verificar o token usando nossa função 'verifyToken'
  const payload = await verifyToken(token);

  // 4. Se a verificação falhar (token inválido, expirado, etc.), barra a requisição
  if (!payload) {
    return new NextResponse(
      JSON.stringify({ message: 'Token inválido ou expirado.' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // 5. Se o token for válido, deixa a requisição prosseguir.
  // (Opcional, mas boa prática) Podemos anexar os dados do usuário nos cabeçalhos
  // para que a rota final possa acessá-los sem ter que verificar o token novamente.
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('X-User-Payload', JSON.stringify(payload));

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

/**
 * A configuração do matcher define EM QUAIS rotas este middleware deve ser executado.
 * Isso é crucial para a performance e para evitar bloqueios em rotas públicas.
 */
export const config = {
  matcher: [
    // Adicione aqui todas as rotas que você quer proteger
    '/api/products/:path*', // Protege todas as sub-rotas de /api/products
    '/api/movements/:path*', // <-- ADICIONE ESTA LINHA
    // '/api/movements/:path*', // Quando criarmos as rotas de movimento, adicionaremos aqui
  ],
};

