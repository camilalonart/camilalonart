'use client';

import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import { theme } from '@/styles/theme';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
  background: ${theme.colors.background.dark};
  color: ${theme.colors.text.light};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at center, rgba(201, 160, 80, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 0.6s ease-out;
  max-width: 500px;
`;

const IconWrapper = styled.div`
  font-size: 5rem;
  margin-bottom: 1.5rem;
  animation: ${float} 3s ease-in-out infinite;
`;

const ErrorTitle = styled.h1`
  font-size: ${theme.typography.fontSize['4xl']};
  margin-bottom: 0.5rem;
  font-family: ${theme.typography.fontFamily.secondary};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.light};
  letter-spacing: 1px;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize['3xl']};
  }
`;

const ErrorSubtitle = styled.h2`
  font-size: ${theme.typography.fontSize.lg};
  margin-bottom: 1.5rem;
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.regular};
  color: ${theme.colors.secondary.main};
  text-transform: uppercase;
  letter-spacing: 3px;
`;

const ErrorMessage = styled.p`
  font-size: ${theme.typography.fontSize.base};
  margin-bottom: 2.5rem;
  color: ${theme.colors.text.muted};
  line-height: 1.6;
  font-family: ${theme.typography.fontFamily.primary};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 0.875rem 2rem;
  font-size: ${theme.typography.fontSize.sm};
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.medium};
  border-radius: 2px;
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  ${props => props.$variant === 'secondary' ? `
    background: transparent;
    color: ${theme.colors.text.light};
    border: 1px solid ${theme.colors.secondary.main};

    &:hover {
      background: ${theme.colors.secondary.main};
      color: ${theme.colors.background.dark};
    }
  ` : `
    background: ${theme.colors.secondary.main};
    color: ${theme.colors.background.dark};
    border: 1px solid ${theme.colors.secondary.main};

    &:hover {
      background: ${theme.colors.secondary.light};
      border-color: ${theme.colors.secondary.light};
    }
  `}
`;

const HomeLink = styled(Link)<{ $variant?: 'primary' | 'secondary' }>`
  padding: 0.875rem 2rem;
  font-size: ${theme.typography.fontSize.sm};
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.medium};
  border-radius: 2px;
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: ${theme.colors.text.light};
  border: 1px solid ${theme.colors.secondary.main};

  &:hover {
    background: ${theme.colors.secondary.main};
    color: ${theme.colors.background.dark};
  }
`;

const Decoration = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border: 1px solid rgba(201, 160, 80, 0.1);
  border-radius: 50%;
  pointer-events: none;

  &:first-of-type {
    top: -100px;
    right: -100px;
  }

  &:last-of-type {
    bottom: -100px;
    left: -100px;
    width: 400px;
    height: 400px;
  }
`;

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error boundary caught:', error);
  }, [error]);

  return (
    <ErrorContainer>
      <Decoration />
      <Decoration />
      <ContentWrapper>
        <IconWrapper>📸</IconWrapper>
        <ErrorTitle>Something Went Wrong</ErrorTitle>
        <ErrorSubtitle>Technical Difficulties</ErrorSubtitle>
        <ErrorMessage>
          We apologize for the inconvenience. The page you were trying to access 
          encountered an unexpected error. Please try again or return to the homepage.
        </ErrorMessage>
        <ButtonGroup>
          <Button onClick={reset} $variant="primary">
            Try Again
          </Button>
          <HomeLink href="/" $variant="secondary">
            Go Home
          </HomeLink>
        </ButtonGroup>
      </ContentWrapper>
    </ErrorContainer>
  );
}
