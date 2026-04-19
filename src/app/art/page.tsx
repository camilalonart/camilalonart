import ArtPortfolio from '@/components/art/ArtPortfolio';

export const metadata = {
  title: 'Camila Londoño — Painter',
  description: 'Original paintings in oil, watercolor, and mixed media. Browse collections and individual works by Camila Londoño.',
  alternates: { canonical: 'https://www.camilalonart.com/art/' },
};

export default function ArtPage() {
  return <ArtPortfolio />;
}
