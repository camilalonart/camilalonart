'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import ProtectedImage from './ProtectedImage';

const GalleryContainer = styled.div`
  width: 100%;
  padding: ${theme.spacing['2xl']};
  margin-top: 60px;
  background: rgb(255, 255, 255);
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xl};
  }
`;

const BackButton = styled.a`
  position: fixed;
  top: ${theme.spacing.xl};
  left: ${theme.spacing.sm};
  background: rgba(0, 0, 0, 0.5);
  color: white;
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
    background: rgba(0, 0, 0, 0.7);
    transform: translateX(-4px);
    
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

const GalleryItem = styled.div`
  break-inside: avoid;
  margin-bottom: ${theme.spacing.lg};
  cursor: pointer;
  transition: transform 0.3s ease;
  
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

  .modal-content {
    position: relative;
    max-width: 95vw;
    max-height: 95vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    max-width: 95vw;
    max-height: 95vh;
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: ${theme.borderRadius.md};
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
  }

  .nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    padding: ${theme.spacing.md};
    
    &.prev {
      left: ${theme.spacing.xl};
    }
    
    &.next {
      right: ${theme.spacing.xl};
    }
    
    &:hover {
      opacity: 0.8;
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

export interface BaseGalleryProps {
  images: { src: string; alt: string }[];
  backLink: string;
  backText: string;
}

const BaseGallery: React.FC<BaseGalleryProps> = ({ images, backLink, backText }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
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
        <MasonryGrid>
          {images.map((image, index) => (
            <GalleryItem key={index} onClick={() => handleImageClick(index)}>
              <ProtectedImage
                src={image.src}
                alt={image.alt}
                quality={85}
                objectFit="cover"
              />
            </GalleryItem>
          ))}
        </MasonryGrid>

        {selectedImage !== null && (
          <Modal onClick={handleClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button className="close-button" onClick={handleClose}>×</button>
              <button className="nav-button prev" onClick={handlePrevious}>‹</button>
              <ProtectedImage
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                quality={100}
                objectFit="contain"
              />
              <button className="nav-button next" onClick={handleNext}>›</button>
            </div>
          </Modal>
        )}
      </GalleryContainer>
    </>
  );
};

export default BaseGallery; 