import { getEventIdFromShortSlug, getShortEventSlug, artEvents } from '@/components/artExperiences/data';
import { notFound, permanentRedirect } from 'next/navigation';

interface Props {
  params: Promise<{ shortSlug: string }>;
}

export async function generateStaticParams() {
  return artEvents
    .map(event => getShortEventSlug(event.dateISO))
    .filter((slug): slug is string => Boolean(slug))
    .map(shortSlug => ({ shortSlug }));
}

export default async function ShortEventRedirectPage({ params }: Props) {
  const { shortSlug } = await params;
  const eventId = getEventIdFromShortSlug(shortSlug);

  if (!eventId) notFound();

  permanentRedirect(`/art-experiences/events/${eventId}`);
}
