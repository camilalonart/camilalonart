const fs = require('fs');
const path = require('path');

function generateImageList(dir, outputFile) {
  const imagesDir = path.join(__dirname, '..', 'public', ...dir.split('/'));
  const files = fs.readdirSync(imagesDir)
    .filter(file => /\.(jpe?g|png|gif|webp)$/i.test(file))
    .map(file => `/${dir}/${file}`);

  fs.writeFileSync(
    path.join(__dirname, '..', 'src', 'data', outputFile),
    JSON.stringify(files, null, 2)
  );
  console.log(`Generated ${outputFile} with ${files.length} images.`);
}

generateImageList('images/pets/gallery', 'petImages.json');
generateImageList('images/wedding/gallery', 'weddingImages.json'); 