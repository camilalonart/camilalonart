import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

interface BackToTopProps {
  showAt?: number;
  position?: 'left' | 'right';
  offset?: number;
}

const Button = styled.button<{ visible: boolean; position: string; offset: number }>`
  position: fixed;
  bottom: ${props => props.offset}px;
  ${props => props.position}: ${props => props.offset}px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${theme.colors.primary.main};
  color: ${theme.colors.text.light};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${theme.transitions.default};
  opacity: ${props => (props.visible ? 1 : 0)};
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  transform: translateY(${props => (props.visible ? 0 : '20px')});
  box-shadow: ${theme.shadows.md};
  z-index: 999;
  
  &:hover {
    background-color: ${theme.colors.primary.dark};
    transform: translateY(${props => (props.visible ? '-5px' : '20px')});
  }
  
  svg {
    width: 24px;
    height: 24px;
    transition: transform 0.2s ease;
  }
  
  &:hover svg {
    transform: translateY(-2px);
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    width: 40px;
    height: 40px;
    ${props => props.position}: ${theme.spacing.lg};
    bottom: ${theme.spacing.lg};
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export default function BackToTop({
  showAt = 400,
  position = 'right',
  offset = 40,
}: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > showAt) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [showAt]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Button
      visible={isVisible}
      position={position}
      offset={offset}
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </Button>
  );
} 