# camilalonart.com

Sitio web portafolio construido con Next.js 14, TypeScript y Styled Components.
Alojado en GitHub Pages en [camilalonart.com](https://www.camilalonart.com).

---

## Gestionar secciones en la página principal

La página principal (`/`) muestra dos listas: **Secciones visibles** (completadas) y **Secciones escondidas** (en desarrollo).

**Secciones visibles actuales:**
- Wedding & Couples Photography
- Pet Photography  
- Professional Headshots
- Family & Maternity Photography
- Wildlife Photography
- Traditional Art

**Secciones escondidas actuales:**
- Digital Art
- Brand Identity
- Graphic Recording
- UX/UI Design
- Tech & Engineering

### Cambiar una sección de escondida a visible

1. Abre `src/config/sections.ts`
2. Encuentra la sección en `hiddenSections[]`
3. Córtala y pégala en `visibleSections[]`

**Antes:**
```typescript
export const hiddenSections: Section[] = [
  {
    id: 'digital-art',
    title: 'Digital Art',
    description: 'Digital illustrations and designs',
    href: '/my-art/digital-art',
    icon: '🖼️',
    category: 'art',
  },
  // ... más
];
```

**Después:**
```typescript
export const visibleSections: Section[] = [
  // ... secciones existentes
  {
    id: 'digital-art',
    title: 'Digital Art',
    description: 'Digital illustrations and designs',
    href: '/my-art/digital-art',
    icon: '🖼️',
    category: 'art',
  },
];
```

4. Guarda, commit y push:
```bash
git add src/config/sections.ts
git commit -m "Move Digital Art to visible sections"
git push
```

### Agregar una sección completamente nueva

1. Edita `src/config/sections.ts`
2. Agrega a `visibleSections` o `hiddenSections`:

```typescript
{
  id: 'my-new-section',           // ID único, sin espacios
  title: 'My New Section',         // Nombre visible
  description: 'Brief description of the section',
  href: '/path/to/page',          // Ruta en src/app/
  icon: '🎨',                     // Emoji que represente la sección
  category: 'art|photography|services|other',
},
```

3. **Importante:** Asegúrate que la página exista en `src/app/` en la ruta especificada
4. Commit y push

---

## Agregar nuevas fotos

### Fotos de sesiones fotográficas (pets, bodas, familia, headshots, wildlife)

Sigue estos pasos para cada galería:

**1. Coloca las fotos** en la carpeta correspondiente:

| Sección | Carpeta |
|---|---|
| Mascotas | `public/images/pets/gallery/` |
| Bodas y parejas | `public/images/wedding/gallery/` |
| Familia y maternidad | `public/images/family/gallery/` |
| Headshots | `public/images/headshots/gallery/` |
| Wildlife | `public/images/wildlife/gallery/` |

**2. Convierte a WebP y limpia**:

```sh
npm run webp-convert      # convierte los JPGs nuevos a WebP (omite los que ya están)
npm run webp-cleanup      # borra los JPGs originales que ya tienen su .webp
npm run generate-images   # regenera automáticamente el JSON de la galería
```

> ⚠️ Requiere `cwebp`: instálalo una vez con `brew install webp`
> ⚠️ Guarda los originales en un disco externo ANTES de correr `webp-cleanup`

**3. Verifica y sube:**
```sh
npm run build   # verifica que todo funcione
git push origin main
```

---

### Agregar una colección nueva de arte tradicional

Una **colección** es un grupo de pinturas bajo un tema común (ej: "Fuego Interior", "Carrying Home").

**1. Crea una carpeta** para la colección:
```
public/images/art/traditionalArt/Tu Colección/
```

**2. Coloca las imágenes** en esa carpeta (en cualquier formato JPG/PNG).

**3. Convierte a WebP**:
```sh
npm run webp-convert      # convierte todo a WebP
npm run webp-cleanup      # borra los originales
```

**4. Registra la colección** en `src/data/artPortfolio.ts`:

```ts
{
  id: "nombre-sin-espacios",           // usado en URLs
  name: "Nombre de la Colección",
  period: "2024" or "2023–2024",
  description: "Una frase sobre el tema de la colección",
  paintings: [
    {
      id: "painting-id-01",
      title: "Título de la pintura",
      materials: "Óleo sobre lino",
      size: "60 × 80 cm",
      year: 2024,
      images: ["/images/art/traditionalArt/Tu Colección/imagen.webp"],
    },
    // agregar más pinturas...
  ],
}
```

Agrega este bloque al array `collections` en el archivo.

**5. Verifica y sube:**
```sh
npm run build
git push origin main
```

---

### Agregar un escrito largo a una pintura ("Artist's Statement")

Si quieres que una pintura tenga un escrito personal que se muestre solo en su página:

En `src/data/artPortfolio.ts`, agrega el campo `thoughts` a la pintura:

```ts
{
  id: "painting-01",
  title: "Título",
  materials: "Óleo",
  size: "70 × 90 cm",
  year: 2024,
  images: ["/images/art/traditionalArt/Carpeta/imagen.webp"],
  thoughts: "Aquí escribes la reflexión personal sobre esta obra. Puede ser un párrafo largo. Aparecerá en la página de la pintura bajo el título 'Artist's Statement'.",
}
```

El escrito se mostrará automáticamente en la página de la pintura (no en galerías ni miniaturas).

---

## Si quieres ver antes qué va a hacer cada script (modo seguro)

Cada comando destructivo tiene una versión de previsualización:

```sh
npm run webp-check         # muestra qué imágenes se convertirán (sin cambios)
npm run webp-cleanup-check # muestra qué originales se borrarían (sin cambios)
npm run refs-check         # muestra qué referencias en el código cambiarían (sin cambios)
```

---

## Todos los comandos

```sh
# Desarrollo
npm run dev              # servidor local en localhost:3000
npm run build            # construye el sitio → carpeta /out
npm run lint             # revisa errores de código

# Imágenes
npm run webp-convert          # convierte JPG/PNG → WebP
npm run webp-cleanup          # borra originales que ya tienen .webp
npm run generate-images       # regenera los JSON de galerías (pets/bodas/wildlife)
npm run refs-update           # actualiza referencias .jpg → .webp en el código

# Previsualizaciones (no modifican nada)
npm run webp-check
npm run webp-cleanup-check
npm run refs-check
```

---

## URLs del sitio

| URL | Página |
|---|---|
| `camilalonart.com` | Hub principal |
| `camilalonart.com/art` | Portafolio de arte tradicional (sitio independiente) |
| `camilalonart.com/my-art/traditional-art` | Misma página, segunda URL |
| `camilalonart.com/photography/pets` | Mascotas |
| `camilalonart.com/photography/wedding-couples` | Bodas y parejas |
| `camilalonart.com/photography/family-maternity` | Familia y maternidad |
| `camilalonart.com/photography/headshots` | Headshots |
| `camilalonart.com/my-art/wildlife-photography` | Wildlife |
| `camilalonart.com/creative-services` | Servicios creativos |

---

## Sobre la protección de imágenes

El repo es público (necesario para GitHub Pages). No es posible impedir descargas en un sitio estático. Lo que está implementado
- Marca de agua `@camilalonart` siempre visible en las pinturas abiertas
- Clic derecho deshabilitado
- Arrastrar deshabilitado
- Guarda los originales en un disco externo — solo sube las versiones WebP al repo