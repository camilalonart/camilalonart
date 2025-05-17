'use client';

import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import ContactForm from '../../../components/ContactForm';
import ProtectedImage from '../../../components/ProtectedImage';

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
  margin: ${theme.spacing['2xl']} 0;
`;

const ServiceFeature = styled.div`
  padding: ${theme.spacing.xl};
  background-color: ${theme.colors.background.light};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  transition: ${theme.transitions.default};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const PriceCard = styled.div`
  padding: ${theme.spacing.xl};
  background-color: ${theme.colors.background.light};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  text-align: center;
  transition: ${theme.transitions.default};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.lg};
  }

  ul {
    list-style: none;
    padding: 0;
    margin: ${theme.spacing.lg} 0;
    text-align: left;

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

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const GalleryItem = styled.div<{ $span?: number }>`
  grid-column: span ${props => props.$span || 4};
  aspect-ratio: 16/9;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-column: span ${props => Math.min(props.$span || 4, 6)};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-column: span 3;
  }
`;

export default function WeddingCouplesPage() {
  return (
    <PageContainer>
      <Hero>
        <ProtectedImage
          src="/images/wedding-hero.jpg"
          alt="Happy couple on their wedding day"
          height="90vh"
          priority
          quality={95}
        />
        <HeroOverlay />
        <HeroContent>
          <h1>Wedding & Couple Photography</h1>
          <p>Capturing timeless moments of love and connection with an artistic, documentary approach</p>
        </HeroContent>
      </Hero>

      <Section>
        <h2>Our Approach</h2>
        <p>
          We believe in capturing authentic moments that tell your unique love story.
          Our documentary-style approach ensures natural, candid photographs that
          you'll treasure for generations to come.
        </p>
        
        <Grid>
          <ServiceFeature>
            <h3>Wedding Day Coverage</h3>
            <p>
              From getting ready to the last dance, we'll be there to document
              every special moment of your big day.
            </p>
          </ServiceFeature>
          
          <ServiceFeature>
            <h3>Engagement Sessions</h3>
            <p>
              Get comfortable in front of the camera and create beautiful
              memories before your wedding day.
            </p>
          </ServiceFeature>
          
          <ServiceFeature>
            <h3>Elopements</h3>
            <p>
              Intimate ceremonies deserve special attention. We'll help you
              capture the beauty of your private celebration.
            </p>
          </ServiceFeature>
        </Grid>
      </Section>

      <Section $dark>
        <h2>Investment</h2>
        <p>Choose the package that best fits your needs and vision.</p>
        <Grid>
          <PriceCard>
            <h3>Essential</h3>
            <p>Perfect for intimate weddings</p>
            <ul>
              <li>6 hours coverage</li>
              <li>1 photographer</li>
              <li>Online gallery</li>
              <li>100+ edited photos</li>
            </ul>
            <p>Starting at $2,000</p>
          </PriceCard>
          
          <PriceCard>
            <h3>Premium</h3>
            <p>Our most popular package</p>
            <ul>
              <li>8 hours coverage</li>
              <li>2 photographers</li>
              <li>Engagement session</li>
              <li>Online gallery</li>
              <li>300+ edited photos</li>
            </ul>
            <p>Starting at $3,500</p>
          </PriceCard>
          
          <PriceCard>
            <h3>Luxury</h3>
            <p>Complete wedding day coverage</p>
            <ul>
              <li>10 hours coverage</li>
              <li>2 photographers</li>
              <li>Engagement session</li>
              <li>Wedding album</li>
              <li>Online gallery</li>
              <li>500+ edited photos</li>
            </ul>
            <p>Starting at $5,000</p>
          </PriceCard>
        </Grid>
      </Section>

      <Section>
        <h2>Recent Work</h2>
        <GalleryGrid>
          {[
            { src: '/images/wedding/gallery-1.jpg', span: 8 },
            { src: '/images/wedding/gallery-2.jpg', span: 4 },
            { src: '/images/wedding/gallery-3.jpg', span: 4 },
            { src: '/images/wedding/gallery-4.jpg', span: 8 },
            // ... more gallery items
          ].map((item, index) => (
            <GalleryItem key={index} $span={item.span}>
              <ProtectedImage
                src={item.src}
                alt={`Wedding gallery image ${index + 1}`}
                height="400px"
                quality={90}
              />
            </GalleryItem>
          ))}
        </GalleryGrid>
      </Section>

      <Section>
        <h2>Get in Touch</h2>
        <ContactForm service="Wedding & Couple Photography" />
      </Section>
    </PageContainer>
  );
} 