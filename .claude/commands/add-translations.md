# Add Translation Keys

Add new bilingual translation keys to the project. Always edit BOTH language files in the same operation.

## Files
- `src/i18n/locales/en.json` — English
- `src/i18n/locales/es.json` — Spanish

## What to ask first (if not provided)
- What namespace/section? (e.g. `nav`, `home`, `art`, `photography.pets`)
- The English text
- The Spanish text (ask the user if not provided — never auto-translate without confirmation)

## Key format
Keys use dot-notation in code: `t('section.subsection.key')`
This maps to nested JSON:
```json
{
  "section": {
    "subsection": {
      "key": "value"
    }
  }
}
```

## Steps

1. **Read both files** to find the right place to insert
2. **Add the key to en.json** under the correct nested object
3. **Add the same key to es.json** with the Spanish value
4. **Verify** the key path matches how it's called in the component (`t('...')`)

## Example
Component uses: `t('photography.pets.hero.title')`

en.json:
```json
{
  "photography": {
    "pets": {
      "hero": {
        "title": "Pet Photography"
      }
    }
  }
}
```

es.json:
```json
{
  "photography": {
    "pets": {
      "hero": {
        "title": "Fotografía de Mascotas"
      }
    }
  }
}
```

## Rules
- NEVER add a key to only one language file — always both
- NEVER auto-generate Spanish translations — always confirm with the user
- Keep alphabetical order within each object when possible
- If the namespace doesn't exist yet in the JSON, create the full nested structure
- After editing, check that `npm run lint` passes (no JSON syntax errors)
- The `t()` function returns the key string itself if the key is missing — useful for catching typos at dev time
