'use client';

import React, { useState } from 'react';
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

const FilterRow = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  animation: ${fadeInUp} 0.8s ease both;
  animation-delay: 0.1s;
`;

const FilterBtn = styled.button<{ $active: boolean }>`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.76rem;
  font-weight: ${p => p.$active ? '600' : '400'};
  letter-spacing: 0.07em;
  color: ${p => p.$active ? 'white' : AE.warmBrown};
  background: ${p => p.$active ? AE.blue : 'transparent'};
  border: 1.5px solid ${p => p.$active ? AE.blue : 'rgba(74, 114, 168, 0.3)'};
  border-radius: 50px;
  padding: 0.5rem 1.25rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${AE.blue};
    color: ${p => p.$active ? 'white' : AE.blue};
    background: ${p => p.$active ? AE.blue : 'rgba(74, 114, 168, 0.07)'};
  }
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.75rem;
  animation: ${fadeInUp} 0.9s ease both;
  animation-delay: 0.2s;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  animation: ${fadeInUp} 0.8s ease both;
`;

const EmptyDoodle = styled.div`
  margin-bottom: 1.5rem;
  opacity: 0.5;
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

type FilterType = 'all' | 'myEvents' | 'youAndIPaint';

export default function UpcomingEventsSection() {
  const { t, locale } = useTranslation();
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = artEvents.filter(e =>
    filter === 'all' ? true : e.type === filter
  );

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: t('artExperiences.upcoming.filterAll') },
    { key: 'myEvents', label: t('artExperiences.upcoming.filterMyEvents') },
    { key: 'youAndIPaint', label: t('artExperiences.upcoming.filterYouAndI') },
  ];

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

        <FilterRow>
          {filters.map(f => (
            <FilterBtn
              key={f.key}
              $active={filter === f.key}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </FilterBtn>
          ))}
        </FilterRow>

        {filtered.length > 0 ? (
          <EventsGrid>
            {filtered.map(event => (
              <EventCard
                key={event.id}
                event={event}
                locale={locale as 'en' | 'es'}
                featured={false}
                t={t}
              />
            ))}
          </EventsGrid>
        ) : (
          <EmptyState>
            <EmptyDoodle>
              <SmallFlower size={56} color={AE.blue} />
            </EmptyDoodle>
            <EmptyTitle>{t('artExperiences.upcoming.noEvents')}</EmptyTitle>
            <EmptySubTitle>Follow along on Instagram @camilalonart for updates.</EmptySubTitle>
          </EmptyState>
        )}
      </Container>
    </Section>
  );
}
