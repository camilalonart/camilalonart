import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Camila Londoño — Oil Paintings & Art Gallery | Camilalonart',
  description: 'Original oil paintings and art collections by Camila Londoño (camilalonart / camilonart). Contemporary and figurative works created in Vancouver, BC. Commission inquiries welcome.',
  keywords: [
    // Name-based (primary for Google name search)
    'Camila Londoño',
    'Maria Camila Londoño Arteaga',
    'Camila Londono',
    'camilalonart',
    'camilonart',
    'camilalonart.com',
    // Art style
    'oil paintings',
    'original paintings',
    'fine art',
    'contemporary art',
    'figurative painting',
    'abstract art',
    'art collections',
    'art commissions',
    // Location
    'art gallery Vancouver',
    'Vancouver artist',
    'Canadian artist',
    'pintora colombiana Vancouver',
    // Long-tail
    'oil painter Vancouver BC',
    'original paintings for sale Vancouver',
    'art commission Vancouver',
    'fine art portfolio',
  ],
  openGraph: {
    type: 'website',
    url: `${SITE_CONFIG.url}/art/`,
    title: 'Camila Londoño — Oil Paintings & Art Gallery',
    description: 'Original oil paintings by Camila Londoño (camilalonart). Contemporary and figurative works — gallery in Vancouver, BC.',
    siteName: 'Camilalonart',
    locale: 'en_CA',
    images: [
      {
        url: `${SITE_CONFIG.url}/images/art/traditionalArt/Carrying Home/We.webp`,
        width: 1200,
        height: 630,
        alt: 'Oil Paintings by Camila Londoño — camilalonart',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Camila Londoño — Oil Paintings & Art Gallery',
    description: 'Original oil paintings by Camila Londoño (camilalonart). Gallery in Vancouver, BC.',
    images: [`${SITE_CONFIG.url}/images/art/traditionalArt/Carrying Home/We.webp`],
    creator: '@camilalonart',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/art/`,
    languages: {
      'en-CA': `${SITE_CONFIG.url}/art/`,
      'es': `${SITE_CONFIG.url}/art/`,
    },
  },
};

// Person schema — helps Google associate the name "Camila Londoño" with this page
export const artistPersonSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_CONFIG.url}/art/#artist`,
  name: 'Camila Londoño',
  alternateName: [
    'Maria Camila Londoño Arteaga',
    'Camila Londono',
    'camilalonart',
    'camilonart',
  ],
  url: `${SITE_CONFIG.url}/art/`,
  image: `${SITE_CONFIG.url}/images/art/traditionalArt/Carrying Home/We.webp`,
  description: 'Contemporary painter and visual artist based in Vancouver, BC, known as camilalonart.',
  jobTitle: 'Visual Artist',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Vancouver',
    addressRegion: 'BC',
    addressCountry: 'Canada',
  },
  sameAs: [
    'https://www.instagram.com/camilalonart/',
    'https://www.instagram.com/camilonart/',
    `${SITE_CONFIG.url}/art/`,
  ],
};

export const artGallerySchema = {
  '@context': 'https://schema.org',
  '@type': 'ArtGallery',
  '@id': `${SITE_CONFIG.url}/art/#gallery`,
  name: 'Camila Londoño Art Gallery',
  alternateName: 'camilalonart',
  description: 'Original oil paintings and contemporary art collections by Camila Londoño',
  url: `${SITE_CONFIG.url}/art/`,
  image: `${SITE_CONFIG.url}/images/art/traditionalArt/Carrying Home/We.webp`,
  creator: { '@id': `${SITE_CONFIG.url}/art/#artist` },
  artMedium: ['Oil painting', 'Canvas', 'Mixed media'],
  artform: ['Painting', 'Contemporary art', 'Figurative painting'],
  inLanguage: ['en-CA', 'es'],
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
      name: 'Camila Londoño — Art Gallery',
      item: `${SITE_CONFIG.url}/art/`,
    },
  ],
};
