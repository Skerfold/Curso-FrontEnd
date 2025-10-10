// Página responsável pela interação do usuário
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState(""); // Campo para digitar o username
  const [password, setPassword] = useState(""); // Campo para digitar a senha
  const [error, setError] = useState(""); // Mensagem de erro caso digite alguma coisa errada

  const router = useRouter(); // Rotas de navegação

  // Método para enviar o login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita o recarregamento da página
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      // Analisar a resposta do fetch
      const data = await response.json();
      if (data.success) {
        // Armazenar as informações do usuário no LocalStorage
        localStorage.setItem("token", data.token); // Armazena o token
        localStorage.setItem("userRole", data.usuario.tipo); // Armazena a função do usuário
        router.push("/dashboard");
      } else {
        setError(data.error || "Falha de login");
      }
    } catch (error) {
      console.error("Login Failed: ", error);
      setError("Erro de Servidor");
    }
  };
  // ReactDOM
  return (
    <div className="center">
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="username">
          <label htmlFor="username">UserName</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="password">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
