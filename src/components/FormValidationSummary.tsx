'use client';

import styled from 'styled-components';
import type { Locale } from '@/i18n/TranslationContext';
import type { FormValidationError } from '@/hooks/useLocalizedForm';

const copy: Record<Locale, string> = {
  en: 'Please review these fields:',
  es: 'Revisa estos campos:',
};

const Feedback = styled.div`
  margin-bottom: 1.25rem;
  padding: 1rem;
  border: 1px solid #942d36;
  border-radius: 0.5rem;
  background: #fff5f5;
  color: #70212a;
  text-align: left;

  ul { margin: 0.5rem 0 0; padding-left: 1.25rem; }
  button {
    min-height: 44px;
    padding: 0.5rem 0.25rem;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    text-align: left;
    text-decoration: underline;
    cursor: pointer;
  }
  button:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
`;

interface FormValidationSummaryProps {
  enabled: boolean;
  errors: FormValidationError[];
  locale: Locale;
  onFocusError: (error: FormValidationError) => void;
}

export default function FormValidationSummary({ enabled, errors, locale, onFocusError }: FormValidationSummaryProps) {
  if (!enabled) return null;
  return (
    <div aria-live="polite" aria-atomic="true">
      {errors.length > 0 && (
        <Feedback>
          <strong>{copy[locale]}</strong>
          <ul>
            {errors.map(error => (
              <li key={`${error.id}:${error.name}:${error.index}`}>
                <button type="button" onClick={() => onFocusError(error)}>
                  {error.label}: {error.message}
                </button>
              </li>
            ))}
          </ul>
        </Feedback>
      )}
    </div>
  );
}
