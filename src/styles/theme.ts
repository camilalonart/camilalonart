export const theme = {
  colors: {
    primary: {
      main: '#1A1A1A',
      light: '#333333',
      dark: '#000000',
    },
    secondary: {
      main: '#C9A050',
      light: '#E5C675',
      dark: '#A67C00',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#666666',
      light: '#FFFFFF',
      muted: 'rgba(255, 255, 255, 0.7)',
    },
    background: {
      main: '#FFFFFF',
      light: '#F8F8F8',
      dark: '#1A1A1A',
      gradient: 'linear-gradient(to right, #1A1A1A, #333333)',
    },
    accent: {
      success: '#4A6741',
      error: '#A63A3A',
      warning: '#C9A050',
    },
  },
  typography: {
    fontFamily: {
      primary: "'Montserrat', sans-serif",
      secondary: "'Cormorant Garamond', serif",
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.75rem',
      '3xl': '2.25rem',
      '4xl': '3rem',
      '5xl': '4rem',
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    letterSpacing: {
      tight: '-0.02em',
      normal: '0',
      wide: '0.02em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
    '5xl': '8rem',
  },
  borderRadius: {
    none: '0',
    sm: '2px',
    md: '4px',
    lg: '6px',
  },
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  transitions: {
    default: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fast: '0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.1)',
    md: '0 4px 12px rgba(0, 0, 0, 0.08)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
    xl: '0 12px 32px rgba(0, 0, 0, 0.16)',
  },
  effects: {
    hover: {
      transform: 'translateY(-4px)',
      shadow: '0 12px 32px rgba(0, 0, 0, 0.16)',
    },
    active: {
      transform: 'translateY(-2px)',
      shadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
    },
  },
} as const;

export type Theme = typeof theme;
