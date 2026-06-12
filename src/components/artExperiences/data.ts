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
    id: 'art-in-the-park-aug-23-2026',
    type: 'myEvents',
    title: {
      en: 'Art in the Park',
      es: 'Arte en el Parque',
    },
    description: {
      en: "Join us for an outdoor painting experience surrounded by nature and fresh air at beautiful Vanier Park. Guided by artist Camilalonart, this beginner-friendly session invites you to slow down, breathe in the view, and create something you'll cherish. No experience needed... all materials are included. Bring a friend, bring your curiosity, and let the park inspire your canvas.",
      es: 'Únete a una experiencia de pintura al aire libre rodeada de naturaleza en el hermoso Vanier Park. Guiada por la artista Camilalonart, esta sesión apta para principiantes te invita a desacelerar, respirar el paisaje y crear algo que atesorarás. No se necesita experiencia — todos los materiales están incluidos. Trae a un amigo, trae tu curiosidad, y deja que el parque inspire tu lienzo.',
    },
    date: 'Sunday, August 23, 2026',
    dateISO: '2026-08-23',
    time: '3:00 PM',
    venue: 'Vanier Park',
    address: '1000 Chestnut St',
    city: 'Vancouver, BC',
    price: 15,
    currency: 'CAD',
    image: '/images/artExperiences/CreativeCorner/Events/Paint&Sip23aug20263PM/EventPoster_Horizontal.webp',
    posterVertical: '/images/artExperiences/CreativeCorner/Events/Paint&Sip23aug20263PM/EventPoster_Vertical.webp',
    eventbriteUrl: 'https://www.eventbrite.ca/e/art-in-the-park-tickets-1991750652819',
    flockUrl: 'https://flocksocial.app/e/art-in-the-park-f3b597',
    tags: ['art in the park', 'outdoor', 'beginner-friendly', 'social'],
    featured: false,
    artistPortfolioUrl: '/art',
    instagramHandles: ['@camilalonart', '@camilonart'],
  },
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
    price: 15,
    currency: 'CAD',
    spotsTotal: 27,
    spotsLeft: 0,
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

const MONTHS_EN_SHORT = [
  'jan', 'feb', 'mar', 'apr', 'may', 'jun',
  'jul', 'aug', 'sep', 'oct', 'nov', 'dec',
];

const MONTHS_EN_FULL = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
];

export function getShortEventSlug(dateISO: string) {
  const [year, month, day] = dateISO.split('-');
  const monthIndex = Number(month) - 1;

  if (!year || !month || !day || monthIndex < 0 || monthIndex > 11) {
    return null;
  }

  const monthName = MONTHS_EN_SHORT[monthIndex];
  const normalizedDay = String(Number(day));

  if (!monthName || Number.isNaN(Number(normalizedDay))) {
    return null;
  }

  return `paint-${monthName}-${normalizedDay}-${year}`;
}

export function getAllShortEventSlugs(dateISO: string): string[] {
  const [year, month, day] = dateISO.split('-');
  const monthIndex = Number(month) - 1;

  if (!year || !month || !day || monthIndex < 0 || monthIndex > 11) {
    return [];
  }

  const short = MONTHS_EN_SHORT[monthIndex];
  const full = MONTHS_EN_FULL[monthIndex];
  const normalizedDay = String(Number(day));

  if (!short || !full || Number.isNaN(Number(normalizedDay))) {
    return [];
  }

  const slugs = [`paint-${short}-${normalizedDay}-${year}`];
  if (short !== full) {
    slugs.push(`paint-${full}-${normalizedDay}-${year}`);
  }
  return slugs;
}

export function getEventIdFromShortSlug(shortSlug: string) {
  const event = artEvents.find(e => getAllShortEventSlugs(e.dateISO).includes(shortSlug));
  return event?.id;
}
