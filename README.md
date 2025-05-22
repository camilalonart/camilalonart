# Portfolio Website

A modern, responsive portfolio website built with Next.js 14, TypeScript, and styled-components.

## Updating Gallery Images

Whenever you add or remove images in `public/images/pets/gallery` or `public/images/wedding/gallery`, you need to regenerate the image lists for the galleries. Run the following command:

```sh
node scripts/generateImageList.js
```

This will update `src/data/petImages.json` and `src/data/weddingImages.json` with the current images in those folders.
