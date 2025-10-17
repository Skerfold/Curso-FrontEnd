# SGM - Sistema de Controle de Estoque (MVP)

## Descrição
Sistema de Controle de Estoque para "Almoxarifado Central Ltda." que substitui planilhas por uma aplicação web moderna. Permite gerenciamento de produtos, controle de movimentações e relatórios básicos.

## Funcionalidades
- **Gestor de Estoque**: CRUD completo de produtos, visualização de relatórios.
- **Operador de Estoque**: Registro de entradas e saídas de produtos.
- **Dashboard**: Visão geral com produtos mais movimentados e valor total do estoque.
- **Autenticação**: Login seguro com JWT e roles (gestor/operador).

## Requisitos Essenciais (MVP)
- CRUD de Produtos (nome, SKU, quantidade mínima, quantidade atual).
- Registro de Movimentações (entrada/saída, quantidade, data, operador).
- Destaque visual para produtos abaixo da quantidade mínima.
- Dashboard simples com métricas.

## Instalação e Execução

1. **Clone o repositório** (se aplicável) e navegue para o diretório do projeto.

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   - Copie o arquivo `.env.local` e atualize:
     ```
     MONGODB_URI="sua_string_de_conexao_mongodb"
     JWT_SECRET="uma_chave_secreta_segura"
     NEXT_PUBLIC_API_BASE="/api"
     ```

4. **Execute o seed para criar usuário admin**:
   ```bash
   npm run seed
   ```
   - Usuário padrão: `admin@example.com` / `password123` (role: gestor)

5. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

6. **Acesse a aplicação**:
   - Abra [http://localhost:3000](http://localhost:3000) no navegador.
   - Faça login com o usuário admin ou registre um novo usuário.

## Endpoints da API
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login
- `GET /api/products` - Listar produtos
- `POST /api/products` - Criar produto (gestor)
- `PUT /api/products/[id]` - Atualizar produto (gestor)
- `DELETE /api/products/[id]` - Deletar produto (gestor)
- `GET /api/movements` - Listar movimentações
- `POST /api/movements` - Registrar movimentação

## Estrutura do Projeto
- `src/app/` - Páginas Next.js (App Router)
- `src/components/` - Componentes React
- `src/lib/` - Utilitários (auth, db, context)
- `src/models/` - Modelos Mongoose
- `src/controllers/` - Controladores de API
- `src/services/` - Serviços de negócio

## Tecnologias Utilizadas
- **Frontend**: Next.js 15, React 19, SCSS
- **Backend**: Next.js API Routes, MongoDB, Mongoose
- **Autenticação**: JWT, bcryptjs
- **Estilização**: SCSS

## Testes e Validações
- Registrar/login com roles diferentes.
- CRUD de produtos (apenas gestor).
- Registrar movimentações (atualiza quantidade automaticamente).
- Verificar destaque de produtos com estoque baixo.
- Dashboard com métricas corretas.

## Próximos Passos (Bônus)
- Implementar valor unitário para produtos e cálculo de valor total.
- Adicionar filtros e busca em listas.
- Notificações para produtos com estoque baixo.
- Exportar relatórios em PDF/Excel.
