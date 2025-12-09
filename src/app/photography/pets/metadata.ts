import { Metadata } from 'next';
import { SITE_CONFIG } from '../../../lib/seo';

export const metadata: Metadata = {
  title: 'Pet Photographer Vancouver BC | Dog & Cat Photography Studio',
  description: 'Vancouver\'s top-rated pet photographer! Professional dog, cat, and pet portrait photography. Indoor studio & outdoor sessions in beautiful BC locations. Capture your furry friend\'s personality. Book today!',
  keywords: [
    'pet photographer Vancouver',
    'dog photography Vancouver',
    'cat photography Vancouver',
    'Vancouver pet portraits',
    'professional pet photography BC',
    'dog photoshoot Vancouver',
    'pet portrait studio Vancouver',
    'outdoor pet photography BC',
    'puppy photography Vancouver',
    'pet family photos Vancouver',
    'best pet photographer Vancouver',
    'affordable pet photography',
  ],
  openGraph: {
    type: 'website',
    url: `${SITE_CONFIG.url}/photography/pets/`,
    title: 'Pet Photographer Vancouver BC | Dog & Cat Photography',
    description: 'Vancouver\'s top-rated pet photographer! Professional dog and cat portrait photography. Indoor studio & outdoor sessions. Book your session today!',
    siteName: 'Camilalonart Photography',
    locale: 'en_CA',
    images: [
      {
        url: `${SITE_CONFIG.url}/images/pets/A7T05223-horizontal.jpg`,
        width: 1200,
        height: 630,
        alt: 'Vancouver Pet Photography - Dog Portrait',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pet Photographer Vancouver BC | Camilalonart',
    description: 'Professional pet photography in Vancouver. Capture your furry friend\'s personality with stunning portraits!',
    images: [`${SITE_CONFIG.url}/images/pets/A7T05223-horizontal.jpg`],
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
    canonical: `${SITE_CONFIG.url}/photography/pets/`,
  },
};

// Structured data for pet photography service
export const petServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Pet Photography',
  name: 'Vancouver Pet Photography Services',
  description: 'Professional pet portrait photography in Vancouver, BC. Indoor studio and outdoor sessions for dogs, cats, and all pets.',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Camilalonart Photography',
    url: SITE_CONFIG.url,
    image: `${SITE_CONFIG.url}/images/og-image.jpg`,
    telephone: SITE_CONFIG.contact.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Vancouver',
      addressRegion: 'BC',
      addressCountry: 'CA',
    },
    priceRange: '$$',
  },
  areaServed: [
    { '@type': 'City', name: 'Vancouver' },
    { '@type': 'City', name: 'Burnaby' },
    { '@type': 'City', name: 'Richmond' },
    { '@type': 'City', name: 'North Vancouver' },
    { '@type': 'City', name: 'Surrey' },
    { '@type': 'City', name: 'Coquitlam' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Pet Photography Packages',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Mini Session',
        description: '30-minute session, 10 edited images',
        price: '250',
        priceCurrency: 'CAD',
      },
      {
        '@type': 'Offer',
        name: 'Standard Session',
        description: '1-hour session, 25 edited images',
        price: '450',
        priceCurrency: 'CAD',
      },
      {
        '@type': 'Offer',
        name: 'Premium Session',
        description: '2-hour session with multiple locations',
        price: '750',
        priceCurrency: 'CAD',
      },
    ],
  },
};

export const petBreadcrumbSchema = {
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
      name: 'Photography',
      item: `${SITE_CONFIG.url}/photography/`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Pet Photography',
      item: `${SITE_CONFIG.url}/photography/pets/`,
    },
  ],
}; 