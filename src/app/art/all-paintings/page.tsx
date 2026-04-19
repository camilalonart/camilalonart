import AllPaintingsPage from '@/components/art/AllPaintingsPage';

export const metadata = {
  title: 'All Paintings — Camila Londoño',
  description: 'Browse the complete collection of all paintings by Camila Londoño, including archival works and contemporary pieces.',
  alternates: { canonical: 'https://www.camilalonart.com/art/all-paintings/' },
};

export default function AllPaintingsRoute() {
  return <AllPaintingsPage />;
}
