'use client';

import React from 'react';
import styled from 'styled-components';
import BaseGallery from "@/components/BaseGallery";
import { familyGalleryImages, maternityGalleryImages } from "@/utils/imageUtils";
import { useTranslation } from "@/i18n/TranslationContext";

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #FFFFFF;
  color: #3C4938;
`;

const GalleryHeading = styled.header`
  padding: 6rem 1.5rem 0;
  max-width: 850px;
  margin-inline: auto;
  text-align: center;
  h1 { font-size: clamp(2rem, 5vw, 3.5rem); }
  p { font-size: 0.95rem; line-height: 1.8; }
`;

export default function FamilyMaternityGalleryClient() {
  const { t } = useTranslation();
  const f = (key: string) => t(`photographyContent.family.${key}`);
  const images = [
    ...familyGalleryImages.map((image, index) => ({
      ...image,
      alt: `${f('galleryFamilyAlt')} ${index + 1} — Camilalonart`,
    })),
    ...maternityGalleryImages.map((image, index) => ({
      ...image,
      alt: `${f('galleryMaternityAlt')} ${index + 1} — Camilalonart`,
    })),
  ];
  
  return (
    <PageContainer>
      <GalleryHeading>
        <h1>{f('galleryTitle')}</h1>
        <p>{f('galleryDescription')}</p>
        {maternityGalleryImages.length === 0 && (
          <p>{f('galleryNote')}</p>
        )}
      </GalleryHeading>
      <BaseGallery 
        images={images} 
        backLink="/photography/family-maternity"
        backText={f('galleryBack')}
      />
    </PageContainer>
  );
} 