#!/usr/bin/env bash

set -e

SERVICE_NAME="care-platform-backend"
PROJECT_ID="automatizar-452311"
REGION="southamerica-east1"

echo "=========================================="
echo "Deploy do Backend - Care Platform"
echo "=========================================="
echo "Projeto: $PROJECT_ID"
echo "Região: $REGION"
echo "Serviço: $SERVICE_NAME"
echo "=========================================="
echo ""

echo "📋 Configurando projeto e região..."
gcloud config set project $PROJECT_ID
gcloud config set run/region $REGION

echo ""
echo "🔧 Habilitando APIs necessárias..."
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com

echo ""
echo "🚀 Iniciando deploy no Cloud Run..."
echo "   (Isso pode levar alguns minutos...)"
echo ""

gcloud run deploy $SERVICE_NAME \
  --source . \
  --region $REGION \
  --allow-unauthenticated \
  --platform managed

echo ""
echo "=========================================="
echo "✅ Deploy finalizado com sucesso!"
echo "=========================================="
echo ""
echo "📝 Para obter a URL do serviço, execute:"
echo "   gcloud run services describe $SERVICE_NAME --region $REGION --format 'value(status.url)'"
echo ""

