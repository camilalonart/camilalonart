# English and Spanish

The existing URLs remain English. Spanish pages use the same path under `/es/`,
for example `/photography/pets/` and `/es/photography/pets/`. Both versions are
static HTML, including their initial content, document language and SEO metadata.

## Source files

- `src/app/(english)/`: the shared page implementations. Edit content here.
- `src/app/(spanish)/es/`: generated Spanish adapters, not duplicated page bodies.
- `scripts/generate-locale-routes.cjs`: creates adapters and the metadata registry.
- `src/components/LocaleDocument.tsx`: shared document with the initial locale.
- `src/i18n/TranslationContext.tsx`: translation lookup and in-place switching.
- `src/i18n/route-metadata.ts` and `seo-es.ts`: localized metadata and descriptions.
- `src/i18n/locales/`: English/Spanish dictionary pairs.

`npm run generate-locales` regenerates adapters. `npm run build` runs it
automatically through `prebuild`. Do not edit generated adapters directly.

## Adding or editing copy

Common text lives in `en.json` / `es.json`. Additional dictionary namespaces:

| Files | Namespace | Shape |
|---|---|---|
| `art-content.en.json` / `.es.json` | `artContent` | Raw content; provider adds the namespace |
| `creative-content.en.json` / `.es.json` | `creativeContent` | Raw content; provider adds the namespace |
| `photography-content.en.json` / `.es.json` | `photographyContent` | Namespace already present in each file |
| `shared-content.en.json` / `.es.json` | `sharedContent` | Namespace already present in each file |

Keep both languages' keys, arrays and interpolation placeholders aligned.
Translate prose, labels, errors, image descriptions and accessibility labels;
preserve original artwork/project titles, people, prices and backend option values.

```tsx
import { useTranslation } from '@/i18n/TranslationContext';

const { t, locale, setLocale } = useTranslation();
// Derive displayed text on every render, including existing status messages.
return <button onClick={() => setLocale('es')}>{t('common.changeLanguage')}</button>;
```

Store a status code or translation key, not the translated message in React state.
Otherwise an existing notification will stay in its previous language.

## Navigation and switching

Use `@/i18n/LocalizedLink` instead of `next/link` for internal page links.
Use `useLocalizedRouter` from `@/i18n/navigation` for imperative page navigation.
Use `localizedPath(path, locale)` for native anchors. Assets, API paths, downloads,
external URLs and same-page fragments are left unchanged.

Switching updates the URL through Next.js's native History integration without
remounting the page. Form fields, package selections, filters, lightboxes,
query parameters and fragments remain intact. The title, metadata and document
language update to match. Reloading loads the corresponding static locale page.

The explicit URL always controls the language. A saved preference never overrides
a deep link. At the English homepage, a saved Spanish choice or Spanish browser
language offers a small optional suggestion; it does not silently redirect.
Choosing either language saves that preference. No form drafts are stored.

`LanguageSwitcher` uses language names and EN/ES codes, not national flags.
Pages with no header language control receive a floating control. Active dialogs
include their own control inside the focus trap. Escape closes an open language
menu first, then the dialog.

## Forms

`useLocalizedForm()` provides `formRef`, `validate`, `onInput` and `onInvalid`.
Attach them to a form with `noValidate`, then call `validate()` before sending.
Use separate hook instances for separate forms. Locale changes update existing
validation messages without clearing values.

`createInquiryMailto()` translates draft subjects, labels and displayed option
values without changing the stable values sent to configured form providers.
Changing language does not submit a form or send an email.

## SEO and new routes

English and Spanish pages have their own canonical URLs and reciprocal
`en`, `es` and `x-default` alternates. The sitemap includes both versions of
published content; unfinished pages remain `noindex`.

When adding a page, add its English metadata, Spanish SEO copy in `seo-es.ts`
(or an appropriate data-backed resolver), both-language UI copy, and an entry in
the published sitemap when ready. Regenerate adapters and build.

## Checks

```sh
npm run check:translations
npm run build
```

The translation check compares dictionary keys and placeholders and catches
missing literal `t('...')` references. It does not replace reviewing dynamic keys,
translated prose or browser flows. Test switching inside populated forms and
galleries, back/forward navigation, reload, and Spanish HTML without JavaScript.

Adding another language requires corresponding routes, document initialization,
metadata, sitemap alternates, helpers and dictionaries; adding a JSON file alone
is not sufficient.
