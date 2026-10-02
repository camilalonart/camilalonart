const { execSync } = require('child_process');

try {
  console.log('Building Next.js project...');
  execSync('npm run build && npm run check:site', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
} 