'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled, { keyframes } from 'styled-components';
import ArtExpNav from '../../../components/artExperiences/ArtExpNav';
import ArtExpFooter from '../../../components/artExperiences/ArtExpFooter';
import { AE, StarSpark } from '../../../components/artExperiences/Doodles';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const ALL_IMAGES = [
  'A7T01622', 'A7T03212', 'A7T03221', 'A7T03278', 'A7T03346',
  'A7T06057', 'A7T06088', 'A7T06154', 'A7T06171', 'A7T06193',
  'A7T06214', 'A7T06939', 'A7T07030', 'A7T07045', 'A7T07107-2',
  'A7T07107', 'A7T07125', 'A7T07223', 'A7T07438',
  'IMG_0027', 'IMG_0033', 'IMG_0052',
  'IMG_1597', 'IMG_1608', 'IMG_1622', 'IMG_1639', 'IMG_1921',
  'IMG_2942_jpg', 'IMG_2988', 'IMG_3007', 'IMG_3009', 'IMG_4454',
  'IMG_5112', 'IMG_5188', 'IMG_5432', 'IMG_5514', 'IMG_5554',
  'IMG_5740', 'IMG_5747', 'IMG_5760', 'IMG_5955',
  'IMG_6813', 'IMG_6842', 'IMG_6856', 'IMG_6878-2', 'IMG_6878',
  'IMG_6963', 'IMG_6982', 'IMG_7094',
  'IMG_9875', 'IMG_9924', 'IMG_9930', 'IMG_9937', 'IMG_9977', 'IMG_9982',
].map(n => `/images/artExperiences/You&I/${n}.webp`);

// ─── Styles ───────────────────────────────────────────────────────────────────

const PageWrapper = styled.main`
  background: ${AE.cream};
  min-height: 100vh;
`;

const Hero = styled.div`
  background: ${AE.parchment};
  padding: clamp(5rem, 10vw, 7rem) clamp(1.5rem, 5vw, 4rem) clamp(2.5rem, 5vw, 3.5rem);
  text-align: center;
  animation: ${fadeInUp} 0.8s ease both;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${AE.warmBrown};
  text-decoration: none;
  margin-bottom: 1.5rem;

  &:hover { color: ${AE.blue}; }
`;

const Eyebrow = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${AE.blue};
  margin: 0 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
`;

const Title = styled.h1`
  font-family: var(--font-railey), 'Cormorant Garamond', serif;
  font-size: clamp(2.8rem, 6vw, 4.5rem);
  font-weight: 400;
  color: ${AE.ink};
  margin: 0 0 1rem;
  line-height: 1.05;
  text-transform: lowercase;
`;

const Subtitle = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.88rem;
  color: ${AE.warmLight};
  letter-spacing: 0.06em;
`;

const GallerySection = styled.section`
  padding: clamp(3rem, 6vw, 5rem) clamp(1rem, 3vw, 3rem);
  max-width: 1400px;
  margin: 0 auto;
  animation: ${fadeInUp} 0.9s ease both;
  animation-delay: 0.1s;
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 750px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.35rem;
  }
`;

const PhotoThumb = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background: ${AE.paper};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(74, 114, 168, 0.2);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover::after { opacity: 1; }
`;

// ─── Lightbox ─────────────────────────────────────────────────────────────────

const LightboxOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(8, 8, 8, 0.97);
  z-index: 9500;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.18s ease;
  padding: 1.5rem;
`;

const LightboxInner = styled.div`
  position: relative;
  max-width: min(90vw, 1000px);
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LightboxClose = styled.button`
  position: fixed;
  top: 1.25rem;
  right: 1.5rem;
  background: rgba(255, 255, 255, 0.12);
  border: none;
  color: white;
  font-size: 1.5rem;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  z-index: 9501;

  &:hover { background: rgba(255, 255, 255, 0.25); }
`;

const LightboxNav = styled.button<{ $side: 'left' | 'right' }>`
  position: fixed;
  top: 50%;
  ${p => p.$side}: 1rem;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.12);
  border: none;
  color: white;
  font-size: 1.5rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  z-index: 9501;

  &:hover { background: rgba(255, 255, 255, 0.25); }

  @media (max-width: 600px) {
    ${p => p.$side}: 0.5rem;
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
  }
`;

const LightboxCounter = styled.p`
  position: fixed;
  bottom: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 0.1em;
  z-index: 9501;
`;

// ─── Component ────────────────────────────────────────────────────────────────

export default function YouAndIGalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + ALL_IMAGES.length) % ALL_IMAGES.length);
  }, [lightboxIndex]);

  const next = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % ALL_IMAGES.length);
  }, [lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex, prev, next]);

  return (
    <>
      <ArtExpNav />
      <PageWrapper>
        <Hero>
          <BackLink href="/art-experiences#you-and-i">← Back to Art Experiences</BackLink>
          <Eyebrow>
            <StarSpark size={12} color={AE.blue} />
            You &amp; I Paint
          </Eyebrow>
          <Title>event gallery</Title>
          <Subtitle>{ALL_IMAGES.length} photos</Subtitle>
        </Hero>

        <GallerySection>
          <PhotoGrid>
            {ALL_IMAGES.map((src, i) => (
              <PhotoThumb key={src} onClick={() => setLightboxIndex(i)}>
                <Image
                  src={src}
                  alt={`You & I Paint event photo ${i + 1}`}
                  fill
                  sizes="(max-width: 480px) 50vw, (max-width: 750px) 33vw, (max-width: 1100px) 25vw, 20vw"
                  style={{ objectFit: 'cover' }}
                  loading={i < 10 ? 'eager' : 'lazy'}
                />
              </PhotoThumb>
            ))}
          </PhotoGrid>
        </GallerySection>
      </PageWrapper>
      <ArtExpFooter />

      {lightboxIndex !== null && (
        <LightboxOverlay onClick={closeLightbox}>
          <LightboxClose onClick={closeLightbox} aria-label="Close">✕</LightboxClose>
          <LightboxNav $side="left" onClick={e => { e.stopPropagation(); prev(); }} aria-label="Previous">‹</LightboxNav>
          <LightboxNav $side="right" onClick={e => { e.stopPropagation(); next(); }} aria-label="Next">›</LightboxNav>
          <LightboxInner onClick={e => e.stopPropagation()}>
            <Image
              src={ALL_IMAGES[lightboxIndex]}
              alt={`You & I Paint event photo ${lightboxIndex + 1}`}
              width={1000}
              height={1000}
              style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: '8px' }}
              priority
            />
          </LightboxInner>
          <LightboxCounter>{lightboxIndex + 1} / {ALL_IMAGES.length}</LightboxCounter>
        </LightboxOverlay>
      )}
    </>
  );
}
