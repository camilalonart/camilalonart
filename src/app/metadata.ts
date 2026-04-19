import { Metadata } from 'next';

const baseMetadata: Metadata = {
  metadataBase: new URL('https://camilalonart.com'),
  title: {
    default: 'Camilalonart - Photography & Creative Services',
    template: '%s - Camilalonart'
  },
  description: 'Professional photography and creative services in Vancouver, BC. Specializing in weddings, pets, family portraits, headshots, graphic recording, and UX/UI design.',
  keywords: ['photography', 'wedding photography', 'pet photography', 'family portraits', 'maternity photos', 'headshots', 'graphic recording', 'UX/UI design', 'Vancouver photographer'],
  authors: [{ name: 'Camilalonart' }],
  creator: 'Camilalonart',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://camilalonart.com',
    siteName: 'Camilalonart',
    title: 'Camilalonart - Photography & Creative Services',
    description: 'Professional photography and creative services in Vancouver, BC. Specializing in weddings, pets, family portraits, headshots, graphic recording, and UX/UI design.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Camilalonart - Photography & Creative Services'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Camilalonart - Photography & Creative Services',
    description: 'Professional photography and creative services in Vancouver, BC. Specializing in weddings, pets, family portraits, headshots, and more.',
    images: ['/images/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const getMetadata = (title: string, description: string, path: string): Metadata => ({
  ...baseMetadata,
  title,
  description,
  openGraph: {
    ...baseMetadata.openGraph,
    title,
    description,
    url: `https://camilalonart.com${path}`,
  },
  twitter: {
    ...baseMetadata.twitter,
    title,
    description,
  },
}); 