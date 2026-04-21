'use client';

import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import LanguageSwitcher from './LanguageSwitcher';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: clamp(1rem, 2vw, 1.5rem) clamp(1.5rem, 3vw, 2rem);
  background: transparent;
`;

export default function PhotographyNav() {
  return (
    <Nav role="navigation" aria-label="Photography navigation">
      <LanguageSwitcher isDark />
    </Nav>
  );
}
