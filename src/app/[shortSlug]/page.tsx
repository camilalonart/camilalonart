import { getEventIdFromShortSlug, getAllShortEventSlugs, artEvents } from '@/components/artExperiences/data';
import ShortEventRedirectClient from '@/components/artExperiences/ShortEventRedirectClient';

interface Props {
  params: Promise<{ shortSlug: string }>;
}

export async function generateStaticParams() {
  return artEvents.flatMap(event => getAllShortEventSlugs(event.dateISO)).map(shortSlug => ({ shortSlug }));
}

export default async function ShortEventRedirectPage({ params }: Props) {
  const { shortSlug } = await params;
  const eventId = getEventIdFromShortSlug(shortSlug);
  const destination = eventId
    ? `/art-experiences/events/${eventId}`
    : '/art-experiences/events';

  return <ShortEventRedirectClient destination={destination} />;
}
