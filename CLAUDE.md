# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Dev server at localhost:3000
npm run build            # Production build → /out directory
npm run lint             # ESLint
npm run generate-images  # Regenerate gallery JSON from /public/images/*/gallery/ directories
```

**Deployment** is automated via GitHub Actions (`.github/workflows/deploy.yml`). Manual deploy: `bash deploy.sh` (builds and pushes `/out` to `gh-pages` branch via git subtree).

## Architecture

**Next.js 14 App Router** with TypeScript, Styled Components, and static export (`output: 'export'` in `next.config.js`). Hosted on GitHub Pages at camilalonart.com.

### Pages (`src/app`)
Three main sections:
- `/photography/*` — Client session galleries (pets, wedding, family, headshots)
- `/my-art/*` — Personal work (wildlife, digital art, traditional art, everyday photography, blog)
- `/creative-services/*` — Services offered (art classes, brand identity, graphic recording, UX/UI)

### Gallery System
Galleries are **JSON-driven**: image lists live in `src/data/*.json` (e.g., `petImages.json`, `weddingImages.json`). These are regenerated from files in `public/images/[type]/gallery/` by running `npm run generate-images`. After adding new images to the public folder, always regenerate the JSON. Core components: `BaseGallery.tsx` → `Gallery.tsx` / `ImageGallery.tsx`, with `ProtectedImage.tsx` for image optimization via Cloudinary (`next-cloudinary`).

### Internationalization (EN/ES)
- Context provider: `src/i18n/TranslationContext.tsx` — wraps the app in `src/app/layout.tsx`
- Translation strings: `src/i18n/locales/en.json` and `es.json`
- Usage in components: `const { t } = useTranslation()` then `t('key')`
- Language persists in localStorage; defaults to Spanish if browser language is ES
- **Known limitation**: language switching forces a full page reload for translation sync

### Forms & API
`/api/submit-wedding-inquiry/` is the only API route — handles form submissions via Google APIs (`googleapis` package). Credentials come from environment variables configured in `next.config.js`.

### Path Aliases
`@/*` maps to `src/*` (configured in `tsconfig.json`).
