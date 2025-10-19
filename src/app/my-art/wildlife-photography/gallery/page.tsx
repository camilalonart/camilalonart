'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProtectedImage from '../../../../components/ProtectedImage';
import wildlifeImagesData from '../../../../data/wildlifeImages.json';
import photoDetailsData from '../photoDetails.json';
import {
  WildlifeContainer,
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
  HamburgerMenu,
  HamburgerButton,
} from '../styles';

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

export default function WildlifeGalleryPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<WildlifePhoto | null>(null);
  
  // Process photos immediately instead of in useEffect
  const wildlifePhotos = React.useMemo(() => {
    console.log('=== Processing wildlife photos ===');
    console.log('Total images:', wildlifeImagesData.length);
    
    const detailsMap = new Map(
      (photoDetailsData as PhotoDetails[]).map(detail => [detail.filename, detail])
    );

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
    
    console.log('Processed photos:', photos.length);
    return photos;
  }, []);

  const handlePhotoClick = (photo: WildlifePhoto) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <WildlifeContainer>
      {/* Back to Home Button */}
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

      {/* Portfolio Page - Galería de proyectos */}
      <PortfolioPage>
        <PortfolioHeader>
          <Link href="/my-art/wildlife-photography" passHref legacyBehavior>
            <BackButton as="a">
              ← Back
            </BackButton>
          </Link>
          <h1>Wildlife Portfolio</h1>
          <p>A personal collection of wildlife encounters across British Columbia</p>
        </PortfolioHeader>

        <PortfolioGrid>
          {wildlifePhotos.length === 0 ? (
            <div style={{ color: 'white', padding: '2rem', fontSize: '1.5rem' }}>
              Loading {wildlifeImagesData.length} photos...
            </div>
          ) : (
            wildlifePhotos.map((photo) => (
              <PhotoCard 
                key={photo.id}
                onClick={() => handlePhotoClick(photo)}
              >
                <PhotoImageWrapper>
                  <img
                    src={photo.src}
                    alt={photo.details?.title || 'Wildlife photo'}
                    onContextMenu={(e) => e.preventDefault()}
                    draggable={false}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      userSelect: 'none',
                    } as React.CSSProperties}
                  />
                </PhotoImageWrapper>
              </PhotoCard>
            ))
          )}
        </PortfolioGrid>
      </PortfolioPage>

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
