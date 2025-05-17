import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const ImageContainer = styled.div<{ height?: string }>`
  position: relative;
  width: 100%;
  height: ${props => props.height || '100%'};
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    pointer-events: none;
  }
`;

const StyledImage = styled(Image)`
  user-select: none;
  pointer-events: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  z-index: 1;
  
  &::after {
    content: '© Camilalonart';
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.3);
    pointer-events: none;
  }
`;

interface ProtectedImageProps {
  src: string;
  alt: string;
  height?: string;
  priority?: boolean;
  quality?: number;
  objectFit?: 'cover' | 'contain';
  sizes?: string;
}

export default function ProtectedImage({
  src,
  alt,
  height = '300px',
  priority = false,
  quality = 85,
  objectFit = 'cover',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}: ProtectedImageProps) {
  // Add random query parameter to prevent browser caching and make URL unique
  const uniqueSrc = `${src}?v=${Math.random().toString(36).substring(7)}`;
  
  return (
    <ImageContainer height={height}>
      <StyledImage
        src={uniqueSrc}
        alt={alt}
        fill
        priority={priority}
        quality={quality}
        sizes={sizes}
        style={{ objectFit }}
        onContextMenu={(e) => e.preventDefault()}
        draggable={false}
      />
      <Overlay onContextMenu={(e) => e.preventDefault()} />
    </ImageContainer>
  );
} 