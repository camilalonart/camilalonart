'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from '../../i18n/TranslationContext';
import { AE, StarSpark, SmallFlower, TinyStar, WavyUnderline } from './Doodles';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-10px) rotate(3deg); }
  66% { transform: translateY(-5px) rotate(-2deg); }
`;

const floatSlow = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-14px); }
`;

const twinkle = keyframes`
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
`;

const Section = styled.section`
  min-height: 100vh;
  background: ${AE.cream};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: clamp(6rem, 12vh, 10rem) clamp(1.5rem, 5vw, 4rem) clamp(4rem, 8vh, 6rem);
`;

const PaperTexture = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(ellipse at 20% 20%, rgba(74, 114, 168, 0.04) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 80%, rgba(74, 114, 168, 0.03) 0%, transparent 50%);
  pointer-events: none;
`;

const Container = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(3rem, 6vw, 6rem);
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const TextSide = styled.div`
  animation: ${fadeInUp} 0.9s ease both;
`;

const IllustrationSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  animation: ${fadeIn} 1.1s ease both;
  animation-delay: 0.3s;

  @media (max-width: 860px) {
    order: -1;
    max-width: 380px;
    margin: 0 auto;
  }
`;

const Eyebrow = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${AE.blue};
  margin: 0 0 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;

  @media (max-width: 860px) {
    justify-content: center;
  }
`;

const EyebrowDot = styled.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${AE.blue};
  flex-shrink: 0;
`;

const Title = styled.h1`
  font-family: var(--font-railey), 'Cormorant Garamond', serif;
  font-size: clamp(5rem, 11vw, 9.5rem);
  font-weight: 400;
  font-style: normal;
  line-height: 0.9;
  color: ${AE.blue};
  margin: 0 0 1rem;
  letter-spacing: 0.01em;
  text-transform: lowercase;
`;

const TitleTagline = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: clamp(1.6rem, 3.5vw, 2.6rem);
  font-weight: 400;
  font-style: normal;
  line-height: 1.1;
  color: ${AE.blue};
  margin: 0 0 2rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
`;

const Subtitle = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  font-weight: 400;
  line-height: 1.8;
  color: ${AE.warmBrown};
  max-width: 500px;
  margin: 0 0 2.5rem;

  @media (max-width: 860px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const WavyWrap = styled.div`
  margin-bottom: 2rem;
`;

const CTARow = styled.div`
  display: flex;
  gap: 0.875rem;
  flex-wrap: wrap;

  @media (max-width: 860px) {
    justify-content: center;
  }
`;

const CTAPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: ${AE.cream};
  background: ${AE.blue};
  border: 2px solid ${AE.blue};
  border-radius: 50px;
  padding: 0.75rem 1.75rem;
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

const CTASecondary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  color: ${AE.blue};
  background: transparent;
  border: 2px solid rgba(74, 114, 168, 0.4);
  border-radius: 50px;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;

  &:hover {
    border-color: ${AE.blue};
    background: rgba(74, 114, 168, 0.06);
    transform: translateY(-2px);
  }
`;

const Badges = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 2.5rem;
  flex-wrap: wrap;

  @media (max-width: 860px) {
    justify-content: center;
  }
`;

const Badge = styled.span`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: ${AE.warmBrown};
  background: rgba(74, 114, 168, 0.08);
  border: 1px solid rgba(74, 114, 168, 0.2);
  border-radius: 20px;
  padding: 0.3rem 0.85rem;
`;

const IllustrationFrame = styled.div`
  position: relative;
  width: 100%;
  max-width: 520px;
  animation: ${floatSlow} 6s ease-in-out infinite;

  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 12px;
  }
`;

const FloatingDoodle = styled.div<{ $delay?: number; $top?: string; $right?: string; $left?: string; $bottom?: string }>`
  position: absolute;
  top: ${p => p.$top || 'auto'};
  right: ${p => p.$right || 'auto'};
  left: ${p => p.$left || 'auto'};
  bottom: ${p => p.$bottom || 'auto'};
  animation: ${float} 5s ease-in-out infinite;
  animation-delay: ${p => p.$delay || 0}s;
  pointer-events: none;
`;

const TwinkleDoodle = styled.div<{ $delay?: number; $top?: string; $right?: string; $left?: string; $bottom?: string }>`
  position: absolute;
  top: ${p => p.$top || 'auto'};
  right: ${p => p.$right || 'auto'};
  left: ${p => p.$left || 'auto'};
  bottom: ${p => p.$bottom || 'auto'};
  animation: ${twinkle} 3s ease-in-out infinite;
  animation-delay: ${p => p.$delay || 0}s;
  pointer-events: none;
`;

const scrollTo = (id: string) => {
  if (typeof window === 'undefined') return;
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

export default function HeroSection() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <Section id="hero">
      <PaperTexture />

      {/* Floating corner doodles */}
      {mounted && (
        <>
          <FloatingDoodle $delay={0} style={{ position: 'absolute', top: '12%', left: '3%' }}>
            <SmallFlower size={32} color={`rgba(74, 114, 168, 0.35)`} />
          </FloatingDoodle>
          <TwinkleDoodle $delay={0.5} style={{ position: 'absolute', top: '18%', left: '7%' }}>
            <StarSpark size={16} color={`rgba(74, 114, 168, 0.5)`} />
          </TwinkleDoodle>
          <FloatingDoodle $delay={1.5} style={{ position: 'absolute', top: '8%', right: '5%' }}>
            <SmallFlower size={24} color={`rgba(74, 114, 168, 0.25)`} />
          </FloatingDoodle>
          <TwinkleDoodle $delay={1.0} style={{ position: 'absolute', top: '25%', right: '3%' }}>
            <StarSpark size={14} color={`rgba(74, 114, 168, 0.45)`} />
          </TwinkleDoodle>
          <FloatingDoodle $delay={2.0} style={{ position: 'absolute', bottom: '15%', left: '2%' }}>
            <TinyStar size={12} color={`rgba(74, 114, 168, 0.4)`} />
          </FloatingDoodle>
          <TwinkleDoodle $delay={0.8} style={{ position: 'absolute', bottom: '20%', right: '4%' }}>
            <SmallFlower size={20} color={`rgba(74, 114, 168, 0.3)`} />
          </TwinkleDoodle>
          <FloatingDoodle $delay={3.0} style={{ position: 'absolute', bottom: '8%', left: '30%' }}>
            <TinyStar size={10} color={`rgba(74, 114, 168, 0.35)`} />
          </FloatingDoodle>
        </>
      )}

      <Container>
        <TextSide>
          <Eyebrow>
            <EyebrowDot />
            {t('artExperiences.hero.eyebrow')}
          </Eyebrow>

          <Title>art experiences</Title>

          <TitleTagline>create. connect. belong.</TitleTagline>

          <WavyWrap>
            <WavyUnderline width={120} color={AE.blue} />
          </WavyWrap>

          <Subtitle>{t('artExperiences.hero.subtitle')}</Subtitle>

          <CTARow>
            <CTAPrimary onClick={() => scrollTo('upcoming')} href="#upcoming">
              {t('artExperiences.hero.cta3')}
            </CTAPrimary>
            <CTASecondary onClick={() => scrollTo('experience-cards')} href="#experience-cards">
              Explore Experiences
            </CTASecondary>
          </CTARow>

          <Badges>
            <Badge>✦ {t('artExperiences.hero.badge1')}</Badge>
            <Badge>✦ {t('artExperiences.hero.badge2')}</Badge>
          </Badges>
        </TextSide>

        <IllustrationSide>
          <IllustrationFrame>
            <Image
              src="/images/artExperiences/CreativeCorner/Illustration1.webp"
              alt="Art experiences illustration — flowers, easel, coffee, wine glass and paint palette"
              width={560}
              height={380}
              priority
              style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
            />
          </IllustrationFrame>
        </IllustrationSide>
      </Container>
    </Section>
  );
}
