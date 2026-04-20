'use client';

import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../../styles/theme';
import ProtectedImage from '../../../components/ProtectedImage';
import ImageModal from '../../../components/ImageModal';
import Link from 'next/link';
import PhotographyNav from '../../../components/PhotographyNav';

// Soft animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const PageContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
  background-color: #FDF8F5;
  color: #5D4E42;
  padding-top: 64px;
`;

// Split Hero Section
const Hero = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  width: 100%;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const HeroImageSide = styled.div`
  position: relative;
  min-height: 100vh;
  overflow: hidden;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    object-position: center center;
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    min-height: 70vh;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    min-height: 60vh;
  }
`;

const HeroContentSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${theme.spacing['4xl']};
  background: linear-gradient(135deg, #FDF8F5 0%, #F5EDE8 100%);
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: ${theme.breakpoints.lg}) {
    padding: ${theme.spacing['3xl']} ${theme.spacing['2xl']};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  }
`;

const HeroTextContent = styled.div`
  max-width: 550px;
  margin-bottom: ${theme.spacing['3xl']};

  h1 {
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 300;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    line-height: 1.15;
    margin-bottom: ${theme.spacing.xl};
    color: #5D4E42;
    font-family: ${theme.typography.fontFamily.secondary};
  }

  p {
    font-size: clamp(1rem, 1.4vw, 1.15rem);
    line-height: 1.9;
    font-weight: 300;
    color: #7A6B60;
    margin-bottom: ${theme.spacing.xl};
    letter-spacing: 0.02em;
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    max-width: 100%;
    text-align: center;
    margin: 0 auto ${theme.spacing['2xl']};
  }
`;

const HeroMiniGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${theme.spacing.sm};
  }
`;

const MiniGalleryImage = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 4px 15px rgba(93, 78, 66, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(93, 78, 66, 0.2);

    img {
      transform: scale(1.1);
    }
  }

  img {
    transition: transform 0.5s ease;
  }
`;

const HeroButton = styled.button`
  background: #D4A682;
  color: white;
  padding: ${theme.spacing.lg} ${theme.spacing['2xl']};
  font-size: 1.1rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.4s ease;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  border-radius: 50px;
  display: inline-block;

  &:hover {
    background: #C4A484;
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(196, 164, 132, 0.3);
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    margin: 0 auto;
  }
`;

const HeroDecorative = styled.div`
  position: absolute;
  bottom: ${theme.spacing['2xl']};
  right: ${theme.spacing['2xl']};
  font-size: 4rem;
  color: rgba(212, 166, 130, 0.3);
  font-family: ${theme.typography.fontFamily.secondary};
  z-index: 2;
  display: none;

  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

// Intro Section with elegant typography
const IntroSection = styled.section`
  padding: clamp(2rem, 5vw, 5rem) clamp(1rem, 3vw, 2rem);
  text-align: center;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;

  h2 {
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    color: #5D4E42;
    font-weight: 300;
    letter-spacing: 0.1em;
    margin-bottom: ${theme.spacing.xl};
    font-family: ${theme.typography.fontFamily.secondary};
  }

  p {
    font-size: clamp(1rem, 1.4vw, 1.15rem);
    line-height: 2;
    color: #7A6B60;
    font-weight: 300;
    max-width: 800px;
    margin: 0 auto;
  }
`;

// Image Divider Section
const ImageDivider = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  max-height: 400px;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    max-height: none;
  }
`;

const DividerImage = styled.div<{ $hideOnMobile?: boolean }>`
  position: relative;
  height: 400px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    img {
      transform: scale(1.05);
    }
  }

  img {
    transition: transform 0.5s ease;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    height: 300px;
    display: ${props => props.$hideOnMobile ? 'none' : 'block'};
  }
`;

// Services Section - Split Layout
const ServicesSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  width: 100%;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const ServicesImageSide = styled.div`
  position: relative;
  min-height: 100vh;
  overflow: hidden;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    object-position: center center;
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    min-height: 60vh;
    order: -1;
  }
`;

const ServicesContentSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${theme.spacing['4xl']};
  background: linear-gradient(135deg, #FDF8F5 0%, #F5EDE8 100%);

  @media (max-width: ${theme.breakpoints.lg}) {
    padding: ${theme.spacing['3xl']} ${theme.spacing['2xl']};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  }
`;

const ServicesHeader = styled.div`
  margin-bottom: ${theme.spacing['3xl']};

  h2 {
    font-size: clamp(2rem, 3.5vw, 2.8rem);
    color: #5D4E42;
    font-weight: 300;
    letter-spacing: 0.1em;
    margin-bottom: ${theme.spacing.lg};
    font-family: ${theme.typography.fontFamily.secondary};
    text-transform: uppercase;
  }

  p {
    color: #7A6B60;
    font-size: 1.1rem;
    line-height: 1.8;
    max-width: 500px;
  }
`;

const PricingCard = styled.div`
  background: white;
  border-radius: 24px;
  padding: ${theme.spacing['2xl']} ${theme.spacing['3xl']};
  box-shadow: 0 15px 50px rgba(93, 78, 66, 0.1);
  margin-bottom: ${theme.spacing['2xl']};
`;

const PricingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
  padding-bottom: ${theme.spacing.xl};
  border-bottom: 1px solid #E8DDD6;

  h3 {
    font-size: 1.6rem;
    color: #5D4E42;
    font-weight: 400;
    font-family: ${theme.typography.fontFamily.secondary};
    letter-spacing: 0.05em;
  }

  .price {
    font-size: 2.2rem;
    color: #D4A682;
    font-weight: 300;
    font-family: ${theme.typography.fontFamily.secondary};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.spacing.md};
  }
`;

const IncludesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 ${theme.spacing.xl};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const IncludesItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};
  color: #5D4E42;
  font-size: 1rem;
  line-height: 1.5;

  &::before {
    content: '';
    width: 20px;
    height: 20px;
    min-width: 20px;
    background: #D4A682;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const AddOnsSection = styled.div`
  margin-top: ${theme.spacing.xl};
  padding-top: ${theme.spacing.xl};
  border-top: 1px solid #E8DDD6;

  h4 {
    font-size: 1.1rem;
    color: #5D4E42;
    font-weight: 500;
    margin-bottom: ${theme.spacing.lg};
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
`;

const AddOnsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const AddOnItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #7A6B60;
  font-size: 0.95rem;
  padding: ${theme.spacing.sm} 0;

  span:first-child {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};

    &::before {
      content: '+';
      color: #D4A682;
      font-weight: 600;
      font-size: 1.1rem;
    }
  }

  span:last-child {
    color: #D4A682;
    font-weight: 500;
  }
`;

const BookButton = styled.button`
  background: linear-gradient(135deg, #D4A682 0%, #C49A76 100%);
  color: white;
  padding: ${theme.spacing.lg} ${theme.spacing['2xl']};
  font-size: 1.1rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.4s ease;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  border-radius: 50px;
  width: 100%;
  margin-top: ${theme.spacing.xl};
  box-shadow: 0 8px 25px rgba(212, 166, 130, 0.35);

  &:hover {
    background: linear-gradient(135deg, #C49A76 0%, #B08A66 100%);
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(212, 166, 130, 0.45);
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  color: #5D4E42;
  text-align: center;
  margin-bottom: ${theme.spacing.lg};
  font-weight: 300;
  letter-spacing: 0.15em;
  font-family: ${theme.typography.fontFamily.secondary};
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #D4A682, transparent);
    margin: ${theme.spacing.lg} auto 0;
  }
`;

const SectionSubtitle = styled.p`
  text-align: center;
  color: #7A6B60;
  font-size: clamp(1rem, 1.4vw, 1.1rem);
  max-width: 700px;
  margin: 0 auto ${theme.spacing['3xl']};
  line-height: 1.8;
  font-weight: 300;
`;

// Session Types Section
const SessionTypesSection = styled.section`
  padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  background: #5D4E42;
  color: white;
`;

const SessionTypesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing['2xl']};
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
  }
`;

const SessionTypeCard = styled.div`
  text-align: center;
  padding: ${theme.spacing['2xl']};

  .icon {
    font-size: 1.5rem;
    margin-bottom: ${theme.spacing.xl};
    width: 60px;
    height: 60px;
    border: 2px solid #D4A682;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    color: #D4A682;
    font-family: ${theme.typography.fontFamily.secondary};
  }

  h3 {
    font-size: 1.4rem;
    margin-bottom: ${theme.spacing.lg};
    font-weight: 400;
    letter-spacing: 0.1em;
    font-family: ${theme.typography.fontFamily.secondary};
    color: #F5EDE8;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.8;
    font-size: 0.95rem;
  }
`;

// Gallery Preview Section
const GallerySection = styled.section`
  padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  background: #FDF8F5;
  text-align: center;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  gap: ${theme.spacing.md};
  max-width: 1400px;
  margin: 0 auto ${theme.spacing['3xl']};

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const GalleryImage = styled.div<{ $span?: string }>`
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  cursor: pointer;
  grid-column: ${props => props.$span || 'span 1'};
  transition: all 0.4s ease;

  &:hover {
    transform: scale(1.02);
    z-index: 1;

    img {
      transform: scale(1.1);
    }
  }

  img {
    transition: transform 0.5s ease;
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-column: span 1;
  }
`;

const ViewGalleryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.md};
  background: transparent;
  color: #5D4E42;
  padding: ${theme.spacing.lg} ${theme.spacing['2xl']};
  font-size: 1.1rem;
  font-weight: 400;
  text-decoration: none;
  border: 2px solid #D4A682;
  border-radius: 50px;
  transition: all 0.3s ease;
  letter-spacing: 0.1em;

  &:hover {
    background: #D4A682;
    color: white;
  }

  &::after {
    content: '→';
    font-size: 1.3rem;
  }
`;

// FAQ Section
const FAQSection = styled.section`
  padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  background: linear-gradient(180deg, #F5EDE8 0%, #FDF8F5 100%);
`;

const FAQGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const FAQItem = styled.div`
  background: white;
  padding: ${theme.spacing['2xl']};
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(93, 78, 66, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(93, 78, 66, 0.1);
  }

  h3 {
    color: #5D4E42;
    font-size: 1.15rem;
    margin-bottom: ${theme.spacing.md};
    font-weight: 500;
    font-family: ${theme.typography.fontFamily.poppins};
  }

  p {
    color: #7A6B60;
    line-height: 1.7;
    font-size: 0.95rem;
  }
`;

// Contact/Booking Section
const BookingSection = styled.section`
  padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  background: #5D4E42;
  color: white;
  text-align: center;
`;

const BookingContent = styled.div`
  max-width: 800px;
  margin: 0 auto;

  h2 {
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 300;
    letter-spacing: 0.1em;
    margin-bottom: ${theme.spacing.xl};
    font-family: ${theme.typography.fontFamily.secondary};
    color: #F5EDE8;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: ${theme.spacing['2xl']};
  }
`;

// Process Section
const ProcessSection = styled.section`
  padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  background: #FDF8F5;
`;

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50px;
    left: 10%;
    right: 10%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #D4A682, transparent);
    z-index: 0;

    @media (max-width: ${theme.breakpoints.md}) {
      display: none;
    }
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const ProcessStep = styled.div`
  text-align: center;
  position: relative;
  z-index: 1;
`;

const StepNumber = styled.div`
  width: 100px;
  height: 100px;
  background: white;
  border: 3px solid #D4A682;
  color: #D4A682;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 300;
  margin: 0 auto ${theme.spacing.xl};
  font-family: ${theme.typography.fontFamily.secondary};
`;

const StepContent = styled.div`
  h3 {
    color: #5D4E42;
    font-size: 1.2rem;
    margin-bottom: ${theme.spacing.md};
    font-weight: 400;
    letter-spacing: 0.05em;
  }

  p {
    color: #7A6B60;
    font-size: 0.95rem;
    line-height: 1.7;
  }
`;

// Footer Section
const Footer = styled.footer`
  background: #3D342D;
  color: white;
  padding: ${theme.spacing['3xl']} ${theme.spacing.xl};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing['2xl']};

  h3 {
    font-size: 1.2rem;
    margin-bottom: ${theme.spacing.xl};
    color: #D4A682;
    font-family: ${theme.typography.fontFamily.secondary};
    font-weight: 400;
    letter-spacing: 0.05em;
  }

  p {
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.95rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: ${theme.spacing.md};
    color: rgba(255, 255, 255, 0.8);
  }

  a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #D4A682;
    }
  }
`;

// Form Section
const FormSection = styled.section`
  width: 100%;
`;

const FormImageBanner = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    object-position: center center;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    height: 300px;
  }
`;

const FormContentArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  background: linear-gradient(180deg, #5D4E42 0%, #4A3F35 100%);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4A682' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.5;
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    padding: ${theme.spacing['3xl']} ${theme.spacing['2xl']};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  }
`;

const FormWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: 32px;
  padding: ${theme.spacing['3xl']} ${theme.spacing['4xl']};
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.25);
  position: relative;
  z-index: 1;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing.xl};
    border-radius: 24px;
  }
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing['3xl']};

  h3 {
    font-size: clamp(1.6rem, 2.5vw, 2rem);
    color: #5D4E42;
    font-weight: 300;
    letter-spacing: 0.08em;
    margin-bottom: ${theme.spacing.md};
    font-family: ${theme.typography.fontFamily.secondary};
  }

  p {
    color: #7A6B60;
    font-size: 1rem;
    line-height: 1.7;
  }
`;

// Inline Form Styles
const InlineForm = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.xl} ${theme.spacing['2xl']};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const FormGroup = styled.div<{ $fullWidth?: boolean }>`
  grid-column: ${props => props.$fullWidth ? 'span 2' : 'span 1'};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  position: relative;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-column: span 1;
  }
`;

const FormLabel = styled.label`
  font-size: 0.85rem;
  color: #5D4E42;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: ${theme.spacing.xs};
`;

const FormInput = styled.input`
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  border: none;
  border-bottom: 2px solid #E8DDD6;
  border-radius: 0;
  font-size: 1.05rem;
  color: #5D4E42;
  background: transparent;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-bottom-color: #D4A682;
    background: rgba(212, 166, 130, 0.03);
  }

  &::placeholder {
    color: #B5A99F;
    font-style: italic;
  }
`;

const FormTextArea = styled.textarea`
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  border: 2px solid #E8DDD6;
  border-radius: 16px;
  font-size: 1.05rem;
  color: #5D4E42;
  background: #FDFBFA;
  min-height: 180px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;
  line-height: 1.6;

  &:focus {
    outline: none;
    border-color: #D4A682;
    background: white;
    box-shadow: 0 0 0 4px rgba(212, 166, 130, 0.1);
  }

  &::placeholder {
    color: #B5A99F;
    font-style: italic;
  }
`;

const FormSelect = styled.select`
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  border: none;
  border-bottom: 2px solid #E8DDD6;
  border-radius: 0;
  font-size: 1.05rem;
  color: #5D4E42;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23D4A682' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right ${theme.spacing.md} center;
  background-size: 20px;
  padding-right: ${theme.spacing['3xl']};

  &:focus {
    outline: none;
    border-bottom-color: #D4A682;
    background-color: rgba(212, 166, 130, 0.03);
  }

  option {
    padding: ${theme.spacing.md};
  }
`;

const FormDivider = styled.div`
  grid-column: span 2;
  height: 1px;
  background: linear-gradient(90deg, transparent, #E8DDD6, transparent);
  margin: ${theme.spacing.md} 0;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-column: span 1;
  }
`;

const SubmitButton = styled.button`
  grid-column: span 2;
  background: linear-gradient(135deg, #D4A682 0%, #C49A76 100%);
  color: white;
  padding: ${theme.spacing.xl} ${theme.spacing['2xl']};
  font-size: 1.15rem;
  font-weight: 500;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.4s ease;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-top: ${theme.spacing.xl};
  box-shadow: 0 8px 25px rgba(212, 166, 130, 0.35);

  &:hover {
    background: linear-gradient(135deg, #C49A76 0%, #B08A66 100%);
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(212, 166, 130, 0.45);
  }

  &:disabled {
    background: #B5A99F;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    grid-column: span 1;
    padding: ${theme.spacing.lg} ${theme.spacing.xl};
  }
`;

const StatusMessage = styled.div<{ $type: 'success' | 'error' }>`
  grid-column: span 2;
  padding: ${theme.spacing.xl};
  border-radius: 16px;
  text-align: center;
  font-weight: 500;
  font-size: 1.05rem;
  background: ${props => props.$type === 'success' 
    ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)' 
    : 'linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(244, 67, 54, 0.05) 100%)'};
  color: ${props => props.$type === 'success' ? '#2E7D32' : '#C62828'};
  border: 2px solid ${props => props.$type === 'success' ? 'rgba(76, 175, 80, 0.3)' : 'rgba(244, 67, 54, 0.3)'};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-column: span 1;
  }
`;

export default function FamilyMaternityPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>();
  const [selectedImage, setSelectedImage] = useState<string>();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    sessionType: '',
    date: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToBooking = () => {
    const element = document.getElementById('booking-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);

    try {
      // Simulate API call - replace with actual submission logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormStatus({
        type: 'success',
        message: 'Thank you! Your inquiry has been received. We\'ll be in touch within 24 hours.'
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        sessionType: '',
        date: '',
        message: ''
      });
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Something went wrong. Please try again or contact us directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const sessionTypes = [
    {
      icon: '🤍',
      title: 'Maternity',
      description: 'Elegant sessions celebrating the beauty of pregnancy, whether in studio with flowing gowns or outdoors in nature.'
    },
    {
      icon: '🤍',
      title: 'Newborn & Baby',
      description: 'Gentle, peaceful sessions capturing the precious details of your new arrival during their first weeks and milestones.'
    },
    {
      icon: '🤍',
      title: 'Family',
      description: 'Relaxed, fun sessions that capture the authentic connections and joy of your family, from toddlers to grandparents.'
    }
  ];

  const faqs = [
    {
      question: 'When is the best time for a maternity session?',
      answer: 'The ideal time is between 28-34 weeks of pregnancy when your bump is beautifully round but you\'re still comfortable. We recommend booking your session in advance to secure your preferred date.'
    },
    {
      question: 'How old should my baby be for a newborn session?',
      answer: 'The best time is within the first 5-14 days after birth when babies are sleepier and more flexible for those curled-up poses. However, we can capture beautiful images at any age!'
    },
    {
      question: 'What should we wear for a family session?',
      answer: 'We recommend coordinating colors rather than matching outfits. Soft, neutral tones photograph beautifully. We offer a complimentary wardrobe consultation to help you prepare.'
    },
    {
      question: 'Can you come to our home for sessions?',
      answer: 'Absolutely! In-home sessions are perfect for newborn and family photography. Your home provides a comfortable, personal setting that creates meaningful images.'
    },
    {
      question: 'How long until we receive our photos?',
      answer: 'Your private online gallery will be ready within 2-3 weeks after your session. You\'ll receive a link to view, download, and share your images.'
    },
    {
      question: 'Do you offer print products?',
      answer: 'Yes! We offer beautiful albums, canvas prints, and fine art prints. There\'s nothing quite like holding your memories in your hands.'
    }
  ];

  const processSteps = [
    { number: '01', title: 'Inquiry', description: 'Reach out and tell us about your vision and special moments you want to capture.' },
    { number: '02', title: 'Consultation', description: 'We\'ll chat about styling, location options, and plan every detail of your session.' },
    { number: '03', title: 'Session Day', description: 'Relax and enjoy your session while we capture authentic, beautiful moments.' },
    { number: '04', title: 'Gallery Delivery', description: 'Receive your stunning images in a private online gallery within 2-3 weeks.' }
  ];

  return (
    <PageContainer>
      <PhotographyNav pageTitle="Family & Maternity" />
      <Hero>
        <HeroImageSide>
          <ProtectedImage
            src="/images/family/baby/A7T03164.webp"
            alt="Beautiful maternity and family moment"
            fill
            style={{ objectFit: 'cover' }}
            quality={100}
            priority
          />
        </HeroImageSide>
        <HeroContentSide>
          <HeroTextContent>
            <h1>Family & Maternity Photography</h1>
            <p>
              Capturing life's most precious moments with artistry and heart. 
              From the anticipation of new life to the joy of family connections, 
              we create timeless images you'll treasure forever.
            </p>
            <HeroButton onClick={scrollToBooking}>
              Book Your Session
            </HeroButton>
          </HeroTextContent>
        </HeroContentSide>
      </Hero>

      <IntroSection>
        <h2>Moments That Matter</h2>
        <p>
          Every family has a story worth telling. Whether you're expecting a new addition, 
          celebrating your newborn's first days, or simply want to freeze time with those you love most, 
          I'm here to create images that you'll treasure for generations. My approach is relaxed, 
          authentic, and focused on capturing the real connections that make your family unique.
        </p>
      </IntroSection>

      <ImageDivider>
        <DividerImage onClick={() => setSelectedImage('/images/family/baby/A7T02053-2.webp')}>
          <ProtectedImage
            src="/images/family/baby/A7T02053-2.webp"
            alt="Family portrait"
            fill
            style={{ objectFit: 'cover' }}
            quality={90}
          />
        </DividerImage>
        <DividerImage onClick={() => setSelectedImage('/images/family/baby/A7T02669-2.webp')}>
          <ProtectedImage
            src="/images/family/baby/A7T02669-2.webp"
            alt="Baby photography"
            fill
            style={{ objectFit: 'cover' }}
            quality={90}
          />
        </DividerImage>
        <DividerImage onClick={() => setSelectedImage('/images/family/baby/A7T02099-2.webp')}>
          <ProtectedImage
            src="/images/family/baby/A7T02099-2.webp"
            alt="Baby photography"
            fill
            style={{ objectFit: 'cover' }}
            quality={90}
          />
        </DividerImage>
      </ImageDivider>

      <ServicesSection>
        <ServicesImageSide 
          onClick={() => setSelectedImage('/images/family/baby/A7T02606copy.webp')}
          style={{ padding: '8rem', background: '#F5EDE8' }}
        >
          <ProtectedImage
            src="/images/family/baby/A7T02606copy.webp"
            alt="Family photography session"
            fill
            style={{ objectFit: 'contain' }}
            quality={90}
          />
        </ServicesImageSide>
        <ServicesContentSide>
          <ServicesHeader>
            <h2>Photography Sessions</h2>
            <p>Each session is tailored to your family's unique story, capturing your milestone moments with artistry and care.</p>
          </ServicesHeader>
          <PricingCard>
            <PricingHeader>
              <h3>Family & Maternity Session</h3>
              <span className="price">$350</span>
            </PricingHeader>
            <IncludesList>
              <IncludesItem>1.5-2 hour professional photo session</IncludesItem>
              <IncludesItem>Indoor studio or outdoor location</IncludesItem>
              <IncludesItem>Professional editing and color correction</IncludesItem>
              <IncludesItem>30 high-resolution digital images</IncludesItem>
              <IncludesItem>Private online gallery for sharing</IncludesItem>
              <IncludesItem>Print release for personal use</IncludesItem>
              <IncludesItem>Wardrobe and styling consultation</IncludesItem>
              <IncludesItem>Partner & sibling photos included</IncludesItem>
            </IncludesList>
            <AddOnsSection>
              <h4>Add-Ons Available</h4>
              <AddOnsList>
                <AddOnItem><span>Additional edited photos</span><span>$5 / image</span></AddOnItem>
                <AddOnItem><span>Rush delivery (48 hours)</span><span>$75</span></AddOnItem>
                <AddOnItem><span>Premium photo album (20 pages)</span><span>$200</span></AddOnItem>
                <AddOnItem><span>Canvas wall art prints</span><span>from $150</span></AddOnItem>
              </AddOnsList>
            </AddOnsSection>
            <BookButton onClick={scrollToBooking}>Book Your Session</BookButton>
          </PricingCard>
        </ServicesContentSide>
      </ServicesSection>

      <SessionTypesSection>
        <SectionTitle style={{ color: '#F5EDE8' }}>What We Photograph</SectionTitle>
        <SessionTypesGrid>
          {sessionTypes.map((type, index) => (
            <SessionTypeCard key={index}>
              <div className="icon">{type.icon}</div>
              <h3>{type.title}</h3>
              <p>{type.description}</p>
            </SessionTypeCard>
          ))}
        </SessionTypesGrid>
      </SessionTypesSection>

      <GallerySection>
        <SectionTitle>Our Photography Collection</SectionTitle>
        <SectionSubtitle>
          Browse through our gallery of family moments, each one unique and filled with love.
        </SectionSubtitle>
        <GalleryGrid>
          <GalleryImage $span="span 2" onClick={() => setSelectedImage('/images/family/baby/A7T02791-2.webp')}>
            <ProtectedImage
              src="/images/family/baby/A7T02791-2.webp"
              alt="Family moment"
              fill
              style={{ objectFit: 'cover' }}
              quality={85}
            />
          </GalleryImage>
          <GalleryImage onClick={() => setSelectedImage('/images/family/baby/A7T03261.webp')}>
            <ProtectedImage
              src="/images/family/baby/A7T03261.webp"
              alt="Baby portrait"
              fill
              style={{ objectFit: 'cover' }}
              quality={85}
            />
          </GalleryImage>
          <GalleryImage onClick={() => setSelectedImage('/images/family/baby/A7T02760-3.webp')}>
            <ProtectedImage
              src="/images/family/baby/A7T02760-3.webp"
              alt="Maternity photo"
              fill
              style={{ objectFit: 'cover' }}
              quality={85}
            />
          </GalleryImage>
          <GalleryImage onClick={() => setSelectedImage('/images/family/baby/A7T03180copy.webp')}>
            <ProtectedImage
              src="/images/family/baby/A7T03180copy.webp"
              alt="Newborn session"
              fill
              style={{ objectFit: 'cover' }}
              quality={85}
            />
          </GalleryImage>
          <GalleryImage onClick={() => setSelectedImage('/images/family/baby/A7T02513-2.webp')}>
            <ProtectedImage
              src="/images/family/baby/A7T02513-2.webp"
              alt="Family portrait"
              fill
              style={{ objectFit: 'cover' }}
              quality={85}
            />
          </GalleryImage>
          <GalleryImage $span="span 2" onClick={() => setSelectedImage('/images/family/baby/A7T02747-2.webp')}>
            <ProtectedImage
              src="/images/family/baby/A7T02747-2.webp"
              alt="Baby milestone"
              fill
              style={{ objectFit: 'cover' }}
              quality={85}
            />
          </GalleryImage>
        </GalleryGrid>
        <ViewGalleryButton href="/photography/family-maternity/gallery">
          View Full Gallery
        </ViewGalleryButton>
      </GallerySection>



      <ProcessSection>
        <SectionTitle>The Experience</SectionTitle>
        <SectionSubtitle>
          From our first conversation to your gallery reveal, here's what to expect.
        </SectionSubtitle>
        <ProcessGrid>
          {processSteps.map((step, index) => (
            <ProcessStep key={index}>
              <StepNumber>{step.number}</StepNumber>
              <StepContent>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </StepContent>
            </ProcessStep>
          ))}
        </ProcessGrid>
      </ProcessSection>

      <FAQSection>
        <SectionTitle>Common Questions</SectionTitle>
        <SectionSubtitle>
          Everything you need to know about your photography session.
        </SectionSubtitle>
        <FAQGrid>
          {faqs.map((faq, index) => (
            <FAQItem key={index}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </FAQItem>
          ))}
        </FAQGrid>
      </FAQSection>

      <FormSection id="booking-section">
        <FormContentArea>
          <FormWrapper>
            <FormHeader>
              <h3>Book Your Session</h3>
              <p>Ready to capture your family's story? Fill out the form below and I'll be in touch within 24 hours.</p>
            </FormHeader>
            <InlineForm onSubmit={handleFormSubmit}>
              {formStatus && (
                <StatusMessage $type={formStatus.type}>
                  {formStatus.message}
                </StatusMessage>
              )}
              
              <FormGroup>
              <FormLabel htmlFor="name">Your Name</FormLabel>
              <FormInput
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="Enter your full name"
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <FormInput
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                placeholder="your@email.com"
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="phone">Phone Number</FormLabel>
              <FormInput
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                placeholder="(555) 123-4567"
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="sessionType">Session Type</FormLabel>
              <FormSelect
                id="sessionType"
                name="sessionType"
                value={formData.sessionType}
                onChange={handleFormChange}
                required
              >
                <option value="">Select a session type</option>
                <option value="maternity">Maternity Session</option>
                <option value="newborn">Newborn Session</option>
                <option value="family">Family Portrait</option>
                <option value="milestone">Baby Milestone Session</option>
                <option value="other">Other / Not Sure</option>
              </FormSelect>
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="date">Preferred Date</FormLabel>
              <FormInput
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleFormChange}
              />
            </FormGroup>

            <FormDivider />

            <FormGroup $fullWidth>
              <FormLabel htmlFor="message">Tell Me About Your Session</FormLabel>
              <FormTextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                placeholder="Share any details about your vision, due date, family size, or questions you have..."
                required
              />
            </FormGroup>

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending Your Inquiry...' : 'Send Inquiry'}
            </SubmitButton>
          </InlineForm>
        </FormWrapper>
        </FormContentArea>
      </FormSection>

      <Footer>
        <FooterContent>
          <div>
            <h3>Family & Maternity Photography</h3>
            <p>
              Specializing in capturing the beautiful milestones of family life. 
              From maternity to newborn to growing families, every moment is precious.
            </p>
          </div>
          <div>
            <h3>Contact</h3>
            <ul>
              <li>Vancouver, BC</li>
              <li>(672) 338-9307</li>
              <li><a href="mailto:bycamilalonart@gmail.com">bycamilalonart@gmail.com</a></li>
            </ul>
          </div>
          <div>
            <h3>Quick Links</h3>
            <ul>
              <li><Link href="/photography/family-maternity/gallery">View Gallery</Link></li>
              <li><Link href="/photography/pets">Pet Photography</Link></li>
              <li><Link href="/photography/wedding-couples">Wedding Photography</Link></li>
            </ul>
          </div>
        </FooterContent>
      </Footer>

      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(undefined)}
          src={selectedImage}
          alt="Full size image"
        />
      )}
    </PageContainer>
  );
}
