import data, { localizedMaterials } from '@/data/artPortfolio';
import PaintingPage from '@/components/art/PaintingPage';
import LocalizedStructuredData from '@/components/LocalizedStructuredData';
import { canonicalUrl, generateBreadcrumbSchema, SITE_CONFIG } from '@/lib/seo';
import { localizedPath, type Locale } from '@/i18n/routing';
import { existsSync } from 'fs';
import path from 'path';

interface PaintingRouteProps {
  params: Promise<{ collection: string; painting: string }>;
}

const allCollections = () => [...data.collections, ...data.earlyFirstPaintings];

export async function generateStaticParams() {
  return allCollections().flatMap(c =>
    c.paintings.map(p => ({ collection: c.id, painting: p.id }))
  );
}

export default async function PaintingRoute({ params }: PaintingRouteProps) {
  const { collection: collectionId, painting: paintingId } = await params;
  const collection = allCollections().find(c => c.id === collectionId);
  const painting = collection?.paintings.find(p => p.id === paintingId);

  if (!collection || !painting) {
    return <div>Painting not found</div>;
  }

  const siblingIndex = collection.paintings.findIndex(p => p.id === painting.id);
  const images = painting.images.filter(image => existsSync(path.join(process.cwd(), 'public', image)));
  const schemas = (locale: Locale) => {
    const artworkPath = localizedPath(`/art/${collection.id}/${painting.id}/`, locale);
    const collectionPath = localizedPath(`/art/${collection.id}/`, locale);
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'VisualArtwork',
        '@id': `${canonicalUrl(artworkPath)}#artwork`,
        name: painting.title,
        url: canonicalUrl(artworkPath),
        mainEntityOfPage: canonicalUrl(artworkPath),
        creator: { '@type': 'Person', '@id': `${SITE_CONFIG.url}/#person`, name: 'Camila Londoño' },
        artMedium: localizedMaterials(painting.materials, locale),
        ...(painting.year > 0 ? { dateCreated: String(painting.year) } : {}),
        image: images.map(image => new URL(image, SITE_CONFIG.url).href),
        isPartOf: { '@type': 'CollectionPage', name: collection.name, url: canonicalUrl(collectionPath) },
      },
      generateBreadcrumbSchema([
        { name: locale === 'es' ? 'Inicio' : 'Home', path: localizedPath('/', locale) },
        { name: locale === 'es' ? 'Arte' : 'Art', path: localizedPath('/art/', locale) },
        { name: collection.name, path: collectionPath },
        { name: painting.title, path: artworkPath },
      ]),
    ];
  };

  return (
    <>
      <LocalizedStructuredData en={schemas('en')} es={schemas('es')} />
      <PaintingPage
        painting={painting}
        collection={collection}
        siblingIndex={siblingIndex}
      />
    </>
  );
}
