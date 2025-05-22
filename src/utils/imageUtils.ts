import fs from 'fs';
import path from 'path';
import petImages from '../data/petImages.json';
import weddingImages from '../data/weddingImages.json';

export const petGalleryImages = petImages.map(src =>
  typeof src === 'string' ? { src, alt: src.split('/').pop()?.split('.')[0] || '' } : { src: '', alt: '' }
);
export const weddingGalleryImages = weddingImages.map(src =>
  typeof src === 'string' ? { src, alt: src.split('/').pop()?.split('.')[0] || '' } : { src: '', alt: '' }
);

export async function getPetImages() {
  return petGalleryImages;
}

export async function getWeddingImages() {
  return weddingGalleryImages;
}

// These functions are kept for future use
export async function getMaternityImages() {
  return [];
}

export async function getFamilyImages() {
  return [];
}

export async function getHeadshotImages() {
  return [];
} 