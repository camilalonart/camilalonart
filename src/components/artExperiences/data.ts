export interface ArtEvent {
  id: string;
  type: 'myEvents' | 'youAndIPaint';
  title: { en: string; es: string };
  description: { en: string; es: string };
  date: string;
  dateISO: string;
  time: string;
  venue: string;
  address: string;
  city: string;
  price: number | 'free';
  currency: string;
  spotsTotal?: number;
  spotsLeft?: number;
  image: string;
  posterVertical?: string;
  eventbriteUrl?: string;
  flockUrl?: string;
  tags: string[];
  featured?: boolean;
  ticketsAvailable?: boolean;
  artistPortfolioUrl?: string;
  instagramHandles?: string[];
}

export const FLOCK_COMMUNITY_URL = 'https://flocksocial.app/flocks/ccb976d0-fadd-47e2-9365-2b90778dfe63';
export const YOU_AND_I_PAINT_URL = 'https://youandipaint.com';

export const artEvents: ArtEvent[] = [
  {
    id: 'paint-sip-afternoon-june-13-2026',
    type: 'myEvents',
    title: {
      en: 'Paint & Sip Afternoon',
      es: 'Tarde de Pintura y Sip',
    },
    description: {
      en: "Join us for a cozy afternoon of painting, conversation, and creativity in a beautiful café setting at Funk Coffee Bar. Guided by artist Camilalonart, this beginner-friendly paint & sip experience is designed for anyone who wants to slow down, create, and enjoy a relaxed creative gathering. We'll paint together step by step while enjoying drinks, music, and a warm atmosphere. No experience needed... all materials are included.",
      es: 'Únete a una tarde acogedora de pintura, conversación y creatividad en el hermoso ambiente de Funk Coffee Bar. Guiado por la artista Camilalonart, esta experiencia de pintura y sip apta para principiantes está diseñada para cualquiera que quiera desacelerar, crear y disfrutar de una reunión creativa relajada. Pintaremos juntos paso a paso mientras disfrutamos de bebidas, música y una atmósfera cálida. No se necesita experiencia — todos los materiales están incluidos.',
    },
    date: 'Saturday, June 13, 2026',
    dateISO: '2026-06-13',
    time: '2:00 PM',
    venue: 'FUNK Coffee Bar',
    address: '1025 Dunsmuir St',
    city: 'Vancouver, BC',
    price: 30,
    currency: 'CAD',
    image: '/images/artExperiences/CreativeCorner/Events/Paint&Sip23June20262PM/EventPoster_Horizontal.webp',
    posterVertical: '/images/artExperiences/CreativeCorner/Events/Paint&Sip23June20262PM/EventPoster_Vertical.webp',
    flockUrl: FLOCK_COMMUNITY_URL,
    eventbriteUrl: 'https://www.eventbrite.ca/e/painting-class-with-artist-camilalonart-tickets-1989845854516',
    tags: ['paint & sip', 'beginner-friendly', 'social', 'coffee bar'],
    featured: false,
    artistPortfolioUrl: '/art',
    instagramHandles: ['@camilalonart', '@camilonart'],
  },
];
