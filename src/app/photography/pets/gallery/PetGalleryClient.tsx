'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../../../styles/theme';
import PetGallery from '../../../../components/PetGallery';
import { getPetImages } from '../../../../utils/imageUtils';

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: rgb(26, 20, 15);
`;

export default function PetGalleryClient() {
  const [images, setImages] = useState<{ src: string; alt: string }[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages = await getPetImages();
      setImages(loadedImages);
    };
    loadImages();
  }, []);
  
  return (
    <PageContainer>
      <PetGallery images={images} />
    </PageContainer>
  );
} 