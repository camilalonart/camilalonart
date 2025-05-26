'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import ContactForm from '../../../components/ContactForm';
import SecureImage from '../../../components/SecureImage';
import ImageModal from '../../../components/ImageModal';

const PageContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
  background-color: rgb(26, 20, 15);
  color: #2C3E50;
`;

const Hero = styled.section`
  position: relative;
  height: 85vh;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  padding: 0 ${theme.spacing.xl};
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.4) 100%
    );
    z-index: 1;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    justify-content: center;
    padding: 0 ${theme.spacing.md};
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: left;
  color: white;
  max-width: 900px;
  margin-left: ${theme.spacing.xl};

  h1 {
    margin-bottom: ${theme.spacing.sm};
    font-size: clamp(2rem, 2.8vw, 2.8rem);
    font-weight: 500;
    line-height: 1.1;
    letter-spacing: 0.1em;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    font-family: 'Poppins', sans-serif;
  }

  p {
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    line-height: 1.6;
    font-weight: 400;
    max-width: 500px;
    margin: ${theme.spacing.sm} 0;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    text-align: center;
    margin-left: 0;
    
    p {
      margin: ${theme.spacing.sm} auto;
    }
  }
`;

const HeroImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    object-position: center 40% !important;
    transform: scale(1.05);
  }
`;

const Section = styled.section<{ $bgColor?: string }>`
  padding: ${theme.spacing.xl} ${theme.spacing.lg};
  background: ${props => props.$bgColor || 'transparent'};
  position: relative;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 3vw, 2.8rem);
  color: rgb(255, 255, 255);
  text-align: center;
  margin-bottom: ${theme.spacing.sm};
  font-weight: 700;
  position: relative;
  font-family: 'Poppins', sans-serif;
  letter-spacing: 0.2em;

  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: rgb(169, 125, 30);
    margin: ${theme.spacing.sm} auto 0;
  }
`;

const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.xl};
  max-width: 1400px;
  margin: 0 auto;
`;

const PortfolioItem = styled.div`
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  cursor: pointer;
  
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
  padding: ${theme.spacing.xl};
  text-align: center;
  color: ${theme.colors.text.light};
`;

const ServicesSection = styled.div`
  padding: ${theme.spacing.md} 0;
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.xl};
  padding: ${theme.spacing.xl} ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    padding: ${theme.spacing.lg};
  }
`;

const ServiceCard = styled.div`
  background: white;
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.md};
  height: auto;
  min-height: 600px;
  width: 100%;
  transition: all 0.3s ease;
  text-align: center;
  border-radius: 10px;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
`;

const ServiceCardTitle = styled.h3`
  font-size: 1.8rem;
  color: rgb(169, 125, 30);
  margin-bottom: ${theme.spacing.lg};
  font-weight: 600;
`;

const ServiceCardPrice = styled.div`
  font-size: 2.5rem;
  color: rgb(169, 125, 30);
  margin: ${theme.spacing.xl} 0;
  font-weight: 700;
`;

const ServiceCardFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${theme.spacing.xl} 0;
  text-align: left;
  
  li {
    padding: ${theme.spacing.sm} 0;
    display: flex;
    align-items: center;
    gap: ${theme.spacing.md};
    font-size: 1.1rem;
    
    &::before {
      content: '✓';
      color: rgb(169, 125, 30);
      font-weight: bold;
    }
  }
`;

const BookNowButton = styled.button`
  background: rgb(176, 126, 18);
  color: white;
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: ${theme.spacing.lg};
  border-radius: 10px;
  width: 100%;
  
  &:hover {
    transform: translateY(-3px);
    background: rgb(231, 189, 99);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const FAQSection = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};
`;

const FAQItem = styled.div`
  margin-bottom: ${theme.spacing.xl};
  
  h3 {
    color: white;
    font-size: 1.3rem;
    margin-bottom: ${theme.spacing.sm};
  }
  
  p {
    color: #ccc;
    line-height: 1.6;
  }
`;

export default function HeadshotsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');

  const handleBookNow = (packageName: string) => {
    setSelectedPackage(packageName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPackage('');
  };

  return (
    <PageContainer>
      <Hero>
        <HeroImageContainer>
          <SecureImage
            src="/images/headshots/hero-1.jpg"
            alt="Professional headshots"
            priority
            quality={90}
          />
        </HeroImageContainer>
        <HeroContent>
          <h1>Professional Headshots</h1>
          <p>
            Elevate your professional presence with meticulously crafted headshots
            that embody confidence, authenticity, and sophistication.
          </p>
        </HeroContent>
      </Hero>

      <Section>
        <SectionTitle>Portfolio</SectionTitle>
        <PortfolioGrid>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <PortfolioItem key={i}>
              <SecureImage
                src={`/images/headshots/portfolio-${i}.jpg`}
                alt={`Professional headshot example ${i}`}
                quality={90}
              />
              <PortfolioOverlay>
                <p>Professional Headshot</p>
              </PortfolioOverlay>
            </PortfolioItem>
          ))}
        </PortfolioGrid>
      </Section>

      <Section $bgColor="rgb(26, 20, 15)">
        <SectionTitle>Packages</SectionTitle>
        <ServicesSection>
          <ServiceCard>
            <ServiceCardTitle>Plain Background</ServiceCardTitle>
            <ServiceCardPrice>$299</ServiceCardPrice>
            <ServiceCardFeatures>
              <li>30-minute session</li>
              <li>5 final edited images</li>
              <li>Plain white/neutral background</li>
              <li>Professional retouching</li>
              <li>Digital delivery</li>
              <li>Print release</li>
            </ServiceCardFeatures>
            <BookNowButton onClick={() => handleBookNow('Plain Background')}>
              Book Now
            </BookNowButton>
          </ServiceCard>

          <ServiceCard>
            <ServiceCardTitle>Creative Background</ServiceCardTitle>
            <ServiceCardPrice>$249</ServiceCardPrice>
            <ServiceCardFeatures>
              <li>30-minute session</li>
              <li>5 final edited images</li>
              <li>Creative background options</li>
              <li>Professional retouching</li>
              <li>Digital delivery</li>
              <li>Print release</li>
            </ServiceCardFeatures>
            <BookNowButton onClick={() => handleBookNow('Creative Background')}>
              Book Now
            </BookNowButton>
          </ServiceCard>
        </ServicesSection>
      </Section>

      <Section>
        <SectionTitle>Frequently Asked Questions</SectionTitle>
        <FAQSection>
          <FAQItem>
            <h3>How long does a session take?</h3>
            <p>Each session takes approximately 30 minutes, including setup and brief consultation.</p>
          </FAQItem>
          <FAQItem>
            <h3>What should I wear?</h3>
            <p>We recommend solid colors that complement your skin tone. Avoid busy patterns and logos. Bring 2-3 outfit options for variety.</p>
          </FAQItem>
          <FAQItem>
            <h3>When will I receive my photos?</h3>
            <p>You'll receive your edited photos within 5-7 business days after your session.</p>
          </FAQItem>
          <FAQItem>
            <h3>Can I use these photos for my business?</h3>
            <p>Yes! All packages include a print release, allowing you to use the photos for both personal and professional purposes.</p>
          </FAQItem>
        </FAQSection>
      </Section>

      <Section $bgColor="rgb(26, 20, 15)">
        <SectionTitle>Contact Us</SectionTitle>
        <ContactForm />
      </Section>

      {isModalOpen && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={`Book ${selectedPackage} Package`}
        >
          <ContactForm />
        </ImageModal>
      )}
    </PageContainer>
  );
} 