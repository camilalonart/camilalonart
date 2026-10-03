'use client';

import React from 'react';
import { GlobalStyles } from '../styles/globalStyles';
import ThemeProvider from './ThemeProvider';
import { useTranslation } from '../i18n/TranslationContext';
import { usePathname } from 'next/navigation';
import { stripLocale } from '@/i18n/routing';
import FloatingLanguageSwitcher from './FloatingLanguageSwitcher';
import LanguagePreferenceNotice from './LanguagePreferenceNotice';

interface RootLayoutClientProps {
  children: React.ReactNode;
}

export default function RootLayoutClient({ 
  children,
}: RootLayoutClientProps) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const path = stripLocale(pathname || '/').replace(/\/$/, '') || '/';
  const hasHeaderLanguageControl = path === '/'
    || path === '/photography'
    || /^\/art(?:\/|$)/.test(path)
    || /^\/art-experiences(?:\/|$)/.test(path)
    || /^\/photography\/(pets|wedding-couples|headshots|family-maternity)$/.test(path);

  return (
    <ThemeProvider>
      <GlobalStyles />
      <a className="skip-link" href="#main-content">{t('accessibility.skipToContent')}</a>
      <main id="main-content" tabIndex={-1} aria-label={t('accessibility.mainContent')}>
        {children}
      </main>
      {!hasHeaderLanguageControl && <FloatingLanguageSwitcher />}
      <LanguagePreferenceNotice />
    </ThemeProvider>
  );
} 