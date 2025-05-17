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

  .price {
    font-size: ${theme.typography.fontSize.lg};
    color: ${theme.colors.primary.main};
    margin-top: ${theme.spacing.lg};
    font-weight: ${theme.typography.fontWeight.medium};
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing['2xl']};
`;

const GalleryItem = styled.div<{ $span?: number }>`
  grid-column: span ${props => props.$span || 4};
  position: relative;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-column: span 6;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-column: span 12;
  }
`;

const InfoCard = styled.div`
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

export default function FamilyMaternityPage() {
  const services = [
    {
      title: 'Family Sessions',
      description: 'Capturing genuine moments and connections between family members',
      items: [
        'Indoor or outdoor locations',
        'Multiple family groupings',
        'Natural and posed shots',
        'Digital image delivery',
        'Print options available'
      ],
      price: 399
    },
    {
      title: 'Maternity Sessions',
      description: 'Celebrating the beauty of motherhood with elegant portraits',
      items: [
        'Studio or location shoots',
        'Wardrobe consultation',
        'Partner and family included',
        'Professional retouching',
        'Digital gallery'
      ],
      price: 349
    },
    {
      title: 'Newborn & Baby',
      description: 'Documenting precious early moments with your little one',
      items: [
        'In-home sessions',
        'Safe baby posing',
        'Family portraits included',
        'Props and wraps provided',
        'Birth story option'
      ],
      price: 449
    }
  ];

  const info = [
    {
      title: 'Session Duration',
      description: '1-2 hours of photography time to ensure we capture all the special moments.'
    },
    {
      title: 'Location Options',
      description: 'Studio, outdoor locations in Vancouver, or the comfort of your home.'
    },
    {
      title: 'What to Wear',
      description: 'Styling guide provided to help coordinate outfits for beautiful photos.'
    },
    {
      title: 'Image Delivery',
      description: 'Online gallery within 2 weeks, with easy downloading and sharing options.'
    }
  ];

  return (
    <PageContainer>
      <Hero>
        <ProtectedImage
          src="/images/photography/family-maternity-hero.jpg"
          alt="Family and Maternity Photography"
          height="90vh"
          priority
          quality={95}
        />
        <HeroOverlay />
        <HeroContent>
          <h1>Family & Maternity Photography</h1>
          <p>Capturing life's precious moments and milestones with a natural, authentic approach</p>
        </HeroContent>
      </Hero>

      <Section>
        <h2>Our Services</h2>
        <Grid>
          {services.map((service) => (
            <ServiceCard key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul>
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="price">Starting at ${service.price}</p>
            </ServiceCard>
          ))}
        </Grid>
      </Section>

      <Section $dark>
        <h2>Session Information</h2>
        <Grid>
          {info.map((item) => (
            <InfoCard key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </InfoCard>
          ))}
        </Grid>
      </Section>

      <Section>
        <h2>Recent Work</h2>
        <GalleryGrid>
          {[
            { src: '/images/photography/family-1.jpg', span: 8 },
            { src: '/images/photography/maternity-1.jpg', span: 4 },
            { src: '/images/photography/newborn-1.jpg', span: 4 },
            { src: '/images/photography/family-2.jpg', span: 8 },
            { src: '/images/photography/maternity-2.jpg', span: 6 },
            { src: '/images/photography/newborn-2.jpg', span: 6 }
          ].map((item, index) => (
            <GalleryItem key={index} $span={item.span}>
              <ProtectedImage
                src={item.src}
                alt={`Family and Maternity gallery image ${index + 1}`}
                height="400px"
                quality={90}
              />
            </GalleryItem>
          ))}
        </GalleryGrid>
      </Section>

      <Section>
        <h2>Request a Quote</h2>
        <ContactForm service="Family & Maternity Photography" />
      </Section>
    </PageContainer>
  );
} 