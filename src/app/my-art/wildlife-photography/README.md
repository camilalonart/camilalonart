# Wildlife Photography - Portafolio Artístico Personal

Esta sección es tu **portafolio artístico personal** de fotografía de vida salvaje, **NO es un servicio comercial**. El diseño está inspirado en galerías de arte minimalistas y templates premium.

## 🎨 Concepto del Diseño

### Experiencia de Usuario
1. **Landing Page** (`/my-art/wildlife-photography`) - Una sola imagen impactante con título grande
2. **Gallery Page** (`/my-art/wildlife-photography/gallery`) - Galería de proyectos con información de cada foto
3. **Modal de Imagen** - Vista en calidad completa sin opción de descarga

### Inspiración
Diseño basado en el template de Wix que guardaste, adaptado para mostrar tu trabajo artístico de forma elegante y minimalista.

## 📋 Características

### Landing Page (`/my-art/wildlife-photography`)
- ✨ **Una sola imagen hero** que ocupa toda la pantalla
- 📝 **Título grande** en Playfair Display
- 🔘 **Botón "View Gallery"** que navega a la página de galería
- 🎨 Efecto de overlay oscuro para legibilidad
- 🏠 **Botón Home** en esquina superior derecha para volver al inicio

### Gallery Page (`/my-art/wildlife-photography/gallery`)
- 🖼️ **Grid responsive con masonry layout** (3 columnas → 2 → 1)
- 📸 Carga automática de todas las fotos desde `wildlifeImages.json`
- ↗️ Efecto hover: la imagen se eleva y hace zoom
- 👆 Click para abrir en modal
- ⬅️ **Botón "Back"** para regresar al landing
- 🏠 **Botón Home** para ir al inicio del sitio

### Modal de Imagen
- 🖥️ **Full-screen** con fondo negro 97% opacidad
- 📷 Imagen en **máxima calidad** (quality={100})
- 🚫 **Sin descarga**:
  - Right-click deshabilitado
  - Drag deshabilitado
  - User-select: none
- ℹ️ Información debajo:
  - Título grande
  - Ubicación y fecha
  - Descripción de la foto
- ✕ Botón cerrar en esquina superior

## 🎨 Estilo Visual

### Paleta de Colores
```css
- Background: #000000 (Negro puro)
- Text: #ffffff (Blanco)
- Secondary Text: #cccccc (Gris claro)
- Meta Text: #999999 (Gris medio)
- Borders: rgba(255, 255, 255, 0.3) (Blanco transparente)
```

### Tipografía
- **Títulos**: Playfair Display (serif elegante)
- **Texto**: Helvetica Neue (sans-serif limpia)
- **Tamaños responsive** con clamp()

### Efectos
- ✨ Hover: `transform: translateY(-10px)`
- 🔍 Zoom en imágenes: `scale(1.05)`
- ⏱️ Transiciones suaves: 0.3s - 0.6s
- 💫 Fade in en modal

## 📸 Estructura de Datos de Fotos

Cada foto en el array `wildlifePhotos` tiene:

```typescript
{
  id: number,              // ID único
  src: string,            // Path de la imagen
  title: string,          // Título artístico
  location: string,       // Ubicación donde se tomó
  date: string,          // Fecha (formato: "Month Year")
  description: string    // Descripción breve
}
```

### Ejemplo:
```typescript
{
  id: 1,
  src: '/images/wildlife/eagle-1.jpg',
  title: 'Silent Guardian',
  location: 'Tofino, British Columbia',
  date: 'March 2024',
  description: 'Bald eagle perched on ancient cedar'
}
```

## 📁 Imágenes Necesarias

Coloca tus fotos en `/public/images/wildlife/gallery/`:

### Landing
- `wildlife-landing.jpg` - Imagen principal (horizontal, 1920x1080+)

### Portfolio
- Las imágenes se cargan automáticamente desde `/src/data/wildlifeImages.json`
- Todas las fotos están en `/public/images/wildlife/gallery/`
- No necesitas agregar manualmente cada foto al código

**Nota**: Las fotos del portfolio pueden ser verticales u horizontales, el masonry layout se adapta automáticamente

## 🔄 Estructura de Archivos

```
my-art/wildlife-photography/
├── page.tsx                    # Landing page principal
├── gallery/
│   ├── page.tsx               # Página de galería
│   └── metadata.ts            # SEO metadata para galería
├── styles.ts                  # Estilos compartidos
├── photoDetails.json          # Detalles opcionales de fotos
└── README.md                  # Esta documentación
```

## 🔒 Protección de Imágenes

Las imágenes están protegidas contra descarga:

```tsx
<Image
  onContextMenu={(e) => e.preventDefault()} // No right-click
  draggable={false}                         // No drag
  style={{
    userSelect: 'none',                     // No selección
    WebkitUserDrag: 'none'                  // No drag en Safari
  }}
/>
```

## ✏️ Cómo Agregar/Editar Fotos

### Agregar nuevas fotos:

1. Sube la imagen a `/public/images/wildlife/gallery/`
2. Ejecuta el script para regenerar la lista:
   ```bash
   node scripts/generateImageList.js
   ```
3. Las fotos aparecerán automáticamente en la galería

### Agregar información a una foto (opcional):

1. Edita `/src/app/my-art/wildlife-photography/photoDetails.json`
2. Agrega un objeto con el nombre del archivo:

```json
{
  "filename": "A7T01234.jpg",
  "title": "Título artístico",
  "location": "Ubicación, BC",
  "date": "Mes Año",
  "description": "Descripción breve"
}
```

### Cambiar la imagen del landing:

Reemplaza `/public/images/wildlife/wildlife-landing.jpg` con tu imagen preferida

## 🎯 Diferencias vs Diseño Anterior

| Aspecto | Nuevo (Separado) | Anterior (Estado) |
|---------|------------------|-------------------|
| **URLs** | 2 páginas separadas | 1 página con estados |
| **Landing** | `/my-art/wildlife-photography` | Vista condicional |
| **Galería** | `/my-art/wildlife-photography/gallery` | Vista condicional |
| **Navegación** | Next.js Link (real) | setState() |
| **Navegación Browser** | ✅ Funciona | ❌ No funciona |
| **URLs Compartibles** | ✅ Sí | ❌ No |
| **Imágenes** | `<img>` nativo | ProtectedImage |
| **Performance** | ✅ Mejor | Estado innecesario |
| **Masonry Layout** | ✅ CSS columns | CSS columns |

## 🚀 Uso

```bash
cd camilalonart
npm run dev
```

### Navegación:
1. Visita: `http://localhost:3000/my-art/wildlife-photography`
2. Verás la landing page con imagen hero
3. Click en "View Gallery" → navega a `/gallery`
4. Explora la galería con masonry layout
5. Click en cualquier foto para modal
6. Click "← Back" para regresar al landing
7. Click home icon para ir al inicio

## 💡 Tips

### Para mejores resultados:
- Usa fotos verticales (4:5 ratio) para el portfolio
- Mantén los títulos cortos y artísticos
- Las descripciones deben ser breves (1-2 líneas)
- Usa fechas en formato "Month Year" para consistencia
- Agrega ubicaciones específicas para contexto

### Protección adicional:
Si quieres más protección, considera:
- Agregar marca de agua sutil
- Reducir resolución de las imágenes web
- Guardar originales en carpeta separada

## 📝 Personalización Rápida

### Cambiar título de landing:
Edita `/my-art/wildlife-photography/page.tsx`:
```tsx
<LandingTitle>
  Wild<br />Life
</LandingTitle>
```

### Cambiar texto del botón:
```tsx
<EnterButton as="a">
  View Gallery
</EnterButton>
```

### Cambiar título de galería:
Edita `/my-art/wildlife-photography/gallery/page.tsx`:
```tsx
<h1>Wildlife Portfolio</h1>
<p>A personal collection of wildlife encounters across British Columbia</p>
```

### Cambiar colores:
Edita `styles.ts`:
```typescript
background: #000000;  // Fondo negro
color: #ffffff;       // Texto blanco
```

---

## ✅ Ventajas del Nuevo Diseño

1. **URLs limpias y compartibles**: Cada vista tiene su propia URL
2. **Mejor SEO**: Cada página tiene su propio metadata
3. **Navegación browser**: Los botones back/forward funcionan correctamente
4. **Más simple**: No necesita gestión de estado compleja
5. **Mejor performance**: Carga solo lo necesario por página
6. **Masonry automático**: Las imágenes se organizan perfectamente
7. **Protección de imágenes**: Right-click y drag deshabilitado

---

**Este diseño está completamente separado del resto del sitio y representa tu trabajo artístico personal de fotografía de vida salvaje.**
