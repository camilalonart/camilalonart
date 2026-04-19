import data from '@/data/artPortfolio';
import PaintingPage from '@/components/art/PaintingPage';

interface PaintingRouteProps {
  params: Promise<{ collection: string; painting: string }>;
}

export async function generateStaticParams() {
  return data.collections.flatMap(c =>
    c.paintings.map(p => ({ collection: c.id, painting: p.id }))
  );
}

export async function generateMetadata({ params }: PaintingRouteProps) {
  const { collection: collectionId, painting: paintingId } = await params;
  const collection = data.collections.find(c => c.id === collectionId);
  const painting = collection?.paintings.find(p => p.id === paintingId);

  if (!painting) {
    return { title: 'Not Found' };
  }

  return {
    title: `${painting.title} — Camila Londoño`,
    description: `${painting.title}, ${painting.year}. ${painting.materials}.`,
  };
}

export default async function PaintingRoute({ params }: PaintingRouteProps) {
  const { collection: collectionId, painting: paintingId } = await params;
  const collection = data.collections.find(c => c.id === collectionId);
  const painting = collection?.paintings.find(p => p.id === paintingId);

  if (!collection || !painting) {
    return <div>Painting not found</div>;
  }

  const siblingIndex = collection.paintings.findIndex(p => p.id === painting.id);

  return (
    <PaintingPage
      painting={painting}
      collection={collection}
      siblingIndex={siblingIndex}
    />
  );
}
