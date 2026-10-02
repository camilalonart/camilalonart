import { generateMetadata, generateServiceSchema, generateBreadcrumbSchema, SEO_IMAGES } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Professional Headshots in Vancouver',
  description: 'Professional portraits and headshots by Camila Londoño in Vancouver, BC. View the portfolio and explore sessions for your profile, work and personal brand.',
  path: '/photography/headshots/',
  images: [{ url: SEO_IMAGES.headshots, alt: 'Professional headshot by Camila Londoño' }],
});

export const headshotServiceSchema = generateServiceSchema({
  type: 'Headshot Photography',
  name: 'Professional Headshots in Vancouver',
  description: 'Professional portrait and headshot photography in Vancouver, BC.',
});
export const headshotBreadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Professional Headshots', path: '/photography/headshots/' },
]);
