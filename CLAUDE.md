# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Dev
npm run dev              # Dev server at localhost:3000
npm run build            # Production build → /out
npm run lint             # ESLint

# Images (run in this order when adding new photos)
npm run webp-convert          # Convert JPG/PNG → WebP (skips already converted)
npm run webp-cleanup          # Delete original JPGs where .webp exists
npm run generate-images       # Regenerate gallery JSON (pets/wedding/wildlife only)
npm run refs-update           # Update .jpg references in source code to .webp

# Each has a dry-run preview variant: webp-check, webp-cleanup-check, refs-check

# Art Portfolio Sync (sync images with artPortfolio.ts data)
node scripts/sync-art-images.js           # Check /public/images/art/traditionalArt vs data
node scripts/sync-oldart-images.js        # Check /public/images/art/oldArt vs data
node scripts/generate-updated-portfolio.js # Group missing images by folder

# See scripts/README.md for detailed documentation
```

**Deployment** is automated via GitHub Actions (`.github/workflows/deploy.yml`). Manual: `bash deploy.sh`.

---

## Vision

`camilalonart.com` is a hub that links to distinct sub-experiences, each with its own visual identity. The homepage is a portal — each section is a different aesthetic world. Each section page defines its own local palette constants; do not apply the global `theme` uniformly.

Owner decisions:
- Every homepage section tile is a black-and-white photograph with its title overlaid. `npm run check:site` fails if a change removes this design.
- Apply site changes directly. Do not add feature flags, flights or kill switches.

## Per-section design identity

| Section | Palette | Typography | Feel |
|---|---|---|---|
| Baby/Family/Maternity | Sage green + warm cream | Cormorant, light | Soft, nurturing |
| Weddings/Couples | Burgundy + champagne | Cormorant, wide spacing | Romantic, timeless |
| Headshots | Charcoal + white | Montserrat | Sharp, professional |
| Pets | Terracotta + sand | Poppins | Warm, playful |
| Traditional Art | `#080808` + gold `#C8A87A` | Cormorant, thin | Museum/gallery |
| Tech | Dark slate + indigo | Montserrat + monospace | Precise, technical |

---

## Architecture

**Next.js 14 App Router**, TypeScript, Styled Components, static export (`output: 'export'`). GitHub Pages at camilalonart.com.

### Routes (`src/app/(english)`; Spanish adapters in `src/app/(spanish)/es`)
- `/` — Hub homepage
- `/art/` — Traditional art portfolio (standalone painter site) — also at `/my-art/traditional-art/`
- `/photography/*` — Client galleries: pets, wedding-couples, family-maternity, headshots
- `/my-art/*` — Personal work: wildlife, digital-art, traditional-art, everyday-photography, blog
- `/creative-services/*` — Brand identity, graphic recording, UX/UI, art classes
- `/tech/*` — Engineering, courses

### Traditional Art Portfolio (`/art`)
The main painter portfolio — a fully standalone site with its own nav, hero, and footer. Accessible at two URLs:
- `src/app/(english)/art/page.tsx` → `camilalonart.com/art/`
- `src/app/(english)/my-art/traditional-art/page.tsx` → legacy URL redirect

The canonical `/art/` page renders `src/components/art/ArtPortfolio.tsx`; the legacy URL redirects to it in the current language. Data lives in `src/data/artPortfolio.ts` — edit this file to add/edit paintings and collections. Structure:
- `collections[]` — named series (e.g. "Silencio 2023–2024"), each with `paintings[]`
- `otherProjects[]` — works outside the main collections
- `about` — bio paragraphs + 2 Instagram URLs (`@camilalonart`, `@camilonart`)

Each painting has: `id`, `title`, `materials`, `size`, `year`, `images[]` (1+ photos), optional `thoughts` (artist statement shown in modal).

The lightbox modal always shows `@camilalonart` watermark. Keyboard: ← → to navigate collection, ESC to close.

### Section layouts
Sections with dark backgrounds have their own `layout.tsx` (server component, inline `style` wrapper) to prevent white flash. Examples: `src/app/(english)/art/layout.tsx`, `src/app/(english)/my-art/traditional-art/layout.tsx`.

### Fonts (3 — do not add more)
Loaded in `src/components/LocaleDocument.tsx` with `display: 'swap'`:
- `--font-cormorant` — Cormorant Garamond (art, photography sections)
- `--font-montserrat` — Montserrat (UI text, headshots, tech)
- `--font-poppins` — Poppins (body copy, pets, creative services)

### Images
Images live in `public/images/`. Format is **WebP** — never commit raw JPGs to the repo (too large). Keep originals on an external drive.

- `SecureImage` (`src/components/SecureImage.tsx`) — use for all images. Adds shimmer skeleton, right-click/drag block, optional watermark.
- Only one `priority` image per page (the LCP — first above-fold image).
- Gallery JSON files (`src/data/petImages.json`, `weddingImages.json`, `wildlifeImages.json`) are auto-generated by `npm run generate-images` from files in `public/images/[type]/gallery/`.
- Traditional art images are referenced manually in `src/data/artPortfolio.ts`.
- **Do not add Cloudinary** — decision is in-repo WebP.

Image protection: watermark + right-click/drag block (implemented). True download prevention is impossible on a static host.

### Gallery System
`BaseGallery.tsx` → `Gallery.tsx` / `ImageGallery.tsx`, all using `SecureImage`.

### i18n (EN/ES)
- Provider: `src/i18n/TranslationContext.tsx`
- Strings: `src/i18n/locales/en.json`, `es.json` and domain-specific `*-content.en/es.json` dictionaries.
- Usage: `const { t } = useTranslation()` → `t('key')`
- The URL determines the initial language: existing unprefixed URLs are English; `/es/…` URLs prerender Spanish with `html lang="es"`. Saved preference never overrides an explicit URL.
- Language switching uses Next's native History integration, preserving page state, query and hash. Only the language preference is stored; form fields are not persisted.
- Internal links use `@/i18n/LocalizedLink` (compatible with `next/link` and styled components). Imperative navigation uses `useLocalizedRouter` from `@/i18n/navigation`. Raw anchors use `localizedPath(href, locale)` from `@/i18n/routing`; assets, downloads, fragments and external URLs are not prefixed.
- Edit page implementations only in `(english)`. `npm run generate-locales` regenerates thin Spanish adapters and the metadata source registry; it also runs before production builds. Dynamic route patterns and `generateStaticParams` are reused, not copied per artwork.
- Spanish SEO text is in `src/i18n/seo-es.ts`; artwork metadata uses localized art data. Both locales expose reciprocal canonical/hreflang and sitemap entries. Keep unfinished pages noindex.
- Run `npm run check:translations` to check EN/ES keys, placeholders and literal references; see `I18N_README.md`.
- Store status message keys, not translated strings. Keep language controls inside active dialogs so inputs and gallery state survive switching.

### Forms & API
`/api/submit-wedding-inquiry/` — Google APIs form submission. Credentials via env vars in `next.config.js`.

### Path aliases
`@/*` → `src/*` (tsconfig.json).
