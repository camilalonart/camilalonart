const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Run Next.js build
console.log('Building Next.js project...');
execSync('next build', { stdio: 'inherit' });

// Copy CNAME to out directory
const cnamePath = path.join(__dirname, 'public', 'CNAME');
const outPath = path.join(__dirname, 'out', 'CNAME');

console.log('Copying CNAME file to build output...');
fs.copyFileSync(cnamePath, outPath);

console.log('Build complete! CNAME file has been copied to the output directory.'); 