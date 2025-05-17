'use client';

import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import ContactForm from '../../../components/ContactForm';
import ProtectedImage from '../../../components/ProtectedImage';

const PageContainer = styled.div`
  width: 100%;
`;

const Hero = styled.section`
  position: relative;
  height: 90vh;
  min-height: 600px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.1)
  );
  z-index: 1;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: ${theme.colors.text.light};
  padding: ${theme.spacing['2xl']};
  max-width: 800px;

  h1 {
    margin-bottom: ${theme.spacing.lg};
    font-size: clamp(2.5rem, 5vw, 4rem);
  }

  p {
    font-size: clamp(1.1rem, 2vw, 1.5rem);
    line-height: 1.6;
  }
`;

const Section = styled.section<{ $dark?: boolean }>`
  padding: ${theme.spacing['3xl']} ${theme.spacing['2xl']};
  background-color: ${props => 
    props.$dark ? theme.colors.background.dark : theme.colors.background.main};
  color: ${props =>
    props.$dark ? theme.colors.text.light : theme.colors.text.primary};
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  h2 {
    text-align: center;
    font-size: ${theme.typography.fontSize['3xl']};
    margin-bottom: ${theme.spacing['2xl']};
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
`;

const PackageCard = styled.div`
  background: ${theme.colors.background.light};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  transition: ${theme.transitions.default};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.lg};
  }

  h3 {
    font-size: ${theme.typography.fontSize['2xl']};
    color: ${theme.colors.primary.main};
    margin-bottom: ${theme.spacing.md};
  }

  p {
    color: ${theme.colors.text.secondary};
    margin-bottom: ${theme.spacing.lg};
  }

  ul {
    list-style: none;
    padding: 0;
    margin: ${theme.spacing.lg} 0;

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

export default function WildlifePage() {
  return (
    <PageContainer>
      <Hero>
        <HeroOverlay />
        <ProtectedImage
          src="/images/wildlife/hero.jpg"
          alt="Wildlife Photography"
          height="100%"
          quality={90}
          priority
        />
        <HeroContent>
          <h1>Wildlife Photography</h1>
          <p>
            Capturing the untamed beauty of British Columbia's diverse wildlife,
            from coastal marine life to mountain inhabitants. Professional wildlife
            photography services based in Vancouver.
          </p>
        </HeroContent>
      </Hero>

      <Section>
        <ContentWrapper>
          <h2>Services & Expeditions</h2>
          <FeatureGrid>
            <PackageCard>
              <h3>Private Expeditions</h3>
              <p>Customized wildlife photography adventures in BC</p>
              <ul>
                <li>Personalized itinerary</li>
                <li>Expert local guidance</li>
                <li>Location scouting</li>
                <li>Technical support</li>
                <li>Post-processing workshop</li>
              </ul>
              <p>Starting at $2,500/day</p>
            </PackageCard>
            
            <PackageCard>
              <h3>Group Workshops</h3>
              <p>Learn wildlife photography in stunning BC locations</p>
              <ul>
                <li>Small groups (max 6)</li>
                <li>Multiple destinations</li>
                <li>Equipment guidance</li>
                <li>Field techniques</li>
                <li>Conservation education</li>
              </ul>
              <p>Starting at $3,500/week</p>
            </PackageCard>
            
            <PackageCard>
              <h3>Conservation Projects</h3>
              <p>Support local wildlife conservation through photography</p>
              <ul>
                <li>BC NGO collaboration</li>
                <li>Documentary work</li>
                <li>Research support</li>
                <li>Publication rights</li>
                <li>Impact reporting</li>
              </ul>
              <p>Custom pricing</p>
            </PackageCard>
          </FeatureGrid>
        </ContentWrapper>
      </Section>

      <Section $dark>
        <ContentWrapper>
          <ContactForm service="Wildlife Photography" />
        </ContentWrapper>
      </Section>
    </PageContainer>
  );
} 