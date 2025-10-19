'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ProtectedImage from '../../../components/ProtectedImage';
import wildlifeImagesData from '../../../data/wildlifeImages.json';
import photoDetailsData from './photoDetails.json';
import {
  WildlifeContainer,
  LandingPage,
  LandingImageContainer,
  LandingContent,
  LandingTitle,
  EnterButton,
  HamburgerMenu,
  HamburgerButton,
  PortfolioPage,
  PortfolioHeader,
  BackButton,
  PortfolioGrid,
  PhotoCard,
  PhotoImageWrapper,
  ImageModalContainer,
  ModalOverlay,
  ModalContent,
  ModalImage,
  ModalClose,
  ModalInfo,
} from './styles';

interface PhotoDetails {
  filename: string;
  title?: string;
  location?: string;
  date?: string;
  description?: string;
}

interface WildlifePhoto {
  id: number;
  src: string;
  filename: string;
  details?: PhotoDetails;
}

export default function WildlifePhotographyPage() {
  const [currentView, setCurrentView] = useState<'landing' | 'portfolio'>('landing');
  const [selectedPhoto, setSelectedPhoto] = useState<WildlifePhoto | null>(null);
  const [wildlifePhotos, setWildlifePhotos] = useState<WildlifePhoto[]>([]);

  useEffect(() => {
    // Crear un mapa de detalles para búsqueda rápida
    const detailsMap = new Map(
      (photoDetailsData as PhotoDetails[]).map(detail => [detail.filename, detail])
    );

    // Combinar todas las fotos con sus detalles (si existen)
    const photos: WildlifePhoto[] = wildlifeImagesData.map((src: string, index: number) => {
      const filename = src.split('/').pop() || '';
      const details = detailsMap.get(filename);

      return {
        id: index + 1,
        src,
        filename,
        details: details || undefined,
      };
    });

    setWildlifePhotos(photos);
  }, []);

  const handlePhotoClick = (photo: WildlifePhoto) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <WildlifeContainer>
      {/* Back to Main Button */}
      <HamburgerMenu>
        <HamburgerButton 
          as="a"
          href="/"
          $isOpen={false}
          style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
          }}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </HamburgerButton>
      </HamburgerMenu>

      {/* Landing Page - Una sola imagen con título */}
      {currentView === 'landing' && (
        <LandingPage>
          <LandingImageContainer>
            <Image
              src="/images/wildlife/wildlife-landing.jpg"
              alt="Wildlife Photography by Camilalonart"
              fill
              priority
              quality={100}
              style={{ objectFit: 'cover' }}
            />
          </LandingImageContainer>
          <LandingContent>
            <LandingTitle>
              Wild<br />Life
            </LandingTitle>
            <EnterButton onClick={() => setCurrentView('portfolio')}>
              View Gallery
            </EnterButton>
          </LandingContent>
        </LandingPage>
      )}

      {/* Portfolio Page - Galería de proyectos */}
      {currentView === 'portfolio' && (
        <PortfolioPage>
          <PortfolioHeader>
            <BackButton onClick={() => setCurrentView('landing')}>
              ← Back
            </BackButton>
            <h1>Wildlife Portfolio</h1>
            <p>A personal collection of wildlife encounters across British Columbia</p>
          </PortfolioHeader>

          <PortfolioGrid>
            {wildlifePhotos.map((photo) => (
              <PhotoCard 
                key={photo.id}
                onClick={() => handlePhotoClick(photo)}
              >
                <PhotoImageWrapper>
                  <ProtectedImage
                    src={photo.src}
                    alt={photo.details?.title || 'Wildlife photo'}
                    width={800}
                    height={1200}
                    quality={85}
                    objectFit="cover"
                  />
                </PhotoImageWrapper>
              </PhotoCard>
            ))}
          </PortfolioGrid>
        </PortfolioPage>
      )}

      {/* Modal de Imagen - Full quality, no download */}
      {selectedPhoto && (
        <ImageModalContainer>
          <ModalOverlay onClick={closeModal} />
          <ModalContent>
            <ModalClose onClick={closeModal}>×</ModalClose>
            <ModalImage>
              <ProtectedImage
                src={selectedPhoto.src}
                alt={selectedPhoto.details?.title || selectedPhoto.filename}
                fill
                quality={100}
                objectFit="contain"
              />
            </ModalImage>
            {selectedPhoto.details && (
              <ModalInfo>
                <h2>{selectedPhoto.details.title || selectedPhoto.filename}</h2>
                {(selectedPhoto.details.location || selectedPhoto.details.date) && (
                  <p>
                    {selectedPhoto.details.location && selectedPhoto.details.location}
                    {selectedPhoto.details.location && selectedPhoto.details.date && ' • '}
                    {selectedPhoto.details.date && selectedPhoto.details.date}
                  </p>
                )}
                {selectedPhoto.details.description && (
                  <p className="description">{selectedPhoto.details.description}</p>
                )}
              </ModalInfo>
            )}
          </ModalContent>
        </ImageModalContainer>
      )}
    </WildlifeContainer>
  );
}
