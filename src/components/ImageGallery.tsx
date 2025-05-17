import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import SecureImage from './SecureImage';

interface Image {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  span?: number;
}

interface ImageGalleryProps {
  images: Image[];
  columns?: number;
  gap?: string;
  aspectRatio?: string;
  lightboxEnabled?: boolean;
}

const GalleryGrid = styled.div<{ columns: number; gap: string }>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  gap: ${props => props.gap};
  width: 100%;
  
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(${props => Math.max(2, props.columns - 1)}, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ImageContainer = styled.div<{ span?: number; aspectRatio: string }>`
  position: relative;
  grid-column: span ${props => props.span || 1};
  aspect-ratio: ${props => props.aspectRatio};
  cursor: pointer;
  overflow: hidden;
  border-radius: ${theme.borderRadius.md};
  transition: ${theme.transitions.default};
  
  &:hover {
    transform: scale(1.02);
    
    .overlay {
      opacity: 1;
    }
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-column: span 1;
  }
`;

const ImageOverlay = styled.div.attrs({ className: 'overlay' })`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: ${theme.transitions.default};
  
  svg {
    width: 32px;
    height: 32px;
    color: ${theme.colors.text.light};
  }
`;

const Lightbox = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing['2xl']};
`;

const LightboxContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
`;

const LightboxControls = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 ${theme.spacing.md};
  pointer-events: none;
  
  button {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    color: ${theme.colors.text.light};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    pointer-events: auto;
    transition: ${theme.transitions.default};
    
    &:hover {
      background: rgba(0, 0, 0, 0.8);
    }
    
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${theme.spacing.xl};
  right: ${theme.spacing.xl};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: ${theme.colors.text.light};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ${theme.transitions.default};
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const StyledSecureImage = styled(SecureImage)`
  &.gallery-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &.lightbox-image {
    max-width: 90vw;
    max-height: 90vh;
    width: auto;
    height: auto;
    object-fit: contain;
  }
`;

export default function ImageGallery({
  images,
  columns = 3,
  gap = theme.spacing.md,
  aspectRatio = '3/2',
  lightboxEnabled = true
}: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    if (lightboxEnabled) {
      setCurrentImageIndex(index);
      setLightboxOpen(true);
    }
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const showNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const showPrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <GalleryGrid columns={columns} gap={gap}>
        {images.map((image, index) => (
          <ImageContainer
            key={image.src}
            span={image.span}
            aspectRatio={aspectRatio}
            onClick={() => openLightbox(index)}
          >
            <StyledSecureImage
              src={image.src}
              alt={image.alt}
              className="gallery-image"
              priority={index < 6}
              quality={85}
            />
            <ImageOverlay>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </ImageOverlay>
          </ImageContainer>
        ))}
      </GalleryGrid>

      {lightboxOpen && (
        <Lightbox onClick={closeLightbox}>
          <LightboxContent onClick={(e) => e.stopPropagation()}>
            <StyledSecureImage
              src={images[currentImageIndex].src}
              alt={images[currentImageIndex].alt}
              className="lightbox-image"
              priority
              quality={90}
            />
            <LightboxControls>
              <button onClick={showPrevImage}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button onClick={showNextImage}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </LightboxControls>
            <CloseButton onClick={closeLightbox}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </CloseButton>
          </LightboxContent>
        </Lightbox>
      )}
    </>
  );
} 