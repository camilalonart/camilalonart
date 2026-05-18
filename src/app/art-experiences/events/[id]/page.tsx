import { artEvents } from '@/components/artExperiences/data';
import EventDetailPage from '@/components/artExperiences/EventDetailPage';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return artEvents.map(e => ({ id: e.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const event = artEvents.find(e => e.id === id);
  if (!event) return { title: 'Event Not Found' };
  return {
    title: `${event.title.en} — Camila Londoño`,
    description: event.description.en.slice(0, 160),
  };
}

export default async function EventPage({ params }: Props) {
  const { id } = await params;
  const event = artEvents.find(e => e.id === id);
  if (!event) notFound();
  return <EventDetailPage event={event} />;
}
