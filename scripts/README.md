# Art Portfolio Image Sync Scripts

This directory contains Node.js scripts for managing and synchronizing images in the art portfolio with the `artPortfolio.ts` data file.

## Overview

The scripts help identify:
- ✅ Images that exist in folders but aren't referenced in data
- ✅ References in data that point to non-existent images
- ✅ Missing collections or paintings

## Scripts

### 1. `sync-art-images.js` — Traditional Art Images
Synchronizes images from `/public/images/art/traditionalArt` with `src/data/artPortfolio.ts` (collections).

**Usage:**
```bash
node scripts/sync-art-images.js
```

**Output:**
- Total image count in folder
- Total referenced images in data
- List of missing images (exist in folder, not in data)
- List of broken references (in data, don't exist in folder)

**Example output structure:**
```
📊 IMAGE SYNC REPORT

Total images in folder: 190
Total images referenced in artPortfolio.ts: 108

❌ MISSING FROM artPortfolio.ts (90):
  "/images/art/traditionalArt/Colorful/Nana.webp"
  "/images/art/traditionalArt/Colorful/Detalles/Nana_Detalles0.webp"
  ...

⚠️  REFERENCED BUT NOT FOUND (8):
  "/images/art/traditionalArt/Carrying Home/Details/A7T02372.webp"
  ...
```

### 2. `sync-oldart-images.js` — Early/Old Art Images
Synchronizes images from `/public/images/art/oldArt` with `src/data/artPortfolio.ts` (earlyFirstPaintings).

**Usage:**
```bash
node scripts/sync-oldart-images.js
```

**Output:**
Same format as `sync-art-images.js` but for the earlyFirstPaintings collection.

### 3. `generate-updated-portfolio.js` — Generate Update Report
Groups missing traditional art images by folder and categorizes them as main paintings or details.

**Usage:**
```bash
node scripts/generate-updated-portfolio.js
```

**Output:**
- Images grouped by folder
- Split into "main" images (new paintings to create) vs "details" (add to existing)
- Summary with counts by folder

**Example:**
```
📁 Colorful
   Total: 22 images (2 main, 20 details)
   Main: Nana.webp, ParaPipe.webp

📁 Otros
   Total: 14 images (5 main, 9 details)
   Main: Menta.webp, PaginaAleatoriaDeMiCuaderno.webp, ...
```

### 4. `generate-artportfolio-updated.js` — Generate Painting Stubs & Update Guide
Generates a complete update guide (`artPortfolio.UPDATES.md`) with:
- Ready-to-complete painting stubs (JSON objects) for all new paintings
- Organized lists of detail images by collection
- Copy-paste ready code snippets

**Usage:**
```bash
node scripts/generate-artportfolio-updated.js
```

**Output:**
Creates `artPortfolio.UPDATES.md` with:
- **8 painting stubs** with all required fields (id, title, materials [TODO], size [TODO], year, images, details)
- **37 detail images** organized by collection, ready to paste into `details[]` arrays
- Step-by-step instructions for updating artPortfolio.ts

**Example stub:**
```typescript
{
  id: "colorful-nana",
  title: "Nana",
  materials: "TODO: Add materials (e.g., Oil on canvas, Watercolor)",
  size: "TODO: Add size (e.g., 60 × 80 cm)",
  year: 2024,
  images: ["/images/art/traditionalArt/Colorful/Nana.webp"],
  details: [],
}
```

**Workflow:**
1. Run this script
2. Open `artPortfolio.UPDATES.md`
3. Complete all TODO fields (materials, size, etc.)
4. Copy/paste stubs into appropriate collections in `artPortfolio.ts`
5. Copy/paste detail image URLs into matching painting `details[]` arrays
6. Verify with `node scripts/sync-art-images.js`

## Workflow

### Adding new traditional art paintings

1. **Run sync report:**
   ```bash
   node scripts/sync-art-images.js
   ```

2. **Check missing images:**
   Look at the output to see which images need to be added to `artPortfolio.ts`.

3. **Categorize by folder:**
   ```bash
   node scripts/generate-updated-portfolio.js
   ```

4. **Add paintings to data file:**
   - For main images (e.g., `Nana.webp`), create new `Painting` objects
   - For detail images, add to the `images[]` or `details[]` array of existing paintings
   - Edit `src/data/artPortfolio.ts` directly

5. **Verify sync:**
   ```bash
   node scripts/sync-art-images.js
   ```
   Should show ✅ or lower missing/broken counts.

### Adding new oldArt paintings

1. **Run sync report:**
   ```bash
   node scripts/sync-oldart-images.js
   ```

2. **Add to earlyFirstPaintings:**
   Edit `src/data/artPortfolio.ts` and add paintings to the `earlyFirstPaintings` array.

3. **Verify:**
   ```bash
   node scripts/sync-oldart-images.js
   ```

## Data File Structure

Both scripts read from `src/data/artPortfolio.ts`:

```typescript
const data: ArtPortfolioData = {
  collections: [
    {
      id: "collection-id",
      name: "Collection Name",
      period: "2024",
      description: "...",
      paintings: [
        {
          id: "painting-id",
          title: "Painting Title",
          materials: "Oil on canvas",
          size: "100x100cm",
          year: 2024,
          images: ["/images/art/traditionalArt/..."],
          details: ["/images/art/traditionalArt/..."],
        }
      ]
    }
  ],
  earlyFirstPaintings: [
    // Similar structure for old art
  ]
}
```

## Tips

- Always use **WebP format** — never commit raw JPG/PNG
- Image paths must start with `/images/art/`
- Use `Details/` or `Detalles/` folder for process/detail shots
- Run sync scripts before committing to catch missing references
- The scripts are safe — they only **read** files, never modify them

## Troubleshooting

**Script shows many missing images?**
- You've added new image folders. Decide if they should be new paintings or details of existing ones.
- Run the scripts to identify what needs data entry.

**Script shows broken references?**
- Images in `artPortfolio.ts` point to files that don't exist. Either:
  - Move/rename files to match paths
  - Update paths in `artPortfolio.ts`
  - Delete the painting entry if images are really gone

**HEIC files in report?**
- Old formats that should be converted to WebP. Not needed in the final portfolio.
- Can safely ignore unless you want to include those images.

## Future Enhancements

- Auto-generate basic painting data from folder structure
- Validate image file sizes and dimensions
- Check for orphaned image folders (no paintings reference them)
- Generate human-readable summary of sync status
