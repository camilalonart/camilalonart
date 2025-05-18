'use client';

import React from 'react';
import { GlobalStyles } from '../styles/globalStyles';
import Navigation from './Navigation';
import ThemeProvider from './ThemeProvider';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname() || '';
  
  // Add paths where navigation should be hidden
  const hideNavigationPaths = [
    '/photography/wedding-couples',
    '/photography/pets',
    '/photography/wedding-couples/gallery/'
  ];

  // Check if current path should hide navigation
  const shouldHideNavigation = hideNavigationPaths.some(path => pathname.startsWith(path));

  return (
    <ThemeProvider>
      <GlobalStyles />
      {!shouldHideNavigation && <Navigation />}
      <main style={{ 
        paddingTop: shouldHideNavigation ? '0' : '80px'
      }}>
        {children}
      </main>
    </ThemeProvider>
  );
} 