'use client';

import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../../styles/theme';
import WeddingGallery from '../../../../components/WeddingGallery';

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${theme.colors.background.main};
`;

// You can move this to a data file later
const images = [
  { src: '/images/wedding/A7T09955-2.jpg', alt: 'Wedding photo 1' },
  { src: '/images/wedding/A7T00849.jpg', alt: 'Wedding photo 2' },
  { src: '/images/wedding/A7T01233Crop.jpg', alt: 'Wedding photo 3' },
  { src: '/images/wedding/A7T01413.jpg', alt: 'Wedding photo 4' },
  { src: '/images/wedding/A7T09634.jpg', alt: 'Wedding photo 5' },
  { src: '/images/wedding/A7T09834.jpg', alt: 'Wedding photo 6' },
  { src: '/images/wedding/A7T09612.jpg', alt: 'Wedding photo 7' },
  { src: '/images/wedding/A7T09940.jpg', alt: 'Wedding photo 8' },
  // Add more images as needed
];

export default function WeddingGalleryPage() {
  return (
    <PageContainer>
      <WeddingGallery images={images} />
    </PageContainer>
  );
} 