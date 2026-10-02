import type { Metadata } from 'next';
import { localeFromPath, localizedPath, stripLocale, type Locale } from '@/i18n/routing';

export const SITE_CONFIG = {
  name: 'Camilalonart',
  url: 'https://www.camilalonart.com',
  locale: 'en_CA',
  location: { city: 'Vancouver', region: 'BC', country: 'Canada' },
  contact: { email: 'bycamilalonart@gmail.com', phone: '+1-672-338-9307' },
  social: {
    instagram: 'https://instagram.com/camilalonart',
    facebook: 'https://facebook.com/camilalonart',
    linkedin: 'https://linkedin.com/in/camilalonart',
  },
};

export const SEO_IMAGES = {
  artist: '/images/aboutTheArtist/TraditionalArt1.webp',
  art: '/images/art/traditionalArt/Carrying Home/We.webp',
  pets: '/images/pets/A7T05223-horizontal.webp',
  wedding: '/images/wedding/gallery/A7T00021.webp',
  family: '/images/family/baby/A7T03164.webp',
  headshots: '/images/headshots/A7T01707.webp',
  wildlife: '/images/wildlife/gallery/2M7A1626.webp',
  experiences: '/images/artExperiences/You&I/A7T01622.webp',
};

export function canonicalUrl(path: string): string {
  const pathname = path.split(/[?#]/)[0].replace(/^\/+|\/+$/g, '');
  return `${SITE_CONFIG.url}/${pathname ? `${pathname}/` : ''}`;
}

const defaultTitle = 'Camila Londoño — Art, Photography & Creative Experiences';
const defaultDescription = 'Explore original paintings, photography and creative experiences by Camila Londoño, a Colombian artist and engineer based in Vancouver, BC.';

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  // Page helpers supply complete titles; existing page-level titles must not be branded twice.
  title: defaultTitle,
  description: defaultDescription,
  authors: [{ name: 'Camila Londoño', url: canonicalUrl('/') }],
  creator: 'Camila Londoño',
  publisher: SITE_CONFIG.name,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: SITE_CONFIG.locale,
    alternateLocale: 'es_CA',
    url: canonicalUrl('/'),
    siteName: SITE_CONFIG.name,
    title: defaultTitle,
    description: defaultDescription,
    images: [{ url: SEO_IMAGES.artist, alt: 'Camila Londoño, artist and photographer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: [SEO_IMAGES.artist],
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
  alternates: {
    canonical: canonicalUrl('/'),
    languages: { en: canonicalUrl('/'), es: canonicalUrl('/es/'), 'x-default': canonicalUrl('/') },
  },
};

export function generateMetadata({
  title,
  description,
  path,
  keywords = [],
  images,
  noIndex = false,
  locale = localeFromPath(path),
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  images?: { url: string; alt: string }[];
  noIndex?: boolean;
  locale?: Locale;
}): Metadata {
  const url = canonicalUrl(localizedPath(path, locale));
  const fullTitle = /camilalonart|camila londoño/i.test(title) ? title : `${title} | ${SITE_CONFIG.name}`;
  const ogImages = images?.map(image => ({
    ...image,
    url: new URL(image.url, SITE_CONFIG.url).href,
  })) ?? baseMetadata.openGraph?.images;

  return {
    title: { absolute: fullTitle },
    description,
    keywords,
    openGraph: { ...baseMetadata.openGraph, locale: locale === 'es' ? 'es_CA' : 'en_CA', alternateLocale: locale === 'es' ? 'en_CA' : 'es_CA', title: fullTitle, description, url, images: ogImages },
    twitter: {
      ...baseMetadata.twitter,
      title: fullTitle,
      description,
      images: images?.map(image => new URL(image.url, SITE_CONFIG.url).href) ?? baseMetadata.twitter?.images,
    },
    alternates: {
      canonical: url,
      languages: {
        en: canonicalUrl(stripLocale(path)),
        es: canonicalUrl(localizedPath(path, 'es')),
        'x-default': canonicalUrl(stripLocale(path)),
      },
    },
    robots: noIndex ? { index: false, follow: true } : baseMetadata.robots,
  };
}

export function generateLocalBusinessSchema(locale: Locale = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_CONFIG.url}/#business`,
    name: 'Camilalonart Photography',
    image: [new URL(SEO_IMAGES.artist, SITE_CONFIG.url).href],
    description: locale === 'es' ? 'Fotografía en Vancouver, BC: bodas y parejas, mascotas, retratos familiares y de maternidad y retratos profesionales.' : 'Photography in Vancouver, BC: weddings and couples, pets, family and maternity portraits, and professional headshots.',
    url: canonicalUrl(localizedPath('/', locale)),
    telephone: SITE_CONFIG.contact.phone,
    email: SITE_CONFIG.contact.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE_CONFIG.location.city,
      addressRegion: SITE_CONFIG.location.region,
      addressCountry: SITE_CONFIG.location.country,
    },
    sameAs: [SITE_CONFIG.social.instagram],
  };
}

export type LocalBusinessSchema = ReturnType<typeof generateLocalBusinessSchema>;

export function generatePhotographerSchema(locale: Locale = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_CONFIG.url}/#person`,
    name: 'Camila Londoño',
    alternateName: 'Camilalonart',
    jobTitle: locale === 'es' ? 'Artista y fotógrafa' : 'Artist and photographer',
    url: canonicalUrl(localizedPath('/', locale)),
    image: new URL(SEO_IMAGES.artist, SITE_CONFIG.url).href,
    description: locale === 'es' ? 'Artista, fotógrafa e ingeniera colombiana en Vancouver, BC.' : 'Colombian artist, photographer and engineer based in Vancouver, BC.',
    sameAs: [SITE_CONFIG.social.instagram],
  };
}

export type PhotographerSchema = ReturnType<typeof generatePhotographerSchema>;

export interface ServiceSchema {
  '@context': 'https://schema.org';
  '@type': 'Service';
  serviceType: string;
  name: string;
  description: string;
  provider: { '@type': 'LocalBusiness'; name: string; url: string };
  areaServed: { '@type': 'City'; name: string }[];
  hasOfferCatalog?: {
    '@type': 'OfferCatalog';
    name: string;
    itemListElement: { '@type': 'Offer'; name: string; price: string; priceCurrency: string }[];
  };
}

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
    provider: { '@type': 'LocalBusiness', name: 'Camilalonart Photography', url: canonicalUrl('/') },
    areaServed: [{ '@type': 'City', name: SITE_CONFIG.location.city }],
  };
  if (service.offers) {
    schema.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: `${service.name} Packages`,
      itemListElement: service.offers.map(offer => ({ '@type': 'Offer', ...offer, priceCurrency: 'CAD' })),
    };
  }
  return schema;
}

export interface BreadcrumbSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: { '@type': 'ListItem'; position: number; name: string; item: string }[];
}

export function generateBreadcrumbSchema(items: { name: string; path: string }[]): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

export function jsonLdScript(schema: object | object[]): string {
  const schemas = Array.isArray(schema) ? schema : [schema];
  return JSON.stringify(schemas.length === 1 ? schemas[0] : schemas).replace(/</g, '\\u003c');
}
