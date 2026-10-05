const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = path.resolve(__dirname, '..', 'out');
const origin = 'https://www.camilalonart.com';
const decode = text => text.replace(/&amp;/g, '&').replace(/&quot;/g, '"')
  .replace(/&#x([a-f0-9]+);/gi, (_, value) => String.fromCodePoint(parseInt(value, 16)))
  .replace(/&#(\d+);/g, (_, value) => String.fromCodePoint(Number(value)));
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => decode(match[1]));
const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

function destinationExists(href) {
  if (!href.startsWith('/') || href.startsWith('//')) return true;
  const target = path.join(root, decodeURIComponent(href.split(/[?#]/)[0]));
  return fs.existsSync(target) || fs.existsSync(`${target}.html`);
}

function* pages(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory() && entry.name !== '_next') yield* pages(file);
    else if (entry.name === 'index.html') yield file;
  }
}

assert(urls.length > 0, 'The sitemap must contain published pages.');
for (const url of urls) {
  const pathname = new URL(url).pathname;
  const file = path.join(root, decodeURIComponent(pathname), 'index.html');
  if (!fs.existsSync(file)) {
    failures.push(`Missing sitemap destination: ${url}`);
    continue;
  }
  const html = fs.readFileSync(file, 'utf8');
  check(html.includes(`<link rel="canonical" href="${url}"`), `Wrong canonical: ${url}`);
  check(!/<meta name="robots" content="[^"]*noindex/.test(html), `Noindex page in sitemap: ${url}`);
  check(/<meta name="description" content="[^"]+"/.test(html), `Missing description: ${url}`);
  check((html.match(/<h1[\s>]/g) || []).length === 1, `Expected one h1: ${url}`);
  check(html.includes(`<html lang="${pathname.startsWith('/es/') ? 'es' : 'en'}"`), `Wrong document language: ${url}`);
  for (const locale of ['en', 'es', 'x-default']) {
    check(new RegExp(`href[Ll]ang="${locale}"`).test(html), `Missing ${locale} alternate: ${url}`);
  }
}

let pageCount = 0;
for (const file of pages(root)) {
  const html = fs.readFileSync(file, 'utf8');
  const route = path.relative(root, file);
  pageCount++;
  for (const match of html.matchAll(/<(?:a|img)\b[^>]*?\s(?:href|src)="([^"]+)"/g)) {
    const target = decode(match[1]);
    check(destinationExists(target), `Missing link/image ${target} in ${route}`);
  }
  for (const match of html.matchAll(/\bsrc[Ss]et="([^"]+)"/g)) {
    for (const candidate of decode(match[1]).split(/,\s*/)) {
      const target = candidate.trim().replace(/\s+\d+(?:\.\d+)?[wx]$/, '');
      check(destinationExists(target), `Missing responsive image ${target} in ${route}`);
    }
  }
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      if (!(error instanceof SyntaxError)) throw error;
      failures.push(`Invalid JSON-LD in ${route}: ${error.message}`);
    }
  }
}

for (const route of ['photography/pets', 'photography/headshots', 'photography/family-maternity']) {
  for (const prefix of ['', 'es/']) {
    const html = fs.readFileSync(path.join(root, prefix, route, 'index.html'), 'utf8');
    check(html.includes('"@type":"Service"'), `Missing Service schema: ${prefix}${route}`);
    check(html.includes('"@type":"BreadcrumbList"'), `Missing breadcrumbs: ${prefix}${route}`);
  }
}

const homepage = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const prefix of ['', 'es/']) {
  const home = fs.readFileSync(path.join(root, prefix, 'index.html'), 'utf8');
  check(home.includes('id="inquiry-interest"'), `Missing inquiry planner: ${prefix}`);
  // Owner decision: every homepage tile is a black-and-white photograph with its title overlaid.
  const tileCount = name => (home.match(new RegExp(`class="[^"]*\\b${name}\\b`, 'g')) || []).length;
  const tileRules = selector => [...home.matchAll(new RegExp(`${selector}\\{([^}]*)\\}`, 'g'))].map(match => match[1]);
  const onlyValue = (rules, property, value) => rules.some(rule => rule.includes(`${property}:${value}`))
    && rules.every(rule => !rule.includes(`${property}:`) || rule.includes(`${property}:${value}`));
  check(tileCount('tile-image') > 0 && tileCount('tile-image') === tileCount('tile-copy'), `Every homepage tile needs a photograph: ${prefix}`);
  check(onlyValue(tileRules('\\.tile-image'), 'position', 'absolute'), `Homepage tile titles must overlay their photographs: ${prefix}`);
  check(onlyValue(tileRules('\\.tile-image img'), 'filter', 'grayscale(1)'), `Homepage tile photographs must be black and white: ${prefix}`);
  const directory = fs.readFileSync(path.join(root, prefix, 'photography', 'index.html'), 'utf8');
  check(directory.includes('"@type":"CollectionPage"'), `Missing directory schema: ${prefix}`);
  check(directory.includes('"@type":"BreadcrumbList"'), `Missing directory breadcrumb schema: ${prefix}`);
  check(urls.includes(`${origin}/${prefix}photography/`), `Missing directory sitemap entry: ${prefix}`);
  for (const service of ['wedding-couples', 'pets', 'family-maternity', 'headshots']) {
    check(directory.includes(`href="/${prefix}photography/${service}/"`), `Missing directory service: ${prefix}${service}`);
    check(directory.includes(`href="/${prefix}photography/${service}/gallery/"`), `Missing directory gallery: ${prefix}${service}`);
  }
  for (const [route, guide] of [
    ['photography/pets', 'pets'], ['photography/family-maternity', 'family'],
    ['photography/headshots', 'headshots'], ['photography/wedding-couples', 'wedding'],
    ['art-experiences', 'experiences'], ['art/contact', 'collector'],
    ['creative-services/ux-ui-design', 'ux'], ['my-art/wildlife-photography', 'wildlife'],
  ]) {
    const html = fs.readFileSync(path.join(root, prefix, route, 'index.html'), 'utf8');
    check(html.includes(`id="service-guide-${guide}"`), `Missing service guide: ${prefix}${route}`);
  }
}
check(/src[Ss]et="[^"]*\/responsive-images\//.test(homepage), 'Homepage must serve responsive image candidates.');
check(urls.every(url => url.startsWith(`${origin}/`)), 'Sitemap contains a noncanonical host.');
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Export checked: ${pageCount} pages, ${urls.length} sitemap entries, local links, images and structured data.`);
}
