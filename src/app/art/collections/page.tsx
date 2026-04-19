import CollectionsPage from '@/components/art/CollectionsPage';

export const metadata = {
  title: 'Collections — Camila Londoño',
  description: 'Browse all painting collections by Camila Londoño.',
  alternates: { canonical: 'https://www.camilalonart.com/art/collections/' },
};

export default function CollectionsRoute() {
  return <CollectionsPage />;
}
