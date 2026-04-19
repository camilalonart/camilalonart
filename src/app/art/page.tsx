import ArtHome from '@/components/art/ArtHome';

export const metadata = {
  title: 'Camila Londoño — Painter',
  description: 'Original paintings in oil, watercolor, and mixed media. Browse collections and individual works by Camila Londoño.',
  alternates: { canonical: 'https://www.camilalonart.com/art/' },
};

export default function ArtPage() {
  return <ArtHome />;
}
