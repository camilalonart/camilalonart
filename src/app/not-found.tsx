'use client';

import styled from 'styled-components';
import Link from 'next/link';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const NotFoundTitle = styled.h1`
  font-size: 8rem;
  margin-bottom: 1rem;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  line-height: 1;
`;

const NotFoundSubtitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const NotFoundMessage = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const HomeButton = styled(Link)`
  padding: 1rem 2rem;
  font-size: 1rem;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export default function NotFound() {
  return (
    <NotFoundContainer>
      <NotFoundTitle>404</NotFoundTitle>
      <NotFoundSubtitle>Page Not Found</NotFoundSubtitle>
      <NotFoundMessage>
        The page you're looking for doesn't exist or has been moved.
      </NotFoundMessage>
      <HomeButton href="/">
        Return Home
      </HomeButton>
    </NotFoundContainer>
  );
}
