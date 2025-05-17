'use client';

import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  /* Modern CSS Reset */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Improve text rendering */
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-montserrat), sans-serif;
    font-size: ${theme.typography.fontSize.base};
    line-height: 1.6;
    font-weight: ${theme.typography.fontWeight.light};
    color: ${theme.colors.text.primary};
    background-color: ${theme.colors.background.main};
    letter-spacing: ${theme.typography.letterSpacing.wide};
  }

  /* Improve media defaults */
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
    user-select: none;
  }

  /* Remove built-in form typography styles */
  input, button, textarea, select {
    font: inherit;
    letter-spacing: inherit;
  }

  /* Avoid text overflows */
  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  /* Create a root stacking context */
  #root, #__next {
    isolation: isolate;
  }

  /* Basic link styles */
  a {
    color: inherit;
    text-decoration: none;
    transition: ${theme.transitions.default};
    position: relative;

    &:hover {
      color: ${theme.colors.secondary.main};
    }

    &.underline {
      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: currentColor;
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      &:hover::after {
        transform: scaleX(1);
        transform-origin: left;
      }
    }
  }

  /* Smooth transitions */
  button {
    cursor: pointer;
    border: none;
    background: none;
    transition: ${theme.transitions.default};
    letter-spacing: ${theme.typography.letterSpacing.wide};

    &:focus-visible {
      outline: 2px solid ${theme.colors.secondary.main};
      outline-offset: 2px;
    }
  }

  /* Typography scale */
  h1, h2, h3 {
    font-family: var(--font-cormorant), serif;
    font-weight: ${theme.typography.fontWeight.light};
    line-height: 1.2;
    letter-spacing: ${theme.typography.letterSpacing.wider};
    text-transform: uppercase;
  }

  h1 {
    font-size: ${theme.typography.fontSize['5xl']};
    margin-bottom: ${theme.spacing['2xl']};
  }

  h2 {
    font-size: ${theme.typography.fontSize['4xl']};
    margin-bottom: ${theme.spacing.xl};
  }

  h3 {
    font-size: ${theme.typography.fontSize['3xl']};
    margin-bottom: ${theme.spacing.lg};
  }

  h4, h5, h6 {
    font-family: var(--font-montserrat), sans-serif;
    font-weight: ${theme.typography.fontWeight.light};
    letter-spacing: ${theme.typography.letterSpacing.wide};
    text-transform: uppercase;
  }

  h4 {
    font-size: ${theme.typography.fontSize['2xl']};
    margin-bottom: ${theme.spacing.md};
  }

  h5 {
    font-size: ${theme.typography.fontSize.xl};
    margin-bottom: ${theme.spacing.md};
  }

  h6 {
    font-size: ${theme.typography.fontSize.lg};
    margin-bottom: ${theme.spacing.md};
  }

  p {
    margin-bottom: ${theme.spacing.lg};
    font-weight: ${theme.typography.fontWeight.light};
    line-height: 1.8;
  }

  /* Selection styles */
  ::selection {
    background-color: ${theme.colors.secondary.main};
    color: ${theme.colors.text.light};
  }

  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.background.light};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary.light};
    transition: ${theme.transitions.default};

    &:hover {
      background: ${theme.colors.primary.main};
    }
  }

  /* Container styles */
  .container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 ${theme.spacing.xl};
  }
`; 