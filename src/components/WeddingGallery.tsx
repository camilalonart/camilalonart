import React from 'react';
import BaseGallery from './BaseGallery';
import { useTranslation } from '../i18n/TranslationContext';

interface WeddingGalleryProps {
  images: { src: string; alt: string }[];
}

const WeddingGallery: React.FC<WeddingGalleryProps> = ({ images }) => {
  const { locale } = useTranslation();
  return (
    <BaseGallery
      images={images}
      backLink="/photography/wedding-couples"
      backText={locale === 'es' ? 'Volver a bodas y parejas' : 'Back to Wedding & Couples'}
      title={locale === 'es' ? 'Galería de bodas y parejas' : 'Wedding & Couples Gallery'}
    />
  );
};

export default WeddingGallery; 