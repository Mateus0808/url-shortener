# 🔗 URL Shortener

Um encurtador de URLs desenvolvido com **NestJS** com suporte a autenticação de usuários, contagem de cliques, e funcionalidades CRUD para links encurtados.

## 🚀 Tecnologias

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Jest](https://jestjs.io/) para testes
- [ESLint](https://eslint.org/) e [Prettier](https://prettier.io/) para lint e formatação
- GitHub Actions para CI

---

## 📦 Como executar localmente

### Pré-requisitos

- Node.js 20+
- Docker e Docker Compose
- Git

### Passos

```bash
# Clone o repositório
git clone https://github.com/Mateus0808/url-shortener.git
cd url-shortener

# Instale as dependências
npm run install

# Copie o arquivo de ambiente
cp .env.example .env

# Suba os containers do banco de dados
docker-compose up -d

# Inicie o projeto
npm run start:dev
