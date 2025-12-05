# Deploy do Backend - Google Cloud Run

## ✅ Deploy Concluído

O backend da Care Platform foi deployado com sucesso no Google Cloud Run.

## 📍 Informações do Deploy

- **Projeto GCP:** `automatizar-452311`
- **Região:** `southamerica-east1`
- **Serviço:** `care-platform-backend`
- **URL do Backend:** `https://care-platform-backend-609095880025.southamerica-east1.run.app`

## 🧪 Testes

### Endpoint de Health Check

```bash
curl https://care-platform-backend-609095880025.southamerica-east1.run.app/api/health
```

**Resposta esperada:**
```json
{"ok": true}
```

### Endpoint Raiz

```bash
curl https://care-platform-backend-609095880025.southamerica-east1.run.app/
```

**Resposta esperada:**
```json
{"status":"ok","service":"care-platform-backend"}
```

## 🔄 Como Fazer Novo Deploy

1. Navegue até o diretório do backend:
   ```bash
   cd backend
   ```

2. Execute o script de deploy:
   ```bash
   ./deploy-cloudrun.sh
   ```

O script irá:
- Configurar o projeto e região do GCP
- Habilitar APIs necessárias
- Fazer build da imagem Docker
- Fazer deploy no Cloud Run
- Retornar a URL do serviço

## 🔧 Configuração do Frontend na Vercel

Para que o frontend (deployado na Vercel) se conecte ao backend no Cloud Run, você precisa configurar a variável de ambiente `NEXT_PUBLIC_API_URL`.

### Passo a Passo na Vercel:

1. Acesse o dashboard da Vercel: https://vercel.com/dashboard

2. Selecione o projeto `care-platform` (ou o nome do seu projeto)

3. Vá em **Settings** → **Environment Variables**

4. Adicione uma nova variável:
   - **Name:** `NEXT_PUBLIC_API_URL`
   - **Value:** `https://care-platform-backend-609095880025.southamerica-east1.run.app`
   - **Environment:** Selecione todas as opções (Production, Preview, Development)

5. Clique em **Save**

6. **IMPORTANTE:** Após adicionar a variável, você precisa fazer um novo deploy:
   - Vá em **Deployments**
   - Clique nos três pontos (...) do último deployment
   - Selecione **Redeploy**
   - Ou faça um novo commit/push para trigger automático

### Verificação

Após o redeploy, o frontend estará usando o backend do Cloud Run. Você pode verificar:

1. Abra o DevTools do navegador (F12)
2. Vá na aba **Network**
3. Faça uma requisição (ex: login)
4. Verifique que as requisições estão indo para: `https://care-platform-backend-609095880025.southamerica-east1.run.app`

## 📝 Arquivos Criados/Modificados

### Script de Deploy
- **Arquivo:** `backend/deploy-cloudrun.sh`
- **Descrição:** Script bash para automatizar o deploy no Cloud Run
- **Permissões:** Executável (`chmod +x`)

### Configuração do Frontend
- **Arquivo:** `frontend/src/lib/config.ts`
- **Conteúdo:**
  ```typescript
  export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  ```
- **Status:** ✅ Já configurado corretamente

### Dockerfile
- **Arquivo:** `backend/Dockerfile`
- **Status:** ✅ Já configurado corretamente
- **Porta:** 8080
- **Comando:** `npm start`

## 🔍 Verificação do Deploy

Para verificar o status do serviço no Cloud Run:

```bash
gcloud run services describe care-platform-backend \
  --region southamerica-east1 \
  --format 'value(status.url)'
```

Para ver os logs do serviço:

```bash
gcloud run services logs read care-platform-backend \
  --region southamerica-east1 \
  --limit 50
```

## 🚨 Troubleshooting

### Erro: "Permission denied"
- Verifique se você está autenticado: `gcloud auth login`
- Verifique se tem permissões no projeto: `gcloud projects get-iam-policy automatizar-452311`

### Erro: "API not enabled"
- O script já habilita as APIs necessárias, mas se houver erro:
  ```bash
  gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com
  ```

### Backend não responde
- Verifique os logs: `gcloud run services logs read care-platform-backend --region southamerica-east1`
- Verifique se o serviço está ativo: `gcloud run services list --region southamerica-east1`

### Frontend não conecta ao backend
- Verifique se a variável `NEXT_PUBLIC_API_URL` está configurada na Vercel
- Verifique se fez redeploy após adicionar a variável
- Verifique o console do navegador para erros de CORS (o backend já tem CORS habilitado)

## 📊 Status Atual

- ✅ Backend deployado no Cloud Run
- ✅ Endpoint `/api/health` funcionando
- ✅ CORS configurado
- ✅ Script de deploy criado e testado
- ⏳ Frontend precisa configurar `NEXT_PUBLIC_API_URL` na Vercel

---

**Última atualização:** 05/12/2025  
**URL do Backend:** `https://care-platform-backend-609095880025.southamerica-east1.run.app`

