import { artEvents } from '@/components/artExperiences/data';
import { generateMetadata as buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const event = artEvents.find(item => item.id === params.id);
  if (!event) return { title: 'Event not found', robots: { index: false } };
  return buildMetadata({
    title: `${event.title.en} — ${event.date}`,
    description: event.description.en.slice(0, 160),
    path: `/art-experiences/events/${event.id}/`,
    images: [{ url: event.image, alt: event.title.en }],
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
