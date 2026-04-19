import { Metadata } from 'next';
import { getMetadata } from '@/app/metadata';

export const metadata: Metadata = getMetadata(
  'Family & Maternity Photography',
  'Professional family, maternity, and newborn photography in Vancouver. Capture precious moments of pregnancy, your newborn\'s first days, and beautiful family portraits. Book your session today.',
  '/photography/family-maternity'
);

export default function FamilyMaternityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
