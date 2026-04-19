'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import data from '../../data/artPortfolio';

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

// ─── Layout ────────────────────────────────────────────────────────────────
const PageWrapper = styled.div`
  background: ${C.bg};
  color: ${C.text};
  min-height: 100vh;
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  -webkit-font-smoothing: antialiased;

  * { box-sizing: border-box; }
`;

const PageHeader = styled.section`
  padding: clamp(6rem, 10vw, 10rem) clamp(1.5rem, 5vw, 5rem) clamp(3rem, 6vw, 6rem);
  border-bottom: 1px solid ${C.border};
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 300;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${C.text};
  line-height: 1;
  margin: 0 0 1rem;
`;

const PageSubtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-style: italic;
  font-weight: 300;
  color: ${C.muted};
  letter-spacing: 0.04em;
  margin: 0;
  max-width: 640px;
  line-height: 1.8;
  margin-left: auto;
  margin-right: auto;
`;

const GalleryContainer = styled.section`
  padding: clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 5rem);
`;

// ─── Masonry Gallery ────────────────────────────────────────────────────────
const MasonryGrid = styled.div`
  columns: 4 280px;
  column-gap: 2px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1200px) { columns: 3 240px; }
  @media (max-width: 768px) { columns: 2 180px; }
  @media (max-width: 500px) { columns: 1; }
`;

const GalleryCard = styled(Link)`
  break-inside: avoid;
  margin-bottom: 2px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  display: block;
  text-decoration: none;
  background: ${C.surface};

  img {
    display: block;
    width: 100%;
    height: auto;
    transition: transform 0.6s cubic-bezier(0.4,0,0.2,1);
    user-select: none;
    pointer-events: none;
    -webkit-user-drag: none;
  }

  &:hover img { transform: scale(1.05); }
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.2rem;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, transparent);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const GalleryCard_Hover = styled(GalleryCard)`
  &:hover ${CardOverlay} { opacity: 1; }
`;

const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.03em;
  color: ${C.text};
  margin: 0 0 0.3rem;
`;

const CardMeta = styled.p`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.55rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${C.gold};
  margin: 0;
`;

// ─── Footer ────────────────────────────────────────────────────────────────
const PageFooter = styled.footer`
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

const FooterGold = styled.span`
  color: ${C.gold};
`;

// ─── Component ────────────────────────────────────────────────────────────
export default function AllPaintingsPage() {
  const [allPaintings, setAllPaintings] = useState<
    Array<{ id: string; title: string; year: number; materials: string; image: string; collectionId: string; paintingId: string }>
  >([]);

  useEffect(() => {
    // Combine all paintings from all collections and early works
    const combined: Array<{ id: string; title: string; year: number; materials: string; image: string; collectionId: string; paintingId: string }> = [];

    // Add paintings from all collections
    data.collections.forEach(collection => {
      collection.paintings.forEach(painting => {
        combined.push({
          id: painting.id,
          title: painting.title,
          year: painting.year,
          materials: painting.materials,
          image: painting.images[0],
          collectionId: collection.id,
          paintingId: painting.id,
        });
      });
    });

    // Add early/first paintings
    data.earlyFirstPaintings.forEach(painting => {
      combined.push({
        id: `early-${painting.id}`,
        title: painting.title,
        year: painting.year,
        materials: painting.materials,
        image: painting.images[0],
        collectionId: 'early-first-paintings',
        paintingId: painting.id,
      });
    });

    // Sort by year descending (newest first)
    combined.sort((a, b) => b.year - a.year);
    setAllPaintings(combined);
  }, []);

  return (
    <PageWrapper>
      {/* ── Header ── */}
      <PageHeader role="region" aria-label="Page header">
        <PageTitle as="h1">All Paintings</PageTitle>
        <PageSubtitle>
          A complete collection of paintings spanning different periods and series, from archival works to contemporary pieces.
        </PageSubtitle>
      </PageHeader>

      {/* ── Gallery ── */}
      <GalleryContainer>
        <MasonryGrid role="region" aria-label="Art gallery showcasing all paintings">
          {allPaintings.map(painting => (
            <GalleryCard_Hover
              key={painting.id}
              href={`/art/${painting.collectionId}/${painting.paintingId}`}
              aria-label={`View ${painting.title}, ${painting.year}. ${painting.materials}`}
              role="article"
            >
              <img
                src={painting.image}
                alt={`${painting.title} — ${painting.materials}, ${painting.year}`}
                loading="lazy"
                draggable={false}
                onContextMenu={e => e.preventDefault()}
              />
              <CardOverlay>
                <CardTitle>{painting.title}</CardTitle>
                <CardMeta>{painting.year}</CardMeta>
              </CardOverlay>
            </GalleryCard_Hover>
          ))}
        </MasonryGrid>
      </GalleryContainer>

      {/* ── Footer ── */}
      <PageFooter role="contentinfo">
        <FooterText>
          © {new Date().getFullYear()} <FooterGold>Camila Londoño</FooterGold>. All rights reserved.
        </FooterText>
      </PageFooter>
    </PageWrapper>
  );
}
