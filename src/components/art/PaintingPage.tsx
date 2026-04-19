'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import data, { type Painting, type Collection } from '../../data/artPortfolio';
import ArtNav from './ArtNav';

const C = {
  bg: '#080808',
  surface: '#101010',
  border: '#1E1E1E',
  gold: '#C8A87A',
  goldLight: '#E5D4B3',
  text: '#F0EDE8',
  muted: '#6E6B65',
  dim: '#3A3835',
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
  min-height: 100vh;
`;

// ─── Breadcrumbs ───────────────────────────────────────────────────
const Breadcrumbs = styled.nav`
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
  margin-right: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

// ─── Main Grid ─────────────────────────────────────────────────────
const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
  min-height: calc(100vh - 64px - 140px);
  gap: 0;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

// ─── Image Section ────────────────────────────────────────────────
const ImageSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(2rem, 4vw, 4rem);
  position: relative;
  background: ${C.surface};

  @media (max-width: 1024px) {
    padding: clamp(2rem, 4vw, 4rem);
    min-height: 60vh;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MainImage = styled.img`
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  display: block;
  user-select: none;
  pointer-events: none;
  -webkit-user-drag: none;

  @media (max-width: 1024px) {
    max-height: 50vh;
  }
`;

const Watermark = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.55rem;
  letter-spacing: 0.2em;
  color: rgba(200, 168, 122, 0.8);
  background: rgba(0, 0, 0, 0.5);
  padding: 0.3rem 0.6rem;
  pointer-events: none;
  user-select: none;
`;

const ThumbnailRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Thumb = styled.button<{ $active: boolean }>`
  width: 56px;
  height: 40px;
  padding: 0;
  border: 1px solid ${p => p.$active ? C.gold : C.dim};
  background: none;
  cursor: pointer;
  overflow: hidden;
  transition: border-color 0.2s;
  opacity: ${p => p.$active ? 1 : 0.5};

  &:hover {
    border-color: ${C.gold};
    opacity: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

// ─── Info Section ─────────────────────────────────────────────────
const InfoSection = styled.section`
  padding: clamp(3rem, 4vw, 4rem);
  border-left: 1px solid ${C.border};
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    border-left: none;
    border-top: 1px solid ${C.border};
    padding: clamp(2rem, 4vw, 4rem);
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

const InfoTitle = styled.h1`
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 300;
  letter-spacing: 0.04em;
  text-transform: none;
  color: ${C.text};
  margin: 0 0 1.5rem;
  line-height: 1.2;
`;

const MetaGrid = styled.dl`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 1.5rem;
  row-gap: 0.8rem;
  margin: 0 0 2rem;
  padding: 1.5rem 0;
  border-top: 1px solid ${C.border};
  border-bottom: 1px solid ${C.border};
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

const ThoughtsSection = styled.div`
  margin-top: auto;
  padding-top: 1.5rem;
`;

const ThoughtsTitle = styled.h3`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${C.gold};
  margin: 0 0 1rem;
`;

const ThoughtsText = styled.p`
  font-size: 0.95rem;
  font-style: italic;
  font-weight: 300;
  color: ${C.muted};
  line-height: 1.8;
  margin: 0;
`;

// ─── Navigation ────────────────────────────────────────────────────
const NavBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 5vw, 5rem);
  border-top: 1px solid ${C.border};
  justify-content: center;
`;

const NavBtn = styled(Link)<{ $disabled?: boolean }>`
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
  text-decoration: none;

  &:hover:not(:disabled) {
    border-color: ${C.gold};
    color: ${C.gold};
  }
`;

const NavDisabledBtn = styled.button<{ $disabled: boolean }>`
  background: none;
  border: 1px solid ${C.dim};
  color: ${C.dim};
  width: 2.5rem;
  height: 2.5rem;
  cursor: not-allowed;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;

const NavCounter = styled.span`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  color: ${C.muted};
  flex: 1;
  text-align: center;
  min-width: 100px;
`;

// ─── Component ─────────────────────────────────────────────────────
interface PaintingPageProps {
  painting: Painting;
  collection: Collection;
  siblingIndex: number;
}

export default function PaintingPage({
  painting,
  collection,
  siblingIndex,
}: PaintingPageProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [siblingIndex, collection.id]);

  const navigate = (dir: 1 | -1) => {
    const nextIndex = siblingIndex + dir;
    if (nextIndex < 0 || nextIndex >= collection.paintings.length) return;

    const nextPainting = collection.paintings[nextIndex];
    router.push(`/art/${collection.id}/${nextPainting.id}`);
  };

  const hasPrev = siblingIndex > 0;
  const hasNext = siblingIndex < collection.paintings.length - 1;
  const prevPainting = hasPrev ? collection.paintings[siblingIndex - 1] : null;
  const nextPainting = hasNext ? collection.paintings[siblingIndex + 1] : null;

  return (
    <Site>
      <ArtNav />

      <Content>
        {/* Breadcrumbs */}
        <Breadcrumbs>
          <BreadcrumbLink href="/art/">Art</BreadcrumbLink> /{' '}
          <BreadcrumbLink href={`/art/${collection.id}`}>
            {collection.name}
          </BreadcrumbLink>{' '}
          / {painting.title}
        </Breadcrumbs>

        {/* Main Content */}
        <MainGrid>
          {/* Image */}
          <ImageSection>
            <ImageContainer>
              <MainImage
                src={painting.images[imageIndex]}
                alt={`${painting.title} — ${painting.materials}`}
                draggable={false}
                onContextMenu={e => e.preventDefault()}
              />
              <Watermark>@camilalonart</Watermark>

              {painting.images.length > 1 && (
                <ThumbnailRow>
                  {painting.images.map((src, i) => (
                    <Thumb
                      key={i}
                      $active={i === imageIndex}
                      onClick={() => setImageIndex(i)}
                      aria-label={`View image ${i + 1}`}
                    >
                      <img src={src} alt="" />
                    </Thumb>
                  ))}
                </ThumbnailRow>
              )}
            </ImageContainer>
          </ImageSection>

          {/* Info */}
          <InfoSection>
            <InfoHandle>@camilalonart</InfoHandle>
            <InfoTitle>{painting.title}</InfoTitle>

            <MetaGrid>
              <MetaKey>Year</MetaKey>
              <MetaVal>{painting.year}</MetaVal>
              <MetaKey>Materials</MetaKey>
              <MetaVal>{painting.materials}</MetaVal>
              <MetaKey>Size</MetaKey>
              <MetaVal>{painting.size}</MetaVal>
            </MetaGrid>

            {painting.thoughts && (
              <ThoughtsSection>
                <ThoughtsTitle>Artist's Statement</ThoughtsTitle>
                <ThoughtsText>{painting.thoughts}</ThoughtsText>
              </ThoughtsSection>
            )}
          </InfoSection>
        </MainGrid>

        {/* Navigation */}
        <NavBar>
          {hasPrev && prevPainting ? (
            <NavBtn href={`/art/${collection.id}/${prevPainting.id}`}>
              ←
            </NavBtn>
          ) : (
            <NavDisabledBtn $disabled={true} disabled>
              ←
            </NavDisabledBtn>
          )}

          <NavCounter>
            {siblingIndex + 1} / {collection.paintings.length}
          </NavCounter>

          {hasNext && nextPainting ? (
            <NavBtn href={`/art/${collection.id}/${nextPainting.id}`}>
              →
            </NavBtn>
          ) : (
            <NavDisabledBtn $disabled={true} disabled>
              →
            </NavDisabledBtn>
          )}
        </NavBar>
      </Content>
    </Site>
  );
}
