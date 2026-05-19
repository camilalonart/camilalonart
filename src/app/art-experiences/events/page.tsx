'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styled, { keyframes } from 'styled-components';
import { artEvents, FLOCK_COMMUNITY_URL } from '@/components/artExperiences/data';
import ArtExpNav from '@/components/artExperiences/ArtExpNav';
import ArtExpFooter from '@/components/artExperiences/ArtExpFooter';
import EventCard from '@/components/artExperiences/EventCard';
import { AE, WavyUnderline, StarSpark, SmallFlower } from '@/components/artExperiences/Doodles';
import { useTranslation } from '@/i18n/TranslationContext';

const TODAY_ISO = new Date().toISOString().slice(0, 10);

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Page = styled.div`
  background: ${AE.cream};
  min-height: 100vh;
`;

const Hero = styled.section`
  background: ${AE.paper};
  padding: clamp(8rem, 14vh, 12rem) clamp(1.5rem, 5vw, 4rem) clamp(4rem, 7vw, 6rem);
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: ${AE.warmBrown};
  text-decoration: none;
  position: absolute;
  top: clamp(5rem, 9vh, 7rem);
  left: clamp(1.5rem, 5vw, 4rem);
  transition: color 0.2s;

  &:hover { color: ${AE.blue}; }
`;

const BrandBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(74, 114, 168, 0.1);
  border: 1.5px solid rgba(74, 114, 168, 0.25);
  border-radius: 50px;
  padding: 0.35rem 1.1rem;
  margin-bottom: 1.5rem;
`;

const BrandBadgeText = styled.span`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${AE.blue};
`;

const PageTitle = styled.h1`
  font-family: var(--font-railey), 'Cormorant Garamond', serif;
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 400;
  color: ${AE.ink};
  margin: 0 0 0.75rem;
  text-transform: lowercase;
  line-height: 1.0;
  animation: ${fadeInUp} 0.8s ease both;
`;

const WavyWrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.75rem 0 1.25rem;
`;

const PageSubtitle = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.95rem;
  line-height: 1.8;
  color: ${AE.warmBrown};
  max-width: 520px;
  margin: 0 auto;
  animation: ${fadeInUp} 0.9s ease both;
  animation-delay: 0.1s;
`;

const Body = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem) clamp(4rem, 8vw, 7rem);
`;

const GroupLabel = styled.h2`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${AE.blue};
  margin: 0 0 1.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(74, 114, 168, 0.2);
  }
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.75rem;
  margin-bottom: clamp(3rem, 6vw, 5rem);
  animation: ${fadeInUp} 0.9s ease both;
`;

const PastEventCard = styled.div`
  opacity: 0.65;
  filter: grayscale(0.3);
  transition: opacity 0.2s, filter 0.2s;

  &:hover {
    opacity: 0.85;
    filter: grayscale(0);
  }
`;

const EmptyBlock = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  background: ${AE.paper};
  border-radius: 20px;
  border: 1.5px dashed rgba(74, 114, 168, 0.2);
  margin-bottom: clamp(3rem, 6vw, 5rem);
`;

const EmptyText = styled.p`
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: 1.4rem;
  font-style: italic;
  color: ${AE.warmBrown};
  margin: 0.75rem 0 0;
`;

const JoinCTASection = styled.div`
  text-align: center;
  padding: clamp(2.5rem, 5vw, 4rem) clamp(2rem, 5vw, 4rem);
  background: ${AE.paper};
  border-radius: 24px;
  border: 2px solid rgba(74, 114, 168, 0.14);
  animation: ${fadeInUp} 0.9s ease both;
`;

const CTATitle = styled.h3`
  font-family: var(--font-railey), 'Cormorant Garamond', serif;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 400;
  color: ${AE.ink};
  margin: 0 0 0.75rem;
  text-transform: lowercase;
`;

const CTADesc = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.9rem;
  color: ${AE.warmBrown};
  margin: 0 0 2rem;
  line-height: 1.7;
`;

const JoinBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: white;
  background: ${AE.blue};
  border: 2px solid ${AE.blue};
  border-radius: 50px;
  padding: 0.9rem 2.25rem;
  text-decoration: none;
  transition: all 0.25s ease;

  &:hover {
    background: ${AE.blueDark};
    border-color: ${AE.blueDark};
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(74, 114, 168, 0.35);
  }
`;

export default function AllEventsPage() {
  const { t, locale } = useTranslation();

  const ccEvents = artEvents.filter(e => e.type === 'myEvents');
  const upcoming = ccEvents.filter(e => e.dateISO >= TODAY_ISO);
  const past = ccEvents.filter(e => e.dateISO < TODAY_ISO);

  return (
    <Page>
      <ArtExpNav />

      <Hero>
        <BackLink href="/art-experiences">← Art Experiences</BackLink>
        <PageTitle>all events</PageTitle>
        <WavyWrap>
          <WavyUnderline width={90} color={AE.blue} />
        </WavyWrap>
        <PageSubtitle>
          Upcoming painting sessions you can join, and a look back at the moments we've shared together.
        </PageSubtitle>
      </Hero>

      <Body>
        {/* Upcoming */}
        <GroupLabel>
          <StarSpark size={11} color={AE.blue} />
          Open for registration
        </GroupLabel>
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
          <EmptyBlock>
            <SmallFlower size={44} color={AE.blue} style={{ opacity: 0.4, margin: '0 auto' }} />
            <EmptyText>New events coming soon — follow along to be the first to know!</EmptyText>
          </EmptyBlock>
        )}

        {/* Past */}
        <GroupLabel>
          <StarSpark size={11} color={AE.warmLight} />
          Past events
        </GroupLabel>
        {past.length > 0 ? (
          <EventsGrid>
            {past.map(event => (
              <PastEventCard key={event.id}>
                <EventCard
                  event={event}
                  locale={locale as 'en' | 'es'}
                  featured={false}
                  t={t}
                />
              </PastEventCard>
            ))}
          </EventsGrid>
        ) : (
          <EmptyBlock>
            <EmptyText>All events have been upcoming so far — check back after the first one!</EmptyText>
          </EmptyBlock>
        )}

        {/* Join CTA */}
        <JoinCTASection>
          <StarSpark size={18} color={AE.blue} style={{ marginBottom: '1rem', opacity: 0.6 }} />
          <CTATitle>never miss an event</CTATitle>
          <CTADesc>
            Join The Creative Corner community on Flock to get notified when new events open up.<br />
            There is always a seat for you at the table.
          </CTADesc>
          <JoinBtn href={FLOCK_COMMUNITY_URL} target="_blank" rel="noopener noreferrer">
            Join The Creative Corner ↗
          </JoinBtn>
        </JoinCTASection>
      </Body>

      <ArtExpFooter />
    </Page>
  );
}
