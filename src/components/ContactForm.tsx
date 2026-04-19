'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

// ─── Palette ────────────────────────────────────────────────────────────────
const C = {
  bg: '#080808',
  surface: '#101010',
  border: '#1E1E1E',
  gold: '#C8A87A',
  text: '#F0EDE8',
  muted: '#6E6B65',
};

const FormContainer = styled.div`
  max-width: 100%;
  margin: 0;
  padding: 0;
  background-color: transparent;
  border-radius: 0;
  box-shadow: none;

  h2 {
    display: none;
  }

  p {
    display: none;
  }
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
    outline: none;
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
    outline: none;
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

export default function ContactForm({ service }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically send the form data to your backend
      // For now, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setStatus({
        type: 'success',
        message: 'Thank you for your message! I will get back to you as soon as possible.',
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Something went wrong. Please try again later.',
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
      {status && <Message $type={status.type}>{status.message}</Message>}

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="contact-name">Full Name</Label>
          <Input
            type="text"
            id="contact-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            aria-required="true"
            disabled={isSubmitting}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="contact-email">Email Address</Label>
          <Input
            type="email"
            id="contact-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            aria-required="true"
            disabled={isSubmitting}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="contact-phone">Phone (Optional)</Label>
          <Input
            type="tel"
            id="contact-phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            disabled={isSubmitting}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="contact-message">Message</Label>
          <TextArea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            aria-required="true"
            placeholder="Tell me about your project or inquiry..."
            disabled={isSubmitting}
          />
        </FormGroup>

        <SubmitButton type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </SubmitButton>
      </Form>
    </FormContainer>
  );
}
