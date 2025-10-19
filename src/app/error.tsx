'use client';

import { useEffect } from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const ErrorTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-family: 'Playfair Display', serif;
`;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const RetryButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1rem;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
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
      <ErrorTitle>Oops! Something went wrong</ErrorTitle>
      <ErrorMessage>
        {error.message || 'An unexpected error occurred. Please try again.'}
      </ErrorMessage>
      <RetryButton onClick={reset}>
        Try again
      </RetryButton>
    </ErrorContainer>
  );
}
