import fs from 'fs';
import path from 'path';
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

function getEventPhotos(eventImagePath: string): string[] {
  const eventDir = path.dirname(eventImagePath);
  const photosDir = path.join(process.cwd(), 'public', eventDir, 'photos');

  if (!fs.existsSync(photosDir)) return [];

  return fs
    .readdirSync(photosDir)
    .filter(f => /\.(webp|jpg|jpeg|png)$/i.test(f))
    .sort()
    .map(f => `${eventDir}/photos/${f}`);
}

export default async function EventPage({ params }: Props) {
  const { id } = await params;
  const event = artEvents.find(e => e.id === id);
  if (!event) notFound();

  const eventPhotos = getEventPhotos(event.image);

  return <EventDetailPage event={event} eventPhotos={eventPhotos} />;
}
