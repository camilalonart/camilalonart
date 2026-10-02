'use client';

import { useCallback, useEffect, useRef, type FormEvent } from 'react';
import { useTranslation } from '@/i18n/TranslationContext';

type FormControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export function localizeFieldValidation(field: FormControl, t: (key: string) => string) {
  // Clear the previous locale's custom error before reading native constraints.
  field.setCustomValidity('');
  if (!field.willValidate) return;
  const validity = field.validity;
  let message = '';
  if (validity.valueMissing) {
    message = t(`sharedContent.validation.${field.tagName === 'SELECT' ? 'requiredSelection' : 'required'}`);
  } else if (validity.typeMismatch) {
    message = t(`sharedContent.validation.${field.type === 'email' ? 'email' : field.type === 'url' ? 'url' : 'invalid'}`);
  } else if (validity.tooShort && 'minLength' in field) {
    message = t('sharedContent.validation.tooShort').replace('{min}', String(field.minLength));
  } else if (validity.tooLong && 'maxLength' in field) {
    message = t('sharedContent.validation.tooLong').replace('{max}', String(field.maxLength));
  } else if (validity.rangeUnderflow && 'min' in field) {
    message = t('sharedContent.validation.minimum').replace('{min}', field.min);
  } else if (validity.rangeOverflow && 'max' in field) {
    message = t('sharedContent.validation.maximum').replace('{max}', field.max);
  } else if (!validity.valid) {
    message = t('sharedContent.validation.invalid');
  }
  field.setCustomValidity(message);
}

export function useLocalizedForm() {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const checked = useRef(new WeakSet<FormControl>());

  const update = useCallback((field: FormControl) => {
    localizeFieldValidation(field, t);
    if (checked.current.has(field)) {
      field.setAttribute('aria-invalid', String(field.willValidate && !field.validity.valid));
    }
  }, [t]);

  useEffect(() => {
    formRef.current?.querySelectorAll<FormControl>('input, select, textarea').forEach(update);
  }, [update]);

  const onInput = useCallback((event: FormEvent<HTMLFormElement>) => {
    const field = event.target;
    if (field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement) {
      update(field);
    }
  }, [update]);

  const onInvalid = useCallback((event: FormEvent<HTMLFormElement>) => {
    const field = event.target;
    if (field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement) {
      checked.current.add(field);
      update(field);
    }
  }, [update]);

  const validate = useCallback(() => {
    const form = formRef.current;
    if (!form) return false;
    form.querySelectorAll<FormControl>('input, select, textarea').forEach(field => {
      if (field.willValidate) checked.current.add(field);
      update(field);
    });
    return form.reportValidity();
  }, [update]);

  return { formRef, validate, onInput, onInvalid };
}
