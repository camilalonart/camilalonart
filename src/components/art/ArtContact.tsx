'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import ArtNav from './ArtNav';

const C: Record<string, string> = {
  bg: '#F5F3F0',
  surface: '#FFFFFF',
  border: '#E5DDD8',
  gold: '#C8A87A',
  goldLight: '#E5D4B3',
  text: '#2C2C2C',
  muted: '#8B8B8B',
};

const Site = styled.div`
  background: ${C.bg};
  color: ${C.text};
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  -webkit-font-smoothing: antialiased;

  * { box-sizing: border-box; }
`;

const Content = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(3rem, 5vw, 5rem) clamp(1.5rem, 5vw, 5rem);
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background: ${C.surface};
  border: 1px solid ${C.border};
  padding: clamp(2.5rem, 5vw, 4rem);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: clamp(3rem, 6vw, 4rem);

  h1 {
    font-size: clamp(2.2rem, 5vw, 3rem);
    font-weight: 300;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin: 0 0 1rem;
  }

  p {
    font-family: var(--font-montserrat), sans-serif;
    font-size: 0.9rem;
    color: ${C.muted};
    margin: 0;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 3vw, 2rem);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${C.gold};
`;

const Input = styled.input`
  padding: 1rem;
  background: ${C.surface};
  border: 1px solid ${C.border};
  color: ${C.text};
  font-family: inherit;
  font-size: 0.95rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${C.gold};
  }

  &::placeholder {
    color: ${C.muted};
  }
`;

const Select = styled.select`
  padding: 1rem;
  background: ${C.surface};
  border: 1px solid ${C.border};
  color: ${C.text};
  font-family: inherit;
  font-size: 0.95rem;
  transition: border-color 0.3s ease;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${C.gold};
  }

  option {
    background: ${C.bg};
    color: ${C.text};
  }
`;

const Textarea = styled.textarea`
  padding: 1rem;
  background: ${C.surface};
  border: 1px solid ${C.border};
  color: ${C.text};
  font-family: inherit;
  font-size: 0.95rem;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${C.gold};
  }

  &::placeholder {
    color: ${C.muted};
  }
`;

const SubmitBtn = styled.button`
  padding: 1.2rem 2.5rem;
  background: ${C.gold};
  border: 1px solid ${C.gold};
  color: ${C.bg};
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1.5rem;
  width: 100%;
  font-weight: 600;

  &:hover:not(:disabled) {
    background: ${C.goldLight};
    border-color: ${C.goldLight};
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(200, 168, 122, 0.2);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Message = styled.div<{ $type: 'success' | 'error' }>`
  padding: 1rem;
  border: 1px solid ${p => p.$type === 'success' ? C.gold : '#cc3333'};
  background: ${p => p.$type === 'success' ? 'rgba(200, 168, 122, 0.1)' : 'rgba(204, 51, 51, 0.1)'};
  color: ${p => p.$type === 'success' ? C.gold : '#ff6666'};
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.9rem;
  border-radius: 2px;
  margin-bottom: 1rem;
`;

interface FormData {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
}

export default function ArtContact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    inquiryType: 'general',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ART_CONTACT_ID || '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!FORMSPREE_ID) {
      setStatus('error');
      setStatusMessage('Form is not configured. Please contact the administrator.');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          inquiryType: formData.inquiryType,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setStatusMessage('Thank you for reaching out! I will get back to you soon.');
        setFormData({ name: '', email: '', inquiryType: 'general', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setStatusMessage('Something went wrong. Please try again later.');
      }
    } catch (error) {
      setStatus('error');
      setStatusMessage('Failed to send message. Please try again.');
    }
  };

  return (
    <Site>
      <ArtNav />
      <Content>
        <FormContainer>
          <PageHeader>
            <h1>Get in Touch</h1>
            <p>Have a question or inquiry? I'd love to hear from you.</p>
          </PageHeader>

          {status !== 'idle' && (
            <Message $type={status === 'success' ? 'success' : 'error'}>
              {statusMessage}
            </Message>
          )}

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="inquiryType">Inquiry Type *</Label>
              <Select
                id="inquiryType"
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleChange}
              >
                <option value="general">General Inquiry</option>
                <option value="purchase">Purchase Inquiry</option>
                <option value="commission">Commission Request</option>
                <option value="exhibition">Exhibition Opportunity</option>
                <option value="collaboration">Collaboration</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell me about your inquiry..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <SubmitBtn type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </SubmitBtn>
          </Form>
        </FormContainer>
      </Content>
    </Site>
  );
}
