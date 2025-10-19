import { WildlifePhotoDetails } from '../data/wildlifePhotos';

export interface WildlifePhoto {
  id: number;
  src: string;
  filename: string;
  title?: string;
  location?: string;
  date?: string;
  description?: string;
}

/**
 * Carga todas las fotos de wildlife desde el JSON generado
 * y combina con los detalles personalizados de wildlifePhotos.ts
 */
export async function loadWildlifePhotos(
  photoDetails: WildlifePhotoDetails[]
): Promise<WildlifePhoto[]> {
  try {
    // Cargar la lista de imágenes del JSON generado por el script
    const response = await fetch('/images.json');
    const imagesData = await response.json();
    
    // Filtrar solo las fotos de wildlife/gallery
    const wildlifeImages = imagesData.images
      .filter((img: string) => img.startsWith('/images/wildlife/gallery/'))
      .sort(); // Ordenar alfabéticamente

    // Crear un mapa de detalles para búsqueda rápida
    const detailsMap = new Map(
      photoDetails.map(detail => [detail.filename, detail])
    );

    // Combinar las fotos con sus detalles
    return wildlifeImages.map((src: string, index: number) => {
      const filename = src.split('/').pop() || '';
      const details = detailsMap.get(filename);

      return {
        id: index + 1,
        src,
        filename,
        title: details?.title,
        location: details?.location,
        date: details?.date,
        description: details?.description,
      };
    });
  } catch (error) {
    console.error('Error loading wildlife photos:', error);
    return [];
  }
}

/**
 * Versión sincrónica para SSR/SSG
 * Requiere que images.json esté disponible
 */
export function loadWildlifePhotosSync(
  photoDetails: WildlifePhotoDetails[]
): WildlifePhoto[] {
  // Esta es una versión simplificada que usa los nombres de archivo directamente
  // En producción, deberías generar images.json durante el build
  const detailsMap = new Map(
    photoDetails.map(detail => [detail.filename, detail])
  );

  return photoDetails.map((detail, index) => ({
    id: index + 1,
    src: `/images/wildlife/gallery/${detail.filename}`,
    filename: detail.filename,
    title: detail.title,
    location: detail.location,
    date: detail.date,
    description: detail.description,
  }));
}
