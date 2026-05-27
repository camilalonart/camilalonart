import { Metadata } from 'next';
import { generateMetadata as genMeta, SITE_CONFIG } from '../../../lib/seo';

export const metadata: Metadata = genMeta({
  title: 'Wedding Photographer Vancouver BC | Elopement & Couples Photography',
  description: 'Vancouver wedding photographer capturing timeless moments. Book your free consultation today!',
  path: '/photography/wedding-couples/',
  keywords: [
    'Vancouver wedding photographer',
    'BC wedding photography',
    'elopement photographer Vancouver',
    'couples photography Vancouver',
    'engagement photographer Vancouver',
    'wedding photos Vancouver BC',
    'intimate wedding photography',
    'outdoor wedding photographer BC',
    'destination wedding Vancouver',
    'affordable wedding photographer Vancouver',
    'romantic wedding photography',
    'candid wedding photos',
    'Whistler wedding photographer',
    'Sea to Sky wedding photography',
    'Stanley Park wedding photos',
    'Queen Elizabeth Park wedding',
  ],
  images: [
    {
      url: '/images/wedding/og-wedding.jpg',
      alt: 'Vancouver Wedding Photography by Camilalonart',
    },
  ],
});

// Structured data for wedding photography service
export const weddingServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Wedding Photography',
  name: 'Vancouver Wedding Photography Services',
  description: 'Professional wedding photography services in Vancouver, BC. Capturing your special day with a natural, candid approach. Serving Vancouver, Whistler, and the Lower Mainland.',
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
    { '@type': 'City', name: 'West Vancouver' },
    { '@type': 'City', name: 'Surrey' },
    { '@type': 'City', name: 'Whistler' },
    { '@type': 'City', name: 'Squamish' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Wedding Photography Packages',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Elopement Package',
        description: '2-hour coverage for intimate ceremonies',
        price: '800',
        priceCurrency: 'CAD',
      },
      {
        '@type': 'Offer',
        name: 'Essential Wedding Package',
        description: '6-hour coverage with 300+ edited images',
        price: '2500',
        priceCurrency: 'CAD',
      },
      {
        '@type': 'Offer',
        name: 'Complete Wedding Package',
        description: 'Full-day coverage with engagement session',
        price: '4000',
        priceCurrency: 'CAD',
      },
    ],
  },
};

export const weddingBreadcrumbSchema = {
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
      name: 'Wedding & Couples',
      item: `${SITE_CONFIG.url}/photography/wedding-couples/`,
    },
  ],
}; 