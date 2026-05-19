'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled, { keyframes } from 'styled-components';
import { AE, StarSpark } from './Doodles';
import { YOU_AND_I_PAINT_URL } from './data';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const GALLERY_IMAGES = [
  'IMG_9937', 'IMG_9875', 'IMG_6842', 'IMG_7094', 'IMG_5554', 'A7T06214', 'A7T07125'
].map(n => `/images/artExperiences/You&I/${n}.webp`);

// ─── Layout ───────────────────────────────────────────────────────────────────

const Section = styled.section`
  background: ${AE.parchment};
  padding: clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem);
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(3rem, 6vw, 5rem);
  align-items: center;
  animation: ${fadeInUp} 0.9s ease both;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const TextCol = styled.div``;

const ImageCol = styled.div`
  position: relative;
  aspect-ratio: 4/3;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 16px 48px rgba(44, 36, 22, 0.14);

  @media (max-width: 860px) {
    order: -1;
    max-width: 480px;
    width: 100%;
  }
`;

// ─── Text side ────────────────────────────────────────────────────────────────

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
  gap: 0.6rem;
`;

const Title = styled.h2`
  font-family: var(--font-railey), 'Cormorant Garamond', serif;
  font-size: clamp(2.4rem, 4.5vw, 3.4rem);
  font-weight: 400;
  color: ${AE.ink};
  margin: 0 0 1.5rem;
  line-height: 1.05;
  text-transform: lowercase;
`;

const Body = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.92rem;
  line-height: 1.9;
  color: ${AE.warmBrown};
  margin: 0 0 2rem;
  max-width: 520px;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.875rem;

  @media (min-width: 480px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const PrimaryBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: white;
  background: ${AE.blue};
  border: 2px solid ${AE.blue};
  border-radius: 50px;
  padding: 0.8rem 1.75rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;

  &:hover {
    background: ${AE.blueDark};
    border-color: ${AE.blueDark};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(74, 114, 168, 0.3);
  }
`;

const SecondaryBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: ${AE.blue};
  background: transparent;
  border: 2px solid rgba(74, 114, 168, 0.4);
  border-radius: 50px;
  padding: 0.8rem 1.5rem;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
  text-decoration: none;

  &:hover {
    border-color: ${AE.blue};
    background: rgba(74, 114, 168, 0.06);
    transform: translateY(-2px);
  }
`;

// ─── Gallery ──────────────────────────────────────────────────────────────────

const GallerySection = styled.div`
  margin-top: clamp(3.5rem, 7vw, 5.5rem);
  animation: ${fadeInUp} 0.9s ease both;
  animation-delay: 0.15s;
`;

const GalleryHeader = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
`;

const GalleryTitle = styled.h3`
  font-family: var(--font-railey), 'Cormorant Garamond', serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 400;
  color: ${AE.ink};
  margin: 0;
  text-transform: lowercase;
`;

const GalleryCount = styled.span`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.72rem;
  color: ${AE.warmLight};
  letter-spacing: 0.06em;
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.6rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 380px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const PhotoThumb = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  background: ${AE.paper};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(74, 114, 168, 0.22);
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
  max-width: min(90vw, 900px);
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

export default function YouAndIPaintSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  }, [lightboxIndex]);

  const next = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % GALLERY_IMAGES.length);
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
      <Section id="you-and-i">
        <Container>
          <TwoCol>
            <TextCol>
              <Eyebrow>
                <StarSpark size={12} color={AE.blue} />
                Also teaching with
              </Eyebrow>
              <Title>you & i paint</Title>
              <Body>
                I am proud to be an instructor for You & I Paint, a luxury paint & sip company known for elegant, elevated art experiences. I have led both public and private events for a wide range of audiences and occasions — from intimate celebrations to corporate events. From stylish venues to cozy private homes, every event is designed to inspire creativity and connection.
              </Body>
              <ButtonRow>
                <PrimaryBtn href={YOU_AND_I_PAINT_URL} target="_blank" rel="noopener noreferrer">
                  Learn more about You &amp; I Paint ↗
                </PrimaryBtn>
                <SecondaryBtn href="/art-experiences/you-and-i-gallery">
                  See event photos →
                </SecondaryBtn>
              </ButtonRow>
            </TextCol>

            <ImageCol>
              <Image
                src="/images/artExperiences/You&I/A7T06088.webp"
                alt="You & I Paint event — Camila teaching a painting class"
                fill
                sizes="(max-width: 860px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                loading="lazy"
              />
            </ImageCol>
          </TwoCol>

          <GallerySection id="you-and-i-gallery">
            <GalleryHeader>
              <GalleryTitle>from the events</GalleryTitle>
              <GalleryCount>{GALLERY_IMAGES.length} photos</GalleryCount>
            </GalleryHeader>
            <PhotoGrid>
              {GALLERY_IMAGES.map((src, i) => (
                <PhotoThumb key={src} onClick={() => setLightboxIndex(i)}>
                  <Image
                    src={src}
                    alt={`You & I Paint event photo ${i + 1}`}
                    fill
                    sizes="(max-width: 380px) 50vw, (max-width: 600px) 33vw, (max-width: 900px) 25vw, 20vw"
                    style={{ objectFit: 'cover' }}
                    loading="lazy"
                  />
                </PhotoThumb>
              ))}
            </PhotoGrid>
          </GallerySection>
        </Container>
      </Section>

      {lightboxIndex !== null && (
        <LightboxOverlay onClick={closeLightbox}>
          <LightboxClose onClick={closeLightbox} aria-label="Close">✕</LightboxClose>
          <LightboxNav $side="left" onClick={e => { e.stopPropagation(); prev(); }} aria-label="Previous">‹</LightboxNav>
          <LightboxNav $side="right" onClick={e => { e.stopPropagation(); next(); }} aria-label="Next">›</LightboxNav>
          <LightboxInner onClick={e => e.stopPropagation()}>
            <Image
              src={GALLERY_IMAGES[lightboxIndex]}
              alt={`You & I Paint event photo ${lightboxIndex + 1}`}
              width={900}
              height={900}
              style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: '8px' }}
              priority
            />
          </LightboxInner>
          <LightboxCounter>{lightboxIndex + 1} / {GALLERY_IMAGES.length}</LightboxCounter>
        </LightboxOverlay>
      )}
    </>
  );
}
