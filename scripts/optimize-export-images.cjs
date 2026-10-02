const fs = require('node:fs/promises');
const path = require('node:path');
const { createHash } = require('node:crypto');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'out');
const cache = path.join(root, '.cache', 'published-images');
const maxWidth = 2048;
const quality = 84;

async function* files(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) yield* files(file);
    else yield file;
  }
}

async function cached(file) {
  try {
    return await fs.readFile(file);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    return null;
  }
}

async function main() {
  await fs.access(path.join(output, 'index.html'));
  await fs.mkdir(cache, { recursive: true });
  let saved = 0;
  let optimized = 0;
  for await (const file of files(path.join(output, 'images'))) {
    if (!/\.(webp|jpe?g|png)$/i.test(file)) continue;
    const original = await fs.readFile(file);
    const metadata = await sharp(original).metadata();
    if (metadata.pages > 1) continue;
    const rotated = [5, 6, 7, 8].includes(metadata.orientation);
    const width = rotated ? metadata.height : metadata.width;
    if (!width) throw new Error(`Missing image width: ${file}`);
    if (original.length < 250_000 && width <= maxWidth) continue;
    const key = createHash('sha256').update(`v1:${maxWidth}:${quality}`).update(original).digest('hex');
    const cacheFile = path.join(cache, key);
    let buffer = await cached(cacheFile);
    if (!buffer) {
      const image = sharp(original).rotate().resize({ width: maxWidth, withoutEnlargement: true });
      buffer = metadata.format === 'webp' ? await image.webp({ quality }).toBuffer()
        : metadata.format === 'png' ? await image.png({ compressionLevel: 9 }).toBuffer()
          : await image.jpeg({ quality, mozjpeg: true }).toBuffer();
      const temporary = `${cacheFile}.tmp`;
      await fs.writeFile(temporary, buffer);
      await fs.rename(temporary, cacheFile);
    }
    if (buffer.length < original.length || width > maxWidth) {
      // Only export copies are changed; original files and their URLs are preserved.
      await fs.writeFile(file, buffer);
      saved += original.length - buffer.length;
      optimized++;
    }
  }
  let total = 0;
  for await (const file of files(output)) total += (await fs.stat(file)).size;
  console.log(`Published images: ${optimized} optimized, ${(saved / 1e6).toFixed(1)} MB saved; export ${(total / 1e6).toFixed(1)} MB.`);
  if (total > 950_000_000) {
    throw new Error('Export exceeds the 950 MB budget. Reduce published media before deploying to GitHub Pages.');
  }
}

main().catch(error => {
  console.error('Export image optimization failed:', error);
  process.exitCode = 1;
});
