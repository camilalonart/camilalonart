'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import data, { type Collection } from '../../data/artPortfolio';
import ArtNav from './ArtNav';

const C = {
  bg: '#080808',
  surface: '#101010',
  border: '#1E1E1E',
  gold: '#C8A87A',
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

// ─── Breadcrumbs ───────────────────────────────────────────────────
const Breadcrumbs = styled.nav`
  padding: 2rem clamp(1.5rem, 5vw, 5rem);
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.58rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${C.muted};
`;

const BreadcrumbLink = styled(Link)`
  color: ${C.gold};
  text-decoration: none;
  margin-right: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

// ─── Header ────────────────────────────────────────────────────────
const Header = styled.section`
  padding: 0 clamp(1.5rem, 5vw, 5rem) clamp(3rem, 6vw, 6rem);
  border-bottom: 1px solid ${C.border};
`;

const CollectionName = styled.h1`
  font-size: clamp(3rem, 7vw, 5rem);
  font-weight: 300;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${C.text};
  margin: 0 0 1rem;
  line-height: 1;
`;

const CollectionPeriod = styled.p`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.62rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${C.gold};
  margin: 0 0 1.5rem;
`;

const CollectionDesc = styled.p`
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  font-style: italic;
  font-weight: 300;
  color: ${C.muted};
  max-width: 640px;
  line-height: 1.8;
  margin: 0;
`;

// ─── Paintings Grid ────────────────────────────────────────────────
const PaintingsSection = styled.section`
  padding: clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 5rem);
`;

const PaintingsGrid = styled.div`
  columns: 2 320px;
  column-gap: 3px;

  @media (max-width: 768px) {
    columns: 1;
  }

  @media (max-width: 640px) {
    columns: 1;
  }
`;

const PaintingCard = styled(Link)`
  break-inside: avoid;
  margin-bottom: 3px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  display: block;

  &:hover .painting-overlay {
    opacity: 1;
  }

  &:hover img {
    transform: scale(1.03);
  }
`;

const PaintingImgWrap = styled.div`
  position: relative;
  width: 100%;
  background: ${C.surface};

  img {
    display: block;
    width: 100%;
    height: auto;
    transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
    user-select: none;
    pointer-events: none;
    -webkit-user-drag: none;
  }
`;

const PaintingOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2.5rem 1.25rem 1.25rem;
  background: linear-gradient(to top, rgba(4, 4, 4, 0.93) 50%, transparent);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
`;

const PaintingTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 400;
  letter-spacing: 0.03em;
  color: ${C.text};
  margin: 0 0 0.2rem;
  text-transform: none;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const PaintingMeta = styled.p`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${C.gold};
  margin: 0;
`;

// ─── Navigation ────────────────────────────────────────────────────
const Navigation = styled.div`
  display: flex;
  gap: 2rem;
  padding: clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 5rem);
  border-top: 1px solid ${C.border};
  justify-content: center;
  flex-wrap: wrap;
`;

const NavLink = styled(Link)`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.62rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${C.gold};
  text-decoration: none;
  border: 1px solid ${C.border};
  padding: 0.6rem 1.1rem;
  min-height: 44px;
  display: flex;
  align-items: center;
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    border-color: ${C.gold};
    color: '#E5D4B3';
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

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
interface CollectionPageProps {
  collection: Collection;
}

export default function CollectionPage({ collection }: CollectionPageProps) {
  // Find previous and next collection
  const currentIndex = data.collections.findIndex(c => c.id === collection.id);
  const prevCollection = currentIndex > 0 ? data.collections[currentIndex - 1] : null;
  const nextCollection =
    currentIndex < data.collections.length - 1
      ? data.collections[currentIndex + 1]
      : null;

  return (
    <Site>
      <ArtNav />

      <Content>
        {/* Breadcrumb */}
        <Breadcrumbs>
          <BreadcrumbLink href="/art/">Art</BreadcrumbLink>
          / {collection.name}
        </Breadcrumbs>

        {/* Header */}
        <Header>
          <CollectionName>{collection.name}</CollectionName>
          <CollectionPeriod>{collection.period}</CollectionPeriod>
          <CollectionDesc>{collection.description}</CollectionDesc>
        </Header>

        {/* Paintings */}
        <PaintingsSection>
          <PaintingsGrid>
            {collection.paintings.map(painting => (
              <PaintingCard
                key={painting.id}
                href={`/art/${collection.id}/${painting.id}`}
              >
                <PaintingImgWrap>
                  <img
                    src={painting.images[0]}
                    alt={`${painting.title} — ${painting.materials}`}
                    loading="lazy"
                    draggable={false}
                    onContextMenu={e => e.preventDefault()}
                  />
                  <PaintingOverlay className="painting-overlay">
                    <PaintingTitle>{painting.title}</PaintingTitle>
                    <PaintingMeta>{painting.year} · {painting.materials}</PaintingMeta>
                  </PaintingOverlay>
                </PaintingImgWrap>
              </PaintingCard>
            ))}
          </PaintingsGrid>
        </PaintingsSection>

        {/* Navigation */}
        <Navigation>
          {prevCollection ? (
            <NavLink href={`/art/${prevCollection.id}`}>
              ← {prevCollection.name}
            </NavLink>
          ) : (
            <div style={{ opacity: 0.3, pointerEvents: 'none' }}>
              ← Previous
            </div>
          )}

          {nextCollection ? (
            <NavLink href={`/art/${nextCollection.id}`}>
              {nextCollection.name} →
            </NavLink>
          ) : (
            <div style={{ opacity: 0.3, pointerEvents: 'none' }}>
              Next →
            </div>
          )}
        </Navigation>

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
