'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useTranslation } from '../../i18n/TranslationContext';
import { AE, SmallFlower, WavyUnderline, StarSpark } from './Doodles';
import { FLOCK_COMMUNITY_URL } from './data';

const Footer = styled.footer`
  background: ${AE.ink};
  padding: clamp(3.5rem, 7vw, 6rem) clamp(1.5rem, 5vw, 4rem) 2rem;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TopRow = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3.5rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid rgba(245, 239, 224, 0.1);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const BrandColumn = styled.div``;

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.25rem;
`;

const LogoText = styled.span`
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: 1.4rem;
  font-weight: 600;
  font-style: italic;
  color: ${AE.cream};
`;

const Tagline = styled.p`
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  font-style: italic;
  color: ${AE.blueLight};
  margin: 0 0 1rem;
`;

const BrandDesc = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.8rem;
  line-height: 1.75;
  color: rgba(245, 239, 224, 0.55);
  margin: 0;
`;

const Column = styled.div``;

const ColTitle = styled.h4`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${AE.cream};
  margin: 0 0 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ColLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

const ColLink = styled.a`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.82rem;
  color: rgba(245, 239, 224, 0.65);
  text-decoration: none;
  transition: color 0.2s;
  cursor: pointer;

  &:hover { color: ${AE.blueLight}; }
`;

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Copyright = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.72rem;
  color: rgba(245, 239, 224, 0.4);
  margin: 0;
`;

const SocialRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const SocialLink = styled.a`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: rgba(245, 239, 224, 0.5);
  text-decoration: none;
  transition: color 0.2s;

  &:hover { color: ${AE.blueLight}; }
`;

const scrollTo = (id: string) => {
  if (typeof window === 'undefined') return;
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

export default function ArtExpFooter() {
  const { t } = useTranslation();

  return (
    <Footer>
      <Container>
        <TopRow>
          <BrandColumn>
            <LogoWrap>
              <SmallFlower size={20} color={AE.blueLight} />
              <LogoText>CamilaLonart</LogoText>
            </LogoWrap>
            <WavyUnderline width={60} color={AE.blueLight} style={{ marginBottom: '1.25rem', opacity: 0.6 }} />
            <Tagline>{t('artExperiences.footer.tagline')}</Tagline>
            <BrandDesc>
              {t('artExperiences.footer.brandDesc')}
            </BrandDesc>
          </BrandColumn>

          <Column>
            <ColTitle>
              <StarSpark size={10} color={AE.blueLight} />
              {t('artExperiences.footer.experiencesTitle')}
            </ColTitle>
            <ColLinks>
              <ColLink as={Link} href="/art-experiences/events">{t('artExperiences.footer.myArtEvents')}</ColLink>
              <ColLink onClick={() => scrollTo('creative-corner')}>{t('artExperiences.footer.creativeCorner')}</ColLink>
              <ColLink onClick={() => scrollTo('you-and-i')}>{t('artExperiences.footer.youAndIPaint')}</ColLink>
              <ColLink onClick={() => scrollTo('upcoming')}>{t('artExperiences.footer.upcomingEvents')}</ColLink>
            </ColLinks>
          </Column>

          <Column>
            <ColTitle>
              <StarSpark size={10} color={AE.blueLight} />
              {t('artExperiences.footer.connectTitle')}
            </ColTitle>
            <ColLinks>
              <ColLink href="https://instagram.com/camilalonart" target="_blank" rel="noopener noreferrer">
                {t('artExperiences.footer.instagram')}
              </ColLink>
              <ColLink href={FLOCK_COMMUNITY_URL} target="_blank" rel="noopener noreferrer">
                {t('artExperiences.footer.joinFlock')}
              </ColLink>
              <ColLink href="mailto:camilalonart@gmail.com">
                {t('artExperiences.footer.getInTouch')}
              </ColLink>
              <ColLink as={Link} href="/">
                {t('artExperiences.footer.mainSite')}
              </ColLink>
            </ColLinks>
          </Column>
        </TopRow>

        <BottomRow>
          <Copyright>
            {t('artExperiences.footer.copyright')}
          </Copyright>
          <SocialRow>
            <SocialLink href="https://instagram.com/camilalonart" target="_blank" rel="noopener noreferrer">@camilalonart</SocialLink>
            <SocialLink href={FLOCK_COMMUNITY_URL} target="_blank" rel="noopener noreferrer">Flock Community</SocialLink>
          </SocialRow>
        </BottomRow>
      </Container>
    </Footer>
  );
}
