'use client';

import React from 'react';
import Link from 'next/link';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from '../../i18n/TranslationContext';
import { AE, WavyUnderline, SmallFlower, StarSpark } from './Doodles';
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
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
  animation: ${fadeInUp} 0.8s ease both;
`;

const BrandBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(74, 114, 168, 0.1);
  border: 1.5px solid rgba(74, 114, 168, 0.25);
  border-radius: 50px;
  padding: 0.35rem 1.1rem;
  margin-bottom: 1.25rem;
`;

const BrandBadgeText = styled.span`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${AE.blue};
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
  max-width: 540px;
  margin: 0 auto;
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.75rem;
  animation: ${fadeInUp} 0.9s ease both;
  animation-delay: 0.15s;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  animation: ${fadeInUp} 0.8s ease both;
`;

const EmptyTitle = styled.p`
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: 1.6rem;
  font-style: italic;
  color: ${AE.warmBrown};
  margin: 0 0 0.5rem;
`;

const EmptySubTitle = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.85rem;
  color: ${AE.warmLight};
  margin: 0;
`;

const ViewAllWrap = styled.div`
  text-align: center;
  margin-top: clamp(2.5rem, 5vw, 4rem);
  animation: ${fadeInUp} 0.9s ease both;
  animation-delay: 0.25s;
`;

const ViewAllBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: ${AE.blue};
  background: transparent;
  border: 2px solid rgba(74, 114, 168, 0.4);
  border-radius: 50px;
  padding: 0.85rem 2rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    border-color: ${AE.blue};
    background: rgba(74, 114, 168, 0.06);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(74, 114, 168, 0.15);
  }
`;

const ViewAllHint = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.75rem;
  color: ${AE.warmLight};
  margin: 0.85rem 0 0;
`;

export default function UpcomingEventsSection() {
  const { t, locale } = useTranslation();

  const upcoming = artEvents.filter(e => e.type === 'myEvents');

  return (
    <Section id="upcoming">
      <Container>
        <SectionHeader>
          <Eyebrow>
            <StarSpark size={12} color={AE.blue} />
            {t('artExperiences.upcoming.eyebrow')}
            <StarSpark size={12} color={AE.blue} />
          </Eyebrow>
          <SectionTitle>{t('artExperiences.upcoming.title')}</SectionTitle>
          <WavyWrap>
            <WavyUnderline width={90} color={AE.blue} />
          </WavyWrap>
          <SectionSubtitle>{t('artExperiences.upcoming.subtitle')}</SectionSubtitle>
        </SectionHeader>

        {upcoming.length > 0 ? (
          <EventsGrid>
            {upcoming.map(event => (
              <EventCard
                key={event.id}
                event={event}
                locale={locale as 'en' | 'es'}
                featured={!!event.featured}
                t={t}
              />
            ))}
          </EventsGrid>
        ) : (
          <EmptyState>
            <SmallFlower size={56} color={AE.blue} style={{ margin: '0 auto 1.5rem', opacity: 0.45 }} />
            <EmptyTitle>{t('artExperiences.upcoming.noEvents')}</EmptyTitle>
            <EmptySubTitle>Follow along on Instagram @camilalonart for updates.</EmptySubTitle>
          </EmptyState>
        )}

        <ViewAllWrap>
          <ViewAllBtn href="/art-experiences/events">
            View all events — upcoming & past →
          </ViewAllBtn>
          <ViewAllHint>Includes open registrations and events already held by The Creative Corner</ViewAllHint>
        </ViewAllWrap>
      </Container>
    </Section>
  );
}
