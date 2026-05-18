'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from '../../i18n/TranslationContext';
import { AE, WavyUnderline, SmallFlower, StarSpark, TinyStar } from './Doodles';
import { FLOCK_COMMUNITY_URL } from './data';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(2deg); }
`;

const Section = styled.section`
  background: ${AE.cream};
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

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: clamp(3rem, 6vw, 4.5rem);
  animation: ${fadeInUp} 0.8s ease both;
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

const SectionTitle = styled.h2`
  font-family: var(--font-railey), 'Cormorant Garamond', serif;
  font-size: clamp(2.6rem, 5.5vw, 4rem);
  font-weight: 400;
  font-style: normal;
  color: ${AE.ink};
  margin: 0 0 1.25rem;
  line-height: 1.1;
  text-transform: lowercase;
`;

const WavyWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.25rem;
`;

const SectionSubtitle = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.95rem;
  line-height: 1.8;
  color: ${AE.warmBrown};
  max-width: 480px;
  margin: 0 auto;
`;

const MasonryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 1rem;
  animation: ${fadeInUp} 0.9s ease both;
  animation-delay: 0.15s;

  @media (max-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const GalleryCell = styled.div<{ $tall?: boolean; $wide?: boolean }>`
  background: ${AE.paper};
  border-radius: 16px;
  overflow: hidden;
  border: 1.5px dashed rgba(74, 114, 168, 0.2);
  aspect-ratio: ${p => p.$tall ? '3/4' : p.$wide ? '16/7' : '4/3'};
  grid-column: ${p => p.$wide ? 'span 2' : 'span 1'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(74, 114, 168, 0.12);
  }

  @media (max-width: 700px) {
    grid-column: span 1;
    aspect-ratio: 4/3;
  }
`;

const GalleryPlaceholderIcon = styled.div`
  animation: ${float} 4s ease-in-out infinite;
  opacity: 0.45;
`;

const GalleryPlaceholderText = styled.div`
  text-align: center;
`;

const PlaceholderTitle = styled.p`
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: 1rem;
  font-style: italic;
  color: ${AE.warmBrown};
  margin: 0 0 0.25rem;
  opacity: 0.7;
`;

const PlaceholderSub = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.68rem;
  color: ${AE.warmLight};
  margin: 0;
`;

const CTAWrap = styled.div`
  text-align: center;
  margin-top: 3.5rem;
  animation: ${fadeInUp} 0.9s ease both;
  animation-delay: 0.25s;
`;

const CTATitle = styled.p`
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  font-style: italic;
  color: ${AE.ink};
  margin: 0 0 1.25rem;
`;

const JoinBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.84rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: white;
  background: ${AE.blue};
  border: 2px solid ${AE.blue};
  border-radius: 50px;
  padding: 0.85rem 2rem;
  text-decoration: none;
  transition: all 0.25s ease;

  &:hover {
    background: ${AE.blueDark};
    border-color: ${AE.blueDark};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(74, 114, 168, 0.3);
  }
`;

const galleryLayout = [
  { tall: false, wide: false, delay: 0 },
  { tall: true, wide: false, delay: 0.05 },
  { tall: false, wide: false, delay: 0.1 },
  { tall: false, wide: true, delay: 0.15 },
  { tall: false, wide: false, delay: 0.2 },
  { tall: false, wide: false, delay: 0.25 },
  { tall: false, wide: false, delay: 0.3 },
];

const placeholderLabels = [
  { title: 'Painting Session', sub: 'Past event memory' },
  { title: 'Creative Corner', sub: 'Community gathering' },
  { title: 'Paint & Sip', sub: 'FUNK Coffee Bar' },
  { title: 'Community Moments', sub: 'Brushes & laughter' },
  { title: 'Art in Progress', sub: 'Canvas & colour' },
  { title: 'Together We Create', sub: 'Vancouver, BC' },
  { title: 'Your Next Memory', sub: 'Join us soon' },
];

export default function GalleryMemoriesSection() {
  const { t } = useTranslation();

  return (
    <Section id="memories">
      <Container>
        <SectionHeader>
          <Eyebrow>
            <SmallFlower size={14} color={AE.blue} />
            {t('artExperiences.memories.eyebrow')}
            <SmallFlower size={14} color={AE.blue} />
          </Eyebrow>
          <SectionTitle>{t('artExperiences.memories.title')}</SectionTitle>
          <WavyWrap>
            <WavyUnderline width={90} color={AE.blue} />
          </WavyWrap>
          <SectionSubtitle>{t('artExperiences.memories.subtitle')}</SectionSubtitle>
        </SectionHeader>

        <MasonryGrid>
          {galleryLayout.map((cell, i) => (
            <GalleryCell key={i} $tall={cell.tall} $wide={cell.wide}>
              <GalleryPlaceholderIcon>
                {i % 3 === 0 ? (
                  <SmallFlower size={40} color={AE.blue} />
                ) : i % 3 === 1 ? (
                  <StarSpark size={36} color={AE.blue} />
                ) : (
                  <TinyStar size={30} color={AE.blue} />
                )}
              </GalleryPlaceholderIcon>
              <GalleryPlaceholderText>
                <PlaceholderTitle>{placeholderLabels[i]?.title}</PlaceholderTitle>
                <PlaceholderSub>{placeholderLabels[i]?.sub}</PlaceholderSub>
              </GalleryPlaceholderText>
            </GalleryCell>
          ))}
        </MasonryGrid>

        <CTAWrap>
          <CTATitle>Ready to make your own memories?</CTATitle>
          <JoinBtn href={FLOCK_COMMUNITY_URL} target="_blank" rel="noopener noreferrer">
            {t('artExperiences.memories.cta')} ↗
          </JoinBtn>
        </CTAWrap>
      </Container>
    </Section>
  );
}
