#!/usr/bin/env node
/**
 * Deletes raw video files (.mp4, .mov, etc.) that already have a _opt.mp4 counterpart.
 * Run AFTER video-convert and AFTER verifying the optimized files look correct.
 *
 * Usage:
 *   node scripts/video-cleanup.js            # dry run — shows what would be deleted
 *   node scripts/video-cleanup.js --delete   # actually deletes raw originals
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const DRY_RUN = !args.includes('--delete');
const ART_DIR = path.join(__dirname, '..', 'public', 'images', 'art');
const RAW_EXTS = ['.mov', '.avi', '.mp4', '.m4v', '.mkv'];
const OUTPUT_SUFFIX = '_opt.mp4';

let toDelete = [];
let totalBytes = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) { walk(full); continue; }
    const ext = path.extname(entry.name).toLowerCase();
    const base = path.basename(entry.name, ext);
    if (base.endsWith('_opt') || base.endsWith('_poster')) continue;
    if (!RAW_EXTS.includes(ext)) continue;
    const optimized = path.join(dir, entry.name + OUTPUT_SUFFIX);
    if (fs.existsSync(optimized)) {
      toDelete.push(full);
      totalBytes += fs.statSync(full).size;
    }
  }
}

walk(ART_DIR);

if (toDelete.length === 0) {
  console.log('\n✓  Nothing to delete — no raw videos with matching _opt.mp4 found.\n');
  process.exit(0);
}

console.log(`\n📁  Found ${toDelete.length} raw video files with _opt.mp4 counterparts`);
console.log(`    Total size to recover: ${(totalBytes / 1024 / 1024).toFixed(0)} MB`);

if (DRY_RUN) {
  console.log('\n🔍  DRY RUN — no files will be deleted');
  console.log('    First few files:');
  toDelete.slice(0, 8).forEach(f =>
    console.log(`    - ${path.relative(ART_DIR, f)}`)
  );
  if (toDelete.length > 8) console.log(`    ... and ${toDelete.length - 8} more`);
  console.log('\n    Run with --delete to remove them.\n');
} else {
  console.log('\n🗑️   Deleting raw videos...');
  let deleted = 0;
  for (const f of toDelete) {
    fs.unlinkSync(f);
    deleted++;
  }
  console.log(`✓  Deleted ${deleted} files, freed ${(totalBytes / 1024 / 1024).toFixed(0)} MB`);
  console.log('\n⚠️  Next step: npm run build  (to verify nothing broke)\n');
}
