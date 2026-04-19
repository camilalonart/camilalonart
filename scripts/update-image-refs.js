#!/usr/bin/env node
/**
 * Updates image references from .jpg/.jpeg/.png to .webp in all source files.
 * Only updates references where a .webp file actually exists in public/.
 *
 * Usage:
 *   node scripts/update-image-refs.js           # dry run — shows what would change
 *   node scripts/update-image-refs.js --update  # applies changes
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const DRY_RUN = !args.includes('--update');
const ROOT = path.join(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const SRC_DIRS = [
  path.join(ROOT, 'src'),
];
const SRC_EXTENSIONS = ['.tsx', '.ts', '.js', '.json'];
const IMG_EXTENSIONS = /\.(jpe?g|png)/gi;

// Build a set of all webp files that exist
const webpFiles = new Set();
function indexWebp(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) { indexWebp(full); continue; }
    if (entry.name.endsWith('.webp')) {
      // Store as public-relative path, e.g. /images/pets/photo.webp
      webpFiles.add('/' + path.relative(PUBLIC, full).replace(/\\/g, '/'));
    }
  }
}
indexWebp(path.join(PUBLIC, 'images'));

console.log(`\n📦  Indexed ${webpFiles.size} .webp files in public/`);

// Scan source files and replace references
let totalFilesChanged = 0;
let totalReplacements = 0;

function processFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  let updated = original;
  let count = 0;

  updated = updated.replace(/\/images\/[^"'`\s)]+\.(jpe?g|png)/gi, (match) => {
    const webpVersion = match.replace(/\.(jpe?g|png)$/i, '.webp');
    if (webpFiles.has(webpVersion)) {
      count++;
      return webpVersion;
    }
    return match; // no webp exists yet, leave unchanged
  });

  if (count > 0) {
    totalFilesChanged++;
    totalReplacements += count;
    const rel = path.relative(ROOT, filePath);
    if (DRY_RUN) {
      console.log(`  ${rel}  (${count} reference${count > 1 ? 's' : ''})`);
    } else {
      fs.writeFileSync(filePath, updated, 'utf8');
      console.log(`✓  ${rel}  (${count} updated)`);
    }
  }
}

function walkSrc(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === 'out') continue;
      walkSrc(full);
    } else if (SRC_EXTENSIONS.includes(path.extname(entry.name))) {
      processFile(full);
    }
  }
}

console.log(DRY_RUN ? '\n🔍  DRY RUN — no files will be modified\n' : '\n⚡  Updating references...\n');

for (const dir of SRC_DIRS) walkSrc(dir);

console.log(`\n──────────────────────────────────`);
if (totalFilesChanged === 0) {
  console.log('No references to update (all already .webp, or no matching .webp files found).');
} else {
  console.log(`Files with changes: ${totalFilesChanged}`);
  console.log(`Total replacements: ${totalReplacements}`);
  if (DRY_RUN) {
    console.log('\nRun with --update to apply changes.');
  } else {
    console.log('\n✓  Done. Run npm run generate-images then npm run build to verify.');
  }
}
console.log();
