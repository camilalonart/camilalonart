import { generateMetadata, generateServiceSchema, generateBreadcrumbSchema, SEO_IMAGES } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Wedding & Couples Photography in Vancouver',
  description: 'Wedding, elopement and couples photography by Camila Londoño in Vancouver, BC. Explore intimate celebrations, engagement portraits and session information.',
  path: '/photography/wedding-couples/',
  images: [{ url: SEO_IMAGES.wedding, alt: 'Wedding photography by Camila Londoño' }],
});

export const weddingServiceSchema = generateServiceSchema({
  type: 'Wedding Photography',
  name: 'Wedding & Couples Photography in Vancouver',
  description: 'Wedding, elopement and couples photography based in Vancouver, BC.',
});
export const weddingBreadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Wedding & Couples', path: '/photography/wedding-couples/' },
]);
