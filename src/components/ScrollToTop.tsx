import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const ScrollButton = styled.button<{ visible: boolean }>`
  position: fixed;
  bottom: ${theme.spacing['2xl']};
  right: ${theme.spacing['2xl']};
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
  
  @media (max-width: ${theme.breakpoints.sm}) {
    bottom: ${theme.spacing.xl};
    right: ${theme.spacing.xl};
    width: 40px;
    height: 40px;
  }
`;

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <ScrollButton
      visible={isVisible}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </ScrollButton>
  );
} 