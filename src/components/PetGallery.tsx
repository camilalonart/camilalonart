import React from 'react';
import BaseGallery from './BaseGallery';

interface PetGalleryProps {
  images: { src: string; alt: string }[];
}

const PetGallery: React.FC<PetGalleryProps> = ({ images }) => {
  return (
    <BaseGallery
      images={images}
      backLink="/photography/pets"
      backText="Back to Pet Photography"
    />
  );
};

export default PetGallery; 