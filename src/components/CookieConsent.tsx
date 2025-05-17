import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

interface CookieConsentProps {
  privacyPolicyUrl?: string;
  cookiePolicyUrl?: string;
  position?: 'bottom' | 'top';
  dark?: boolean;
}

const Container = styled.div<{ position: string; visible: boolean; dark: boolean }>`
  position: fixed;
  ${props => props.position}: 0;
  left: 0;
  right: 0;
  background-color: ${props =>
    props.dark ? theme.colors.background.dark : theme.colors.background.light};
  color: ${props =>
    props.dark ? theme.colors.text.light : theme.colors.text.primary};
  padding: ${theme.spacing.xl} ${theme.spacing['2xl']};
  box-shadow: ${theme.shadows.lg};
  transform: translateY(${props =>
    props.visible
      ? '0'
      : `${props.position === 'bottom' ? '100%' : '-100%'}`});
  transition: transform 0.3s ease-in-out;
  z-index: 9999;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.lg};
  }
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    text-align: center;
    gap: ${theme.spacing.lg};
  }
`;

const Text = styled.p`
  margin: 0;
  font-size: ${theme.typography.fontSize.base};
  line-height: 1.6;
  
  a {
    color: ${theme.colors.primary.main};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    width: 100%;
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: ${theme.spacing.sm} ${theme.spacing.xl};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${theme.transitions.default};
  
  ${props =>
    props.variant === 'primary'
      ? `
    background-color: ${theme.colors.primary.main};
    color: ${theme.colors.text.light};
    
    &:hover {
      background-color: ${theme.colors.primary.dark};
    }
  `
      : `
    background-color: transparent;
    color: ${theme.colors.text.primary};
    border: 2px solid ${theme.colors.background.light};
    
    &:hover {
      background-color: ${theme.colors.background.light};
    }
  `}
`;

const COOKIE_CONSENT_KEY = 'cookie-consent-v1';

export default function CookieConsent({
  privacyPolicyUrl = '/privacy-policy',
  cookiePolicyUrl = '/cookie-policy',
  position = 'bottom',
  dark = false,
}: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    setIsVisible(false);
    // Here you could implement logic to disable non-essential cookies
  };

  if (!isVisible) return null;

  return (
    <Container position={position} visible={isVisible} dark={dark}>
      <Content>
        <Text>
          We use cookies to enhance your experience. By continuing to visit this
          site you agree to our use of cookies. Learn more in our{' '}
          <a href={privacyPolicyUrl}>Privacy Policy</a> and{' '}
          <a href={cookiePolicyUrl}>Cookie Policy</a>.
        </Text>
        <ButtonGroup>
          <Button variant="primary" onClick={handleAccept}>
            Accept All
          </Button>
          <Button onClick={handleDecline}>
            Decline Non-Essential
          </Button>
        </ButtonGroup>
      </Content>
    </Container>
  );
} 