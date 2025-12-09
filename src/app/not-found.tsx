'use client';

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

const NotFoundContainer = styled.div`
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

const NotFoundCode = styled.div`
  font-size: 10rem;
  font-family: ${theme.typography.fontFamily.secondary};
  font-weight: ${theme.typography.fontWeight.bold};
  line-height: 1;
  color: ${theme.colors.secondary.main};
  opacity: 0.3;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
  user-select: none;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 6rem;
  }
`;

const IconWrapper = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  animation: ${float} 3s ease-in-out infinite;
  position: relative;
  z-index: 1;
`;

const NotFoundTitle = styled.h1`
  font-size: ${theme.typography.fontSize['4xl']};
  margin-bottom: 0.5rem;
  font-family: ${theme.typography.fontFamily.secondary};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.light};
  letter-spacing: 1px;
  position: relative;
  z-index: 1;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize['3xl']};
  }
`;

const NotFoundSubtitle = styled.h2`
  font-size: ${theme.typography.fontSize.lg};
  margin-bottom: 1.5rem;
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.regular};
  color: ${theme.colors.secondary.main};
  text-transform: uppercase;
  letter-spacing: 3px;
`;

const NotFoundMessage = styled.p`
  font-size: ${theme.typography.fontSize.base};
  margin-bottom: 2.5rem;
  color: ${theme.colors.text.muted};
  line-height: 1.6;
  font-family: ${theme.typography.fontFamily.primary};
`;

const HomeButton = styled(Link)`
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
  background: ${theme.colors.secondary.main};
  color: ${theme.colors.background.dark};
  border: 1px solid ${theme.colors.secondary.main};

  &:hover {
    background: ${theme.colors.secondary.light};
    border-color: ${theme.colors.secondary.light};
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

export default function NotFound() {
  return (
    <NotFoundContainer>
      <NotFoundCode>404</NotFoundCode>
      <Decoration />
      <Decoration />
      <ContentWrapper>
        <IconWrapper>🔍</IconWrapper>
        <NotFoundTitle>Page Not Found</NotFoundTitle>
        <NotFoundSubtitle>Lost in the Gallery</NotFoundSubtitle>
        <NotFoundMessage>
          The page you're looking for seems to have wandered off. 
          It might have been moved, renamed, or doesn't exist anymore. 
          Let's get you back on track.
        </NotFoundMessage>
        <HomeButton href="/">
          Return Home
        </HomeButton>
      </ContentWrapper>
    </NotFoundContainer>
  );
}
