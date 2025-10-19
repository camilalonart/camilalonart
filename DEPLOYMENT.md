# Deployment Guide

## GitHub Pages Deployment

Este proyecto se despliega automáticamente a GitHub Pages cuando haces push a la rama `main`.

### Configuración Actual

El deployment usa **GitHub Actions** con el workflow `.github/workflows/deploy.yml`:

1. **Build Job**: Construye el sitio Next.js
2. **Deploy Job**: Despliega a GitHub Pages

### Requisitos

Para que el deployment funcione correctamente:

1. **Permisos de GitHub Pages**:
   - Ve a tu repositorio en GitHub
   - Settings → Pages
   - Source: "GitHub Actions"
   
2. **Secrets de GitHub** (si aún no están configurados):
   - `NEXT_PUBLIC_WEDDING_FORM_URL`
   - `NEXT_PUBLIC_PET_FORM_URL`

### Solución al Error 128

Si ves el error `exit code 128` en GitHub Actions:

1. **Verificar permisos del workflow**:
   - Ve a Settings → Actions → General
   - En "Workflow permissions", selecciona "Read and write permissions"
   - Marca "Allow GitHub Actions to create and approve pull requests"

2. **Verificar GitHub Pages está habilitado**:
   - Settings → Pages
   - Source debe ser "GitHub Actions" (no Deploy from a branch)

3. **Limpiar y rebuild**:
   ```bash
   npm run build
   git add .
   git commit -m "Fix deployment"
   git push origin main
   ```

### Deployment Manual (Emergencia)

Si necesitas hacer deployment manual localmente:

```bash
# Opción 1: Usando el script de deploy
./deploy.sh

# Opción 2: Manual paso a paso
npm run build
git add out/
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix out origin gh-pages
```

**NOTA**: El deployment automático con GitHub Actions es preferible.

### Verificar el Deployment

Una vez desplegado, tu sitio estará disponible en:
```
https://camilalonart.github.io/camilalonart/
```

O si tienes un dominio personalizado configurado en `/public/CNAME`.

### Troubleshooting

#### El sitio no carga estilos o imágenes
- Verifica que `next.config.js` tenga la configuración correcta de `basePath` y `assetPrefix`
- Verifica que las rutas de imágenes no empiecen con `/` sino con el basePath correcto

#### Error 404 en rutas
- Next.js con `output: 'export'` solo soporta rutas estáticas
- Verifica que todas las páginas dinámicas tengan `generateStaticParams`

#### Build falla en GitHub Actions
- Revisa los logs en Actions tab
- Verifica que todas las dependencias estén en `package.json`
- Asegúrate de que no hay errores de TypeScript

### Proceso Correcto de Deploy

1. Haz tus cambios localmente
2. Prueba localmente con `npm run dev`
3. Construye localmente con `npm run build` (opcional, pero recomendado)
4. Commit y push:
   ```bash
   git add .
   git commit -m "Tu mensaje descriptivo"
   git push origin main
   ```
5. GitHub Actions automáticamente:
   - Construye el proyecto
   - Despliega a GitHub Pages
   - El sitio se actualiza en ~2-5 minutos

### Recursos

- [Next.js Static Export](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
