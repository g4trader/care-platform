# Care Platform - Notas de Desenvolvimento

## Como rodar o protótipo localmente

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Passo a passo

**⚠️ Nota:** Se encontrar erros de permissão do npm, use `NPM_CONFIG_CACHE=/tmp/npm-cache npm install`

1. **Instalar dependências do backend:**
   ```bash
   cd backend
   NPM_CONFIG_CACHE=/tmp/npm-cache npm install
   cd ..
   ```

2. **Instalar dependências do frontend:**
   ```bash
   cd frontend
   NPM_CONFIG_CACHE=/tmp/npm-cache npm install
   cd ..
   ```

4. **Rodar o backend:**
   ```bash
   npm run dev:backend
   ```
   O backend estará disponível em `http://localhost:8080`

5. **Rodar o frontend (em outro terminal):**
   ```bash
   npm run dev:frontend
   ```
   O frontend estará disponível em `http://localhost:3000`

### Variáveis de ambiente

O frontend usa a variável `NEXT_PUBLIC_API_URL` para apontar para o backend. Por padrão, usa `http://localhost:8080` se não estiver definida.

Para configurar:
```bash
# No frontend, criar arquivo .env.local
NEXT_PUBLIC_API_URL=http://localhost:8080
```

---

## Endpoints do Backend

### Autenticação

- **POST /api/auth/login**
  - Body: `{ role: "caregiver" | "client", name: string }`
  - Retorna: `{ userId: string, role: string, name: string }`

### Cuidadores

- **GET /api/caregivers**
  - Query params opcionais: `careType`, `city`
  - Retorna: Array de cuidadores

- **GET /api/caregivers/:id**
  - Retorna: Detalhes de um cuidador específico

- **POST /api/caregivers**
  - Headers: `x-user-id` (obrigatório)
  - Body: `{ bio, careTypes, location, priceRange }`
  - Retorna: Perfil do cuidador criado/atualizado

### Cursos

- **GET /api/courses**
  - Retorna: Array de cursos disponíveis

- **GET /api/courses/:id**
  - Retorna: Detalhes de um curso específico

### Pedidos de Cuidado

- **GET /api/client-requests**
  - Query params opcionais: `clientId`, `caregiverId`
  - Retorna: Array de pedidos

- **GET /api/client-requests/:id**
  - Retorna: Detalhes de um pedido específico

- **POST /api/client-requests**
  - Headers: `x-user-id` (obrigatório)
  - Body: `{ careType, schedule, location, details }`
  - Retorna: Pedido criado

- **POST /api/client-requests/:id/interest**
  - Headers: `x-user-id` (obrigatório - deve ser um cuidador)
  - Retorna: Pedido atualizado com interesse registrado

### Health Check

- **GET /api/health**
  - Retorna: `{ ok: true }`

---

## Telas do Frontend

### Páginas Públicas

1. **Landing Page (`/`)**
   - Apresentação dos 3 pilares do produto
   - Botões para login (cuidador ou contratante)

2. **Login (`/login`)**
   - Formulário simples com nome e seleção de perfil
   - Redireciona para dashboard correspondente após login

### Dashboard do Cuidador (`/caregiver`)

- **Onboarding** (se não tiver perfil):
  - Formulário para completar perfil (bio, tipos de cuidado, localização, preço)

- **Dashboard completo** (se já tiver perfil):
  - Card com informações do perfil
  - Lista de cursos disponíveis com link para detalhes
  - Lista de pedidos de cuidado disponíveis com botão para registrar interesse

### Dashboard do Contratante (`/client`)

- Formulário para criar novo pedido de cuidado
- Lista de pedidos já criados
- Link para explorar cuidadores

### Páginas de Navegação

1. **Lista de Cuidadores (`/caregivers-list`)**
   - Filtros por tipo de cuidado e cidade
   - Cards com informações resumidas
   - Link para perfil completo

2. **Perfil do Cuidador (`/caregivers/[id]`)**
   - Detalhes completos do cuidador
   - Certificações
   - Botão "Tenho interesse" (para contratantes)

3. **Detalhes do Curso (`/courses/[id]`)**
   - Informações do curso
   - Descrição e carga horária

---

## Estrutura do Código

### Backend

```
backend/
├── src/
│   ├── models/          # Interfaces TypeScript
│   │   ├── User.ts
│   │   ├── Caregiver.ts
│   │   ├── Course.ts
│   │   └── ClientRequest.ts
│   ├── services/        # Lógica de negócio e armazenamento em memória
│   │   ├── usersService.ts
│   │   ├── caregiversService.ts
│   │   ├── coursesService.ts
│   │   └── clientRequestsService.ts
│   ├── routes/          # Rotas Express
│   │   ├── auth.routes.ts
│   │   ├── caregivers.routes.ts
│   │   ├── courses.routes.ts
│   │   └── clientRequests.routes.ts
│   └── index.ts         # Entry point
```

### Frontend

```
frontend/
├── src/
│   ├── app/
│   │   ├── (auth)/          # Grupo de rotas de autenticação
│   │   │   └── login/
│   │   ├── (dashboards)/     # Grupos de rotas de dashboards
│   │   │   ├── caregiver/
│   │   │   └── client/
│   │   ├── caregivers/
│   │   │   ├── [id]/
│   │   │   └── caregivers-list/
│   │   ├── courses/
│   │   │   └── [id]/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/          # Componentes reutilizáveis
│   │   └── CaregiverOnboarding.tsx
│   ├── context/            # Contextos React
│   │   └── AuthContext.tsx
│   └── lib/                # Utilitários
│       ├── config.ts
│       └── api-client.ts
```

---

## Autenticação (Mock)

O sistema usa autenticação mock para o protótipo:

- Login via `POST /api/auth/login` retorna `userId`, `role` e `name`
- O frontend armazena essas informações no `localStorage` e no `AuthContext`
- Requisições autenticadas enviam o `userId` no header `x-user-id`
- **Não há validação de segurança real** - apenas para fluxo de protótipo

---

## Armazenamento de Dados

Atualmente, todos os dados são armazenados **em memória** no backend:

- Arrays TypeScript em cada service
- Dados são perdidos ao reiniciar o servidor
- Alguns dados mock são inicializados automaticamente (cuidadores e cursos de exemplo)

**Próximo passo:** Migrar para Prisma + PostgreSQL para persistência real.

---

## Fluxo "Happy Path" Implementado

1. **Cuidador:**
   - Login → Dashboard → Onboarding (se necessário) → Ver cursos → Ver pedidos → Registrar interesse

2. **Contratante:**
   - Login → Dashboard → Criar pedido → Explorar cuidadores → Ver perfil do cuidador

---

## Próximos Passos (Pós-MVP)

1. Integração com Prisma + PostgreSQL
2. Refinamento do modelo de dados
3. Módulo de reports (agenda + registros de atendimento)
4. Autenticação real (JWT, OAuth, etc.)
5. Integração com WhatsApp para notificações
6. Sistema de pagamentos
7. Avaliações e reviews reais

---

## Observações Técnicas

- TypeScript em todo o código
- Backend: Express + TypeScript
- Frontend: Next.js 14 (App Router) + TypeScript
- CORS habilitado no backend para desenvolvimento local
- Estilos inline simples (sem Tailwind por enquanto)
- Componentes funcionais com hooks React

