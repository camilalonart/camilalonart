# Add Painting to Art Portfolio

Add one or more paintings to `src/data/artPortfolio.ts` following the exact data structure of the project.

## What to ask first (if not provided)
- Collection name (existing or new?) — run `node scripts/sync-art-images.js` to see what's missing
- Painting title (EN)
- Materials (EN) — check `MATERIALS_ES` map in artPortfolio.ts for auto-translation
- Size (optional, e.g. "30 × 40 cm")
- Year
- Image paths — must be `.webp` under `/images/art/traditionalArt/<Collection>/`
- Detail images or video? (optional)
- Artist thoughts / statement (EN and ES if available)

## File to edit: `src/data/artPortfolio.ts`

### Painting interface
```ts
{
  id: string;            // kebab-case unique, e.g. "collection-name-01"
  title: string;
  materials: string;     // English; use exact strings from MATERIALS_ES for auto-ES translation
  size?: string;
  year: number;
  images: string[];      // At least 1. Path from /public root: "/images/art/..."
  thoughts?: string;     // Artist statement EN
  thoughtsEs?: string;   // Artist statement ES (optional but preferred)
  details?: Array<string | DetailVideo>;  // Extra detail images or {type:'video', src, poster}
}
```

### Adding to an EXISTING collection
Find the collection by `id` in `collections[]` and push to its `paintings[]` array.

### Adding a NEW collection
```ts
{
  id: 'collection-id',     // kebab-case
  name: 'Collection Name', // Display name EN
  period: '2025',
  description: 'EN description...',
  descriptionEs: 'ES description...',
  paintings: [ /* paintings here */ ]
}
```
Then add the collection `id` to `COLLECTIONS_ORDER` array at the correct display position.

### Adding to `otherProjects[]`
Same `Painting` interface — use when the work doesn't belong to a series.

### Adding to `selectedWorks[]`
If the painting should appear in the featured grid on the art homepage:
```ts
{
  image: '/images/art/traditionalArt/<folder>/<file>.webp',
  id: 'unique-id',
  collectionId: 'collection-id',
  paintingId: 'painting-id'
}
```

## After editing the data file
1. Run `node scripts/sync-art-images.js` to verify all image paths exist
2. Run `npm run dev` and visit `/art` or `/my-art/traditional-art/` to visually confirm
3. Check the lightbox opens and detail images/videos work

## Rules
- IDs must be unique across the entire file — check before adding
- Image paths are relative to `/public` — do NOT include `/public` in the path
- Materials strings must match keys in `MATERIALS_ES` exactly for auto-translation to work
- Both `thoughts` and `thoughtsEs` are optional but always add both when the artist provides a statement
- Never delete existing paintings — only add or edit
