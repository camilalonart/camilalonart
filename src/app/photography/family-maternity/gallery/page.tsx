import { Metadata } from 'next';
import { getMetadata } from '@/app/metadata';
import FamilyMaternityGalleryClient from '@/app/photography/family-maternity/gallery/FamilyMaternityGalleryClient';

export const metadata: Metadata = getMetadata(
  'Family & Maternity Photography Gallery',
  "Discover our collection of heartwarming family portraits and beautiful maternity photography. Capturing the joy and love of your family's special moments.",
  '/photography/family-maternity/gallery'
);

export default function FamilyMaternityGalleryPage() {
  return <FamilyMaternityGalleryClient />;
} 