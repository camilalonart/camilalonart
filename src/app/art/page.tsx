import ArtPortfolio from '@/components/art/ArtPortfolio';
import { metadata, artistPersonSchema, artGallerySchema, artBreadcrumbSchema } from './metadata';

export { metadata };

export default function ArtPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(artistPersonSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(artGallerySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(artBreadcrumbSchema) }}
      />
      <ArtPortfolio />
    </>
  );
}
