const fs = require('fs');
const path = require('path');

function generateImageList(dirs, outputFile, options = {}) {
  const files = (Array.isArray(dirs) ? dirs : [dirs]).flatMap(dir => {
    const imagesDir = path.join(__dirname, '..', 'public', ...dir.split('/'));
    if (options.optional && !fs.existsSync(imagesDir)) return [];
    return fs.readdirSync(imagesDir, { withFileTypes: true })
      .filter(entry => entry.isFile())
      .map(entry => entry.name)
      .filter(file => (options.webpOnly ? /\.webp$/i : /\.(jpe?g|png|gif|webp)$/i).test(file))
      .filter(file => !options.exclude || !options.exclude.test(file))
      .map(file => `/${dir}/${file}`);
  });

  if (options.sorted) files.sort();
  if (files.length === 0) {
    if (!options.optional) throw new Error(`No gallery images found for ${outputFile}`);
    console.warn(`No source images available for ${outputFile}; writing an empty manifest, not substitute photos.`);
  }

  fs.writeFileSync(
    path.join(__dirname, '..', 'src', 'data', outputFile),
    JSON.stringify(files, null, 2)
  );
  console.log(`Generated ${outputFile} with ${files.length} images.`);
  return files;
}

const portraitOptions = { sorted: true, webpOnly: true, exclude: /collage|copy/i };
const galleries = {
  pets: ['images/pets/gallery', 'petImages.json'],
  wedding: ['images/wedding/gallery', 'weddingImages.json'],
  wildlife: ['images/wildlife/gallery', 'wildlifeImages.json'],
  headshots: ['images/headshots', 'headshotImages.json', portraitOptions],
  family: ['images/family/baby', 'familyImages.json', portraitOptions],
  maternity: [
    ['images/family/maternity', 'images/family/pregnancy', 'images/maternity', 'images/pregnancy'],
    'maternityImages.json',
    { ...portraitOptions, optional: true },
  ],
};

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length > 1 || (args[0] && !args[0].startsWith('--only='))) {
    throw new Error('Usage: node scripts/generateImageList.js [--only=headshots,family,maternity]');
  }
  const selected = args[0] ? args[0].slice('--only='.length).split(',') : Object.keys(galleries);
  for (const name of selected) {
    if (!Object.prototype.hasOwnProperty.call(galleries, name)) {
      throw new Error(`Unknown gallery: ${name}`);
    }
  }
  for (const name of selected) generateImageList(...galleries[name]);
}

module.exports = { generateImageList };