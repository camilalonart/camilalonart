import data from '@/data/artPortfolio';
import CollectionPage from '@/components/art/CollectionPage';

interface CollectionRouteProps {
  params: Promise<{ collection: string }>;
}

export async function generateStaticParams() {
  return data.collections.map(c => ({ collection: c.id }));
}

export async function generateMetadata({ params }: CollectionRouteProps) {
  const { collection: collectionId } = await params;
  const collection = data.collections.find(c => c.id === collectionId);

  if (!collection) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: `${collection.name} — Camila Londoño`,
    description: collection.description,
  };
}

export default async function CollectionRoute({ params }: CollectionRouteProps) {
  const { collection: collectionId } = await params;
  const collection = data.collections.find(c => c.id === collectionId);

  if (!collection) {
    return <div>Collection not found</div>;
  }

  return <CollectionPage collection={collection} />;
}
