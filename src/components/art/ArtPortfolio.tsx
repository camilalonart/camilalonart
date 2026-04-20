'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import data, { type Collection, type Painting, COLLECTIONS_ORDER } from '../../data/artPortfolio';
import ContactForm from '../ContactForm';
import { useTranslation } from '../../i18n/TranslationContext';

// ─── Palette ────────────────────────────────────────────────────────────────
const C = {
  bg: '#080808',
  surface: '#101010',
  border: '#1E1E1E',
  gold: '#C8A87A',
  goldLight: '#E5D4B3',
  text: '#F0EDE8',
  muted: '#6E6B65',
  dim: '#3A3835',
  white: '#FFFFFF',
};

// ─── Animations ─────────────────────────────────────────────────────────────
const fadeIn = keyframes`from{opacity:0}to{opacity:1}`;
const fadeUp = keyframes`from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}`;
const slideIn = keyframes`from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}`;

// ─── Site wrapper ────────────────────────────────────────────────────────────
const Site = styled.div`
  background: ${C.bg};
  color: ${C.text};
  min-height: 100vh;
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  -webkit-font-smoothing: antialiased;

  * { box-sizing: border-box; }
`;

// ─── Nav ────────────────────────────────────────────────────────────────────
const Nav = styled.nav<{ $scrolled: boolean }>`
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(1rem, 4vw, 3rem);
  height: auto;
  min-height: 64px;
  transition: background 0.4s ease, border-color 0.4s ease;
  background: ${p => p.$scrolled ? 'rgba(8,8,8,0.98)' : 'transparent'};
  border-bottom: 1px solid ${p => p.$scrolled ? C.border : 'transparent'};
  backdrop-filter: ${p => p.$scrolled ? 'blur(12px)' : 'none'};
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 900px) {
    padding: 0 clamp(0.75rem, 3vw, 2rem);
  }

  @media (max-width: 600px) {
    padding: 0.5rem clamp(0.75rem, 3vw, 1.5rem);
  }
`;

const NavLogo = styled.a`
  font-size: 1.05rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${C.text};
  text-decoration: none;
  cursor: pointer;
  font-weight: 300;
  transition: color 0.2s;
  flex-shrink: 0;

  &:focus-visible {
    outline: 2px solid ${C.gold};
    outline-offset: 2px;
  }

  &:hover {
    color: ${C.gold};
  }

  span { color: ${C.text}; }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;

  @media (max-width: 900px) { gap: 1.5rem; }
  @media (max-width: 600px) { gap: 1rem; font-size: 0.55rem; }
`;

const NavLink = styled.a`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: ${C.text};
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;

  &:focus-visible { 
    outline: 2px solid ${C.gold};
    outline-offset: 2px;
  }

  &:hover { color: ${C.gold}; }
`;

const NavLinkComponent = styled(Link)`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: ${C.text};
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;

  &:focus-visible { 
    outline: 2px solid ${C.gold};
    outline-offset: 2px;
  }

  &:hover { color: ${C.gold}; }
`;

// ─── Hero ────────────────────────────────────────────────────────────────────
const Hero = styled.section`
  position: relative;
  height: 100svh;
  min-height: 600px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  padding-bottom: clamp(3rem, 6vw, 6rem);
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(8,8,8,0.15) 0%,
    rgba(8,8,8,0.5) 60%,
    rgba(8,8,8,0.92) 100%
  );
  z-index: 1;
`;

const HeroImgWrap = styled.div`
  position: absolute;
  inset: 0;

  img { object-fit: cover; object-position: center 30%; }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  animation: ${fadeUp} 1.1s ease both;
  animation-delay: 0.2s;
`;

const ArtistName = styled.h1`
  font-size: clamp(3.5rem, 9vw, 9rem);
  font-weight: 300;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${C.text};
  line-height: 0.9;
  margin: 0 0 1.2rem;
`;

const HeroRule = styled.div`
  width: 48px;
  height: 1px;
  background: ${C.gold};
  margin: 0 auto 1.2rem;
`;

const HeroTagline = styled.p`
  font-size: clamp(1rem, 2vw, 1.3rem);
  font-style: italic;
  font-weight: 300;
  color: rgba(240,237,232,0.7);
  letter-spacing: 0.04em;
  margin: 0;
`;

const ScrollCue = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  animation: ${fadeIn} 2s ease 1.5s both;

  span {
    font-family: var(--font-montserrat), sans-serif;
    font-size: 0.55rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: ${C.muted};
  }
`;

const ScrollLine = styled.div`
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, ${C.gold}, transparent);
`;

// ─── Sections ────────────────────────────────────────────────────────────────
const Section = styled.section`
  padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 5rem);
  border-top: 1px solid ${C.border};
`;

const SectionEyebrow = styled.p`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.58rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: ${C.gold};
  margin: 0 0 1rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2.2rem, 5vw, 4.5rem);
  font-weight: 300;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${C.text};
  line-height: 1;
  margin: 0 0 0.75rem;
`;

const CollectionTitleLink = styled(Link)`
  font-size: clamp(2.2rem, 5vw, 4.5rem);
  font-weight: 300;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${C.text};
  line-height: 1;
  margin: 0 0 0.75rem;
  text-decoration: none;
  display: inline-block;
  transition: color 0.3s ease;

  &:hover {
    color: ${C.gold};
  }
`;

const SectionMeta = styled.p`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${C.muted};
  margin: 0 0 1.5rem;
`;

const SectionDesc = styled.p`
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  font-style: italic;
  font-weight: 300;
  color: ${C.muted};
  max-width: 640px;
  line-height: 1.8;
  margin: 0 0 3.5rem;
`;

// ─── Painting grid ───────────────────────────────────────────────────────────
const PaintingGrid = styled.div`
  columns: 2 320px;
  column-gap: 3px;

  @media (max-width: 500px) { columns: 1; }
`;

// ─── Collection grid (with always-visible titles) ──────────────────────────────
const CollectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const CollectionCard = styled(Link)`
  position: relative;
  cursor: pointer;
  overflow: hidden;
  aspect-ratio: 3/4;
  background: ${C.surface};
  display: block;
  text-decoration: none;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.65s cubic-bezier(0.4,0,0.2,1);
    user-select: none;
    pointer-events: none;
    -webkit-user-drag: none;
  }

  &:hover img { transform: scale(1.05); }
`;

const PaintingCard = styled.article`
  break-inside: avoid;
  margin-bottom: 3px;
  position: relative;
  cursor: pointer;
  overflow: hidden;

  &:hover .card-overlay { opacity: 1; }
  &:hover img { transform: scale(1.03); }
`;

const PaintingImgWrap = styled.div`
  position: relative;
  width: 100%;
  background: ${C.surface};

  img {
    display: block;
    width: 100%;
    height: auto;
    transition: transform 0.65s cubic-bezier(0.4,0,0.2,1);
    user-select: none;
    pointer-events: none;
    -webkit-user-drag: none;
  }
`;

const CardOverlay = styled.div.attrs({ className: 'card-overlay' })`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, transparent);
  pointer-events: none;
`;

const CollectionCardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
  pointer-events: none;
`;

const CardTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 400;
  letter-spacing: 0.03em;
  color: ${C.text};
  margin: 0 0 0.2rem;
  text-transform: none;
`;

const CollectionCardTitle = styled.h3`
  font-size: clamp(1.3rem, 3vw, 1.8rem);
  font-weight: 400;
  letter-spacing: 0.04em;
  color: ${C.text};
  margin: 0;
  text-transform: none;
  text-align: left;
`;

const CardMeta = styled.p`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${C.gold};
  margin: 0;
`;

// ─── Lightbox ────────────────────────────────────────────────────────────────
const LightboxBackdrop = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(3,3,3,0.97);
  z-index: 9000;
  display: ${p => p.$open ? 'flex' : 'none'};
  flex-direction: row;
  animation: ${p => p.$open ? css`${fadeIn} 0.25s ease` : 'none'};

  @media (max-width: 800px) { flex-direction: column; }
`;

const LightboxImg = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem 5rem;
  min-height: 0;

  @media (max-width: 800px) {
    padding: 4rem 1rem 1rem;
    flex: 0 0 55vh;
  }
`;

const LightboxImgInner = styled.div`
  position: relative;
  max-width: 100%;
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LightboxImgActual = styled.img`
  max-width: min(70vw, 900px);
  max-height: 80vh;
  object-fit: contain;
  display: block;
  user-select: none;
  pointer-events: none;
  -webkit-user-drag: none;

  @media (max-width: 800px) {
    max-width: 90vw;
    max-height: 50vh;
  }
`;

const ImgWatermark = styled.div`
  position: absolute;
  bottom: 0.6rem;
  right: 0.6rem;
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.55rem;
  letter-spacing: 0.2em;
  color: rgba(200, 168, 122, 0.8);
  background: rgba(0,0,0,0.5);
  padding: 0.2rem 0.5rem;
  pointer-events: none;
  user-select: none;
`;

const ThumbnailRow = styled.div`
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
`;

const Thumb = styled.button<{ $active: boolean }>`
  width: 44px;
  height: 30px;
  padding: 0;
  border: 1px solid ${p => p.$active ? C.gold : C.dim};
  background: none;
  cursor: pointer;
  overflow: hidden;
  transition: border-color 0.2s;
  opacity: ${p => p.$active ? 1 : 0.5};

  img { width: 100%; height: 100%; object-fit: cover; display: block; }
`;

const LightboxInfo = styled.div`
  width: 340px;
  flex-shrink: 0;
  padding: 5rem 2.5rem 2.5rem;
  border-left: 1px solid ${C.border};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 800px) {
    width: 100%;
    border-left: none;
    border-top: 1px solid ${C.border};
    padding: 1.5rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    overflow-x: hidden;
  }
`;

const InfoHandle = styled.p`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: ${C.gold};
  margin: 0 0 2rem;
`;

const InfoTitle = styled.h2`
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-weight: 300;
  letter-spacing: 0.04em;
  text-transform: none;
  color: ${C.text};
  margin: 0 0 1.5rem;
  line-height: 1.15;
`;

const InfoMeta = styled.dl`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 1.5rem;
  row-gap: 0.6rem;
  margin: 0 0 2rem;
`;

const MetaKey = styled.dt`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.55rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${C.muted};
  line-height: 1.6;
`;

const MetaVal = styled.dd`
  font-size: 0.95rem;
  font-style: italic;
  color: ${C.text};
  opacity: 0.85;
  margin: 0;
  line-height: 1.6;
`;

const ThoughtsToggle = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${C.gold};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  transition: opacity 0.2s;

  &:hover { opacity: 0.7; }
`;

const ThoughtsText = styled.p<{ $open: boolean }>`
  font-size: 1rem;
  font-style: italic;
  font-weight: 300;
  color: ${C.muted};
  line-height: 1.85;
  margin: 0;
  max-height: ${p => p.$open ? '500px' : '0'};
  overflow: hidden;
  transition: max-height 0.4s ease;
  animation: ${p => p.$open ? css`${fadeUp} 0.3s ease` : 'none'};
`;

const LightboxNav = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid ${C.border};

  @media (max-width: 800px) { display: none; }
`;

const NavBtn = styled.button<{ $disabled?: boolean }>`
  background: none;
  border: 1px solid ${p => p.$disabled ? C.dim : C.border};
  color: ${p => p.$disabled ? C.dim : C.muted};
  width: 2.5rem;
  height: 2.5rem;
  cursor: ${p => p.$disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: border-color 0.2s, color 0.2s;

  &:hover:not(:disabled) { border-color: ${C.gold}; color: ${C.gold}; }
`;

const NavCounter = styled.span`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  color: ${C.muted};
  flex: 1;
  text-align: center;
`;

const CloseBtn = styled.button`
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 9001;
  background: none;
  border: 1px solid ${C.border};
  color: ${C.muted};
  width: 2.75rem;
  height: 2.75rem;
  font-size: 1.3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s, color 0.2s;

  &:hover { border-color: ${C.gold}; color: ${C.gold}; }
  &:focus-visible { outline: 2px solid ${C.gold}; outline-offset: 2px; }
`;

// ─── About ───────────────────────────────────────────────────────────────────
const AboutSection = styled(Section)`
  background: rgb(230, 230, 228);
  color: #080808;
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 5vw, 6rem);
  align-items: start;

  @media (max-width: 700px) { grid-template-columns: 1fr; }
`;

const AboutPhoto = styled.div`
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  background: ${C.surface};

  img { object-fit: cover; object-position: center top; }
`;

const AboutText = styled.div`
  padding-top: 1rem;
`;

const BioP = styled.p`
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  font-weight: 300;
  line-height: 1.9;
  color: #333333;
  margin: 0 0 1.25rem;

  &:first-child { color: #080808; font-style: italic; }
`;

const AboutEyebrow = styled(SectionEyebrow)`
  color: #666666;
`;

const AboutTitle = styled(SectionTitle)`
  color: #080808;
`;

const InstagramLinks = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid ${C.border};
`;

const IgLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.62rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #333333;
  text-decoration: none;
  border: 1px solid #999999;
  padding: 0.6rem 1.1rem;
  transition: border-color 0.2s, color 0.2s, background-color 0.2s;

  &:hover {
    border-color: #333333;
    color: ${C.text};
    background-color: rgba(0,0,0,0.05);
  }
`;

const IgIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <circle cx="12" cy="12" r="5"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);

// ─── Other projects ──────────────────────────────────────────────────────────
const ProjectsGrid = styled.div`
  columns: 3 200px;
  column-gap: 3px;

  @media (max-width: 500px) { columns: 2; }
`;

const ProjectsButtonGroup = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 2rem;

  @media (max-width: 600px) {
    gap: 1rem;
  }
`;

const ProjectsButton = styled(Link)`
  flex: 1;
  min-width: 200px;
  padding: 2rem;
  border: 1px solid ${C.border};
  background: transparent;
  color: ${C.text};
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  text-decoration: none;
  display: block;

  &:hover {
    border-color: ${C.gold};
    background: rgba(200, 168, 122, 0.05);
  }

  p {
    margin: 0;
    font-family: var(--font-montserrat), sans-serif;
    font-size: 0.6rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: ${C.muted};
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 300;
    letter-spacing: 0.04em;
    margin: 0.5rem 0 0;
    color: ${C.text};
  }
`;

// ─── Selected Works ───────────────────────────────────────────────────────────
const SelectedWorksGrid = styled.div`
  columns: 5 150px;
  column-gap: 2px;

  @media (max-width: 1200px) { columns: 4 140px; }
  @media (max-width: 768px) { columns: 3 120px; }
  @media (max-width: 500px) { columns: 2 100px; }
`;

const SelectedWorkCard = styled(Link)`
  break-inside: avoid;
  margin-bottom: 2px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  aspect-ratio: auto;
  display: block;
  text-decoration: none;

  img {
    display: block;
    width: 100%;
    height: auto;
    transition: transform 0.5s cubic-bezier(0.4,0,0.2,1);
    user-select: none;
    pointer-events: none;
    -webkit-user-drag: none;
  }

  &:hover img { transform: scale(1.08); }
`;

// ─── Footer ──────────────────────────────────────────────────────────────────
const Footer = styled.footer`
  border-top: 1px solid ${C.border};
  padding: 2rem clamp(1.5rem, 5vw, 5rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FooterText = styled.p`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.55rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${C.muted};
  margin: 0;
`;

const FooterGold = styled.span`
  color: ${C.gold};
`;

// ─── Contact Section ────────────────────────────────────────────────────────
const ContactSection = styled(Section)`
  background: ${C.surface};
  border-top: 1px solid ${C.border};
`;

const ContactContent = styled.div`
  max-width: 700px;
`;

const ContactTitle = styled(SectionTitle)``;

const ContactDescription = styled.p`
  font-size: 1.05rem;
  font-weight: 300;
  line-height: 1.8;
  color: ${C.muted};
  margin: 1.5rem 0 2.5rem;
`;

const ContactFormWrapper = styled.div`
  background: ${C.bg};
  padding: 2rem;
  border: 1px solid ${C.border};
  border-radius: 4px;

  @media (max-width: 600px) {
    padding: 1.5rem;
  }
`;

// ─── Types ───────────────────────────────────────────────────────────────────
interface ModalState {
  painting: Painting;
  siblings: Painting[];
  siblingIndex: number;
  imageIndex: number;
  thoughtsOpen: boolean;
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function ArtPortfolio() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [modal, setModal] = useState<ModalState | null>(null);

  // Scroll listener for nav
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setModal(null); return; }
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft') navigate(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modal]);

  // Lock scroll when modal open
  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [!!modal]);

  const openPainting = useCallback(
    (painting: Painting, siblings: Painting[]) => {
      setModal({
        painting,
        siblings,
        siblingIndex: siblings.indexOf(painting),
        imageIndex: 0,
        thoughtsOpen: false,
      });
    },
    []
  );

  const navigate = useCallback((dir: 1 | -1) => {
    setModal(prev => {
      if (!prev) return prev;
      const next = prev.siblingIndex + dir;
      if (next < 0 || next >= prev.siblings.length) return prev;
      return {
        ...prev,
        painting: prev.siblings[next],
        siblingIndex: next,
        imageIndex: 0,
        thoughtsOpen: false,
      };
    });
  }, []);

  const heroImage = '/images/art/traditionalArt/Carrying Home/We.webp';

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const sortedCollections = [...data.collections].sort((a, b) => {
    const aIndex = COLLECTIONS_ORDER.indexOf(a.id);
    const bIndex = COLLECTIONS_ORDER.indexOf(b.id);
    return aIndex - bIndex;
  });

  return (
    <Site>
      {/* ── Nav ── */}
      <Nav $scrolled={scrolled} role="navigation" aria-label="Site navigation">
        <NavLogo 
        // on click it will take you to /art
          onClick={() => window.location.href = '/art'}
          role="button"
          tabIndex={0}
          aria-label="Camila Londoño - Go to home"
        >
          CamilaLonart
        </NavLogo>
        <NavLinks>
          <NavLinkComponent href="/art">Home</NavLinkComponent>
          <NavLinkComponent href="/art/collections">Collections</NavLinkComponent>
          <NavLinkComponent href="/art/all-paintings">All Paintings</NavLinkComponent>
          <NavLinkComponent href="/art/early-first-paintings">Archival Works</NavLinkComponent>
          <NavLinkComponent href="/art/collaborations">Collaborations</NavLinkComponent>
          <NavLink 
            onClick={() => scrollTo('about')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                scrollTo('about');
              }
            }}
            aria-label="Scroll to about section"
          >
            About
          </NavLink>
          <NavLink 
            onClick={() => scrollTo('contact-section')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                scrollTo('contact-section');
              }
            }}
            aria-label="Scroll to contact section"
          >
            Contact
          </NavLink>
        </NavLinks>
      </Nav>

      {/* ── Hero ── */}
      <Hero>
        <HeroImgWrap>
          <Image
            src={heroImage}
            alt="Featured artwork by Camila Londoño"
            fill
            priority
            sizes="100vw"
            draggable={false}
          />
        </HeroImgWrap>
        <HeroBg />
        <HeroContent>
          <ArtistName>CamilaLonart</ArtistName>
          <HeroRule />
          <HeroTagline>Fine Artist</HeroTagline>
          <br/>
        </HeroContent>
        <ScrollCue aria-hidden="true">
          <ScrollLine />
          <span>Scroll</span>
        </ScrollCue>
      </Hero>

      {/* ── Selected Works ── */}
      <Section>
        <SelectedWorksGrid>
          {data.selectedWorks.map(work => (
            <SelectedWorkCard
              key={work.id}
              href={`/art/${work.collectionId}/${work.paintingId}`}
            >
              <img
                src={work.image}
                alt="Selected work"
                loading="lazy"
                draggable={false}
                onContextMenu={e => e.preventDefault()}
              />
            </SelectedWorkCard>
          ))}
        </SelectedWorksGrid>
      </Section>

      {/* ── Other projects ── */}
      <Section id="other-work">
        <SectionEyebrow>Explore</SectionEyebrow>
        <ProjectsButtonGroup>
          <ProjectsButton href="/art/collections">
            <p>Current</p>
            <h3>Collections</h3>
          </ProjectsButton>
          <ProjectsButton href="/art/early-first-paintings">
            <p>Archival</p>
            <h3>Early First Paintings</h3>
          </ProjectsButton>
          <ProjectsButton href="/art/collaborations">
            <p>Creative</p>
            <h3>Collaborations</h3>
          </ProjectsButton>
        </ProjectsButtonGroup>
      </Section>

      {/* ── Collections ── */}
      <div id="collections">
        {sortedCollections.map((col: Collection, i: number) => (
          <Section key={col.id}>
            <SectionEyebrow>Collection {String(i + 1).padStart(2, '0')}</SectionEyebrow>
            <CollectionTitleLink href={`/art/${col.id}`}>{col.name}</CollectionTitleLink>
            <SectionMeta>{col.period}</SectionMeta>
            {col.description && <SectionDesc>{col.description}</SectionDesc>}
            <CollectionGrid>
              {col.paintings.map(p => (
                <CollectionCard
                  key={p.id}
                  href={`/art/${col.id}/${p.id}`}
                  aria-label={`Open ${p.title}, ${p.year}`}
                >
                  <img
                    src={p.images[0]}
                    alt={`${p.title} — ${p.materials}`}
                    loading="lazy"
                    draggable={false}
                    onContextMenu={e => e.preventDefault()}
                  />
                  <CollectionCardOverlay>
                    <CollectionCardTitle>{p.title}</CollectionCardTitle>
                  </CollectionCardOverlay>
                </CollectionCard>
              ))}
            </CollectionGrid>
          </Section>
        ))}
      </div>

      {/* ── About ── */}
      <AboutSection id="about">
        <AboutEyebrow>The Artist</AboutEyebrow>
        <AboutTitle>About</AboutTitle>
        <AboutGrid>
          {data.about.photoSrc && (
            <AboutPhoto>
              <Image
                src={data.about.photoSrc}
                alt="Camila Londoño"
                fill
                sizes="(max-width: 700px) 100vw, 45vw"
              />
            </AboutPhoto>
          )}
          <AboutText>
            {data.about.bio.map((para, i) => (
              <BioP key={i}>{para}</BioP>
            ))}
            <InstagramLinks>
              <IgLink
                href={data.about.instagram1Url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram: ${data.about.instagram1Handle}`}
              >
                <IgIcon />
                {data.about.instagram1Handle}
              </IgLink>
              <IgLink
                href={data.about.instagram2Url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram: ${data.about.instagram2Handle}`}
              >
                <IgIcon />
                {data.about.instagram2Handle}
              </IgLink>
            </InstagramLinks>
          </AboutText>
        </AboutGrid>
      </AboutSection>

      {/* ── Contact ── */}
      <ContactSection id="contact-section" role="region" aria-label="Contact Camila">
        <ContactContent>
          <SectionEyebrow>{t('nav.contact')}</SectionEyebrow>
          <ContactTitle>{t('art.contact.heading')}</ContactTitle>
          <ContactDescription>
            {t('art.contact.portfolioDescription')}
          </ContactDescription>
          <ContactFormWrapper role="form" aria-label="Contact form">
            <ContactForm service="art-inquiry" />
          </ContactFormWrapper>
        </ContactContent>
      </ContactSection>

      {/* ── Footer ── */}
      <Footer>
        <FooterText>
          © {new Date().getFullYear()} <FooterGold>Camila Londoño</FooterGold>. All rights reserved.
        </FooterText>
        <FooterText>
          <FooterGold>@camilalonart</FooterGold>
        </FooterText>
      </Footer>

      {/* ── Lightbox ── */}
      {modal && (
        <LightboxBackdrop
          $open
          role="dialog"
          aria-modal
          aria-label={modal.painting.title}
        >
          <CloseBtn
            onClick={() => setModal(null)}
            aria-label={t('common.close')}
          >
            ×
          </CloseBtn>

          <LightboxImg>
            <LightboxImgInner>
              <LightboxImgActual
                src={modal.painting.images[modal.imageIndex]}
                alt={`${modal.painting.title} — ${modal.painting.materials}, ${modal.painting.year}`}
                onContextMenu={e => e.preventDefault()}
                draggable={false}
              />
              <ImgWatermark>@camilalonart</ImgWatermark>
            </LightboxImgInner>

            {modal.painting.images.length > 1 && (
              <ThumbnailRow>
                {modal.painting.images.map((src, i) => (
                  <Thumb
                    key={i}
                    $active={i === modal.imageIndex}
                    onClick={() => setModal(m => m ? { ...m, imageIndex: i } : m)}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={src} alt="" />
                  </Thumb>
                ))}
              </ThumbnailRow>
            )}
          </LightboxImg>

          <LightboxInfo>
            <InfoHandle>@camilalonart</InfoHandle>
            <InfoTitle>{modal.painting.title}</InfoTitle>
            <InfoMeta>
              <MetaKey>Year</MetaKey>
              <MetaVal>{modal.painting.year}</MetaVal>
              <MetaKey>Materials</MetaKey>
              <MetaVal>{modal.painting.materials}</MetaVal>
              <MetaKey>Size</MetaKey>
              <MetaVal>{modal.painting.size}</MetaVal>
            </InfoMeta>

            {modal.painting.thoughts && (
              <>
                <ThoughtsToggle
                  onClick={() => setModal(m => m ? { ...m, thoughtsOpen: !m.thoughtsOpen } : m)}
                  aria-expanded={modal.thoughtsOpen}
                >
                  Artist&apos;s Statement
                  <span>{modal.thoughtsOpen ? '−' : '+'}</span>
                </ThoughtsToggle>
                <ThoughtsText $open={modal.thoughtsOpen}>
                  {modal.painting.thoughts}
                </ThoughtsText>
              </>
            )}

            <LightboxNav>
              <NavBtn
                onClick={() => navigate(-1)}
                $disabled={modal.siblingIndex === 0}
                disabled={modal.siblingIndex === 0}
                aria-label={t('gallery.previousPainting')}
              >
                ←
              </NavBtn>
              <NavCounter>
                {modal.siblingIndex + 1} / {modal.siblings.length}
              </NavCounter>
              <NavBtn
                onClick={() => navigate(1)}
                $disabled={modal.siblingIndex === modal.siblings.length - 1}
                disabled={modal.siblingIndex === modal.siblings.length - 1}
                aria-label={t('gallery.nextPainting')}
              >
                →
              </NavBtn>
            </LightboxNav>
          </LightboxInfo>
        </LightboxBackdrop>
      )}
    </Site>
  );
}
