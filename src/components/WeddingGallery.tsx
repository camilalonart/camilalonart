import React from 'react';
import BaseGallery from './BaseGallery';

interface WeddingGalleryProps {
  images: { src: string; alt: string }[];
}

const WeddingGallery: React.FC<WeddingGalleryProps> = ({ images }) => {
  return (
    <BaseGallery
      images={images}
      backLink="/photography/wedding-couples"
      backText="Back to Wedding & Couples"
    />
  );
};

export default WeddingGallery; 