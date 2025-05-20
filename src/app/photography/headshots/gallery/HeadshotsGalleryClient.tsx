'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../../../styles/theme';
import BaseGallery from '../../../../components/BaseGallery';
import { getHeadshotImages } from '../../../../utils/imageUtils';

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: rgb(26, 20, 15);
`;

export default function HeadshotsGalleryClient() {
  const [images, setImages] = useState<{ src: string; alt: string }[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages = await getHeadshotImages();
      setImages(loadedImages);
    };
    loadImages();
  }, []);
  
  return (
    <PageContainer>
      <BaseGallery 
        images={images} 
        backLink="/photography/headshots"
        backText="Back to Headshots"
      />
    </PageContainer>
  );
} 