'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import { theme } from '../styles/theme';

interface SecureImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number | string;
  priority?: boolean;
  quality?: number;
  className?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  fill?: boolean;
  showWatermark?: boolean;
  sizes?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const ImageContainer = styled.div<{ $height?: string }>`
  position: relative;
  width: 100%;
  height: ${props => props.$height || '100%'};
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  overflow: hidden;
`;

const LoadingSkeleton = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    ${theme.colors.background.light} 25%,
    ${theme.colors.border.light} 50%,
    ${theme.colors.background.light} 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  z-index: 1;
`;

const StyledImage = styled(Image)<{ $loaded: boolean }>`
  opacity: ${props => props.$loaded ? 1 : 0};
  transition: opacity 0.3s ease;
  pointer-events: none;
  user-drag: none;
  -webkit-user-drag: none;
  animation: ${props => props.$loaded ? fadeIn : 'none'} 0.3s ease;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: transparent;
  z-index: 2;
`;

const Watermark = styled.div<{ $visible: boolean }>`
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  padding: 4px 8px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.3);
  pointer-events: none;
  z-index: 3;
  opacity: ${props => props.$visible ? 1 : 0};
  transition: opacity 0.3s ease;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 10px;
    padding: 2px 6px;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 200px;
  background: ${theme.colors.background.light};
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.sm};
`;

export default function SecureImage({ 
  src, 
  alt, 
  width, 
  height, 
  priority = false, 
  quality = 75, 
  className,
  objectFit = 'cover',
  fill,
  showWatermark = true,
  sizes = '100vw',
  style,
  onLoad,
  onError,
}: SecureImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Reset states when src changes
  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [src]);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  const handleLoad = useCallback(() => {
    setLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setError(true);
    onError?.();
  }, [onError]);

  if (error) {
    return (
      <ErrorContainer className={className}>
        <span>Image not available</span>
      </ErrorContainer>
    );
  }

  const containerHeight = typeof height === 'string' ? height : undefined;
  const imageHeight = typeof height === 'number' ? height : undefined;
  const shouldFill = fill || (!width && !imageHeight);

  // When using fill, we cannot set width/height in style
  // Only pass objectFit to style when using fill
  const imageStyle: React.CSSProperties = shouldFill 
    ? { objectFit } 
    : { objectFit, ...style };

  return (
    <ImageContainer 
      $height={containerHeight} 
      className={className}
      onContextMenu={handleContextMenu}
    >
      {!loaded && <LoadingSkeleton aria-hidden="true" />}
      <StyledImage
        src={src}
        alt={alt}
        width={shouldFill ? undefined : (width || 1920)}
        height={shouldFill ? undefined : (imageHeight || 1080)}
        priority={priority}
        quality={quality}
        fill={shouldFill}
        sizes={sizes}
        style={imageStyle}
        onLoad={handleLoad}
        onError={handleError}
        $loaded={loaded}
        draggable={false}
      />
      <Overlay aria-hidden="true" />
      {showWatermark && (
        <Watermark $visible={loaded} aria-hidden="true">
          © Camilalonart
        </Watermark>
      )}
    </ImageContainer>
  );
} 