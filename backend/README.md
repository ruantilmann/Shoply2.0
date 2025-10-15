# Shoply 2.0 - Backend

Este é o backend da aplicação Shoply 2.0, uma API RESTful desenvolvida em Node.js com Fastify e TypeScript.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Fastify**: Framework web para Node.js, focado em performance.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Prisma**: ORM para Node.js e TypeScript, utilizado para interagir com o banco de dados.
- **PostgreSQL**: Banco de dados relacional.
- **Better-Auth**: Biblioteca para autenticação de usuários.
- **Dotenv**: Para gerenciamento de variáveis de ambiente.
- **TSX**: Para executar scripts TypeScript.

## Primeiros Passos

Siga as instruções abaixo para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

- Node.js (versão 20.x ou superior)
- pnpm (ou npm/yarn)
- Docker (opcional, para rodar o PostgreSQL)

### Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/shoply-2.0.git
   cd shoply-2.0/backend
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**

   Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

   ```env
   DATABASE_URL="postgresql://{user}:{password}@{localhost}:5432/{database}?schema=public"
   BETTER_AUTH_SECRET="BETTER_AUTH_SECRET"
   BETTER_AUTH_URL="http://localhost:${PORT}" # Base URL of your app
   PORT="3000"
   GOOGLE_CLIENT_ID="GOOGLE_CLIENT_ID"
   GOOGLE_CLIENT_SECRET="GOOGLE_CLIENT_SECRET"
   ```

4. **Gerar prismaClient**

   ```bash
   npx prisma generate
   ```
5. **Execute as migrações do banco de dados:**

   ```bash
   npx prisma migrate dev
   ```

6. **Inicie o servidor de desenvolvimento:**

   ```bash
   pnpm run start:dev
   ```

O servidor estará disponível em `http://localhost:3000`.

## Documentação da API (Swagger)

A documentação da API é gerada automaticamente com o Swagger e está disponível em:

[http://localhost:3000/documentation](http://localhost:3000/documentation)


## Endpoints da API

### Autenticação

- `POST /api/users/register`: Cria um novo usuário.

  **Corpo da Requisição:**

  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "Nome do Usuário",
    "image": "url_da_imagem.jpg"
  }
  ```

  **Resposta de Sucesso (201):**

  ```json
  {
    "success": true,
    "message": "Usuário criado com sucesso",
    "data": {
      "id": "...",
      "email": "user@example.com",
      "name": "Nome do Usuário",
      "image": "url_da_imagem.jpg",
      "createdAt": "..."
    }
  }
  ```

## Esquema do Banco de Dados

O esquema do banco de dados é definido no arquivo `prisma/schema.prisma` e inclui as seguintes tabelas:

- `User`: Armazena as informações dos usuários.
- `Session`: Armazena as sessões dos usuários.
- `Account`: Armazena informações de contas de provedores de autenticação (como o Google).
- `Verification`: Armazena tokens de verificação.

## Estrutura do Projeto

```
backend/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   │   └── user.controller.ts
│   ├── lib/
│   │   ├── auth.ts
│   │   └── prisma.ts
│   ├── routes/
│   │   └── user.routes.ts
│   ├── services/
│   │   └── user.service.ts
│   └── server.ts
├── .env
├── package.json
└── tsconfig.json
```

- **`prisma/`**: Contém o esquema do banco de dados e as migrações.
- **`src/`**: Contém o código-fonte da aplicação.
- **`src/controllers/`**: Controladores que lidam com as requisições e respostas.
- **`src/lib/`**: Configurações do Prisma e da autenticação.
- **`src/routes/`**: Definição das rotas da API.
- **`src/services/`**: Lógica de negócio da aplicação.
- **`src/server.ts`**: Ponto de entrada da aplicação, onde o servidor Fastify é configurado e iniciado.
