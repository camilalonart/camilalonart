# Portfolio Website

A modern, responsive portfolio website built with Next.js 14, TypeScript, and styled-components.

## Features

- Modern and responsive design
- Server-side rendering with Next.js 14
- Type-safe development with TypeScript
- Styled with styled-components
- Protected images and content
- SEO optimized
- Contact forms for services

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create required directories
```bash
mkdir -p public/images
mkdir -p src/assets/images
```

4. Add your images
- Add your images to the `public/images` directory
- Images should follow this structure:
  ```
  public/images/
  ├── photography/
  │   ├── headshots/
  │   ├── pets/
  │   └── wedding-couples/
  ├── art/
  ├── creative/
  └── tech/
  ```

5. Run the development server
```bash
npm run dev
# or
yarn dev
```

6. Build for production
```bash
npm run build
# or
yarn build
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SITE_URL=your-site-url
```

## Deployment

This site is configured for GitHub Pages deployment. The build process is handled through GitHub Actions.

## License

This project is private and not licensed for public use. All rights reserved.

## Notes

- Images and other media files are not included in the repository
- Ensure you have proper rights to all media content you add
- Contact form implementation requires backend services (not included) 