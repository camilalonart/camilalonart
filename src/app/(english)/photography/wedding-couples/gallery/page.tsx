import { Metadata } from 'next';
import { getMetadata } from '@/app/(english)/metadata';
import WeddingGalleryClient from './WeddingGalleryClient';

export const metadata: Metadata = getMetadata(
  'Wedding Photography Gallery',
  'Browse our stunning collection of wedding and couples photography. Capturing the magic and emotion of your special day with artistic excellence.',
  '/photography/wedding-couples/gallery'
);

export default function WeddingGalleryPage() {
  return <WeddingGalleryClient />;
} 