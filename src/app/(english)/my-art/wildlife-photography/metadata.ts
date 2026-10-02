import { generateMetadata, SEO_IMAGES } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Wildlife Photography',
  description: 'A personal wildlife photography portfolio by Camila Londoño. Discover photographs of animals, birds and encounters with the natural world.',
  path: '/my-art/wildlife-photography/',
  images: [{ url: SEO_IMAGES.wildlife, alt: 'Wildlife photography by Camila Londoño' }],
});
