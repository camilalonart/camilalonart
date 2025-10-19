# Portfolio Website

A modern, responsive portfolio website built with Next.js 14, TypeScript, and styled-components.

## Updating Gallery Images

⚠️ **IMPORTANTE:** Cada vez que agregues o elimines imágenes en las carpetas de galería, debes regenerar las listas de imágenes.

### Galerías disponibles:
- `public/images/pets/gallery` → Fotos de mascotas
- `public/images/wedding/gallery` → Fotos de bodas
- `public/images/wildlife/gallery` → Fotos de vida silvestre

### Comando para regenerar las galerías:

```sh
npm run generate-images
```

O manualmente:

```sh
node scripts/generateImageList.js
```

Esto actualizará automáticamente:
- `src/data/petImages.json`
- `src/data/weddingImages.json`
- `src/data/wildlifeImages.json`

### ¿Cuándo ejecutar este comando?
- ✅ Después de agregar nuevas fotos a cualquier carpeta `gallery/`
- ✅ Después de eliminar fotos de cualquier carpeta `gallery/`
- ✅ Después de renombrar fotos en cualquier carpeta `gallery/`
- ✅ Antes de hacer deploy a producción
