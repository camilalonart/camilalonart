'use client';

import React from 'react';
import Link from 'next/link';
import styled, { keyframes } from 'styled-components';
import { AE, WavyUnderline, StarSpark } from './Doodles';
import type { ArtEvent } from './data';
import { useTranslation } from '../../i18n/TranslationContext';
import ArtExpNav from './ArtExpNav';
import ArtExpFooter from './ArtExpFooter';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Page = styled.div`
  background: ${AE.cream};
  min-height: 100vh;
`;

// ─── Page header ───────────────────────────────────────────────────────────

const PageHeader = styled.div`
  background: ${AE.parchment};
  padding: clamp(3rem, 7vw, 5rem) clamp(1.5rem, 5vw, 4rem) clamp(2.5rem, 5vw, 4rem);
  animation: ${fadeInUp} 0.7s ease both;
`;

const HeaderInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.78rem;
  font-weight: 500;
  color: ${AE.blue};
  text-decoration: none;
  margin-bottom: 2rem;
  letter-spacing: 0.04em;
  transition: gap 0.2s;

  &:hover { gap: 0.65rem; }
`;

const EventType = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${AE.blue};
  margin: 0 0 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const EventTitle = styled.h1`
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: clamp(2.4rem, 6vw, 4rem);
  font-weight: 600;
  font-style: italic;
  color: ${AE.ink};
  margin: 0 0 1.25rem;
  line-height: 1.1;
`;

const WavyWrap = styled.div`
  margin-bottom: 1.5rem;
`;

const HeaderMeta = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.9rem;
  color: ${AE.warmBrown};
  margin: 0;
`;

// ─── Body ──────────────────────────────────────────────────────────────────

const Body = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem);
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: clamp(2.5rem, 5vw, 4rem);
  align-items: start;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const MainColumn = styled.div`
  animation: ${fadeInUp} 0.8s ease both;
  animation-delay: 0.1s;
`;

const Description = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 1rem;
  line-height: 1.9;
  color: ${AE.warmBrown};
  margin: 0 0 2.5rem;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const Tag = styled.span`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.72rem;
  font-weight: 500;
  color: ${AE.blue};
  background: ${AE.blueTint};
  border: 1px solid rgba(74, 114, 168, 0.2);
  border-radius: 50px;
  padding: 0.28rem 0.85rem;
`;

const MaterialsNote = styled.div`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.82rem;
  font-style: italic;
  color: ${AE.warmBrown};
  padding: 0.75rem 1.25rem;
  background: rgba(74, 114, 168, 0.06);
  border-left: 3px solid rgba(74, 114, 168, 0.4);
  border-radius: 0 10px 10px 0;
`;

// ─── Sidebar ───────────────────────────────────────────────────────────────

const Sidebar = styled.aside`
  animation: ${fadeInUp} 0.8s ease both;
  animation-delay: 0.2s;
`;

const InfoCard = styled.div`
  background: ${AE.paper};
  border-radius: 20px;
  padding: 2rem;
  border: 1.5px solid rgba(74, 114, 168, 0.14);
  box-shadow: 0 4px 20px rgba(44, 36, 22, 0.08);
  position: sticky;
  top: 5rem;
`;

const PriceDisplay = styled.div`
  margin-bottom: 1.5rem;
`;

const PriceLabel = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${AE.warmLight};
  margin: 0 0 0.2rem;
`;

const PriceValue = styled.p`
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: 2.4rem;
  font-weight: 600;
  color: ${AE.ink};
  margin: 0;
  line-height: 1;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(74, 114, 168, 0.12);
  margin: 1.25rem 0;
`;

const MetaList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

const MetaItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.85rem;
  color: ${AE.ink};
  line-height: 1.4;
`;

const MetaIcon = styled.span`
  font-size: 0.9rem;
  flex-shrink: 0;
  margin-top: 0.05rem;
`;

const MetaText = styled.span`
  font-weight: 500;
`;

const MetaSub = styled.span`
  display: block;
  font-size: 0.75rem;
  font-weight: 400;
  color: ${AE.warmLight};
  margin-top: 0.1rem;
`;

const SpotsChip = styled.div<{ $low?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: ${p => p.$low ? '#b85c1a' : '#2E7D52'};
  background: ${p => p.$low ? 'rgba(184, 92, 26, 0.08)' : 'rgba(46, 125, 82, 0.08)'};
  border: 1.5px solid ${p => p.$low ? 'rgba(184, 92, 26, 0.25)' : 'rgba(46, 125, 82, 0.25)'};
  border-radius: 50px;
  padding: 0.3rem 0.8rem;
  margin-bottom: 1.25rem;
`;

const TicketsAvailableBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #2E7D52;
  background: rgba(46, 125, 82, 0.1);
  border: 1.5px solid rgba(46, 125, 82, 0.3);
  border-radius: 50px;
  padding: 0.28rem 0.8rem;
  margin-bottom: 1.25rem;

  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #2E7D52;
    animation: pulse-dot 2s ease-in-out infinite;
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(0.85); }
  }
`;

const CTAStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const CTAPrimary = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.84rem;
  font-weight: 600;
  color: white;
  background: ${AE.blue};
  border: 2px solid ${AE.blue};
  border-radius: 50px;
  padding: 0.85rem 1.5rem;
  text-decoration: none;
  transition: all 0.25s ease;

  &:hover {
    background: ${AE.blueDark};
    border-color: ${AE.blueDark};
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(74, 114, 168, 0.3);
  }
`;

const CTASecondary = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.84rem;
  font-weight: 500;
  color: ${AE.blue};
  background: transparent;
  border: 2px solid rgba(74, 114, 168, 0.35);
  border-radius: 50px;
  padding: 0.85rem 1.5rem;
  text-decoration: none;
  transition: all 0.25s ease;

  &:hover {
    border-color: ${AE.blue};
    background: rgba(74, 114, 168, 0.06);
    transform: translateY(-1px);
  }
`;

const CTAPortfolio = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  color: ${AE.warmBrown};
  border: 1.5px solid rgba(139, 125, 107, 0.3);
  border-radius: 50px;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  transition: all 0.22s ease;

  &:hover {
    border-color: ${AE.blue};
    color: ${AE.blue};
    background: rgba(74, 114, 168, 0.05);
  }
`;

const InstagramRow = styled.div`
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(74, 114, 168, 0.1);
`;

const InstagramLabel = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${AE.warmLight};
  margin: 0 0 0.5rem;
`;

const InstagramHandle = styled.a`
  display: block;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  color: ${AE.blue};
  text-decoration: none;
  margin-bottom: 0.2rem;
  transition: color 0.2s;

  &:hover { color: ${AE.blueDark}; text-decoration: underline; }
`;

// ─── Component ─────────────────────────────────────────────────────────────

interface Props {
  event: ArtEvent;
}

export default function EventDetailPage({ event }: Props) {
  const { locale } = useTranslation();
  const lang = locale as 'en' | 'es';

  const title = event.title[lang];
  const description = event.description[lang];

  const priceDisplay = event.price === 'free'
    ? 'Free'
    : `$${event.price} ${event.currency}`;

  return (
    <Page>
      <ArtExpNav />

      <PageHeader>
        <HeaderInner>
          <BackLink href="/art-experiences#upcoming">
            ← {lang === 'en' ? 'Back to Events' : 'Volver a Eventos'}
          </BackLink>

          <EventType>
            <StarSpark size={10} color={AE.blue} />
            {event.type === 'myEvents'
              ? (lang === 'en' ? 'My Experience' : 'Mi Experiencia')
              : 'You & I Paint'}
          </EventType>

          <EventTitle>{title}</EventTitle>

          <WavyWrap>
            <WavyUnderline width={80} color={AE.blue} />
          </WavyWrap>

          <HeaderMeta>
            {event.date} · {event.time} · {event.venue}, {event.city}
          </HeaderMeta>
        </HeaderInner>
      </PageHeader>

      <Body>
        <MainColumn>
          <Description>{description}</Description>

          {event.tags.length > 0 && (
            <TagRow>
              {event.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
            </TagRow>
          )}

          <MaterialsNote>
            ✦ {lang === 'en'
              ? 'All painting materials are included'
              : 'Todos los materiales de pintura están incluidos'}
          </MaterialsNote>
        </MainColumn>

        <Sidebar>
          <InfoCard>
            <PriceDisplay>
              <PriceLabel>{lang === 'en' ? 'Price per person' : 'Precio por persona'}</PriceLabel>
              <PriceValue>{priceDisplay}</PriceValue>
            </PriceDisplay>

            {event.ticketsAvailable && (
              <TicketsAvailableBadge>
                {lang === 'en' ? 'Tickets Available' : 'Boletas Disponibles'}
              </TicketsAvailableBadge>
            )}

            {event.spotsLeft !== undefined && event.spotsLeft > 0 && (
              <SpotsChip $low={event.spotsLeft <= 5}>
                {event.spotsLeft} {lang === 'en' ? 'spots left' : 'lugares disponibles'}
              </SpotsChip>
            )}

            <Divider />

            <MetaList>
              <MetaItem>
                <MetaIcon>📅</MetaIcon>
                <MetaText>
                  {event.date}
                  <MetaSub>{event.time}</MetaSub>
                </MetaText>
              </MetaItem>
              <MetaItem>
                <MetaIcon>📍</MetaIcon>
                <MetaText>
                  {event.venue}
                  <MetaSub>{event.address}, {event.city}</MetaSub>
                </MetaText>
              </MetaItem>
              {event.spotsTotal && (
                <MetaItem>
                  <MetaIcon>👥</MetaIcon>
                  <MetaText>
                    {lang === 'en' ? 'Small group' : 'Grupo pequeño'}
                    <MetaSub>
                      {lang === 'en'
                        ? `Max ${event.spotsTotal} participants`
                        : `Máx. ${event.spotsTotal} participantes`}
                    </MetaSub>
                  </MetaText>
                </MetaItem>
              )}
            </MetaList>

            <Divider />

            <CTAStack>
              {event.eventbriteUrl && (
                <CTAPrimary href={event.eventbriteUrl} target="_blank" rel="noopener noreferrer">
                  {lang === 'en' ? 'Buy Tickets on Eventbrite' : 'Comprar en Eventbrite'} ↗
                </CTAPrimary>
              )}
              {event.flockUrl && (
                <CTASecondary href={event.flockUrl} target="_blank" rel="noopener noreferrer">
                  {lang === 'en' ? 'Reserve a Spot on Flock' : 'Reservar en Flock'} ↗
                </CTASecondary>
              )}
              {event.artistPortfolioUrl && (
                <CTAPortfolio href={event.artistPortfolioUrl}>
                  🎨 {lang === 'en' ? "View Artist's Portfolio" : 'Ver Portafolio de la Artista'}
                </CTAPortfolio>
              )}
            </CTAStack>

            {event.instagramHandles && event.instagramHandles.length > 0 && (
              <InstagramRow>
                <InstagramLabel>📸 Instagram</InstagramLabel>
                {event.instagramHandles.map(handle => (
                  <InstagramHandle
                    key={handle}
                    href={`https://instagram.com/${handle.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {handle}
                  </InstagramHandle>
                ))}
              </InstagramRow>
            )}
          </InfoCard>
        </Sidebar>
      </Body>

      <ArtExpFooter />
    </Page>
  );
}
