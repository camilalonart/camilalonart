#!/usr/bin/env node
/**
 * audit-art-images.js
 *
 * Scans /public/images/art/traditionalArt recursively and compares
 * against the image paths already referenced in src/data/artPortfolio.ts.
 *
 * Outputs:
 *   1. Files on disk NOT referenced in artPortfolio.ts  (grouped by collection folder)
 *   2. Paths in artPortfolio.ts that do NOT exist on disk (broken references)
 *   3. Suggestions for where to add the missing files
 *
 * Usage:
 *   node scripts/audit-art-images.js            # report only
 *   node scripts/audit-art-images.js --json      # output JSON report
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SCAN_DIR = path.join(ROOT, 'public', 'images', 'art', 'traditionalArt');
const PORTFOLIO_PATH = path.join(ROOT, 'src', 'data', 'artPortfolio.ts');
const IMAGE_EXTENSIONS = /\.(webp|jpg|jpeg|png|gif|mp4)$/i;

// ─── 1. Scan the filesystem ──────────────────────────────────────────────────
function scanDirectory(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...scanDirectory(full));
    } else if (IMAGE_EXTENSIONS.test(entry.name)) {
      // Convert to the URL path used in the codebase
      const relative = '/' + path.relative(path.join(ROOT, 'public'), full);
      results.push(relative);
    }
  }
  return results;
}

// ─── 2. Extract referenced paths from artPortfolio.ts ─────────────────────────
function extractReferencedPaths() {
  const src = fs.readFileSync(PORTFOLIO_PATH, 'utf-8');
  const paths = new Set();

  // Match any string literal that looks like an image/video path inside traditionalArt
  // Covers: "/images/art/traditionalArt/..."
  const regex = /["'](\/?images\/art\/traditionalArt\/[^"']+)["']/g;
  let m;
  while ((m = regex.exec(src)) !== null) {
    let p = m[1];
    if (!p.startsWith('/')) p = '/' + p;
    paths.add(p);
  }
  return paths;
}

// ─── 3. Classify each disk file by its collection folder ─────────────────────
function classifyByFolder(filePaths) {
  const map = {};
  const BASE = '/images/art/traditionalArt/';
  for (const fp of filePaths) {
    const rest = fp.slice(BASE.length); // e.g. "Carrying Home/Details/foo.webp"
    const parts = rest.split('/');
    const folder = parts[0]; // collection folder name
    const isDetail = parts.length > 2; // lives inside a sub-folder like Details/Detalles
    if (!map[folder]) map[folder] = { mainImages: [], detailImages: [] };
    if (isDetail) {
      map[folder].detailImages.push(fp);
    } else {
      map[folder].mainImages.push(fp);
    }
  }
  return map;
}

// ─── 4. Map folder names to collection IDs in the data ────────────────────────
const FOLDER_TO_COLLECTION = {
  'Blanco y Negro': 'blanco-y-negro',
  'Carrying Home': 'carrying-home',
  'Colorful': null, // NEW — not in data yet
  'Dear Inner Child': 'dear-inner-child',
  'DibujitosParaWill': 'dibujitos-para-will',
  'Fuego Interior': 'fuego-interior',
  'In Your Eyes': 'in-your-eyes',
  'Magic': 'magic',
  'Mis Raices': 'mis-raices',
  'Otros': null, // NEW — not in data yet
  'Pandemic Lockdown': 'pandemic-lockdown',
  'Perspective': 'perspective',
  'Red Doodles': 'red-doodles',
  'Siempre vuelvo a esta version de mi': 'siempre-vuelvo',
  'StartOver': null, // files here are used by "magic" collection (Viaje a Canada)
  'The essential is invisible (Red)': 'the-essential-is-invisible',
  'Yellow': 'yellow',
};

// ─── Main ────────────────────────────────────────────────────────────────────
function main() {
  const jsonMode = process.argv.includes('--json');

  // Scan disk
  const diskFiles = scanDirectory(SCAN_DIR);
  const diskSet = new Set(diskFiles);

  // Extract from TS
  const referencedPaths = extractReferencedPaths();

  // Find differences
  const notInPortfolio = diskFiles.filter(f => !referencedPaths.has(f));
  const brokenRefs = [...referencedPaths].filter(p => !diskSet.has(p));

  // Classify missing files by folder
  const missingByFolder = classifyByFolder(notInPortfolio);

  if (jsonMode) {
    console.log(JSON.stringify({
      summary: {
        totalOnDisk: diskFiles.length,
        totalReferenced: referencedPaths.size,
        missingFromPortfolio: notInPortfolio.length,
        brokenReferences: brokenRefs.length,
      },
      missingFromPortfolio: missingByFolder,
      brokenReferences: brokenRefs,
    }, null, 2));
    return;
  }

  // ─── Pretty console output ───────────────────────────────────────────────
  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║           ART PORTFOLIO IMAGE AUDIT                        ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  console.log(`  📁 Files on disk:          ${diskFiles.length}`);
  console.log(`  📄 Paths in portfolio:     ${referencedPaths.size}`);
  console.log(`  ⚠️  Missing from portfolio: ${notInPortfolio.length}`);
  console.log(`  ❌ Broken references:       ${brokenRefs.length}`);
  console.log('');

  // ── Missing from portfolio ──────────────────────────────────────────────
  if (notInPortfolio.length > 0) {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  FILES ON DISK NOT IN artPortfolio.ts');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    for (const [folder, files] of Object.entries(missingByFolder).sort((a, b) => a[0].localeCompare(b[0]))) {
      const collectionId = FOLDER_TO_COLLECTION[folder];
      const tag = collectionId ? `→ collection "${collectionId}"` : '→ ⚠️  NO COLLECTION IN DATA';

      console.log(`  📂 ${folder}  ${tag}`);

      if (files.mainImages.length > 0) {
        console.log('     Main images (potential new paintings):');
        for (const f of files.mainImages.sort()) {
          console.log(`       + ${f}`);
        }
      }
      if (files.detailImages.length > 0) {
        console.log('     Detail/process images (add to existing painting\'s details[]):');
        for (const f of files.detailImages.sort()) {
          console.log(`       + ${f}`);
        }
      }
      console.log('');
    }
  }

  // ── Broken references ───────────────────────────────────────────────────
  if (brokenRefs.length > 0) {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  BROKEN REFERENCES (in artPortfolio.ts but not on disk)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    for (const ref of brokenRefs.sort()) {
      console.log(`    ✗ ${ref}`);
    }
    console.log('');
  }

  // ── Suggestion snippet for new paintings ─────────────────────────────────
  const newPaintingFolders = Object.entries(missingByFolder)
    .filter(([, files]) => files.mainImages.length > 0);

  if (newPaintingFolders.length > 0) {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  SUGGESTED PAINTING ENTRIES');
    console.log('  (copy-paste these into artPortfolio.ts, adjust metadata)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    for (const [folder, files] of newPaintingFolders.sort((a, b) => a[0].localeCompare(b[0]))) {
      const collectionId = FOLDER_TO_COLLECTION[folder] || folder.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
      const detailsForFolder = files.detailImages;

      console.log(`  // ── ${folder} ──`);

      if (!FOLDER_TO_COLLECTION[folder]) {
        // Suggest a whole new collection
        console.log(`  // This is a NEW collection — add to collections[] array:`);
        console.log(`  {`);
        console.log(`    id: "${collectionId}",`);
        console.log(`    name: "${folder}",`);
        console.log(`    period: "YYYY",`);
        console.log(`    description: "TODO",`);
        console.log(`    descriptionEs: "TODO",`);
        console.log(`    paintings: [`);
      }

      for (let i = 0; i < files.mainImages.length; i++) {
        const img = files.mainImages[i];
        const basename = path.basename(img, path.extname(img));
        const paintingId = `${collectionId}-${String(i + 1).padStart(2, '0')}`;

        // Find matching detail images
        const matchingDetails = detailsForFolder.filter(d => {
          const dBase = path.basename(d, path.extname(d));
          return dBase.toLowerCase().startsWith(basename.toLowerCase().replace(/\s+/g, ''));
        });

        console.log(`      {`);
        console.log(`        id: "${paintingId}",`);
        console.log(`        title: "${basename}",`);
        console.log(`        materials: "TODO",`);
        console.log(`        year: 0,`);
        console.log(`        images: ["${img}"],`);
        if (matchingDetails.length > 0) {
          console.log(`        details: [`);
          for (const d of matchingDetails) {
            console.log(`          "${d}",`);
          }
          console.log(`        ],`);
        }
        console.log(`      },`);
      }

      if (!FOLDER_TO_COLLECTION[folder]) {
        console.log(`    ],`);
        console.log(`  },`);
      }
      console.log('');
    }
  }

  // ── Suggested detail additions for existing paintings ────────────────────
  const detailOnlyFolders = Object.entries(missingByFolder)
    .filter(([folder, files]) => files.detailImages.length > 0 && FOLDER_TO_COLLECTION[folder]);

  if (detailOnlyFolders.length > 0) {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  DETAIL IMAGES TO ADD TO EXISTING PAINTINGS');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    for (const [folder, files] of detailOnlyFolders.sort((a, b) => a[0].localeCompare(b[0]))) {
      const collectionId = FOLDER_TO_COLLECTION[folder];
      console.log(`  📂 ${folder} (collection: "${collectionId}")`);
      for (const d of files.detailImages.sort()) {
        const basename = path.basename(d, path.extname(d));
        const ext = path.extname(d);
        if (ext === '.mp4') {
          const posterPath = d.replace('_opt.mp4', '_poster.webp');
          const hasPoster = diskSet.has(posterPath);
          if (d.endsWith('_opt.mp4')) {
            console.log(`     Video: { type: 'video', src: "${d}", poster: "${hasPoster ? posterPath : 'TODO'}" }`);
          }
        } else if (!basename.endsWith('_poster')) {
          console.log(`     Image: "${d}"`);
        }
      }
      console.log('');
    }
  }

  console.log('Done.\n');
}

main();
