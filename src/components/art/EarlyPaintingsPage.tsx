'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled, { keyframes } from 'styled-components';
import data, { earlyFirstPaintings_COLLECTIONS_ORDER } from '@/data/artPortfolio';
import ArtNav from './ArtNav';
import { useTranslation } from '@/i18n/TranslationContext';

const C: Record<string, string> = {
  bg: '#080808',
  surface: '#101010',
  border: '#1E1E1E',
  gold: '#C8A87A',
  goldLight: '#E5D4B3',
  text: '#F0EDE8',
  muted: '#6E6B65',
  dim: '#3A3835',
};

const fadeIn = keyframes`from{opacity:0}to{opacity:1}`;
const fadeUp = keyframes`from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}`;

const Site = styled.div`
  background: ${C.bg};
  color: ${C.text};
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  -webkit-font-smoothing: antialiased;

  * {
    box-sizing: border-box;
  }
`;

// ─── Hero ──────────────────────────────────────────────────────────
const Hero = styled.section`
  position: relative;
  height: 100svh;
  min-height: 600px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  padding-bottom: clamp(3rem, 6vw, 6rem);
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(8, 8, 8, 0.15) 0%,
    rgba(8, 8, 8, 0.5) 60%,
    rgba(8, 8, 8, 0.92) 100%
  );
  z-index: 1;
`;

const HeroImgWrap = styled.div`
  position: absolute;
  inset: 0;

  img {
    object-fit: cover;
    object-position: center 30%;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  animation: ${fadeUp} 1.1s ease both;
  animation-delay: 0.2s;
`;

const ArtistName = styled.h1`
  font-size: clamp(2rem, 8vw, 9rem);
  font-weight: 300;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${C.text};
  line-height: 0.95;
  margin: 0 0 1.2rem;
  word-break: break-word;
  padding: 0 0.5rem;
  max-width: 95vw;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 1024px) {
    font-size: clamp(1.5rem, 4.5vw, 3.5rem);
    padding: 0 0.3rem;
    letter-spacing: 0.08em;
  }

  @media (max-width: 768px) {
    font-size: clamp(1.2rem, 5vw, 2rem);
    letter-spacing: 0.05em;
    padding: 0 0.2rem;
  }

  @media (max-width: 640px) {
    font-size: clamp(1rem, 4.5vw, 1.5rem);
    letter-spacing: 0.04em;
    padding: 0 0.2rem;
    word-spacing: 9999px;
  }

  @media (max-width: 530px) {
    font-size: clamp(0.8rem, 3.5vw, 1.2rem);
    letter-spacing: 0.03em;
    padding: 0 0.15rem;
  }
`;

const HeroRule = styled.div`
  width: 48px;
  height: 1px;
  background: ${C.gold};
  margin: 0 auto 1.2rem;
`;

const HeroTagline = styled.p`
  font-size: clamp(1rem, 2vw, 1.3rem);
  font-style: italic;
  font-weight: 300;
  color: rgba(224, 224, 223);
  letter-spacing: 0.04em;
  margin: 0;
`;

const ScrollCue = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  animation: ${fadeIn} 2s ease 1.5s both;

  span {
    font-family: var(--font-montserrat), sans-serif;
    font-size: 0.55rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: ${C.muted};
  }
`;

const ScrollLine = styled.div`
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, ${C.gold}, transparent);
`;

// ─── Section ───────────────────────────────────────────────────────
const Section = styled.section`
  padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 5rem);
  border-top: 1px solid ${C.border};
`;

const SectionEyebrow = styled.p`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.58rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: ${C.gold};
  margin: 0 0 1rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2.2rem, 5vw, 4.5rem);
  font-weight: 300;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${C.text};
  line-height: 1;
  margin: 0 0 0.75rem;
`;

const SectionDesc = styled.p`
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  font-style: italic;
  font-weight: 300;
  color: ${C.muted};
  max-width: 640px;
  line-height: 1.8;
  margin: 0 0 clamp(2rem, 4vw, 3.5rem);
`;

// ─── Collections (masonry per collection) ──────────────────────────
const CollectionGroup = styled.div`
  margin-bottom: clamp(3rem, 6vw, 5rem);
`;

const CollectionGroupTitle = styled.h2`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.5rem;
  font-weight: 400;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: ${C.muted};
  margin: 0 0 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${C.border};
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const MasonryGrid = styled.div`
  columns: 4 280px;
  column-gap: 2px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1200px) { columns: 3 240px; }
  @media (max-width: 768px)  { columns: 2 180px; }
  @media (max-width: 500px)  { columns: 1; }
`;

const GalleryCard = styled(Link)`
  break-inside: avoid;
  margin-bottom: 2px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  display: block;
  text-decoration: none;
  background: ${C.surface};

  img {
    display: block;
    width: 100%;
    height: auto;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    user-select: none;
    pointer-events: none;
    -webkit-user-drag: none;
  }

  &:hover img { transform: scale(1.05); }
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.2rem;
  background: linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.3) 55%, transparent);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const GalleryCardHover = styled(GalleryCard)`
  &:hover ${CardOverlay} { opacity: 1; }
`;

const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.03em;
  color: ${C.text};
  margin: 0 0 0.3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const CardMeta = styled.p`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.5rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${C.gold};
  margin: 0;
`;

// ─── About Teaser ─────────────────────────────────────────────────
const AboutTeaserWrap = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const AboutPhotoWrap = styled.div`
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  background: ${C.surface};

  img {
    object-fit: cover;
    object-position: center top;
  }
`;

const AboutTextWrap = styled.div``;

const AboutP = styled.p`
  font-size: clamp(1rem, 1.8vw, 1.15rem);
  font-weight: 300;
  line-height: 1.9;
  color: ${C.muted};
  margin: 0 0 1rem;

  &:first-child {
    color: ${C.text};
    font-style: italic;
  }
`;

const ReadMoreLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.62rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${C.gold};
  text-decoration: none;
  border: 1px solid ${C.border};
  padding: 0.6rem 1.1rem;
  transition: border-color 0.2s, color 0.2s;
  margin-top: 2rem;

  &:hover {
    border-color: ${C.gold};
    color: ${C.goldLight};
  }
`;

// ─── Footer ────────────────────────────────────────────────────────
const Footer = styled.footer`
  background: #ffffff;
  border-top: 1px solid ${C.border};
  padding: clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  text-align: center;

  @media (max-width: 600px) {
    padding: clamp(2rem, 4vw, 3rem) clamp(1.5rem, 5vw, 5rem);
  }
`;

const FooterText = styled.p`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.55rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #1a1a1a;
  margin: 0;
`;

const FooterGold = styled.span`
  color: ${C.gold};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  a {
    font-family: var(--font-montserrat), sans-serif;
    font-size: 0.55rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #1a1a1a;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${C.gold};
    }
  }
`;

// ─── Component ─────────────────────────────────────────────────────
export default function EarlyPaintingsPage() {
  const { t } = useTranslation();
  const orderLower = earlyFirstPaintings_COLLECTIONS_ORDER.map(s => s.toLowerCase());
  const orderedCollections = [...data.earlyFirstPaintings].sort((a, b) => {
    const aIndex = orderLower.indexOf(a.id.toLowerCase());
    const bIndex = orderLower.indexOf(b.id.toLowerCase());
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  });

  const heroImage = '/images/art/oldArt/AcuarelaPapelAmarillo/SerenaBW_11.7x8.3in_May2016_PastelsYellowPaperWatercolor.webp';

  return (
    <Site>
      <ArtNav />

      {/* Hero */}
      <Hero>
        <HeroImgWrap>
          <Image
            src={heroImage}
            alt="Featured early artwork by Camila Londoño"
            fill
            priority
            sizes="100vw"
            draggable={false}
          />
        </HeroImgWrap>
        <HeroBg />
        <HeroContent>
          <ArtistName>{t('art.earlyFirstPaintings')}</ArtistName>
          <HeroRule />
          <HeroTagline>{t('nav.earlyPaintings')}</HeroTagline>
        </HeroContent>
        <ScrollCue aria-hidden="true">
          <ScrollLine />
          <span>{t('art.scroll')}</span>
        </ScrollCue>
      </Hero>

      {/* Collections — masonry per collection */}
      <Section id="collections">
        <SectionEyebrow>{t('nav.collections')}</SectionEyebrow>
        <SectionTitle>{t('art.explore')}</SectionTitle>
        {orderedCollections.map(col => (
          <CollectionGroup key={col.id}>
            <CollectionGroupTitle>
              {col.name}
              <span style={{ color: C.dim }}>{col.paintings.length}</span>
            </CollectionGroupTitle>
            <MasonryGrid>
              {col.paintings.map(p => (
                <GalleryCardHover
                  key={p.id}
                  href={`/art/${col.id}/${p.id}`}
                  aria-label={`View ${p.title}, ${p.year}`}
                >
                  <img
                    src={p.images[0]}
                    alt={`${p.title} — ${p.materials}, ${p.year}`}
                    loading="lazy"
                    draggable={false}
                    onContextMenu={e => e.preventDefault()}
                  />
                  <CardOverlay>
                    <CardTitle>{p.title}</CardTitle>
                    <CardMeta>{p.year}</CardMeta>
                  </CardOverlay>
                </GalleryCardHover>
              ))}
            </MasonryGrid>
          </CollectionGroup>
        ))}
      </Section>

      {/* About Teaser */}
      <Section>
        <SectionEyebrow>{t('art.traditional.about')}</SectionEyebrow>
        <SectionTitle>{t('nav.about')}</SectionTitle>
        <AboutTeaserWrap>
          {data.about.photoSrc && (
            <AboutPhotoWrap>
              <Image
                src={data.about.photoSrc}
                alt="Camila Londoño"
                fill
                sizes="300px"
              />
            </AboutPhotoWrap>
          )}
          <AboutTextWrap>
            {data.about.bio.slice(0, 2).map((para, i) => (
              <AboutP key={i}>{para}</AboutP>
            ))}
            <ReadMoreLink href="/art/about/">
              {t('art.traditional.readFullBio')}
            </ReadMoreLink>
          </AboutTextWrap>
        </AboutTeaserWrap>
      </Section>

      {/* Footer */}
      <Footer>
        <FooterText>
          © {new Date().getFullYear()} <FooterGold>Camila Londoño</FooterGold>. {t('footer.copyright').replace(`© ${new Date().getFullYear()} Camilalonart. `, '')}
        </FooterText>
        <SocialLinks>
          <a href="https://instagram.com/camilalonart" target="_blank" rel="noopener noreferrer">
            <FooterGold>@camilalonart</FooterGold>
          </a>
          <span style={{ color: '#1a1a1a' }}>•</span>
          <a href="https://instagram.com/camilonart" target="_blank" rel="noopener noreferrer">
            <FooterGold>@camilonart</FooterGold>
          </a>
          <span style={{ color: '#1a1a1a' }}>•</span>
          <a href="https://www.behance.net/camilalonart" target="_blank" rel="noopener noreferrer">
            <FooterGold>Behance</FooterGold>
          </a>
        </SocialLinks>
      </Footer>
    </Site>
  );
}
