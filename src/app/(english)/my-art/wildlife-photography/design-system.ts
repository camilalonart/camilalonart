/**
 * WILDLIFE PHOTOGRAPHY - GUÍA DE DISEÑO EXCLUSIVO
 * 
 * Este archivo documenta el sistema de diseño único de la sección Wildlife Photography
 * que es completamente diferente al resto del sitio.
 */

// ============================================================================
// PALETA DE COLORES
// ============================================================================

export const wildlifeColors = {
  // Fondos
  light: '#ffffff',      // Fondo principal claro
  dark: '#1a1a1a',      // Fondo oscuro para contraste
  gray: '#f5f5f5',      // Fondo gris suave
  
  // Texto
  textDark: '#2c2c2c',  // Texto principal
  textLight: '#ffffff', // Texto sobre fondos oscuros
  
  // Acentos
  border: 'rgba(255, 255, 255, 0.1)', // Bordes sutiles
  borderHover: 'rgba(255, 255, 255, 0.3)', // Bordes al hover
  overlay: 'rgba(0, 0, 0, 0.5)', // Overlay de imágenes
};

// ============================================================================
// TIPOGRAFÍA
// ============================================================================

export const wildlifeTypography = {
  // Familias
  heading: "'Playfair Display', Georgia, serif",
  bodyFont: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  
  // Tamaños (usando clamp para responsive)
  hero: 'clamp(3rem, 8vw, 6rem)',
  h1: 'clamp(2.5rem, 5vw, 4rem)',
  h2: 'clamp(2rem, 4vw, 3rem)',
  h3: 'clamp(1.8rem, 3vw, 2.5rem)',
  body: 'clamp(1rem, 2vw, 1.3rem)',
  bodyLarge: 'clamp(1.1rem, 2vw, 1.4rem)',
  
  // Pesos
  light: 300,
  regular: 400,
  semibold: 600,
  bold: 700,
  
  // Espaciado de letras
  tight: '0.02em',
  normal: '0.03em',
  wide: '0.05em',
  extraWide: '0.1em',
};

// ============================================================================
// ESPACIADO
// ============================================================================

export const wildlifeSpacing = {
  // Secciones
  sectionPaddingDesktop: '100px 40px',
  sectionPaddingMobile: '60px 20px',
  
  // Gaps
  gridGap: '20px',
  gridGapLarge: '40px',
  cardGap: '30px',
  
  // Márgenes
  marginSmall: '1rem',
  marginMedium: '2rem',
  marginLarge: '3rem',
  marginXLarge: '4rem',
};

// ============================================================================
// EFECTOS Y TRANSICIONES
// ============================================================================

export const wildlifeEffects = {
  // Transiciones
  fast: '0.3s ease',
  medium: '0.6s ease',
  
  // Transforms
  hoverScale: 'scale(1.08)',
  hoverScaleSubtle: 'scale(1.05)',
  hoverLift: 'translateY(-5px)',
  
  // Sombras
  cardShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  buttonShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  
  // Overlays
  imageOverlay: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%)',
  heroOverlay: 'linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%)',
  captionGradient: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)',
};

// ============================================================================
// LAYOUTS
// ============================================================================

export const wildlifeLayouts = {
  // Contenedores máximos
  maxWidthNarrow: '800px',
  maxWidthMedium: '900px',
  maxWidthWide: '1200px',
  maxWidthFull: '1400px',
  
  // Grid columns
  gridColumns3: 'repeat(3, 1fr)',
  gridColumns2: 'repeat(2, 1fr)',
  gridColumns1: '1fr',
  
  // Aspect ratios
  portraitRatio: '3/4',
  landscapeRatio: '4/3',
  squareRatio: '1/1',
  
  // Breakpoints
  tablet: '1024px',
  mobile: '768px',
  small: '640px',
};

// ============================================================================
// COMPONENTES ESPECÍFICOS
// ============================================================================

export const wildlifeComponents = {
  // Hero
  heroHeight: '100vh',
  heroMinHeight: '700px',
  
  // Botones
  buttonPadding: '15px 50px',
  buttonBorder: '2px solid currentColor',
  
  // Cards
  cardPadding: '60px 30px',
  cardBorder: '1px solid rgba(255, 255, 255, 0.1)',
  
  // Divider
  dividerWidth: '80px',
  dividerHeight: '2px',
  
  // Gallery
  masonryColumns: {
    desktop: 3,
    tablet: 2,
    mobile: 1,
  },
};

// ============================================================================
// ANIMACIONES
// ============================================================================

export const wildlifeAnimations = {
  bounce: `
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateX(-50%) translateY(0);
      }
      40% {
        transform: translateX(-50%) translateY(-10px);
      }
      60% {
        transform: translateX(-50%) translateY(-5px);
      }
    }
  `,
  
  fadeIn: `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
};

// ============================================================================
// DIFERENCIAS CON EL RESTO DEL SITIO
// ============================================================================

/**
 * WILDLIFE PHOTOGRAPHY vs RESTO DEL SITIO
 * 
 * 1. COLORES:
 *    Wildlife: Blanco/Negro minimalista, galería de arte
 *    Sitio: Tonos tierra cálidos (#1a140f, #8b7355)
 * 
 * 2. TIPOGRAFÍA:
 *    Wildlife: Playfair Display (serif elegante)
 *    Sitio: Cormorant Garamond
 * 
 * 3. LAYOUT:
 *    Wildlife: Masonry grid, espacios amplios, aire
 *    Sitio: Grid tradicional, cards con sombras
 * 
 * 4. INTERACCIONES:
 *    Wildlife: Zoom sutil, transiciones suaves
 *    Sitio: Elevación 3D, efectos más dramáticos
 * 
 * 5. ESTÉTICA:
 *    Wildlife: Minimalista, premium, galería profesional
 *    Sitio: Cálido, acogedor, artístico
 * 
 * 6. BACKGROUNDS:
 *    Wildlife: Blanco predominante, negro para contraste
 *    Sitio: Marrones oscuros, texturas cálidas
 */

export default {
  colors: wildlifeColors,
  typography: wildlifeTypography,
  spacing: wildlifeSpacing,
  effects: wildlifeEffects,
  layouts: wildlifeLayouts,
  components: wildlifeComponents,
  animations: wildlifeAnimations,
};
