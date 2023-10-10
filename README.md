# Project Title

A brief description of what this project does and who it's for

# Booklet API (NestJS)

Esta é uma API construída usando NestJS que oferece funcionalidades relacionadas a usuários, autores, administradores, livros e credenciais. O banco de dados usado é o PostgreSQL, que está sendo executado em um contêiner Docker.

## Pré-requisitos

Certifique-se de ter o Docker instalado no seu sistema antes de prosseguir.

## Instalação e Configuração

1. Clone este repositório em sua máquina local:
   ```
   git clone https://github.com/seu-usuario/booklet-api.git
   cd booklet-api
   ```

2. Execute o banco de dados PostgreSQL no Docker:
   ```
   docker run -d -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=booklet -p 5432:5432 postgres
   ```

3. Instale as dependências do projeto:
   ```
   npm install
   ```

4. Configure as credenciais do banco de dados no arquivo `src/app.module.ts`:
   ```typescript
   TypeOrmModule.forRoot({
     type: 'postgres',
     host: 'localhost',
     port: 5432,
     username: 'postgres',
     password: 'postgres',
     database: 'booklet',
     synchronize: true,
     logging: true,
     autoLoadEntities: true,
   }),
   ```

## Executando a API

Para iniciar a API, execute o seguinte comando na raiz do projeto:
```
npm run start
```

A API será iniciada e estará acessível em `http://localhost:3000`.

# Booklet API - Objetivo e Endpoints

A Booklet API é um projeto que visa fornecer funcionalidades essenciais para autores, usuários e proprietários de lojas. O MVP (Minimum Viable Product) inclui operações básicas de adição, edição e exclusão de livros, bem como a capacidade de os usuários lerem livros. Além disso, há uma funcionalidade para os proprietários de lojas removerem livros de sua loja e aceitarem livros em sua loja.

## Funcionalidades Implementadas

- **Autenticação de Usuários**
- **Restrições de Acesso Baseadas em Papéis (Roles)**

Lembrando que a parte do MVP está completa, focando na adição, edição e exclusão de livros, bem como na funcionalidade de os usuários lerem livros. A parte dos Recursos Avançados não foi finalizada, incluindo integrações com a aplicação frontend.


## Endpoints do MVP

### Auth

- **POST** `/auth/login`
  - Rota para fazer login
  - Método: `POST`
  - Corpo: `SignInDTO`
  - Permissões: Público

### Authors

- **GET** `/authors`
  - Rota para listar todos os autores
  - Método: `GET`

- **POST** `/authors`
  - Rota para criar um novo autor
  - Método: `POST`
  - Corpo: `CreateAuthorDTO`
  - Permissões: Público

- **GET** `/authors/:id`
  - Rota para obter detalhes de um autor específico
  - Método: `GET`
  - Parâmetros: `id`

- **PATCH** `/authors/:id`
  - Rota para atualizar um autor
  - Método: `PATCH`
  - Parâmetros: `id`
  - Corpo: `EditAuthorDTO`

- **DELETE** `/authors/:id`
  - Rota para excluir um autor
  - Método: `DELETE`
  - Parâmetros: `id`

### Books

- **GET** `/books`
  - Rota para listar todos os livros (somente administradores)
  - Método: `GET`
  - Permissões: Administrador

- **POST** `/books`
  - Rota para adicionar um novo livro (somente autores)
  - Método: `POST`
  - Corpo: `AddBookDTO`
  - Permissões: Autor

- **GET** `/books/mybooks`
  - Rota para listar os livros de um autor
  - Método: `GET`
  - Permissões: Autor

- **GET** `/books/list`
  - Rota para listar os livros aceitos (usuários)
  - Método: `GET`
  - Permissões: Usuário

- **GET** `/books/read/:id`
  - Rota para marcar um livro como lido (usuários)
  - Método: `GET`
  - Parâmetros: `id`
  - Permissões: Usuário

- **PATCH** `/books/:id`
  - Rota para atualizar um livro
  - Método: `PATCH`
  - Parâmetros: `id`
  - Corpo: `EditBookDTO`
  - Permissões: Autor

- **PATCH** `/books/accept/:id`
  - Rota para aceitar um livro (somente administradores)
  - Método: `PATCH`
  - Parâmetros: `id`
  - Permissões: Administrador

- **DELETE** `/books/:id`
  - Rota para remover um livro
  - Método: `DELETE`
  - Parâmetros: `id`
  - Permissões: Administrador, Autor

### Users

- **GET** `/users`
  - Rota para listar todos os usuários
  - Método: `GET`

- **POST** `/users`
  - Rota para criar um novo usuário
  - Método: `POST`
  - Corpo: `CreateUserDTO`
  - Permissões: Público

- **GET** `/users/:id`
  - Rota para obter detalhes de um usuário específico
  - Método: `GET`
  - Parâmetros: `id`

- **PATCH** `/users/:id`
  - Rota para atualizar um usuário
  - Método: `PATCH`
  - Parâmetros: `id`
  - Corpo: `EditUserDTO`

- **DELETE** `/users/:id`
  - Rota para excluir um usuário
  - Método: `DELETE`
  - Parâmetros: `id`

##### Recursos Avançados (não finalizados)

# Desafios e Oportunidades de Melhoria

Durante o desenvolvimento desta API, minha maior experiência foi minha primeira incursão no framework NestJS. A principal dificuldade surgiu ao tentar entender os conceitos complexos do NestJS enquanto simultaneamente trabalhava no desenvolvimento da API. A navegação pela documentação e tutoriais, embora valiosa, por vezes se mostrou desafiadora em termos de clareza e assimilação rápida.

Claro, com certeza! Gostaria de destacar algumas áreas específicas nas quais vejo oportunidades claras de melhoria e expansão para este projeto:

1. **Implementação de Testes Unitários**:
   - Introduzir testes unitários para cada função e módulo da API, garantindo uma cobertura abrangente e a identificação precoce de problemas.

2. **Finalização de Recursos Avançados**:
   - Completar a implementação dos recursos avançados, como avaliações de livros, comentários, curtidas e estatísticas de leitores.

3. **Integração com a Aplicação Frontend**:
   - Integrar a API com a aplicação frontend desenvolvida em Next.js para garantir uma experiência de usuário contínua e funcional.

4. **Otimização de Desempenho**:
   - Avaliar e otimizar o desempenho da API para garantir que ela possa lidar com um grande volume de requisições de maneira eficiente.

5. **Aprimoramento da Segurança**:
   - Implementar práticas de segurança, como autenticação e autorização apropriadas, para proteger os dados e garantir que apenas usuários autorizados tenham acesso às funcionalidades relevantes.

6. **Tratamento de Erros Robusto**:
   - Desenvolver um sistema robusto de tratamento de erros para fornecer mensagens de erro claras e informativas aos usuários, melhorando a experiência do cliente.



---

Se precisar de mais informações ou tiver alguma dúvida, sinta-se à vontade para entrar em contato:

- Email: [josesilva23p@gmail.com](mailto:josesilva23p@gmail.com)
- LinkedIn: [linkedin.com/in/jsilvap10](https://www.linkedin.com/in/jsilvap10/)
