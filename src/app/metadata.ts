import type { Metadata } from 'next';
import { generateMetadata, SEO_IMAGES } from '@/lib/seo';

export const getMetadata = (title: string, description: string, path: string): Metadata => {
  const image = path.includes('wedding-couples') ? SEO_IMAGES.wedding
    : path.includes('family-maternity') ? SEO_IMAGES.family
    : path.includes('/pets') ? SEO_IMAGES.pets
    : path.includes('/headshots') ? SEO_IMAGES.headshots
    : path.includes('/wildlife-photography') ? SEO_IMAGES.wildlife
    : SEO_IMAGES.artist;
  return generateMetadata({ title, description, path, images: [{ url: image, alt: title }] });
};
