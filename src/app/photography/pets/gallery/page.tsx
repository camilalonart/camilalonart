import { Metadata } from 'next';
import { getMetadata } from '@/app/metadata';
import PetGalleryClient from '@/app/photography/pets/gallery/PetGalleryClient';

export const metadata: Metadata = getMetadata(
  'Pet Photography Gallery',
  'Explore our collection of beautiful pet portraits. Professional pet photography capturing the unique personality and charm of your beloved pets.',
  '/photography/pets/gallery'
);

export default function PetGalleryPage() {
  return <PetGalleryClient />;
} 