'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import styled, { keyframes } from 'styled-components';
import { AE, WavyUnderline, SmallFlower, StarSpark, TinyStar, PublicEventIcon, PrivateEventIcon, CorporateEventIcon, WeddingEventIcon } from './Doodles';
import { FLOCK_COMMUNITY_URL, YOU_AND_I_PAINT_URL } from './data';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.97) translateY(8px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`;

// ─── Layout ───────────────────────────────────────────────────────────────────

const Section = styled.section`
  background: ${AE.paper};
  padding: clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem);
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1100px;
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
  margin: 0 0 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  animation: ${fadeInUp} 0.9s ease both;
  animation-delay: 0.1s;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin: 0 auto;
  }
`;

// ─── Card ─────────────────────────────────────────────────────────────────────

const Card = styled.div<{ $accent?: string }>`
  background: ${AE.cream};
  border-radius: 24px;
  border: 2px solid ${p => p.$accent ? `${p.$accent}22` : 'rgba(74,114,168,0.14)'};
  cursor: pointer;
  transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(74, 114, 168, 0.18);
    border-color: ${p => p.$accent ? `${p.$accent}44` : 'rgba(74,114,168,0.3)'};
  }
`;

const CardImageWrap = styled.div<{ $accent?: string }>`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  flex-shrink: 0;
  border-bottom: 3px solid ${p => p.$accent || AE.blue};

  img { transition: transform 0.35s ease; }
  ${Card}:hover & img { transform: scale(1.06); }
`;

const CardContent = styled.div`
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`;

const CardIconWrap = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(74, 114, 168, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const CardTitle = styled.h3`
  font-family: var(--font-railey), 'Cormorant Garamond', serif;
  font-size: clamp(1.6rem, 2.8vw, 2rem);
  font-weight: 400;
  color: ${AE.ink};
  margin: 0;
  line-height: 1.15;
  text-transform: lowercase;
`;

const CardDesc = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.85rem;
  line-height: 1.75;
  color: ${AE.warmBrown};
  margin: 0;
  flex: 1;
`;

const CardCTA = styled.span`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  color: ${AE.blue};
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.5rem;

  ${Card}:hover & {
    gap: 0.65rem;
  }
`;

// ─── YOU & I PAINT MODAL ──────────────────────────────────────────────────────

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

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(8, 8, 8, 0.88);
  z-index: 8000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
  padding: 2rem 1rem;
  animation: ${fadeIn} 0.22s ease;
`;

const ModalPanel = styled.div`
  background: ${AE.cream};
  border-radius: 28px;
  max-width: 960px;
  width: 100%;
  margin: auto;
  overflow: hidden;
  animation: ${scaleIn} 0.28s ease;
  position: relative;
`;

const ModalHeader = styled.div`
  background: ${AE.paper};
  padding: 2.5rem clamp(1.5rem, 4vw, 3rem) 2rem;
  border-bottom: 1.5px solid rgba(74, 114, 168, 0.12);
  position: relative;
`;

const ModalClose = styled.button`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  background: rgba(74, 114, 168, 0.1);
  border: none;
  color: ${AE.warmBrown};
  font-size: 1.1rem;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s;
  flex-shrink: 0;

  &:hover {
    background: rgba(74, 114, 168, 0.2);
    color: ${AE.ink};
  }
`;

const ModalEyebrow = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${AE.blue};
  margin: 0 0 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ModalTitle = styled.h2`
  font-family: var(--font-railey), 'Cormorant Garamond', serif;
  font-size: clamp(2.4rem, 5vw, 3.8rem);
  font-weight: 400;
  color: ${AE.ink};
  margin: 0 0 0.75rem;
  text-transform: lowercase;
  line-height: 1.05;
`;

const ModalBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${AE.blue};
  background: rgba(74, 114, 168, 0.1);
  border: 1.5px solid rgba(74, 114, 168, 0.25);
  border-radius: 50px;
  padding: 0.3rem 0.85rem;
  margin-right: 0.5rem;
`;

const ModalBody = styled.div`
  padding: clamp(1.5rem, 4vw, 2.5rem) clamp(1.5rem, 4vw, 3rem);
`;

const ModalDesc = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.92rem;
  line-height: 1.85;
  color: ${AE.warmBrown};
  margin: 0 0 1.5rem;
  max-width: 680px;
`;

const EventTypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const EventTypeCard = styled.div`
  background: ${AE.paper};
  border-radius: 14px;
  padding: 1.25rem;
  border: 1.5px solid rgba(74, 114, 168, 0.1);
`;

const EventTypeIcon = styled.div`
  margin-bottom: 0.6rem;
`;

const EventTypeTitle = styled.h4`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${AE.blue};
  margin: 0 0 0.4rem;
`;

const EventTypeDesc = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.75rem;
  line-height: 1.6;
  color: ${AE.warmBrown};
  margin: 0;
`;

const GalleryTitle = styled.h3`
  font-family: var(--font-railey), 'Cormorant Garamond', serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 400;
  color: ${AE.ink};
  margin: 0 0 1.25rem;
  text-transform: lowercase;
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
  margin-bottom: 1.5rem;

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
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background: ${AE.paper};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(74, 114, 168, 0.22);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover::after { opacity: 1; }
`;

const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  padding-top: 1rem;
  border-top: 1.5px solid rgba(74, 114, 168, 0.12);
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

const PhotoCount = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.75rem;
  color: ${AE.warmLight};
  margin: 0;
`;

// ─── Lightbox ─────────────────────────────────────────────────────────────────

const LightboxOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(8, 8, 8, 0.97);
  z-index: 9500;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.18s ease;
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
  z-index: 9501;

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
  z-index: 9501;

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
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 0.1em;
  z-index: 9501;
`;

// ─── Icons ────────────────────────────────────────────────────────────────────

const CommunityIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="9" cy="7" r="3" stroke={AE.blue} strokeWidth="1.8" fill="rgba(74,114,168,0.15)" />
    <circle cx="17" cy="9" r="2.5" stroke={AE.blue} strokeWidth="1.8" fill="rgba(74,114,168,0.15)" />
    <path d="M2 20c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke={AE.blue} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M17 14c1.657 0 3 1.343 3 3v1" stroke={AE.blue} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const EventIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="5" width="18" height="16" rx="3" stroke={AE.blue} strokeWidth="1.8" fill="rgba(74,114,168,0.1)" />
    <path d="M3 10h18" stroke={AE.blue} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M8 3v4M16 3v4" stroke={AE.blue} strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="8" cy="15" r="1.2" fill={AE.blue} />
    <circle cx="12" cy="15" r="1.2" fill={AE.blue} />
    <circle cx="16" cy="15" r="1.2" fill={AE.blue} />
  </svg>
);

const BrushIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 20.5c1-1 2.5-1 3.5 0s2.5 1 3.5 0" stroke={AE.blue} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M6.5 20.5V12" stroke={AE.blue} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M3 12c0-1.657 1.567-3 3.5-3S10 10.343 10 12v0H3v0Z" stroke={AE.blue} strokeWidth="1.8" fill="rgba(74,114,168,0.12)" />
    <path d="M14 3l7 7-4 4-7-7" stroke={AE.blue} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const scrollTo = (id: string) => {
  if (typeof window === 'undefined') return;
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ThreeCardsSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openModal = () => { setModalOpen(true); document.body.style.overflow = 'hidden'; };
  const closeModal = () => { setModalOpen(false); document.body.style.overflow = ''; };

  const openLightbox = (i: number) => { setLightboxIndex(i); };
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

  useEffect(() => {
    if (!modalOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxIndex === null) closeModal();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [modalOpen, lightboxIndex]);

  const eventTypes = [
    { icon: <PublicEventIcon size={36} color={AE.blue} />, title: 'Public Events', desc: 'Open paint & sip nights at beautiful venues around the city.' },
    { icon: <PrivateEventIcon size={36} color={AE.blue} />, title: 'Private Parties', desc: 'Custom painting sessions for birthdays, bachelorettes, and celebrations.' },
    { icon: <CorporateEventIcon size={36} color={AE.blue} />, title: 'Corporate', desc: 'Team-building experiences that spark creativity and connection.' },
    { icon: <WeddingEventIcon size={36} color={AE.blue} />, title: 'Weddings', desc: 'A unique art activity for wedding receptions and bridal showers.' },
  ];

  return (
    <>
      <Section id="experience-cards">
        <Container>
          <CardsGrid>
            {/* Card 1... Creative Corner */}
            <Card
              $accent={AE.blue}
              as="a"
              href={FLOCK_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <CardImageWrap $accent={AE.blue}>
                <Image
                  src="/images/artExperiences/CreativeCorner/Logo.webp"
                  alt="Creative Corner... community painting session"
                  fill
                  sizes="(max-width: 860px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                />
              </CardImageWrap>
              <CardContent>
                <CardTitle>join the community</CardTitle>
                <CardDesc>
                  A community for everyone who creates or wants to. Guided painting sessions, warmth, no experience needed. Just brushes, colour, and real connection.
                </CardDesc>
                <CardCTA>Join us on Flock <span>↗</span></CardCTA>
              </CardContent>
            </Card>

            {/* Card 2... Art Events */}
            <Card
              $accent={AE.blueDark}
              onClick={() => scrollTo('upcoming')}
              style={{ cursor: 'pointer' }}
            >
              <CardImageWrap $accent={AE.blueDark}>
                <Image
                  src="/images/artExperiences/CreativeCorner/paintsip.webp"
                  alt="Art event poster... painting class in Vancouver"
                  fill
                  sizes="(max-width: 860px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                />
              </CardImageWrap>
              <CardContent>
                <CardTitle>join art events</CardTitle>
                <CardDesc>
                  Upcoming painting classes and paint & sip sessions in Vancouver. Small groups, beginner-friendly, all materials included. Reserve your spot.
                </CardDesc>
                <CardCTA>View upcoming events <span>→</span></CardCTA>
              </CardContent>
            </Card>

            {/* Card 3... You & I Paint */}
            <Card
              $accent="#7FA4C7"
              onClick={openModal}
              style={{ cursor: 'pointer' }}
            >
              <CardImageWrap $accent="#7FA4C7">
                <Image
                  src="/images/artExperiences/CreativeCorner/you&i.webp"
                  alt="You & I Paint event... Camila teaching a painting class"
                  fill
                  sizes="(max-width: 860px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                />
              </CardImageWrap>
              <CardContent>
                <CardTitle>i'm also a teacher</CardTitle>
                <CardDesc>
                  Certified instructor for You & I Paint. Over 15 events taught... from weddings and corporate gatherings to public paint & sip and private celebrations.
                </CardDesc>
                <CardCTA>See my experience <span>→</span></CardCTA>
              </CardContent>
            </Card>
          </CardsGrid>
        </Container>
      </Section>

      {/* You & I Paint Modal */}
      {modalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalPanel onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <ModalClose onClick={closeModal} aria-label="Close">✕</ModalClose>
              <ModalEyebrow>
                <StarSpark size={11} color={AE.blue} />
                Also teaching with
              </ModalEyebrow>
              <ModalTitle>you & i paint</ModalTitle>
              <div>
                <ModalBadge>✦ 15+ events taught</ModalBadge>
                <ModalBadge>Certified Instructor</ModalBadge>
              </div>
            </ModalHeader>

            <ModalBody>
              <ModalDesc>
                I am a certified painting instructor for You &amp; I Paint... a luxury paint &amp; sip company offering beautifully curated experiences across Vancouver. I have taught and decorated the space for over 15 events, ranging from intimate weddings and public community nights to large-scale corporate gatherings. Each event is guided step by step, beginner-friendly, and designed to leave people with something they're genuinely proud of.
              </ModalDesc>

              <EventTypeGrid>
                {eventTypes.map((t, i) => (
                  <EventTypeCard key={i}>
                    <EventTypeIcon>{t.icon}</EventTypeIcon>
                    <EventTypeTitle>{t.title}</EventTypeTitle>
                    <EventTypeDesc>{t.desc}</EventTypeDesc>
                  </EventTypeCard>
                ))}
              </EventTypeGrid>

              <GalleryTitle>from our events</GalleryTitle>
              <PhotoGrid>
                {YOU_AND_I_IMAGES.map((src, i) => (
                  <PhotoThumb key={src} onClick={() => openLightbox(i)}>
                    <Image
                      src={src}
                      alt={`You & I Paint event photo ${i + 1}`}
                      fill
                      sizes="(max-width: 420px) 50vw, (max-width: 640px) 33vw, 20vw"
                      style={{ objectFit: 'cover' }}
                      loading="lazy"
                    />
                  </PhotoThumb>
                ))}
              </PhotoGrid>

              <ModalFooter>
                <PhotoCount>{YOU_AND_I_IMAGES.length} photos from events I've taught</PhotoCount>
                <VisitBtn href={YOU_AND_I_PAINT_URL} target="_blank" rel="noopener noreferrer">
                  Visit You &amp; I Paint ↗
                </VisitBtn>
              </ModalFooter>
            </ModalBody>
          </ModalPanel>
        </ModalOverlay>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <LightboxOverlay onClick={closeLightbox}>
          <LightboxClose onClick={closeLightbox} aria-label="Close">✕</LightboxClose>
          <LightboxNav $side="left" onClick={e => { e.stopPropagation(); prev(); }} aria-label="Previous">‹</LightboxNav>
          <LightboxNav $side="right" onClick={e => { e.stopPropagation(); next(); }} aria-label="Next">›</LightboxNav>
          <LightboxInner onClick={e => e.stopPropagation()}>
            <Image
              src={YOU_AND_I_IMAGES[lightboxIndex]}
              alt={`You & I Paint event photo ${lightboxIndex + 1}`}
              width={900}
              height={900}
              style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: '8px' }}
              priority
            />
          </LightboxInner>
          <LightboxCounter>{lightboxIndex + 1} / {YOU_AND_I_IMAGES.length}</LightboxCounter>
        </LightboxOverlay>
      )}
    </>
  );
}
