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
  { src: '/images/headshots/sample1.jpg', alt: 'Headshot 1' },
  { src: '/images/headshots/sample2.jpg', alt: 'Headshot 2' },
  { src: '/images/headshots/sample3.jpg', alt: 'Headshot 3' },
  { src: '/images/headshots/sample4.jpg', alt: 'Headshot 4' },
  // Add more images as needed
];

export default function HeadshotsGalleryPage() {
  return (
    <PageContainer>
      <BaseGallery images={images} />
    </PageContainer>
  );
} 