import styled from 'styled-components';

// ============================================================================
// WILDLIFE PORTFOLIO - ESTILOS EXCLUSIVOS
// Portafolio artístico personal, no comercial
// ============================================================================

export const WildlifeContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #000000;
  color: #ffffff;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  position: relative;
`;

// ============================================================================
// HAMBURGER MENU
// ============================================================================

export const HamburgerMenu = styled.div`
  position: fixed;
  top: 40px;
  right: 40px;
  z-index: 1000;

  @media (max-width: 768px) {
    top: 20px;
    right: 20px;
  }
`;

export const HamburgerButton = styled.button<{ $isOpen: boolean }>`
  background: ${props => props.$isOpen ? '#ffffff' : 'rgba(255, 255, 255, 0.1)'};
  border: none;
  width: 50px;
  height: 50px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  padding: 0;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  span {
    display: block;
    width: 25px;
    height: 2px;
    background: ${props => props.$isOpen ? '#000' : '#fff'};
    transition: all 0.3s ease;

    &:nth-child(1) {
      transform: ${props => props.$isOpen ? 'rotate(45deg) translate(7px, 7px)' : 'none'};
    }

    &:nth-child(2) {
      opacity: ${props => props.$isOpen ? '0' : '1'};
    }

    &:nth-child(3) {
      transform: ${props => props.$isOpen ? 'rotate(-45deg) translate(7px, -7px)' : 'none'};
    }
  }
`;

export const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const MenuContent = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const MenuItem = styled.div`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 300;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  font-family: 'Playfair Display', Georgia, serif;

  a {
    color: #ffffff;
    text-decoration: none;
  }

  &:hover {
    transform: translateX(10px);
    color: #cccccc;
  }
`;

// ============================================================================
// LANDING PAGE - Una sola imagen con título grande
// ============================================================================

export const LandingPage = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

export const LandingImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
    -webkit-user-drag: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.6) 100%
    );
  }
`;

export const LandingContent = styled.div`
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  padding: 4rem;
  margin-left: 5rem;
`;

export const LandingTitle = styled.h1`
  font-size: clamp(4rem, 12vw, 10rem);
  font-weight: 300;
  letter-spacing: 0.05em;
  text-transform: capitalize;
  margin: 0;
  text-align: left;
  font-family: 'Playfair Display', Georgia, serif;
  line-height: 0.9;
  text-shadow: 2px 2px 20px rgba(0, 0, 0, 0.8);

  br {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

export const EnterButton = styled.button`
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.6);
  padding: 16px 48px;
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  cursor: pointer;
  margin-top: 3rem;
  transition: all 0.3s ease;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: #ffffff;
    transition: left 0.4s ease;
    z-index: -1;
  }

  &:hover {
    color: #000000;
    border-color: #ffffff;
    
    &::before {
      left: 0;
    }
  }

  @media (max-width: 768px) {
    padding: 14px 36px;
    font-size: 0.8rem;
    margin-top: 2rem;
  }
`;

// ============================================================================
// PORTFOLIO PAGE - Galería de proyectos
// ============================================================================

export const PortfolioPage = styled.div`
  min-height: 100vh;
  padding: 120px 40px 80px;
  background: #000000;

  @media (max-width: 768px) {
    padding: 100px 20px 60px;
  }
`;

export const PortfolioHeader = styled.div`
  max-width: 1400px;
  margin: 0 auto 80px;
  text-align: center;

  h1 {
    font-size: clamp(3rem, 6vw, 5rem);
    font-weight: 300;
    letter-spacing: 0.05em;
    margin: 0 0 1rem 0;
    font-family: 'Playfair Display', Georgia, serif;
  }

  p {
    font-size: clamp(1.1rem, 2vw, 1.3rem);
    font-weight: 300;
    color: #cccccc;
    margin: 0;
  }
`;

export const BackButton = styled.button`
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 12px 30px;
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  cursor: pointer;
  margin-bottom: 3rem;
  transition: all 0.3s ease;
  display: inline-block;

  &:hover {
    border-color: #ffffff;
    transform: translateX(-5px);
  }
`;

export const PortfolioGrid = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  columns: 3;
  column-gap: 40px;

  @media (max-width: 1024px) {
    columns: 2;
    column-gap: 30px;
  }

  @media (max-width: 640px) {
    columns: 1;
    gap: 40px;
  }
`;

export const PhotoCard = styled.div`
  cursor: pointer;
  transition: transform 0.4s ease;
  break-inside: avoid;
  margin-bottom: 40px;

  &:hover {
    transform: translateY(-10px);
  }

  @media (max-width: 1024px) {
    margin-bottom: 30px;
  }

  @media (max-width: 640px) {
    margin-bottom: 40px;
  }
`;

export const PhotoImageWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #1a1a1a;
  margin-bottom: 1.5rem;

  img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.6s ease, opacity 0.3s ease;
    user-select: none;
    -webkit-user-drag: none;
  }

  ${PhotoCard}:hover & img {
    transform: scale(1.05);
    opacity: 0.9;
  }
`;

export const PhotoInfo = styled.div`
  padding: 0 0.5rem;
`;

export const PhotoTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0 0 0.75rem 0;
  font-family: 'Playfair Display', Georgia, serif;
  letter-spacing: 0.02em;
`;

export const PhotoMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.9rem;
  color: #999999;
  font-weight: 300;

  span {
    letter-spacing: 0.05em;
  }
`;

// ============================================================================
// IMAGE MODAL - Full quality, sin descarga
// ============================================================================

export const ImageModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: modalFadeIn 0.3s ease;

  @keyframes modalFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.97);
  cursor: pointer;
`;

export const ModalContent = styled.div`
  position: relative;
  z-index: 2;
  width: 90%;
  height: 90%;
  max-width: 1600px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  pointer-events: none;

  @media (max-width: 768px) {
    width: 95%;
    height: 95%;
    gap: 1rem;
  }
`;

export const ModalClose = styled.button`
  position: absolute;
  top: -50px;
  right: 0;
  background: transparent;
  color: #ffffff;
  border: none;
  font-size: 3rem;
  font-weight: 300;
  cursor: pointer;
  padding: 0;
  width: 50px;
  height: 50px;
  line-height: 1;
  transition: all 0.3s ease;
  pointer-events: all;

  &:hover {
    transform: rotate(90deg);
    color: #cccccc;
  }

  @media (max-width: 768px) {
    top: -40px;
    font-size: 2.5rem;
  }
`;

export const ModalImage = styled.div`
  position: relative;
  flex: 1;
  width: 100%;
  overflow: hidden;
  pointer-events: all;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    user-select: none;
    -webkit-user-drag: none;
    pointer-events: none;
  }
`;

export const ModalInfo = styled.div`
  text-align: center;
  color: #ffffff;
  pointer-events: all;
  padding: 0 2rem;

  h2 {
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 400;
    margin: 0 0 0.5rem 0;
    font-family: 'Playfair Display', Georgia, serif;
    letter-spacing: 0.02em;
  }

  p {
    font-size: 1rem;
    font-weight: 300;
    color: #cccccc;
    margin: 0.3rem 0;
    letter-spacing: 0.05em;

    &.description {
      font-size: 1.1rem;
      color: #ffffff;
      margin-top: 1rem;
      font-style: italic;
    }
  }

  @media (max-width: 768px) {
    padding: 0 1rem;

    h2 {
      font-size: 1.5rem;
    }

    p {
      font-size: 0.9rem;

      &.description {
        font-size: 1rem;
      }
    }
  }
`;
