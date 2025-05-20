const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

try {
  // Run Next.js build
  console.log('Building Next.js project...');
  execSync('next build', { stdio: 'inherit' });

  // Copy images to output directory if it exists
  const imagesSourcePath = path.join(__dirname, 'public', 'images');
  const imagesDestPath = path.join(__dirname, 'out', 'images');
  
  if (fs.existsSync(imagesSourcePath)) {
    console.log('Copying images to output directory...');
    fs.copySync(imagesSourcePath, imagesDestPath, { overwrite: true });
  } else {
    console.warn('Warning: images directory not found in public directory. Skipping images copy.');
  }

  // Copy CNAME file if it exists
  const cnameSourcePath = path.join(__dirname, 'public', 'CNAME');
  const cnameDestPath = path.join(__dirname, 'out', 'CNAME');
  
  if (fs.existsSync(cnameSourcePath)) {
    console.log('Copying CNAME file...');
    fs.copySync(cnameSourcePath, cnameDestPath, { overwrite: true });
  } else {
    console.warn('Warning: CNAME file not found in public directory. Skipping CNAME copy.');
  }

  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
} 