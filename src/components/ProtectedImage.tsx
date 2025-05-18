'use client';

import React, { useState, useEffect } from 'react';
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

const StyledImage = styled(Image)<{ $loaded: boolean }>`
  opacity: ${props => props.$loaded ? 1 : 0};
  transition: opacity 0.3s ease;
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
  width?: number;
  height?: string | number;
  priority?: boolean;
  quality?: number;
  objectFit?: 'cover' | 'contain';
}

export default function ProtectedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 75,
  objectFit = 'cover'
}: ProtectedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Reset states when src changes
    setLoaded(false);
    setError(false);
  }, [src]);

  if (error) {
    return <div>Image not available</div>;
  }

  return (
    <ImageContainer height={typeof height === 'string' ? height : undefined}>
      <StyledImage
        src={src}
        alt={alt}
        width={width || 1920}
        height={typeof height === 'string' ? 1080 : height || 1080}
        priority={priority}
        quality={quality}
        style={{ objectFit }}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        $loaded={loaded}
      />
      <Overlay onContextMenu={(e) => e.preventDefault()} />
    </ImageContainer>
  );
} 