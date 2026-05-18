'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from '../../i18n/TranslationContext';
import { AE, WavyUnderline, SmallFlower, StarSpark, TinyStar } from './Doodles';
import EventCard from './EventCard';
import { artEvents } from './data';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Section = styled.section`
  background: ${AE.paper};
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
  margin-bottom: clamp(3rem, 6vw, 5rem);
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
  font-size: clamp(2.8rem, 6vw, 4.5rem);
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
  font-size: 1rem;
  line-height: 1.8;
  color: ${AE.warmBrown};
  max-width: 580px;
  margin: 0 auto;
`;

const FeaturedWrap = styled.div`
  margin-bottom: 3.5rem;
  animation: ${fadeInUp} 0.9s ease both;
  animation-delay: 0.15s;
`;

const GridWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.75rem;
  animation: ${fadeInUp} 0.9s ease both;
  animation-delay: 0.25s;
`;

const DecorativeBlob = styled.div`
  position: absolute;
  pointer-events: none;
  opacity: 0.18;
`;

const MoreComingSoon = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding: 2.5rem;
  background: rgba(74, 114, 168, 0.05);
  border: 1.5px dashed rgba(74, 114, 168, 0.25);
  border-radius: 20px;
  animation: ${fadeInUp} 0.9s ease both;
  animation-delay: 0.35s;
`;

const MoreText = styled.p`
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: 1.4rem;
  font-style: italic;
  color: ${AE.warmBrown};
  margin: 0 0 0.5rem;
`;

const MoreSubText = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.8rem;
  color: ${AE.warmLight};
  margin: 0;
`;

export default function MyExperiencesSection() {
  const { t, locale } = useTranslation();

  const featured = artEvents.filter(e => e.type === 'myEvents' && e.featured);
  const rest = artEvents.filter(e => e.type === 'myEvents' && !e.featured);

  return (
    <Section id="my-experiences">
      <DecorativeBlob style={{ top: '5%', right: '-3%' }}>
        <SmallFlower size={120} color={AE.blue} />
      </DecorativeBlob>
      <DecorativeBlob style={{ bottom: '8%', left: '-2%' }}>
        <SmallFlower size={80} color={AE.blue} />
      </DecorativeBlob>

      <Container>
        <SectionHeader>
          <Eyebrow>
            <StarSpark size={12} color={AE.blue} />
            {t('artExperiences.myExperiences.eyebrow')}
            <StarSpark size={12} color={AE.blue} />
          </Eyebrow>
          <SectionTitle>{t('artExperiences.myExperiences.title')}</SectionTitle>
          <WavyWrap>
            <WavyUnderline width={100} color={AE.blue} />
          </WavyWrap>
          <SectionSubtitle>{t('artExperiences.myExperiences.subtitle')}</SectionSubtitle>
        </SectionHeader>

        {featured.length > 0 && (
          <FeaturedWrap>
            <EventCard
              event={featured[0]}
              locale={locale as 'en' | 'es'}
              featured={true}
              t={t}
            />
          </FeaturedWrap>
        )}

        {rest.length > 0 && (
          <GridWrap>
            {rest.map(event => (
              <EventCard
                key={event.id}
                event={event}
                locale={locale as 'en' | 'es'}
                featured={false}
                t={t}
              />
            ))}
          </GridWrap>
        )}
      </Container>
    </Section>
  );
}
