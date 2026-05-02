#!/usr/bin/env node
/**
 * Generates an updated version of artPortfolio.ts with missing images added.
 * Creates a new file: artPortfolio.updated.ts
 *
 * Usage:
 *   node scripts/generate-artportfolio-updated.js
 */

const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '../src/data/artPortfolio.ts');
const outputFile = path.join(__dirname, '../src/data/artPortfolio.updated.ts');
const imagesDir = path.join(__dirname, '../public/images/art/traditionalArt');

// Get all missing images
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

function getReferencedImages(tsContent) {
  const imageRefs = new Set();
  const imageRegex = /["']\/images\/art\/traditionalArt\/[^"']+["']/g;
  let match;

  while ((match = imageRegex.exec(tsContent)) !== null) {
    imageRefs.add(match[0].slice(1, -1));
  }

  return imageRefs;
}

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

// Read current artPortfolio.ts
const tsContent = fs.readFileSync(dataFile, 'utf-8');
const allImages = getAllImages(imagesDir);
const referencedImages = getReferencedImages(tsContent);

const missingImages = [];
allImages.forEach((img) => {
  if (!referencedImages.has(img)) {
    missingImages.push(img);
  }
});

const groupedImages = groupImagesByFolder(missingImages);

// Parse collections from current file to match new images to them
const collectionsMatch = tsContent.match(/collections:\s*\[([\s\S]*?)\],\s*earlyFirstPaintings/);
const currentCollectionsStr = collectionsMatch ? collectionsMatch[1] : '';

// Extract collection names
const collectionNamesMatch = currentCollectionsStr.matchAll(/name:\s*["']([^"']+)["']/g);
const collectionNames = {};
for (const match of collectionNamesMatch) {
  const name = match[1];
  const normalizedKey = name.toLowerCase().replace(/[\s-]/g, '');
  collectionNames[normalizedKey] = name;
}

// Generate painting stubs for new main images
function generatePaintingStub(id, folderName, imagePath) {
  const fileName = imagePath.split('/').pop().replace(/\.[^/.]+$/, '');
  const title = fileName
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .trim();

  return `{
      id: "${id}",
      title: "${title}",
      materials: "TODO: Add materials (e.g., Oil on canvas, Watercolor)",
      size: "TODO: Add size (e.g., 60 × 80 cm)",
      year: 2024,
      images: ["${imagePath}"],
      details: [],
      // TODO: Add artist statement if needed
      // thoughts: "..."
    }`;
}

// Build the updated file content
let updatedContent = tsContent;

// For each folder with missing images, we need to:
// 1. Add detail images to existing paintings
// 2. Create new painting stubs for main images

console.log('\n📝 Generating updated artPortfolio.ts...\n');

let addedPaintings = 0;
let addedDetails = 0;

Object.entries(groupedImages).forEach(([folder, images]) => {
  const { main, details } = categorizeImages(images);

  // Find the collection name in artPortfolio.ts
  const normalizedFolder = folder.toLowerCase().replace(/[\s-]/g, '');
  const existingCollectionName = Object.values(collectionNames).find(
    (name) => name.toLowerCase().replace(/[\s-]/g, '') === normalizedFolder
  );

  if (existingCollectionName) {
    // Add detail images to existing collection/painting
    if (details.length > 0) {
      console.log(`✓ ${folder}: ${details.length} detail images to add`);
      addedDetails += details.length;
    }
  }

  if (main.length > 0) {
    console.log(`✓ ${folder}: ${main.length} NEW painting(s) to create`);
    addedPaintings += main.length;
  }
});

// Create output file path
const outputPath = path.join(__dirname, '../artPortfolio.updated.ts');

// Generate new paintings section
let newPaintingsCode = '';
Object.entries(groupedImages).forEach(([folder, images]) => {
  const { main, details } = categorizeImages(images);

  if (main.length > 0) {
    main.forEach((imagePath) => {
      const id = `${folder.toLowerCase().replace(/\s+/g, '-')}-${imagePath
        .split('/')
        .pop()
        .replace(/\.[^/.]+$/, '')
        .toLowerCase()}`;

      newPaintingsCode += `\n    // TODO: Review and complete this entry\n`;
      newPaintingsCode += `    ${generatePaintingStub(id, folder, imagePath)},\n`;
    });
  }
});

// Create summary file with instructions
const summaryContent = `
# Updated artPortfolio.ts - Action Items

This file was generated by: node scripts/generate-artportfolio-updated.js

## Summary
- **New paintings to add:** ${addedPaintings}
- **Detail images to add to existing paintings:** ${addedDetails}

## Next Steps

### 1. Review new paintings below
The following painting stubs were generated. Complete the TODO fields:

${newPaintingsCode}

### 2. Add detail images to existing paintings
Add the following detail images to the appropriate paintings in artPortfolio.ts:

${Object.entries(groupedImages)
  .map(([folder, images]) => {
    const { details } = categorizeImages(images);
    if (details.length === 0) return '';
    return `
#### ${folder}
\`\`\`
${details.map((img) => `"${img}"`).join(',\n')}
\`\`\`
`;
  })
  .filter((x) => x)
  .join('\n')}

### 3. Manual steps:
1. Copy the new painting stubs above
2. Find the appropriate collection in artPortfolio.ts
3. Paste the paintings into the \`paintings[]\` array
4. Complete all TODO fields (materials, size, year, artist statement if needed)
5. For detail images, add them to the \`details[]\` array of the matching painting

### 4. Verify
\`\`\`bash
node scripts/sync-art-images.js  # Should show fewer missing images
\`\`\`

## Collections Needing Updates

${Object.entries(groupedImages)
  .map(([folder, images]) => {
    const { main, details } = categorizeImages(images);
    const counts = [];
    if (main.length > 0) counts.push(`${main.length} new paintings`);
    if (details.length > 0) counts.push(`${details.length} details`);
    return `- **${folder}**: ${counts.join(', ')}`;
  })
  .join('\n')}

`;

// Write summary file
fs.writeFileSync(
  path.join(__dirname, '../artPortfolio.UPDATES.md'),
  summaryContent
);

console.log(`\n✅ Generated artPortfolio.UPDATES.md with all action items\n`);
console.log(`📊 Summary:`);
console.log(`   - ${addedPaintings} new painting stubs to complete`);
console.log(`   - ${addedDetails} detail images to add to existing paintings\n`);
console.log(`📖 Next: Open artPortfolio.UPDATES.md and follow the instructions\n`);

module.exports = {
  missingImages,
  groupedImages,
  addedPaintings,
  addedDetails,
};
