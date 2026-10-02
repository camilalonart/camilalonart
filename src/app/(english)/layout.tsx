import LocaleDocument from '@/components/LocaleDocument';
import { baseMetadata } from '@/lib/seo';

export const metadata = baseMetadata;

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <LocaleDocument locale="en">{children}</LocaleDocument>;
}
