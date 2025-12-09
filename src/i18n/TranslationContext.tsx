'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import en from './locales/en.json';
import es from './locales/es.json';

type Locale = 'en' | 'es';

interface TranslationContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  isHydrated: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const translations: Record<Locale, typeof en> = {
  en,
  es,
};

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Load saved locale from localStorage after hydration
    const savedLocale = localStorage.getItem('locale') as Locale | null;
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'es')) {
      setLocaleState(savedLocale);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'es') {
        setLocaleState('es');
        localStorage.setItem('locale', 'es');
      }
    }
    setIsHydrated(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
  }, []);

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let value: unknown = translations[locale];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        // Only warn in development
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Translation key not found: ${key}`);
        }
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  }, [locale]);

  return (
    <TranslationContext.Provider value={{ locale, setLocale, t, isHydrated }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }
  return context;
}
