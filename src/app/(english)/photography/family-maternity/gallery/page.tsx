import { Metadata } from 'next';
import { getMetadata } from '@/app/(english)/metadata';
import FamilyMaternityGalleryClient from './FamilyMaternityGalleryClient';

export const metadata: Metadata = getMetadata(
  'Family & Maternity Photography Gallery',
  "Discover our collection of heartwarming family portraits and beautiful maternity photography. Capturing the joy and love of your family's special moments.",
  '/photography/family-maternity/gallery'
);

export default function FamilyMaternityGalleryPage() {
  return <FamilyMaternityGalleryClient />;
} 