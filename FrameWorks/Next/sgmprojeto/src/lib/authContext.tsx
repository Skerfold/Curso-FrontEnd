// src/lib/authContext.tsx

'use client'; // MUITO IMPORTANTE: Indica que este é um Componente de Cliente

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// 1. Define o formato dos dados do nosso usuário
interface IUser {
  id: string;
  name: string;
  email: string;
  role: 'Gestor de Estoque' | 'Operador de Estoque';
}

// 2. Define o formato do nosso contexto de autenticação
interface IAuthContext {
  isAuthenticated: boolean;
  user: IUser | null;
  token: string | null;
  login: (userData: IUser, token: string) => void;
  logout: () => void;
}

// 3. Cria o Contexto com um valor inicial padrão
const AuthContext = createContext<IAuthContext | undefined>(undefined);

// 4. Cria o componente Provedor (Provider)
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // Este efeito roda quando o componente é montado pela primeira vez
  useEffect(() => {
    // Tenta carregar o token do armazenamento local (para manter o usuário logado)
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: IUser, token: string) => {
    // Armazena no estado
    setUser(userData);
    setToken(token);
    // Armazena no localStorage para persistir a sessão
    localStorage.setItem('authUser', JSON.stringify(userData));
    localStorage.setItem('authToken', token);
  };

  const logout = () => {
    // Limpa o estado
    setUser(null);
    setToken(null);
    // Limpa o localStorage
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
    // Redireciona para a página de login
    router.push('/login');
  };

  const value = {
    isAuthenticated: !!token,
    user,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 5. Cria um Hook customizado para facilitar o uso do contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};