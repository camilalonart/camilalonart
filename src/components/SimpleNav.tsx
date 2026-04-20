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
  background: ${p => p.$scrolled ? 'rgba(26, 26, 26, 0.95)' : 'rgba(26, 26, 26, 0.7)'};
  backdrop-filter: ${p => p.$scrolled ? 'blur(10px)' : 'none'};
  border-bottom: ${p => p.$scrolled ? `1px solid rgba(200, 168, 122, 0.2)` : 'none'};
`;

const NavLogo = styled(Link)`
  font-size: 0.9rem;
  font-weight: 400;
  color: #f0f0f0;
  text-decoration: none;
  transition: color 0.2s;
  letter-spacing: 0.05em;

  &:hover {
    color: #C8A87A;
  }
`;

export default function SimpleNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Nav $scrolled={scrolled} role="navigation">
      <NavLogo href="/">← Home</NavLogo>
      <LanguageSwitcher />
    </Nav>
  );
}
