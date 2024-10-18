# Marques Consult - GeoInsights

Este projeto é uma aplicação full stack que utiliza React.js no front-end e Node.js no back-end, com o Prisma ORM para gerenciamento de banco de dados.

## Tecnologias Utilizadas

### Front-end
- **React.js**: Framework JavaScript para a construção de interfaces de usuário interativas.

### Back-end
- **Node.js**: Ambiente de execução JavaScript no lado do servidor.
- **Zod**: Biblioteca de validação de dados para TypeScript e JavaScript, usada para validar as informações enviadas ao back-end.
- **Prisma ORM**: Ferramenta para mapeamento de banco de dados relacional (ORM - Object Relational Mapper), facilitando consultas e transações.

### Banco de Dados
- **Banco de Dados Relacional**: Integrado com o Prisma para simplificar o acesso aos dados.

## Pré-requisitos

Antes de rodar o projeto, é necessário ter instalado em sua máquina:

- Node.js (versão 20.0.0 ou superior)
- npm (ou yarn)
- Banco de dados relacional (ex: PostgreSQL, MySQL ou SQLite)

## Instalação

### Back-end

1. Clone o repositório `SSh` :
   ```bash
   git clone git@github.com:henriquesantosdev/geoInsights.git
   ```
   ou `HTTPS`
   ```bash
   git clone https://github.com/henriquesantosdev/geoInsights.git
   ```

2. Entre na pasta do back-end:
   ```bash
   cd geoInsightsgeoinsights/backend
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Configure as variáveis de ambiente no arquivo `.env`:
   ```bash
   DATABASE_URL="URL do seu banco de dados"
   ```
   Se estiver usando SQLite use `file:./dev.db`

5. Execute as migrações do Prisma para criar o esquema do banco de dados:
   ```bash
   npx prisma migrate dev
   ```

6. Para popular o banco de dados com dados iniciais, execute o seed:
   ```bash
   npm run seed
   ```

7. Inicie o servidor:
   ```bash
   npm run server
   ```

   O back-end estará rodando em `http://127.0.0.1:3333/api`.

### Front-end

1. Entre na pasta do front-end:
   ```bash
   cd geoInsights/frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o aplicativo React:
   ```bash
   npm run dev
   ```

   O front-end estará rodando em `http://localhost:5173/`.

## Uso

- Acesse o front-end no seu navegador em `http://localhost:5173/`
- O back-end estará disponível em `http://127.0.0.1:3333/api`

## Licença

Este projeto está licenciado sob a [Licença MIT](https://opensource.org/licenses/MIT).