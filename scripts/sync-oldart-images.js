#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images/art/oldArt');
const dataFile = path.join(__dirname, '../src/data/artPortfolio.ts');

// Recursively get all image files from oldArt
function getAllOldArtImages(dir, prefix = '') {
  const images = new Set();
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  entries.forEach((entry) => {
    if (entry.isDirectory()) {
      const subDir = path.join(dir, entry.name);
      const subImages = getAllOldArtImages(subDir, prefix + entry.name + '/');
      subImages.forEach((img) => images.add(img));
    } else if (/\.(webp|jpg|png|heic)$/i.test(entry.name)) {
      images.add(`/images/art/oldArt/${prefix}${entry.name}`);
    }
  });

  return images;
}

// Extract all image references from earlyFirstPaintings in artPortfolio.ts
function getReferencedOldArtImages(tsContent) {
  const imageRefs = new Set();
  // Look for oldArt references
  const imageRegex = /["']\/images\/art\/oldArt\/[^"']+["']/g;
  let match;

  while ((match = imageRegex.exec(tsContent)) !== null) {
    imageRefs.add(match[0].slice(1, -1)); // Remove quotes
  }

  return imageRefs;
}

// Main execution
const allOldArtImages = getAllOldArtImages(imagesDir);
const tsContent = fs.readFileSync(dataFile, 'utf-8');
const referencedOldArtImages = getReferencedOldArtImages(tsContent);

const missingImages = [];
allOldArtImages.forEach((img) => {
  if (!referencedOldArtImages.has(img)) {
    missingImages.push(img);
  }
});

const notFoundImages = [];
referencedOldArtImages.forEach((img) => {
  if (!allOldArtImages.has(img)) {
    notFoundImages.push(img);
  }
});

console.log('\n📊 OLDART IMAGE SYNC REPORT\n');
console.log(`Total images in /public/images/art/oldArt: ${allOldArtImages.size}`);
console.log(`Total images referenced in earlyFirstPaintings: ${referencedOldArtImages.size}`);

if (missingImages.length > 0) {
  console.log(`\n❌ MISSING FROM artPortfolio.ts (${missingImages.length}):`);
  missingImages.sort().slice(0, 20).forEach((img) => {
    console.log(`  "${img}"`);
  });
  if (missingImages.length > 20) {
    console.log(`  ... and ${missingImages.length - 20} more`);
  }
}

if (notFoundImages.length > 0) {
  console.log(`\n⚠️  REFERENCED BUT NOT FOUND (${notFoundImages.length}):`);
  notFoundImages.forEach((img) => {
    console.log(`  "${img}"`);
  });
}

if (missingImages.length === 0 && notFoundImages.length === 0) {
  console.log('\n✅ All oldArt images are synced!');
}

// Export for use in other scripts
module.exports = {
  allOldArtImages,
  referencedOldArtImages,
  missingImages,
  notFoundImages,
};
