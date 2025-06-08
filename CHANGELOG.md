# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [rl-1.0] - 2025-06-08

### 🚀 Features

- **metrics:** adiciona suporte a métricas Prometheus ([c1fe15c](https://github.com/Mateus0808/url-shortener/commit/c1fe15c))
- **github actions:** adiciona integração contínua com lint e testes ([11b4c6f](https://github.com/Mateus0808/url-shortener/commit/11b4c6f))

### 🧪 Testes

- **sign-in:** adiciona teste de autenticação ([bbfd3e3](https://github.com/Mateus0808/url-shortener/commit/bbfd3e3))
- **husky:** adiciona verificação de pre-commit ([6980a34](https://github.com/Mateus0808/url-shortener/commit/6980a34))
- **user:** adiciona testes de criação e busca de usuário ([b720a65](https://github.com/Mateus0808/url-shortener/commit/b720a65), [45695a6](https://github.com/Mateus0808/url-shortener/commit/45695a6))
- **short-url:**
  - teste de criação ([1c1f905](https://github.com/Mateus0808/url-shortener/commit/1c1f905))
  - teste de deleção ([3d02f94](https://github.com/Mateus0808/url-shortener/commit/3d02f94))
  - teste de busca ([e1f755c](https://github.com/Mateus0808/url-shortener/commit/e1f755c))
  - teste de incremento de cliques ([6525179](https://github.com/Mateus0808/url-shortener/commit/6525179))
  - teste de listagem de URLs ([179eca3](https://github.com/Mateus0808/url-shortener/commit/179eca3))
  - teste de atualização de URLs ([f0ea740](https://github.com/Mateus0808/url-shortener/commit/f0ea740))
- **refatoração:** melhorias nos testes ([05bd2f0](https://github.com/Mateus0808/url-shortener/commit/05bd2f0))

### 🛠️ Infraestrutura

- **ci:** ajustes de versão do Node.js na pipeline ([f7b8f70](https://github.com/Mateus0808/url-shortener/commit/f7b8f70), [a480f65](https://github.com/Mateus0808/url-shortener/commit/a480f65))
- **docker:** adiciona configuração completa do ambiente Docker ([37148d6](https://github.com/Mateus0808/url-shortener/commit/37148d6))

### 🧹 Correções

- remove variáveis não utilizadas ([37a3803](https://github.com/Mateus0808/url-shortener/commit/37a3803))


## [rc-0.3.0] - 2025-06-07

### 🚀 Features

- **clicks:** implementa incremento de cliques ao acessar a URL encurtada ([0964c0f](https://github.com/Mateus0808/url-shortener/commit/0964c0f))


## [rc-0.2.0] - 2025-06-07

### 🚀 Features

- **short-url:** adiciona operações de usuário no encurtador de URL ([dbd8958](https://github.com/Mateus0808/url-shortener/commit/dbd8958))
- adiciona estratégia de autenticação ([5ca1155](https://github.com/Mateus0808/url-shortener/commit/5ca1155))
- adiciona relacionamento entre usuário e shortUrl ([d7c8202](https://github.com/Mateus0808/url-shortener/commit/d7c8202))
- adiciona múltiplas estratégias de autenticação ([84df96e](https://github.com/Mateus0808/url-shortener/commit/84df96e))

### 🐛 Fixes

- adiciona opção de guard para access token ([606b4e8](https://github.com/Mateus0808/url-shortener/commit/606b4e8))

### [rc-0.1.0] (2025-06-05)

### Features
- **login:** adiciona autenticação de usuário ([e1df899](https://github.com/Mateus0808/url-shortener/commit/e1df8999ea5a46fc69f0ad8b375444f2cf1007f0))
- **user:** adiciona módulo de usuários e erros personalizados ([cf04767](https://github.com/Mateus0808/url-shortener/commit/cf047671a6b84726be6b49c13fdddd2812804392))
- **user:** adiciona serviços de criação e consulta de usuários ([12f88ea](https://github.com/Mateus0808/url-shortener/commit/12f88ea18d5bc47b9f3e0f10b9525231b22a4a00))
- adiciona entidades principais para encurtamento de URL ([b9cea00](https://github.com/Mateus0808/url-shortener/commit/b9cea00ee935e6c6bb1a872f5671cd32bcd09d66))

### 🛠 Chore

- remove classe não utilizada ([8df2167](https://github.com/Mateus0808/url-shortener/commit/8df2167))
- configurações iniciais de banco de dados ([b46e217](https://github.com/Mateus0808/url-shortener/commit/b46e217))
- configurações iniciais de Docker ([f75cc18](https://github.com/Mateus0808/url-shortener/commit/f75cc18))
- adiciona suporte ao commitlint e husky ([7ba3e38](https://github.com/Mateus0808/url-shortener/commit/7ba3e38))
- configuração e estrutura inicial do projeto ([284a82d](https://github.com/Mateus0808/url-shortener/commit/284a82d))

### 📦 Outros

- commit inicial ([0a4ab0a](https://github.com/Mateus0808/url-shortener/commit/0a4ab0a))