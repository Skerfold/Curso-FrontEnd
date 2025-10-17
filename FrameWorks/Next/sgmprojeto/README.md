SGM - Sistema de Gerenciamento de Movimentações
Este projeto é uma solução full-stack desenvolvida como parte da Situação de Aprendizagem "Desenvolvimento de Soluções Corporativas Full-Stack". O sistema atende às necessidades do cliente fictício "Almoxarifado Central Ltda.", substituindo o controle de estoque manual por uma aplicação web moderna, segura e em tempo real.

Tabela de Conteúdos
Descrição do Projeto

Análise e Planejamento

Features Principais (MVP)

Tecnologias Utilizadas

Configuração e Instalação

Credenciais de Acesso (Teste)

Estrutura de Pastas

Autor

1. Descrição do Projeto
O Almoxarifado Central Ltda. enfrentava desafios significativos com seu controle de estoque baseado em planilhas, resultando em erros de contagem, falta de produtos em momentos críticos e processos de compra ineficientes.

O SGM resolve esses problemas oferecendo uma plataforma centralizada onde diferentes tipos de usuários podem interagir com o sistema de acordo com suas permissões, garantindo a integridade dos dados e fornecendo uma visão clara e atualizada do inventário.

2. Análise e Planejamento
Para atender aos requisitos do cliente, a seguinte análise foi realizada:

Diagrama de Classes
O sistema foi modelado com três entidades principais que se relacionam entre si:

User: Representa os usuários do sistema.

Atributos: name, email, password (hash), role (Gestor de Estoque ou Operador de Estoque).

Product: Representa os produtos no estoque.

Atributos: name, sku, quantity, minQuantity.

Movement: Registra cada transação de entrada ou saída de um produto.

Atributos: product (ref), user (ref), type (entrada ou saída), quantity, createdAt.

Diagrama de Casos de Uso
Ilustra as interações dos atores (Gestor e Operador) com as funcionalidades do sistema.

Atores:

Gestor de Estoque

Operador de Estoque

Casos de Uso:

Comum a Ambos: Fazer Login, Ver Lista de Produtos, Sair do Sistema.

Exclusivo do Gestor: Adicionar Novo Produto.

Comum a Ambos: Registrar Entrada de Produto, Registrar Saída de Produto.

3. Features Principais (MVP)
[x] Autenticação Segura: Sistema de login com senhas criptografadas (Bcrypt) e sessões gerenciadas por JSON Web Tokens (JWT).

[x] Controle de Acesso Baseado em Papéis (Roles):

O Gestor de Estoque tem acesso total, incluindo a criação de novos produtos.

O Operador de Estoque pode apenas visualizar produtos e registrar movimentações.

[x] CRUD de Produtos: Implementação das funcionalidades de Criar e Ler produtos. O Gestor pode adicionar novos itens ao estoque através de um formulário em modal.

[x] Registro de Movimentações de Estoque: Ambos os perfis podem registrar entradas e saídas de itens. O sistema atualiza a quantidade do produto em tempo real e impede saídas que deixariam o estoque negativo.

[x] Dashboard Intuitivo: Uma página principal que lista todos os produtos em uma tabela clara e organizada.

[x] Destaque Visual para Estoque Baixo: Produtos cuja quantidade atual está abaixo da quantidade mínima definida são destacados visualmente na tabela para facilitar a identificação e a tomada de decisão.

4. Tecnologias Utilizadas
Frontend:

Next.js 14 (com App Router)

React 18

TypeScript

SCSS Modules (para estilização)

Backend:

Next.js API Routes

Mongoose (para modelagem de dados)

Bcrypt.js (para hashing de senhas)

JOSE (para geração e verificação de JWT)

Banco de Dados:

MongoDB