const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
const directory = path.join(root, 'src', 'i18n', 'locales');
const errors = [];

function flatten(value, prefix = '', result = new Map()) {
  for (const [key, item] of Object.entries(value)) {
    const name = prefix ? `${prefix}.${key}` : key;
    if (item !== null && typeof item === 'object') {
      flatten(item, name, result);
    } else if (typeof item === 'string') {
      result.set(name, item);
    } else {
      errors.push(`${name}: translations must be strings, arrays or nested objects`);
    }
  }
  return result;
}

const namespace = name => name.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
const keys = new Set();
const englishFiles = fs.readdirSync(directory).filter(file => file === 'en.json' || file.endsWith('.en.json'));

for (const file of englishFiles) {
  const spanishFile = file === 'en.json' ? 'es.json' : file.replace(/\.en\.json$/, '.es.json');
  if (!fs.existsSync(path.join(directory, spanishFile))) {
    errors.push(`Missing ${spanishFile}`);
    continue;
  }
  const prefix = file === 'en.json' ? '' : namespace(file.replace(/\.en\.json$/, ''));
  const englishData = JSON.parse(fs.readFileSync(path.join(directory, file), 'utf8'));
  const spanishData = JSON.parse(fs.readFileSync(path.join(directory, spanishFile), 'utf8'));
  const english = flatten(englishData, prefix in englishData ? '' : prefix);
  const spanish = flatten(spanishData, prefix in spanishData ? '' : prefix);
  for (const key of new Set([...english.keys(), ...spanish.keys()])) {
    if (!english.has(key)) errors.push(`${file}: missing ${key}`);
    if (!spanish.has(key)) errors.push(`${spanishFile}: missing ${key}`);
    if (english.has(key) && spanish.has(key)) {
      const placeholders = value => [...value.matchAll(/\{([a-zA-Z][\w]*)\}/g)].map(match => match[1]).sort().join(',');
      if (placeholders(english.get(key)) !== placeholders(spanish.get(key))) {
        errors.push(`${key}: English and Spanish interpolation parameters differ`);
      }
    }
    keys.add(key);
  }
}

function inspect(directoryPath) {
  for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
    const file = path.join(directoryPath, entry.name);
    if (entry.isDirectory()) {
      inspect(file);
    } else if (/\.tsx?$/.test(entry.name)) {
      const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
      const visit = node => {
        if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 't') {
          const key = node.arguments[0];
          if (key && ts.isStringLiteralLike(key) && !keys.has(key.text)) {
            const line = source.getLineAndCharacterOfPosition(key.getStart()).line + 1;
            errors.push(`${path.relative(root, file)}:${line}: missing translation ${key.text}`);
          }
        }
        ts.forEachChild(node, visit);
      };
      visit(source);
    }
  }
}

inspect(path.join(root, 'src'));
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`${keys.size} matching EN/ES translation keys; literal translation references and placeholders are valid.`);
}
