'use client';

import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../../styles/theme';
import PetGallery from '../../../../components/PetGallery';

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: rgb(26, 20, 15);
`;

// You can move this to a data file later
const images = [
  { src: '/images/pets/A7T05223-horizontal.jpg', alt: 'Pet photo 1' },
  { src: '/images/pets/sample2.jpg', alt: 'Pet photo 2' },
  { src: '/images/pets/sample3.jpg', alt: 'Pet photo 3' },
  { src: '/images/pets/sample4.jpg', alt: 'Pet photo 4' },
  { src: '/images/pets/sample5.jpg', alt: 'Pet photo 5' },
  // Add more images as needed
];

export default function PetGalleryPage() {
  return (
    <PageContainer>
      <PetGallery images={images} />
    </PageContainer>
  );
} 