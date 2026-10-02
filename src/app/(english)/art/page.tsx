import ArtPortfolio from '@/components/art/ArtPortfolio';
import { metadata, artistPersonSchema, artGallerySchema, artBreadcrumbSchema, spanishArtSchemas } from './metadata';
import LocalizedStructuredData from '@/components/LocalizedStructuredData';

export { metadata };

export default function ArtPage() {
  return (
    <>
      <LocalizedStructuredData en={[artistPersonSchema, artGallerySchema, artBreadcrumbSchema]} es={spanishArtSchemas} />
      <ArtPortfolio />
    </>
  );
}
