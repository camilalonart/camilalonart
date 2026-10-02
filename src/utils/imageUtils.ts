import petImages from '../data/petImages.json';
import weddingImages from '../data/weddingImages.json';
import headshotImages from '../data/headshotImages.json';
import familyImages from '../data/familyImages.json';
import maternityImages from '../data/maternityImages.json';

export const petGalleryImages = petImages.map(src =>
  typeof src === 'string' ? { src, alt: src.split('/').pop()?.split('.')[0] || '' } : { src: '', alt: '' }
);
export const weddingGalleryImages = weddingImages.map(src =>
  typeof src === 'string' ? { src, alt: src.split('/').pop()?.split('.')[0] || '' } : { src: '', alt: '' }
);
export const headshotGalleryImages = headshotImages.map((src, index) => ({
  src,
  alt: `Professional portrait ${index + 1} by Camilalonart`,
}));
export const familyGalleryImages = familyImages.map((src, index) => ({
  src,
  alt: `Family and childhood portrait ${index + 1} by Camilalonart`,
}));
export const maternityGalleryImages = (maternityImages as string[]).map((src, index) => ({
  src,
  alt: `Maternity portrait ${index + 1} by Camilalonart`,
}));

export async function getPetImages() {
  return petGalleryImages;
}

export async function getWeddingImages() {
  return weddingGalleryImages;
}

export async function getMaternityImages() {
  return maternityGalleryImages;
}

export async function getFamilyImages() {
  return familyGalleryImages;
}

export async function getHeadshotImages() {
  return headshotGalleryImages;
} 