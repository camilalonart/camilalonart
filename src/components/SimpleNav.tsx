'use client';

import React from 'react';
import styled from 'styled-components';
import LanguageSwitcher from './LanguageSwitcher';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  padding: clamp(1rem, 2vw, 1.5rem) clamp(1.5rem, 3vw, 2rem);
  background: transparent;
`;

export default function SimpleNav() {
  return (
    <Nav role="navigation">
      <LanguageSwitcher isDark />
    </Nav>
  );
}
