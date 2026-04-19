import ArtPortfolio from '@/components/art/ArtPortfolio';

export const metadata = {
  title: 'Camila Londoño — Artist',
  description: 'Explore the art portfolio of Camila Londoño, featuring a diverse collection of paintings in oil, watercolor, and mixed media. Discover vibrant landscapes, expressive portraits, and captivating abstracts that showcase Camila’s unique artistic vision and mastery of color and form. Colombian artist based in Vancouver, BC. Canada',
  alternates: { canonical: 'https://www.camilalonart.com/art/' },
};

export default function ArtPage() {
  return <ArtPortfolio />;
}
