'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import ContactForm from '../../../components/ContactForm';
import ProtectedImage from '../../../components/ProtectedImage';
import BookingModal from '../../../components/BookingModal';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  overflow-x: hidden;
  width: 100%;
  position: relative;

  * {
    max-width: 100vw;
    box-sizing: border-box;
  }
`;

const IntroSection = styled.section`
  padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  
  p {
    font-size: clamp(1.1rem, 1.8vw, 1.4rem);
    line-height: 1.8;
    color: ${theme.colors.text.secondary};
    font-weight: 300;
    letter-spacing: 0.02em;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing.xl};
  }
`;

const Hero = styled.section`
  position: relative;
  height: 90vh;
  min-height: 500px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: ${theme.spacing.md};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    height: 80vh;
    padding: ${theme.spacing.sm};
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

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: ${theme.colors.text.light};
  padding: ${theme.spacing['4xl']};
  max-width: 1000px;
  
  h1 {
    margin-bottom: ${theme.spacing.xl};
    font-size: clamp(2.2rem, 4vw, 3rem);
    font-weight: 300;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    line-height: 1.2;
  }

  p {
    font-size: clamp(0.9rem, 1.4vw, 1.2rem);
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.9);
    max-width: 600px;
    margin-bottom: ${theme.spacing.xl};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xl};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.lg};
  }
`;

const Section = styled.section<{ $dark?: boolean }>`
  padding: ${theme.spacing['3xl']} ${theme.spacing['2xl']};
  background-color: ${props => 
    props.$dark ? '#edede9' : theme.colors.background.main};
  width: 100%;
  box-sizing: border-box;
  
  h2 {
    font-size: clamp(1.4rem, 2.6vw, 2.2rem);
    font-weight: 600;
    margin-bottom: ${theme.spacing['2xl']};
    text-align: center;
    color: #003566;
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing.xl};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.xl} ${theme.spacing.lg};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
  margin: ${theme.spacing['2xl']} auto;
  padding: 0 ${theme.spacing.md};
  width: 100%;
  max-width: 1400px;
  box-sizing: border-box;
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
    padding: 0 ${theme.spacing.sm};
    margin: ${theme.spacing.xl} auto;
  }
`;

const ServiceFeature = styled.div`
  padding: ${theme.spacing.xl};
  background-color: ${theme.colors.background.main};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  text-align: center;
  transition: ${theme.transitions.default};
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  min-height: 600px;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.lg};
    min-height: auto;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.lg};
  }

  h3 {
    color: #003566;
    margin-bottom: ${theme.spacing.lg};
    font-size: clamp(1.2rem, 2.2vw, 1.8rem);
    font-weight: 500;
    width: 100%;
  }

  p {
    margin-bottom: ${theme.spacing.lg};
  }

  ul {
    width: 100%;
    text-align: left;
    margin: ${theme.spacing.xl} 0;
    padding-left: ${theme.spacing.xl};
    list-style-type: none;

    li {
      margin-bottom: ${theme.spacing.md};
      position: relative;
      
      &:before {
        content: "✓";
        position: absolute;
        left: -${theme.spacing.xl};
        color: ${theme.colors.accent.success};
      }
    }
  }
`;

const PriceCard = styled.div`
  padding: ${theme.spacing.xl};
  background-color: ${theme.colors.background.main};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  text-align: center;
  transition: ${theme.transitions.default};
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.lg};
  }

  h3 {
    color: #003566;
    margin-bottom: ${theme.spacing.lg};
    font-size: clamp(1.2rem, 2.2vw, 1.8rem);
    font-weight: 500;
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

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.lg};
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

const HeroButton = styled.button`
  max-width: 300px;
  width: 100%;
  font-size: 1rem;
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  margin-top: ${theme.spacing.xl};
  background: transparent;
  border: 2px solid white;
  color: white;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: white;
    z-index: -1;
    transition: width 0.4s ease;
  }

  &:hover {
    color: black;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

    &:before {
      width: 100%;
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    max-width: 250px;
    padding: ${theme.spacing.md} ${theme.spacing.lg};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    max-width: 200px;
    font-size: 0.9rem;
  }
`;

const BookButton = styled.button`
  width: 100%;
  margin: 0;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: transparent;
  border: 1px solid ${theme.colors.primary.main};
  color: ${theme.colors.primary.main};
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  display: block;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: ${theme.colors.primary.main};
    transition: transform 0.4s cubic-bezier(0.7, 0, 0.2, 1);
    z-index: 0;
  }

  span {
    position: relative;
    z-index: 1;
    transition: color 0.4s ease;
  }

  &:hover {
    &:before {
      transform: translateX(100%);
    }
    
    span {
      color: white;
    }
  }

  &:active {
    transform: scale(0.98);
  }
`;

const ImageModal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${theme.spacing.xl};
  cursor: pointer;

  img {
    max-width: 95%;
    max-height: 95vh;
    object-fit: contain;
    border-radius: ${theme.borderRadius.md};
  }
`;

const SectionDivider = styled.div`
  width: 100%;
  margin: ${theme.spacing['3xl']} 0;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: ${theme.spacing.md};
  height: 400px;

  @media (max-width: ${theme.breakpoints.md}) {
    height: 300px;
  }
`;

const DividerImage = styled.div<{ $span?: number }>`
  grid-column: span ${props => props.$span || 4};
  position: relative;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    img {
      transform: scale(1.1);
    }

    &::after {
      opacity: 1;
    }
  }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-column: span ${props => Math.min(props.$span || 4, 6)};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-column: span 12;
  }
`;

const FAQSection = styled.section`
  padding: ${theme.spacing['4xl']} ${theme.spacing.xl};
  width: 100%;
  overflow: hidden;
  background: ${theme.colors.background.light};
  
  h2 {
    font-size: clamp(1.4rem, 2.6vw, 2.2rem);
    font-weight: 600;
    margin-bottom: ${theme.spacing['2xl']};
    text-align: center;
    color: #003566;
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  }
`;

const FAQGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing['2xl']};
  padding: 0 ${theme.spacing.md};
  width: 100%;
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
    padding: 0 ${theme.spacing.sm};
  }
`;

const FAQItem = styled.div`
  h3 {
    color: #003566;
    margin-bottom: ${theme.spacing.md};
    font-size: ${theme.typography.fontSize.xl};
  }

  p {
    line-height: 1.6;
    color: ${theme.colors.text.secondary};
  }
`;

const Footer = styled.footer`
  background: ${theme.colors.background.dark};
  color: ${theme.colors.text.light};
  padding: ${theme.spacing['4xl']} ${theme.spacing.xl};
  width: 100%;

  .footer-content {
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: ${theme.spacing['2xl']};
    padding: 0 ${theme.spacing.xl};
  }

  .footer-section {
    h3 {
      color: white;
      font-size: ${theme.typography.fontSize.xl};
      margin-bottom: ${theme.spacing.xl};
      font-weight: 500;
    }

    p, a {
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.8;
      margin-bottom: ${theme.spacing.md};
    }

    a {
      text-decoration: none;
      display: block;
      transition: ${theme.transitions.default};
      
      &:hover {
        color: white;
        transform: translateX(5px);
      }
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        margin-bottom: ${theme.spacing.md};
      }
    }
  }

  .copyright {
    text-align: center;
    margin-top: ${theme.spacing['3xl']};
    padding-top: ${theme.spacing.xl};
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
  }
`;

const ValueProposition = styled.div`
  text-align: center;
  margin: ${theme.spacing.xl} 0;
  
  h4 {
    color: ${theme.colors.primary.main};
    font-size: ${theme.typography.fontSize.xl};
    margin-bottom: ${theme.spacing.md};
  }
  
  p {
    color: ${theme.colors.text.secondary};
    max-width: 800px;
    margin: 0 auto;
  }
`;

const ScrollContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  padding: ${theme.spacing.xl} ${theme.spacing.md};
  margin: 0 -${theme.spacing.md};

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

  /* Add some space at the end for better UX */
  &::after {
    content: '';
    padding-right: ${theme.spacing.xl};
  }
`;

const ServicesSection = styled.div`
  padding: ${theme.spacing['2xl']} 0;
  max-width: 100vw;
  overflow: hidden;
`;

const ServiceCard = styled.div`
  background: rgb(250, 245, 243);
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.md};
  margin: ${theme.spacing.md};
  height: 600px;
  width: 350px;
  transition: all 0.3s ease;
  text-align: center;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.lg};
  }

  h3 {
    color: #003566;
    margin-bottom: ${theme.spacing.xl};
    font-size: 1.5rem;
    font-weight: 500;
    text-align: center;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  p {
    margin-bottom: ${theme.spacing.lg};
    color: ${theme.colors.text.secondary};
    line-height: 1.6;
    flex-shrink: 0;
    font-size: 0.9rem;
    
    &.description {
      height: 80px;
      display: flex;
      align-items: center;
      margin-bottom: ${theme.spacing.xl};
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: left;
    flex-grow: 1;

    li {
      padding: ${theme.spacing.sm} 0;
      padding-left: ${theme.spacing.md};
      position: relative;
      color: ${theme.colors.text.secondary};
      font-size: 0.85rem;

      &::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: ${theme.colors.accent.success};
      }
    }
  }

  .price {
    margin: ${theme.spacing.xl} 0;
    font-weight: 500;
    color: ${theme.colors.primary.main};
    font-size: 1rem;
  }
`;

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1600 },
    items: 3,
    partialVisibilityGutter: 40
  },
  desktop: {
    breakpoint: { max: 1600, min: 1024 },
    items: 3,
    partialVisibilityGutter: 30
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
    partialVisibilityGutter: 20
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
    partialVisibilityGutter: 10
  }
};

const CarouselStyles = styled.div`
  .carousel-container {
    padding: 20px 0;
  }

  .custom-dot-list-style {
    bottom: -50px;
  }

  .react-multi-carousel-dot button {
    border: 1px solid ${theme.colors.primary.main};
    border-radius: 0;
    margin: 0 4px;
    width: 24px;
    height: 2px;
    transition: all 0.3s ease;
  }

  .react-multi-carousel-dot--active button {
    background: ${theme.colors.primary.main};
    width: 32px;
  }

  .react-multi-carousel-item {
    padding: 1px;
  }

  .react-multi-carousel-arrow {
    background: transparent;
    border: 1px solid ${theme.colors.primary.main};
    color: ${theme.colors.primary.main};
    min-width: 45px;
    min-height: 45px;
    border-radius: 0;
    transition: all 0.3s ease;

    &:hover {
      background: ${theme.colors.primary.main};
      color: white;
    }

    &::before {
      font-weight: bold;
      font-size: 1.5rem;
    }
  }
`;

// Add the styled component for SEO footer
const SEOFooter = styled.div`
  background: ${theme.colors.background.dark};
  padding: ${theme.spacing.lg} 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);

  .seo-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.8rem;
    line-height: 1.6;
    padding: 0 ${theme.spacing.xl};

    h2 {
      font-size: 0.8rem;
      font-weight: normal;
      margin-bottom: ${theme.spacing.md};
      color: rgba(255, 255, 255, 0.4);
      text-transform: none;
    }

    p {
      margin-bottom: ${theme.spacing.sm};
    }
  }
`;

export default function WeddingCouplesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>();
  const [selectedImage, setSelectedImage] = useState<string>();

  const handleBookClick = (packageName: string) => {
    setSelectedPackage(packageName);
    setIsModalOpen(true);
  };

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  return (
    <PageContainer>
      <Hero>
        <HeroImageContainer>
          <ProtectedImage
            src="/images/wedding/A7T09955-2.jpg"
            alt="Happy couple on their wedding day"
            height="100%"
            priority
            quality={100}
          />
        </HeroImageContainer>
        <HeroContent>
          <h3>Elopement & Couples Photography</h3>
          <p>Vancouver-based  photography for elopements, engagements, and ove stories.</p>
          <HeroButton onClick={() => handleBookClick('Wedding Photography')}>Inquire Now</HeroButton>
        </HeroContent>
      </Hero>

      <IntroSection>
        <p>
          I'm a Vancouver-based photographer capturing love stories with depth and emotion. 
          From intimate elopements on the West Coast to cozy couples sessions in the city, 
          I'm here to preserve your most beloved moments.
          <br/>
          <br/>
          - Camila Londono
        </p>
      </IntroSection>

      <SectionDivider>
      <DividerImage $span={4}>
          <ProtectedImage
            src="/images/wedding/A7T00849.jpg"
            alt="Couple portrait"
            height="100%"
            quality={100}
          />
        </DividerImage>
        <DividerImage $span={3}>
          <ProtectedImage
            src="/images/wedding/A7T01233Crop.jpg"
            alt="Hands with rings"
            height="100%"
            quality={100}
          />
        </DividerImage>
        <DividerImage $span={5}>
          <ProtectedImage
            src="/images/wedding/A7T01413.jpg"
            alt="Copule kissing"
            height="100%"
            quality={100}
          />
        </DividerImage>
      </SectionDivider>

      <Section>
        <h2>Services</h2>
        <ServicesSection>
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={false}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="transform 500ms ease-in-out"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            deviceType="desktop"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item"
            partialVisible={true}
          >
            {[
              {
                title: 'Elopements',
                price: '$500',
                description: "Every elopement deserves care and attention. I'll help you document your day in a way that feels real, relaxed, and true to you.",
                features: ['Up to 3 hours of coverage', '30 edited photos, high-resolution', 'Pre-session consultation', 'Add-on: All unedited images +$100', 'Add-on: Extra hour of coverage +$100'],
                action: 'Inquire Now',
                package: 'Elopement'
              },
              {
                title: 'Engagement Session',
                price: '$350',
                description: "Whether it’s right after the proposal or sometime in the weeks that follow, I'll help you to capture the moment you said 'yes'.",
                features: ['1.5-hour session', '30 edited, high-resolution images', 'Pre-session consultation', 'Add-on: All unedited images +$100', 'Add-on: Additional location +$100'],
                action: 'Inquire Now',
                package: 'Engagement'
              },
              {
                title: 'Couples Sessions',
                price: '$250',
                description: "Whether it’s an anniversary, a weekend away, or just the way you are right now...",
                features: ['1-hour session - 1 location', 'Outfit change', '30 edited, high-resolution images', 'Add-on: All unedited images +$50', 'Add-on: Additional location +$100'],
                action: 'Inquire Now',
                package: 'Couples'
              },
              {
                title: 'Photobooks',
                price: '$250',
                description: 'These photobooks are carefully designed to preserve your session or wedding in a beautiful, lasting format.',
                features: ['Custom design with your favorite images','Size: 8x8in - 20 spreads (40 pages)', 'Ships within 3 weeks after final approval','Add-on: Extra spreads +$10 each'],
                action: 'Inquire Now',
                package: 'Photobooks'
              }
            ].map((service, index) => (
              <ServiceCard key={index}>
                <h3>{service.title}</h3>
                <p className="description">{service.description}</p>
                <ul>
                  {service.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <p className="price">Starting at {service.price}</p>
                <BookButton onClick={() => handleBookClick(service.package)}>
                  <span>{service.action}</span>
                </BookButton>
              </ServiceCard>
            ))}
          </Carousel>
        </ServicesSection>
      </Section>

      <SectionDivider>
        <DividerImage $span={4} onClick={() => handleImageClick('/images/wedding/divider-2a.jpg')}>
          <ProtectedImage
            src="/images/wedding/divider-2a.jpg"
            alt="Wedding preparation"
            height="100%"
            quality={90}
          />
        </DividerImage>
        <DividerImage $span={5} onClick={() => handleImageClick('/images/wedding/divider-2b.jpg')}>
          <ProtectedImage
            src="/images/wedding/divider-2b.jpg"
            alt="First dance"
            height="100%"
            quality={90}
          />
        </DividerImage>
        <DividerImage $span={3} onClick={() => handleImageClick('/images/wedding/divider-2c.jpg')}>
          <ProtectedImage
            src="/images/wedding/divider-2c.jpg"
            alt="Ring exchange"
            height="100%"
            quality={90}
          />
        </DividerImage>
      </SectionDivider>

      <Section $dark>
        <h2>The Wedding Experience</h2>
        <Grid>
          <ServiceFeature>
            <h3>Before Your Day</h3>
            <ul>
              <li>Personal consultation to understand your unique story</li>
              <li>Customized timeline planning for optimal moments</li>
              <li>Location scouting and lighting preparation</li>
              <li>Vendor coordination and recommendations</li>
              <li>Engagement session to get comfortable on camera</li>
              <li>Detailed shot list and family photo planning</li>
            </ul>
          </ServiceFeature>
          
          <ServiceFeature>
            <h3>During Your Celebration</h3>
            <ul>
              <li>Unobtrusive documentary-style coverage</li>
              <li>Artistic direction for natural, candid moments</li>
              <li>Professional lighting for all conditions</li>
              <li>Multiple camera coverage for key moments</li>
              <li>Coordination with other vendors</li>
              <li>Backup equipment for peace of mind</li>
            </ul>
          </ServiceFeature>
          
          <ServiceFeature>
            <h3>After Your Wedding</h3>
            <ul>
              <li>Professional editing with consistent style</li>
              <li>Private online gallery within 6-8 weeks</li>
              <li>High-resolution digital downloads</li>
              <li>Print release and printing recommendations</li>
              <li>Album design consultation</li>
              <li>Archive backup of all your memories</li>
            </ul>
          </ServiceFeature>
        </Grid>
      </Section>

      <SectionDivider>
        <DividerImage $span={5} onClick={() => handleImageClick('/images/wedding/divider-3a.jpg')}>
          <ProtectedImage
            src="/images/wedding/divider-3a.jpg"
            alt="Wedding details and rings"
            height="100%"
            quality={90}
          />
        </DividerImage>
        <DividerImage $span={3} onClick={() => handleImageClick('/images/wedding/divider-3b.jpg')}>
          <ProtectedImage
            src="/images/wedding/divider-3b.jpg"
            alt="Wedding details and rings"
            height="100%"
            quality={90}
          />
        </DividerImage>
        <DividerImage $span={4} onClick={() => handleImageClick('/images/wedding/divider-3c.jpg')}>
          <ProtectedImage
            src="/images/wedding/divider-3c.jpg"
            alt="Wedding details and rings"
            height="100%"
            quality={90}
          />
        </DividerImage>
      </SectionDivider>

      <FAQSection>
        <h2>Frequently Asked Questions</h2>
        <FAQGrid>
          <FAQItem>
            <h3>How far in advance should we book?</h3>
            <p>For engagement sessions, 2-3 months in advance is recommended. For elopements, 6-12 months is ideal to ensure availability.</p>
          </FAQItem>
          
          <FAQItem>
            <h3>What is your photography style?</h3>
            <p>My style combines documentary storytelling with artistic portraiture, focusing on genuine moments and natural interactions.</p>
          </FAQItem>
          
          <FAQItem>
            <h3>Do you travel for sessions?</h3>
            <p>Yes! I'm available for travel throughout BC and beyond. Travel fees may apply depending on location.</p>
          </FAQItem>
          
          <FAQItem>
            <h3>What about weather?</h3>
            <p>We'll monitor the forecast and can reschedule if needed. Sometimes overcast or light rain can create beautiful, moody photos!</p>
          </FAQItem>
          
          <FAQItem>
            <h3>When do we receive our photos?</h3>
            <p>Engagement sessions are delivered within 3-4 weeks. Elopement photos are delivered within 6-8 weeks.</p>
          </FAQItem>
          
          <FAQItem>
            <h3>Can we order prints through you?</h3>
            <p>Yes! I offer professional printing services through trusted labs to ensure the highest quality prints and products.</p>
          </FAQItem>
        </FAQGrid>
      </FAQSection>

      <Section>
        <GalleryGrid>
          {[
            { src: '/images/wedding/gallery-1.jpg', span: 8 },
            { src: '/images/wedding/gallery-2.jpg', span: 4 },
            { src: '/images/wedding/gallery-3.jpg', span: 4 },
            { src: '/images/wedding/gallery-4.jpg', span: 8 },
            { src: '/images/wedding/gallery-5.jpg', span: 6 },
            { src: '/images/wedding/gallery-6.jpg', span: 6 },
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

      <SectionDivider>
        <DividerImage $span={5} onClick={() => handleImageClick('/images/wedding/divider-4a.jpg')}>
          <ProtectedImage
            src="/images/wedding/divider-4a.jpg"
            alt="Wedding celebration moment"
            height="100%"
            quality={90}
          />
        </DividerImage>
        <DividerImage $span={3} onClick={() => handleImageClick('/images/wedding/divider-4b.jpg')}>
          <ProtectedImage
            src="/images/wedding/divider-4b.jpg"
            alt="Wedding celebration moment"
            height="100%"
            quality={90}
          />
        </DividerImage>
        <DividerImage $span={4} onClick={() => handleImageClick('/images/wedding/divider-4c.jpg')}>
          <ProtectedImage
            src="/images/wedding/divider-4c.jpg"
            alt="Wedding celebration moment"
            height="100%"
            quality={90}
          />
        </DividerImage>
      </SectionDivider>

      <Section>
        <h2>Get in Touch</h2>
        <ContactForm service="Wedding & Couple Photography" />
      </Section>

      <Section>
        <h2>Investment in Timeless Memories</h2>
        <ValueProposition>
          <h4>Why Professional Wedding Photography Matters</h4>
          <p>
            Your wedding day is filled with once-in-a-lifetime moments that deserve to be captured with 
            artistic vision and technical excellence. These photos become family heirlooms, telling your 
            love story for generations to come.
          </p>
        </ValueProposition>
        <Grid>
          <ServiceFeature>
            <h3>Quality That Lasts</h3>
            <ul>
              <li>Professional-grade equipment</li>
              <li>Archival-quality prints</li>
              <li>Secure digital backups</li>
              <li>High-resolution files</li>
            </ul>
          </ServiceFeature>
          <ServiceFeature>
            <h3>Premium Products</h3>
            <ul>
              <li>Fine art albums</li>
              <li>Gallery-quality wall art</li>
              <li>Custom photo boxes</li>
              <li>Parent albums available</li>
            </ul>
          </ServiceFeature>
          <ServiceFeature>
            <h3>Digital Access</h3>
            <ul>
              <li>Online gallery sharing</li>
              <li>High-res downloads</li>
              <li>Mobile app access</li>
              <li>Social media files</li>
            </ul>
          </ServiceFeature>
        </Grid>
      </Section>

      <SectionDivider>
        <DividerImage $span={5} onClick={() => handleImageClick('/images/wedding/divider-5a.jpg')}>
          <ProtectedImage
            src="/images/wedding/divider-5a.jpg"
            alt="Emotional wedding moment"
            height="100%"
            quality={90}
          />
        </DividerImage>
        <DividerImage $span={3} onClick={() => handleImageClick('/images/wedding/divider-5b.jpg')}>
          <ProtectedImage
            src="/images/wedding/divider-5b.jpg"
            alt="Emotional wedding moment"
            height="100%"
            quality={90}
          />
        </DividerImage>
        <DividerImage $span={4} onClick={() => handleImageClick('/images/wedding/divider-5c.jpg')}>
          <ProtectedImage
            src="/images/wedding/divider-5c.jpg"
            alt="Emotional wedding moment"
            height="100%"
            quality={90}
          />
        </DividerImage>
      </SectionDivider>

      <Footer>
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contact</h3>
            <p>Let's create something beautiful together</p>
            <ul>
              <li><a href="mailto:contact@camilonart.com">contact@camilonart.com</a></li>
              <li><a href="tel:+1234567890">+1 (234) 567-890</a></li>
              <li>Based in Vancouver, BC</li>
              <li>Available for destination weddings</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Services</h3>
            <ul>
              <li><a href="#engagement">Engagement Sessions</a></li>
              <li><a href="#wedding">Wedding Photography</a></li>
              <li><a href="#elopement">Elopement Coverage</a></li>
              <li><a href="#albums">Wedding Albums</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Information</h3>
            <ul>
              <li><a href="#pricing">Investment & Pricing</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#blog">Wedding Tips</a></li>
              <li><a href="#process">Our Process</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Follow Along</h3>
            <ul>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">Pinterest</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://vimeo.com" target="_blank" rel="noopener noreferrer">Vimeo</a></li>
            </ul>
          </div>
        </div>

        <div className="copyright">
          <p>© {new Date().getFullYear()} Camilalonart. All rights reserved.</p>
          <p>All photographs and content are protected by copyright law and may not be reproduced, distributed, 
          transmitted, displayed, or published without written permission.</p>
        </div>
      </Footer>

      <SEOFooter>
        <div className="seo-content">
          <h2>Vancouver Elopement Photographer | Engagement & Couples Photography in BC</h2>
          <p>
            Specializing in intimate elopements, engagement sessions, and couples photography 
            throughout British Columbia. Capturing authentic moments and creating timeless 
            memories for couples in love.
          </p>
          <p>
            Serving Vancouver, Whistler, Tofino, and destinations across British Columbia and Canada.
            Available for travel and destination sessions.
          </p>
        </div>
      </SEOFooter>

      {selectedImage && (
        <ImageModal onClick={() => setSelectedImage(undefined)}>
          <ProtectedImage
            src={selectedImage}
            alt="Wedding moment"
            height="95vh"
            quality={100}
            onClick={(e) => e.stopPropagation()}
          />
        </ImageModal>
      )}

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPackage={selectedPackage}
      />

      <CarouselStyles />
    </PageContainer>
  );
} 