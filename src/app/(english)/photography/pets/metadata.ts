import { generateMetadata, generateServiceSchema, generateBreadcrumbSchema, SEO_IMAGES } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Pet Photography in Vancouver',
  description: 'Pet portraits by Camila Londoño in Vancouver, BC. Explore dog and cat photography, session information and a gallery of pets and their personalities.',
  path: '/photography/pets/',
  images: [{ url: SEO_IMAGES.pets, alt: 'Pet portrait by Camila Londoño' }],
});

export const petServiceSchema = generateServiceSchema({
  type: 'Pet Photography',
  name: 'Pet Photography in Vancouver',
  description: 'Pet portrait photography in Vancouver, BC.',
});
export const petBreadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Pet Photography', path: '/photography/pets/' },
]);
