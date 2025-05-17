'use client';

import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import ProtectedImage from '../../../components/ProtectedImage';

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${theme.spacing['2xl']};
`;

const Hero = styled.section`
  text-align: center;
  margin-bottom: ${theme.spacing['3xl']};
  
  h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
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

const Section = styled.section<{ $dark?: boolean }>`
  padding: ${theme.spacing['3xl']} 0;
  background: ${props => props.$dark ? theme.colors.background.dark : 'transparent'};
  
  h2 {
    font-size: ${theme.typography.fontSize['2xl']};
    margin-bottom: ${theme.spacing.xl};
    color: ${props => props.$dark ? theme.colors.text.light : theme.colors.primary.main};
  }
  
  p {
    color: ${props => props.$dark ? theme.colors.text.light : theme.colors.text.secondary};
    margin-bottom: ${theme.spacing.xl};
    line-height: 1.6;
    max-width: 800px;
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: ${theme.spacing.md};
  margin: ${theme.spacing.xl} 0;
`;

const GalleryItem = styled.div<{ $span?: number }>`
  grid-column: span ${props => props.$span || 4};
  position: relative;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  aspect-ratio: 3/2;
  
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-column: span ${props => Math.min(props.$span || 4, 6)};
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-column: span 12;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const ImageCaption = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${theme.spacing.lg};
  background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0));
  color: ${theme.colors.text.light};
  
  h3 {
    font-size: ${theme.typography.fontSize.lg};
    margin-bottom: ${theme.spacing.xs};
  }
  
  p {
    font-size: ${theme.typography.fontSize.sm};
    opacity: 0.9;
  }
`;

export default function EverydayPhotographyPage() {
  const galleries = [
    {
      title: "Street Life",
      description: "Candid moments from Vancouver's vibrant streets",
      images: [
        { src: "/images/art/everyday/street-1.jpg", caption: "Morning Rush", span: 8 },
        { src: "/images/art/everyday/street-2.jpg", caption: "Cafe Culture", span: 4 },
        { src: "/images/art/everyday/street-3.jpg", caption: "Rain City", span: 6 },
        { src: "/images/art/everyday/street-4.jpg", caption: "Night Markets", span: 6 }
      ]
    },
    {
      title: "Urban Details",
      description: "Finding art in architecture and city textures",
      images: [
        { src: "/images/art/everyday/urban-1.jpg", caption: "Glass & Steel", span: 4 },
        { src: "/images/art/everyday/urban-2.jpg", caption: "Hidden Patterns", span: 4 },
        { src: "/images/art/everyday/urban-3.jpg", caption: "City Lights", span: 4 },
        { src: "/images/art/everyday/urban-4.jpg", caption: "Urban Nature", span: 12 }
      ]
    },
    {
      title: "Quiet Moments",
      description: "The poetry of ordinary life",
      images: [
        { src: "/images/art/everyday/quiet-1.jpg", caption: "Morning Light", span: 6 },
        { src: "/images/art/everyday/quiet-2.jpg", caption: "Coffee Break", span: 6 },
        { src: "/images/art/everyday/quiet-3.jpg", caption: "Reading Corner", span: 4 },
        { src: "/images/art/everyday/quiet-4.jpg", caption: "Rainy Window", span: 8 }
      ]
    }
  ];

  return (
    <PageContainer>
      <Hero>
        <h1>Everyday Photography</h1>
        <p>
          Finding beauty in the ordinary, capturing the poetry of daily life through
          a lens that transforms the mundane into the extraordinary.
        </p>
      </Hero>

      {galleries.map((gallery, index) => (
        <Section key={gallery.title} $dark={index % 2 === 1}>
          <h2>{gallery.title}</h2>
          <p>{gallery.description}</p>
          <GalleryGrid>
            {gallery.images.map((image, imageIndex) => (
              <GalleryItem key={imageIndex} $span={image.span}>
                <ProtectedImage
                  src={image.src}
                  alt={image.caption}
                  height="100%"
                  quality={90}
                />
                <ImageCaption>
                  <h3>{image.caption}</h3>
                </ImageCaption>
              </GalleryItem>
            ))}
          </GalleryGrid>
        </Section>
      ))}
    </PageContainer>
  );
} 