import data from '@/data/artPortfolio';
import CollectionPage from '@/components/art/CollectionPage';

interface CollectionRouteProps {
  params: Promise<{ collection: string }>;
}

const allCollections = () => [...data.collections, ...data.earlyFirstPaintings];

export async function generateStaticParams() {
  return allCollections().map(c => ({ collection: c.id }));
}

export default async function CollectionRoute({ params }: CollectionRouteProps) {
  const { collection: collectionId } = await params;
  const collection = allCollections().find(c => c.id === collectionId);

  if (!collection) {
    return <div>Collection not found</div>;
  }

  return <CollectionPage collection={collection} />;
}
