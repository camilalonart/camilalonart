'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/TranslationContext';
import LanguageSwitcher from '../LanguageSwitcher';

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

const NavLogo = styled.button`
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
  transition: color 0.2s;
  background: none;
  border: none;
  font-family: inherit;
  padding: 0;

  &:hover {
    color: ${C.gold};
  }

  span {
    color: inherit;
  }
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${C.gold};
`;

const NavLinks = styled.div<{ $isOpen: boolean }>`
  display: flex;
  gap: clamp(4rem, 5vw, 5rem);
  align-items: center;

  @media (max-width: 1024px) {
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    background: rgba(8, 8, 8, 0.98);
    border-bottom: 1px solid ${C.border};
    backdrop-filter: blur(12px);
    max-height: ${p => p.$isOpen ? '500px' : '0'};
    overflow: hidden;
    transition: max-height 0.3s ease;
    padding: ${p => p.$isOpen ? '1rem 0' : '0'};
    z-index: 199;
  }
`;

const NavLink = styled(Link)`
  font-family: var(--font-montserrat), sans-serif;
  font-size: clamp(0.8rem, 1.5vw, 1.25rem);
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: ${C.muted};
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    color: rgba(41, 38, 35, 1);
  }

  @media (max-width: 1024px) {
    display: block;
    padding: 0.75rem clamp(1.5rem, 4vw, 4rem);
    width: 100%;
    white-space: normal;
    flex-shrink: 1;

    &:hover {
      background: rgba(75, 65, 51, 0.05);
    }
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const HamburgerBtn = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${C.text};
  cursor: pointer;
  padding: 0.75rem;
  z-index: 201;
  transition: color 0.2s ease;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    color: ${C.gold};
  }

  span {
    width: 24px;
    height: 2.5px;
    background: currentColor;
    transition: all 0.3s ease;
    display: block;
    border-radius: 1px;
  }

  &[aria-expanded="true"] span:nth-child(1) {
    transform: rotate(45deg) translateY(10px);
  }

  &[aria-expanded="true"] span:nth-child(2) {
    opacity: 0;
  }

  &[aria-expanded="true"] span:nth-child(3) {
    transform: rotate(-45deg) translateY(-10px);
  }
`;

export default function ArtNav() {
  const { t } = useTranslation();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    setMobileMenuOpen(false);
    if (window.location.pathname !== '/art/') {
      router.push('/art/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Nav $scrolled={scrolled} role="navigation" aria-label="Art site navigation">
      <NavLogo title="Back to art home" onClick={handleLogoClick}>
        Camila Londoño
      </NavLogo>
      <NavLinks $isOpen={mobileMenuOpen}>
        <NavLink href="/art/" onClick={() => setMobileMenuOpen(false)}>{t('nav.collections')}</NavLink>
        <NavLink href="/art/about/" onClick={() => setMobileMenuOpen(false)}>{t('nav.about')}</NavLink>
        <NavLink href="/art/contact/" onClick={() => setMobileMenuOpen(false)}>{t('nav.contact')}</NavLink>
        <NavLink href="/art/collaborations/" onClick={() => setMobileMenuOpen(false)}>{t('nav.collaborations')}</NavLink>
        <NavLink href="/art/early-first-paintings/" onClick={() => setMobileMenuOpen(false)}>{t('nav.earlyPaintings')}</NavLink>
      </NavLinks>
      <NavRight>
        <LanguageSwitcher />
        <HamburgerBtn
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </HamburgerBtn>
      </NavRight>
    </Nav>
  );
}
