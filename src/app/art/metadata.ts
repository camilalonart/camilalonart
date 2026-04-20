import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Traditional Oil Paintings & Art Gallery | Camila Londoño',
  description: 'Explore contemporary oil paintings and artistic collections by Camila Londoño. Featuring abstract, figurative, and conceptual art. Gallery in Vancouver, BC. Commission inquiries welcome.',
  keywords: [
    'oil paintings',
    'contemporary art',
    'art gallery Vancouver',
    'original paintings',
    'abstract art',
    'fine art',
    'art collections',
    'Canadian artist',
    'art commissions',
    'fine art paintings',
    'contemporary artist',
    'art portfolio',
  ],
  openGraph: {
    type: 'website',
    url: `${SITE_CONFIG.url}/art/`,
    title: 'Traditional Oil Paintings & Art Gallery | Camila Londoño',
    description: 'Contemporary oil paintings and artistic collections by Camila Londoño. Explore beautiful original artwork.',
    siteName: 'Camilalonart',
    locale: 'en_CA',
    images: [
      {
        url: `${SITE_CONFIG.url}/images/art/traditionalArt/Carrying Home/We.webp`,
        width: 1200,
        height: 630,
        alt: 'Traditional Oil Paintings by Camila Londoño',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Traditional Oil Paintings & Art Gallery | Camila Londoño',
    description: 'Contemporary oil paintings and artistic collections by Camila Londoño.',
    images: [`${SITE_CONFIG.url}/images/art/traditionalArt/Carrying Home/We.webp`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/art/`,
  },
};

// Structured data for art gallery
export const artGallerySchema = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'Camila Londoño Art Gallery',
  description: 'Contemporary oil paintings and artistic collections',
  creator: {
    '@type': 'Person',
    name: 'Camila Londoño',
    url: SITE_CONFIG.url,
    jobTitle: 'Artist',
    birthPlace: 'Canada',
  },
  artMedium: ['Oil painting', 'Canvas', 'Fine art'],
  artform: ['Painting', 'Contemporary art', 'Abstract art'],
  inLanguage: 'en-CA',
  url: `${SITE_CONFIG.url}/art/`,
};

export const artBreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_CONFIG.url,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Traditional Art',
      item: `${SITE_CONFIG.url}/art/`,
    },
  ],
};
