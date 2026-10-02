'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import en from './locales/en.json';
import es from './locales/es.json';
import artEn from './locales/art-content.en.json';
import artEs from './locales/art-content.es.json';
import photographyEn from './locales/photography-content.en.json';
import photographyEs from './locales/photography-content.es.json';
import creativeEn from './locales/creative-content.en.json';
import creativeEs from './locales/creative-content.es.json';
import sharedEn from './locales/shared-content.en.json';
import sharedEs from './locales/shared-content.es.json';
import { usePathname } from 'next/navigation';
import { localeFromPath, localizedPath, routeKey, type Locale } from './routing';
import type { MetadataCatalog } from './metadata-types';

export type { Locale } from './routing';

interface TranslationContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  isHydrated: boolean;
  suggestedLocale: Locale | null;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const translations: Record<Locale, Record<string, unknown>> = {
  en: { ...en, ...photographyEn, ...sharedEn, artContent: artEn, creativeContent: creativeEn },
  es: { ...es, ...photographyEs, ...sharedEs, artContent: artEs, creativeContent: creativeEs },
};

export function TranslationProvider({ children, initialLocale = 'en', metadataCatalog = {} }: {
  children: ReactNode;
  initialLocale?: Locale;
  metadataCatalog?: MetadataCatalog;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [isHydrated, setIsHydrated] = useState(false);
  const [suggestedLocale, setSuggestedLocale] = useState<Locale | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setIsHydrated(true);
    const sync = () => setLocaleState(localeFromPath(window.location.pathname));
    sync();
    if (window.location.pathname === '/') {
      let savedLocale: string | null = null;
      try {
        savedLocale = localStorage.getItem('locale');
      } catch (error) {
        if (!(error instanceof DOMException)) throw error;
        console.warn('Language preference storage is unavailable.', error.name);
      }
      const preferred = savedLocale === 'en' || savedLocale === 'es'
        ? savedLocale
        : navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en';
      if (preferred === 'es') setSuggestedLocale('es');
    }
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  useEffect(() => {
    setLocaleState(localeFromPath(pathname));
  }, [pathname]);

  useEffect(() => {
    document.documentElement.lang = locale;
    if (!isHydrated) return;
    const path = window.location.pathname;
    const text = metadataCatalog[routeKey(path)]?.[locale];
    const canonical = text?.canonical || new URL(localizedPath(`${routeKey(path).replace(/\/$/, '')}/`, locale), 'https://www.camilalonart.com').href;
    if (text) {
      document.title = text.title;
      for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) {
        document.querySelector(selector)?.setAttribute('content', text.description);
      }
      for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) {
        document.querySelector(selector)?.setAttribute('content', text.title);
      }
    }
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical);
    for (const language of ['en', 'es', 'x-default'] as const) {
      const alternate = new URL(canonical);
      alternate.pathname = localizedPath(alternate.pathname, language === 'es' ? 'es' : 'en');
      document.querySelector(`link[rel="alternate"][hreflang="${language}"]`)?.setAttribute('href', alternate.href);
    }
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonical);
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', locale === 'es' ? 'es_CA' : 'en_CA');
    document.querySelector('meta[property="og:locale:alternate"]')?.setAttribute('content', locale === 'es' ? 'en_CA' : 'es_CA');
  }, [locale, isHydrated, pathname, metadataCatalog]);

  const setLocale = useCallback((newLocale: Locale) => {
    if (newLocale !== 'en' && newLocale !== 'es') throw new RangeError('Unsupported site language');
    const { pathname, search, hash } = window.location;
    // Next's supported native History integration updates usePathname without
    // navigating or remounting the page: forms, filters and lightboxes survive.
    window.history.replaceState(null, '', localizedPath(`${pathname}${search}${hash}`, newLocale));
    setLocaleState(newLocale);
    setSuggestedLocale(null);
    try {
      localStorage.setItem('locale', newLocale);
    } catch (error) {
      if (!(error instanceof DOMException)) throw error;
      console.warn('Language preference could not be saved.', error.name);
    }
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
    <TranslationContext.Provider value={{ locale, setLocale, t, isHydrated, suggestedLocale }}>
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
