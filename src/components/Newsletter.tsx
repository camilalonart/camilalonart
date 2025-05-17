import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

interface NewsletterProps {
  dark?: boolean;
}

const NewsletterSection = styled.section<{ dark: boolean }>`
  padding: ${theme.spacing['3xl']} ${theme.spacing['2xl']};
  background-color: ${props =>
    props.dark ? theme.colors.background.dark : theme.colors.background.main};
  color: ${props =>
    props.dark ? theme.colors.text.light : theme.colors.text.primary};
`;

const NewsletterContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const NewsletterHeader = styled.div`
  margin-bottom: ${theme.spacing['2xl']};
  
  h2 {
    font-size: ${theme.typography.fontSize['3xl']};
    margin-bottom: ${theme.spacing.lg};
  }
  
  p {
    font-size: ${theme.typography.fontSize.lg};
    color: ${theme.colors.text.secondary};
  }
`;

const Form = styled.form`
  display: flex;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: 2px solid ${theme.colors.background.light};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.base};
  transition: ${theme.transitions.default};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.main};
  }
`;

const SubscribeButton = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background-color: ${theme.colors.primary.main};
  color: ${theme.colors.text.light};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${theme.transitions.default};
  
  &:hover {
    background-color: ${theme.colors.primary.dark};
  }
  
  &:disabled {
    background-color: ${theme.colors.text.secondary};
    cursor: not-allowed;
  }
`;

const Message = styled.div<{ type: 'success' | 'error' }>`
  padding: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  background-color: ${({ type }) =>
    type === 'success'
      ? theme.colors.accent.success + '33'
      : theme.colors.accent.error + '33'};
  color: ${({ type }) =>
    type === 'success'
      ? theme.colors.accent.success
      : theme.colors.accent.error};
`;

const PrivacyNote = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
`;

export default function Newsletter({ dark = false }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address.');
      return;
    }

    setStatus('loading');

    try {
      // Here you would integrate with your newsletter service (e.g., Mailchimp, ConvertKit)
      // For now, we'll simulate a successful subscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setMessage('Thank you for subscribing! Please check your email to confirm your subscription.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <NewsletterSection dark={dark}>
      <NewsletterContainer>
        <NewsletterHeader>
          <h2>Stay Updated</h2>
          <p>
            Subscribe to our newsletter for photography tips, creative insights,
            and exclusive updates on our latest work.
          </p>
        </NewsletterHeader>

        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
          />
          <SubscribeButton type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </SubscribeButton>
        </Form>

        {(status === 'success' || status === 'error') && (
          <Message type={status === 'success' ? 'success' : 'error'}>
            {message}
          </Message>
        )}

        <PrivacyNote>
          By subscribing, you agree to our Privacy Policy and consent to receive
          updates from our company.
        </PrivacyNote>
      </NewsletterContainer>
    </NewsletterSection>
  );
} 