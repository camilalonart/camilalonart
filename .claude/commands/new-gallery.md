# New Photo Gallery Page

Create a new photo gallery page using the project's BaseGallery/Gallery system.

## What to ask first (if not provided)
- Gallery type: photography section (pets/wedding/wildlife) or personal work (`/my-art/`)
- Route path (e.g. `/photography/headshots/gallery`)
- Image folder under `public/images/` (e.g. `headshots/gallery/`)
- Back link and back text
- Is it auto-generated from a JSON file, or manually listed?

## Option A — Auto-generated JSON gallery (pets / wedding / wildlife pattern)

### 1. Add images to `public/images/<type>/gallery/` (WebP only)

### 2. Generate the JSON data file
```bash
npm run generate-images
```
This creates/updates `src/data/<type>Images.json`.

If the script doesn't support the new type yet, add a manual JSON file:
```json
[
  "/images/<type>/gallery/photo1.webp",
  "/images/<type>/gallery/photo2.webp"
]
```

### 3. Create `src/app/<path>/gallery/page.tsx`
```tsx
'use client';
import galleryImages from '@/data/<type>Images.json';
import BaseGallery from '@/components/gallery/BaseGallery';

export default function GalleryPage() {
  const images = (galleryImages as string[]).map(src => ({
    src,
    alt: '<Section> photography by Camilalonart'
  }));

  return (
    <BaseGallery
      images={images}
      backLink="/photography/<section>"
      backText="← Back to <Section>"
    />
  );
}
```

## Option B — Manually listed gallery (art / personal work)

```tsx
'use client';
import BaseGallery from '@/components/gallery/BaseGallery';

const IMAGES = [
  { src: '/images/<section>/photo1.webp', alt: 'Description' },
  { src: '/images/<section>/photo2.webp', alt: 'Description' },
];

export default function GalleryPage() {
  return (
    <BaseGallery
      images={IMAGES}
      backLink="/<parent-route>"
      backText="← Back"
    />
  );
}
```

## Option C — Full custom gallery with masonry + lightbox

Use `BaseGallery` as the base but wrap with section-specific styled components if the palette differs. Pattern from `src/components/gallery/BaseGallery.tsx`:

```tsx
const MasonryGrid = styled.div`
  columns: 3;
  column-gap: ${theme.spacing.lg};
  @media (max-width: ${theme.breakpoints.lg}) { columns: 2; }
  @media (max-width: ${theme.breakpoints.sm}) { columns: 1; }
`;

const GalleryItem = styled.div`
  break-inside: avoid;
  margin-bottom: ${theme.spacing.lg};
  cursor: pointer;
  transition: transform 0.3s ease;
  position: relative;
  &:hover { transform: translateY(-5px); }
`;
```

## After creating the gallery

1. Add a link to the gallery from the parent section page (e.g. a "View Gallery" button)
2. Add `npm run webp-convert` and `npm run generate-images` to convert any raw photos first
3. Run `npm run dev` and click through the gallery — test lightbox open/close and keyboard navigation
4. Confirm `SecureImage` (or `BaseGallery`'s built-in image protection) is active — right-click should be blocked

## Rules
- All images must be `.webp` — never commit JPG/PNG to the repo
- Never use raw `<img>` tags — use `SecureImage` or the protected image inside `BaseGallery`
- Only one `priority` image per page (the first visible image if any)
- Watermark `© Camilalonart` must be visible on all gallery images
- JSON data files are auto-generated — don't hand-edit files that `generate-images` owns
