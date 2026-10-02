import data, { localizedMaterials } from '@/data/artPortfolio';
import { existsSync } from 'fs';
import path from 'path';
import { generateMetadata as buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { collection: string; painting: string } }) {
  const collection = [...data.collections, ...data.earlyFirstPaintings].find(item => item.id === params.collection);
  const painting = collection?.paintings.find(item => item.id === params.painting);
  if (!collection || !painting) return { title: 'Painting not found', robots: { index: false } };
  const images = painting.images.filter(image => existsSync(path.join(process.cwd(), 'public', image)));
  const materials = localizedMaterials(painting.materials, 'en');
  return buildMetadata({
    title: `${painting.title} — Camila Londoño`,
    description: `${painting.title}${painting.year > 0 ? `, ${painting.year}` : ''}. ${materials ? `${materials}.` : 'Artwork by Camila Londoño.'}`,
    path: `/art/${collection.id}/${painting.id}/`,
    images: images.length ? images.map(url => ({ url, alt: painting.title })) : undefined,
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      {children}
    </div>
  );
}
