'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import data, { type Painting } from '@/data/artPortfolio';
import ArtNav from './ArtNav';
import { useTranslation } from '@/i18n/TranslationContext';

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

  * { box-sizing: border-box; }
`;

const Content = styled.main`
  min-height: 100vh;
  padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 5rem);
  padding-top: calc(clamp(4rem, 8vw, 8rem) + 64px);
`;

const PageHeader = styled.div`
  margin-bottom: clamp(3rem, 6vw, 5rem);
  text-align: center;

  h1 {
    font-size: clamp(2.2rem, 5vw, 4rem);
    font-weight: 300;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin: 0 0 1rem;
  }

  p {
    font-family: var(--font-montserrat), sans-serif;
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${C.muted};
    margin: 0 0 1.5rem;
  }
`;

const PaintingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const PaintingCard = styled(Link)`
  text-decoration: none;
  display: block;
  position: relative;
  overflow: hidden;
  aspect-ratio: 3/4;
  border: 1px solid ${C.border};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${C.gold};
    box-shadow: 0 0 20px rgba(200, 168, 122, 0.15);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const CardOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: clamp(1rem, 3vw, 1.5rem);
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  color: ${C.text};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.25rem;
`;

const CardTitle = styled.h3`
  font-size: clamp(1rem, 2vw, 1.4rem);
  font-weight: 300;
  letter-spacing: 0.04em;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const CardMeta = styled.p`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.55rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${C.muted};
  margin: 0;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;

  h2 {
    font-size: 1.5rem;
    color: ${C.muted};
    margin-bottom: 1rem;
  }

  p {
    font-family: var(--font-montserrat), sans-serif;
    font-size: 0.9rem;
    color: ${C.muted};
  }
`;

export default function EarlyPaintingsPage() {
  const { t } = useTranslation();

  if (data.earlyFirstPaintings.length === 0) {
    return (
      <Site>
        <ArtNav />
        <Content>
          <PageHeader>
            <h1>{t('art.earlyFirstPaintings')}</h1>
            <p>{t('art.archivalCollection')}</p>
          </PageHeader>
          <EmptyState>
            <h2>{t('art.comingSoon')}</h2>
            <p>{t('art.beingCurated')}</p>
          </EmptyState>
        </Content>
      </Site>
    );
  }

  return (
    <Site>
      <ArtNav />
      <Content>
        <PageHeader>
          <h1>{t('art.earlyFirstPaintings')}</h1>
          <p>{t('art.archivalCollection')}</p>
        </PageHeader>

        <PaintingsGrid>
          {data.earlyFirstPaintings.map((painting: Painting) => (
            <PaintingCard key={painting.id} href={`#`}>
              <CardImage
                src={painting.images[0]}
                alt={painting.title}
                loading="lazy"
                draggable={false}
                onContextMenu={e => e.preventDefault()}
              />
              <CardOverlay>
                <CardTitle>{painting.title}</CardTitle>
                <CardMeta>{painting.year}</CardMeta>
              </CardOverlay>
            </PaintingCard>
          ))}
        </PaintingsGrid>
      </Content>
    </Site>
  );
}
