import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import ProtectedImage from './ProtectedImage';

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${theme.spacing.xl};
  cursor: pointer;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 95vw;
  max-height: 95vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.button`
  position: fixed;
  top: ${theme.spacing.xl};
  right: ${theme.spacing.xl};
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  padding: ${theme.spacing.sm};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1001;
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    top: ${theme.spacing.md};
    right: ${theme.spacing.md};
  }
`;

const NavigationButton = styled.button`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  padding: ${theme.spacing.md};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1001;

  &.prev {
    left: ${theme.spacing.xl};
  }
  
  &.next {
    right: ${theme.spacing.xl};
  }
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: translateY(-50%) scale(1.1);
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
    
    &.prev {
      left: ${theme.spacing.md};
    }
    
    &.next {
      right: ${theme.spacing.md};
    }
  }
`;

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  src: string;
  alt: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  onPrevious,
  onNext,
  src,
  alt
}) => {
  if (!isOpen) return null;

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <CloseButton onClick={onClose}>×</CloseButton>
      {onPrevious && (
        <NavigationButton className="prev" onClick={(e) => {
          e.stopPropagation();
          onPrevious();
        }}>
          ‹
        </NavigationButton>
      )}
      <ModalContent onClick={handleContentClick}>
        <ProtectedImage
          src={src}
          alt={alt}
          quality={100}
          objectFit="contain"
          style={{
            maxWidth: '95vw',
            maxHeight: '95vh',
            width: 'auto',
            height: 'auto',
            borderRadius: theme.borderRadius.md
          }}
        />
      </ModalContent>
      {onNext && (
        <NavigationButton className="next" onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}>
          ›
        </NavigationButton>
      )}
    </ModalOverlay>
  );
};

export default ImageModal; 