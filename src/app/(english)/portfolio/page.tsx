'use client';

import React from 'react';
import styled from 'styled-components';
import Link from '@/i18n/LocalizedLink';
import { theme } from "@/styles/theme";
import ProtectedImage from "@/components/ProtectedImage";
import { useTranslation } from '@/i18n/TranslationContext';

const PageContainer = styled.div`
  width: 100%;
`;

const Hero = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.6) 100%
    );
  }
`;

const HeroContent = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${theme.colors.text.light};
  text-align: center;
  padding: ${theme.spacing['2xl']};
  
  h1 {
    font-size: clamp(3rem, 8vw, 5rem);
    margin-bottom: ${theme.spacing.xl};
  }
  
  p {
    font-size: clamp(1.2rem, 3vw, 1.8rem);
    max-width: 800px;
    line-height: 1.6;
  }
`;

const PortfolioSection = styled.section<{ reverse?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
  
  ${props => props.reverse && `
    direction: rtl;
    
    > * {
      direction: ltr;
    }
    
    @media (max-width: ${theme.breakpoints.lg}) {
      direction: ltr;
    }
  `}
`;

const ImageContainer = styled.div`
  position: relative;
  height: 100%;
  min-height: 100vh;
  
  @media (max-width: ${theme.breakpoints.lg}) {
    min-height: 50vh;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${theme.spacing['3xl']};
  background: ${theme.colors.background.main};
  
  h2 {
    font-size: ${theme.typography.fontSize['3xl']};
    margin-bottom: ${theme.spacing.xl};
    color: ${theme.colors.primary.main};
  }
  
  p {
    font-size: ${theme.typography.fontSize.lg};
    line-height: 1.8;
    color: ${theme.colors.text.secondary};
    margin-bottom: ${theme.spacing['2xl']};
  }
`;

const ViewMoreLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.primary.main};
  text-decoration: none;
  padding: ${theme.spacing.sm} 0;
  border-bottom: 2px solid ${theme.colors.primary.main};
  transition: ${theme.transitions.default};
  
  &:hover {
    color: ${theme.colors.primary.dark};
    border-color: ${theme.colors.primary.dark};
  }
`;

const portfolioSections = [
  {
    id: 'wedding',
    image: '/images/portfolio/wedding-hero.jpg',
    link: '/photography/wedding-couples'
  },
  {
    id: 'wildlife',
    image: '/images/portfolio/wildlife-hero.jpg',
    link: '/my-art/wildlife-photography'
  },
  {
    id: 'pets',
    image: '/images/portfolio/pets-hero.jpg',
    link: '/photography/pets'
  },
  {
    id: 'headshots',
    image: '/images/portfolio/headshots-hero.jpg',
    link: '/photography/headshots'
  },
  {
    id: 'creative',
    image: '/images/portfolio/creative-hero.jpg',
    link: '/creative-services'
  }
];

export default function PortfolioPage() {
  const { t } = useTranslation();
  return (
    <PageContainer>
      <Hero>
        <ProtectedImage
          src="/images/portfolio/main-hero.jpg"
          alt={t('creativeContent.portfolio.heroAlt')}
          height="100vh"
          priority
          quality={95}
        />
        <HeroContent>
          <h1>{t('creativeContent.portfolio.title')}</h1>
          <p>{t('creativeContent.portfolio.intro')}</p>
        </HeroContent>
      </Hero>

      {portfolioSections.map((section, index) => (
        <PortfolioSection key={section.id} reverse={index % 2 === 1}>
          <ImageContainer>
            <ProtectedImage
              src={section.image}
              alt={t(`creativeContent.portfolio.sections.${index}.title`)}
              height="100%"
              quality={90}
            />
          </ImageContainer>
          <Content>
            <h2>{t(`creativeContent.portfolio.sections.${index}.title`)}</h2>
            <p>{t(`creativeContent.portfolio.sections.${index}.description`)}</p>
            <ViewMoreLink href={section.link}>
              {t('creativeContent.portfolio.viewGallery')}
            </ViewMoreLink>
          </Content>
        </PortfolioSection>
      ))}
    </PageContainer>
  );
} 