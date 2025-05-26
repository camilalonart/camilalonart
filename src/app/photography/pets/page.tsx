'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import PetInquiryForm from '../../../components/PetInquiryForm';
import ProtectedImage from '../../../components/ProtectedImage';
import ImageModal from '../../../components/ImageModal';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const PageContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
  background-color:rgb(26, 20, 15);
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

const DividerImage = styled.div<{ $span?: number; $isMiddle?: boolean }>`
  grid-column: span ${props => props.$span || 4};
  position: relative;
  overflow: hidden;
  max-height: 400px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-column: span ${props => Math.min(props.$span || 4, 6)};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    display: ${props => (props.$isMiddle ? 'block' : 'none')};
    height: 200px;
  }
`;

const SectionDivider = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: ${theme.spacing.md};
  height: 500px;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(6, 1fr);
    height: 400px;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(3, 1fr);
    height: 300px;
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

const ActionButton = styled.button`
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
  
  &:hover {
    transform: translateY(-3px);
    background: rgba(212, 166, 68, 0.24);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const ServiceCardButton = styled.button`
  background: rgb(176, 126, 18);
  color: white;
  border: 1px solid white;
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: ${theme.spacing.lg};
  border-radius: 10px;
  
  &:hover {
    transform: translateY(-3px);
    background: rgb(231, 189, 99);
  }

  &:active {
    transform: translateY(-1px);
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

const SectionTitle = styled.h1`
  font-size: clamp(2rem, 3vw, 2.8rem);
  color:rgb(255, 255, 255);
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

const ServicesSection = styled.div`
  padding: ${theme.spacing.md} 0;
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.xl};
  padding: ${theme.spacing.xl} ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

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
  display: flex;
  border-radius: ${theme.borderRadius.lg};
  flex-direction: column;
  align-items: center;

  .card-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);

    &::before {
      transform: scaleX(1);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: rgb(169, 125, 30);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  h3 {
    font-size: 2rem;
    color: rgb(169, 125, 30);
    font-weight: 800;
    margin-top: ${theme.spacing.xl};
    margin-bottom: ${theme.spacing.md};
    font-family: 'Poppins', sans-serif;
  }

  .price {
    display: inline-block;
    color: rgb(176, 126, 18);
    font-size: 2rem;
    font-weight: 700;
    border-radius: 8px;
    padding: 0.3em 1em;
    margin-bottom: ${theme.spacing.md};
    margin-top: 0;
    letter-spacing: 0.02em;
  }

  p {
    margin-bottom: ${theme.spacing.lg};
    color: ${theme.colors.text.secondary};
    line-height: 1.6;
    font-size: clamp(0.85rem, 1.5vw, 0.9rem);
    &.description {
      min-height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: ${theme.spacing.xl};
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 ${theme.spacing.xl};
    text-align: left;

    li {
      padding: ${theme.spacing.sm} 0;
      color: #2C3E50;
      display: flex;
      align-items: center;
      font-size: 1.1rem;

      &::before {
        content: '✓';
        color: rgb(169, 125, 30);
        margin-right: ${theme.spacing.sm};
        font-weight: bold;
      }
    }
  }

  .button-wrapper {
    margin-top: auto;
    width: 100%;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    min-height: 400px;
    padding: ${theme.spacing.lg};
    h3 {
      min-height: 40px;
      margin-bottom: ${theme.spacing.md};
    }
    .price {
      font-size: 1.3rem;
      padding: 0.2em 0.7em;
      margin-bottom: ${theme.spacing.sm};
    }
    p.description {
      min-height: 40px;
    }
    ul {
      min-height: 120px;
    }
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    min-height: 220px;
    padding: ${theme.spacing.md};
    .price {
      font-size: 1.1rem;
      padding: 0.15em 0.5em;
    }
    h3 {
      font-size: 1.1rem;
      margin-bottom: ${theme.spacing.sm};
    }
    ul {
      min-height: 60px;
    }
  }
`;

const GalleryPreview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing['4xl']} ${theme.spacing.xl};
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  background: rgb(26, 20, 15);
  border-radius: ${theme.borderRadius.lg};

  h3 {
    color: rgb(255, 222, 194);
    font-size: clamp(1.4rem, 2.6vw, 2.2rem);
    margin-bottom: ${theme.spacing.lg};
    font-weight: 500;
    font-family: 'Poppins', sans-serif;
  }

  p {
    color: white;
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    line-height: 1.6;
    margin-bottom: ${theme.spacing.xl};
    max-width: 600px;
  }
`;

const ViewGalleryButton = styled(Link)`
  background: rgb(169, 125, 30);
  color: white;
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: ${theme.borderRadius.md};
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    transform: translateY(-3px);
    background: rgb(231, 189, 99);
  }
`;

const Footer = styled.footer`
  background:rgb(26, 20, 15);
  color: white;
  padding: ${theme.spacing['4xl']} 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.xl};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing['2xl']};

  h3 {
    font-size: 1.4rem;
    margin-bottom: ${theme.spacing.xl};
    color: rgb(169, 125, 30);
    font-family: 'Poppins', sans-serif;
  }

  p, ul {
    line-height: 1.6;
    margin-bottom: ${theme.spacing.lg};
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: ${theme.spacing.md};
  }

  a {
    color: white;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: rgb(169, 125, 30);
    }
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
    items: 1,
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
    padding: ${theme.spacing['2xl']} 0;
  }

  .react-multi-carousel-track {
    display: flex;
    align-items: stretch;
    padding: ${theme.spacing.md} 0;
  }

  .react-multi-carousel-item {
    display: flex;
    align-items: stretch;
  }

  .custom-dot-list-style {
    bottom: -40px;
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

  .react-multi-carousel-arrow {
    background: transparent;
    border: 1px solid ${theme.colors.primary.main};
    color: ${theme.colors.primary.main};
    min-width: 45px;
    min-height: 45px;
    border-radius: ${theme.borderRadius.md};
    transition: all 0.3s ease;
    top: 50%;
    transform: translateY(-50%);

    &:hover {
      background: ${theme.colors.primary.main};
      color: white;
    }

    &::before {
      font-weight: bold;
      font-size: 1.5rem;
    }
  }

  @media (max-width: ${theme.breakpoints.md}) {
    .react-multi-carousel-arrow {
      min-width: 35px;
      min-height: 35px;
      
      &::before {
        font-size: 1.2rem;
      }
    }
  }
`;

const FAQSection = styled.section`
  padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  background: rgb(26, 20, 15);

  h2 {
    text-align: center;
    color: rgb(255, 222, 194);
    font-size: clamp(1.4rem, 2.6vw, 2.2rem);
    font-weight: 600;
    margin-bottom: ${theme.spacing['2xl']};
    font-family: 'Poppins', sans-serif;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  }
`;

const FAQContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: ${theme.spacing.xl};
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const FAQItem = styled.div`
  background: rgb(72,58,47);
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.sm};
  transition: all 0.3s ease;

  h3 {
    color: rgb(169, 125, 30);
    font-size: clamp(1.1rem, 1.8vw, 1.3rem);
    margin-bottom: ${theme.spacing.md};
    font-weight: 500;
    font-family: 'Poppins', sans-serif;
  }

  p {
    color: white;
    font-size: clamp(0.9rem, 1.4vw, 1rem);
    line-height: 1.6;
  }
`;

const ReviewSection = styled.section`
  padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  background: rgb(26, 20, 15);
  text-align: center;
  
  h2 {
    color: rgb(255, 222, 194);
    font-size: clamp(1.4rem, 2.6vw, 2.2rem);
    margin-bottom: ${theme.spacing['2xl']};
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
  }
`;

const ReviewContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: ${theme.spacing.xl};
  padding: ${theme.spacing.xl} 0;
  align-items: center;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const ReviewCard = styled.div`
  background: rgb(250, 245, 243);
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.md};
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  box-shadow: ${theme.shadows.sm};
  align-items: flex-start;

  .review-stars {
    color: #FFD700;
    font-size: 1.3rem;
    margin-bottom: ${theme.spacing.sm};
  }

  .review-text {
    color: ${theme.colors.text.secondary};
    font-size: clamp(0.9rem, 1.4vw, 1rem);
    line-height: 1.6;
    margin-bottom: ${theme.spacing.md};
  }

  .reviewer-name {
    color: rgb(169, 125, 30);
    font-weight: 600;
    font-size: 1.1rem;
  }

  .reviewer-pet {
    color: ${theme.colors.text.secondary};
    font-size: 0.9rem;
  }
`;

const ReviewImage = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  margin: 0 auto;
  @media (max-width: ${theme.breakpoints.md}) {
    width: 120px;
    height: 120px;
  }
`;

const ProcessSection = styled.section`
  padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  background: rgb(26, 20, 15);

  h2 {
    text-align: center;
    color: rgb(255, 222, 194);
    font-size: clamp(1.4rem, 2.6vw, 2.2rem);
    font-weight: 600;
    margin-bottom: ${theme.spacing.lg};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  }
`;

const ProcessContainer = styled.div`
  max-width: 1200px;
  position: relative;
  margin: 0 auto;
  margin-top: ${theme.spacing.xl};

  &::before {
    content: '';
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    height: 2px;
    background: rgb(103, 80, 55);
    z-index: 0;

    @media (max-width: ${theme.breakpoints.md}) {
      left: 40px;
      top: 0;
      bottom: 0;
      width: 2px;
      height: auto;
    }
  }
`;

const ProcessSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${theme.spacing.xl};
  position: relative;
  z-index: 1;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing['2xl']};
  }
`;

const ProcessStep = styled.div`
  text-align: center;
  position: relative;

  @media (max-width: ${theme.breakpoints.md}) {
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: ${theme.spacing.xl};
    text-align: left;
  }
`;

const StepNumber = styled.div`
  width: 80px;
  height: 80px;
  background: rgb(169, 125, 30);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin: 0 auto ${theme.spacing.lg};
  position: relative;
  z-index: 2;
  
  @media (max-width: ${theme.breakpoints.md}) {
    margin: 0;
  }
`;

const StepContent = styled.div`
  h3 {
    color: rgb(169, 125, 30);
    font-size: clamp(1.1rem, 1.8vw, 1.3rem);
    margin-bottom: ${theme.spacing.md};
    font-weight: 500;
    font-family: 'Poppins', sans-serif;
  }

  p {
    color: white;
    font-size: clamp(0.9rem, 1.4vw, 1rem);
    line-height: 1.6;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    h3 {
      margin-bottom: ${theme.spacing.sm};
    }
  }
`;

export default function PetsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>();
  const [selectedImage, setSelectedImage] = useState<string>();

  const handleBookNow = (packageName: string) => {
    setSelectedPackage(packageName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(undefined);
  };

  return (
    <PageContainer>
      <Hero>
        <HeroImageContainer>
          <ProtectedImage
            src="/images/pets/A7T05648-3.jpg"
            alt="Happy dog portrait"
            fill
            style={{ objectFit: 'cover' }}
            quality={100}
          />
        </HeroImageContainer>
        <HeroContent>
          <h1>Pet Photography</h1>
          <p>Capture the spirit and personality of your furry family members with our professional pet photography services</p>
          <ActionButton onClick={() => setIsModalOpen(true)}>
            Book Your Session
          </ActionButton>
        </HeroContent>
      </Hero>

      <Section>
        <SectionDivider>
          <DividerImage $span={6} onClick={() => setSelectedImage('/images/pets/A7T02596.jpg')}>
            <ProtectedImage
              src="/images/pets/A7T02596.jpg"
              alt="Pet portrait"
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </DividerImage>
          <DividerImage $span={6} onClick={() => setSelectedImage('/images/pets/A7T02565.jpg')} $isMiddle>
            <ProtectedImage
              src="/images/pets/A7T02565.jpg"
              alt="Pet portrait"
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </DividerImage>
        </SectionDivider>
      </Section>

      <Section $bgColor="rgb(26, 20, 15)">
        <SectionTitle>Our Services</SectionTitle>
        <ServicesSection>
          {[
            {
              title: 'At Home Sessions',
              price: '$150',
              description: "This session takes place in your pet's own environment, where they're most comfortable.",
              features: [
                '1-hour studio session',
                '25 Edited, high-resolution images',
                'Option to purchase all raw unedited files +$50'
              ],
              action: 'Book Now',
              package: 'At Home Sessions'
            },
            {
              title: 'Outdoor Session',
              price: '$200',
              description: "This one's for the adventure pets! We head to a park, beach, or favorite outdoor spot to capture your pet's energy and personality in motion. Leashes are recommended, we can edit them out later for clean, natural shots.",
              features: [
                '1-hour outdoor session',
                '25 edited, high-resolution images',
                'Option to purchase all raw unedited files +$50'
              ],
              action: 'Book Now',
              package: 'Outdoor Session'
            },
            {
              title: 'Pet Photobooks',
              price: '$200',
              description: 'Turn your session into a timeless treasure with a professionally designed, printed photobook. Perfect for displaying your favorite images or gifting to loved ones.',
              features: ['Custom design with your favorite images','Size: 8x8in - 20 spreads (40 pages)', 'Ships within 4 weeks after final approval','Add-on: Extra spreads +$10 each'],
              action: 'Book Now',
              package: 'Pet Photobooks'
            }
          ].map((service, index) => (
            <ServiceCard key={index}>
              <div className="card-content">
                <div>
                  <h3>{service.title}</h3>
                  <span className="price">{service.price}</span>
                  <p className="description">{service.description}</p>
                  <ul>
                    {service.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="button-wrapper">
                  <ServiceCardButton onClick={() => handleBookNow(service.package)}>
                    {service.action}
                  </ServiceCardButton>
                </div>
              </div>
            </ServiceCard>
          ))}
        </ServicesSection>
      </Section>

      <Section>
        <SectionDivider>
          <DividerImage $span={3} onClick={() => setSelectedImage('/images/pets/gallery/A7T06875.jpg')} $isMiddle>
            <ProtectedImage
              src="/images/pets/gallery/A7T06875.jpg"
              alt="Pet portrait"
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </DividerImage>
          <DividerImage $span={3} onClick={() => setSelectedImage('/images/pets/gallery/A7T06520.jpg')}>
            <ProtectedImage
              src="/images/pets/gallery/A7T06520.jpg"
              alt="Pet portrait"
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </DividerImage>
          <DividerImage $span={3} onClick={() => setSelectedImage('/images/pets/gallery/A7T06575.jpg')}>
            <ProtectedImage
              src="/images/pets/gallery/A7T06575.jpg"
              alt="Pet portrait"
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </DividerImage>
          <DividerImage $span={3} onClick={() => setSelectedImage('/images/pets/gallery/A7T06679.jpg')}>
            <ProtectedImage
              src="/images/pets/gallery/A7T06679.jpg"
              alt="Pet portrait"
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </DividerImage>
        </SectionDivider>
      </Section>

      <ProcessSection>
        <SectionTitle>Our Process</SectionTitle>
        <ProcessContainer>
          <ProcessSteps>
            <ProcessStep>
              <StepNumber>1</StepNumber>
              <StepContent>
                <h3>Initial Contact</h3>
                <p>Fill out our inquiry form with details about your pet and your vision for the session.</p>
              </StepContent>
            </ProcessStep>
            <ProcessStep>
              <StepNumber>2</StepNumber>
              <StepContent>
                <h3>Consultation</h3>
                <p>We'll discuss your pet's personality, preferred locations, and any special requirements.</p>
              </StepContent>
            </ProcessStep>
            <ProcessStep>
              <StepNumber>3</StepNumber>
              <StepContent>
                <h3>Session Prep</h3>
                <p>We'll provide guidance on how to prepare your pet for the best possible photo experience.</p>
              </StepContent>
            </ProcessStep>
            <ProcessStep>
              <StepNumber>4</StepNumber>
              <StepContent>
                <h3>Photo Session</h3>
                <p>Relaxed, fun photography session tailored to your pet's comfort level and personality.</p>
              </StepContent>
            </ProcessStep>
            <ProcessStep>
              <StepNumber>5</StepNumber>
              <StepContent>
                <h3>Delivery</h3>
                <p>Receive your beautifully edited photos in a private online gallery within 2-3 weeks.</p>
              </StepContent>
            </ProcessStep>
          </ProcessSteps>
        </ProcessContainer>
      </ProcessSection>

      <Section>
        <SectionDivider>
          <DividerImage $span={3} onClick={() => setSelectedImage('/images/pets/A7T05911.jpg')} $isMiddle>
            <ProtectedImage
              src="/images/pets/A7T05911.jpg"
              alt="Pet portrait"
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </DividerImage>
          <DividerImage $span={6} onClick={() => setSelectedImage('/images/pets/A7T05654.jpg')}>
            <ProtectedImage
              src="/images/pets/A7T05654.jpg"
              alt="Pet portrait"
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </DividerImage>
          <DividerImage $span={3} onClick={() => setSelectedImage('/images/pets/A7T05223.jpg')}>
            <ProtectedImage
              src="/images/pets/A7T05223-horizontal.jpg"
              alt="Pet portrait"
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </DividerImage>
        </SectionDivider>
      </Section>

      <Section>
        <SectionTitle>Our Photography Collection</SectionTitle>
        <GalleryPreview>
          <p>Explore our gallery of heartwarming pet portraits, capturing the unique personalities and special moments of beloved companions.</p>
          <ViewGalleryButton href="/photography/pets/gallery">
            View Full Gallery
          </ViewGalleryButton>
        </GalleryPreview>
      </Section>

      <Section>
        <SectionDivider>
          <DividerImage $span={3} onClick={() => setSelectedImage('/images/pets/A7T02365.jpg')}>
            <ProtectedImage
              src="/images/pets/A7T02365.jpg"
              alt="Pet portrait"
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </DividerImage>
          <DividerImage $span={6} onClick={() => setSelectedImage('/images/pets/A7T02388.jpg')}>
            <ProtectedImage
              src="/images/pets/A7T02388.jpg"
              alt="Pet portrait"
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </DividerImage>
          <DividerImage $span={3} onClick={() => setSelectedImage('/images/pets/A7T02378.jpg')}>
            <ProtectedImage
              src="/images/pets/A7T02378.jpg"
              alt="Pet portrait"
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </DividerImage>
        </SectionDivider>
      </Section>

      <FAQSection>
        <h2>Frequently Asked Questions</h2>
        <FAQContainer>
          <FAQItem>
            <h3>What should I bring to the photo session?</h3>
            <p>Bring your pet's favorite treats, toys, and any accessories you'd like to include in the photos. You might want to bring a brush for quick touch-ups. Most importantly, bring patience and a positive attitude!</p>
          </FAQItem>
          <FAQItem>
            <h3>How do you handle anxious or energetic pets?</h3>
            <p>We take a patient, relaxed approach and let your pet set the pace. We'll take breaks as needed and use positive reinforcement. For high-energy pets, we might start with action shots to help them burn off energy before moving to posed photos.</p>
          </FAQItem>
          <FAQItem>
            <h3>How long does a typical session last?</h3>
            <p>Most sessions last between 1 hour. This gives us plenty of time to let your pet get comfortable and capture their true personality.</p>
          </FAQItem>
          <FAQItem>
            <h3>Is there a travel fee?</h3>
            <p>Travel within 20 miles of Vancouver downtown is included. Locations beyond that are subject to a $1/mile travel fee.</p>
          </FAQItem>
          <FAQItem>
            <h3>Can my pet stay on a leash?</h3>
            <p>Absolutely, and I actually recommend it. Leashes can be edited out during post-processing if you prefer.</p>
          </FAQItem>
          <FAQItem>
            <h3>Can I be in the photos too?</h3>
            <p>Yes, absolutely! You're welcome to be part of the session with your pet. Whether it's a sweet cuddle, a walk together, or a playful moment—these are often the most meaningful shots.</p>
          </FAQItem>
        </FAQContainer>
      </FAQSection>

      <Section>
        <SectionDivider>
          <DividerImage $span={3} $isMiddle>
            <ProtectedImage
              src="/images/pets/A7T02468-3.jpg"
              alt="Pet portrait"
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </DividerImage>
          <DividerImage $span={3}>
            <ProtectedImage
              src="/images/pets/A7T02414-2.jpg"
              alt="Pet portrait"
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </DividerImage>
          <DividerImage $span={3}>
            <ProtectedImage
              src="/images/pets/A7T02360.jpg"
              alt="Pet portrait"
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </DividerImage>
          <DividerImage $span={3}>
            <ProtectedImage
              src="/images/pets/A7T02349.jpg"
              alt="Pet portrait"
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </DividerImage>
        </SectionDivider>
      </Section>

      <Section $bgColor="rgb(26, 20, 15)">
        <SectionTitle>Book Your Session</SectionTitle>
        <PetInquiryForm
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedPackage={selectedPackage}
          embedded={false}
        />
        <div style={{ marginTop: '2rem' }}>
          <PetInquiryForm
            isOpen={true}
            onClose={() => {}}
            embedded={true}
          />
        </div>
      </Section>
      <Section>
        <SectionDivider>
          <DividerImage $span={4} onClick={() => setSelectedImage('/images/pets/A7T09768.jpg')}>
            <ProtectedImage
              src="/images/pets/A7T09768.jpg"
              alt="Pet portrait"
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </DividerImage>
          <DividerImage $span={8} onClick={() => setSelectedImage('/images/pets/A7T09762-2.jpg')}>
            <ProtectedImage
              src="/images/pets/A7T09762-2.jpg"
              alt="Pet portrait"
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </DividerImage>
        </SectionDivider>
      </Section>

      <Footer>
        <FooterContent>
          <div>
            <h3>About Pet Photography</h3>
            <p>
              Specializing in capturing the unique personality and spirit of your pets through professional photography. 
              Based in Vancouver.
            </p>
          </div>
          <div>
            <h3>Contact Information</h3>
            <ul>
              <li>📍 Vancouver, BC</li>
              <li>📱 (672) 338-9307</li>
              <li><a href="mailto:bycamilalonart@gmail.com">✉️ bycamilalonart@gmail.com</a></li>
            </ul>
          </div>
        </FooterContent>
      </Footer>

      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(undefined)}
          src={selectedImage}
          alt="Full size pet portrait"
        />
      )}
    </PageContainer>
  );
} 