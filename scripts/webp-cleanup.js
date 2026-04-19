#!/usr/bin/env node
/**
 * Deletes original JPG/PNG files that already have a .webp counterpart.
 * Run AFTER webp-convert and AFTER verifying the WebP files look correct.
 *
 * Usage:
 *   node scripts/webp-cleanup.js            # dry run — shows what would be deleted
 *   node scripts/webp-cleanup.js --delete   # actually deletes originals
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const DRY_RUN = !args.includes('--delete');
const IMAGE_DIR = path.join(__dirname, '..', 'public', 'images');
const ORIGINALS = ['.jpg', '.jpeg', '.png'];

let toDelete = [];
let totalBytes = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) { walk(full); continue; }
    const ext = path.extname(entry.name).toLowerCase();
    if (!ORIGINALS.includes(ext)) continue;
    const webp = full.replace(/\.(jpe?g|png)$/i, '.webp');
    if (fs.existsSync(webp)) {
      toDelete.push(full);
      totalBytes += fs.statSync(full).size;
    }
  }
}

walk(IMAGE_DIR);

if (toDelete.length === 0) {
  console.log('\n✓  Nothing to delete — no originals with matching .webp found.\n');
  process.exit(0);
}

console.log(`\n📁  Found ${toDelete.length} original files with .webp counterparts`);
console.log(`    Total size to recover: ${(totalBytes / 1024 / 1024).toFixed(0)} MB`);

if (DRY_RUN) {
  console.log('\n🔍  DRY RUN — no files will be deleted');
  console.log('    First few files:');
  toDelete.slice(0, 8).forEach(f =>
    console.log(`    - ${path.relative(IMAGE_DIR, f)}`)
  );
  if (toDelete.length > 8) console.log(`    ... and ${toDelete.length - 8} more`);
  console.log('\n    Run with --delete to remove them.\n');
} else {
  console.log('\n🗑️   Deleting originals...');
  let deleted = 0;
  for (const f of toDelete) {
    fs.unlinkSync(f);
    deleted++;
  }
  console.log(`✓  Deleted ${deleted} files, freed ${(totalBytes / 1024 / 1024).toFixed(0)} MB`);
  console.log('\n⚠️  Next steps:');
  console.log('   1. Run: node scripts/update-image-refs.js --update');
  console.log('   2. Run: npm run generate-images');
  console.log('   3. Run: npm run build  (to verify nothing broke)\n');
}
