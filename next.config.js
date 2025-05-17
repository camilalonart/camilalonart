/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  images: {
    unoptimized: true, // Required for static export
  },
  compiler: {
    styledComponents: true,
  },
  // Add basePath if you're not using a custom domain
  // basePath: '/portfolio-website',
};

module.exports = nextConfig; 