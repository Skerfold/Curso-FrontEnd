// src/app/login/page.tsx

'use client'; // Essencial para componentes com interatividade e hooks

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext'; // Nosso hook de autenticação
import styles from './Login.module.scss'; // Arquivo de estilo que vamos criar

export default function LoginPage() {
  // --- Estados para os campos do formulário ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // --- Estados para controle da interface (UI) ---
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Hooks do Next.js e do nosso Contexto ---
  const router = useRouter();
  const { login } = useAuth(); // Pegamos a função de login do nosso AuthProvider!

  /**
   * Função executada quando o formulário é enviado.
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Impede o recarregamento padrão da página
    setLoading(true);   // Inicia o feedback visual de carregamento
    setError(null);     // Limpa erros anteriores

    try {
      // Faz a chamada para a nossa API de backend
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Pega a resposta da API em formato JSON
      const data = await response.json();

      // Se a resposta da API não for de sucesso (status 2xx), lança um erro
      if (!response.ok) {
        throw new Error(data.message || 'Falha ao tentar fazer login.');
      }

      // --- SUCESSO! ---
      // 'data' agora contém { user: {...}, token: "..." }
      
      // 1. Usa a função 'login' do nosso AuthContext para salvar o usuário e o token
      login(data.user, data.token);

      // 2. Redireciona o usuário para a página principal (Dashboard)
      router.push('/');

    } catch (err: unknown) {
      // Captura qualquer erro (da API ou de rede) e o exibe para o usuário
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro desconhecido.');
      }
    } finally {
      // Independentemente de sucesso ou erro, para o feedback de carregamento
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Login</h1>
        
        <div className={styles.inputGroup}>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        {/* Exibe a mensagem de erro, somente se ela existir */}
        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}