'use client';

import React from 'react';
import StyledComponentsRegistry from '../lib/registry';
import { GlobalStyles } from '../styles/globalStyles';
import Navigation from './Navigation';
import ThemeProvider from './ThemeProvider';
import ImageProtection from './ImageProtection';

interface RootLayoutClientProps {
  children: React.ReactNode;
  montserratClass: string;
  cormorantClass: string;
}

export default function RootLayoutClient({ 
  children, 
  montserratClass, 
  cormorantClass 
}: RootLayoutClientProps) {
  return (
    <html lang="en" className={`${montserratClass} ${cormorantClass}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="Professional photographer based in Vancouver, BC" />
        
        {/* Security Headers */}
        <meta httpEquiv="Content-Security-Policy" content="img-src 'self' data: blob:; default-src 'self' 'unsafe-inline';" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="Referrer-Policy" content="same-origin" />
        <meta httpEquiv="Cache-Control" content="no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <GlobalStyles />
            <ImageProtection />
            <Navigation />
            <main style={{ paddingTop: '80px' }}>
              {children}
            </main>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
} 