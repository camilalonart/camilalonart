'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import ContactForm from '../../../components/ContactForm';
import ProtectedImage from '../../../components/ProtectedImage';
import WeddingInquiryForm from '../../../components/WeddingInquiryForm';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const PageContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  overflow-x: hidden;
  position: relative;

  * {
    box-sizing: border-box;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    overflow-x: hidden;
  }
`;

const IntroSection = styled.section`
  padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
  
  p {
    font-size: clamp(1rem, 1.4vw, 1.2rem);
    line-height: 1.8;
    color: ${theme.colors.text.secondary};
    font-weight: 300;
    letter-spacing: 0.02em;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['lg']} ${theme.spacing.md};
    
    p {
      font-size: clamp(0.9rem, 1.5vw, 1.1rem);
    }
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.xl} ${theme.spacing.lg};
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
    height: 70vh;
    padding: ${theme.spacing.sm};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    height: 60vh;
    min-height: 400px;
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
    font-size: clamp(1.8rem, 4vw, 3rem);
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
    margin: 0 auto ${theme.spacing.xl} auto;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xl};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.lg};
    
    h1 {
      font-size: 1.6rem;
      letter-spacing: 0.15em;
    }
    
    h3 {
      font-size: 1.3rem;
      letter-spacing: 0.15em;
    }
      
    p {
      font-size: 0.9rem;
    }
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
    margin-bottom: ${theme.spacing['sm']};
    text-align: center;
    color: #796B5F;
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

  @media (max-width: ${theme.breakpoints.sm}) {
    gap: ${theme.spacing.md};
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
    color: #796B5F;
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
    color: #796B5F;
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
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: transparent;
  border: 2px solid ${theme.colors.primary.main};
  color: ${theme.colors.primary.main};
  font-size: 1rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border-radius: ${theme.borderRadius.sm};

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${theme.colors.primary.main};
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 0;
  }

  span {
    position: relative;
    z-index: 1;
    transition: color 0.3s ease;
    display: block;
  }

  &:hover {
    &:before {
      transform: translateX(0);
    }
    
    span {
      color: white;
    }
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 0.9rem;
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
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
  padding: 0 ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.md}) {
    height: 300px;
    margin: ${theme.spacing['2xl']} 0;
    gap: ${theme.spacing.sm};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    height: 400px;
    margin: ${theme.spacing.xl} 0;
    display: block;
  }
`;

const DividerImage = styled.div<{ $span?: number; $isMiddle?: boolean }>`
  grid-column: span ${props => props.$span || 4};
  position: relative;
  overflow: hidden;
  height: 100%;

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
    height: 400px;
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
    color: #796B5F;
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

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

const FAQItem = styled.div`
  h3 {
    color: #796B5F;
    margin-bottom: ${theme.spacing.md};
    font-size: clamp(1.1rem, 2vw, ${theme.typography.fontSize.xl});
  }

  p {
    line-height: 1.6;
    color: ${theme.colors.text.secondary};
    font-size: clamp(0.9rem, 1.5vw, 1rem);
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    h3 {
      font-size: 1.1rem;
    }
    
    p {
      font-size: 0.9rem;
    }
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
      font-size: clamp(1.1rem, 2vw, ${theme.typography.fontSize.xl});
      margin-bottom: ${theme.spacing.xl};
      font-weight: 500;
    }

    p, a {
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.8;
      margin-bottom: ${theme.spacing.md};
      font-size: clamp(0.9rem, 1.5vw, 1rem);
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
    font-size: clamp(0.8rem, 1.2vw, 0.9rem);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing.lg};

    .footer-content {
      gap: ${theme.spacing.xl};
      padding: 0;
    }
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.xl} ${theme.spacing.md};

    .footer-content {
      gap: ${theme.spacing.lg};
    }

    .footer-section {
      h3 {
        margin-bottom: ${theme.spacing.lg};
      }
    }

    .copyright {
      margin-top: ${theme.spacing['2xl']};
      padding-top: ${theme.spacing.lg};
    }
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
    margin: ${theme.spacing.sm};
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

const SEOFooter = styled.div`
  background: ${theme.colors.background.dark};
  padding: ${theme.spacing.lg} 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);

  .seo-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    color: rgba(255, 255, 255, 0.4);
    font-size: clamp(0.75rem, 1.2vw, 0.8rem);
    line-height: 1.6;
    padding: 0 ${theme.spacing.xl};

    h2 {
      font-size: clamp(0.75rem, 1.2vw, 0.8rem);
      font-weight: normal;
      margin-bottom: ${theme.spacing.md};
      color: rgba(255, 255, 255, 0.4);
      text-transform: none;
    }

    p {
      margin-bottom: ${theme.spacing.sm};
    }
  }

  @media (max-width: ${theme.breakpoints.md}) {
    .seo-content {
      padding: 0 ${theme.spacing.lg};
    }
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    .seo-content {
      padding: 0 ${theme.spacing.md};
    }
  }
`;

const TestimonialSection = styled.section`
  padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  background: ${theme.colors.background.light};
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  }
`;

const TestimonialContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['2xl']};
  align-items: center;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
  }
`;

const TestimonialContent = styled.div`
  padding: ${theme.spacing.xl};

  .stars {
    color: #FFD700;
    font-size: 1.5rem;
    margin-bottom: ${theme.spacing.lg};
  }

  .quote {
    font-size: clamp(1.2rem, 2vw, 1.6rem);
    line-height: 1.6;
    color: ${theme.colors.text.primary};
    font-weight: 300;
    margin-bottom: ${theme.spacing.xl};
    font-style: italic;
  }

  .author {
    font-size: clamp(0.9rem, 1.5vw, 1rem);
    color: ${theme.colors.text.secondary};
    font-weight: 500;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.lg} 0;
    text-align: center;
  }
`;

const TestimonialImage = styled.div`
  position: relative;
  height: 600px;
  overflow: hidden;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.lg};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    height: 400px;
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

const GalleryLink = styled.div`
  text-align: center;
  padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  background: ${theme.colors.background.light};

  h2 {
    font-size: clamp(1.4rem, 2.6vw, 2.2rem);
    color: #796B5F;
    margin-bottom: ${theme.spacing.xl};
    font-weight: 600;
  }

  p {
    font-size: clamp(1rem, 1.8vw, 1.4rem);
    color: ${theme.colors.text.secondary};
    margin-bottom: ${theme.spacing['2xl']};
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  a {
    display: inline-block;
    padding: ${theme.spacing.lg} ${theme.spacing['2xl']};
    background: transparent;
    border: 2px solid ${theme.colors.primary.main};
    color: ${theme.colors.primary.main};
    font-size: 1rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    
    &:hover {
      background: ${theme.colors.primary.main};
      color: white;
      transform: translateY(-2px);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
`;

const InquirySection = styled.section`
  padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  background: ${theme.colors.background.light};
  
  h2 {
    text-align: center;
    color: #796B5F;
    font-size: clamp(1.4rem, 2.6vw, 2.2rem);
    font-weight: 600;
    margin-bottom: ${theme.spacing.lg};
  }

  p {
    text-align: center;
    font-size: clamp(1rem, 1.8vw, 1.4rem);
    color: ${theme.colors.text.secondary};
    max-width: 800px;
    margin: 0 auto ${theme.spacing['2xl']};
    line-height: 1.6;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  }
`;

const InquiryFormContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  background: white;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.lg};
  overflow: hidden;
  position: relative;
`;

const SubmitButtonWrapper = styled.div<{ $embedded?: boolean }>`
  ${props => props.$embedded ? `
    padding: ${theme.spacing.lg} 0;
    background: transparent;
    z-index: 10;
  ` : ''}
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
          <h2>Elopement & Couples Photography</h2>
          <p>Vancouver-based  photography for elopements, engagements, and love stories.</p>
          <HeroButton onClick={() => handleBookClick('Wedding Photography')}>Inquire Now</HeroButton>
        </HeroContent>
      </Hero>

      <IntroSection>
        <p>
          I'm a Vancouver-based photographer capturing love stories with depth and emotion, I'm here to preserve your most meaningful moments.<br/><br/>
          Whether it's the intimate emotion of an elopement, the joy of an engagement, or a shared moment on an ordinary day... these are once in a lifetime memories.
          They deserve to be captured with care and creativity, so you can relive them, share them, and pass them down for years to come.
          <br/>
          <br/>
          - Camila Londono
        </p>
      </IntroSection>

      <SectionDivider>
        <DividerImage $span={4}>
          <ProtectedImage
            src="/images/wedding/A7T00021.jpg"
            alt="Couple portrait"
            height="100%"
            quality={100}
          />
        </DividerImage>
        <DividerImage $span={3} $isMiddle>
          <ProtectedImage
            src="/images/wedding/A7T01233Crop.jpg"
            alt="Hands with rings"
            height="100%"
            quality={100}
          />
        </DividerImage>
        <DividerImage $span={5}>
          <ProtectedImage
            src="/images/wedding/A7T09955.jpg"
            alt="Couple kissing"
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
                description: "Whether it's right after the proposal or sometime in the weeks that follow, I'll help you to capture the moment you said 'yes'.",
                features: ['1.5-hour session', '30 edited, high-resolution images', 'Pre-session consultation', 'Add-on: All unedited images +$100', 'Add-on: Additional location +$100'],
                action: 'Inquire Now',
                package: 'Engagement'
              },
              {
                title: 'Couples Sessions',
                price: '$250',
                description: "Whether it's an anniversary, a weekend away, or just the way you are right now...",
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
                    <BookButton onClick={() => handleBookClick(service.package)}>
                      <span>{service.action}</span>
                    </BookButton>
                  </div>
                </div>
              </ServiceCard>
            ))}
          </Carousel>
          <CarouselStyles />
        </ServicesSection>
      </Section>

      <SectionDivider>
        <DividerImage $span={3} $isMiddle onClick={() => handleImageClick('/images/wedding/A7T09634.jpg')}>
          <ProtectedImage
            src="/images/wedding/A7T09634.jpg"
            alt="Bride and ring"
            height="110%"
            quality={100}
          />
        </DividerImage>
        <DividerImage $span={6} onClick={() => handleImageClick('/images/wedding/A7T09834.jpg')}>
          <ProtectedImage
            src="/images/wedding/A7T09834.jpg"
            alt="Flowers"
            height="100%"
            quality={100}
          />
        </DividerImage>
        <DividerImage $span={3} onClick={() => handleImageClick('/images/wedding/A7T09612.jpg')}>
          <ProtectedImage
            src="/images/wedding/A7T09612.jpg"
            alt="Bride"
            height="110%"
            quality={100}
          />
        </DividerImage>
      </SectionDivider>

      <ProcessSection>
        <h2>Our Process</h2>
        <ProcessContainer>
          <ProcessSteps>
            <ProcessStep>
              <StepNumber>1</StepNumber>
              <StepContent>
                <h3>Reach Out</h3>
                <p>Send me a message through the contact form with a few details about what you're planning. I'll reply with next steps</p>
              </StepContent>
            </ProcessStep>
            <ProcessStep>
              <StepNumber>2</StepNumber>
              <StepContent>
                <h3>Plan</h3>
                <p>We get to know you and your vision. Locations, styles, mood boards</p>
              </StepContent>
            </ProcessStep>
            <ProcessStep>
              <StepNumber>3</StepNumber>
              <StepContent>
                <h3>Shoot</h3>
                <p>Professional equipment. I'll gently direct when needed, but mostly capture how things unfold naturally.</p>
              </StepContent>
            </ProcessStep>
            <ProcessStep>
              <StepNumber>4</StepNumber>
              <StepContent>
                <h3>Edit</h3>
                <p>High-quality post-processing</p>
              </StepContent>
            </ProcessStep>
            <ProcessStep>
              <StepNumber>5</StepNumber>
              <StepContent>
                <h3>Deliver</h3>
                <p>1–2 weeks, you'll receive a private online gallery with your edited images</p>
              </StepContent>
            </ProcessStep>
          </ProcessSteps>
        </ProcessContainer>
      </ProcessSection>

      <SectionDivider>
        <DividerImage $span={4}>
          <ProtectedImage
            src="/images/wedding/A7T01425.jpg"
            alt="Signing"
            height="100%"
            quality={100}
          />
        </DividerImage>
        <DividerImage $span={3} $isMiddle>
          <ProtectedImage
            src="/images/wedding/A7T01396.jpg"
            alt="Couple portrait"
            height="100%"
            quality={100}
          />
        </DividerImage>
        <DividerImage $span={5}>
          <ProtectedImage
            src="/images/wedding/A7T01413-2.jpg"
            alt="Bride and best friend"
            height="100%"
            quality={100}
          />
        </DividerImage>
      </SectionDivider>

      <GalleryLink>
        <h2>View Our Gallery</h2>
        <p>
          Explore our complete collection of wedding, engagement, and couples photography. 
          Each image tells a unique story of love and connection.
        </p>
        <a href="/photography/wedding-couples/gallery/">View Full Gallery</a>
      </GalleryLink>

      <SectionDivider>
        <DividerImage $span={4}>
          <ProtectedImage
            src="/images/wedding/A7T00849.jpg"
            alt="Couple portrait"
            height="100%"
            quality={100}
          />
        </DividerImage>
        <DividerImage $span={3} $isMiddle>
          <ProtectedImage
            src="/images/wedding/A7T00765.jpg"
            alt="Signing"
            height="100%"
            quality={100}
          />
        </DividerImage>
        <DividerImage $span={5}>
          <ProtectedImage
            src="/images/wedding/A7T00438.jpg"
            alt="Bride and best friend"
            height="100%"
            quality={100}
          />
        </DividerImage>
      </SectionDivider>

      <TestimonialSection>
        <TestimonialContainer>
          <TestimonialContent>
            <div className="stars">★★★★★</div>
            <div className="quote">
              "Every photo felt like us. You didn't just capture the day—you captured the emotion."
            </div>
            <div className="author">
              — Emily & Luca (Tofino Elopement)
            </div>
          </TestimonialContent>
          <TestimonialImage>
            <ProtectedImage
              src="/images/wedding/A7T09940.jpg"
              alt="Emily and Luca's elopement"
              height="100%"
              quality={100}
            />
          </TestimonialImage>
        </TestimonialContainer>
      </TestimonialSection>

      <InquirySection>
        <InquiryFormContainer>
          <WeddingInquiryForm 
            isOpen={true} 
            onClose={() => {}} 
            selectedPackage={undefined}
            embedded={true}
            useIframe={false}
          />
        </InquiryFormContainer>
      </InquirySection>

      <Footer>
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contact</h3>
            <p>Let's create something beautiful together</p>
            <ul>
              <li><a href="mailto:camilalonart@gmail.com">camilalonart@gmail.com</a></li>
              <li><a href="tel:+1 672-338-9307">+1 (672) 338-9307</a></li>
              <li>Based in Vancouver, BC</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Follow Along</h3>
            <ul>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
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
            quality={100}
            objectFit="contain"
          />
        </ImageModal>
      )}

      {isModalOpen && (
        <WeddingInquiryForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedPackage={selectedPackage}
          embedded={false}
          useIframe={false}
        />
      )}
    </PageContainer>
  );
} 