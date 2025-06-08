<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>


## Decrição
A aplicação é uma API REST desenvolvida com NestJS e organizada em arquitetura vertical. Seu objetivo principal é permitir o encurtamento de URLs, com funcionalidades adicionais voltadas para controle de acesso, métricas e gerenciamento dos links gerados.

**Funcionalidades principais:**
**1. Cadastro e autenticação de usuários:**
* Utiliza JWT para autenticação.
* Usuários podem se registrar e fazer login para associar URLs encurtadas às suas contas.

**2. Encurtamento de URLs:**
* Geração de códigos curtos com até 6 caracteres.
* Suporte a URLs anônimas (sem usuário logado) e URLs associadas a usuários autenticados.
* Redirecionamento e contagem de acessos:
* Cada acesso à URL curta é redirecionado para a URL original.
* É contabilizado o número de cliques por URL.

**3. Gerenciamento de URLs:**
* Usuários autenticados podem listar, editar (URL original) e excluir logicamente suas URLs encurtadas.
* Suporte à paginação e ordenação na listagem de URLs, incluindo total de cliques.

**4. Métricas com Prometheus:**
**Integração com @willsoto/nestjs-prometheus para exposição de métricas padrão.**
Métricas customizadas, como:
* Total de URLs encurtadas.
* Total de cliques por URL.
* Número de redirecionamentos por status HTTP.
* Tempo médio de redirecionamento.

**2. Persistência com TypeORM:**
* Utiliza PostgreSQL como banco de dados.
* Entidades com soft delete para manter histórico e possibilitar recuperação futura.

## Tecnologias utilizadas:
* Backend: NestJS (com módulos organizados por domínio)
* Banco de Dados: PostgreSQL + TypeORM
* Autenticação: JWT
* Validação: class-validator + pipes personalizados
* Monitoramento: Prometheus (via @willsoto/nestjs-prometheus)
* Testes: Jest (com mocks e cobertura de serviços principais)

## 🟢 Rodando Localmente (sem Docker)
**1. Pré-requisitos**
* Node.js 22+
* PostgreSQL 18

**2. Instalaçaõ**
```bash
$ npm install
```

**3. Configurar as variáveis de ambiente**
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=short_url_db
DB_SYNC=true
DB_LOGGING=true

JWT_ACCESS_SECRET=
```

**4. Executar a aplicação**
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
* Accessar a aplicação em: ```http://localhost:3000```

**6. Test**
```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## 🐳 Rodando com Docker
**1. Pré-requisitos**
* Docker
* Docker Compose

**3. Configurar as variáveis de ambiente**
```
DB_HOST=db
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=short_url_db
DB_SYNC=true
DB_LOGGING=true

JWT_ACCESS_SECRET=
```

**2. Suba os serviços**
```docker compose up -d --build ```

**3. A aplicação ficará disponível em:** ```http://localhost:3000```

## License

Nest is [MIT licensed](LICENSE).
