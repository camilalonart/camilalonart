import { Metadata } from 'next';

// Site-wide constants
export const SITE_CONFIG = {
  name: 'Camilalonart',
  url: 'https://www.camilalonart.com',
  locale: 'en_CA',
  alternateLocale: 'es',
  location: {
    city: 'Vancouver',
    region: 'BC',
    country: 'Canada',
    postalCode: 'V5Z',
    coordinates: {
      latitude: 49.2827,
      longitude: -123.1207,
    },
  },
  contact: {
    email: 'bycamilalonart@gmail.com',
    phone: '+1-672-338-9307',
  },
  social: {
    instagram: 'https://instagram.com/camilalonart',
    facebook: 'https://facebook.com/camilalonart',
    linkedin: 'https://linkedin.com/in/camilalonart',
  },
};

// Base metadata for all pages
export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: 'Camilalonart',
    template: '%s | Artist, Photographer, Engineer',
  },
  description: 'Fine artist, photographer, engineer',
  keywords: [
    // Primary keywords
    'Vancouver wedding photographer',
    'Vancouver pet photographer',
    'Vancouver headshot photographer',
    'BC wedding photography',
    // Location variations
    'wedding photographer Vancouver BC',
    'pet photography Vancouver',
    'professional headshots Vancouver',
    'elopement photographer BC',
    // Service keywords
    'couples photography Vancouver',
    'family photographer Vancouver',
    'maternity photography Vancouver',
    // Long-tail keywords
    'affordable wedding photographer Vancouver',
    'outdoor wedding photography BC',
    'dog photographer Vancouver',
    'cat photography Vancouver',
    'corporate headshots Vancouver',
    'LinkedIn headshots Vancouver',
  ],
  authors: [{ name: 'Camilalonart', url: SITE_CONFIG.url }],
  creator: 'Camilalonart',
  publisher: 'Camilalonart',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: SITE_CONFIG.url,
    siteName: 'Camilalonart Photography',
    title: 'Camilalonart',
    description: 'Fine artist, photographer, engineer',
    images: [
      {
        url: `${SITE_CONFIG.url}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Camilalonart - Fine Artist, Photographer, Engineer',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Camilalonart',
    description: 'Fine artist, photographer, engineer',
    images: [`${SITE_CONFIG.url}/images/og-image.jpg`],
    creator: '@camilalonart',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_CONFIG.url,
    languages: {
      'en-CA': SITE_CONFIG.url,
      'es': `${SITE_CONFIG.url}/es`,
    },
  },
  category: 'Photography',
};

// Generate page-specific metadata
export function generateMetadata({
  title,
  description,
  path,
  keywords = [],
  images,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  images?: { url: string; alt: string }[];
  noIndex?: boolean;
}): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;
  const allKeywords = [...(baseMetadata.keywords as string[]), ...keywords];
  
  const ogImages = images?.map(img => ({
    url: img.url.startsWith('http') ? img.url : `${SITE_CONFIG.url}${img.url}`,
    width: 1200,
    height: 630,
    alt: img.alt,
  })) || baseMetadata.openGraph?.images;

  return {
    ...baseMetadata,
    title,
    description,
    keywords: allKeywords,
    openGraph: {
      ...baseMetadata.openGraph,
      title,
      description,
      url,
      images: ogImages,
    },
    twitter: {
      ...baseMetadata.twitter,
      title,
      description,
      images: images?.map(img => img.url.startsWith('http') ? img.url : `${SITE_CONFIG.url}${img.url}`) || baseMetadata.twitter?.images,
    },
    alternates: {
      canonical: url,
    },
    robots: noIndex ? { index: false, follow: false } : baseMetadata.robots,
  };
}

// Structured Data Types
export interface LocalBusinessSchema {
  '@context': 'https://schema.org';
  '@type': 'LocalBusiness';
  '@id': string;
  name: string;
  image: string[];
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: {
    '@type': 'PostalAddress';
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
    postalCode: string;
  };
  geo: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  areaServed: {
    '@type': 'GeoCircle';
    geoMidpoint: {
      '@type': 'GeoCoordinates';
      latitude: number;
      longitude: number;
    };
    geoRadius: string;
  }[];
  priceRange: string;
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification';
    dayOfWeek: string[];
    opens: string;
    closes: string;
  };
  sameAs: string[];
}

export interface PhotographerSchema {
  '@context': 'https://schema.org';
  '@type': 'Photographer';
  name: string;
  url: string;
  image: string;
  description: string;
  address: {
    '@type': 'PostalAddress';
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  areaServed: string[];
  hasOfferCatalog: {
    '@type': 'OfferCatalog';
    name: string;
    itemListElement: {
      '@type': 'Offer';
      itemOffered: {
        '@type': 'Service';
        name: string;
        description: string;
      };
    }[];
  };
}

export interface ServiceSchema {
  '@context': 'https://schema.org';
  '@type': 'Service';
  serviceType: string;
  name: string;
  description: string;
  provider: {
    '@type': 'LocalBusiness';
    name: string;
    url: string;
  };
  areaServed: {
    '@type': 'City';
    name: string;
  }[];
  hasOfferCatalog?: {
    '@type': 'OfferCatalog';
    name: string;
    itemListElement: {
      '@type': 'Offer';
      name: string;
      price: string;
      priceCurrency: string;
    }[];
  };
}

export interface BreadcrumbSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: {
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }[];
}

// Generate LocalBusiness schema
export function generateLocalBusinessSchema(): LocalBusinessSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_CONFIG.url}/#business`,
    name: 'Camilalonart Photography',
    image: [
      `${SITE_CONFIG.url}/images/og-image.jpg`,
      `${SITE_CONFIG.url}/images/studio.jpg`,
    ],
    description: 'Professional photography studio in Vancouver, BC specializing in wedding photography, pet portraits, professional headshots, and creative services.',
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.contact.phone,
    email: SITE_CONFIG.contact.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE_CONFIG.location.city,
      addressRegion: SITE_CONFIG.location.region,
      addressCountry: SITE_CONFIG.location.country,
      postalCode: SITE_CONFIG.location.postalCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.location.coordinates.latitude,
      longitude: SITE_CONFIG.location.coordinates.longitude,
    },
    areaServed: [
      {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: SITE_CONFIG.location.coordinates.latitude,
          longitude: SITE_CONFIG.location.coordinates.longitude,
        },
        geoRadius: '50000', // 50km radius
      },
    ],
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00',
    },
    sameAs: [
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.linkedin,
    ],
  };
}

// Generate Photographer schema
export function generatePhotographerSchema(): PhotographerSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Photographer',
    name: 'Camilalonart',
    url: SITE_CONFIG.url,
    image: `${SITE_CONFIG.url}/images/og-image.jpg`,
    description: 'Professional photographer based in Vancouver, BC, specializing in weddings, pet portraits, and commercial photography.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE_CONFIG.location.city,
      addressRegion: SITE_CONFIG.location.region,
      addressCountry: SITE_CONFIG.location.country,
    },
    areaServed: [
      'Vancouver',
      'Burnaby',
      'Richmond',
      'North Vancouver',
      'West Vancouver',
      'Surrey',
      'Coquitlam',
      'New Westminster',
      'Lower Mainland',
      'British Columbia',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Photography Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Wedding Photography',
            description: 'Professional wedding and elopement photography in Vancouver and BC',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Pet Photography',
            description: 'Professional pet portrait photography in Vancouver',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Professional Headshots',
            description: 'Corporate and LinkedIn headshot photography in Vancouver',
          },
        },
      ],
    },
  };
}

// Generate Service schema for specific services
export function generateServiceSchema(service: {
  type: string;
  name: string;
  description: string;
  offers?: { name: string; price: string }[];
}): ServiceSchema {
  const schema: ServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.type,
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Camilalonart Photography',
      url: SITE_CONFIG.url,
    },
    areaServed: [
      { '@type': 'City', name: 'Vancouver' },
      { '@type': 'City', name: 'Burnaby' },
      { '@type': 'City', name: 'Richmond' },
      { '@type': 'City', name: 'North Vancouver' },
      { '@type': 'City', name: 'Surrey' },
    ],
  };

  if (service.offers) {
    schema.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: `${service.name} Packages`,
      itemListElement: service.offers.map(offer => ({
        '@type': 'Offer',
        name: offer.name,
        price: offer.price,
        priceCurrency: 'CAD',
      })),
    };
  }

  return schema;
}

// Generate Breadcrumb schema
export function generateBreadcrumbSchema(items: { name: string; path: string }[]): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.path}`,
    })),
  };
}

// Export JSON-LD script string
export function jsonLdScript(schema: object | object[]): string {
  const schemas = Array.isArray(schema) ? schema : [schema];
  return JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
}
