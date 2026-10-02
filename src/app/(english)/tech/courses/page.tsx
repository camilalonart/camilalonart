'use client';

import React from 'react';
import styled from 'styled-components';
import { theme } from "@/styles/theme";
import ContactForm from "@/components/ContactForm";
import { useTranslation } from '@/i18n/TranslationContext';
import content from '@/i18n/locales/creative-content.en.json';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing['2xl']};
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: ${theme.spacing['3xl']};

  h1 {
    font-size: ${theme.typography.fontSize['4xl']};
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

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(350px, 100%), 1fr));
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing['3xl']};
`;

const CourseCard = styled.div`
  background: ${theme.colors.background.light};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  transition: ${theme.transitions.default};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const CourseContent = styled.div`
  padding: ${theme.spacing.xl};

  h3 {
    font-size: ${theme.typography.fontSize['2xl']};
    color: ${theme.colors.primary.main};
    margin-bottom: ${theme.spacing.md};
  }

  p {
    color: ${theme.colors.text.secondary};
    margin-bottom: ${theme.spacing.lg};
    line-height: 1.6;
  }
`;

const CourseDetails = styled.div`
  margin: ${theme.spacing.lg} 0;
  padding: ${theme.spacing.lg};
  background: ${theme.colors.background.main};
  border-radius: ${theme.borderRadius.md};

  h4 {
    color: ${theme.colors.primary.main};
    margin-bottom: ${theme.spacing.md};
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: ${theme.spacing.xs} 0;
      padding-left: ${theme.spacing.md};
      position: relative;

      &::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: ${theme.colors.accent.success};
      }
    }
  }
`;

const PriceTag = styled.div`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary.main};
  margin: ${theme.spacing.lg} 0;
`;

const RegisterButton = styled.button`
  width: 100%;
  padding: ${theme.spacing.md};
  background: ${theme.colors.primary.main};
  color: ${theme.colors.text.light};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${theme.transitions.default};

  &:hover {
    background: ${theme.colors.primary.dark};
  }
`;

export default function TechCoursesPage() {
  const { t } = useTranslation();
  const prices = [999, 799, 1499];

  return (
    <PageContainer>
      <Header>
        <h1>{t('creativeContent.techCourses.title')}</h1>
        <p>{t('creativeContent.techCourses.intro')}</p>
      </Header>

      <CourseGrid>
        {content.techCourses.courses.map((course, courseIndex) => (
          <CourseCard key={courseIndex}>
            <CourseContent>
              <h3>{t(`creativeContent.techCourses.courses.${courseIndex}.title`)}</h3>
              <p>{t(`creativeContent.techCourses.courses.${courseIndex}.description`)}</p>
              <CourseDetails>
                <h4>{t('creativeContent.techCourses.detailsTitle')}</h4>
                <ul>
                  <li>{t('creativeContent.common.duration')} {t(`creativeContent.techCourses.courses.${courseIndex}.duration`)}</li>
                  <li>{t('creativeContent.common.schedule')} {t(`creativeContent.techCourses.courses.${courseIndex}.schedule`)}</li>
                </ul>
                <h4>{t('creativeContent.techCourses.learnTitle')}</h4>
                <ul>
                  {course.topics.map((_, topicIndex) => (
                    <li key={topicIndex}>{t(`creativeContent.techCourses.courses.${courseIndex}.topics.${topicIndex}`)}</li>
                  ))}
                </ul>
              </CourseDetails>
              <PriceTag>${prices[courseIndex]}</PriceTag>
              <RegisterButton>{t('creativeContent.techCourses.register')}</RegisterButton>
            </CourseContent>
          </CourseCard>
        ))}
      </CourseGrid>

      <ContactForm service="Tech Courses" />
    </PageContainer>
  );
} 