'use client';

import React, { useState, useCallback, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../styles/theme';
import SecureImage from './SecureImage';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const GalleryContainer = styled.div`
  width: 100%;
  padding: ${theme.spacing['2xl']};
  margin-top: 60px;
  position: relative;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xl};
  }
`;

const BackButton = styled.a`
  position: fixed;
  top: ${theme.spacing.xl};
  left: ${theme.spacing.xl};
  background: transparent;
  color: ${theme.colors.text.primary};
  padding: ${theme.spacing.md} 0;
  font-size: 0.9rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  z-index: 10;
  transition: all 0.3s ease;
  
  &:before {
    content: '←';
    font-size: 1.2rem;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: ${theme.colors.primary.main};
    
    &:before {
      transform: translateX(-4px);
    }
  }

  @media (max-width: ${theme.breakpoints.md}) {
    top: ${theme.spacing.md};
    left: ${theme.spacing.md};
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

const GalleryItem = styled.div`
  break-inside: avoid;
  margin-bottom: ${theme.spacing.lg};
  cursor: pointer;
  transition: transform 0.3s ease;
  animation: ${fadeIn} 0.5s ease;
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  &:focus-visible {
    outline: 2px solid ${theme.colors.secondary.main};
    outline-offset: 2px;
  }
`;

const SkeletonItem = styled.div<{ $height: number }>`
  break-inside: avoid;
  margin-bottom: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  height: ${props => props.$height}px;
  background: linear-gradient(
    90deg,
    ${theme.colors.background.light} 25%,
    ${theme.colors.border.light} 50%,
    ${theme.colors.background.light} 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;

const Modal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${theme.spacing.xl};
  cursor: pointer;
  animation: ${fadeIn} 0.2s ease;

  .modal-content {
    position: relative;
    max-width: 95vw;
    max-height: 95vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .close-button {
    position: absolute;
    top: -40px;
    right: 0;
    background: transparent;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    padding: ${theme.spacing.sm};
    
    &:hover {
      opacity: 0.8;
    }
    
    &:focus-visible {
      outline: 2px solid white;
      outline-offset: 2px;
    }
  }

  .back-button {
    position: absolute;
    top: ${theme.spacing.xl};
    left: ${theme.spacing.xl};
    background: transparent;
    border: 2px solid white;
    color: white;
    padding: ${theme.spacing.md} ${theme.spacing.lg};
    border-radius: ${theme.borderRadius.sm};
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    
    &:hover {
      background: white;
      color: black;
    }
  }

  .nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    padding: ${theme.spacing.md};
    border-radius: ${theme.borderRadius.md};
    transition: background 0.2s ease;
    
    &.prev {
      left: ${theme.spacing.xl};
    }
    
    &.next {
      right: ${theme.spacing.xl};
    }
    
    &:hover {
      background: rgba(0, 0, 0, 0.8);
    }
    
    &:focus-visible {
      outline: 2px solid white;
      outline-offset: 2px;
    }
    
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: 1.5rem;
      padding: ${theme.spacing.sm};
      
      &.prev {
        left: ${theme.spacing.sm};
      }
      
      &.next {
        right: ${theme.spacing.sm};
      }
    }
  }
`;

const ImageCounter = styled.div`
  position: absolute;
  bottom: ${theme.spacing.lg};
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: ${theme.typography.fontSize.sm};
  background: rgba(0, 0, 0, 0.5);
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
`;

interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryProps {
  images: GalleryImage[];
  backUrl?: string;
  backLabel?: string;
  isLoading?: boolean;
}

const Gallery: React.FC<GalleryProps> = ({ 
  images, 
  backUrl = '/photography/wedding-couples',
  backLabel = 'Back to Wedding & Couples',
  isLoading = false,
}) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleImageClick = useCallback((index: number) => {
    setSelectedImage(index);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const handlePrevious = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  }, [selectedImage, images.length]);

  const handleNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  }, [selectedImage, images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      switch (e.key) {
        case 'Escape':
          handleClose();
          break;
        case 'ArrowLeft':
          setSelectedImage((selectedImage - 1 + images.length) % images.length);
          break;
        case 'ArrowRight':
          setSelectedImage((selectedImage + 1) % images.length);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, images.length, handleClose]);

  // Generate random heights for skeleton items
  const skeletonHeights = [250, 350, 300, 400, 280, 320];

  if (isLoading) {
    return (
      <>
        <BackButton href={backUrl} aria-label={backLabel}>
          {backLabel}
        </BackButton>
        <GalleryContainer>
          <MasonryGrid>
            {skeletonHeights.map((height, index) => (
              <SkeletonItem key={index} $height={height} aria-hidden="true" />
            ))}
          </MasonryGrid>
        </GalleryContainer>
      </>
    );
  }

  return (
    <>
      <BackButton href={backUrl} aria-label={backLabel}>
        {backLabel}
      </BackButton>
      <GalleryContainer>
        <MasonryGrid role="list" aria-label="Image gallery">
          {images.map((image, index) => (
            <GalleryItem 
              key={index} 
              onClick={() => handleImageClick(index)}
              onKeyDown={(e) => e.key === 'Enter' && handleImageClick(index)}
              role="listitem"
              tabIndex={0}
              aria-label={`View ${image.alt}`}
            >
              <SecureImage
                src={image.src}
                alt={image.alt}
                quality={85}
                objectFit="cover"
                showWatermark={false}
              />
            </GalleryItem>
          ))}
        </MasonryGrid>

        {selectedImage !== null && (
          <Modal 
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button 
                className="close-button" 
                onClick={handleClose}
                aria-label="Close image viewer"
              >
                ×
              </button>
              <button 
                className="nav-button prev" 
                onClick={handlePrevious}
                aria-label="Previous image"
              >
                ‹
              </button>
              <SecureImage
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                quality={100}
                objectFit="contain"
              />
              <button 
                className="nav-button next" 
                onClick={handleNext}
                aria-label="Next image"
              >
                ›
              </button>
              <ImageCounter>
                {selectedImage + 1} / {images.length}
              </ImageCounter>
            </div>
          </Modal>
        )}
      </GalleryContainer>
    </>
  );
};

export default Gallery; 