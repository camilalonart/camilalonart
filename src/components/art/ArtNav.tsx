'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styled from 'styled-components';

const C = {
  bg: '#080808',
  text: '#F0EDE8',
  gold: '#C8A87A',
  muted: '#6E6B65',
  border: '#1E1E1E',
};

const Nav = styled.nav<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(1.5rem, 4vw, 4rem);
  height: 64px;
  transition: background 0.4s ease, border-color 0.4s ease;
  background: ${p => p.$scrolled ? 'rgba(8,8,8,0.96)' : 'transparent'};
  border-bottom: 1px solid ${p => p.$scrolled ? C.border : 'transparent'};
  backdrop-filter: ${p => p.$scrolled ? 'blur(12px)' : 'none'};
`;

const NavLogo = styled(Link)`
  font-size: 1.05rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${C.text};
  text-decoration: none;
  cursor: pointer;
  font-weight: 300;
  display: flex;
  align-items: center;
  gap: 0.4rem;

  span {
    color: ${C.gold};
  }
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${C.gold};
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;

  @media (max-width: 600px) {
    gap: 1.2rem;
  }
`;

const NavLink = styled(Link)`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: ${C.muted};
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${C.gold};
  }
`;

export default function ArtNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Nav $scrolled={scrolled} role="navigation" aria-label="Art site navigation">
      <NavLogo href="/art/" title="Back to art home">
        Camila <span>Londoño</span> <Dot />
      </NavLogo>
      <NavLinks>
        <NavLink href="/art/">Collections</NavLink>
        <NavLink href="/art/about/">About</NavLink>
        <NavLink href="/art/contact/">Contact</NavLink>
      </NavLinks>
    </Nav>
  );
}
