# Care Platform - Overview do Projeto

## 📋 Visão Geral

**Care Platform** é uma plataforma web MVP para conectar cuidadores profissionais (idosos, crianças, necessidades especiais) com contratantes (famílias e instituições). A plataforma oferece três pilares fundamentais:

1. **Certificação**: Cursos e certificações para profissionais se qualificarem
2. **Marketplace**: Sistema de matching entre cuidadores e contratantes
3. **Gestão**: Agenda, relatórios e automações para facilitar a gestão dos serviços

---

## 🏗️ Arquitetura Técnica

### Stack Tecnológica

**Frontend:**
- Next.js 14.2.3 (App Router)
- React 18.2.0
- TypeScript 5.0+
- Lucide React (ícones)
- CSS Modules / CSS Global

**Backend:**
- Node.js + Express 4.19.0
- TypeScript 5.0+
- CORS habilitado
- Armazenamento em memória (sem banco de dados ainda)

**Deploy:**
- Frontend: Vercel (planejado)
- Backend: Google Cloud Run (planejado)

---

## 📁 Estrutura do Projeto

```
care-platform/
├── frontend/              # Aplicação Next.js
│   ├── src/
│   │   ├── app/          # Rotas e páginas (App Router)
│   │   │   ├── (auth)/   # Rotas de autenticação
│   │   │   ├── (dashboards)/ # Dashboards protegidos
│   │   │   ├── caregivers/   # Páginas de cuidadores
│   │   │   ├── courses/      # Páginas de cursos
│   │   │   └── page.tsx      # Landing page
│   │   ├── components/   # Componentes React
│   │   ├── context/      # Contextos (AuthContext)
│   │   └── lib/          # Utilitários (API client, config)
│   └── public/           # Assets estáticos
│
├── backend/              # API Express
│   ├── src/
│   │   ├── models/       # Interfaces TypeScript
│   │   ├── services/     # Lógica de negócio (em memória)
│   │   ├── routes/       # Rotas Express
│   │   └── index.ts      # Entry point
│   └── Dockerfile        # Para deploy no Cloud Run
│
└── docs/                 # Documentação
    ├── product/          # Personas e user stories
    └── *.md             # Documentação técnica
```

---

## 🎯 Funcionalidades Implementadas

### 1. Autenticação (Mock)
- ✅ Login simples com nome e role (caregiver/client)
- ✅ Login mock com Google (simula OAuth)
- ✅ Seleção de perfil após login Google
- ✅ Context API para gerenciar estado de autenticação
- ✅ Persistência no localStorage
- ⚠️ **Nota**: Autenticação é mock, sem validação real de segurança

### 2. Landing Page
- ✅ Hero section com CTA
- ✅ Seção dos 3 pilares (Certificação, Marketplace, Gestão)
- ✅ Seções: Why, How It Works, Testimonials, Metrics, Before/After
- ✅ Design moderno e responsivo
- ✅ Preview do dashboard

### 3. Dashboard do Cuidador (`/caregiver`)
- ✅ Onboarding para criar perfil (se não existir)
- ✅ Visualização de perfil completo
- ✅ Agenda da semana (mock)
- ✅ Lista de pedidos de cuidado disponíveis
- ✅ Lista de cursos disponíveis
- ✅ Indicadores rápidos (avaliação, serviços, certificações)
- ✅ Registrar interesse em pedidos

### 4. Dashboard do Contratante (`/client`)
- ✅ Criar novos pedidos de cuidado
- ✅ Listar pedidos criados
- ✅ Visualizar cuidadores recomendados
- ✅ Métricas resumidas (pedidos ativos, cuidadores em atendimento)
- ✅ Formulário completo para criação de pedidos

### 5. Marketplace
- ✅ Lista de cuidadores (`/caregivers-list`)
- ✅ Filtros por tipo de cuidado e cidade
- ✅ Perfil detalhado do cuidador (`/caregivers/[id]`)
- ✅ Cards com informações resumidas

### 6. Cursos
- ✅ Lista de cursos disponíveis
- ✅ Detalhes do curso (`/courses/[id]`)
- ✅ Sistema de certificações (IDs de cursos concluídos)

---

## 📊 Modelos de Dados

### User
```typescript
{
  id: string
  name: string
  role: "caregiver" | "client" | null
  createdAt: Date
}
```

### Caregiver
```typescript
{
  id: string
  userId: string
  bio: string
  careTypes: ("elderly" | "children" | "special_needs")[]
  location: { city: string, state: string }
  priceRange: { min: number, max: number, currency: string }
  certifications: string[]  // IDs dos cursos
  rating: number  // 0-5
  createdAt: Date
  updatedAt: Date
}
```

### Course
```typescript
{
  id: string
  name: string
  description: string
  duration: number  // horas
  level: "beginner" | "intermediate" | "advanced"
  createdAt: Date
}
```

### ClientRequest
```typescript
{
  id: string
  clientId: string
  careType: "elderly" | "children" | "special_needs"
  schedule: {
    startDate: string
    endDate?: string
    timeSlots: string[]  // ["08:00-12:00", "14:00-18:00"]
  }
  location: { address: string, city: string, state: string }
  details: string
  status: "open" | "matched" | "closed"
  interestedCaregivers: string[]  // IDs dos cuidadores
  createdAt: Date
  updatedAt: Date
}
```

---

## 🔌 API Endpoints

### Autenticação
- `POST /api/auth/login` - Login com role e nome
- `POST /api/auth/google-mock` - Login mock Google
- `POST /api/auth/set-role` - Definir role após login Google

### Cuidadores
- `GET /api/caregivers` - Listar (filtros: `careType`, `city`)
- `GET /api/caregivers/:id` - Detalhes
- `POST /api/caregivers` - Criar/atualizar perfil (header: `x-user-id`)

### Cursos
- `GET /api/courses` - Listar todos
- `GET /api/courses/:id` - Detalhes

### Pedidos de Cuidado
- `GET /api/client-requests` - Listar (filtros: `clientId`, `caregiverId`)
- `GET /api/client-requests/:id` - Detalhes
- `POST /api/client-requests` - Criar (header: `x-user-id`)
- `POST /api/client-requests/:id/interest` - Registrar interesse (header: `x-user-id`)

### Health Check
- `GET /api/health` - Status da API

---

## 🎨 Design System

O projeto utiliza um design system customizado com variáveis CSS:

- **Cores**: Primary, Secondary, Gray scale
- **Espaçamento**: Sistema de spacing (xs, sm, md, lg, xl, 2xl, 3xl)
- **Tipografia**: Font sizes e weights padronizados
- **Componentes**: Cards, buttons, inputs, modals padronizados
- **Ícones**: Lucide React com classes utilitárias (`cp-icon-sm`, `cp-icon-lg`, etc.)

### Componentes Reutilizáveis
- `AppHeader` / `AppFooter` - Layout global
- `DashboardShell` - Container para dashboards
- `CaregiverOnboarding` - Formulário de onboarding
- Componentes de home (WhySection, HowItWorks, Testimonials, etc.)

---

## 🔄 Fluxos Principais

### Fluxo do Cuidador
1. Acessa landing page → Clica em "Começar agora"
2. Login → Seleciona "Sou Cuidador"
3. Dashboard → Se não tem perfil, faz onboarding
4. Visualiza:
   - Agenda da semana
   - Pedidos disponíveis (pode registrar interesse)
   - Cursos disponíveis
   - Indicadores (avaliação, serviços, certificações)

### Fluxo do Contratante
1. Acessa landing page → Clica em "Começar agora"
2. Login → Seleciona "Sou Contratante"
3. Dashboard → Cria pedido de cuidado
4. Visualiza:
   - Pedidos criados
   - Cuidadores recomendados
   - Métricas resumidas

---

## ⚠️ Limitações Atuais (MVP)

### Armazenamento
- ❌ **Dados em memória**: Todos os dados são perdidos ao reiniciar o servidor
- ❌ **Sem banco de dados**: Não há persistência real
- ✅ **Dados mock**: Alguns dados de exemplo são inicializados automaticamente

### Autenticação
- ❌ **Mock apenas**: Não há validação real de segurança
- ❌ **Sem JWT/OAuth real**: Login é simulado
- ⚠️ **Header `x-user-id`**: Usado para identificar usuário (não seguro)

### Funcionalidades Faltantes
- ❌ Sistema de pagamentos
- ❌ Notificações (WhatsApp, email)
- ❌ Avaliações e reviews reais
- ❌ Módulo de relatórios detalhados
- ❌ Agenda real (atualmente mock)
- ❌ Chat/mensagens entre usuários
- ❌ Sistema de matching inteligente

---

## 🚀 Próximos Passos Sugeridos

### Prioridade Alta
1. **Migração para Banco de Dados**
   - Integrar Prisma + PostgreSQL
   - Criar schema completo
   - Migrar services para usar Prisma

2. **Autenticação Real**
   - Implementar JWT ou OAuth real
   - Middleware de autenticação
   - Proteção de rotas

3. **Persistência de Dados**
   - Substituir armazenamento em memória
   - Seed de dados iniciais
   - Migrations

### Prioridade Média
4. **Sistema de Agenda Real**
   - Calendário interativo
   - Gerenciamento de horários
   - Notificações de agendamento

5. **Módulo de Relatórios**
   - Relatórios de atendimento
   - Histórico de serviços
   - Exportação de dados

6. **Sistema de Avaliações**
   - Reviews reais
   - Sistema de rating
   - Comentários

### Prioridade Baixa
7. **Integrações**
   - WhatsApp para notificações
   - Sistema de pagamentos
   - Email marketing

8. **Melhorias de UX**
   - Busca avançada
   - Filtros mais sofisticados
   - Dashboard analytics

---

## 📝 Comandos Úteis

```bash
# Instalar dependências
cd backend && npm install
cd ../frontend && npm install

# Rodar desenvolvimento
npm run dev:backend    # Backend na porta 8080
npm run dev:frontend   # Frontend na porta 3000

# Build
cd backend && npm run build
cd frontend && npm run build

# Lint
npm run lint
```

---

## 🔧 Configuração

### Variáveis de Ambiente

**Frontend** (`.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

**Backend**:
- `PORT` (padrão: 8080)

---

## 📚 Documentação Adicional

- `DEV_NOTES.md` - Notas técnicas de desenvolvimento
- `DEPLOY_BACKEND.md` - Guia de deploy do backend
- `DESIGN_SYSTEM_IMPLEMENTATION.md` - Detalhes do design system
- `LANDING_PAGE_REDESIGN.md` - Documentação da landing page
- `LOGIN_REDESIGN.md` - Documentação da página de login
- `product/personas.md` - Personas do produto
- `product/user-stories.md` - User stories (a definir)

---

## 🎯 Status do Projeto

**Fase Atual**: MVP Protótipo Funcional

**O que funciona:**
- ✅ Fluxo completo de autenticação (mock)
- ✅ Dashboards funcionais para ambos os perfis
- ✅ CRUD básico de cuidadores, cursos e pedidos
- ✅ Landing page completa
- ✅ Design system implementado

**O que precisa evoluir:**
- 🔄 Persistência de dados (banco de dados)
- 🔄 Autenticação real
- 🔄 Funcionalidades avançadas (agenda, relatórios, pagamentos)

---

## 👥 Personas

1. **Cuidador Profissional**: Oferece serviços de cuidado, busca qualificação e oportunidades
2. **Contratante (Família)**: Precisa de cuidados para familiares
3. **Contratante Institucional**: Instituições que precisam de cuidadores

*(Detalhar mais baseado no briefing)*

---

**Última atualização**: Janeiro 2025


