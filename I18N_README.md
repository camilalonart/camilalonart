# Sistema de Internacionalización (i18n)

Este proyecto ahora soporta **múltiples idiomas** (Inglés y Español) con un sistema completo de internacionalización.

## 🌍 Idiomas Disponibles

- 🇺🇸 **English** (en) - Idioma por defecto
- 🇪🇸 **Español** (es)

## 📁 Estructura de Archivos

```
src/
├── i18n/
│   ├── TranslationContext.tsx    # Context provider y hook
│   └── locales/
│       ├── en.json                # Traducciones en inglés
│       └── es.json                # Traducciones en español
└── components/
    └── LanguageSwitcher.tsx       # Selector de idioma UI
```

## 🎨 Selector de Idioma

El selector de idioma es un componente elegante y moderno que:

✨ **Características:**
- Dropdown animado con banderas
- Persiste la selección en localStorage
- Detecta automáticamente el idioma del navegador
- Responsive (oculta el nombre del idioma en móviles pequeños)
- Diseño glassmorphism con blur
- Transiciones suaves

📍 **Ubicación:**
- Aparece en el navigation bar (esquina superior derecha)
- Visible en todas las páginas del sitio

## 🔧 Cómo Usar las Traducciones

### En un Componente React

```tsx
'use client';

import { useTranslation } from '../i18n/TranslationContext';

export default function MiComponente() {
  const { t, locale, setLocale } = useTranslation();

  return (
    <div>
      <h1>{t('home.title')}</h1>
      <p>{t('home.subtitle')}</p>
      <button onClick={() => setLocale('es')}>
        Cambiar a Español
      </button>
    </div>
  );
}
```

### Funciones Disponibles

- **`t(key)`**: Traduce una clave
  ```tsx
  t('home.title') // "Camilalonart"
  t('home.petPhotography.title') // "Pet Photography" o "Fotografía de Mascotas"
  ```

- **`locale`**: Idioma actual ('en' o 'es')
  ```tsx
  console.log(locale); // "es"
  ```

- **`setLocale(newLocale)`**: Cambia el idioma
  ```tsx
  setLocale('en'); // Cambia a inglés
  setLocale('es'); // Cambia a español
  ```

## 📝 Estructura de las Traducciones

Las traducciones están organizadas por secciones:

```json
{
  "nav": {
    "home": "Home",
    "photography": "Photography",
    ...
  },
  "home": {
    "title": "Camilalonart",
    "subtitle": "Professional photographer...",
    "petPhotography": {
      "title": "Pet Photography",
      "description": "Capturing the unique..."
    },
    ...
  },
  "common": {
    "learnMore": "Learn More",
    "bookNow": "Book Now",
    ...
  }
}
```

## ➕ Agregar Nuevas Traducciones

### 1. Agregar a `en.json`:

```json
{
  "home": {
    ...existing keys...,
    "newSection": {
      "title": "New Section",
      "description": "This is a new section"
    }
  }
}
```

### 2. Agregar la traducción en `es.json`:

```json
{
  "home": {
    ...existing keys...,
    "newSection": {
      "title": "Nueva Sección",
      "description": "Esta es una nueva sección"
    }
  }
}
```

### 3. Usar en tu componente:

```tsx
<h2>{t('home.newSection.title')}</h2>
<p>{t('home.newSection.description')}</p>
```

## 🌐 Agregar un Nuevo Idioma

### 1. Crear archivo de traducción:

```bash
touch src/i18n/locales/fr.json
```

### 2. Agregar traducciones:

```json
{
  "nav": {
    "home": "Accueil",
    "photography": "Photographie",
    ...
  },
  ...
}
```

### 3. Actualizar `TranslationContext.tsx`:

```tsx
import fr from './locales/fr.json';

type Locale = 'en' | 'es' | 'fr';

const translations = {
  en,
  es,
  fr,
};
```

### 4. Actualizar `LanguageSwitcher.tsx`:

```tsx
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];
```

## 🎯 Páginas Traducidas

Las siguientes páginas ya están traducidas:

- ✅ **Homepage** (`/`) - Completamente traducida
  - Hero section
  - Photography Services (5 tarjetas)
  - My Art (4 tarjetas)
  - Creative Services (4 tarjetas)
  - Tech (2 tarjetas)

### Próximas Páginas a Traducir:

- 📝 Pet Photography page
- 📝 Wedding & Couples page
- 📝 Headshots page
- 📝 Family & Maternity page
- 📝 Wildlife Photography page
- 📝 Otras secciones de My Art
- 📝 Creative Services pages
- 📝 Tech pages
- 📝 Footer

## 💡 Tips

### Claves de Traducción

- Usa nombres descriptivos: `home.petPhotography.title` en vez de `pp1`
- Organiza por sección/página
- Usa estructura anidada para mantener orden
- Sé consistente con los nombres

### Valores por Defecto

Si una clave no existe, el sistema devuelve la clave misma:

```tsx
t('non.existent.key') // Devuelve "non.existent.key"
// Y muestra un warning en consola
```

### Persistencia

El idioma seleccionado se guarda en `localStorage` y persiste entre sesiones.

### Detección Automática

Al cargar la página por primera vez, el sistema:
1. Verifica si hay un idioma guardado en localStorage
2. Si no, detecta el idioma del navegador
3. Si es español, usa 'es', sino usa 'en' (default)

## 🚀 Ejemplos de Uso

### Texto Simple

```tsx
<h1>{t('home.title')}</h1>
```

### Texto Anidado

```tsx
<h3>{t('home.petPhotography.title')}</h3>
<p>{t('home.petPhotography.description')}</p>
```

### Botones

```tsx
<button>{t('common.bookNow')}</button>
<button>{t('common.learnMore')}</button>
```

### Condicional por Idioma

```tsx
const { locale } = useTranslation();

{locale === 'es' && <p>Contenido solo en español</p>}
{locale === 'en' && <p>English-only content</p>}
```

## 🎨 Estilos del Selector

El `LanguageSwitcher` tiene estos estilos personalizables:

- **Botón**: Glassmorphism con blur
- **Dropdown**: Fondo blanco con sombra
- **Hover**: Animaciones suaves
- **Active**: Resaltado en color dorado (#A97D1E)
- **Responsive**: Se adapta a móviles

## 📱 Responsive Design

- **Desktop**: Muestra bandera + nombre + icono
- **Mobile** (< 480px): Solo bandera + icono
- **El dropdown siempre muestra nombre completo**

## 🔍 Debugging

Para ver el idioma actual y keys disponibles:

```tsx
const { locale, t } = useTranslation();

console.log('Current locale:', locale);
console.log('Translation:', t('home.title'));
```

## 📚 Recursos

- [React Context API](https://react.dev/reference/react/useContext)
- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [Navigator.language](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language)

---

**Nota**: Este sistema es escalable y puede soportar tantos idiomas como necesites. Solo agrega nuevos archivos JSON en `/src/i18n/locales/` y actualiza los componentes correspondientes.
