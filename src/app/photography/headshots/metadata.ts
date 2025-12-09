import type { Metadata } from 'next';
import { SITE_CONFIG } from '../../../lib/seo';

export const metadata: Metadata = {
  title: 'Professional Headshots Vancouver BC | Corporate & LinkedIn Photos',
  description: 'Vancouver\'s premier headshot photographer. Professional corporate headshots, LinkedIn profile photos, and executive portraits. Modern studio in downtown Vancouver. Same-day delivery available!',
  keywords: [
    'professional headshots Vancouver',
    'corporate headshots Vancouver',
    'LinkedIn headshots Vancouver',
    'business portraits Vancouver BC',
    'executive headshots Vancouver',
    'actor headshots Vancouver',
    'professional photos Vancouver',
    'corporate photographer Vancouver',
    'business headshots downtown Vancouver',
    'professional portrait photographer',
    'team headshots Vancouver',
    'company headshots BC',
  ],
  openGraph: {
    type: 'website',
    url: `${SITE_CONFIG.url}/photography/headshots/`,
    title: 'Professional Headshots Vancouver | Corporate & LinkedIn Photos',
    description: 'Vancouver\'s premier headshot photographer. Corporate headshots, LinkedIn photos, and executive portraits. Book your session today!',
    siteName: 'Camilalonart Photography',
    locale: 'en_CA',
    images: [
      {
        url: `${SITE_CONFIG.url}/images/headshots/og-headshots.jpg`,
        width: 1200,
        height: 630,
        alt: 'Professional Headshots Vancouver - Camilalonart',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Headshots Vancouver BC | Camilalonart',
    description: 'Corporate headshots, LinkedIn photos, and executive portraits in Vancouver.',
    images: [`${SITE_CONFIG.url}/images/headshots/og-headshots.jpg`],
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
    canonical: `${SITE_CONFIG.url}/photography/headshots/`,
  },
};

// Structured data for headshot photography service
export const headshotServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Headshot Photography',
  name: 'Professional Headshots Vancouver',
  description: 'Professional headshot photography services in Vancouver, BC. Corporate headshots, LinkedIn profile photos, and executive portraits.',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Camilalonart Photography',
    url: SITE_CONFIG.url,
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
    { '@type': 'City', name: 'Downtown Vancouver' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Headshot Photography Packages',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Basic Headshot',
        description: '1 look, 3 edited images',
        price: '199',
        priceCurrency: 'CAD',
      },
      {
        '@type': 'Offer',
        name: 'Professional Package',
        description: '2 looks, 6 edited images',
        price: '349',
        priceCurrency: 'CAD',
      },
      {
        '@type': 'Offer',
        name: 'Executive Package',
        description: '3 looks, 10 edited images',
        price: '549',
        priceCurrency: 'CAD',
      },
    ],
  },
};

export const headshotBreadcrumbSchema = {
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
      name: 'Professional Headshots',
      item: `${SITE_CONFIG.url}/photography/headshots/`,
    },
  ],
}; 