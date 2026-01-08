# Assets da Care Platform

Este diretório contém todos os assets visuais da plataforma.

## Estrutura de Arquivos

### Logos Principais
- `logo-care-platform.svg` - Logo horizontal completa (SVG)
- `logo-care-icon.svg` - Ícone/logo quadrado (SVG)
- `logo_principal_horizontal.png` - Logo horizontal (PNG)
- `AC_logo.png` - Logo alternativo
- `AC_logo_horizontal.png` - Logo horizontal alternativo
- `AC_simbolo.png` - Símbolo/ícone da marca

### Favicons e Ícones Web
- `favicon.svg` - Favicon SVG (usa logo-care-icon.svg)
- `icon.png` - Ícone principal 512x512px (gerado do kit-app)
- `apple-icon.png` - Apple Touch Icon 256x256px (gerado do kit-app)

### Kit de Apps Mobile
- `kit-app/android/` - Ícones para Android
  - `mipmap-*/ic_launcher.png` - Ícones em diferentes densidades
  - `playstore_512.png` - Ícone para Google Play Store
- `kit-app/ios/AppIcon.appiconset/` - Ícones para iOS
  - Todos os tamanhos necessários para iOS (iPhone, iPad, App Store)

### PDFs
Os PDFs do logo estão disponíveis em `../public/pdf/`:
- `AC_logo_horizontal_A4_paisagem.pdf`
- `AC_simbolo_A4_paisagem.pdf`

## Uso no Projeto

### Web (Next.js)
- **Logo no Header/Footer**: `logo-care-platform.svg`
- **Favicon**: `favicon.svg` (referencia `logo-care-icon.svg`)
- **Ícones**: `icon.png` e `apple-icon.png` (definidos em `layout.tsx`)

### Mobile (Futuro)
- **Android**: Use os arquivos em `kit-app/android/`
- **iOS**: Use os arquivos em `kit-app/ios/AppIcon.appiconset/`

## Notas

- Todos os arquivos SVG são vetoriais e podem ser redimensionados sem perda de qualidade
- Os arquivos PNG foram gerados a partir do kit de apps mobile
- O favicon.svg referencia o logo-care-icon.svg para manter consistência


