# Documentação da API de Gerenciamento de Documentos

Essa é uma versao de testes. alguns bugs na parte do front end podem ocorrer

iniciar em dev

### Backend
  - entrar na pasta backend
  - npm install, npm run dev
### Front-end
  - entrar na pasta frontend/front
  - npm install, npm run dev

Front-end ainda não esta com controle de acesso, então caso va direto para uma pagina de cadastro com certeza vai dar um erro

- [ / ] -> signup
- [ /signin ] para logar gerar o jwt e salvar em cache
- [ /document ] Para cadastrar, visualizar, modificar e deletar um documento
- [ /controleUser ] Para atualizar ou deletar conta

Na parte do backend existem repositorios e database com o prisma. na pasta main e possivel trocar entre database e memory no dependency injection sem quebrar funcionalidades.
O foco desse projeto foi mostrar uma arquitetura sem dependecias.


## Sumário

- [Introdução](#introdução)
- [Autenticação](#autenticação)
- [Endpoints](#endpoints)
  - [Criar Documento](#criar-documento)
  - [Obter Documento](#obter-documento)
  - [Obter Todos os Documentos](#obter-todos-os-documentos)
  - [Deletar Documento](#deletar-documento)
  - [Atualizar Documento](#atualizar-documento)
- [Exemplo de Uso](#exemplo-de-uso)
- [Erro e Respostas](#erro-e-respostas)
- [Contribuição](#contribuição)

## Introdução

Esta API permite o gerenciamento de documentos, incluindo a criação, atualização, exclusão e consulta de documentos. Ela foi desenvolvida usando Node.js e Express.

## Autenticação

A API utiliza autenticação baseada em token JWT. 
colocar do .env o token

markdown


## Endpoints

### Criar Documento

- **Método:** `POST`
- **Endpoint:** `/createDocument`
- **Descrição:** Adiciona um novo documento ao sistema.

#### Parâmetros

| Parâmetro      | Tipo   | Descrição                   |
|----------------|--------|-----------------------------|
| document_name  | string | Nome do documento           |
| status         | string | Status do documento         |
| account_id     | string | ID da conta associada       |

#### Respostas

- **200**: Documento criado com sucesso.
- **400**: Requisição inválida.
- **402**: Não autorizado.

#### Exemplo de Requisição

```json
POST /createDocument
{
  "document_name": "Contrato de Locação",
  "status": "Ativo",
  "account_id": "12345"
}

Obter Documento

    Método: GET
    Endpoint: /getDocument
    Descrição: Retorna os detalhes de um documento específico.

Parâmetros
Parâmetro	Tipo	Descrição
document_id	string	ID do documento a ser buscado
Respostas

    200: Documento encontrado.
    402: Documento não encontrado.

Exemplo de Requisição

http

GET /getDocument?document_id=document_123

Obter Todos os Documentos

    Método: GET
    Endpoint: /getAllDocuments
    Descrição: Retorna todos os documentos associados a um usuário específico.

Parâmetros
Parâmetro	Tipo	Descrição
userId	string	ID do usuário para o qual buscar
Respostas

    200: Lista de documentos.
    404: Usuário não encontrado.

Exemplo de Requisição

http

GET /getAllDocuments?userId=123

Deletar Documento

    Método: DELETE
    Endpoint: /deleteDocument
    Descrição: Remove um documento do sistema.

Parâmetros
Parâmetro	Tipo	Descrição
document_id	string	ID do documento a ser deletado
Respostas

    200: Documento deletado com sucesso.
    402: Não autorizado.

Exemplo de Requisição

http

DELETE /deleteDocument?document_id=document_123

Atualizar Documento

    Método: PUT
    Endpoint: /updateDocument
    Descrição: Atualiza os detalhes de um documento existente.

Parâmetros
Parâmetro	Tipo	Descrição
document_id	string	ID do documento a ser atualizado
document_name	string	Novo nome do documento
status	string	Novo status do documento
account_id	string	ID da conta associada
Respostas

    200: Documento atualizado com sucesso.
    402: Requisição inválida.

Exemplo de Requisição

json

PUT /updateDocument
{
  "document_id": "document_123",
  "document_name": "Novo Contrato de Locação",
  "status": "Inativo",
  "account_id": "12345"
}

```

### Criar Conta

- **Método:** `POST`
- **Endpoint:** `/createUser`
- **Descrição:** Cria uma nova conta de usuário no sistema.

#### Parâmetros

| Parâmetro | Tipo   | Descrição                     |
|-----------|--------|-------------------------------|
| email     | string | Endereço de e-mail do usuário |
| name      | string | Nome do usuário               |

#### Respostas

- **200**: Conta criada com sucesso.
- **402**: Requisição inválida.

#### Exemplo de Requisição

```json
POST /createUser
{
  "email": "usuario@example.com",
  "name": "Nome do Usuário"
}

Obter Conta

    Método: GET
    Endpoint: /getAccount
    Descrição: Obtém os detalhes de uma conta de usuário específica.

Parâmetros
Parâmetro	Tipo	Descrição
email	string	Endereço de e-mail do usuário
name	string	Nome do usuário
Respostas

    200: Conta encontrada.
    404: Conta não encontrada.

Exemplo de Requisição

http

GET /getAccount?email=usuario@example.com&name=Nome do Usuário

Deletar Conta

    Método: DELETE
    Endpoint: /deleteAccount
    Descrição: Remove uma conta de usuário do sistema.

Parâmetros
Parâmetro	Tipo	Descrição
account_id	string	ID da conta a ser deletada
Respostas

    200: Conta deletada com sucesso.
    402: Conta não encontrada.

Exemplo de Requisição

http

DELETE /deleteAccount?account_id=12345

Atualizar Conta

    Método: PUT
    Endpoint: /updateAccount
    Descrição: Atualiza os detalhes de uma conta de usuário existente.

Parâmetros
Parâmetro	Tipo	Descrição
account_id	string	ID da conta a ser atualizada
email	string	Novo endereço de e-mail do usuário
name	string	Novo nome do usuário
Respostas

    200: Conta atualizada com sucesso.
    402: Requisição inválida.
    

Exemplo de Requisição

json

PUT /updateAccount
{
  "account_id": "12345",
  "email": "novo_email@example.com",
  "name": "Novo Nome do Usuário"
}
```
