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
  background: linear-gradient(135deg, ${theme.colors.background.main} 0%, ${theme.colors.background.light} 100%);
  position: relative;
`;

const LanguageSwitcherWrapper = styled.div`
  position: fixed;
  top: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  z-index: 100;

  @media (max-width: ${theme.breakpoints.md}) {
    top: ${theme.spacing.md};
    right: ${theme.spacing.md};
  }
`;

const Hero = styled.section`
  padding: clamp(${theme.spacing['3xl']}, 8vw, ${theme.spacing['4xl']}) ${theme.spacing['2xl']};
  text-align: center;
  background: linear-gradient(180deg, rgba(122, 107, 95, 0.08) 0%, transparent 100%);
  border-bottom: none;

  h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    margin-bottom: ${theme.spacing.lg};
    color: ${theme.colors.primary.main};
    letter-spacing: 0.05em;
    font-weight: 300;
  }

  p {
    font-size: clamp(${theme.typography.fontSize.base}, 1.8vw, ${theme.typography.fontSize.lg});
    color: ${theme.colors.text.secondary};
    max-width: min(700px, 90%);
    margin: 0 auto;
    line-height: 1.7;
    font-weight: 300;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  }
`;

const Divider = styled.div`
  width: 60px;
  height: 3px;
  background: ${theme.colors.primary.main};
  margin: ${theme.spacing.lg} auto;
  border-radius: 2px;
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
  gap: ${theme.spacing.xl};
  margin-bottom: clamp(${theme.spacing['3xl']}, 5vw, ${theme.spacing['4xl']});

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: ${theme.spacing.lg};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing.xl};
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(122, 107, 95, 0.06);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 1px solid rgba(122, 107, 95, 0.1);
  cursor: pointer;
  min-height: 180px;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(122, 107, 95, 0.12);
    border-color: ${theme.colors.primary.main};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.lg};
    min-height: 150px;
  }
`;

const CardTitle = styled.h3`
  font-size: clamp(${theme.typography.fontSize.lg}, 2.5vw, ${theme.typography.fontSize.xl});
  color: ${theme.colors.primary.main};
  margin: 0;
  font-weight: 500;
  text-align: center;
  line-height: 1.3;
`;

const CardDescription = styled.p`
  display: none;
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
        <LanguageSwitcher />
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
                <CardTitle>{title}</CardTitle>
              </Card>
            );
          })}
        </Grid>
      </ContentWrapper>
    </PageContainer>
  );
}
