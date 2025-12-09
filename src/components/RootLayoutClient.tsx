'use client';

import React from 'react';
import { GlobalStyles } from '../styles/globalStyles';
import ThemeProvider from './ThemeProvider';

interface RootLayoutClientProps {
  children: React.ReactNode;
}

export default function RootLayoutClient({ 
  children,
}: RootLayoutClientProps) {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <main>
        {children}
      </main>
    </ThemeProvider>
  );
} 