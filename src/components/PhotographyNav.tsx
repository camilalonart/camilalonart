'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import LanguageSwitcher from './LanguageSwitcher';

const Nav = styled.nav<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.md} clamp(1rem, 3vw, 2rem);
  height: 64px;
  transition: background 0.3s ease, backdrop-filter 0.3s ease;
  background: ${p => p.$scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.7)'};
  backdrop-filter: ${p => p.$scrolled ? 'blur(10px)' : 'none'};
  border-bottom: ${p => p.$scrolled ? `1px solid ${theme.colors.border}` : 'none'};
`;

const NavLogo = styled(Link)`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${theme.colors.primary.main};
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: ${theme.colors.primary.dark};
  }
`;

const NavControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export default function PhotographyNav({ pageTitle }: { pageTitle?: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Nav $scrolled={scrolled} role="navigation" aria-label="Photography navigation">
      <NavLogo href="/" title="Back to home">
        ← {pageTitle || 'Back'}
      </NavLogo>
      <NavControls>
        <LanguageSwitcher />
      </NavControls>
    </Nav>
  );
}
