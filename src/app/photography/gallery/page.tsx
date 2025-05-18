'use client';

import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import Gallery from '../../../components/Gallery';

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${theme.colors.background.main};
`;

const Header = styled.header`
  text-align: center;
  padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  
  h1 {
    font-size: clamp(1.8rem, 4vw, 3rem);
    color: #796B5F;
    margin-bottom: ${theme.spacing.lg};
    font-weight: 300;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }
  
  p {
    font-size: clamp(1rem, 1.8vw, 1.4rem);
    color: ${theme.colors.text.secondary};
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.8;
  }
`;

// Sample gallery images - you'll need to replace these with your actual images
const galleryImages = [
  { src: '/images/wedding/A7T09955-2.jpg', alt: 'Wedding couple portrait' },
  { src: '/images/wedding/A7T00849.jpg', alt: 'Couple portrait' },
  { src: '/images/wedding/A7T01233Crop.jpg', alt: 'Hands with rings' },
  { src: '/images/wedding/A7T01413.jpg', alt: 'Couple kissing' },
  { src: '/images/wedding/A7T09634.jpg', alt: 'Bride and ring' },
  { src: '/images/wedding/A7T09834.jpg', alt: 'Wedding flowers' },
  { src: '/images/wedding/A7T09612.jpg', alt: 'Bride portrait' },
  { src: '/images/wedding/A7T09940.jpg', alt: 'Couple portrait' },
  // Add more images as needed
];

export default function GalleryPage() {
  return (
    <PageContainer>
      <Header>
        <h1>Photo Gallery</h1>
        <p>
          A collection of cherished moments and beautiful stories. Each image represents a unique love story, 
          carefully captured to preserve the emotion and authenticity of the moment.
        </p>
      </Header>
      <Gallery images={galleryImages} />
    </PageContainer>
  );
} 