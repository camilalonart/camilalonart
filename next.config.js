/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  images: {
    unoptimized: true, // Required for static export
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  trailingSlash: true,
  // Add basePath if you're not using a custom domain
  // basePath: '/portfolio-website',
  env: {
    // Only expose public env variables here
  },
  publicRuntimeConfig: {
    // Public configs (be careful what you expose)
  },
  // Ensure CNAME file is copied to the build output
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/CNAME',
          destination: '/CNAME',
        },
      ],
    };
  }
};

module.exports = nextConfig; 