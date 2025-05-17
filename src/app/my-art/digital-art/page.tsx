'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import ProtectedImage from '../../../components/ProtectedImage';

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${theme.spacing['2xl']};
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: ${theme.spacing['3xl']};
  
  h1 {
    font-size: ${theme.typography.fontSize['4xl']};
    margin-bottom: ${theme.spacing.lg};
    background: linear-gradient(120deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  p {
    font-size: ${theme.typography.fontSize.xl};
    color: ${theme.colors.text.secondary};
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};
  padding: ${theme.spacing.xl} 0;
`;

const ArtworkCard = styled.div`
  background: ${theme.colors.background.light};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  transition: ${theme.transitions.default};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const ArtworkImage = styled.div`
  position: relative;
  aspect-ratio: 4/3;
  cursor: pointer;
`;

const ArtworkInfo = styled.div`
  padding: ${theme.spacing.xl};
  
  h3 {
    font-size: ${theme.typography.fontSize.xl};
    color: ${theme.colors.primary.main};
    margin-bottom: ${theme.spacing.md};
  }
  
  p {
    color: ${theme.colors.text.secondary};
    margin-bottom: ${theme.spacing.md};
    line-height: 1.6;
  }

  .details {
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.text.secondary};
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
`;

const Tag = styled.span`
  background: ${theme.colors.background.main};
  color: ${theme.colors.text.secondary};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize.sm};
`;

const Modal = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: ${theme.spacing.xl};
  
  img {
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
  }
`;

const artworks = [
  {
    id: 1,
    title: "Digital Dreams",
    description: "A surreal exploration of consciousness through digital manipulation",
    image: "/images/digital-art/dreams.jpg",
    year: "2023",
    medium: "Digital Painting",
    software: "Photoshop, Procreate",
    tags: ["Surrealism", "Portrait", "Digital Painting"]
  },
  {
    id: 2,
    title: "Urban Fragments",
    description: "Abstract interpretation of city life and architecture",
    image: "/images/digital-art/urban.jpg",
    year: "2023",
    medium: "Vector Art",
    software: "Illustrator",
    tags: ["Abstract", "Urban", "Vector"]
  },
  {
    id: 3,
    title: "Nature's Code",
    description: "Merging natural forms with digital patterns",
    image: "/images/digital-art/nature.jpg",
    year: "2023",
    medium: "Mixed Digital Media",
    software: "Photoshop, Blender",
    tags: ["Nature", "Abstract", "3D"]
  },
  // Add more artworks as needed
];

export default function DigitalArtPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <PageContainer>
      <Header>
        <h1>Digital Art</h1>
        <p>
          Exploring the intersection of traditional artistic techniques and digital
          tools to create unique visual experiences and push creative boundaries.
        </p>
      </Header>

      <GalleryGrid>
        {artworks.map((artwork) => (
          <ArtworkCard key={artwork.id}>
            <ArtworkImage onClick={() => setSelectedImage(artwork.image)}>
              <ProtectedImage
                src={artwork.image}
                alt={artwork.title}
                height="100%"
                quality={95}
              />
            </ArtworkImage>
            <ArtworkInfo>
              <h3>{artwork.title}</h3>
              <p>{artwork.description}</p>
              <div className="details">
                {artwork.year} • {artwork.medium}<br />
                Software: {artwork.software}
              </div>
              <TagsContainer>
                {artwork.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </TagsContainer>
            </ArtworkInfo>
          </ArtworkCard>
        ))}
      </GalleryGrid>

      <Modal 
        $isOpen={!!selectedImage}
        onClick={() => setSelectedImage(null)}
      >
        {selectedImage && (
          <ProtectedImage
            src={selectedImage}
            alt="Full size artwork"
            height="90vh"
            quality={100}
          />
        )}
      </Modal>
    </PageContainer>
  );
} 