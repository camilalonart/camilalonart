import { Metadata } from 'next';

const baseMetadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'),
  title: {
    default: 'Professional Photography Services',
    template: '%s | Professional Photography Services'
  },
  description: 'Professional photography services specializing in weddings, pets, family portraits, maternity, and headshots. Capturing your special moments with artistic excellence.',
  keywords: ['photography', 'wedding photography', 'pet photography', 'family portraits', 'maternity photos', 'headshots'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    siteName: 'Professional Photography Services',
    title: 'Professional Photography Services',
    description: 'Professional photography services specializing in weddings, pets, family portraits, maternity, and headshots.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional Photography Services'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Photography Services',
    description: 'Professional photography services specializing in weddings, pets, family portraits, maternity, and headshots.',
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
  verification: {
    google: 'your-google-site-verification',
  }
};

export const getMetadata = (title: string, description: string, path: string): Metadata => ({
  ...baseMetadata,
  title,
  description,
  openGraph: {
    ...baseMetadata.openGraph,
    title,
    description,
    url: `https://your-domain.com${path}`,
  },
  twitter: {
    ...baseMetadata.twitter,
    title,
    description,
  },
}); 