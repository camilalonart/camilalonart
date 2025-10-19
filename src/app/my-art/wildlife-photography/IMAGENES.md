# Guía de Imágenes para Wildlife Photography

## 📁 Estructura de Carpetas

Crea la siguiente estructura en `/public/images/wildlife/`:

```
public/
└── images/
    └── wildlife/
        ├── hero.jpg              # Imagen principal del hero
        ├── about.jpg             # Foto del fotógrafo
        ├── divider.jpg           # Imagen divisoria
        ├── featured-1.jpg        # Imagen destacada 1
        ├── featured-2.jpg        # Imagen destacada 2
        ├── featured-3.jpg        # Imagen destacada 3
        ├── eagle-1.jpg          # Galería
        ├── eagle-2.jpg
        ├── bear-1.jpg
        ├── bear-2.jpg
        ├── whale-1.jpg
        ├── whale-2.jpg
        ├── deer-1.jpg
        ├── deer-2.jpg
        ├── owl-1.jpg
        ├── fox-1.jpg
        ├── seal-1.jpg
        └── wolf-1.jpg
```

## 📸 Especificaciones de Imágenes

### Hero Image (`hero.jpg`)
- **Orientación**: Horizontal (Landscape)
- **Dimensiones mínimas**: 1920x1080px
- **Ratio recomendado**: 16:9
- **Peso máximo**: 500KB
- **Descripción**: Imagen impactante de vida salvaje, preferiblemente con espacio para texto
- **Ejemplos**: Paisaje con animales, close-up dramático, escena de acción

### About Image (`about.jpg`)
- **Orientación**: Vertical (Portrait)
- **Dimensiones mínimas**: 800x1067px
- **Ratio recomendado**: 3:4
- **Peso máximo**: 300KB
- **Descripción**: Foto del fotógrafo en acción o retrato profesional
- **Ejemplos**: Con cámara en la naturaleza, observando animales

### Divider Image (`divider.jpg`)
- **Orientación**: Horizontal (Landscape)
- **Dimensiones mínimas**: 1920x600px
- **Ratio recomendado**: 16:5 o similar
- **Peso máximo**: 400KB
- **Descripción**: Imagen panorámica de paisaje con vida salvaje
- **Ejemplos**: Amanecer/atardecer, montañas, costa

### Featured Images (1-3)
- **Orientación**: Vertical (Portrait)
- **Dimensiones mínimas**: 800x1067px
- **Ratio recomendado**: 3:4
- **Peso máximo**: 250KB cada una
- **Descripción**: Tus mejores trabajos de vida salvaje
- **Ejemplos**: 
  - featured-1.jpg: Águila en vuelo
  - featured-2.jpg: Oso pescando
  - featured-3.jpg: Orca saltando

### Gallery Images (eagle, bear, whale, etc.)
- **Orientación**: Variada (Mix de portrait y landscape)
- **Dimensiones mínimas**: 600x800px
- **Peso máximo**: 200KB cada una
- **Descripción**: Colección diversa de fotografías de vida salvaje
- **Distribución sugerida**:
  - 40% Portrait (3:4)
  - 40% Landscape (4:3)
  - 20% Square (1:1)

## 🎨 Directrices de Estilo

### Composición
- ✅ Alta calidad y nitidez
- ✅ Buena iluminación natural
- ✅ Sujeto bien enfocado
- ✅ Fondos limpios o desenfocados
- ❌ Evitar sobre-saturación
- ❌ Evitar filtros excesivos
- ❌ Evitar marcas de agua visibles

### Temas Recomendados
1. **Retratos de Animales**: Close-ups expresivos
2. **Acción**: Animales en movimiento, cazando, volando
3. **Comportamiento**: Interacciones naturales
4. **Hábitat**: Animales en su entorno natural
5. **Detalles**: Texturas, ojos, plumaje

### Paleta de Colores
- Colores naturales y realistas
- Buen contraste para destacar sobre fondos blancos
- Evitar tonos artificiales o neón

## 🛠️ Optimización

### Antes de Subir

1. **Redimensiona** las imágenes a las dimensiones recomendadas
2. **Comprime** usando herramientas como:
   - TinyPNG (https://tinypng.com/)
   - ImageOptim (Mac)
   - Squoosh (https://squoosh.app/)
3. **Formato**: Guarda como JPG con calidad 85-90%
4. **Nombres**: Usa nombres descriptivos en minúsculas con guiones

### Herramientas Recomendadas

```bash
# Usando ImageMagick para redimensionar y optimizar
convert original.jpg -resize 1920x1080^ -gravity center -extent 1920x1080 -quality 85 hero.jpg

# Para imágenes portrait
convert original.jpg -resize 800x1067^ -gravity center -extent 800x1067 -quality 85 featured-1.jpg
```

## 📝 Checklist

Antes de lanzar, verifica:

- [ ] Todas las imágenes están en `/public/images/wildlife/`
- [ ] Hero image es horizontal y de alta resolución
- [ ] Featured images son verticales (3:4)
- [ ] Gallery tiene mix de orientaciones
- [ ] Todas las imágenes están optimizadas (<500KB)
- [ ] Nombres de archivos coinciden con el código
- [ ] Las imágenes se ven bien en fondos blancos y oscuros

## 🎯 Imágenes Prioritarias

Si tienes tiempo limitado, empieza con estas:

1. **hero.jpg** - La más importante, primera impresión
2. **featured-1.jpg, featured-2.jpg, featured-3.jpg** - Tus mejores trabajos
3. **about.jpg** - Conexión personal
4. El resto de la galería se puede agregar gradualmente

## 💡 Consejos Profesionales

- Usa tus MEJORES fotografías para featured
- Varía especies y estilos en la galería
- Considera la estacionalidad (mezcla estaciones)
- Incluye diferentes hábitats (bosque, costa, montaña)
- Muestra variedad técnica (portraits, action, landscape)

## 🔄 Actualización Futura

Para agregar más imágenes a la galería:

1. Optimiza la nueva imagen
2. Sube a `/public/images/wildlife/`
3. Edita `page.tsx`, sección `galleryImages`
4. Agrega el path de la nueva imagen

```typescript
const galleryImages = [
  // ... imágenes existentes
  '/images/wildlife/nueva-imagen.jpg', // ← Agregar aquí
];
```

---

**Nota**: Las imágenes son fundamentales para el impacto de esta sección. Tómate el tiempo para seleccionar y optimizar las mejores fotografías de tu portafolio.
