import PhotographyStructuredData from '@/components/PhotographyStructuredData';

export { metadata } from './metadata';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <><PhotographyStructuredData service="pets" />{children}</>;
}
