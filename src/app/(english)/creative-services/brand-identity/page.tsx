'use client';

import React from 'react';
import styled from 'styled-components';
import { theme } from "@/styles/theme";
import ProtectedImage from "@/components/ProtectedImage";
import ContactForm from "@/components/ContactForm";
import { useTranslation } from '@/i18n/TranslationContext';
import content from '@/i18n/locales/creative-content.en.json';

const PageContainer = styled.div`
  width: 100%;
`;

const Hero = styled.div`
  position: relative;
  height: 70vh;
  width: 100%;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.7) 100%
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
    font-size: clamp(2.5rem, 6vw, 4rem);
    margin-bottom: ${theme.spacing.xl};
  }
  
  p {
    font-size: clamp(1.1rem, 2.5vw, 1.5rem);
    max-width: 700px;
    line-height: 1.6;
  }
`;

const Section = styled.section`
  padding: ${theme.spacing['3xl']} ${theme.spacing['2xl']};
`;

const CaseStudy = styled.div`
  max-width: 1200px;
  margin: 0 auto ${theme.spacing['4xl']};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const CaseStudyHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing['2xl']};
  
  h2 {
    font-size: ${theme.typography.fontSize['3xl']};
    color: ${theme.colors.primary.main};
    margin-bottom: ${theme.spacing.lg};
  }
  
  p {
    font-size: ${theme.typography.fontSize.lg};
    color: ${theme.colors.text.secondary};
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.8;
  }
`;

const BrandGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing['2xl']};
  
  @media (max-width: ${theme.breakpoints.lg}) {
    gap: ${theme.spacing.lg};
  }
`;

const BrandImage = styled.div<{ span: number }>`
  grid-column: span ${props => props.span};
  position: relative;
  aspect-ratio: 16/9;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-column: span 12;
  }
`;

const BrandDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing['2xl']};
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const DetailCard = styled.div`
  background: ${theme.colors.background.light};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  
  h3 {
    font-size: ${theme.typography.fontSize.xl};
    color: ${theme.colors.primary.main};
    margin-bottom: ${theme.spacing.md};
  }
  
  p {
    color: ${theme.colors.text.secondary};
    line-height: 1.6;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing['2xl']};
`;

const ServiceCard = styled.div`
  padding: ${theme.spacing.xl};
  background-color: ${theme.colors.background.light};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  transition: ${theme.transitions.default};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.lg};
  }

  h3 {
    color: ${theme.colors.primary.main};
    margin-bottom: ${theme.spacing.md};
  }

  ul {
    list-style: none;
    padding: 0;
    margin: ${theme.spacing.md} 0;
    
    li {
      padding: ${theme.spacing.xs} 0;
      display: flex;
      align-items: center;
      gap: ${theme.spacing.sm};
      
      &::before {
        content: '•';
        color: ${theme.colors.primary.main};
      }
    }
  }
`;

const ProcessStep = styled.div`
  padding: ${theme.spacing.xl};
  background-color: ${theme.colors.background.light};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};

  h3 {
    color: ${theme.colors.primary.main};
    margin-bottom: ${theme.spacing.md};
  }

  p {
    color: ${theme.colors.text.secondary};
    line-height: 1.6;
  }
`;

const caseStudies = [
  {
    id: 1,
    images: [
      { src: "/images/creative/brand-identity/eco-fashion-1.jpg", span: 8 },
      { src: "/images/creative/brand-identity/eco-fashion-2.jpg", span: 4 },
      { src: "/images/creative/brand-identity/eco-fashion-3.jpg", span: 6 },
      { src: "/images/creative/brand-identity/eco-fashion-4.jpg", span: 6 }
    ]
  },
  {
    id: 2,
    images: [
      { src: "/images/creative/brand-identity/tech-startup-1.jpg", span: 6 },
      { src: "/images/creative/brand-identity/tech-startup-2.jpg", span: 6 },
      { src: "/images/creative/brand-identity/tech-startup-3.jpg", span: 12 }
    ]
  }
];

export default function BrandIdentityPage() {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <Hero>
        <ProtectedImage
          src="/images/creative/brand-identity/hero.jpg"
          alt={t('creativeContent.brandIdentity.title')}
          height="100%"
          priority
          quality={95}
        />
        <HeroContent>
          <h1>{t('creativeContent.brandIdentity.title')}</h1>
          <p>{t('creativeContent.brandIdentity.intro')}</p>
        </HeroContent>
      </Hero>

      <Section>
        {caseStudies.map((study, studyIndex) => (
          <CaseStudy key={study.id}>
            <CaseStudyHeader>
              <h2>{t(`creativeContent.brandIdentity.caseStudies.${studyIndex}.title`)}</h2>
              <p>{t(`creativeContent.brandIdentity.caseStudies.${studyIndex}.description`)}</p>
            </CaseStudyHeader>

            <BrandGrid>
              {study.images.map((image, index) => (
                <BrandImage key={index} span={image.span}>
                  <ProtectedImage
                    src={image.src}
                    alt={`${t(`creativeContent.brandIdentity.caseStudies.${studyIndex}.title`)} - ${t('creativeContent.common.image')} ${index + 1}`}
                    height="100%"
                    quality={90}
                  />
                </BrandImage>
              ))}
            </BrandGrid>

            <BrandDetails>
              {content.brandIdentity.caseStudies[studyIndex].details.map((_, index) => (
                <DetailCard key={index}>
                  <h3>{t(`creativeContent.brandIdentity.caseStudies.${studyIndex}.details.${index}.title`)}</h3>
                  <p>{t(`creativeContent.brandIdentity.caseStudies.${studyIndex}.details.${index}.description`)}</p>
                </DetailCard>
              ))}
            </BrandDetails>
          </CaseStudy>
        ))}
      </Section>

      <Section>
        <h2>{t('creativeContent.common.services')}</h2>
        <Grid>
          {content.brandIdentity.services.map((service, serviceIndex) => (
            <ServiceCard key={serviceIndex}>
              <h3>{t(`creativeContent.brandIdentity.services.${serviceIndex}.title`)}</h3>
              <ul>
                {service.items.map((_, itemIndex) => (
                  <li key={itemIndex}>{t(`creativeContent.brandIdentity.services.${serviceIndex}.items.${itemIndex}`)}</li>
                ))}
              </ul>
            </ServiceCard>
          ))}
        </Grid>
      </Section>

      <Section>
        <h2>{t('creativeContent.brandIdentity.processTitle')}</h2>
        <Grid>
          {content.brandIdentity.process.map((_, index) => (
            <ProcessStep key={index}>
              <h3>{t(`creativeContent.brandIdentity.process.${index}.title`)}</h3>
              <p>{t(`creativeContent.brandIdentity.process.${index}.description`)}</p>
            </ProcessStep>
          ))}
        </Grid>
      </Section>

      <Section>
        <ContactForm service="Brand Identity" />
      </Section>
    </PageContainer>
  );
} 