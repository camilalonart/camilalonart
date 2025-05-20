const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

try {
  // Run Next.js build
  console.log('Building Next.js project...');
  execSync('next build', { stdio: 'inherit' });

  // Copy images to output directory
  console.log('Copying images to output directory...');
  fs.copySync(
    path.join(__dirname, 'public', 'images'),
    path.join(__dirname, 'out', 'images'),
    { overwrite: true }
  );

  // Copy CNAME file
  console.log('Copying CNAME file...');
  fs.copySync(
    path.join(__dirname, 'public', 'CNAME'),
    path.join(__dirname, 'out', 'CNAME'),
    { overwrite: true }
  );

  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
} 