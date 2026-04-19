'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  WildlifeContainer,
  LandingPage,
  LandingImageContainer,
  LandingContent,
  LandingTitle,
  EnterButton,
  HamburgerMenu,
  HamburgerButton,
} from './styles';

export default function WildlifePhotographyPage() {
  return (
    <WildlifeContainer>
      {/* Back to Main Button */}
      <HamburgerMenu>
        <HamburgerButton 
          as="a"
          href="/"
          $isOpen={false}
          style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
          }}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </HamburgerButton>
      </HamburgerMenu>

      {/* Landing Page - Una sola imagen con título */}
      <LandingPage>
        <LandingImageContainer>
          <Image
            src="/images/wildlife/wildlife-landing.webp"
            alt="Wildlife Photography by Camilalonart"
            fill
            priority
            quality={100}
            style={{ objectFit: 'cover' }}
          />
        </LandingImageContainer>
        <LandingContent>
          <LandingTitle>
            Wild<br />Life
          </LandingTitle>
          <Link href="/my-art/wildlife-photography/gallery" passHref legacyBehavior>
            <EnterButton as="a">
              View Gallery
            </EnterButton>
          </Link>
        </LandingContent>
      </LandingPage>
    </WildlifeContainer>
  );
}
