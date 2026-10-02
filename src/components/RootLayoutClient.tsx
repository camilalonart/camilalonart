'use client';

import React from 'react';
import { GlobalStyles } from '../styles/globalStyles';
import ThemeProvider from './ThemeProvider';
import { useTranslation } from '../i18n/TranslationContext';

interface RootLayoutClientProps {
  children: React.ReactNode;
}

export default function RootLayoutClient({ 
  children,
}: RootLayoutClientProps) {
  const { t } = useTranslation();

  return (
    <ThemeProvider>
      <GlobalStyles />
      <a className="skip-link" href="#main-content">{t('accessibility.skipToContent')}</a>
      <main id="main-content" tabIndex={-1} aria-label={t('accessibility.mainContent')}>
        {children}
      </main>
    </ThemeProvider>
  );
} 