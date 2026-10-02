import { getEventIdFromShortSlug } from '@/components/artExperiences/data';
import { generateMetadata as buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { shortSlug: string } }) {
  const id = getEventIdFromShortSlug(params.shortSlug);
  return buildMetadata({
    title: 'Art Event',
    description: 'Continue to the art event details.',
    path: id ? `/art-experiences/events/${id}/` : '/art-experiences/events/',
    noIndex: true,
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
