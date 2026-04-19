'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled, { keyframes, css } from 'styled-components';
import data from '../../data/artPortfolio';
import ArtNav from './ArtNav';

const C = {
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
  line-height: 0.9;
  margin: 0 0 1.2rem;
  word-break: break-word;
  padding: 0 1rem;

  @media (max-width: 480px) {
    font-size: clamp(1.8rem, 6vw, 3rem);
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
  margin: 0 0 3.5rem;
`;

// ─── Featured Works ────────────────────────────────────────────────
const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FeaturedCard = styled(Link)`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  background: ${C.surface};
  aspect-ratio: 3/4;
  border: 1px solid ${C.border};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${C.gold};
    box-shadow: 0 8px 32px rgba(200, 168, 122, 0.15);
  }

  @media (max-width: 1024px) {
    aspect-ratio: 4/5;

    &:nth-child(3) {
      display: none;
    }
  }

  @media (max-width: 700px) {
    aspect-ratio: 3/4;
  }
`;

const FeaturedImgWrap = styled.div`
  position: absolute;
  inset: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

const FeaturedOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(4, 4, 4, 0.98) 0%, rgba(4, 4, 4, 0.6) 50%, transparent 100%);
  opacity: 1;
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;

  ${FeaturedCard}:hover & {
    background: linear-gradient(to top, rgba(4, 4, 4, 1) 0%, rgba(4, 4, 4, 0.7) 50%, transparent 100%);
  }

  ${FeaturedCard}:hover ${FeaturedImgWrap} img {
    transform: scale(1.04);
  }
`;

const FeaturedTitle = styled.h3`
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: 400;
  letter-spacing: 0.03em;
  color: ${C.text};
  margin: 0 0 0.5rem;
`;

const FeaturedMeta = styled.p`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${C.gold};
  margin: 0;
`;

// ─── Collections Grid ──────────────────────────────────────────────
const CollectionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const CollectionCard = styled(Link)`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  aspect-ratio: 4/5;
  background: ${C.surface};
  border: 1px solid ${C.border};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${C.gold};
    box-shadow: 0 8px 32px rgba(200, 168, 122, 0.15);
  }
`;

const CollectionImgWrap = styled.div`
  position: absolute;
  inset: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

const CollectionOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(4, 4, 4, 0.98) 0%, rgba(4, 4, 4, 0.6) 50%, transparent 100%);
  opacity: 1;
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;

  ${CollectionCard}:hover & {
    background: linear-gradient(to top, rgba(4, 4, 4, 1) 0%, rgba(4, 4, 4, 0.7) 50%, transparent 100%);
  }

  ${CollectionCard}:hover ${CollectionImgWrap} img {
    transform: scale(1.03);
  }
`;

const CollectionName = styled.h3`
  font-size: clamp(1.3rem, 3.5vw, 1.8rem);
  font-weight: 400;
  letter-spacing: 0.03em;
  color: ${C.text};
  margin: 0 0 0.3rem;
`;

const CollectionMeta = styled.p`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${C.muted};
  margin: 0 0 1rem;
`;

const CollectionDesc = styled.p`
  font-size: 0.95rem;
  font-style: italic;
  color: ${C.muted};
  line-height: 1.6;
  margin: 0;
  opacity: 0;
  transition: opacity 0.4s ease;
  margin-top: 0.5rem;

  ${CollectionCard}:hover & {
    opacity: 1;
  }
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
export default function ArtHome() {
  const heroImage = '/images/art/traditionalArt/Carrying Home/Moving.webp';

  // Featured paintings: first painting from first 3 collections
  const featured = data.collections.slice(0, 3).map(col => ({
    painting: col.paintings[0],
    collection: col,
  }));

  return (
    <Site>
      <ArtNav />

      {/* Hero */}
      <Hero>
        <HeroImgWrap>
          <Image
            src={heroImage}
            alt="Featured artwork by Camila Londoño"
            fill
            priority
            sizes="100vw"
            draggable={false}
          />
        </HeroImgWrap>
        <HeroBg />
        <HeroContent>
          <ArtistName>CamilaLonart</ArtistName>
          <HeroRule />
          <HeroTagline>Artist</HeroTagline>
        </HeroContent>
        <ScrollCue aria-hidden="true">
          <ScrollLine />
          <span>Scroll</span>
        </ScrollCue>
      </Hero>

      {/* Featured Works */}
      <Section>
        <SectionEyebrow>Featured</SectionEyebrow>
        <SectionTitle>Selected Works</SectionTitle>
        <SectionDesc>
          A curated selection from recent collections.
        </SectionDesc>
        <FeaturedGrid>
          {featured.map(({ painting, collection }) => (
            <FeaturedCard
              key={painting.id}
              href={`/art/${collection.id}/${painting.id}`}
            >
              <FeaturedImgWrap>
                <img
                  src={painting.images[0]}
                  alt={`${painting.title} — ${painting.materials}`}
                  draggable={false}
                  onContextMenu={e => e.preventDefault()}
                />
              </FeaturedImgWrap>
              <FeaturedOverlay>
                <FeaturedTitle>{painting.title}</FeaturedTitle>
                <FeaturedMeta>{collection.name}</FeaturedMeta>
              </FeaturedOverlay>
            </FeaturedCard>
          ))}
        </FeaturedGrid>
      </Section>

      {/* Collections */}
      <Section id="collections">
        <SectionEyebrow>Collections</SectionEyebrow>
        <SectionTitle>Explore</SectionTitle>
        <SectionDesc>
          Organized by season, theme, and artistic exploration. Each collection tells its own story.
        </SectionDesc>
        <CollectionsGrid>
          {data.collections.map(col => (
            <CollectionCard
              key={col.id}
              href={`/art/${col.id}`}
            >
              <CollectionImgWrap>
                <img
                  src={col.paintings[0]?.images[0] || ''}
                  alt={col.name}
                  draggable={false}
                  onContextMenu={e => e.preventDefault()}
                />
              </CollectionImgWrap>
              <CollectionOverlay>
                <CollectionName>{col.name}</CollectionName>
                <CollectionMeta>{col.period} · {col.paintings.length} works</CollectionMeta>
                <CollectionDesc>{col.description}</CollectionDesc>
              </CollectionOverlay>
            </CollectionCard>
          ))}
        </CollectionsGrid>
      </Section>

      {/* About Teaser */}
      <Section>
        <SectionEyebrow>The Artist</SectionEyebrow>
        <SectionTitle>About</SectionTitle>
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
              Read Full Bio →
            </ReadMoreLink>
          </AboutTextWrap>
        </AboutTeaserWrap>
      </Section>

      {/* Footer */}
      <Footer>
        <FooterText>
          © {new Date().getFullYear()} <FooterGold>Camila Londoño</FooterGold>. All artwork and images are copyrighted and protected. Reproduction without permission is prohibited.
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
