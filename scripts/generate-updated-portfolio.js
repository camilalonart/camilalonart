#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { missingImages } = require('./sync-art-images');

// Group missing images by folder
function groupImagesByFolder(images) {
  const groups = {};

  images.forEach((img) => {
    const parts = img.replace('/images/art/traditionalArt/', '').split('/');
    const folderName = parts[0];

    if (!groups[folderName]) {
      groups[folderName] = [];
    }
    groups[folderName].push(img);
  });

  return groups;
}

// Categorize images as main or details
function categorizeImages(folderImages) {
  const main = [];
  const details = [];

  folderImages.forEach((img) => {
    if (img.includes('/Details/') || img.includes('/Detalles/')) {
      details.push(img);
    } else {
      main.push(img);
    }
  });

  return { main, details };
}

// Read current portfolio file
function readPortfolioFile() {
  const filePath = path.join(__dirname, '../src/data/artPortfolio.ts');
  return fs.readFileSync(filePath, 'utf-8');
}

// Extract collection/painting information
function findCollectionByFolder(content, folderName) {
  // Simple approach: extract collection IDs from the file
  // This is a basic implementation - in production you'd parse TypeScript properly
  const collectionRegex = new RegExp(
    `name: ['"](${folderName})['"](.*?)paintings:`,
    's'
  );
  const match = content.match(collectionRegex);
  return match ? true : false;
}

// Main execution
const groupedImages = groupImagesByFolder(missingImages);

console.log('\n📝 GROUPED MISSING IMAGES\n');

Object.entries(groupedImages)
  .sort(([a], [b]) => a.localeCompare(b))
  .forEach(([folder, images]) => {
    const { main, details } = categorizeImages(images);

    console.log(`\n📁 ${folder}`);
    console.log(`   Total: ${images.length} images (${main.length} main, ${details.length} details)`);

    if (main.length > 0) {
      console.log(`\n   Main images (need new paintings):`);
      main.forEach((img) => {
        const fileName = img.split('/').pop();
        const paintingId = folder.toLowerCase().replace(/\s+/g, '-') + '-' + fileName.replace(/\.[^/.]+$/, '').toLowerCase();
        console.log(`     - ID: "${paintingId}", Image: "${img}"`);
      });
    }

    if (details.length > 0) {
      console.log(`\n   Detail images (add to existing painting):`);
      details.slice(0, 5).forEach((img) => {
        console.log(`     - "${img}"`);
      });
      if (details.length > 5) {
        console.log(`     ... and ${details.length - 5} more`);
      }
    }
  });

// Generate a summary report
console.log('\n\n📊 SUMMARY FOR artPortfolio.ts UPDATE\n');
console.log('Items to add:');

let totalNewPaintings = 0;
let totalDetailImages = 0;

Object.entries(groupedImages).forEach(([folder, images]) => {
  const { main, details } = categorizeImages(images);
  totalNewPaintings += main.length;
  totalDetailImages += details.length;
  console.log(`  • ${folder}: ${main.length} new painting(s), ${details.length} detail image(s)`);
});

console.log(`\nTotal: ${totalNewPaintings} new paintings, ${totalDetailImages} detail images to add`);

// Export for use in other scripts
module.exports = {
  groupedImages,
  totalNewPaintings,
  totalDetailImages,
};
