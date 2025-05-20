import fs from 'fs';
import path from 'path';

export async function getPetImages() {
  const response = await fetch('/api/images?category=pets');
  const data = await response.json();
  return data.images;
}

export async function getWeddingImages() {
  const response = await fetch('/api/images?category=wedding');
  const data = await response.json();
  return data.images;
}

export async function getMaternityImages() {
  const response = await fetch('/api/images?category=maternity');
  const data = await response.json();
  return data.images;
}

export async function getFamilyImages() {
  const response = await fetch('/api/images?category=family');
  const data = await response.json();
  return data.images;
}

export async function getHeadshotImages() {
  const response = await fetch('/api/images?category=headshots');
  const data = await response.json();
  return data.images;
} 