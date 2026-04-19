'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import data from '../../data/artPortfolio';
import ArtNav from './ArtNav';

const C = {
  bg: '#080808',
  surface: '#101010',
  border: '#1E1E1E',
  gold: '#C8A87A',
  goldLight: '#E5D4B3',
  text: '#F0EDE8',
  muted: '#6E6B65',
};

const Site = styled.div`
  background: ${C.bg};
  color: ${C.text};
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  -webkit-font-smoothing: antialiased;

  * {
    box-sizing: border-box;
  }
`;

const Content = styled.main`
  padding-top: 64px;
`;

// ─── Breadcrumb ────────────────────────────────────────────────────
const Breadcrumb = styled.nav`
  padding: 2rem clamp(1.5rem, 5vw, 5rem);
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.58rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${C.muted};
  border-bottom: 1px solid ${C.border};
`;

const BreadcrumbLink = styled(Link)`
  color: ${C.gold};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// ─── Header ────────────────────────────────────────────────────────
const Header = styled.section`
  padding: clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 5rem);
  border-bottom: 1px solid ${C.border};
`;

const Title = styled.h1`
  font-size: clamp(3rem, 7vw, 5rem);
  font-weight: 300;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${C.text};
  margin: 0;
  line-height: 1;
`;

// ─── Main Grid ─────────────────────────────────────────────────────
const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 5vw, 6rem);
  padding: clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 5rem);
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: clamp(2rem, 4vw, 4rem);
  }
`;

const PhotoWrap = styled.div`
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  background: ${C.surface};

  img {
    object-fit: cover;
    object-position: center top;
  }
`;

const BioWrap = styled.div``;

const BioParagraph = styled.p`
  font-size: clamp(1rem, 1.8vw, 1.15rem);
  font-weight: 300;
  line-height: 1.9;
  color: ${C.muted};
  margin: 0 0 1.5rem;

  &:first-child {
    color: ${C.text};
    font-style: italic;
    font-size: clamp(1.1rem, 2vw, 1.3rem);
  }
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
  color: ${C.gold};
  text-decoration: none;
  border: 1px solid ${C.border};
  padding: 0.6rem 1.1rem;
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    border-color: ${C.gold};
    color: ${C.goldLight};
  }
`;

const IgIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

// ─── Footer ────────────────────────────────────────────────────────
const Footer = styled.footer`
  border-top: 1px solid ${C.border};
  padding: 2rem clamp(1.5rem, 5vw, 5rem);
  text-align: center;
`;

const FooterText = styled.p`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.55rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${C.muted};
  margin: 0;
`;

// ─── Component ─────────────────────────────────────────────────────
export default function ArtAbout() {
  return (
    <Site>
      <ArtNav />

      <Content>
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbLink href="/art/">Art</BreadcrumbLink> / About
        </Breadcrumb>

        {/* Header */}
        <Header>
          <Title>About the Artist</Title>
        </Header>

        {/* Main Content */}
        <MainGrid>
          {data.about.photoSrc && (
            <PhotoWrap>
              <Image
                src={data.about.photoSrc}
                alt="Camila Londoño"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            </PhotoWrap>
          )}

          <BioWrap>
            {data.about.bio.map((para, i) => (
              <BioParagraph key={i}>{para}</BioParagraph>
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
          </BioWrap>
        </MainGrid>

        {/* Footer */}
        <Footer>
          <FooterText>
            © {new Date().getFullYear()}{' '}
            <span style={{ color: C.gold }}>Camila Londoño</span>. All rights
            reserved.
          </FooterText>
        </Footer>
      </Content>
    </Site>
  );
}
