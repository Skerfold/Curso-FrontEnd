// src/app/layout.tsx

import type { Metadata } from 'next';
import { AuthProvider } from '@/lib/authContext'; // <-- 1. IMPORTE AQUI

export const metadata: Metadata = {
  title: 'Controle de Estoque',
  description: 'Sistema de Gerenciamento de Estoque',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        {/* 2. ENVOLVA O {children} AQUI */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}