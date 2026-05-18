'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled, { keyframes } from 'styled-components';
import { AE, StarSpark, TinyStar } from './Doodles';
import type { ArtEvent } from './data';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const CardWrap = styled.article<{ $featured?: boolean }>`
  background: ${AE.cream};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(44, 36, 22, 0.09), 0 1px 4px rgba(44, 36, 22, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1.5px solid rgba(74, 114, 168, 0.12);
  display: flex;
  flex-direction: ${p => p.$featured ? 'row' : 'column'};
  height: 100%;

  @media (max-width: 700px) {
    flex-direction: column;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(74, 114, 168, 0.18), 0 2px 8px rgba(44, 36, 22, 0.08);
  }
`;

const ImageWrap = styled.div<{ $featured?: boolean }>`
  position: relative;
  width: ${p => p.$featured ? '50%' : '100%'};
  aspect-ratio: ${p => p.$featured ? '4/3' : '16/9'};
  flex-shrink: 0;
  overflow: hidden;
  background: ${AE.paper};

  @media (max-width: 700px) {
    width: 100%;
    aspect-ratio: 16/9;
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: ${AE.paper};
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(74, 114, 168, 0.3);
  font-size: 3rem;
`;

const PriceBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${AE.cream};
  color: ${AE.blue};
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  padding: 0.3rem 0.85rem;
  border-radius: 50px;
  border: 1.5px solid rgba(74, 114, 168, 0.3);
  box-shadow: 0 2px 8px rgba(44, 36, 22, 0.1);
  letter-spacing: 0.02em;
`;

const SpotsTag = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(74, 114, 168, 0.9);
  color: white;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  padding: 0.25rem 0.7rem;
  border-radius: 50px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const CardBody = styled.div<{ $featured?: boolean }>`
  padding: ${p => p.$featured ? '2rem 2.5rem' : '1.5rem'};
  display: flex;
  flex-direction: column;
  flex: 1;

  @media (max-width: 700px) {
    padding: 1.5rem;
  }
`;

const FeaturedTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${AE.blue};
  margin-bottom: 1rem;
`;

const EventTitle = styled.h3<{ $featured?: boolean }>`
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: ${p => p.$featured ? 'clamp(1.8rem, 3vw, 2.5rem)' : '1.5rem'};
  font-weight: 600;
  font-style: italic;
  color: ${AE.ink};
  margin: 0 0 0.75rem;
  line-height: 1.2;
`;

const EventDescription = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.875rem;
  line-height: 1.75;
  color: ${AE.warmBrown};
  margin: 0 0 1.5rem;
`;

const EventMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.82rem;
  color: ${AE.ink};
`;

const MetaIcon = styled.span`
  font-size: 0.85rem;
  flex-shrink: 0;
  margin-top: 0.05rem;
`;

const MetaText = styled.span`
  font-weight: 500;
  line-height: 1.4;
`;

const MaterialsNote = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.72rem;
  font-style: italic;
  color: ${AE.warmBrown};
  margin: 0 0 1.5rem;
  padding: 0.6rem 1rem;
  background: rgba(74, 114, 168, 0.06);
  border-left: 3px solid rgba(74, 114, 168, 0.4);
  border-radius: 0 8px 8px 0;
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
  margin-bottom: 1rem;

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

const ArtistPortfolioBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.76rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: ${AE.warmBrown};
  background: transparent;
  border: 1.5px solid rgba(139, 125, 107, 0.3);
  border-radius: 50px;
  padding: 0.55rem 1.15rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.22s ease;
  white-space: nowrap;

  &:hover {
    border-color: ${AE.blue};
    color: ${AE.blue};
    background: rgba(74, 114, 168, 0.06);
    transform: translateY(-1px);
  }
`;

const InstagramRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.85rem;
  padding-top: 0.85rem;
  border-top: 1px solid rgba(74, 114, 168, 0.12);
`;

const InstagramLabel = styled.span`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  color: ${AE.warmLight};
  text-transform: uppercase;
`;

const InstagramHandle = styled.a`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  color: ${AE.blue};
  text-decoration: none;
  transition: color 0.2s;

  &:hover { color: ${AE.blueDark}; text-decoration: underline; }
`;

const CTARow = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
  flex-wrap: wrap;
`;

const CTAPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: white;
  background: ${AE.blue};
  border: 2px solid ${AE.blue};
  border-radius: 50px;
  padding: 0.65rem 1.4rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;

  &:hover {
    background: ${AE.blueDark};
    border-color: ${AE.blueDark};
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(74, 114, 168, 0.3);
  }
`;

const CTASecondary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: ${AE.blue};
  background: transparent;
  border: 2px solid rgba(74, 114, 168, 0.35);
  border-radius: 50px;
  padding: 0.65rem 1.2rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;

  &:hover {
    border-color: ${AE.blue};
    background: rgba(74, 114, 168, 0.07);
    transform: translateY(-1px);
  }
`;

interface EventCardProps {
  event: ArtEvent;
  locale: 'en' | 'es';
  featured?: boolean;
  t: (key: string) => string;
}

export default function EventCard({ event, locale, featured = false, t }: EventCardProps) {
  const title = event.title[locale];
  const description = event.description[locale];

  const priceDisplay = event.price === 'free'
    ? t('artExperiences.upcoming.free')
    : `$${event.price} ${event.currency}`;

  return (
    <CardWrap $featured={featured}>
      <ImageWrap $featured={featured}>
        {event.image ? (
          <Image
            src={event.image}
            alt={title}
            fill
            sizes={featured ? '(max-width: 700px) 100vw, 50vw' : '(max-width: 700px) 100vw, 33vw'}
            style={{ objectFit: 'cover' }}
            loading="lazy"
          />
        ) : (
          <ImagePlaceholder>🎨</ImagePlaceholder>
        )}
        <PriceBadge>{priceDisplay}</PriceBadge>
        {event.spotsLeft !== undefined && event.spotsLeft > 0 && (
          <SpotsTag>{event.spotsLeft} {t('artExperiences.myExperiences.spotsLeft')}</SpotsTag>
        )}
      </ImageWrap>

      <CardBody $featured={featured}>
        {event.ticketsAvailable && (
          <TicketsAvailableBadge>
            {locale === 'en' ? 'Tickets Available' : 'Boletas Disponibles'}
          </TicketsAvailableBadge>
        )}

        {featured && (
          <FeaturedTag>
            <StarSpark size={12} color={AE.blue} />
            {t('artExperiences.myExperiences.featured')}
          </FeaturedTag>
        )}

        <EventTitle $featured={featured}>{title}</EventTitle>

        {featured && (
          <EventDescription>{description}</EventDescription>
        )}

        <EventMeta>
          <MetaRow>
            <MetaIcon>📅</MetaIcon>
            <MetaText>{event.date} · {event.time}</MetaText>
          </MetaRow>
          <MetaRow>
            <MetaIcon>📍</MetaIcon>
            <MetaText>{event.venue}, {event.address}, {event.city}</MetaText>
          </MetaRow>
        </EventMeta>

        {featured && (
          <MaterialsNote>✦ {t('artExperiences.myExperiences.materialsProvided')}</MaterialsNote>
        )}

        <CTARow>
          {event.eventbriteUrl && (
            <CTAPrimary href={event.eventbriteUrl} target="_blank" rel="noopener noreferrer">
              {t('artExperiences.myExperiences.buyTickets')}
              <span>↗</span>
            </CTAPrimary>
          )}
          {event.flockUrl && (
            <CTASecondary href={event.flockUrl} target="_blank" rel="noopener noreferrer">
              {t('artExperiences.myExperiences.reserveSpot')} {t('artExperiences.myExperiences.onFlock')}
              <span>↗</span>
            </CTASecondary>
          )}
          {event.artistPortfolioUrl && (
            <ArtistPortfolioBtn href={event.artistPortfolioUrl}>
              🎨 {locale === 'en' ? "View Artist's Work" : 'Ver Obra de la Artista'}
            </ArtistPortfolioBtn>
          )}
          {!event.eventbriteUrl && !event.flockUrl && !event.artistPortfolioUrl && (
            <CTAPrimary href="#upcoming">
              {t('artExperiences.myExperiences.learnMore')}
            </CTAPrimary>
          )}
        </CTARow>

        {event.instagramHandles && event.instagramHandles.length > 0 && (
          <InstagramRow>
            <InstagramLabel>📸 IG</InstagramLabel>
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
      </CardBody>
    </CardWrap>
  );
}
