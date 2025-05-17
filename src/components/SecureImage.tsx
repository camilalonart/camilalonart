'use client';

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { theme } from '../styles/theme';

interface SecureImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  className?: string;
}

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
`;

const StyledImage = styled(Image)`
  pointer-events: none;
  user-drag: none;
  -webkit-user-drag: none;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: transparent;
  pointer-events: none;
  z-index: 2;
`;

const Watermark = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: rgba(255, 255, 255, 0.5);
  pointer-events: none;
  transform: rotate(-45deg);
  opacity: 0;
  z-index: 1;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 16px;
  }
`;

export default function SecureImage({ src, alt, width, height, priority, quality = 75, className }: SecureImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (e: Event) => {
      e.preventDefault();
    };

    // Disable keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent common screenshot and save shortcuts
      if (
        (e.key === 'PrintScreen') ||
        (e.ctrlKey && e.key === 'p') ||
        (e.ctrlKey && e.key === 's') ||
        (e.ctrlKey && e.key === 'c') ||
        (e.metaKey && e.key === 'p') ||
        (e.metaKey && e.key === 's') ||
        (e.metaKey && e.key === 'c')
      ) {
        e.preventDefault();
      }
    };

    // Show watermark on attempted save/copy
    const handleCopy = () => {
      const watermark = containerRef.current?.querySelector('.watermark') as HTMLElement;
      if (watermark) {
        watermark.style.opacity = '1';
        setTimeout(() => {
          watermark.style.opacity = '0';
        }, 2000);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('keydown', handleKeyDown);
      container.addEventListener('copy', handleCopy);
    }

    return () => {
      if (container) {
        container.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('keydown', handleKeyDown);
        container.removeEventListener('copy', handleCopy);
      }
    };
  }, []);

  // Generate a unique blur hash for the image
  const blurDataURL = `data:image/jpeg;base64,${Buffer.from(
    Array(20).fill(0).map(() => Math.floor(Math.random() * 256))
  ).toString('base64')}`;

  return (
    <ImageContainer ref={containerRef} className={className}>
      <StyledImage
        src={src}
        alt={alt}
        width={width || 0}
        height={height || 0}
        priority={priority}
        quality={quality}
        fill={!width || !height}
        sizes="100vw"
        placeholder="blur"
        blurDataURL={blurDataURL}
        style={{ objectFit: 'cover' }}
      />
      <Overlay />
      <Watermark className="watermark">© Camilonart</Watermark>
    </ImageContainer>
  );
} 