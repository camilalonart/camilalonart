import { Gallery } from '@/components/Gallery/Gallery';
import { loadGalleryData } from '@/utils/galleryUtils';
import { GalleryCategory } from '@/types/gallery';

export default async function WildlifePage() {
  const galleryData: GalleryCategory = await loadGalleryData('photography/wildlife');

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8">{galleryData.name}</h1>
      {galleryData.description && (
        <p className="text-lg mb-8">{galleryData.description}</p>
      )}
      <Gallery sections={galleryData.sections} />
    </div>
  );
} 