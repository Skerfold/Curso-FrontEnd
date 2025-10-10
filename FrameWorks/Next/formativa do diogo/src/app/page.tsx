// Direcionar para a página de login 

"use-client"; 

export default function Home() { 
  return (
    <div>
      <h1>Bem-vindo ao sistema de gestão de manutenção</h1>
      <p>Por favor, faça login para continuar.</p>
      <a href="/login">Ir para o login</a>
    </div>
  );
}