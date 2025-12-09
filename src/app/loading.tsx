'use client';

import styled, { keyframes } from 'styled-components';
import { theme } from '../styles/theme';

const pulse = keyframes`
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${theme.colors.background.dark};
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 2px solid rgba(201, 160, 80, 0.2);
  border-top-color: ${theme.colors.secondary.main};
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  color: ${theme.colors.text.muted};
  font-size: ${theme.typography.fontSize.sm};
  margin-top: 1.5rem;
  font-weight: 400;
  letter-spacing: 2px;
  text-transform: uppercase;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

export default function Loading() {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>Loading</LoadingText>
    </LoadingContainer>
  );
}
