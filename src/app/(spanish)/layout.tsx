import LocaleDocument from '@/components/LocaleDocument';
import { baseMetadata } from '@/lib/seo';
import { localizeMetadata } from '@/i18n/route-metadata';

export const metadata = localizeMetadata(baseMetadata, '/', 'es');

export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return <LocaleDocument locale="es">{children}</LocaleDocument>;
}
