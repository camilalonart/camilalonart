'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/TranslationContext';

const C = {
  bg: '#080808',
  text: '#F0EDE8',
  gold: '#C8A87A',
  muted: '#6E6B65',
  border: '#1E1E1E',
  dim: '#3A3835',
};

const Nav = styled.nav<{ $scrolled: boolean }>`
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(1rem, 4vw, 3rem);
  min-height: 64px;
  transition: background 0.4s ease, border-color 0.4s ease;
  background: ${p => p.$scrolled ? 'rgba(8,8,8,0.98)' : 'transparent'};
  border-bottom: 1px solid ${p => p.$scrolled ? C.border : 'transparent'};
  backdrop-filter: ${p => p.$scrolled ? 'blur(12px)' : 'none'};
`;

const NavLogo = styled.button`
  font-size: 1.05rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${C.text};
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
  flex-shrink: 0;

  &:hover { color: ${C.gold}; }
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${C.gold};
  flex-shrink: 0;
`;

const NavLinks = styled.div<{ $isOpen: boolean }>`
  display: flex;
  gap: 2.5rem;
  align-items: center;

  @media (max-width: 900px) { gap: 1.5rem; }

  @media (max-width: 768px) {
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    background: rgba(8, 8, 8, 0.98);
    backdrop-filter: blur(12px);
    max-height: ${p => p.$isOpen ? '600px' : '0'};
    overflow: hidden;
    transition: max-height 0.35s ease;
    padding: ${p => p.$isOpen ? '0.5rem 0' : '0'};
  }
`;

const NavLinkA = styled(Link)`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: ${C.text};
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;
  white-space: nowrap;

  &:hover { color: ${C.gold}; }

  @media (max-width: 768px) {
    display: block;
    padding: 0.85rem clamp(1.5rem, 4vw, 4rem);
    white-space: normal;

    &:hover { background: rgba(200, 168, 122, 0.05); }
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
`;

const LangToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: #080808;
  border: 1px solid ${C.dim};
  border-radius: 2px;
  padding: 0.35rem 0.6rem;
  transition: border-color 0.2s;

  &:hover { border-color: ${C.gold}; }
`;

const LangOpt = styled.button<{ $active: boolean }>`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.5rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: ${p => p.$active ? C.gold : C.text};
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: color 0.2s;
  line-height: 1;

  &:hover { color: ${C.gold}; }
`;

const LangSep = styled.span`
  color: ${C.muted};
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.5rem;
  line-height: 1;
  user-select: none;
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

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    align-items: center;
    justify-content: center;
  }

  &:hover { color: ${C.gold}; }

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
  const router = useRouter();
  const { locale, setLocale, t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setMobileMenuOpen(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setMobileMenuOpen(false);

  return (
    <Nav $scrolled={scrolled} role="navigation" aria-label="Art site navigation">
      <NavLogo
        title={t('art.traditional.backToHome')}
        onClick={() => {
          close();
          if (window.location.pathname !== '/art/') {
            router.push('/art/');
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      >
        <Dot />
        CamilaLonart
      </NavLogo>

      <NavLinks $isOpen={mobileMenuOpen}>
        <NavLinkA href="/art/" onClick={close}>{t('nav.home')}</NavLinkA>
        <NavLinkA href="/art/collections/" onClick={close}>{t('nav.collections')}</NavLinkA>
        <NavLinkA href="/art/all-paintings/" onClick={close}>{t('nav.allPaintings')}</NavLinkA>
        <NavLinkA href="/art/early-first-paintings/" onClick={close}>{t('nav.earlyPaintings')}</NavLinkA>
        <NavLinkA href="/art/collaborations/" onClick={close}>{t('nav.collaborations')}</NavLinkA>
        <NavLinkA href="/art/about/" onClick={close}>{t('nav.about')}</NavLinkA>
        <NavLinkA href="/art/contact/" onClick={close}>{t('nav.contact')}</NavLinkA>
      </NavLinks>

      <NavRight>
        <LangToggle aria-label={t('common.changeLanguage')}>
          <LangOpt
            $active={locale === 'en'}
            onClick={() => setLocale('en')}
            aria-label="English"
          >
            EN
          </LangOpt>
          <LangSep>·</LangSep>
          <LangOpt
            $active={locale === 'es'}
            onClick={() => setLocale('es')}
            aria-label="Español"
          >
            ES
          </LangOpt>
        </LangToggle>

        <HamburgerBtn
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(v => !v)}
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
