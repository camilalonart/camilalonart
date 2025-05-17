import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { ImageMetadata, GallerySection } from '@/types/gallery';

const GalleryContainer = styled.div`
  width: 100%;
  padding: 2rem 0;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  }
`;

const ImageCard = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 1rem;
  color: white;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  background: ${props => props.active ? '#000' : '#f0f0f0'};
  color: ${props => props.active ? '#fff' : '#000'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? '#333' : '#e0e0e0'};
  }
`;

interface GalleryProps {
  sections: GallerySection[];
  showFilters?: boolean;
}

export const Gallery: React.FC<GalleryProps> = ({ sections, showFilters = true }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  // Get all unique tags from all images
  const allTags = Array.from(new Set(
    sections.flatMap(section => 
      section.images.flatMap(image => image.tags || [])
    )
  ));

  const filteredImages = sections.flatMap(section => 
    section.images.filter(image => 
      activeFilter === 'all' || image.tags?.includes(activeFilter)
    )
  );

  return (
    <GalleryContainer>
      {showFilters && allTags.length > 0 && (
        <FilterContainer>
          <FilterButton
            active={activeFilter === 'all'}
            onClick={() => setActiveFilter('all')}
          >
            All
          </FilterButton>
          {allTags.map(tag => (
            <FilterButton
              key={tag}
              active={activeFilter === tag}
              onClick={() => setActiveFilter(tag)}
            >
              {tag}
            </FilterButton>
          ))}
        </FilterContainer>
      )}

      <GalleryGrid>
        {filteredImages.map((image) => (
          <ImageCard key={image.id}>
            <Image
              src={image.imagePath}
              alt={image.title}
              width={400}
              height={300}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
            <ImageOverlay>
              <h3>{image.title}</h3>
              {image.description && <p>{image.description}</p>}
            </ImageOverlay>
          </ImageCard>
        ))}
      </GalleryGrid>
    </GalleryContainer>
  );
}; 