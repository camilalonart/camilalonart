import EarlyPaintingsPage from '@/components/art/EarlyPaintingsPage';

export const metadata = {
  title: 'Early First Paintings — Camila Londoño',
  description: 'Archival collection of early paintings by Camila Londoño.',
  alternates: { canonical: 'https://www.camilalonart.com/art/early-first-paintings/' },
};

export default function EarlyPaintingsRoute() {
  return <EarlyPaintingsPage />;
}
