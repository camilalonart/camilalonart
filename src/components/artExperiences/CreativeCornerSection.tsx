'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from '../../i18n/TranslationContext';
import { AE, WavyUnderline, SmallFlower, StarSpark, TinyStar, PaletteDoodle, BrushDoodle, ConnectionDoodle, HeartDoodle, FreeDoodle } from './Doodles';
import { FLOCK_COMMUNITY_URL } from './data';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
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

const TopGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(3rem, 6vw, 6rem);
  align-items: start;
  margin-bottom: clamp(4rem, 8vw, 6rem);

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
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
  gap: 0.6rem;
`;

const SectionTitle = styled.h2`
  font-family: var(--font-railey), 'Cormorant Garamond', serif;
  font-size: clamp(2.4rem, 5vw, 4rem);
  font-weight: 400;
  font-style: normal;
  color: ${AE.ink};
  margin: 0 0 1.5rem;
  line-height: 1.1;
  text-transform: lowercase;
`;

const WavyWrap = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionSubtitle = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 1rem;
  line-height: 1.85;
  color: ${AE.warmBrown};
  margin: 0 0 2rem;
`;

const ForList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const ForItem = styled.li`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.9rem;
  color: ${AE.ink};
  display: flex;
  align-items: center;
  gap: 0.65rem;
  line-height: 1.5;
`;

const ForDot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${AE.blue};
  flex-shrink: 0;
  opacity: 0.6;
`;

const NotForArtists = styled.p`
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  font-style: italic;
  font-weight: 600;
  color: ${AE.blue};
  margin: 1.5rem 0 0;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const PillarsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const PillarCard = styled.div`
  background: ${AE.paper};
  border-radius: 16px;
  padding: 1.5rem;
  border: 1.5px solid rgba(74, 114, 168, 0.12);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(74, 114, 168, 0.14);
  }
`;

const PillarIconWrap = styled.div`
  margin-bottom: 0.85rem;
`;

const PillarTitle = styled.h4`
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  font-weight: 600;
  font-style: italic;
  color: ${AE.ink};
  margin: 0 0 0.5rem;
`;

const PillarText = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.82rem;
  line-height: 1.7;
  color: ${AE.warmBrown};
  margin: 0;
`;

const TestimonialsSection = styled.div`
  margin-bottom: clamp(3rem, 6vw, 5rem);
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 2rem;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const TestimonialCard = styled.blockquote`
  background: ${AE.paper};
  border-radius: 16px;
  padding: 2rem;
  margin: 0;
  border: 1.5px solid rgba(74, 114, 168, 0.12);
  position: relative;

  &::before {
    content: '"';
    position: absolute;
    top: 0.75rem;
    left: 1.25rem;
    font-family: var(--font-cormorant), serif;
    font-size: 4rem;
    color: rgba(74, 114, 168, 0.2);
    line-height: 1;
    font-style: italic;
  }
`;

const TestimonialText = styled.p`
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: 1.15rem;
  font-style: italic;
  line-height: 1.65;
  color: ${AE.ink};
  margin: 0 0 1rem;
  padding-top: 1rem;
`;

const TestimonialAuthor = styled.footer`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${AE.blue};
`;

const CTASection = styled.div`
  text-align: center;
  padding: clamp(2.5rem, 5vw, 4rem) clamp(2rem, 5vw, 4rem);
  background: ${AE.paper};
  border-radius: 24px;
  border: 2px solid rgba(74, 114, 168, 0.15);
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 0.9s ease both;
`;

const CTATitle = styled.h3`
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-style: italic;
  font-weight: 600;
  color: ${AE.ink};
  margin: 0 0 1rem;
`;

const CTASubtitle = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.92rem;
  color: ${AE.warmBrown};
  margin: 0 0 2rem;
  line-height: 1.7;
`;

const JoinButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: white;
  background: ${AE.blue};
  border: 2px solid ${AE.blue};
  border-radius: 50px;
  padding: 0.9rem 2.25rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background: ${AE.blueDark};
    border-color: ${AE.blueDark};
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(74, 114, 168, 0.35);
  }
`;

const FloatDoodle = styled.div<{ $delay?: number }>`
  animation: ${float} 5s ease-in-out infinite;
  animation-delay: ${p => p.$delay || 0}s;
`;

const TestimonialsHeader = styled.div`
  text-align: center;
  margin-bottom: 0.5rem;
`;

const SectionSmallTitle = styled.h3`
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-style: italic;
  font-weight: 600;
  color: ${AE.ink};
  margin: 0 0 0.5rem;
`;

export default function CreativeCornerSection() {
  const { t } = useTranslation();

  const pillars = [
    { icon: <PaletteDoodle size={40} color={AE.blue} />, title: t('artExperiences.creativeCorner.pillar1Title'), text: t('artExperiences.creativeCorner.pillar1Text') },
    { icon: <ConnectionDoodle size={40} color={AE.blue} />, title: t('artExperiences.creativeCorner.pillar2Title'), text: t('artExperiences.creativeCorner.pillar2Text') },
    { icon: <FreeDoodle size={40} color={AE.blue} />, title: t('artExperiences.creativeCorner.pillar3Title'), text: t('artExperiences.creativeCorner.pillar3Text') },
    { icon: <HeartDoodle size={40} color={AE.blue} />, title: t('artExperiences.creativeCorner.pillar4Title'), text: t('artExperiences.creativeCorner.pillar4Text') },
  ];

  const forItems = [
    t('artExperiences.creativeCorner.for1'),
    t('artExperiences.creativeCorner.for2'),
    t('artExperiences.creativeCorner.for3'),
    t('artExperiences.creativeCorner.for4'),
    t('artExperiences.creativeCorner.for5'),
  ];

  return (
    <Section id="creative-corner">
      <Container>
        <TopGrid>
          <div>
            <Eyebrow>
              <SmallFlower size={14} color={AE.blue} />
              {t('artExperiences.creativeCorner.eyebrow')}
            </Eyebrow>
            <SectionTitle>{t('artExperiences.creativeCorner.title')}</SectionTitle>
            <WavyWrap>
              <WavyUnderline width={90} color={AE.blue} />
            </WavyWrap>
            <SectionSubtitle>{t('artExperiences.creativeCorner.subtitle')}</SectionSubtitle>

            <Eyebrow style={{ marginTop: '1rem' }}>{t('artExperiences.creativeCorner.for')}</Eyebrow>
            <ForList>
              {forItems.map((item, i) => (
                <ForItem key={i}>
                  <ForDot />
                  {item}
                </ForItem>
              ))}
            </ForList>
            <NotForArtists>{t('artExperiences.creativeCorner.notForArtistsOnly')}</NotForArtists>
          </div>

          <RightSide>
            <PillarsGrid>
              {pillars.map((p, i) => (
                <PillarCard key={i}>
                  <PillarIconWrap>
                    <FloatDoodle $delay={i * 0.4}>{p.icon}</FloatDoodle>
                  </PillarIconWrap>
                  <PillarTitle>{p.title}</PillarTitle>
                  <PillarText>{p.text}</PillarText>
                </PillarCard>
              ))}
            </PillarsGrid>
          </RightSide>
        </TopGrid>

        <TestimonialsSection>
          <TestimonialsHeader>
            <Eyebrow style={{ justifyContent: 'center' }}>
              <StarSpark size={12} color={AE.blue} />
              Voices from the community
              <StarSpark size={12} color={AE.blue} />
            </Eyebrow>
            <SectionSmallTitle>What people are saying</SectionSmallTitle>
          </TestimonialsHeader>
          <TestimonialsGrid>
            <TestimonialCard>
              <TestimonialText>{t('artExperiences.creativeCorner.testimonial1')}</TestimonialText>
              <TestimonialAuthor>— {t('artExperiences.creativeCorner.testimonial1Author')}</TestimonialAuthor>
            </TestimonialCard>
            <TestimonialCard>
              <TestimonialText>{t('artExperiences.creativeCorner.testimonial2')}</TestimonialText>
              <TestimonialAuthor>— {t('artExperiences.creativeCorner.testimonial2Author')}</TestimonialAuthor>
            </TestimonialCard>
          </TestimonialsGrid>
        </TestimonialsSection>

        <CTASection>
          <FloatDoodle $delay={0} style={{ position: 'absolute', top: '1.5rem', left: '2rem', opacity: 0.3 }}>
            <SmallFlower size={40} color={AE.blue} />
          </FloatDoodle>
          <FloatDoodle $delay={1} style={{ position: 'absolute', bottom: '1.5rem', right: '2rem', opacity: 0.3 }}>
            <SmallFlower size={32} color={AE.blue} />
          </FloatDoodle>
          <TinyStar size={14} color={AE.blue} style={{ display: 'inline-block', marginBottom: '1rem' }} />
          <CTATitle>Come paint with us.</CTATitle>
          <CTASubtitle>
            The Creative Corner is where Vancouver comes to slow down, create, and connect.
            <br />
            There is always a seat for you at the table.
          </CTASubtitle>
          <JoinButton href={FLOCK_COMMUNITY_URL} target="_blank" rel="noopener noreferrer">
            {t('artExperiences.creativeCorner.joinCta')} ↗
          </JoinButton>
        </CTASection>
      </Container>
    </Section>
  );
}
