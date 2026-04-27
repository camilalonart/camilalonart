'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import data, { COLLECTIONS_ORDER, type Collection } from '@/data/artPortfolio';
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
  padding-top: 64px;
  min-height: 100vh;
  padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 5rem);
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
    margin: 0;
  }
`;

const CollectionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CollectionCardLink = styled(Link)`
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
  padding: clamp(1.5rem, 4vw, 2.5rem);
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: ${C.text};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const CardTitle = styled.h2`
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 300;
  letter-spacing: 0.04em;
  margin: 0;
`;

const CardMeta = styled.p`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${C.gold};
  margin: 0;
`;

export default function CollectionsPage() {
  const { t } = useTranslation();
  const sortedCollections = data.collections.sort((a, b) => {
    const indexA = COLLECTIONS_ORDER.indexOf(a.id);
    const indexB = COLLECTIONS_ORDER.indexOf(b.id);
    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
  });

  return (
    <Site>
      <ArtNav />
      <Content>
        <PageHeader>
          <h1>{t('art.collectionsTitle')}</h1>
          <p>{t('art.exploreAllCollections')}</p>
        </PageHeader>

        <CollectionsGrid>
          {sortedCollections.map((col: Collection) => (
            <CollectionCardLink key={col.id} href={`/art/${col.id}`}>
              <CardImage
                src={col.paintings[0]?.images[0] || '/placeholder.webp'}
                alt={col.name}
                loading="lazy"
                draggable={false}
                onContextMenu={e => e.preventDefault()}
              />
              <CardOverlay>
                <CardTitle>{col.name}</CardTitle>
                <CardMeta>{col.period}</CardMeta>
              </CardOverlay>
            </CollectionCardLink>
          ))}
        </CollectionsGrid>
      </Content>
    </Site>
  );
}
