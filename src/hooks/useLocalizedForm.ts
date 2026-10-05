'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { useTranslation } from '@/i18n/TranslationContext';

type FormControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export interface FormValidationError {
  id: string;
  name: string;
  index: number;
  label: string;
  message: string;
}

function fieldLabel(field: FormControl) {
  const labelledBy = field.getAttribute('aria-labelledby')?.split(/\s+/)
    .map(id => field.ownerDocument.getElementById(id)?.textContent || '').join(' ').trim();
  const label = labelledBy || field.getAttribute('aria-label') ||
    Array.from(field.labels || []).map(item => item.textContent || '').join(' ') || field.name || field.id;
  return label.replace(/\s+/g, ' ').replace(/\s*\*$/, '').trim();
}

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
  const { t, locale } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const checked = useRef(new WeakSet<FormControl>());
  const [errors, setErrors] = useState<FormValidationError[]>([]);
  const errorsRef = useRef(errors);

  const publishErrors = useCallback((next: FormValidationError[]) => {
    const previous = errorsRef.current;
    if (previous.length === next.length && previous.every((error, index) => {
      const other = next[index];
      return error.id === other.id && error.name === other.name && error.index === other.index &&
        error.label === other.label && error.message === other.message;
    })) return;
    errorsRef.current = next;
    setErrors(next);
  }, []);

  const update = useCallback((field: FormControl) => {
    localizeFieldValidation(field, t);
    if (checked.current.has(field)) {
      field.setAttribute('aria-invalid', String(field.willValidate && !field.validity.valid));
    }
  }, [t]);

  const syncErrors = useCallback(() => {
    const next: FormValidationError[] = [];
    formRef.current?.querySelectorAll<FormControl>('input, select, textarea').forEach((field, index) => {
      update(field);
      if (checked.current.has(field) && field.willValidate && !field.validity.valid) {
        next.push({ id: field.id, name: field.name, index, label: fieldLabel(field), message: field.validationMessage });
      }
    });
    publishErrors(next);
  }, [publishErrors, update]);

  useEffect(() => {
    formRef.current?.querySelectorAll<FormControl>('input, select, textarea').forEach(update);
  }, [update]);

  // Reconcile after React commits controlled values, translated labels or conditional
  // fields. Equality above prevents a state loop, including when invalid events fire.
  useEffect(() => {
    syncErrors();
  });

  const onInput = useCallback((event: FormEvent<HTMLFormElement>) => {
    const field = event.target;
    if (field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement) {
      update(field);
      syncErrors();
    }
  }, [syncErrors, update]);

  const onInvalid = useCallback((event: FormEvent<HTMLFormElement>) => {
    const field = event.target;
    if (field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement) {
      checked.current.add(field);
      update(field);
      syncErrors();
    }
  }, [syncErrors, update]);

  const validate = useCallback(() => {
    const form = formRef.current;
    if (!form) return false;
    form.querySelectorAll<FormControl>('input, select, textarea').forEach(field => {
      if (field.willValidate) checked.current.add(field);
      update(field);
    });
    const valid = form.reportValidity();
    syncErrors();
    return valid;
  }, [syncErrors, update]);

  const resetValidation = useCallback(() => {
    formRef.current?.querySelectorAll<FormControl>('input, select, textarea').forEach(field => {
      if (checked.current.has(field)) field.removeAttribute('aria-invalid');
      field.setCustomValidity('');
    });
    checked.current = new WeakSet<FormControl>();
    publishErrors([]);
  }, [publishErrors]);

  const onReset = useCallback((event: FormEvent<HTMLFormElement>) => {
    // Native reset applies default values after this event; cancelled resets retain
    // both the values and their feedback.
    queueMicrotask(() => {
      if (event.defaultPrevented) return;
      resetValidation();
      syncErrors();
    });
  }, [resetValidation, syncErrors]);

  const onFocusError = useCallback((error: FormValidationError) => {
    const fields = formRef.current?.querySelectorAll<FormControl>('input, select, textarea');
    const field = fields && Array.from(fields).find((candidate, index) =>
      (error.id ? candidate.id === error.id : error.name ? candidate.name === error.name : index === error.index) &&
      candidate.willValidate && !candidate.validity.valid);
    field?.focus();
  }, []);

  return {
    formRef, validate, onInput, onInvalid, onReset, resetValidation,
    summaryProps: { errors, locale, onFocusError },
  };
}
