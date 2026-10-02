'use client';

import React from 'react';
import styled from 'styled-components';
import { theme } from "@/styles/theme";
import ContactForm from "@/components/ContactForm";
import { useTranslation } from '@/i18n/TranslationContext';
import content from '@/i18n/locales/creative-content.en.json';

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};
`;

const Hero = styled.section`
  text-align: center;
  margin-bottom: ${theme.spacing['3xl']};
  
  h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    margin-bottom: ${theme.spacing.lg};
    background: linear-gradient(120deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  p {
    font-size: ${theme.typography.fontSize.xl};
    color: ${theme.colors.text.secondary};
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const Section = styled.section<{ $dark?: boolean }>`
  padding: ${theme.spacing['3xl']} 0;
  background-color: ${props => 
    props.$dark ? theme.colors.background.dark : theme.colors.background.main};
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

const BenefitCard = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};

  h3 {
    color: ${theme.colors.primary.main};
    margin: ${theme.spacing.md} 0;
  }

  p {
    color: ${theme.colors.text.secondary};
    line-height: 1.6;
  }
`;

export default function GraphicRecordingPage() {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <Hero>
        <h1>{t('creativeContent.graphicRecording.title')}</h1>
        <p>{t('creativeContent.graphicRecording.intro')}</p>
      </Hero>

      <Section>
        <h2>{t('creativeContent.common.services')}</h2>
        <Grid>
          {content.graphicRecording.services.map((service, serviceIndex) => (
            <ServiceCard key={serviceIndex}>
              <h3>{t(`creativeContent.graphicRecording.services.${serviceIndex}.title`)}</h3>
              <ul>
                {service.items.map((_, itemIndex) => (
                  <li key={itemIndex}>{t(`creativeContent.graphicRecording.services.${serviceIndex}.items.${itemIndex}`)}</li>
                ))}
              </ul>
            </ServiceCard>
          ))}
        </Grid>
      </Section>

      <Section $dark>
        <h2>{t('creativeContent.graphicRecording.benefitsTitle')}</h2>
        <Grid>
          {content.graphicRecording.benefits.map((_, index) => (
            <BenefitCard key={index}>
              <h3>{t(`creativeContent.graphicRecording.benefits.${index}.title`)}</h3>
              <p>{t(`creativeContent.graphicRecording.benefits.${index}.description`)}</p>
            </BenefitCard>
          ))}
        </Grid>
      </Section>

      <Section>
        <ContactForm service="Graphic Recording" />
      </Section>
    </PageContainer>
  );
} 