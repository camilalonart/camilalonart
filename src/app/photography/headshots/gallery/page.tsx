import { Metadata } from 'next';
import { getMetadata } from '../../../../app/metadata';
import HeadshotsGalleryClient from './HeadshotsGalleryClient';

export const metadata: Metadata = getMetadata(
  'Professional Headshots Gallery',
  'View our collection of professional headshots and portraits. Perfect for business professionals, actors, and anyone looking to make a strong first impression.',
  '/photography/headshots/gallery'
);

export default function HeadshotsGalleryPage() {
  return <HeadshotsGalleryClient />;
} 