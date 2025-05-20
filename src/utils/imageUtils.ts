import fs from 'fs';
import path from 'path';

export const petGalleryImages = [
  { src: '/images/pets/A7T05648-3.jpg', alt: 'Pet portrait' },
  { src: '/images/pets/A7T02596.jpg', alt: 'Pet portrait' },
  { src: '/images/pets/A7T02565.jpg', alt: 'Pet portrait' },
  { src: '/images/pets/A7T05223-horizontal.jpg', alt: 'Pet portrait' },
  { src: '/images/pets/A7T05911.jpg', alt: 'Pet portrait' },
  { src: '/images/pets/A7T05844copy.jpg', alt: 'Pet portrait' },
  { src: '/images/pets/A7T05654.jpg', alt: 'Pet portrait' },
  { src: '/images/pets/A7T02365.jpg', alt: 'Pet portrait' },
  { src: '/images/pets/A7T02388.jpg', alt: 'Pet portrait' },
  { src: '/images/pets/A7T02378.jpg', alt: 'Pet portrait' },
  { src: '/images/pets/A7T02468-3.jpg', alt: 'Pet portrait' },
  { src: '/images/pets/A7T02414-2.jpg', alt: 'Pet portrait' },
  { src: '/images/pets/A7T02360.jpg', alt: 'Pet portrait' },
  { src: '/images/pets/A7T02349.jpg', alt: 'Pet portrait' },
  { src: '/images/pets/A7T09768.jpg', alt: 'Pet portrait' },
  { src: '/images/pets/A7T09762-2.jpg', alt: 'Pet portrait' }
];

export const weddingGalleryImages = [
  { src: '/images/wedding/A7T09955-2.jpg', alt: 'Wedding portrait' },
  { src: '/images/wedding/A7T00021.jpg', alt: 'Wedding portrait' },
  { src: '/images/wedding/A7T01233Crop.jpg', alt: 'Wedding portrait' },
  { src: '/images/wedding/A7T09955.jpg', alt: 'Wedding portrait' },
  { src: '/images/wedding/A7T09634.jpg', alt: 'Wedding portrait' },
  { src: '/images/wedding/A7T09834.jpg', alt: 'Wedding portrait' },
  { src: '/images/wedding/A7T09612.jpg', alt: 'Wedding portrait' },
  { src: '/images/wedding/A7T01425.jpg', alt: 'Wedding portrait' },
  { src: '/images/wedding/A7T01396.jpg', alt: 'Wedding portrait' },
  { src: '/images/wedding/A7T01413-2.jpg', alt: 'Wedding portrait' },
  { src: '/images/wedding/A7T00849.jpg', alt: 'Wedding portrait' },
  { src: '/images/wedding/A7T00765.jpg', alt: 'Wedding portrait' },
  { src: '/images/wedding/A7T00438.jpg', alt: 'Wedding portrait' },
  { src: '/images/wedding/A7T09940.jpg', alt: 'Wedding portrait' }
];

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