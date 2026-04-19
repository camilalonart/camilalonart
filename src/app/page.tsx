'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { theme } from '../styles/theme';
import { useTranslation } from '../i18n/TranslationContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { visibleSections, hiddenSections } from '../config/sections';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${theme.colors.background.main} 0%, ${theme.colors.background.light} 100%);
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
  background: linear-gradient(180deg, rgba(122, 107, 95, 0.1) 0%, transparent 100%);
  border-bottom: 1px solid rgba(122, 107, 95, 0.1);

  h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.primary.main};
    letter-spacing: 0.05em;
    font-weight: 300;
  }

  p {
    font-size: clamp(${theme.typography.fontSize.lg}, 2vw, ${theme.typography.fontSize.xl});
    color: ${theme.colors.text.secondary};
    max-width: min(700px, 90%);
    margin: 0 auto;
    line-height: 1.8;
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
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.lg};
    border-color: ${theme.colors.primary.main};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.lg};
  }
`;

const DisabledCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing.xl};
  background: white;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  cursor: default;
  opacity: 0.7;
  pointer-events: none;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.lg};
  }
`;

const CardIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${theme.spacing.md};
  line-height: 1;
`;

const CardTitle = styled.h3`
  font-size: clamp(${theme.typography.fontSize.lg}, 2vw, ${theme.typography.fontSize.xl});
  color: ${theme.colors.primary.main};
  margin-bottom: ${theme.spacing.sm};
  font-weight: 500;
`;

const CardDescription = styled.p`
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
  margin: 0;
  flex-grow: 1;
`;

const TagSection = styled.div`
  margin-top: ${theme.spacing.lg};
  padding-top: ${theme.spacing.md};
  border-top: 1px solid rgba(122, 107, 95, 0.1);
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
`;

const Tag = styled.span`
  display: inline-block;
  font-size: 0.75rem;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background: ${theme.colors.primary.light};
  color: ${theme.colors.primary.main};
  border-radius: ${theme.borderRadius.sm};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
`;

const HiddenNote = styled.div`
  padding: ${theme.spacing.lg};
  background: linear-gradient(135deg, rgba(212, 166, 130, 0.1) 0%, rgba(212, 166, 130, 0.05) 100%);
  border-left: 4px solid ${theme.colors.primary.main};
  border-radius: ${theme.borderRadius.md};
  margin-top: ${theme.spacing.lg};

  p {
    margin: 0;
    color: ${theme.colors.text.secondary};
    font-size: ${theme.typography.fontSize.sm};
    line-height: 1.6;
  }

  strong {
    color: ${theme.colors.primary.main};
  }
`;

export default function HomePage() {
  const { t } = useTranslation();

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      photography: 'Photography',
      art: 'Art',
      services: 'Services',
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
        <h1>Camila Londoño</h1>
        <Divider />
        <p>
          Photographer, Artist & Creative Director. Capturing moments, creating beauty, and telling visual stories across photography, traditional art, and design.
        </p>
      </Hero>

      <ContentWrapper>
        {/* Visible Sections */}
        <SectionHeader>
          <h2>Explore My Work</h2>
          <Divider style={{ margin: `${theme.spacing.md} auto ${theme.spacing.lg}` }} />
          <p>Featured projects and services currently available</p>
        </SectionHeader>

        <Grid>
          {visibleSections.map((section) => (
            <Card key={section.id} href={section.href}>
              <CardIcon>{section.icon}</CardIcon>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
              <TagSection>
                <Tag>{getCategoryLabel(section.category)}</Tag>
              </TagSection>
            </Card>
          ))}
        </Grid>

        {/* Hidden Sections */}
        {hiddenSections.length > 0 && (
          <>
            <SectionHeader>
              <h2>Coming Soon</h2>
              <Divider style={{ margin: `${theme.spacing.md} auto ${theme.spacing.lg}` }} />
              <p>Upcoming projects and services in development</p>
            </SectionHeader>

            <Grid>
              {hiddenSections.map((section) => (
                <DisabledCard key={section.id}>
                  <CardIcon>{section.icon}</CardIcon>
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                  <TagSection>
                    <Tag style={{ opacity: 0.6 }}>Coming Soon</Tag>
                  </TagSection>
                </DisabledCard>
              ))}
            </Grid>

            <HiddenNote>
              <p>
                <strong>💡 Note:</strong> These sections are being developed and will be publicly available soon.
                Check back later for updates!
              </p>
            </HiddenNote>
          </>
        )}
      </ContentWrapper>
    </PageContainer>
  );
}
