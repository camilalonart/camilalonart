'use client';

import styled from 'styled-components';
import { useTranslation } from '@/i18n/TranslationContext';
import { usePathname } from 'next/navigation';

const Notice = styled.aside`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  z-index: 90;
  width: fit-content;
  max-width: calc(100% - 2rem);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1rem;
  padding: 0.6rem 1rem;
  border: 1px solid #c8a87a;
  background: #101110;
  color: #f0ede8;
  font-size: 0.8rem;
  box-shadow: 0 4px 20px #0004;

  button {
    min-height: 44px;
    color: #c8a87a;
    padding: 0.25rem 0.5rem;
    text-decoration: underline;
  }
`;

export default function LanguagePreferenceNotice() {
  const { locale, suggestedLocale, setLocale } = useTranslation();
  const pathname = usePathname();
  if (pathname !== '/' || locale !== 'en' || suggestedLocale !== 'es') return null;

  return (
    <Notice aria-label="Language preference">
      <span lang="es">¿Prefieres español?</span>
      <button type="button" lang="es" onClick={() => setLocale('es')}>Ver en español</button>
      <button type="button" lang="en" onClick={() => setLocale('en')}>Continue in English</button>
    </Notice>
  );
}
