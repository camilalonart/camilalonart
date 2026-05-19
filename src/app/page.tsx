'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { theme } from '../styles/theme';
import { useTranslation } from '../i18n/TranslationContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { visibleSections } from '../config/sections';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #0D0D0D;
  position: relative;
`;

const LanguageSwitcherWrapper = styled.div`
  position: fixed;
  top: clamp(1rem, 2vw, 1.5rem);
  right: clamp(1rem, 2vw, 1.5rem);
  z-index: 100;
`;

const Hero = styled.section`
  padding: clamp(5rem, 10vw, 8rem) 2rem clamp(3rem, 5vw, 4rem);
  text-align: center;
  background: transparent;

  h1 {
    font-size: clamp(3rem, 6vw, 5rem);
    margin-bottom: ${theme.spacing.lg};
    color: #F0EDE8;
    letter-spacing: 0.12em;
    font-weight: 300;
    font-family: var(--font-cormorant), serif;
    text-transform: uppercase;
  }

  p {
    font-size: clamp(${theme.typography.fontSize.base}, 1.8vw, ${theme.typography.fontSize.lg});
    color: rgba(240, 237, 232, 0.6);
    max-width: min(700px, 90%);
    margin: 0 auto;
    line-height: 1.7;
    font-weight: 300;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: clamp(3rem, 5vw, 5rem) 1.5rem clamp(2rem, 4vw, 3rem);
  }
`;

const Divider = styled.div`
  width: 48px;
  height: 1px;
  background: #C8A87A;
  margin: ${theme.spacing.lg} auto;
  border-radius: 0;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(${theme.spacing['3xl']}, 5vw, ${theme.spacing['4xl']}) clamp(${theme.spacing.lg}, 3vw, ${theme.spacing['2xl']});

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: clamp(${theme.spacing['2xl']}, 4vw, ${theme.spacing['3xl']});

  h2 {
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    color: ${theme.colors.primary.main};
    margin-bottom: ${theme.spacing.md};
    font-weight: 400;
  }

  p {
    color: ${theme.colors.text.secondary};
    font-size: clamp(${theme.typography.fontSize.base}, 1.5vw, ${theme.typography.fontSize.lg});
    max-width: 600px;
    margin: 0 auto;
  }
`;

const Grid = styled.div<{ $columns?: number }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: clamp(0.75rem, 2vw, 1.5rem);
  margin-bottom: clamp(${theme.spacing['3xl']}, 5vw, ${theme.spacing['4xl']});

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  padding: clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 2vw, 2rem);
  background: rgba(255, 255, 255, 0.03);
  border-radius: 0;
  box-shadow: none;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 1px solid rgba(200, 168, 122, 0.15);
  cursor: pointer;
  min-height: 140px;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: none;
    background: rgba(200, 168, 122, 0.06);
    border-color: rgba(200, 168, 122, 0.5);
    box-shadow: none;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    min-height: 130px;
  }
`;

const CardIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  opacity: 0.8;
`;

const CardTitle = styled.h3`
  font-size: clamp(1.2rem, 2.5vw, 1.6rem);
  color: #F0EDE8;
  margin: 0;
  font-weight: 300;
  font-family: var(--font-cormorant), serif;
  text-align: center;
  line-height: 1.3;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const CardDescription = styled.p`
  display: none;
`;

const FeaturedCard = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(1.75rem, 3.5vw, 2.75rem) clamp(1.25rem, 2.5vw, 2.25rem);
  background: rgba(74, 114, 168, 0.07);
  border-radius: 0;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 1px solid rgba(74, 114, 168, 0.28);
  cursor: pointer;
  min-height: 140px;
  grid-column: 1 / -1;

  &:hover {
    background: rgba(74, 114, 168, 0.13);
    border-color: rgba(74, 114, 168, 0.6);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-column: 1 / -1;
    min-height: 130px;
  }
`;

const FeaturedCardInner = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(1rem, 3vw, 2.5rem);
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
`;

const FeaturedCardIcon = styled.div`
  font-size: 2rem;
  opacity: 0.85;
  flex-shrink: 0;
`;

const FeaturedCardText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
`;

const FeaturedCardTitle = styled.h3`
  font-size: clamp(1.35rem, 3vw, 2rem);
  color: #F0EDE8;
  margin: 0;
  font-weight: 300;
  font-family: var(--font-cormorant), serif;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const FeaturedCardDesc = styled.p`
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: clamp(0.72rem, 1.2vw, 0.8rem);
  color: rgba(74, 114, 168, 0.85);
  margin: 0;
  letter-spacing: 0.06em;
  font-weight: 400;
`;

const FeaturedCardTag = styled.span`
  display: inline-block;
  font-family: var(--font-poppins), 'Poppins', sans-serif;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(74, 114, 168, 0.7);
  border: 1px solid rgba(74, 114, 168, 0.3);
  border-radius: 50px;
  padding: 0.2rem 0.75rem;
  margin-bottom: 0.5rem;
`;


export default function HomePage() {
  const { t } = useTranslation();

  const getTranslationKey = (id: string): string => {
    const keyMap: Record<string, string> = {
      wedding: 'home.weddingCouples',
      pets: 'home.petPhotography',
      headshots: 'home.headshots',
      family: 'home.familyMaternity',
      wildlife: 'home.wildlifePhotography',
      art: 'home.art',
      'art-experiences': 'home.artExperiences',
    };
    return keyMap[id] || '';
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      photography: t('nav.photographyServices'),
      art: t('nav.myArt'),
      services: t('nav.creativeServices'),
      other: 'Other',
    };
    return labels[category] || category;
  };

  return (
    <PageContainer>
      <LanguageSwitcherWrapper>
        <LanguageSwitcher isDark />
      </LanguageSwitcherWrapper>

      <Hero>
        <h1>{t('home.title')}</h1>
        <Divider />
        <p>
          {t('home.subtitle')}
        </p>
      </Hero>

      <ContentWrapper>
        <Grid>
          {visibleSections.map((section) => {
            const translationKey = getTranslationKey(section.id);
            const title = translationKey ? t(`${translationKey}.title`) : section.title;
            const description = translationKey ? t(`${translationKey}.description`) : section.description;

            return (
              <Card key={section.id} href={section.href}>
                <CardIcon>{section.icon}</CardIcon>
                <CardTitle>{title}</CardTitle>
              </Card>
            );
          })}
        </Grid>
      </ContentWrapper>
    </PageContainer>
  );
}
