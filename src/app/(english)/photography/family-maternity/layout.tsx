import PhotographyStructuredData from '@/components/PhotographyStructuredData';

export { metadata } from './metadata';

export default function FamilyMaternityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <><PhotographyStructuredData service="family-maternity" />{children}</>;
}
