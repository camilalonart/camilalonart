export interface ImageMetadata {
  id: string;
  title: string;
  description?: string;
  imagePath: string;
  category: string;
  tags?: string[];
  date?: string;
  dimensions?: {
    width: number;
    height: number;
  };
  location?: string;
  camera?: {
    model?: string;
    settings?: {
      aperture?: string;
      shutterSpeed?: string;
      iso?: number;
      focalLength?: string;
    };
  };
  // For art pieces
  medium?: string;
  technique?: string;
  // For client work
  client?: string;
  projectType?: string;
}

export interface GallerySection {
  title: string;
  description?: string;
  images: ImageMetadata[];
}

export interface GalleryCategory {
  id: string;
  name: string;
  description?: string;
  sections: GallerySection[];
} 