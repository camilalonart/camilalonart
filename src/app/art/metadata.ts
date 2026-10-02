import { canonicalUrl, generateMetadata, generateBreadcrumbSchema, SEO_IMAGES, SITE_CONFIG } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Camila Londoño — Paintings & Art Collections',
  description: 'Explore original paintings, watercolors and mixed-media collections by Camila Londoño, a Colombian artist based in Vancouver, BC.',
  path: '/art/',
  images: [{ url: SEO_IMAGES.art, alt: 'Painting by Camila Londoño from Carrying Home' }],
});

export const artistPersonSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_CONFIG.url}/art/#artist`,
  name: 'Camila Londoño',
  alternateName: ['Camilalonart', 'Camilonart'],
  url: canonicalUrl('/art/'),
  image: new URL(SEO_IMAGES.artist, SITE_CONFIG.url).href,
  description: 'Colombian artist and engineer based in Vancouver, BC.',
  jobTitle: 'Visual Artist',
  sameAs: ['https://www.instagram.com/camilalonart/', 'https://www.instagram.com/camilonart/'],
};

// This is an online portfolio, not a claim of a physical gallery business.
export const artGallerySchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${SITE_CONFIG.url}/art/#gallery`,
  name: 'Camila Londoño — Paintings & Art Collections',
  url: canonicalUrl('/art/'),
  image: new URL(SEO_IMAGES.art, SITE_CONFIG.url).href,
  creator: { '@id': `${SITE_CONFIG.url}/art/#artist` },
};

export const artBreadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Art', path: '/art/' },
]);
