import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Portfolio',
  description: 'Photography and creative work by Camila Londoño.',
  path: '/portfolio/',
  noIndex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
