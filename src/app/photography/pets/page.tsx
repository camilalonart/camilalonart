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
  background-color: #FFFAF5;
  color: #2C3E50;
`;

const Hero = styled.section`
  position: relative;
  height: 85vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  
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
`;

const DividerImage = styled.div<{ $span?: number; $isMiddle?: boolean }>`
  grid-column: span ${props => props.$span || 4};
  position: relative;
  overflow: hidden;
  height: 100%;
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
  height: 600px;
  margin: ${theme.spacing['4xl']} 0;

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
  text-align: center;
  color: white;
  max-width: 900px;
  padding: ${theme.spacing.md};

  h1 {
    margin: ${theme.spacing.xl};
    font-size: clamp(2rem, 2.8vw, 2.8rem);
    font-weight: 500;
    margin-bottom: ${theme.spacing.sm};
    line-height: 1.1;
    letter-spacing: 0.1em;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    font-family: 'Poppins', sans-serif;
  }

  p {
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    line-height: 1.6;
    margin-bottom: ${theme.spacing.md};
    font-weight: 400;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    margin: ${theme.spacing.xl};
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
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
  background: rgba(169, 125, 30, 0.09);
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
  padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  background: ${props => props.$bgColor || 'transparent'};
  position: relative;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing.xl};
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 3vw, 2.8rem);
  color: #2C3E50;
  text-align: center;
  margin-bottom: ${theme.spacing['3xl']};
  font-weight: 700;
  position: relative;
  
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: rgb(169, 125, 30);
    margin: ${theme.spacing.md} auto 0;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const ServicesSection = styled.div`
  padding: ${theme.spacing['md']} 0;
  position: relative;

  .carousel-container {
    padding: ${theme.spacing['2xl']} 0;
  }

  .react-multi-carousel-item {
    display: flex;
    align-items: stretch;
  }
`;

const ServiceCard = styled.div`
  background: rgb(250, 245, 243);
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.md};
  margin: ${theme.spacing.md};
  height: auto;
  min-height: 600px;
  width: 350px;
  transition: all 0.3s ease;
  text-align: center;
  display: flex;

  .card-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.lg};
  }

  h3 {
    color: #796B5F;
    margin-bottom: ${theme.spacing.xl};
    font-size: clamp(1.2rem, 2vw, 1.5rem);
    font-weight: 500;
    text-align: center;
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
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
    margin: 0;
    text-align: left;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-height: 200px;
    margin-bottom: ${theme.spacing.xl};

    li {
      padding: ${theme.spacing.sm} 0;
      padding-left: ${theme.spacing.md};
      position: relative;
      color: ${theme.colors.text.secondary};
      font-size: clamp(0.8rem, 1.5vw, 0.85rem);

      &::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: ${theme.colors.accent.success};
      }
    }
  }

  .price {
    margin-bottom: ${theme.spacing.xl};
    font-weight: 500;
    color: ${theme.colors.primary.main};
    font-size: clamp(0.9rem, 1.5vw, 1rem);
  }

  .button-wrapper {
    margin-top: auto;
    width: 100%;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: 300px;
    padding: ${theme.spacing.lg};

    h3 {
      min-height: 50px;
      margin-bottom: ${theme.spacing.lg};
    }

    p.description {
      min-height: 60px;
    }

    ul {
      min-height: 220px;
    }
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 280px;
    
    ul {
      min-height: 200px;
    }
  }
`;

const PackagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${theme.spacing.xl};
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    max-width: 600px;
  }
`;

const PackageCard = styled.div`
  background: white;
  padding: ${theme.spacing['2xl']};
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  border-radius: ${theme.borderRadius.lg};

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

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);

    &::before {
      transform: scaleX(1);
    }
  }

  h3 {
    font-size: 1.8rem;
    color: #2C3E50;
    margin-bottom: ${theme.spacing.lg};
    font-weight: 700;
  }

  .description {
    color: #666;
    line-height: 1.6;
    margin-bottom: ${theme.spacing.xl};
    font-size: 1.1rem;
  }

  .price {
    font-size: 2.5rem;
    color: rgb(169, 125, 30);
    font-weight: 800;
    margin-bottom: ${theme.spacing.xl};
    
    span {
      font-size: 1rem;
      color: #666;
      font-weight: 400;
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
`;

const GalleryPreview = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.xl};
  max-width: 1600px;
  margin: 0 auto;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(8, 1fr);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const GalleryImage = styled.div<{ $span?: number }>`
  grid-column: span ${props => props.$span || 3};
  aspect-ratio: 4/3;
  overflow: hidden;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-column: span ${props => Math.min(props.$span || 3, 4)};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-column: span 2;
  }
`;

const ViewGalleryLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: ${theme.spacing['2xl']};
  color: rgb(169, 125, 30);
  font-size: 1.2rem;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    color: #2C3E50;
  }
`;

const Footer = styled.footer`
  background: #2C3E50;
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
  background: ${theme.colors.background.main};

  h2 {
    text-align: center;
    color: #796B5F;
    font-size: clamp(1.4rem, 2.6vw, 2.2rem);
    font-weight: 600;
    margin-bottom: ${theme.spacing['3xl']};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  }
`;

const FAQContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  gap: ${theme.spacing.xl};
`;

const FAQItem = styled.div`
  background: rgb(250, 245, 243);
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.sm};

  h3 {
    color: #796B5F;
    font-size: clamp(1.1rem, 1.8vw, 1.3rem);
    margin-bottom: ${theme.spacing.md};
    font-weight: 500;
  }

  p {
    color: ${theme.colors.text.secondary};
    font-size: clamp(0.9rem, 1.4vw, 1rem);
    line-height: 1.6;
  }
`;

const ProcessSection = styled.section`
  padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  background: ${theme.colors.background.main};

  h2 {
    text-align: center;
    color: #796B5F;
    font-size: clamp(1.4rem, 2.6vw, 2.2rem);
    font-weight: 600;
    margin-bottom: ${theme.spacing['3xl']};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  }
`;

const ProcessContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    height: 2px;
    background: #B4A7A7;
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
  background: #796B5F;
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
    color: #796B5F;
    font-size: clamp(1.1rem, 1.8vw, 1.3rem);
    margin-bottom: ${theme.spacing.md};
    font-weight: 500;
  }

  p {
    color: ${theme.colors.text.secondary};
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

  return (
    <PageContainer>
      <Hero>
        <HeroImageContainer>
          <ProtectedImage
            src="/images/pets/A7T05223-horizontal.jpg"
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
        <DividerImage $span={6} $isMiddle onClick={() => setSelectedImage('/images/pets/A7T02565.jpg')}>
          <ProtectedImage
            src="/images/pets/A7T02565.jpg"
            alt="Pet portrait"
            fill
            style={{ objectFit: 'cover' }}
            quality={100}
          />
        </DividerImage>
      </SectionDivider>

      <Section>
        <GalleryPreview>
          <GalleryImage $span={6} onClick={() => setSelectedImage('/images/pets/A7T02596.jpg')}>
            <ProtectedImage
              src="/images/pets/A7T02596.jpg"
              alt="Pet portrait"
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </GalleryImage>
          <GalleryImage $span={6} onClick={() => setSelectedImage('/images/pets/A7T02565.jpg')}>
            <ProtectedImage
              src="/images/pets/A7T02565.jpg"
              alt="Pet portrait"
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </GalleryImage>
        </GalleryPreview>
      </Section>

      <Section $bgColor="#f8f9fa">
        <SectionTitle>Our Services</SectionTitle>
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
                title: 'Indoor Studio Session',
                price: '$299',
                description: 'Professional studio photography with controlled lighting and elegant backdrops.',
                features: [
                  '1-hour studio session',
                  'Multiple backdrop options',
                  '30 edited, high-resolution images',
                  'Online gallery delivery',
                  'Print release included'
                ],
                action: 'Book Now',
                package: 'Indoor Studio'
              },
              {
                title: 'Outdoor Session',
                price: '$349',
                description: 'Natural light photography in beautiful outdoor locations.',
                features: [
                  '1.5-hour outdoor session',
                  '2 location options',
                  '40 edited, high-resolution images',
                  'Location recommendations',
                  'Weather date backup'
                ],
                action: 'Book Now',
                package: 'Outdoor'
              },
              {
                title: 'Family Session Outside',
                price: '$449',
                description: 'Capture your whole family with your pets in natural settings.',
                features: [
                  '2-hour outdoor session',
                  'Multiple family groupings',
                  '50 edited, high-resolution images',
                  'Location planning assistance',
                  'Digital album included'
                ],
                action: 'Book Now',
                package: 'Family Outside'
              },
              {
                title: 'Family Session Inside',
                price: '$399',
                description: 'Comfortable indoor photography for your family and pets.',
                features: [
                  '1.5-hour studio session',
                  'Professional lighting setup',
                  '40 edited, high-resolution images',
                  'Multiple backdrop options',
                  'Digital delivery'
                ],
                action: 'Book Now',
                package: 'Family Inside'
              }
            ].map((service, index) => (
              <ServiceCard key={index}>
                <div className="card-content">
                  <div>
                    <h3>{service.title}</h3>
                    <p className="description">{service.description}</p>
                    <ul>
                      {service.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                    <p className="price">Starting at {service.price}</p>
                  </div>
                  <div className="button-wrapper">
                    <ServiceCardButton onClick={() => handleBookNow(service.package)}>
                      {service.action}
                    </ServiceCardButton>
                  </div>
                </div>
              </ServiceCard>
            ))}
          </Carousel>
          <CarouselStyles />
        </ServicesSection>
      </Section>

      <Section $bgColor="#f8f9fa">
        <SectionTitle>Our Packages</SectionTitle>
        <PackagesGrid>
          <PackageCard>
            <h3>The Playful Pack</h3>
            <p className="description">Perfect for capturing your pet's energetic spirit outdoors</p>
            <div className="price">$299 <span>/ session</span></div>
            <ul>
              <li>90-minute outdoor session</li>
              <li>2-3 locations of your choice</li>
              <li>40+ edited digital photos</li>
              <li>Online gallery with download</li>
              <li>Print release included</li>
            </ul>
            <ServiceCardButton onClick={() => handleBookNow('Playful Pack')}>
              Book Now
            </ServiceCardButton>
          </PackageCard>

          <PackageCard>
            <h3>The Luxury Fur</h3>
            <p className="description">Studio session with professional lighting and elegant backdrops</p>
            <div className="price">$399 <span>/ session</span></div>
            <ul>
              <li>2-hour studio session</li>
              <li>Multiple premium backdrops</li>
              <li>50+ edited digital photos</li>
              <li>Professional retouching</li>
              <li>$100 print credit included</li>
            </ul>
            <ServiceCardButton onClick={() => handleBookNow('Luxury Fur')}>
              Book Now
            </ServiceCardButton>
          </PackageCard>

          <PackageCard>
            <h3>The Family Paws</h3>
            <p className="description">Include the whole family in this memorable photo session</p>
            <div className="price">$499 <span>/ session</span></div>
            <ul>
              <li>3-hour mixed session</li>
              <li>Indoor & outdoor locations</li>
              <li>75+ edited digital photos</li>
              <li>Premium photo album</li>
              <li>Canvas wall art included</li>
            </ul>
            <ServiceCardButton onClick={() => handleBookNow('Family Paws')}>
              Book Now
            </ServiceCardButton>
          </PackageCard>
        </PackagesGrid>
      </Section>

      <Section>
        <SectionTitle>Gallery</SectionTitle>
        <GalleryPreview>
          <GalleryImage $span={6} onClick={() => setSelectedImage('/images/pets/A7T05223-horizontal.jpg')}>
            <ProtectedImage
              src="/images/pets/A7T05223-horizontal.jpg"
              alt="Pet portrait"
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </GalleryImage>
          <GalleryImage $span={3} onClick={() => setSelectedImage('/images/pets/sample2.jpg')}>
            <ProtectedImage
              src="/images/pets/sample2.jpg"
              alt="Pet portrait"
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </GalleryImage>
          <GalleryImage $span={3} onClick={() => setSelectedImage('/images/pets/sample3.jpg')}>
            <ProtectedImage
              src="/images/pets/sample3.jpg"
              alt="Pet portrait"
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </GalleryImage>
          <GalleryImage $span={4} onClick={() => setSelectedImage('/images/pets/sample4.jpg')}>
            <ProtectedImage
              src="/images/pets/sample4.jpg"
              alt="Pet portrait"
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </GalleryImage>
          <GalleryImage $span={4} onClick={() => setSelectedImage('/images/pets/sample5.jpg')}>
            <ProtectedImage
              src="/images/pets/sample5.jpg"
              alt="Pet portrait"
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </GalleryImage>
          <GalleryImage $span={4}>
            <ProtectedImage
              src="/images/pets/sample6.jpg"
              alt="Pet portrait"
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </GalleryImage>
        </GalleryPreview>
        <ViewGalleryLink href="/photography/pets/gallery">
          View Full Gallery →
        </ViewGalleryLink>
      </Section>

      <FAQSection>
        <h2>Frequently Asked Questions</h2>
        <FAQContainer>
          <FAQItem>
            <h3>What should I bring to the photo session?</h3>
            <p>Bring your pet's favorite treats, toys, and any accessories you'd like to include in the photos. For studio sessions, you might want to bring a brush for quick touch-ups. Most importantly, bring patience and a positive attitude!</p>
          </FAQItem>
          <FAQItem>
            <h3>How do you handle anxious or energetic pets?</h3>
            <p>We take a patient, relaxed approach and let your pet set the pace. We'll take breaks as needed and use positive reinforcement. For high-energy pets, we might start with action shots to help them burn off energy before moving to posed photos.</p>
          </FAQItem>
          <FAQItem>
            <h3>When will I receive my photos?</h3>
            <p>You'll receive a preview gallery within 1 week of your session, and the full edited gallery within 2-3 weeks. Rush delivery is available for an additional fee if you need the photos sooner.</p>
          </FAQItem>
          <FAQItem>
            <h3>Can I purchase additional photos?</h3>
            <p>Yes! Additional digital images can be purchased individually or as a package. We also offer professional printing services for canvas prints, albums, and other photo products.</p>
          </FAQItem>
          <FAQItem>
            <h3>What happens if my pet isn't cooperating?</h3>
            <p>Don't worry! We're experienced in working with all types of pets and personalities. If needed, we can reschedule for another day or try a different approach. Our goal is to capture your pet's authentic personality.</p>
          </FAQItem>
        </FAQContainer>
      </FAQSection>

      <ProcessSection>
        <h2>Our Process</h2>
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

      <Footer>
        <FooterContent>
          <div>
            <h3>About Pet Photography</h3>
            <p>
              Specializing in capturing the unique personality and spirit of your pets through professional photography. 
              Based in Vancouver, serving the Lower Mainland area.
            </p>
          </div>
          <div>
            <h3>Quick Links</h3>
            <ul>
              <li><Link href="/photography/pets/gallery">Gallery</Link></li>
              <li><Link href="#packages">Packages</Link></li>
              <li><Link href="#services">Services</Link></li>
              <li><Link href="#contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3>Contact Information</h3>
            <ul>
              <li>📍 Vancouver, BC</li>
              <li>📱 (604) 123-4567</li>
              <li>✉️ pets@example.com</li>
            </ul>
          </div>
          <div>
            <h3>Follow Us</h3>
            <ul>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Pinterest</a></li>
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

      {isModalOpen && (
        <PetInquiryForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedPackage={selectedPackage}
        />
      )}
    </PageContainer>
  );
} 