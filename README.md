# Family Manager API

Uma API RESTful para gerenciar usuários e seus responsáveis. Projeto desenvolvido para aprender o essencial de desenvolvimento backend com Node.js.

## Tecnologias

- **Node.js** com Express 5
- **Prisma** 6 como ORM
- **MongoDB** como banco de dados
- **CommonJS** para módulos

## Como Começar

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure o banco de dados** criando um `.env` na raiz do projeto:
   ```env
   DATABASE_URL="mongodb+srv://usuario:senha@cluster.mongodb.net/database?retryWrites=true&w=majority"
   ```

3. **Sincronize o schema:**
   ```bash
   npx prisma db push
   ```

4. **Rode o servidor:**
   ```bash
   node --watch server.js
   ```

A API estará disponível em `http://localhost:3000`

## API Endpoints

### Usuários

- **POST /usuarios** - Cria um novo usuário
- **GET /usuarios** - Lista todos os usuários
- **GET /usuarios/:id** - Busca um usuário específico
- **PUT /usuarios/:id** - Atualiza um usuário
- **DELETE /usuarios/:id** - Deleta um usuário

### Responsáveis (Parents)

- **POST /parents** - Cria um novo responsável
- **GET /parents** - Lista todos os responsáveis com seus filhos
- **GET /parents/:id** - Busca um responsável específico
- **PUT /parents/:id** - Atualiza um responsável
- **DELETE /parents/:id** - Deleta um responsável

## Estrutura do Projeto

```
.
├── prisma/
│   └── schema.prisma      # Definição do banco de dados
├── generated/             # Código gerado pelo Prisma
├── server.js              # Servidor e endpoints
├── package.json
└── .env                   # Variáveis de ambiente
```

## Modelo de Dados

**User** - Representa um usuário/filho
- `id`: Identificador único
- `name`: Nome completo
- `email`: Email único
- `age`: Idade
- `parentId`: Referência para o responsável

**Parent** - Representa um responsável
- `id`: Identificador único
- `name`: Nome completo
- `email`: Email único
- `phone`: Telefone de contato
- `users`: Lista de filhos relacionados

## Respostas da API

Todas as respostas seguem um padrão JSON simples:

```json
{
  "success": true,
  "message": "Descrição da operação",
  "data": {}
}
```

Status HTTP usados:
- `201`: Recurso criado
- `200`: Operação bem-sucedida
- `400`: Dados inválidos
- `404`: Recurso não encontrado
- `500`: Erro no servidor

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

MIT
