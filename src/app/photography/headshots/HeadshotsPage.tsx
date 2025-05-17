'use client';

import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import ContactForm from '../../../components/ContactForm';
import SecureImage from '../../../components/SecureImage';

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  letter-spacing: 0.02em;
`;

const Hero = styled.div`
  position: relative;
  min-height: 85vh;
  display: flex;
  align-items: center;
  background-color: ${theme.colors.background.dark};
  color: ${theme.colors.text.light};
  overflow: hidden;
  margin: ${theme.spacing['2xl']} ${theme.spacing['2xl']} ${theme.spacing['4xl']};
  
  @media (max-width: ${theme.breakpoints.md}) {
    min-height: auto;
    margin: ${theme.spacing.xl};
  }
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['4xl']};
  padding: ${theme.spacing['4xl']};
  width: 100%;
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing['2xl']};
    padding: ${theme.spacing.xl};
  }
`;

const HeroContent = styled.div`
  max-width: 600px;
  
  h1 {
    margin-bottom: ${theme.spacing['2xl']};
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    line-height: 1.1;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    font-weight: 300;

    strong {
      display: block;
      font-weight: 500;
    }
  }
  
  p {
    font-size: clamp(1.1rem, 2vw, 1.5rem);
    line-height: 1.8;
    opacity: 0.9;
    font-weight: 300;
    letter-spacing: 0.02em;
  }
`;

const HeroImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const StyledSecureImage = styled(SecureImage)`
  object-fit: cover;
`;

const Section = styled.section<{ dark?: boolean }>`
  padding: clamp(${theme.spacing['2xl']}, 5vw, ${theme.spacing['4xl']}) clamp(${theme.spacing.xl}, 3vw, ${theme.spacing['3xl']});
  background-color: ${props =>
    props.dark ? theme.colors.background.dark : theme.colors.background.main};
  color: ${props =>
    props.dark ? theme.colors.text.light : theme.colors.text.primary};

  h2 {
    font-size: clamp(2rem, 4vw, 2.5rem);
    font-weight: 300;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: clamp(${theme.spacing['2xl']}, 4vw, ${theme.spacing['3xl']});
    text-align: center;

    &::after {
      content: '';
      display: block;
      width: 60px;
      height: 2px;
      background-color: ${theme.colors.primary.main};
      margin: ${theme.spacing.lg} auto 0;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(350px, 100%), 1fr));
  gap: clamp(${theme.spacing.xl}, 3vw, ${theme.spacing['2xl']});
  margin-top: ${theme.spacing['3xl']};
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
  }
`;

const ServiceCard = styled.div`
  padding: clamp(${theme.spacing.xl}, 3vw, ${theme.spacing['2xl']});
  background-color: ${theme.colors.background.light};
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
  
  h3 {
    color: ${theme.colors.primary.main};
    margin-bottom: ${theme.spacing.lg};
    font-size: clamp(1.25rem, 2vw, 1.5rem);
    font-weight: 400;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: ${theme.spacing.lg} 0;
    
    li {
      padding: ${theme.spacing.sm} 0;
      display: flex;
      align-items: center;
      gap: ${theme.spacing.md};
      font-weight: 300;
      letter-spacing: 0.02em;
      font-size: clamp(${theme.typography.fontSize.base}, 1.5vw, ${theme.typography.fontSize.lg});
      
      &::before {
        content: '—';
        color: ${theme.colors.primary.main};
      }
    }
  }

  p.price {
    font-size: clamp(1.5rem, 2.5vw, 1.8rem);
    margin-top: ${theme.spacing['2xl']};
    color: ${theme.colors.primary.main};
    font-weight: 300;
    letter-spacing: 0.05em;
  }
`;

const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: clamp(${theme.spacing.md}, 2vw, ${theme.spacing.lg});
  padding: 0 clamp(${theme.spacing.xl}, 3vw, ${theme.spacing['2xl']});
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const PortfolioItem = styled.div`
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  
  &:hover {
    .overlay {
      opacity: 1;
    }
  }
`;

const PortfolioOverlay = styled.div.attrs({ className: 'overlay' })`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;
  padding: ${theme.spacing['2xl']};
  text-align: center;
  color: ${theme.colors.text.light};

  p {
    font-weight: 300;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
`;

export default function HeadshotsPage() {
  return (
    <PageContainer>
      <Hero>
        <HeroGrid>
          <HeroContent>
            <h1>
              <strong>Professional</strong>
              Headshots
            </h1>
            <p>
              Elevate your professional presence with meticulously crafted headshots
              that embody confidence, authenticity, and sophistication. Perfect for
              executives, entrepreneurs, and industry leaders.
            </p>
          </HeroContent>
          <HeroImageGrid>
            {[1, 2, 3, 4].map((i) => (
              <StyledSecureImage
                key={i}
                src={`/images/headshots/hero-${i}.jpg`}
                alt={`Professional headshot example ${i}`}
                priority={i <= 2}
                quality={90}
              />
            ))}
          </HeroImageGrid>
        </HeroGrid>
      </Hero>

      <Section>
        <h2>Signature Services</h2>
        <Grid>
          <ServiceCard>
            <h3>Executive Profile</h3>
            <p>Refined imagery for the modern professional</p>
            <ul>
              <li>45-minute curated session</li>
              <li>3 masterfully retouched photos</li>
              <li>Premium lighting arrangement</li>
              <li>48-hour delivery</li>
            </ul>
            <p className="price">$275</p>
          </ServiceCard>
          
          <ServiceCard>
            <h3>Personal Brand Atelier</h3>
            <p>Comprehensive personal brand development</p>
            <ul>
              <li>90-minute exclusive session</li>
              <li>7 artistically retouched photos</li>
              <li>Multiple wardrobe styling</li>
              <li>Diverse environmental settings</li>
              <li>Personal brand consultation</li>
            </ul>
            <p className="price">$495</p>
          </ServiceCard>
          
          <ServiceCard>
            <h3>Corporate Collection</h3>
            <p>Tailored for teams and organizations</p>
            <ul>
              <li>Half or full-day sessions</li>
              <li>Consistent team imagery</li>
              <li>Individual retouching</li>
              <li>Brand alignment consultation</li>
              <li>Digital asset management</li>
            </ul>
            <p className="price">Starting at $1,200</p>
          </ServiceCard>
        </Grid>
      </Section>

      <Section dark>
        <h2>Portfolio</h2>
        <PortfolioGrid>
          {Array.from({ length: 6 }).map((_, i) => (
            <PortfolioItem key={i}>
              <StyledSecureImage
                src={`/images/headshots/portfolio-${i + 1}.jpg`}
                alt={`Portfolio headshot ${i + 1}`}
                priority={i < 3}
                quality={90}
              />
              <PortfolioOverlay>
                <p>View Project</p>
              </PortfolioOverlay>
            </PortfolioItem>
          ))}
        </PortfolioGrid>
      </Section>

      <Section>
        <h2>Book Your Session</h2>
        <ContactForm service="Professional Headshots" />
      </Section>
    </PageContainer>
  );
} 