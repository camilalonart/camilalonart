'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from '../../i18n/TranslationContext';
import { AE, SmallFlower } from './Doodles';

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-100%); }
  to { opacity: 1; transform: translateY(0); }
`;

const Nav = styled.nav<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(1.25rem, 5vw, 3.5rem);
  min-height: 68px;
  transition: background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
  background: ${p => p.$scrolled ? `rgba(245, 239, 224, 0.97)` : 'transparent'};
  box-shadow: ${p => p.$scrolled ? `0 2px 20px rgba(44, 36, 22, 0.08)` : 'none'};
  border-bottom: 1px solid ${p => p.$scrolled ? `rgba(74, 114, 168, 0.15)` : 'transparent'};
  backdrop-filter: ${p => p.$scrolled ? 'blur(12px)' : 'none'};
  animation: ${slideDown} 0.6s ease both;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  flex-shrink: 0;
`;

const LogoText = styled.span`
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  font-weight: 600;
  font-style: italic;
  color: ${AE.blueDark};
  letter-spacing: 0.01em;
  transition: color 0.2s;

  &:hover { color: ${AE.blue}; }
`;

const LogoSub = styled.span`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.6rem;
  font-weight: 500;
  color: ${AE.warmBrown};
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const NavLinks = styled.div<{ $open: boolean }>`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 900px) {
    position: fixed;
    top: 68px;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    background: rgba(245, 239, 224, 0.98);
    backdrop-filter: blur(16px);
    max-height: ${p => p.$open ? '480px' : '0'};
    overflow: hidden;
    transition: max-height 0.35s ease;
    border-bottom: 1px solid rgba(74, 114, 168, 0.12);
    box-shadow: 0 8px 24px rgba(44, 36, 22, 0.08);
  }
`;

const NavLink = styled.a`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${AE.warmBrown};
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;
  white-space: nowrap;

  &:hover { color: ${AE.blue}; }

  @media (max-width: 900px) {
    display: block;
    padding: 1rem 2rem;
    color: ${AE.ink};
    border-bottom: 1px solid rgba(74, 114, 168, 0.1);

    &:hover {
      background: rgba(74, 114, 168, 0.06);
      color: ${AE.blue};
    }
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
`;

const LangToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  border: 1.5px solid rgba(74, 114, 168, 0.3);
  border-radius: 20px;
  padding: 0.3rem 0.75rem;
  transition: border-color 0.2s;
  background: rgba(245, 239, 224, 0.5);

  &:hover { border-color: ${AE.blue}; }
`;

const LangBtn = styled.button<{ $active: boolean }>`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.62rem;
  font-weight: ${p => p.$active ? '600' : '400'};
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${p => p.$active ? AE.blue : AE.warmBrown};
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
  padding: 0;
  line-height: 1;

  &:hover { color: ${AE.blue}; }
`;

const LangSep = styled.span`
  color: rgba(74, 114, 168, 0.4);
  font-size: 0.6rem;
  line-height: 1;
  user-select: none;
`;

const HamburgerBtn = styled.button<{ $open: boolean }>`
  display: none;
  background: none;
  border: 1.5px solid rgba(74, 114, 168, 0.25);
  border-radius: 8px;
  color: ${AE.ink};
  cursor: pointer;
  padding: 0.5rem;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
  transition: border-color 0.2s;

  @media (max-width: 900px) { display: flex; }
  &:hover { border-color: ${AE.blue}; }

  span {
    display: block;
    width: 18px;
    height: 2px;
    background: ${AE.ink};
    border-radius: 2px;
    transition: all 0.3s ease;

    &:nth-child(1) { transform: ${p => p.$open ? 'rotate(45deg) translate(5px, 5px)' : 'none'}; }
    &:nth-child(2) { opacity: ${p => p.$open ? 0 : 1}; }
    &:nth-child(3) { transform: ${p => p.$open ? 'rotate(-45deg) translate(5px, -5px)' : 'none'}; }
  }
`;

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

export default function ArtExpNav() {
  const { locale, setLocale, t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (open) setOpen(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  const handleNav = (id: string) => {
    setOpen(false);
    scrollTo(id);
  };

  return (
    <Nav $scrolled={scrolled} role="navigation" aria-label="Art Experiences navigation">
      <Logo href="/art-experiences">
        <SmallFlower size={20} color={AE.blue} />
        <div>
          <LogoText>CamilaLonart</LogoText>
        </div>
      </Logo>

      <NavLinks $open={open}>
        <NavLink onClick={() => handleNav('my-experiences')}>{t('artExperiences.nav.myEvents')}</NavLink>
        <NavLink
          href="https://flocksocial.app/flocks/ccb976d0-fadd-47e2-9365-2b90778dfe63"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
        >
          {t('artExperiences.nav.community')}
        </NavLink>
        <NavLink onClick={() => handleNav('you-and-i')}>{t('artExperiences.nav.youAndIPaint')}</NavLink>
        <NavLink onClick={() => handleNav('upcoming')}>{t('artExperiences.nav.upcoming')}</NavLink>
      </NavLinks>

      <NavRight>
        <LangToggle aria-label={t('common.changeLanguage')}>
          <LangBtn $active={locale === 'en'} onClick={() => setLocale('en')} aria-label="English">EN</LangBtn>
          <LangSep>·</LangSep>
          <LangBtn $active={locale === 'es'} onClick={() => setLocale('es')} aria-label="Español">ES</LangBtn>
        </LangToggle>

        <HamburgerBtn
          $open={open}
          onClick={() => setOpen(v => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </HamburgerBtn>
      </NavRight>
    </Nav>
  );
}
