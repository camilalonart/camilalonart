'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  WildlifeContainer,
  LandingPage,
  LandingImageContainer,
  LandingContent,
  LandingTitle,
  EnterButton,
  HamburgerMenu,
  HamburgerButton,
  MenuOverlay,
  MenuContent,
  MenuItem,
  PortfolioPage,
  PortfolioHeader,
  BackButton,
  PortfolioGrid,
  PhotoCard,
  PhotoImageWrapper,
  PhotoInfo,
  PhotoTitle,
  PhotoMeta,
  ImageModalContainer,
  ModalOverlay,
  ModalContent,
  ModalImage,
  ModalClose,
  ModalInfo,
} from './styles';

export default function WildlifePhotographyPage() {
  const [currentView, setCurrentView] = useState<'landing' | 'portfolio'>('landing');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);

  // Wildlife Portfolio - Tu colección artística personal
  const wildlifePhotos = [
    {
      id: 1,
      src: '/images/wildlife/eagle-1.jpg',
      title: 'Silent Guardian',
      location: 'Tofino, British Columbia',
      date: 'March 2024',
      description: 'Bald eagle perched on ancient cedar'
    },
    {
      id: 2,
      src: '/images/wildlife/bear-1.jpg',
      title: 'First Light',
      location: 'Great Bear Rainforest, BC',
      date: 'September 2023',
      description: 'Grizzly bear fishing at dawn'
    },
    {
      id: 3,
      src: '/images/wildlife/whale-1.jpg',
      title: 'Ocean Soul',
      location: 'Vancouver Island, BC',
      date: 'July 2024',
      description: 'Orca whale breaching'
    },
    {
      id: 4,
      src: '/images/wildlife/deer-1.jpg',
      title: 'Morning Mist',
      location: 'Pacific Rim National Park',
      date: 'October 2023',
      description: 'Black-tailed deer at sunrise'
    },
    {
      id: 5,
      src: '/images/wildlife/owl-1.jpg',
      title: 'Night Watcher',
      location: 'Whistler, BC',
      date: 'January 2024',
      description: 'Great horned owl in winter'
    },
    {
      id: 6,
      src: '/images/wildlife/fox-1.jpg',
      title: 'Winter Coat',
      location: 'Mount Seymour, BC',
      date: 'December 2023',
      description: 'Red fox in snow'
    },
    {
      id: 7,
      src: '/images/wildlife/seal-1.jpg',
      title: 'Curious Eyes',
      location: 'Howe Sound, BC',
      date: 'May 2024',
      description: 'Harbor seal pup'
    },
    {
      id: 8,
      src: '/images/wildlife/wolf-1.jpg',
      title: 'Wild Spirit',
      location: 'Northern BC',
      date: 'November 2023',
      description: 'Grey wolf portrait'
    },
    {
      id: 9,
      src: '/images/wildlife/eagle-2.jpg',
      title: 'Flight',
      location: 'Squamish, BC',
      date: 'February 2024',
      description: 'Eagle in flight over river'
    },
    {
      id: 10,
      src: '/images/wildlife/bear-2.jpg',
      title: 'Salmon Run',
      location: 'Campbell River, BC',
      date: 'August 2023',
      description: 'Bear catching salmon'
    },
    {
      id: 11,
      src: '/images/wildlife/whale-2.jpg',
      title: 'Family Pod',
      location: 'Telegraph Cove, BC',
      date: 'June 2024',
      description: 'Orca family traveling'
    },
    {
      id: 12,
      src: '/images/wildlife/deer-2.jpg',
      title: 'Golden Hour',
      location: 'Gulf Islands, BC',
      date: 'April 2024',
      description: 'Deer in meadow at sunset'
    },
  ];

  const handlePhotoClick = (photo: any) => {
    setSelectedPhoto(photo);
    setMenuOpen(false);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <WildlifeContainer>
      {/* Hamburger Menu */}
      <HamburgerMenu>
        <HamburgerButton 
          onClick={() => setMenuOpen(!menuOpen)}
          $isOpen={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </HamburgerButton>
      </HamburgerMenu>

      {/* Menu Overlay */}
      {menuOpen && (
        <MenuOverlay onClick={() => setMenuOpen(false)}>
          <MenuContent onClick={(e) => e.stopPropagation()}>
            <MenuItem onClick={() => {
              setCurrentView('landing');
              setMenuOpen(false);
            }}>
              Home
            </MenuItem>
            <MenuItem onClick={() => {
              setCurrentView('portfolio');
              setMenuOpen(false);
            }}>
              Portfolio
            </MenuItem>
            <MenuItem onClick={() => setMenuOpen(false)}>
              <a href="/my-art">My Art</a>
            </MenuItem>
            <MenuItem onClick={() => setMenuOpen(false)}>
              <a href="/photography">Photography Services</a>
            </MenuItem>
          </MenuContent>
        </MenuOverlay>
      )}

      {/* Landing Page - Una sola imagen con título */}
      {currentView === 'landing' && (
        <LandingPage>
          <LandingImageContainer>
            <Image
              src="/images/wildlife/hero.jpg"
              alt="Wildlife Photography by Camilalonart"
              fill
              priority
              quality={100}
              style={{ objectFit: 'cover' }}
            />
          </LandingImageContainer>
          <LandingContent>
            <LandingTitle>
              Wildlife<br />Photography
            </LandingTitle>
            <EnterButton onClick={() => setCurrentView('portfolio')}>
              View Portfolio
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
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </PhotoImageWrapper>
                <PhotoInfo>
                  <PhotoTitle>{photo.title}</PhotoTitle>
                  <PhotoMeta>
                    <span>{photo.location}</span>
                    <span>{photo.date}</span>
                  </PhotoMeta>
                </PhotoInfo>
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
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                fill
                quality={100}
                style={{ objectFit: 'contain' }}
                onContextMenu={(e) => e.preventDefault()} // Prevent right-click
                draggable={false} // Prevent drag
              />
            </ModalImage>
            <ModalInfo>
              <h2>{selectedPhoto.title}</h2>
              <p>{selectedPhoto.location} • {selectedPhoto.date}</p>
              <p className="description">{selectedPhoto.description}</p>
            </ModalInfo>
          </ModalContent>
        </ImageModalContainer>
      )}
    </WildlifeContainer>
  );
}
