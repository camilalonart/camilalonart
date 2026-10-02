'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ProtectedImage from '../../../../components/ProtectedImage';
import wildlifeImagesData from '../../../../data/wildlifeImages.json';
import photoDetailsData from '../photoDetails.json';
import { useDialog } from '../../../../hooks/useDialog';
import { useTranslation } from '../../../../i18n/TranslationContext';
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
  const { locale } = useTranslation();
  const dialogRef = useDialog(selectedPhoto !== null, () => setSelectedPhoto(null));
  
  // Process photos immediately instead of in useEffect
  const wildlifePhotos = React.useMemo(() => {
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
    
    return photos;
  }, []);

  const handlePhotoClick = (photo: WildlifePhoto) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const navigatePhoto = (direction: number) => {
    setSelectedPhoto(current => current
      ? wildlifePhotos[(current.id - 1 + direction + wildlifePhotos.length) % wildlifePhotos.length]
      : null);
  };

  return (
    <WildlifeContainer>
      {/* Back to Home Button */}
      <HamburgerMenu>
        <HamburgerButton 
          as="a"
          href="/"
          aria-label={locale === 'es' ? 'Inicio' : 'Home'}
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
              {locale === 'es' ? 'Volver' : 'Back'}
            </BackButton>
          </Link>
          <h1>{locale === 'es' ? 'Fotografía de vida silvestre' : 'Wildlife Portfolio'}</h1>
          <p>{locale === 'es' ? 'Una colección personal de encuentros con la fauna de Columbia Británica' : 'A personal collection of wildlife encounters across British Columbia'}</p>
        </PortfolioHeader>

        <PortfolioGrid>
          {wildlifePhotos.length === 0 ? (
            <div style={{ color: 'white', padding: '2rem', fontSize: '1.5rem' }}>
              Loading {wildlifeImagesData.length} photos...
            </div>
          ) : (
            wildlifePhotos.map((photo) => (
              <PhotoCard 
                as="button"
                type="button"
                key={photo.id}
                onClick={() => handlePhotoClick(photo)}
                aria-haspopup="dialog"
                aria-label={`${locale === 'es' ? 'Ampliar' : 'View larger'}: ${photo.details?.title || `${locale === 'es' ? 'Fotografía de fauna' : 'Wildlife photograph'} ${photo.id}`}`}
              >
                <PhotoImageWrapper>
                  <ProtectedImage
                    src={photo.src}
                    alt={photo.details?.title || 'Wildlife photo'}
                    width={800}
                    height={600}
                    objectFit="cover"
                    quality={85}
                  />
                </PhotoImageWrapper>
              </PhotoCard>
            ))
          )}
        </PortfolioGrid>
      </PortfolioPage>

      {/* Modal de Imagen - Full quality, no download */}
      {selectedPhoto && (
        <ImageModalContainer
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={selectedPhoto.details?.title || `${locale === 'es' ? 'Fotografía de fauna' : 'Wildlife photograph'} ${selectedPhoto.id}`}
          tabIndex={-1}
          onKeyDown={event => {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
              event.preventDefault();
              navigatePhoto(event.key === 'ArrowLeft' ? -1 : 1);
            }
          }}
        >
          <ModalOverlay onClick={closeModal} />
          <ModalContent>
            <ModalClose type="button" onClick={closeModal} aria-label={locale === 'es' ? 'Cerrar imagen' : 'Close image'}>×</ModalClose>
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
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', color: 'white' }}>
              <button type="button" onClick={() => navigatePhoto(-1)} style={{ minHeight: 44, padding: '0.5rem', color: 'inherit' }}>
                {locale === 'es' ? 'Anterior' : 'Previous'}
              </button>
              <span aria-live="polite">{selectedPhoto.id} / {wildlifePhotos.length}</span>
              <button type="button" onClick={() => navigatePhoto(1)} style={{ minHeight: 44, padding: '0.5rem', color: 'inherit' }}>
                {locale === 'es' ? 'Siguiente' : 'Next'}
              </button>
            </div>
          </ModalContent>
        </ImageModalContainer>
      )}
    </WildlifeContainer>
  );
}
