'use client';

import React, { useState } from 'react';
import Link from '@/i18n/LocalizedLink';
import ProtectedImage from "@/components/ProtectedImage";
import wildlifeImagesData from "@/data/wildlifeImages.json";
import photoDetailsData from '../photoDetails.json';
import { useDialog } from "@/hooks/useDialog";
import { useTranslation } from "@/i18n/TranslationContext";
import LanguageSwitcher from '@/components/LanguageSwitcher';
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
  const { t, locale } = useTranslation();
  const w = (key: string) => t(`photographyContent.wildlife.${key}`);
  const c = (key: string) => t(`photographyContent.common.${key}`);
  const detailKeys: Record<string, string> = {
    'A7T00206.jpg': 'guardian',
    'A7T01097.jpg': 'light',
    'A7T01452.jpg': 'ocean',
  };
  const detailText = (photo: WildlifePhoto, field: 'title' | 'location' | 'description') => {
    const key = detailKeys[photo.filename];
    return key && photo.details?.[field] ? w(`details.${key}.${field}`) : photo.details?.[field];
  };
  const photoTitle = (photo: WildlifePhoto) => detailText(photo, 'title') || `${w('photograph')} ${photo.id}`;
  const photoDate = (date: string) => {
    const parsed = new Date(date);
    return Number.isNaN(parsed.getTime()) ? date : new Intl.DateTimeFormat(locale, {
      month: 'long', year: 'numeric', timeZone: 'UTC',
    }).format(parsed);
  };
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
          as={Link}
          href="/"
          aria-label={c('home')}
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
              {w('back')}
            </BackButton>
          </Link>
          <h1>{w('title')}</h1>
          <p>{w('intro')}</p>
        </PortfolioHeader>

        <PortfolioGrid>
          {wildlifePhotos.length === 0 ? (
            <div style={{ color: 'white', padding: '2rem', fontSize: '1.5rem' }}>
              {w('empty')}
            </div>
          ) : (
            wildlifePhotos.map((photo) => (
              <PhotoCard 
                as="button"
                type="button"
                key={photo.id}
                onClick={() => handlePhotoClick(photo)}
                aria-haspopup="dialog"
                aria-label={`${w('viewLarger')}: ${photoTitle(photo)}`}
              >
                <PhotoImageWrapper>
                  <ProtectedImage
                    src={photo.src}
                    alt={photoTitle(photo)}
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
          aria-label={photoTitle(selectedPhoto)}
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
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '3.5rem', position: 'relative', zIndex: 2, pointerEvents: 'auto' }}>
              <LanguageSwitcher isDark />
            </div>
            <ModalClose type="button" onClick={closeModal} aria-label={w('close')}>×</ModalClose>
            <ModalImage>
              <ProtectedImage
                src={selectedPhoto.src}
                alt={photoTitle(selectedPhoto)}
                fill
                quality={100}
                objectFit="contain"
              />
            </ModalImage>
            {selectedPhoto.details && (
              <ModalInfo>
                <h2>{photoTitle(selectedPhoto)}</h2>
                {(selectedPhoto.details.location || selectedPhoto.details.date) && (
                  <p>
                    {selectedPhoto.details.location && detailText(selectedPhoto, 'location')}
                    {selectedPhoto.details.location && selectedPhoto.details.date && ' • '}
                    {selectedPhoto.details.date && photoDate(selectedPhoto.details.date)}
                  </p>
                )}
                {selectedPhoto.details.description && (
                  <p className="description">{detailText(selectedPhoto, 'description')}</p>
                )}
              </ModalInfo>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', color: 'white', pointerEvents: 'auto' }}>
              <button type="button" onClick={() => navigatePhoto(-1)} style={{ minHeight: 44, padding: '0.5rem', color: 'inherit' }}>
                {c('previous')}
              </button>
              <span aria-live="polite">{selectedPhoto.id} / {wildlifePhotos.length}</span>
              <button type="button" onClick={() => navigatePhoto(1)} style={{ minHeight: 44, padding: '0.5rem', color: 'inherit' }}>
                {c('next')}
              </button>
            </div>
          </ModalContent>
        </ImageModalContainer>
      )}
    </WildlifeContainer>
  );
}
