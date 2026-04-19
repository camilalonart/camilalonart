#!/usr/bin/env node
/**
 * Converts all JPG/PNG images in public/images to WebP in-place.
 * Requires: brew install webp  (provides cwebp command)
 *
 * Usage:
 *   node scripts/convert-to-webp.js            # dry run — shows what would be converted
 *   node scripts/convert-to-webp.js --convert  # actually converts files
 *   node scripts/convert-to-webp.js --quality 75  # override quality (default: 80)
 */

const { execSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const DRY_RUN = !args.includes('--convert');
const QUALITY = (() => {
  const i = args.indexOf('--quality');
  return i !== -1 ? Number(args[i + 1]) : 80;
})();
const IMAGE_DIR = path.join(__dirname, '..', 'public', 'images');
const EXTENSIONS = ['.jpg', '.jpeg', '.png'];

// Check cwebp is installed
if (spawnSync('which', ['cwebp']).status !== 0) {
  console.error('❌  cwebp not found. Install it with: brew install webp');
  process.exit(1);
}

let totalOriginalBytes = 0;
let totalWebpBytes = 0;
let converted = 0;
let skipped = 0;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
      processImage(fullPath);
    }
  }
}

function processImage(srcPath) {
  const webpPath = srcPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  if (fs.existsSync(webpPath)) {
    skipped++;
    return;
  }

  const originalSize = fs.statSync(srcPath).size;

  if (DRY_RUN) {
    const rel = path.relative(IMAGE_DIR, srcPath);
    console.log(`  would convert: ${rel}  (${(originalSize / 1024).toFixed(0)} KB)`);
    totalOriginalBytes += originalSize;
    converted++;
    return;
  }

  const result = spawnSync('cwebp', ['-q', String(QUALITY), srcPath, '-o', webpPath], {
    stdio: 'pipe',
  });

  if (result.status !== 0) {
    console.error(`❌  Failed: ${srcPath}`);
    console.error(result.stderr?.toString());
    return;
  }

  const webpSize = fs.statSync(webpPath).size;
  totalOriginalBytes += originalSize;
  totalWebpBytes += webpSize;
  converted++;

  const savings = (((originalSize - webpSize) / originalSize) * 100).toFixed(0);
  const rel = path.relative(IMAGE_DIR, srcPath);
  console.log(`✓  ${rel}  ${(originalSize / 1024).toFixed(0)} KB → ${(webpSize / 1024).toFixed(0)} KB  (-${savings}%)`);
}

console.log(`\n📁  Scanning: ${IMAGE_DIR}`);
console.log(`🎚️   Quality: ${QUALITY}`);
console.log(DRY_RUN ? '🔍  DRY RUN — no files will be modified\n' : '⚡  Converting...\n');

walk(IMAGE_DIR);

console.log(`\n──────────────────────────────────`);
if (DRY_RUN) {
  console.log(`Found ${converted} images to convert  (${skipped} already have .webp)`);
  console.log(`Estimated original size: ${(totalOriginalBytes / 1024 / 1024).toFixed(0)} MB`);
  console.log(`\nRun with --convert to process them.`);
} else {
  const saved = totalOriginalBytes - totalWebpBytes;
  console.log(`Converted: ${converted}  Skipped: ${skipped}`);
  console.log(`Original:  ${(totalOriginalBytes / 1024 / 1024).toFixed(0)} MB`);
  console.log(`WebP:      ${(totalWebpBytes / 1024 / 1024).toFixed(0)} MB`);
  console.log(`Saved:     ${(saved / 1024 / 1024).toFixed(0)} MB  (${(((saved) / totalOriginalBytes) * 100).toFixed(0)}% reduction)`);
  console.log(`\n⚠️  Next steps:`);
  console.log(`   1. Update image references in src/ to use .webp extensions`);
  console.log(`   2. Delete original JPG/PNG files after verifying WebP looks correct`);
  console.log(`   3. Run: npm run generate-images`);
}
console.log();
