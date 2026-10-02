import React from 'react';
import BaseGallery from './BaseGallery';
import { useTranslation } from '../i18n/TranslationContext';

interface PetGalleryProps {
  images: { src: string; alt: string }[];
}

const PetGallery: React.FC<PetGalleryProps> = ({ images }) => {
  const { locale } = useTranslation();
  return (
    <BaseGallery
      images={images}
      backLink="/photography/pets"
      backText={locale === 'es' ? 'Volver a fotografía de mascotas' : 'Back to Pet Photography'}
      title={locale === 'es' ? 'Galería de mascotas' : 'Pet Photography Gallery'}
    />
  );
};

export default PetGallery; 