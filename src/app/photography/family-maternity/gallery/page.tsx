import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../../styles/theme';
import BaseGallery from '../../../../components/BaseGallery';

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: rgb(26, 20, 15);
`;

const images = [
  { src: '/images/family-maternity/sample1.jpg', alt: 'Family/Maternity 1' },
  { src: '/images/family-maternity/sample2.jpg', alt: 'Family/Maternity 2' },
  { src: '/images/family-maternity/sample3.jpg', alt: 'Family/Maternity 3' },
  { src: '/images/family-maternity/sample4.jpg', alt: 'Family/Maternity 4' },
  // Add more images as needed
];

export default function FamilyMaternityGalleryPage() {
  return (
    <PageContainer>
      <BaseGallery images={images} />
    </PageContainer>
  );
} 