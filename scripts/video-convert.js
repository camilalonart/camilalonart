#!/usr/bin/env node
/**
 * Compresses raw art videos and extracts poster frames.
 * Requires: brew install ffmpeg
 *
 * Usage:
 *   node scripts/video-convert.js              # dry run — shows what would be processed
 *   node scripts/video-convert.js --convert    # compress + extract posters
 *   node scripts/video-convert.js --dir public/images/art/traditionalArt/MyPainting
 */

const { spawnSync, execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const DRY_RUN = !args.includes('--convert');
const TARGET_DIR = (() => {
  const i = args.indexOf('--dir');
  return i !== -1 ? path.resolve(args[i + 1]) : path.join(__dirname, '..', 'public', 'images', 'art');
})();

const RAW_EXTS = ['.mov', '.avi', '.mp4', '.m4v', '.mkv'];
// Files already processed carry the _opt suffix or end in -poster.webp
const OUTPUT_SUFFIX = '_opt.mp4';
const POSTER_SUFFIX = '_poster.webp';

if (spawnSync('which', ['ffmpeg']).status !== 0) {
  console.error('❌  ffmpeg not found. Install it with: brew install ffmpeg');
  process.exit(1);
}

let processed = 0;
let skipped = 0;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      const base = path.basename(entry.name, ext);

      // Skip already-processed outputs
      if (base.endsWith('_opt') || base.endsWith('_poster')) continue;
      if (!RAW_EXTS.includes(ext)) continue;

      const outVideo = path.join(dir, base + OUTPUT_SUFFIX);
      const outPoster = path.join(dir, base + POSTER_SUFFIX);
      const alreadyDone = fs.existsSync(outVideo) && fs.existsSync(outPoster);

      if (alreadyDone) {
        console.log(`⏭  skip  ${path.relative(process.cwd(), fullPath)}`);
        skipped++;
        continue;
      }

      console.log(`🎬  ${DRY_RUN ? '[dry]' : ''}  ${path.relative(process.cwd(), fullPath)}`);
      console.log(`       → ${path.relative(process.cwd(), outVideo)}`);
      console.log(`       → ${path.relative(process.cwd(), outPoster)}`);

      if (!DRY_RUN) {
        // Compress video: H.264, no audio, faststart, max 1080px wide
        execFileSync('ffmpeg', [
          '-i', fullPath,
          '-vcodec', 'libx264',
          '-crf', '23',
          '-preset', 'slow',
          '-vf', "scale='min(1920,iw)':-2",
          '-an',                  // strip audio
          '-movflags', '+faststart',
          '-y',
          outVideo,
        ], { stdio: 'inherit' });

        // Extract first frame as WebP poster
        execFileSync('ffmpeg', [
          '-i', fullPath,
          '-vframes', '1',
          '-vf', "scale='min(1920,iw)':-2",
          '-y',
          outPoster,
        ], { stdio: 'inherit' });

        console.log(`   ✅  done\n`);
      }

      processed++;
    }
  }
}

console.log(DRY_RUN
  ? '🔍  Dry run — pass --convert to actually process files\n'
  : '🎬  Processing videos...\n'
);

walk(TARGET_DIR);

console.log(`\n${DRY_RUN ? 'Would process' : 'Processed'}: ${processed}  |  Skipped (already done): ${skipped}`);
if (DRY_RUN && processed > 0) {
  console.log('Run with --convert to compress and extract posters.');
}
