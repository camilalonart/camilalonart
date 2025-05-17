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

const Hero = styled.div`
  position: relative;
  height: 80vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xl};
  padding: ${theme.spacing['3xl']};
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    height: auto;
    padding: ${theme.spacing.xl};
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${theme.spacing['2xl']};
  
  h1 {
    margin-bottom: ${theme.spacing.xl};
    font-size: clamp(2.5rem, 5vw, 4rem);
    color: ${theme.colors.primary.main};
  }
  
  p {
    font-size: clamp(1.1rem, 2vw, 1.5rem);
    line-height: 1.6;
    color: ${theme.colors.text.secondary};
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ImageCard = styled.div`
  position: relative;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  transition: ${theme.transitions.default};
  
  &:hover {
    transform: scale(1.02);
  }
`;

const Section = styled.section<{ accent?: boolean }>`
  padding: ${theme.spacing['3xl']} ${theme.spacing['2xl']};
  background-color: ${props =>
    props.accent ? theme.colors.background.light : theme.colors.background.main};
`;

const ServiceCard = styled.div`
  padding: ${theme.spacing.xl};
  background-color: ${theme.colors.background.main};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  text-align: center;
  transition: ${theme.transitions.default};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.lg};
  }
  
  h3 {
    color: ${theme.colors.primary.main};
    margin-bottom: ${theme.spacing.md};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing['2xl']};
`;

const TestimonialCard = styled.div`
  padding: ${theme.spacing.xl};
  background-color: ${theme.colors.background.main};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  
  blockquote {
    font-style: italic;
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.text.secondary};
  }
  
  cite {
    color: ${theme.colors.primary.main};
    font-weight: ${theme.typography.fontWeight.medium};
  }
`;

export default function PetsPage() {
  return (
    <PageContainer>
      <Hero>
        <HeroContent>
          <h1>Pet Photography</h1>
          <p>
            Capturing the unique personality and spirit of your beloved companions
            in beautiful, timeless portraits that celebrate the joy they bring to
            your life.
          </p>
        </HeroContent>
        <ProtectedImage
          src="/images/pets/hero.jpg"
          alt="Happy dog portrait"
          height="100%"
          priority
          quality={95}
        />
      </Hero>

      <Section accent>
        <h2>Our Services</h2>
        <Grid>
          <ServiceCard>
            <h3>Studio Portraits</h3>
            <p>
              Professional studio portraits that capture your pet's personality
              in a controlled environment with perfect lighting.
            </p>
            <p>Starting at $200</p>
          </ServiceCard>
          
          <ServiceCard>
            <h3>Outdoor Adventures</h3>
            <p>
              Natural, candid shots of your pet enjoying their favorite outdoor
              activities and locations.
            </p>
            <p>Starting at $250</p>
          </ServiceCard>
          
          <ServiceCard>
            <h3>Family Sessions</h3>
            <p>
              Beautiful portraits featuring both you and your pets, celebrating
              your special bond.
            </p>
            <p>Starting at $300</p>
          </ServiceCard>
        </Grid>
      </Section>

      <Section>
        <h2>Recent Work</h2>
        <ImageGrid>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ImageCard key={i}>
              <ProtectedImage
                src={`/images/pets/gallery-${i}.jpg`}
                alt={`Pet portrait ${i}`}
                height="300px"
              />
            </ImageCard>
          ))}
        </ImageGrid>
      </Section>

      <Section accent>
        <h2>Happy Pet Parents</h2>
        <Grid>
          <TestimonialCard>
            <blockquote>
              "Camilo captured our dog's personality perfectly! The photos are
              absolutely stunning and we'll treasure them forever."
            </blockquote>
            <cite>- Sarah & Max the Golden Retriever</cite>
          </TestimonialCard>
          
          <TestimonialCard>
            <blockquote>
              "We were amazed by how patient and understanding Camilo was with
              our cats. The results are beyond what we could have hoped for!"
            </blockquote>
            <cite>- Michael & Luna the Maine Coon</cite>
          </TestimonialCard>
          
          <TestimonialCard>
            <blockquote>
              "The outdoor session was so much fun, and the photos perfectly
              capture our dog's playful spirit. Highly recommended!"
            </blockquote>
            <cite>- Emma & Bailey the Australian Shepherd</cite>
          </TestimonialCard>
        </Grid>
      </Section>

      <Section>
        <ContactForm service="Pet Photography" />
      </Section>
    </PageContainer>
  );
} 