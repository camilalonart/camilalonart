'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from "@/styles/theme";
import PetInquiryForm from "@/components/PetInquiryForm";
import PhotographyNav from "@/components/PhotographyNav";
import ProtectedImage from "@/components/ProtectedImage";
import ImageModal from "@/components/ImageModal";
import Link from '@/i18n/LocalizedLink';
import { useTranslation } from '@/i18n/TranslationContext';

const PageContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
  background-color:rgba(0, 0, 0, 1);
  color: #2C3E50;

  button[aria-haspopup="dialog"] {
    width: 100%;
    min-width: 0;
    margin: 0;
    padding: 0;
    border: 0;
    background: transparent;
  }

  button[aria-haspopup="dialog"]:focus-visible::after {
    content: '';
    position: absolute;
    inset: 6px;
    border: 3px solid white;
    outline: 3px solid #1A1A1A;
    z-index: 20;
    pointer-events: none;
  }
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
  display: block;
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
    font-family: ${theme.typography.fontFamily.poppins};
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
  background: #87600E;
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
    background: #71500B;
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const ServiceCardButton = styled.button`
  background: #87600E;
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
    background: #71500B;
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const Section = styled.section<{ $bgColor?: string }>`
  padding: clamp(2rem, 5vw, 5rem) clamp(1rem, 3vw, 2rem);
  background: ${props => props.$bgColor || 'transparent'};
  position: relative;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 3vw, 2.8rem);
  color:rgb(255, 255, 255);
  text-align: center;
  margin-bottom: ${theme.spacing.sm};
  font-weight: 700;
  position: relative;
  font-family: ${theme.typography.fontFamily.poppins};
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
  padding: clamp(1rem, 3vw, 2rem);
  min-width: 0;

  button {
    max-width: 100%;
    padding-inline: clamp(0.75rem, 2vw, 2rem);
    overflow-wrap: anywhere;
  }
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
    color: #87600E;
    font-weight: 800;
    margin-top: ${theme.spacing.xl};
    margin-bottom: ${theme.spacing.md};
    font-family: ${theme.typography.fontFamily.poppins};
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
    font-family: ${theme.typography.fontFamily.poppins};
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
  background: #87600E;
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
    background: #71500B;
    color: white;
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
    font-family: ${theme.typography.fontFamily.poppins};
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

const FAQSection = styled.section`
  padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  background: rgb(26, 20, 15);

  h2 {
    text-align: center;
    color: rgb(255, 222, 194);
    font-size: clamp(1.4rem, 2.6vw, 2.2rem);
    font-weight: 600;
    margin-bottom: ${theme.spacing['2xl']};
    font-family: ${theme.typography.fontFamily.poppins};
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
    color: #E5C675;
    font-size: clamp(1.1rem, 1.8vw, 1.3rem);
    margin-bottom: ${theme.spacing.md};
    font-weight: 500;
    font-family: ${theme.typography.fontFamily.poppins};
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
    font-family: ${theme.typography.fontFamily.poppins};
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
  background: rgba(16, 16, 16, 1);

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
    font-family: ${theme.typography.fontFamily.poppins};
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
  const { t } = useTranslation();
  const p = (key: string) => t(`photographyContent.pets.${key}`);
  const c = (key: string) => t(`photographyContent.common.${key}`);
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
      <PhotographyNav />
      <Hero>
        <HeroImageContainer>
          <ProtectedImage
            src="/images/pets/gallery/A7T06602.webp"
            alt={p('heroAlt')}
            fill
            style={{ objectFit: 'cover' }}
            quality={100}
          />
        </HeroImageContainer>
        <HeroContent>
          <h1>{p('title')}</h1>
          <p>{p('hero')}</p>
          <ActionButton onClick={() => setIsModalOpen(true)}>
            {c('book')}
          </ActionButton>
        </HeroContent>
      </Hero>

      <Section>
        <SectionDivider>
          <DividerImage as="button" type="button" aria-haspopup="dialog" $span={6} onClick={() => setSelectedImage('/images/pets/A7T02596.webp')}>
            <ProtectedImage
              src="/images/pets/A7T02596.webp"
              alt={p('portrait')}
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </DividerImage>
          <DividerImage as="button" type="button" aria-haspopup="dialog" $span={6} onClick={() => setSelectedImage('/images/pets/A7T02565.webp')} $isMiddle>
            <ProtectedImage
              src="/images/pets/A7T02565.webp"
              alt={p('portrait')}
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </DividerImage>
        </SectionDivider>
      </Section>

      <Section $bgColor="rgba(2, 1, 1, 1)">
        <SectionTitle>{p('services')}</SectionTitle>
        <ServicesSection>
          {[
            {
              title: p('home'),
              price: '$150',
              description: p('homeDescription'),
              features: [
                p('studioDuration'),
                p('images'),
                p('raw')
              ],
              action: c('bookNow'),
              package: 'At Home Sessions'
            },
            {
              title: p('outdoor'),
              price: '$200',
              description: p('outdoorDescription'),
              features: [
                p('outdoorDuration'),
                p('images'),
                p('raw')
              ],
              action: c('bookNow'),
              package: 'Outdoor Session'
            },
            {
              title: p('photobooks'),
              price: '$200',
              description: p('photobooksDescription'),
              features: ['f1', 'f2', 'f3', 'f4'].map(key => t(`photography.wedding.services.photobooks.${key}`)),
              action: c('bookNow'),
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
          <DividerImage as="button" type="button" aria-haspopup="dialog" $span={3} onClick={() => setSelectedImage('/images/pets/gallery/A7T06575-2.webp')} $isMiddle>
            <ProtectedImage
              src="/images/pets/gallery/A7T06575-2.webp"
              alt={p('portrait')}
              fill
              quality={100}
            />
          </DividerImage>
          <DividerImage as="button" type="button" aria-haspopup="dialog" $span={3} onClick={() => setSelectedImage('/images/pets/gallery/A7T06581.webp')}>
            <ProtectedImage
              src="/images/pets/gallery/A7T06581.webp"
              alt={p('portrait')}
              fill
              quality={100}
            />
          </DividerImage>
          <DividerImage as="button" type="button" aria-haspopup="dialog" $span={3} onClick={() => setSelectedImage('/images/pets/gallery/A7T06875-2.webp')}>
            <ProtectedImage
              src="/images/pets/gallery/A7T06875-2.webp"
              alt={p('portrait')}
              fill
              quality={100}
            />
          </DividerImage>
          <DividerImage as="button" type="button" aria-haspopup="dialog" $span={3} onClick={() => setSelectedImage('/images/pets/gallery/A7T06602.webp')}>
            <ProtectedImage
              src="/images/pets/gallery/A7T06602.webp"
              alt={p('portrait')}
              fill
              quality={100}
            />
          </DividerImage>
        </SectionDivider>
      </Section>

      <ProcessSection>
        <SectionTitle>{p('process')}</SectionTitle>
        <ProcessContainer>
          <ProcessSteps>
            <ProcessStep>
              <StepNumber>1</StepNumber>
              <StepContent>
                <h3>{p('initialContact')}</h3>
                <p>{p('initialContactDescription')}</p>
              </StepContent>
            </ProcessStep>
            <ProcessStep>
              <StepNumber>2</StepNumber>
              <StepContent>
                <h3>{p('consultation')}</h3>
                <p>{p('consultationDescription')}</p>
              </StepContent>
            </ProcessStep>
            <ProcessStep>
              <StepNumber>3</StepNumber>
              <StepContent>
                <h3>{p('prep')}</h3>
                <p>{p('prepDescription')}</p>
              </StepContent>
            </ProcessStep>
            <ProcessStep>
              <StepNumber>4</StepNumber>
              <StepContent>
                <h3>{p('session')}</h3>
                <p>{p('sessionDescription')}</p>
              </StepContent>
            </ProcessStep>
            <ProcessStep>
              <StepNumber>5</StepNumber>
              <StepContent>
                <h3>{p('delivery')}</h3>
                <p>{p('deliveryDescription')}</p>
              </StepContent>
            </ProcessStep>
          </ProcessSteps>
        </ProcessContainer>
      </ProcessSection>

      <Section>
        <SectionDivider>
          <DividerImage as="button" type="button" aria-haspopup="dialog" $span={3} onClick={() => setSelectedImage('/images/pets/A7T05911.webp')} $isMiddle>
            <ProtectedImage
              src="/images/pets/A7T05911.webp"
              alt={p('portrait')}
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </DividerImage>
          <DividerImage as="button" type="button" aria-haspopup="dialog" $span={6} onClick={() => setSelectedImage('/images/pets/A7T05654.webp')}>
            <ProtectedImage
              src="/images/pets/A7T05654.webp"
              alt={p('portrait')}
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </DividerImage>
          <DividerImage as="button" type="button" aria-haspopup="dialog" $span={3} onClick={() => setSelectedImage('/images/pets/gallery/A7T09275-2.webp')}>
            <ProtectedImage
              src="/images/pets/gallery/A7T09275-2.webp"
              alt={p('portrait')}
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </DividerImage>
        </SectionDivider>
      </Section>

      <Section>
        <SectionTitle>{c('collection')}</SectionTitle>
        <GalleryPreview>
          <p>{p('galleryIntro')}</p>
          <ViewGalleryButton href="/photography/pets/gallery">
            {c('gallery')}
          </ViewGalleryButton>
        </GalleryPreview>
      </Section>

      <Section>
        <SectionDivider>
          <DividerImage as="button" type="button" aria-haspopup="dialog" $span={3} onClick={() => setSelectedImage('/images/pets/A7T02365.webp')}>
            <ProtectedImage
              src="/images/pets/A7T02365.webp"
              alt={p('portrait')}
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </DividerImage>
          <DividerImage as="button" type="button" aria-haspopup="dialog" $span={6} onClick={() => setSelectedImage('/images/pets/A7T02388.webp')}>
            <ProtectedImage
              src="/images/pets/A7T02388.webp"
              alt={p('portrait')}
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </DividerImage>
          <DividerImage as="button" type="button" aria-haspopup="dialog" $span={3} onClick={() => setSelectedImage('/images/pets/A7T02378.webp')}>
            <ProtectedImage
              src="/images/pets/A7T02378.webp"
              alt={p('portrait')}
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </DividerImage>
        </SectionDivider>
      </Section>

      <FAQSection>
        <h2>{c('faq')}</h2>
        <FAQContainer>
          <FAQItem>
            <h3>{p('faqBring')}</h3>
            <p>{p('faqBringAnswer')}</p>
          </FAQItem>
          <FAQItem>
            <h3>{p('faqAnxious')}</h3>
            <p>{p('faqAnxiousAnswer')}</p>
          </FAQItem>
          <FAQItem>
            <h3>{p('faqDuration')}</h3>
            <p>{p('faqDurationAnswer')}</p>
          </FAQItem>
          <FAQItem>
            <h3>{p('faqTravel')}</h3>
            <p>{p('faqTravelAnswer')}</p>
          </FAQItem>
          <FAQItem>
            <h3>{p('faqLeash')}</h3>
            <p>{p('faqLeashAnswer')}</p>
          </FAQItem>
          <FAQItem>
            <h3>{p('faqTogether')}</h3>
            <p>{p('faqTogetherAnswer')}</p>
          </FAQItem>
        </FAQContainer>
      </FAQSection>

      <Section>
        <SectionDivider>
          <DividerImage $span={3} $isMiddle>
            <ProtectedImage
              src="/images/pets/A7T02468-3.webp"
              alt={p('portrait')}
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </DividerImage>
          <DividerImage $span={3}>
            <ProtectedImage
              src="/images/pets/A7T02414-2.webp"
              alt={p('portrait')}
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </DividerImage>
          <DividerImage $span={3}>
            <ProtectedImage
              src="/images/pets/A7T02360.webp"
              alt={p('portrait')}
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </DividerImage>
          <DividerImage $span={3}>
            <ProtectedImage
              src="/images/pets/A7T02349.webp"
              alt={p('portrait')}
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </DividerImage>
        </SectionDivider>
      </Section>

      <Section $bgColor="rgb(26, 20, 15)">
        <SectionTitle>{c('book')}</SectionTitle>
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
          <DividerImage as="button" type="button" aria-haspopup="dialog" $span={4} onClick={() => setSelectedImage('/images/pets/A7T09768.webp')}>
            <ProtectedImage
              src="/images/pets/A7T09768.webp"
              alt={p('portrait')}
              fill
              style={{ objectFit: 'cover' }}
              quality={100}
            />
          </DividerImage>
          <DividerImage as="button" type="button" aria-haspopup="dialog" $span={8} onClick={() => setSelectedImage('/images/pets/A7T09762-2.webp')}>
            <ProtectedImage
              src="/images/pets/A7T09762-2.webp"
              alt={p('portrait')}
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
            <h3>{p('aboutTitle')}</h3>
            <p>
              {p('about')}
            </p>
          </div>
          <div>
            <h3>{p('contact')}</h3>
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
          alt={p('fullPortrait')}
        />
      )}
    </PageContainer>
  );
} 