const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, '../public/images/art/oldArt');

function formatMaterials(materialsRaw) {
  return materialsRaw
    .replace(/([A-Z])/g, ' $1')
    .replace(/^ /, '')
    .trim();
}

function extractYear(monthYear) {
  const match = monthYear.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : 0;
}

function generate() {
  const collections = [];

  const folders = fs.readdirSync(basePath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory());

  folders.forEach(folder => {
    const collectionName = folder.name;
    const collectionPath = path.join(basePath, collectionName);

    const files = fs.readdirSync(collectionPath, { withFileTypes: true })
      .filter(f => f.isFile() && f.name.endsWith('.webp'));

    const paintings = files.map((file, index) => {
      const fileName = file.name.replace('.webp', '');
      const parts = fileName.split('_');

      const [titleRaw, size, monthYear, materialsRaw] = parts;

      const title = titleRaw.replace(/-/g, ' ');
      const materials = formatMaterials(materialsRaw || '');
      const year = extractYear(monthYear || '');

      return {
        id: `${collectionName.toLowerCase()}-${String(index + 1).padStart(2, '0')}`,
        title,
        materials,
        size,
        year,
        images: [
          `images/art/oldArt/${collectionName}/${file.name}`
        ]
      };
    });

    const collection = {
      id: collectionName.toLowerCase(),
      name: collectionName,
      period: paintings[0]?.year?.toString() || "Unknown",
      description: "Something",
      descriptionEs: "Algo",
      paintings
    };

    collections.push(collection);
  });

  const output = `earlyFirstPaintings: ${JSON.stringify(collections, null, 2)}`;

  console.log(output);
}

generate();