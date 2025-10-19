# Wildlife Photography - Portafolio Artístico Personal

Esta sección es tu **portafolio artístico personal** de fotografía de vida salvaje, **NO es un servicio comercial**. El diseño está inspirado en galerías de arte minimalistas y templates premium.

## 🎨 Concepto del Diseño

### Experiencia de Usuario
1. **Landing Page** - Una sola imagen impactante con título grande
2. **Hamburger Menu** - Navegación flotante en la esquina superior derecha
3. **Portfolio Page** - Galería de proyectos con información de cada foto
4. **Modal de Imagen** - Vista en calidad completa sin opción de descarga

### Inspiración
Diseño basado en el template de Wix que guardaste, adaptado para mostrar tu trabajo artístico de forma elegante y minimalista.

## 📋 Características

### Landing Page
- ✨ **Una sola imagen hero** que ocupa toda la pantalla
- 📝 **Título grande** en Playfair Display
- 🔘 **Botón "View Portfolio"** para entrar a la galería
- 🎨 Efecto de overlay oscuro para legibilidad

### Hamburger Menu
- 🍔 Icono flotante en esquina superior derecha
- ⚫ Fondo semi-transparente con blur
- 📱 Menú full-screen al hacer click
- 🔗 Navegación a:
  - Home (landing page)
  - Portfolio (galería)
  - My Art (volver a sección general)
  - Photography Services (servicios)

### Portfolio Grid
- 🖼️ **Grid responsive** (3 columnas → 2 → 1)
- 📸 Cada foto muestra:
  - **Título** (ej: "Silent Guardian")
  - **Ubicación** (ej: "Tofino, British Columbia")
  - **Fecha** (ej: "March 2024")
- ↗️ Efecto hover: la imagen se eleva y hace zoom
- 👆 Click para abrir en modal

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

Coloca tus fotos en `/public/images/wildlife/`:

### Landing
- `hero.jpg` - Imagen principal (horizontal, 1920x1080+)

### Portfolio (12 fotos)
- `eagle-1.jpg`, `eagle-2.jpg`
- `bear-1.jpg`, `bear-2.jpg`
- `whale-1.jpg`, `whale-2.jpg`
- `deer-1.jpg`, `deer-2.jpg`
- `owl-1.jpg`
- `fox-1.jpg`
- `seal-1.jpg`
- `wolf-1.jpg`

**Nota**: Todas las fotos del portfolio son verticales (ratio 4:5)

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

### Agregar una nueva foto:

1. Sube la imagen a `/public/images/wildlife/`
2. Edita `page.tsx`, busca el array `wildlifePhotos`
3. Agrega un nuevo objeto:

```typescript
{
  id: 13,
  src: '/images/wildlife/nueva-foto.jpg',
  title: 'Tu Título',
  location: 'Ubicación, BC',
  date: 'Mes Año',
  description: 'Descripción de la foto'
}
```

### Editar información de una foto existente:

Simplemente edita los campos `title`, `location`, `date`, o `description` en el array.

## 🎯 Diferencias vs Diseño Anterior

| Aspecto | Nuevo (Artístico) | Anterior (Comercial) |
|---------|-------------------|----------------------|
| **Propósito** | Portafolio personal | Venta de servicios |
| **Landing** | 1 imagen + título | Hero con descripción |
| **Navegación** | Hamburger menu | Scroll sections |
| **Portfolio** | Grid con metadata | Masonry gallery |
| **Información** | Título, lugar, fecha | Captions simples |
| **Modal** | Full quality protegido | Componente estándar |
| **Comercial** | NO | Sí (servicios, precios) |
| **Background** | Negro puro (#000) | Blanco (#fff) |

## 🚀 Uso

```bash
cd camilalonart
npm run dev
```

Visita: `http://localhost:3000/my-art/wildlife-photography`

### Navegación:
1. Verás la landing page con una imagen hero
2. Click en "View Portfolio" o usa el menú hamburger
3. Explora la galería de fotos
4. Click en cualquier foto para verla en grande
5. Click fuera del modal o en × para cerrar

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
Busca en `page.tsx`:
```tsx
<LandingTitle>
  Wildlife<br />Photography
</LandingTitle>
```

### Cambiar texto del botón:
```tsx
<EnterButton>
  View Portfolio
</EnterButton>
```

### Cambiar título de portfolio:
```tsx
<h1>Wildlife Portfolio</h1>
<p>A personal collection...</p>
```

---

**Este diseño está completamente separado del resto del sitio y representa tu trabajo artístico personal de fotografía de vida salvaje.**
