'use client';

import React from 'react';
import styled from 'styled-components';
import { theme } from "@/styles/theme";
import ProtectedImage from "@/components/ProtectedImage";
import SimpleNav from "@/components/SimpleNav";
import { useTranslation } from '@/i18n/TranslationContext';

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${theme.spacing['2xl']};
  padding-top: calc(${theme.spacing['2xl']} + 64px);
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
  const { t } = useTranslation();
  const galleries = [
    {
      images: [
        { src: "/images/art/everyday/street-1.jpg", span: 8 },
        { src: "/images/art/everyday/street-2.jpg", span: 4 },
        { src: "/images/art/everyday/street-3.jpg", span: 6 },
        { src: "/images/art/everyday/street-4.jpg", span: 6 }
      ]
    },
    {
      images: [
        { src: "/images/art/everyday/urban-1.jpg", span: 4 },
        { src: "/images/art/everyday/urban-2.jpg", span: 4 },
        { src: "/images/art/everyday/urban-3.jpg", span: 4 },
        { src: "/images/art/everyday/urban-4.jpg", span: 12 }
      ]
    },
    {
      images: [
        { src: "/images/art/everyday/quiet-1.jpg", span: 6 },
        { src: "/images/art/everyday/quiet-2.jpg", span: 6 },
        { src: "/images/art/everyday/quiet-3.jpg", span: 4 },
        { src: "/images/art/everyday/quiet-4.jpg", span: 8 }
      ]
    }
  ];

  return (
    <>
      <SimpleNav />
      <PageContainer>
      <Hero>
        <h1>{t('creativeContent.everyday.title')}</h1>
        <p>{t('creativeContent.everyday.intro')}</p>
      </Hero>

      {galleries.map((gallery, index) => (
        <Section key={index} $dark={index % 2 === 1}>
          <h2>{t(`creativeContent.everyday.galleries.${index}.title`)}</h2>
          <p>{t(`creativeContent.everyday.galleries.${index}.description`)}</p>
          <GalleryGrid>
            {gallery.images.map((image, imageIndex) => (
              <GalleryItem key={imageIndex} $span={image.span}>
                <ProtectedImage
                  src={image.src}
                  alt={t(`creativeContent.everyday.galleries.${index}.captions.${imageIndex}`)}
                  height="100%"
                  quality={90}
                />
                <ImageCaption>
                  <h3>{t(`creativeContent.everyday.galleries.${index}.captions.${imageIndex}`)}</h3>
                </ImageCaption>
              </GalleryItem>
            ))}
          </GalleryGrid>
        </Section>
      ))}
    </PageContainer>
    </>
  );
} 