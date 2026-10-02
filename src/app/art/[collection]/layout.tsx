import data from '@/data/artPortfolio';
import { existsSync } from 'fs';
import path from 'path';
import { generateMetadata as buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { collection: string } }) {
  const collection = [...data.collections, ...data.earlyFirstPaintings].find(item => item.id === params.collection);
  if (!collection) return { title: 'Collection not found', robots: { index: false } };
  const image = collection.paintings.flatMap(painting => painting.images).find(image =>
    existsSync(path.join(process.cwd(), 'public', image))
  );
  return buildMetadata({
    title: `${collection.name} — Camila Londoño`,
    description: collection.description,
    path: `/art/${collection.id}/`,
    images: image ? [{ url: image, alt: collection.name }] : undefined,
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      {children}
    </div>
  );
}
