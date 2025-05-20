import fs from 'fs';
import path from 'path';

export async function getPetImages() {
  const response = await fetch('/api/images?category=pets/gallery');
  const data = await response.json();
  return data.images;
}

export async function getWeddingImages() {
  const response = await fetch('/api/images?category=wedding/gallery');
  const data = await response.json();
  return data.images;
}

export async function getMaternityImages() {
  const response = await fetch('/api/images?category=maternity/gallery');
  const data = await response.json();
  return data.images;
}

export async function getFamilyImages() {
  const response = await fetch('/api/images?category=family/gallery');
  const data = await response.json();
  return data.images;
}

export async function getHeadshotImages() {
  const response = await fetch('/api/images?category=headshots/gallery');
  const data = await response.json();
  return data.images;
} 