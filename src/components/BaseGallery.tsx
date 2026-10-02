'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import Image from 'next/image';
import ImageModal from './ImageModal';
import { useTranslation } from '../i18n/TranslationContext';
import LocalizedLink from '@/i18n/LocalizedLink';

const GalleryContainer = styled.div`
  width: 100%;
  padding: ${theme.spacing['2xl']};
  margin-top: 60px;
  background: rgb(255, 255, 255);
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xl};
  }
`;

const BackButton = styled(LocalizedLink)`
  position: fixed;
  top: ${theme.spacing.xl};
  left: ${theme.spacing.sm};
  color: black;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  font-size: 1rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  z-index: 10;
  transition: all 0.3s ease;
  border-radius: ${theme.borderRadius.md};
  backdrop-filter: blur(4px);
  
  &:before {
    content: '←';
    font-size: 1.2rem;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateX(-4px);
    color: grey;
    &:before {
      transform: translateX(-4px);
    }
  }

  @media (max-width: ${theme.breakpoints.md}) {
    top: ${theme.spacing.xs};
    left: ${theme.spacing.xs};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    font-size: 0.9rem;
  }
`;

const MasonryGrid = styled.div`
  columns: 3;
  column-gap: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.lg}) {
    columns: 2;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    columns: 1;
  }
`;

const GalleryItem = styled.button`
  display: block;
  width: 100%;
  padding: 0;
  text-align: inherit;
  break-inside: avoid;
  margin-bottom: ${theme.spacing.lg};
  cursor: pointer;
  transition: transform 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: ${theme.borderRadius.md};
  }
`;

const Watermark = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
  padding: 3px 6px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  pointer-events: none;
`;

export interface BaseGalleryProps {
  images: { src: string; alt: string }[];
  backLink: string;
  backText: string;
  title?: string;
}

const BaseGallery: React.FC<BaseGalleryProps> = ({ images, backLink, backText, title }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const { t } = useTranslation();

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handlePrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  return (
    <>
      <BackButton href={backLink}>
        {backText}
      </BackButton>
      <GalleryContainer>
        {title && <h1 style={{ color: '#26221e', textAlign: 'center' }}>{title}</h1>}
        <MasonryGrid>
          {images.map((image, index) => (
            <GalleryItem
              key={image.src}
              type="button"
              onClick={() => handleImageClick(index)}
              aria-label={`${t('sharedContent.images.viewLarger')}: ${image.alt}`}
              aria-haspopup="dialog"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={600}
                quality={85}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{ width: '100%', height: 'auto' }}
              />
              <Watermark aria-hidden="true">© Camilalonart</Watermark>
            </GalleryItem>
          ))}
        </MasonryGrid>

        {selectedImage !== null && (
          <ImageModal
            isOpen={selectedImage !== null}
            onClose={handleClose}
            onPrevious={handlePrevious}
            onNext={handleNext}
            src={images[selectedImage].src}
            alt={images[selectedImage].alt}
          />
        )}
      </GalleryContainer>
    </>
  );
};

export default BaseGallery; 