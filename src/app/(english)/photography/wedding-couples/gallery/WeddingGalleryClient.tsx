'use client';

import React from 'react';
import styled from 'styled-components';
import WeddingGallery from "@/components/WeddingGallery";
import { weddingGalleryImages } from "@/utils/imageUtils";
import { useTranslation } from '@/i18n/TranslationContext';

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: rgb(255, 255, 255);
`;

export default function WeddingGalleryClient() {
  const { t } = useTranslation();
  const images = weddingGalleryImages.map((image, index) => ({
    ...image,
    alt: `${t('photographyContent.wedding.moment')} ${index + 1}`,
  }));
  
  return (
    <PageContainer>
      <WeddingGallery images={images} />
    </PageContainer>
  );
} 