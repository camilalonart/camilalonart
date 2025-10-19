// Wildlife Photography Data
// Add details (title, location, date, description) only for photos you want to customize
// All other photos from /public/images/wildlife/gallery/ will be displayed without details

export interface WildlifePhotoDetails {
  filename: string;  // Nombre del archivo (ej: "A7T00206.jpg")
  title?: string;
  location?: string;
  date?: string;
  description?: string;
}

// Solo agrega aquí las fotos que quieras personalizar con detalles
// Las demás se mostrarán automáticamente sin detalles
export const wildlifePhotoDetails: WildlifePhotoDetails[] = [
  {
    filename: 'A7T00206.jpg',
    title: 'Silent Guardian',
    location: 'Tofino, British Columbia',
    date: 'March 2024',
    description: 'Bald eagle perched on ancient cedar'
  },
  {
    filename: 'A7T01097.jpg',
    title: 'First Light',
    location: 'Great Bear Rainforest, BC',
    date: 'September 2023',
    description: 'Grizzly bear fishing at dawn'
  },
  {
    filename: 'A7T01452.jpg',
    title: 'Ocean Soul',
    location: 'Vancouver Island, BC',
    date: 'July 2024',
    description: 'Orca whale breaching'
  },
  // Agrega más detalles aquí según necesites
  // Las fotos que no estén en esta lista se mostrarán igual, pero sin título/ubicación/fecha
];
