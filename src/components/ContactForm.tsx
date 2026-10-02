'use client';

import React, { useId, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { useTranslation } from '../i18n/TranslationContext';
import { useLocalizedForm } from '@/hooks/useLocalizedForm';
import { createInquiryMailto } from '@/lib/inquiryEmail';

// ─── Palette ────────────────────────────────────────────────────────────────
const C: Record<string, string> = {
  bg: '#080808',
  surface: '#101010',
  border: '#77716A',
  gold: '#C8A87A',
  text: '#F0EDE8',
  muted: '#AAA298',
};

const FormContainer = styled.div`
  max-width: 100%;
  margin: 0;
  padding: clamp(1rem, 3vw, 2rem);
  background-color: ${C.bg};
  color: ${C.text};
  border-radius: 0;
  box-shadow: none;

  p {
    margin-bottom: 1.5rem;
    color: ${C.text};
    font-size: 0.9rem;
    line-height: 1.7;
  }
  p a { color: ${C.gold}; text-decoration: underline; overflow-wrap: anywhere; }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 600px) {
    gap: 1.2rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-family: var(--font-montserrat), sans-serif;
  font-weight: 500;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${C.text};
  transition: color 0.2s;
`;

const Input = styled.input`
  padding: 0.8rem 1rem;
  border: 1px solid ${C.border};
  background: transparent;
  color: ${C.text};
  font-family: inherit;
  font-size: 1rem;
  border-radius: 2px;
  transition: border-color 0.2s, background-color 0.2s;

  &::placeholder {
    color: ${C.muted};
  }

  &:focus {
    outline: 2px solid ${C.gold};
    outline-offset: 3px;
    border-color: ${C.gold};
    background-color: rgba(200, 168, 122, 0.03);
  }

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem 1rem;
  border: 1px solid ${C.border};
  background: transparent;
  color: ${C.text};
  font-family: inherit;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  border-radius: 2px;
  transition: border-color 0.2s, background-color 0.2s;

  &::placeholder {
    color: ${C.muted};
  }

  &:focus {
    outline: 2px solid ${C.gold};
    outline-offset: 3px;
    border-color: ${C.gold};
    background-color: rgba(200, 168, 122, 0.03);
  }

  @media (max-width: 600px) {
    font-size: 16px;
    min-height: 120px;
  }
`;

const SubmitButton = styled.button`
  padding: 0.9rem 2rem;
  background-color: transparent;
  color: ${C.text};
  border: 1px solid ${C.gold};
  border-radius: 2px;
  font-family: var(--font-montserrat), sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;

  &:hover:not(:disabled) {
    background-color: ${C.gold};
    color: #080808;
  }

  &:focus-visible {
    outline: 2px solid ${C.gold};
    outline-offset: 2px;
  }

  &:disabled {
    border-color: ${C.muted};
    color: ${C.muted};
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    width: 100%;
    align-self: stretch;
  }
`;

const Message = styled.div<{ $type: 'success' | 'error' }>`
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 2px;
  border-left: 3px solid
    ${({ $type }) => ($type === 'success' ? '#4CAF50' : '#f44336')};
  background-color: ${({ $type }) =>
    $type === 'success'
      ? 'rgba(76, 175, 80, 0.1)'
      : 'rgba(244, 67, 54, 0.1)'};
  color: ${({ $type }) => ($type === 'success' ? '#4CAF50' : '#f44336')};
  font-size: 0.95rem;
  line-height: 1.5;
`;

interface ContactFormProps {
  service: string;
}

const getFormspreeId = (service: string): string => {
  const ids: Record<string, string> = {
    weddings: process.env.NEXT_PUBLIC_FORMSPREE_WEDDINGS_ID || '',
    'baby-family': process.env.NEXT_PUBLIC_FORMSPREE_BABY_FAMILY_ID || '',
    headshots: process.env.NEXT_PUBLIC_FORMSPREE_HEADSHOTS_ID || '',
    pets: process.env.NEXT_PUBLIC_FORMSPREE_PETS_ID || '',
  };
  return ids[service] || process.env.NEXT_PUBLIC_FORMSPREE_ART_CONTACT_ID || '';
};

export default function ContactForm({ service }: ContactFormProps) {
  const { t } = useTranslation();
  const { formRef, validate, onInput, onInvalid } = useLocalizedForm();
  const id = useId();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<{
    type: 'success' | 'error';
    messageKey: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formspreeId = getFormspreeId(service);
  const serviceKeys: Record<string, string> = {
    weddings: 'nav.wedding',
    'baby-family': 'nav.family',
    headshots: 'nav.headshots',
    pets: 'nav.pets',
    'art-inquiry': 'nav.art',
    'Brand Identity': 'nav.brandIdentity',
    'Creative Services': 'nav.creativeServices',
    'Art Classes': 'nav.artClasses',
    'Graphic Recording': 'nav.graphicRecording',
    'Tech Courses': 'nav.techCourses',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validate()) return;

    if (!formspreeId) {
      setStatus({
        type: 'error',
        messageKey: 'sharedContent.form.unavailable',
      });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          service,
        }),
      });

      if (response.ok) {
        setStatus({
          type: 'success',
          messageKey: 'forms.success',
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          messageKey: 'sharedContent.form.failed',
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        messageKey: 'sharedContent.form.failed',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <FormContainer>
      {status && <Message role={status.type === 'error' ? 'alert' : 'status'} $type={status.type}>{t(status.messageKey)}</Message>}
      {(!formspreeId || status?.type === 'error') && (
        <p>
          {t('sharedContent.form.emailFallback')}{' '}
          <a href={createInquiryMailto(t, 'sharedContent.email.contactSubject', {
            ...formData,
            ...(serviceKeys[service] ? { service: t(serviceKeys[service]) } : {}),
          })}>bycamilalonart@gmail.com</a>
        </p>
      )}

      <Form ref={formRef} noValidate onInput={onInput} onInvalid={onInvalid} onSubmit={handleSubmit} aria-busy={isSubmitting}>
        <FormGroup>
          <Label htmlFor={`${id}-name`}>{t('forms.fullName')}</Label>
          <Input
            type="text"
            id={`${id}-name`}
            autoComplete="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            aria-required="true"
            disabled={isSubmitting}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor={`${id}-email`}>{t('forms.email')}</Label>
          <Input
            type="email"
            id={`${id}-email`}
            autoComplete="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            aria-required="true"
            disabled={isSubmitting}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor={`${id}-phone`}>{t('forms.phone')}</Label>
          <Input
            type="tel"
            id={`${id}-phone`}
            autoComplete="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            disabled={isSubmitting}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor={`${id}-message`}>{t('forms.message')}</Label>
          <TextArea
            id={`${id}-message`}
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            aria-required="true"
            placeholder={t('forms.message')}
            disabled={isSubmitting}
          />
        </FormGroup>

        <SubmitButton type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
          {isSubmitting ? t('forms.submitting') : t('forms.submit')}
        </SubmitButton>
      </Form>
    </FormContainer>
  );
}
