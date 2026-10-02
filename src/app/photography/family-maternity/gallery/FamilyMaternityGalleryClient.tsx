'use client';

import React from 'react';
import styled from 'styled-components';
import BaseGallery from '../../../../components/BaseGallery';
import { familyGalleryImages, maternityGalleryImages } from '../../../../utils/imageUtils';
import { useTranslation } from '../../../../i18n/TranslationContext';

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
  const { locale } = useTranslation();
  const isSpanish = locale === 'es';
  const images = [
    ...familyGalleryImages.map((image, index) => ({
      ...image,
      alt: isSpanish ? `Retrato familiar e infantil ${index + 1} de Camilalonart` : image.alt,
    })),
    ...maternityGalleryImages.map((image, index) => ({
      ...image,
      alt: isSpanish ? `Retrato de maternidad ${index + 1} de Camilalonart` : image.alt,
    })),
  ];
  
  return (
    <PageContainer>
      <GalleryHeading>
        <h1>{isSpanish ? 'Galería de familia y maternidad' : 'Family & Maternity Gallery'}</h1>
        <p>{isSpanish
          ? 'Retratos de familia e infancia que celebran los pequeños momentos compartidos.'
          : 'Family and childhood portraits celebrating the small moments shared together.'}</p>
        {maternityGalleryImages.length === 0 && (
          <p>{isSpanish
            ? 'Esta colección muestra sesiones familiares. Consulta sobre sesiones de maternidad en la página del servicio.'
            : 'This collection features family sessions. Ask about maternity sessions on the service page.'}</p>
        )}
      </GalleryHeading>
      <BaseGallery 
        images={images} 
        backLink="/photography/family-maternity"
        backText={isSpanish ? 'Volver a familia y maternidad' : 'Back to Family & Maternity'}
      />
    </PageContainer>
  );
} 