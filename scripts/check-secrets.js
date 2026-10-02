const { execFileSync } = require('node:child_process');
const { existsSync, readFileSync, statSync } = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const paths = execFileSync('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard'], { cwd: root })
  .toString().split('\0').filter(Boolean);
const textExtensions = new Set(['', '.js', '.jsx', '.ts', '.tsx', '.json', '.md', '.yml', '.yaml', '.txt', '.xml', '.html', '.css', '.env', '.pem', '.key', '.sh', '.gs']);
const credentialPatterns = [
  /-----BEGIN (?:OPENSSH |RSA |EC |DSA |ENCRYPTED )?PRIVATE KEY-----/,
  /\b(?:ghp_|gho_|ghu_|ghs_|ghr_|github_pat_)[A-Za-z0-9_]{30,}\b/,
];
const findings = [];

for (const file of new Set(paths)) {
  const absolutePath = path.join(root, file);
  if (!existsSync(absolutePath) || !textExtensions.has(path.extname(file).toLowerCase())) continue;
  if (!statSync(absolutePath).isFile()) continue;
  const content = readFileSync(absolutePath, 'utf8');
  if (credentialPatterns.some(pattern => pattern.test(content))) findings.push(file);
}

if (findings.length) {
  console.error('Possible credentials detected. Remove and revoke them before publishing. File paths only:');
  findings.forEach(file => console.error(`- ${file}`));
  process.exitCode = 1;
} else {
  console.log('No private-key blocks or GitHub tokens detected in repository text files.');
}
