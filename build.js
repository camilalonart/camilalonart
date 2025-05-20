const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

try {
  // Run Next.js build
  console.log('Building Next.js project...');
  execSync('next build', { stdio: 'inherit' });

  // Copy CNAME to out directory
  const cnamePath = path.join(__dirname, 'public', 'CNAME');
  const outPath = path.join(__dirname, 'out', 'CNAME');

  if (fs.existsSync(cnamePath)) {
    console.log('Copying CNAME file to build output...');
    fs.copyFileSync(cnamePath, outPath);
    console.log('CNAME file has been copied successfully.');
  } else {
    console.warn('Warning: CNAME file not found in public directory.');
  }

  console.log('Build complete!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
} 