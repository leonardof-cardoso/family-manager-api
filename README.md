# CRUD API - Users & Parents 🚀

Uma API RESTful simples e funcional para gerenciar usuários e seus responsáveis. Perfeita para começar com Express, Prisma e MongoDB.

## Stack

- **Node.js** com Express 5
- **Prisma** 6 como ORM
- **MongoDB** (Atlas) como banco de dados
- **CommonJS** para módulos

## Por que esse projeto?

Criei isso pra ter um exemplo limpo de:
- ✅ CRUD completo com tratamento de erros
- ✅ Relacionamento um-para-muitos (Parent → Users)
- ✅ Respostas padronizadas em JSON
- ✅ Endpoints com validação básica
- ✅ Pronto pra expandir

## Instalação

### 1. Clone e instale as dependências

```bash
git clone https://github.com/seu-usuario/crud-api-users.git
cd crud-api-users
npm install
```

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz:

```env
DATABASE_URL="mongodb+srv://usuario:senha@cluster.mongodb.net/database?retryWrites=true&w=majority"
```

### 3. Sincronize o banco

```bash
npx prisma db push
```

### 4. Inicie o servidor

```bash
# Modo desenvolvimento (com auto-reload)
node --watch server.js

# Modo produção
node server.js
```

O servidor vai estar em `http://localhost:3000`

## Endpoints da API

### 📝 Usuários

#### ➕ Criar usuário
```bash
POST /usuarios
Content-Type: application/json

{
  "id": "user123",
  "name": "João Silva",
  "email": "joao@email.com",
  "age": "25",
  "parentId": "parent_id_opcional"
}
```

**Resposta (201):**
```json
{
  "success": true,
  "message": "Usuário criado com sucesso",
  "data": {
    "id": "user123",
    "name": "João Silva",
    "email": "joao@email.com",
    "age": "25",
    "parentId": null
  }
}
```

#### 📋 Listar todos
```bash
GET /usuarios
```

**Resposta (200):**
```json
{
  "success": true,
  "message": "3 usuário(s) encontrado(s)",
  "data": [...]
}
```

#### 🔍 Buscar por ID
```bash
GET /usuarios/:id
```

#### ✏️ Atualizar
```bash
PUT /usuarios/:id
Content-Type: application/json

{
  "name": "João Atualizado",
  "email": "novo@email.com",
  "age": "26"
}
```

#### 🗑️ Deletar
```bash
DELETE /usuarios/:id
```

---

### 👨‍👩‍👧 Parents (Responsáveis)

#### ➕ Criar parent
```bash
POST /parents

{
  "name": "Maria Silva",
  "email": "maria@email.com",
  "phone": "11999999999"
}
```

#### 📋 Listar todos com filhos
```bash
GET /parents
```

**Retorna cada parent com seus usuários relacionados:**
```json
{
  "success": true,
  "message": "2 parent(s) encontrado(s)",
  "data": [
    {
      "id": "parent123",
      "name": "Maria Silva",
      "email": "maria@email.com",
      "phone": "11999999999",
      "users": [
        {
          "id": "user123",
          "name": "João",
          "email": "joao@email.com",
          "age": "8",
          "parentId": "parent123"
        }
      ]
    }
  ]
}
```

#### 🔍 Buscar por ID
```bash
GET /parents/:id
```

#### ✏️ Atualizar
```bash
PUT /parents/:id

{
  "name": "Maria Atualizada",
  "email": "novo@email.com",
  "phone": "11888888888"
}
```

#### 🗑️ Deletar
```bash
DELETE /parents/:id
```

## Estrutura do Projeto

```
crud-api-users/
├── prisma/
│   ├── schema.prisma       # Schema do banco
│   └── .env               # Variáveis de ambiente
├── node_modules/
├── server.js              # Principal - toda a API
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Modelo de Dados

### User
```
{
  id       String   @id      (auto-gerado)
  email    String   @unique  (obrigatório)
  name     String            (obrigatório)
  age      String            (obrigatório)
  parentId String?           (opcional)
  parent   Parent?           (relacionamento)
}
```

### Parent
```
{
  id    String   @id      (auto-gerado)
  name  String            (obrigatório)
  email String   @unique  (obrigatório)
  phone String            (obrigatório)
  users User[]            (lista de filhos)
}
```

## Tratamento de Erros

Todos os endpoints retornam no mesmo formato:

**Sucesso:**
```json
{
  "success": true,
  "message": "Descrição do sucesso",
  "data": {...}
}
```

**Erro:**
```json
{
  "success": false,
  "message": "Descrição do erro",
  "error": "Detalhes técnicos (opcional)"
}
```

**Status HTTP usados:**
- `201` - Criado com sucesso
- `200` - OK
- `400` - Erro na requisição (dados inválidos)
- `404` - Não encontrado
- `500` - Erro no servidor

## Dicas de Desenvolvimento

### Ver dados no Prisma Studio
```bash
npx prisma studio
```
Abre interface visual em `http://localhost:5556`

### Regenerar cliente Prisma após alterar schema
```bash
npx prisma generate
```

### Sincronizar mudanças no banco
```bash
npx prisma db push
```

## Próximas Melhorias Sugeridas

- [ ] Adicionar autenticação (JWT)
- [ ] Validar dados de entrada com `zod` ou `joi`
- [ ] Separar rotas em arquivos diferentes
- [ ] Adicionar logger (morgan ou pino)
- [ ] Testes com Jest
- [ ] Documentação com Swagger/OpenAPI
- [ ] Rate limiting
- [ ] CORS configurável

## Troubleshooting

### Erro: "Cannot find module '@prisma/client'"
```bash
npm install
npx prisma generate
```

### Porta 3000 já está em uso?
Mude em `server.js`:
```javascript
app.listen(3001) // ou outra porta
```

### Erro ao criar usuário com email duplicado?
O email é único, tente outro. Verifique no Prisma Studio.

## Licença

MIT - Use à vontade!

## Dúvidas?

Se tiver problemas:
1. Verifique o `.env` com os dados corretos do MongoDB
2. Rode `npx prisma db push` pra sincronizar o banco
3. Limpe `node_modules` e rode `npm install` novamente

---

**Made with ❤️ e bastante café ☕**
