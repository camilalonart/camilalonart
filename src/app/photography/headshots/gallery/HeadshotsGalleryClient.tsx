'use client';

import React from 'react';
import styled from 'styled-components';
import BaseGallery from '../../../../components/BaseGallery';
import { headshotGalleryImages } from '../../../../utils/imageUtils';
import { useTranslation } from '../../../../i18n/TranslationContext';

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #FFFFFF;
  color: #252525;
`;

const GalleryHeading = styled.header`
  padding: 6rem 1.5rem 0;
  max-width: 850px;
  margin-inline: auto;
  text-align: center;
  h1 { font-family: var(--font-montserrat), sans-serif; font-size: clamp(1.8rem, 5vw, 3rem); }
  p { font-size: 0.95rem; line-height: 1.8; }
`;

export default function HeadshotsGalleryClient() {
  const { locale } = useTranslation();
  const isSpanish = locale === 'es';
  const images = headshotGalleryImages.map((image, index) => ({
    ...image,
    alt: isSpanish ? `Retrato profesional ${index + 1} de Camilalonart` : image.alt,
  }));
  
  return (
    <PageContainer>
      <GalleryHeading>
        <h1>{isSpanish ? 'Galería de retratos profesionales' : 'Professional Headshots Gallery'}</h1>
        <p>{isSpanish
          ? 'Retratos de estudio y en exteriores: una selección de fotografía profesional en Vancouver.'
          : 'Studio and on-location portraits: a selection of professional photography in Vancouver.'}</p>
      </GalleryHeading>
      <BaseGallery 
        images={images} 
        backLink="/photography/headshots"
        backText={isSpanish ? 'Volver a retratos profesionales' : 'Back to Headshots'}
      />
    </PageContainer>
  );
} 