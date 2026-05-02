#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images/art/traditionalArt');
const dataFile = path.join(__dirname, '../src/data/artPortfolio.ts');

// Recursively get all image files
function getAllImages(dir, prefix = '') {
  const images = new Set();
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  entries.forEach((entry) => {
    if (entry.isDirectory()) {
      const subDir = path.join(dir, entry.name);
      const subImages = getAllImages(subDir, prefix + entry.name + '/');
      subImages.forEach((img) => images.add(img));
    } else if (/\.(webp|jpg|png|heic)$/i.test(entry.name)) {
      images.add(`/images/art/traditionalArt/${prefix}${entry.name}`);
    }
  });

  return images;
}

// Extract all image references from artPortfolio.ts
function getReferencedImages(tsContent) {
  const imageRefs = new Set();
  const imageRegex = /["']\/images\/art\/traditionalArt\/[^"']+["']/g;
  let match;

  while ((match = imageRegex.exec(tsContent)) !== null) {
    imageRefs.add(match[0].slice(1, -1)); // Remove quotes
  }

  return imageRefs;
}

// Main execution
const allImages = getAllImages(imagesDir);
const tsContent = fs.readFileSync(dataFile, 'utf-8');
const referencedImages = getReferencedImages(tsContent);

const missingImages = [];
allImages.forEach((img) => {
  if (!referencedImages.has(img)) {
    missingImages.push(img);
  }
});

const notFoundImages = [];
referencedImages.forEach((img) => {
  if (!allImages.has(img)) {
    notFoundImages.push(img);
  }
});

console.log('\n📊 IMAGE SYNC REPORT\n');
console.log(`Total images in folder: ${allImages.size}`);
console.log(`Total images referenced in artPortfolio.ts: ${referencedImages.size}`);

if (missingImages.length > 0) {
  console.log(`\n❌ MISSING FROM artPortfolio.ts (${missingImages.length}):`);
  missingImages.sort().forEach((img) => {
    console.log(`  "${img}"`);
  });
}

if (notFoundImages.length > 0) {
  console.log(`\n⚠️  REFERENCED BUT NOT FOUND (${notFoundImages.length}):`);
  notFoundImages.forEach((img) => {
    console.log(`  "${img}"`);
  });
}

if (missingImages.length === 0 && notFoundImages.length === 0) {
  console.log('\n✅ All images are synced!');
}

// Export for use in other scripts
module.exports = {
  allImages,
  referencedImages,
  missingImages,
  notFoundImages,
};
