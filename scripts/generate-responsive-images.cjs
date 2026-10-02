const fs = require('node:fs/promises');
const path = require('node:path');
const { createHash } = require('node:crypto');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const sourceRoot = path.join(root, 'public', 'images');
const outputRoot = path.join(root, 'public', 'responsive-images');
const manifestPath = path.join(root, 'src', 'data', 'image-manifest.generated.json');
const widths = [480, 960, 1600];
const quality = 82;
const recipe = `v1:${widths.join(',')}:${quality}`;

async function* images(directory) {
  const entries = (await fs.readdir(directory, { withFileTypes: true }))
    .sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
  for (const entry of entries) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) yield* images(file);
    else if (/\.(webp|jpe?g|png)$/i.test(entry.name)) yield file;
  }
}

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    return false;
  }
}

async function main() {
  await fs.mkdir(outputRoot, { recursive: true });
  const manifest = {};
  const expected = new Set();
  let generated = 0;
  for await (const file of images(sourceRoot)) {
    const input = await fs.readFile(file);
    const metadata = await sharp(input).metadata();
    if (metadata.pages > 1) continue; // Keep animated images intact.
    if (!metadata.width || !metadata.height) throw new Error(`Missing image dimensions: ${file}`);
    const rotated = [5, 6, 7, 8].includes(metadata.orientation);
    const width = rotated ? metadata.height : metadata.width;
    const height = rotated ? metadata.width : metadata.height;
    const variants = [...new Set(widths.map(size => Math.min(size, width)))];
    const key = createHash('sha256').update(recipe).update(input).digest('hex').slice(0, 24);
    for (const size of variants) {
      const name = `${key}-${size}.webp`;
      expected.add(name);
      const target = path.join(outputRoot, name);
      if (!await exists(target)) {
        await sharp(input).rotate().resize({ width: size, withoutEnlargement: true })
          .webp({ quality, effort: 4 }).toFile(target);
        generated++;
      }
    }
    const source = `/images/${path.relative(sourceRoot, file).split(path.sep).join('/')}`;
    manifest[source] = { width, height, key, variants };
  }
  // Only generated derivatives are pruned; originals are never written or deleted.
  for (const name of await fs.readdir(outputRoot)) {
    if (/^[a-f0-9]{24}-\d+\.webp$/.test(name) && !expected.has(name)) {
      await fs.unlink(path.join(outputRoot, name));
    }
  }
  await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Responsive images: ${Object.keys(manifest).length} sources, ${generated} new derivatives.`);
}

main().catch(error => {
  console.error('Responsive image generation failed:', error);
  process.exitCode = 1;
});
