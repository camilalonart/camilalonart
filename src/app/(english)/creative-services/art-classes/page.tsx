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
    background: linear-gradient(120deg, ${theme.colors.primary.main}, #87600E);
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
  color: ${props => props.$dark ? '#F5F5F5' : theme.colors.text.primary};

  > h2 { color: inherit; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing['2xl']};
`;

const CourseCard = styled.div`
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

  .price {
    font-size: ${theme.typography.fontSize.lg};
    color: ${theme.colors.primary.main};
    margin-top: ${theme.spacing.lg};
    font-weight: ${theme.typography.fontWeight.medium};
  }
`;

const InfoCard = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};

  h3 {
    color: #E5C675;
    margin: ${theme.spacing.md} 0;
  }

  p {
    color: #C8C8C8;
    line-height: 1.6;
  }
`;

export default function ArtClassesPage() {
  const { t } = useTranslation();
  const prices = [599, 499, 399];

  return (
    <PageContainer>
      <Hero>
        <h1>{t('creativeContent.artClasses.title')}</h1>
        <p>{t('creativeContent.artClasses.intro')}</p>
      </Hero>

      <Section>
        <h2>{t('creativeContent.artClasses.coursesTitle')}</h2>
        <Grid>
          {content.artClasses.courses.map((course, courseIndex) => (
            <CourseCard key={courseIndex}>
              <h3>{t(`creativeContent.artClasses.courses.${courseIndex}.title`)}</h3>
              <ul>
                {course.items.map((_, itemIndex) => (
                  <li key={itemIndex}>{t(`creativeContent.artClasses.courses.${courseIndex}.items.${itemIndex}`)}</li>
                ))}
              </ul>
              <p><strong>{t('creativeContent.common.duration')}</strong> {t(`creativeContent.artClasses.courses.${courseIndex}.duration`)}</p>
              <p><strong>{t('creativeContent.common.schedule')}</strong> {t(`creativeContent.artClasses.courses.${courseIndex}.schedule`)}</p>
              <p className="price">${prices[courseIndex]}</p>
            </CourseCard>
          ))}
        </Grid>
      </Section>

      <Section $dark>
        <h2>{t('creativeContent.artClasses.infoTitle')}</h2>
        <Grid>
          {content.artClasses.info.map((_, index) => (
            <InfoCard key={index}>
              <h3>{t(`creativeContent.artClasses.info.${index}.title`)}</h3>
              <p>{t(`creativeContent.artClasses.info.${index}.description`)}</p>
            </InfoCard>
          ))}
        </Grid>
      </Section>

      <Section>
        <ContactForm service="Art Classes" />
      </Section>
    </PageContainer>
  );
} 