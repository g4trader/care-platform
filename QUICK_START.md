# Quick Start - Care Platform

## ⚠️ Problema de Permissões do npm

Se você encontrar erros de permissão ao instalar dependências, use:

```bash
NPM_CONFIG_CACHE=/tmp/npm-cache npm install
```

Ou corrija as permissões permanentemente (requer sudo):
```bash
sudo chown -R $(whoami) "/Users/$(whoami)/.npm"
```

## 🚀 Como Rodar o Projeto

### 1. Instalar Dependências

**Backend:**
```bash
cd backend
NPM_CONFIG_CACHE=/tmp/npm-cache npm install
cd ..
```

**Frontend:**
```bash
cd frontend
NPM_CONFIG_CACHE=/tmp/npm-cache npm install
cd ..
```

### 2. Rodar o Backend

Em um terminal:
```bash
cd backend
npm run dev
```

O backend estará disponível em: **http://localhost:8080**

### 3. Rodar o Frontend

Em outro terminal:
```bash
cd frontend
npm run dev
```

O frontend estará disponível em: **http://localhost:3000**

### 4. Acessar a Aplicação

Abra seu navegador em: **http://localhost:3000**

## ✅ Verificar se está funcionando

**Backend:**
```bash
curl http://localhost:8080/api/health
# Deve retornar: {"ok":true}
```

**Frontend:**
- Acesse http://localhost:3000 no navegador
- Você deve ver a landing page

## 🔧 Troubleshooting

### Porta já em uso
Se a porta 8080 ou 3000 estiver em uso:
```bash
# Verificar o que está usando a porta
lsof -ti:8080
lsof -ti:3000

# Matar o processo (substitua PID pelo número do processo)
kill -9 PID
```

### Erros de TypeScript
Se houver erros de compilação, verifique se todas as dependências foram instaladas:
```bash
cd backend && npm install
cd ../frontend && npm install
```

### Backend não responde
1. Verifique se o backend está rodando (veja o terminal)
2. Verifique se não há erros no console
3. Teste: `curl http://localhost:8080/api/health`

