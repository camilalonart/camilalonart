'use client';

import React from 'react';
import styled from 'styled-components';
import { useTranslation } from '@/i18n/TranslationContext';
import type { Locale } from '@/i18n/routing';

interface LanguageSelectorProps {
  currentLanguage?: string;
  onLanguageChange?: (code: string) => void;
  dark?: boolean;
}

const Select = styled.select<{ $dark: boolean }>`
  min-height: 44px;
  padding: 8px 12px;
  color: ${({ $dark }) => $dark ? '#fff' : '#222'};
  background: ${({ $dark }) => $dark ? '#161616' : '#fff'};
  border: 1px solid currentColor;
  border-radius: 6px;
  font: inherit;
  cursor: pointer;
  &:focus-visible { outline: 2px solid #b6884c; outline-offset: 3px; }
`;

export default function LanguageSelector({ onLanguageChange, dark = false }: LanguageSelectorProps) {
  const { locale, setLocale } = useTranslation();
  return (
    <Select
      $dark={dark}
      value={locale}
      aria-label={locale === 'es' ? 'Idioma' : 'Language'}
      onChange={event => {
        setLocale(event.target.value as Locale);
        onLanguageChange?.(event.target.value);
      }}
    >
      <option value="en" lang="en">English</option>
      <option value="es" lang="es">Español</option>
    </Select>
  );
}
