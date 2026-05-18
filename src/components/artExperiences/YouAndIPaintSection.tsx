'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from '../../i18n/TranslationContext';
import { AE, WavyUnderline, SmallFlower, StarSpark, PublicEventIcon, PrivateEventIcon, CorporateEventIcon, WeddingEventIcon } from './Doodles';
import { YOU_AND_I_PAINT_URL } from './data';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const YOU_AND_I_IMAGES = [
  'A7T03212', 'IMG_4454', 'IMG_6982', 'A7T06088', 'IMG_5747',
  'IMG_9924', 'IMG_6878-2', 'IMG_6813', 'A7T07030', 'A7T06154',
  'IMG_0027', 'A7T01622', 'A7T07125', 'IMG_5740', 'IMG_5760',
  'A7T06057', 'A7T06939', 'IMG_5432', 'IMG_5188', 'A7T03278',
  'A7T03346', 'IMG_3007', 'IMG_6878', 'IMG_1597', 'A7T07107-2',
  'IMG_6842', 'A7T06171', 'IMG_5955', 'IMG_5514', 'IMG_9937',
  'A7T07107', 'IMG_2988', 'IMG_9982', 'A7T06214', 'IMG_1608',
  'IMG_3009', 'A7T06193', 'IMG_1921', 'IMG_5554', 'IMG_6856',
  'IMG_9977', 'IMG_5112', 'A7T03221', 'A7T07223', 'IMG_6963',
  'A7T07438', 'IMG_1639', 'IMG_7094', 'IMG_9930', 'IMG_9875',
  'IMG_0052', 'IMG_2942_jpg', 'IMG_1622', 'IMG_0033', 'A7T07045',
].map(n => `/images/artExperiences/You&I/${n}.webp`);

const FEATURED_IMAGE = '/images/artExperiences/You&I/IMG_9937.webp';

// ─── Layout ────────────────────────────────────────────────────────────────

const Section = styled.section`
  background: ${AE.parchment};
  padding: clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem);
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const IntroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(3rem, 6vw, 5rem);
  align-items: start;
  margin-bottom: clamp(4rem, 8vw, 6rem);

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const LeftSide = styled.div`
  animation: ${fadeInUp} 0.8s ease both;
`;

const RightSide = styled.div`
  animation: ${fadeInUp} 0.9s ease both;
  animation-delay: 0.15s;
`;

// ─── Text elements ──────────────────────────────────────────────────────────

const Eyebrow = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${AE.blue};
  margin: 0 0 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const CompanyBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${AE.blueTint};
  border: 1.5px solid rgba(74, 114, 168, 0.25);
  border-radius: 50px;
  padding: 0.35rem 1rem;
  margin-bottom: 1.25rem;
`;

const CompanyBadgeText = styled.span`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${AE.blue};
`;

const SectionTitle = styled.h2`
  font-family: var(--font-railey), 'Cormorant Garamond', serif;
  font-size: clamp(2.8rem, 6vw, 4.5rem);
  font-weight: 400;
  font-style: normal;
  color: ${AE.ink};
  margin: 0 0 1.25rem;
  line-height: 1.1;
  text-transform: lowercase;
`;

const WavyWrap = styled.div`
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.95rem;
  line-height: 1.85;
  color: ${AE.warmBrown};
  margin: 0 0 2rem;
`;

const QuoteBox = styled.blockquote`
  margin: 0 0 2rem;
  padding: 1.5rem 1.75rem;
  background: rgba(74, 114, 168, 0.07);
  border-left: 4px solid ${AE.blue};
  border-radius: 0 16px 16px 0;

  p {
    font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
    font-size: 1.35rem;
    font-style: italic;
    font-weight: 600;
    color: ${AE.ink};
    margin: 0;
    line-height: 1.5;

    &::before { content: '"'; }
    &::after { content: '"'; }
  }
`;

const VisitBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: white;
  background: ${AE.blue};
  border-radius: 50px;
  padding: 0.8rem 1.85rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s ease;
  border: 2px solid ${AE.blue};

  &:hover {
    background: ${AE.blueDark};
    border-color: ${AE.blueDark};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(74, 114, 168, 0.3);
  }
`;

// ─── Featured image ─────────────────────────────────────────────────────────

const FeaturedImageWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3/4;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(44, 36, 22, 0.18);
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 60%, rgba(44, 36, 22, 0.3));
    border-radius: 20px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after { opacity: 1; }
`;

const ViewAllOverlay = styled.div`
  position: absolute;
  bottom: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.92);
  color: ${AE.blue};
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.4rem 1.1rem;
  border-radius: 50px;
  opacity: 0;
  transition: opacity 0.3s ease;
  white-space: nowrap;
  z-index: 2;

  ${FeaturedImageWrap}:hover & {
    opacity: 1;
  }
`;

const PhotoCount = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.72rem;
  color: ${AE.warmLight};
  text-align: center;
  margin: 0.75rem 0 0;
`;

// ─── Service cards ───────────────────────────────────────────────────────────

const ServicesRow = styled.div`
  margin-bottom: clamp(4rem, 8vw, 6rem);
  animation: ${fadeInUp} 0.9s ease both;
  animation-delay: 0.2s;
`;

const ServicesTitle = styled.h3`
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: 1.6rem;
  font-style: italic;
  font-weight: 600;
  color: ${AE.ink};
  margin: 0 0 1.5rem;
`;

const ServiceCards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.1rem;

  @media (max-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div`
  background: ${AE.cream};
  border-radius: 16px;
  padding: 1.5rem;
  border: 1.5px solid rgba(74, 114, 168, 0.12);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(74, 114, 168, 0.14);
  }
`;

const ServiceIcon = styled.div`
  margin-bottom: 0.85rem;
`;

const ServiceTitle = styled.h4`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${AE.blue};
  margin: 0 0 0.5rem;
`;

const ServiceDesc = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.8rem;
  line-height: 1.65;
  color: ${AE.warmBrown};
  margin: 0;
`;

// ─── Gallery grid ────────────────────────────────────────────────────────────

const GallerySection = styled.div`
  animation: ${fadeInUp} 0.9s ease both;
  animation-delay: 0.3s;
`;

const GalleryTitle = styled.h3`
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-style: italic;
  font-weight: 600;
  color: ${AE.ink};
  margin: 0 0 1.5rem;
  text-align: center;
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.6rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 420px) {
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
    background: rgba(74, 114, 168, 0.2);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover::after { opacity: 1; }
`;

// ─── Lightbox ────────────────────────────────────────────────────────────────

const LightboxOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(8, 8, 8, 0.95);
  z-index: 9000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.2s ease;
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

const LightboxImg = styled.div`
  position: relative;
  max-width: 100%;
  max-height: 85vh;
  border-radius: 8px;
  overflow: hidden;

  img {
    max-width: 90vw;
    max-height: 85vh;
    object-fit: contain;
    border-radius: 8px;
  }
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
  z-index: 9001;

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
  z-index: 9001;

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
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.1em;
  z-index: 9001;
`;

const DecorativeBlob = styled.div`
  position: absolute;
  pointer-events: none;
  opacity: 0.15;
`;

// ─── Component ───────────────────────────────────────────────────────────────

export default function YouAndIPaintSection() {
  const { t, locale } = useTranslation();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + YOU_AND_I_IMAGES.length) % YOU_AND_I_IMAGES.length);
  }, [lightboxIndex]);

  const next = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % YOU_AND_I_IMAGES.length);
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

  const services = [
    {
      icon: <PublicEventIcon size={40} color={AE.blue} />,
      title: t('artExperiences.youAndIPaint.publicTitle'),
      desc: t('artExperiences.youAndIPaint.publicDesc'),
    },
    {
      icon: <PrivateEventIcon size={40} color={AE.blue} />,
      title: t('artExperiences.youAndIPaint.privateTitle'),
      desc: t('artExperiences.youAndIPaint.privateDesc'),
    },
    {
      icon: <CorporateEventIcon size={40} color={AE.blue} />,
      title: t('artExperiences.youAndIPaint.corporateTitle'),
      desc: t('artExperiences.youAndIPaint.corporateDesc'),
    },
    {
      icon: <WeddingEventIcon size={40} color={AE.blue} />,
      title: t('artExperiences.youAndIPaint.weddingTitle'),
      desc: t('artExperiences.youAndIPaint.weddingDesc'),
    },
  ];

  const featuredIndex = YOU_AND_I_IMAGES.indexOf(FEATURED_IMAGE);

  return (
    <Section id="you-and-i">
      <DecorativeBlob style={{ top: '5%', left: '-2%' }}>
        <SmallFlower size={100} color={AE.blue} />
      </DecorativeBlob>
      <DecorativeBlob style={{ bottom: '10%', right: '-1%' }}>
        <SmallFlower size={80} color={AE.blue} />
      </DecorativeBlob>

      <Container>
        {/* Service cards */}
        <ServicesRow>
          <ServicesTitle>
            {locale === 'en' ? 'Event Types I Teach' : 'Tipos de Eventos que Enseño'}
          </ServicesTitle>
          <ServiceCards>
            {services.map((s, i) => (
              <ServiceCard key={i}>
                <ServiceIcon>{s.icon}</ServiceIcon>
                <ServiceTitle>{s.title}</ServiceTitle>
                <ServiceDesc>{s.desc}</ServiceDesc>
              </ServiceCard>
            ))}
          </ServiceCards>
        </ServicesRow>
        {/* Info + featured photo */}
        <IntroGrid>
          <LeftSide>
            <Eyebrow>
              <StarSpark size={12} color={AE.blue} />
              {t('artExperiences.youAndIPaint.eyebrow')}
            </Eyebrow>
            <CompanyBadge>
              <CompanyBadgeText>Certified Instructor</CompanyBadgeText>
            </CompanyBadge>

            <SectionTitle>{t('artExperiences.youAndIPaint.title')}</SectionTitle>
            <WavyWrap>
              <WavyUnderline width={80} color={AE.blue} />
            </WavyWrap>
            <Description>{t('artExperiences.youAndIPaint.subtitle')}</Description>

            <QuoteBox>
              <p>{t('artExperiences.youAndIPaint.quoteText')}</p>
            </QuoteBox>

            <VisitBtn href={YOU_AND_I_PAINT_URL} target="_blank" rel="noopener noreferrer">
              {t('artExperiences.youAndIPaint.visitSite')} ↗
            </VisitBtn>
          </LeftSide>

          <RightSide>
            <FeaturedImageWrap onClick={() => openLightbox(featuredIndex >= 0 ? featuredIndex : 0)}>
              <Image
                src={FEATURED_IMAGE}
                alt="You & I Paint event"
                fill
                sizes="(max-width: 800px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                loading="lazy"
              />
              <ViewAllOverlay>View all photos ↗</ViewAllOverlay>
            </FeaturedImageWrap>
            <PhotoCount>{YOU_AND_I_IMAGES.length} photos from our events</PhotoCount>
          </RightSide>
        </IntroGrid>

        {/* Photo gallery */}
        <GallerySection>
          <GalleryTitle>{t('artExperiences.youAndIPaint.galleryTitle')}</GalleryTitle>
          <PhotoGrid>
            {YOU_AND_I_IMAGES.map((src, i) => (
              <PhotoThumb key={src} onClick={() => openLightbox(i)}>
                <Image
                  src={src}
                  alt={`You & I Paint event photo ${i + 1}`}
                  fill
                  sizes="(max-width: 420px) 50vw, (max-width: 640px) 33vw, (max-width: 900px) 25vw, 20vw"
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                />
              </PhotoThumb>
            ))}
          </PhotoGrid>
        </GallerySection>
      </Container>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <LightboxOverlay onClick={closeLightbox}>
          <LightboxClose onClick={closeLightbox} aria-label="Close">✕</LightboxClose>
          <LightboxNav $side="left" onClick={e => { e.stopPropagation(); prev(); }} aria-label="Previous">‹</LightboxNav>
          <LightboxNav $side="right" onClick={e => { e.stopPropagation(); next(); }} aria-label="Next">›</LightboxNav>

          <LightboxInner onClick={e => e.stopPropagation()}>
            <LightboxImg>
              <Image
                src={YOU_AND_I_IMAGES[lightboxIndex]}
                alt={`You & I Paint event photo ${lightboxIndex + 1}`}
                width={900}
                height={900}
                style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain' }}
                priority
              />
            </LightboxImg>
          </LightboxInner>

          <LightboxCounter>{lightboxIndex + 1} / {YOU_AND_I_IMAGES.length}</LightboxCounter>
        </LightboxOverlay>
      )}
    </Section>
  );
}
