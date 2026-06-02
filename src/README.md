## 🏗️ Arquitetura do Projeto

O LPSHUB segue uma arquitetura baseada na separação de responsabilidades, facilitando manutenção, escalabilidade e testes.

### Fluxo da aplicação

Quando uma requisição é realizada para a API:

```text
Request
   │
   ▼
Route
   │
   ▼
Controller
   │
   ▼
Validation
   │
   ▼
Service
   │
   ▼
Repository
   │
   ▼
Prisma
   │
   ▼
PostgreSQL
```

Cada camada possui uma responsabilidade específica.

---

### server.js

Ponto de entrada da aplicação.

Responsável por:

- Inicializar o servidor
- Carregar variáveis de ambiente
- Iniciar a aplicação

Exemplo:

```javascript
app.listen(3001);
```

Não deve conter:

- Regras de negócio
- Consultas ao banco
- Validações

---

### app.js

Responsável pela configuração global da aplicação.

Funções:

- Registro de middlewares
- Configuração de CORS
- Configuração de segurança
- Registro das rotas
- Tratamento global de erros

Exemplo:

```javascript
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
```

---

### routes/

Responsável por mapear os endpoints da aplicação.

Estrutura sugerida:

```text
routes
├── auth.routes.js
├── user.routes.js
├── financial.routes.js
├── category.routes.js
├── transaction.routes.js
└── report.routes.js
```

Exemplo:

```javascript
router.post("/", controller.create);
```

A rota deve apenas encaminhar a requisição para o Controller.

---

### controllers/

Recebem a requisição HTTP e retornam a resposta.

Responsabilidades:

- Ler parâmetros da URL
- Ler query params
- Ler body da requisição
- Chamar Services
- Retornar resposta HTTP

Exemplo:

```javascript
async function create(req, res) {
  const user = await userService.create(req.body);

  return res.status(201).json(user);
}
```

O Controller não deve conter:

- SQL
- Prisma
- Regras financeiras
- Regras de negócio

---

### validations/

Responsável pela validação dos dados recebidos.

Utilizando Zod:

```javascript
const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});
```

Benefícios:

- Dados consistentes
- Erros padronizados
- Menos validações manuais

Estrutura:

```text
validations
├── auth.schema.js
├── user.schema.js
├── transaction.schema.js
└── category.schema.js
```

---

### services/

Camada responsável pelas regras de negócio.

É o núcleo da aplicação.

Exemplos:

- Verificar limite de gastos
- Validar permissões
- Processar relatórios
- Calcular indicadores financeiros
- Aplicar regras de categorização

Exemplo:

```javascript
if (userExists) {
  throw new AppError("Usuário já existe");
}
```

Toda regra de negócio deve estar concentrada nesta camada.

---

### repositories/

Responsável exclusivamente pelo acesso aos dados.

Exemplos:

```javascript
prisma.user.create();
prisma.user.findUnique();
prisma.transaction.update();
```

Responsabilidades:

- Buscar dados
- Inserir registros
- Atualizar registros
- Remover registros

Não deve conter:

- Validações
- Regras financeiras
- Regras de negócio

---

### prisma/

Responsável pelo mapeamento do banco de dados.

Estrutura:

```text
prisma
├── schema.prisma
├── migrations
```

Exemplo:

```prisma
model User {
  id    String @id @default(cuid())
  name  String
  email String @unique
}
```

O Prisma atua como camada intermediária entre a aplicação e o PostgreSQL.

---

### database (PostgreSQL)

Responsável pela persistência dos dados.

Principais entidades:

```text
User
Category
Transaction
Account
Goal
Report
```

Todos os dados financeiros são armazenados e consultados através do Prisma ORM.

---

### middlewares/

Executados antes que a requisição chegue ao Controller.

Exemplos:

```text
Request
   │
Middleware
   │
Controller
```

Possíveis middlewares:

```text
middlewares
├── auth.middleware.js
├── validation.middleware.js
├── rate-limit.middleware.js
└── error.middleware.js
```

---

### auth.middleware.js

Responsável pela autenticação.

Valida:

```text
Authorization: Bearer token
```

Após validação:

```javascript
req.user = user;
```

Assim as informações do usuário ficam disponíveis durante toda a requisição.

---

### error.middleware.js

Centraliza o tratamento de erros.

Exemplo:

```javascript
throw new AppError("Usuário não encontrado");
```

Resposta:

```json
{
  "message": "Usuário não encontrado"
}
```

Evita repetição de blocos try/catch em toda a aplicação.

---

### lib/

Bibliotecas e integrações compartilhadas.

Estrutura:

```text
lib
├── prisma.js
├── logger.js
├── auth.js
└── cache.js
```

Exemplo:

```javascript
const prisma = new PrismaClient();
```

Toda a aplicação utiliza uma única instância compartilhada.

---

### utils/

Funções auxiliares reutilizáveis.

Exemplos:

```text
utils
├── formatCurrency.js
├── formatDate.js
├── generateCode.js
├── pagination.js
└── removeMask.js
```

Exemplo:

```javascript
formatCurrency(1000);
```

Retorno:

```text
R$ 1.000,00
```

Essas funções não devem conter regras de negócio.
