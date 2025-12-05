# Ícones e Favicons - Care Platform

## Arquivos Necessários

Para completar a implementação dos ícones, você precisa criar os seguintes arquivos PNG a partir do `logo-care-icon.svg`:

1. **`/public/icon.png`** - 512x512px (favicon principal)
2. **`/public/apple-icon.png`** - 256x256px (Apple Touch Icon)

## Como Gerar

### Opção 1: Usando ferramentas online
- Acesse: https://realfavicongenerator.net/ ou https://favicon.io/
- Faça upload do `logo-care-icon.svg`
- Baixe os ícones gerados

### Opção 2: Usando ImageMagick (CLI)
```bash
# Converter SVG para PNG 512x512
convert -background none -resize 512x512 logo-care-icon.svg icon.png

# Converter SVG para PNG 256x256
convert -background none -resize 256x256 logo-care-icon.svg apple-icon.png
```

### Opção 3: Usando Inkscape (CLI)
```bash
# PNG 512x512
inkscape logo-care-icon.svg --export-filename=icon.png --export-width=512 --export-height=512

# PNG 256x256
inkscape logo-care-icon.svg --export-filename=apple-icon.png --export-width=256 --export-height=256
```

## Arquivos Atuais

- ✅ `/public/logo-care-platform.svg` - Logo horizontal completa
- ✅ `/public/logo-care-icon.svg` - Ícone da logo (quadrado)
- ✅ `/public/favicon.svg` - Favicon SVG (usa logo-care-icon.svg)

## Nota

Os arquivos PNG (`icon.png` e `apple-icon.png`) são placeholders temporários.
Substitua pelos arquivos reais gerados a partir do `logo-care-icon.svg` oficial.

