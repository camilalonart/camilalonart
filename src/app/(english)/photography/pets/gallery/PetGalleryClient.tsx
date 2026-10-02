'use client';

import React from 'react';
import styled from 'styled-components';
import PetGallery from "@/components/PetGallery";
import { petGalleryImages } from "@/utils/imageUtils";
import { useTranslation } from '@/i18n/TranslationContext';

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: rgb(26, 20, 15);
`;

export default function PetGalleryClient() {
  const { t } = useTranslation();
  const images = petGalleryImages.map((image, index) => ({
    ...image,
    alt: `${t('photographyContent.pets.portrait')} ${index + 1}`,
  }));
  
  return (
    <PageContainer>
      <PetGallery images={images} />
    </PageContainer>
  );
} 