'use client';

import { useTranslation } from '@/i18n/TranslationContext';
import { jsonLdScript } from '@/lib/seo';

export default function LocalizedStructuredData({ en, es }: { en: object | object[]; es: object | object[] }) {
  const { locale } = useTranslation();
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(locale === 'es' ? es : en) }} />;
}
