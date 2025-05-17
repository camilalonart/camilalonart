import { promises as fs } from 'fs';
import path from 'path';
import { GalleryCategory, GallerySection, ImageMetadata } from '@/types/gallery';

export async function loadGalleryData(category: string): Promise<GalleryCategory> {
  const dataPath = path.join(process.cwd(), 'src', 'data', category);
  const data = await fs.readFile(`${dataPath}.json`, 'utf8');
  return JSON.parse(data);
}

export async function getAllCategories(): Promise<string[]> {
  const dataDir = path.join(process.cwd(), 'src', 'data');
  const files = await fs.readdir(dataDir);
  return files
    .filter(file => file.endsWith('.json'))
    .map(file => file.replace('.json', ''));
}

export function filterImagesByTag(images: ImageMetadata[], tag: string): ImageMetadata[] {
  if (tag === 'all') return images;
  return images.filter(image => image.tags?.includes(tag));
}

export function getUniqueTags(sections: GallerySection[]): string[] {
  const tags = new Set<string>();
  sections.forEach(section => {
    section.images.forEach(image => {
      image.tags?.forEach(tag => tags.add(tag));
    });
  });
  return Array.from(tags);
}

export function validateImagePath(imagePath: string): boolean {
  // Add validation logic here (e.g., check if file exists)
  return true;
}

export async function addNewImage(
  category: string,
  sectionTitle: string,
  imageData: Omit<ImageMetadata, 'id'>
): Promise<void> {
  const dataPath = path.join(process.cwd(), 'src', 'data', `${category}.json`);
  const data = await loadGalleryData(category);
  
  const section = data.sections.find(s => s.title === sectionTitle);
  if (!section) {
    throw new Error(`Section "${sectionTitle}" not found in category "${category}"`);
  }

  const newImage: ImageMetadata = {
    ...imageData,
    id: `${category}-${Date.now()}`, // Generate a unique ID
  };

  section.images.push(newImage);
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
} 