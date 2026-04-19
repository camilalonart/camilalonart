/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  images: {
    unoptimized: true, // Required for static export — replace with Cloudinary once cloud name is set
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  trailingSlash: true,
  // Expose public environment variables
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://camilalonart.com',
    NEXT_PUBLIC_WEDDING_FORM_URL: process.env.NEXT_PUBLIC_WEDDING_FORM_URL || '',
    NEXT_PUBLIC_PET_FORM_URL: process.env.NEXT_PUBLIC_PET_FORM_URL || '',
    NEXT_PUBLIC_FORMSPREE_ART_CONTACT_ID: process.env.NEXT_PUBLIC_FORMSPREE_ART_CONTACT_ID || '',
    NEXT_PUBLIC_FORMSPREE_WEDDINGS_ID: process.env.NEXT_PUBLIC_FORMSPREE_WEDDINGS_ID || '',
    NEXT_PUBLIC_FORMSPREE_BABY_FAMILY_ID: process.env.NEXT_PUBLIC_FORMSPREE_BABY_FAMILY_ID || '',
    NEXT_PUBLIC_FORMSPREE_HEADSHOTS_ID: process.env.NEXT_PUBLIC_FORMSPREE_HEADSHOTS_ID || '',
    NEXT_PUBLIC_FORMSPREE_PETS_ID: process.env.NEXT_PUBLIC_FORMSPREE_PETS_ID || '',
  },
  // Ensure static files are copied to output
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig; 