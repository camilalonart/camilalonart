import React from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../styles/theme';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  dark?: boolean;
  fullScreen?: boolean;
}

const getSizeValue = (size: 'small' | 'medium' | 'large') => {
  switch (size) {
    case 'small':
      return '24px';
    case 'large':
      return '64px';
    default:
      return '40px';
  }
};

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const LoadingContainer = styled.div<{ fullScreen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${props =>
    props.fullScreen &&
    `
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
  `}
`;

const Spinner = styled.div<{
  size: 'small' | 'medium' | 'large';
  dark: boolean;
}>`
  width: ${props => getSizeValue(props.size)};
  height: ${props => getSizeValue(props.size)};
  border: 3px solid ${props =>
    props.dark ? theme.colors.background.dark : theme.colors.background.light};
  border-top-color: ${theme.colors.primary.main};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p<{ dark: boolean }>`
  margin-top: ${theme.spacing.lg};
  font-size: ${theme.typography.fontSize.lg};
  color: ${props =>
    props.dark ? theme.colors.text.light : theme.colors.text.primary};
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

export default function Loading({
  size = 'medium',
  dark = false,
  fullScreen = false,
}: LoadingProps) {
  return (
    <LoadingContainer fullScreen={fullScreen}>
      <Spinner size={size} dark={dark} />
      {size !== 'small' && <LoadingText dark={dark}>Loading...</LoadingText>}
    </LoadingContainer>
  );
} 