import type { Locale } from '@/i18n/routing';

export type PhotographyServiceId = 'wedding-couples' | 'pets' | 'family-maternity' | 'headshots';

interface ServiceCopy {
  title: string;
  category: string;
  description: string;
  imageAlt: string;
}

interface DirectoryCopy {
  navigation: string;
  home: string;
  allPhotography: string;
  eyebrow: string;
  title: string;
  introduction: string;
  explore: string;
  heroAlt: string;
  heroCaption: string;
  servicesLabel: string;
  servicesTitle: string;
  servicesIntro: string;
  serviceAction: string;
  galleryAction: string;
  contactTitle: string;
  contactDescription: string;
  contactAction: string;
  services: Record<PhotographyServiceId, ServiceCopy>;
}

export const photographyDirectoryCopy: Record<Locale, DirectoryCopy> = {
  en: {
    navigation: 'Photography navigation',
    home: 'Home',
    allPhotography: 'All photography',
    eyebrow: 'Camila Londoño · Vancouver, BC',
    title: 'Life, in your own light.',
    introduction: 'The people you love. The animals who are family. The moments that make you, you. Find the photography experience that feels like your story.',
    explore: 'Find your session',
    heroAlt: 'Wedding photography by Camila Londoño',
    heroCaption: 'Weddings & couples',
    servicesLabel: 'Photography services',
    servicesTitle: 'What would you like to remember?',
    servicesIntro: 'Explore the photographs, then discover the session details. Each experience has a world of its own.',
    serviceAction: 'Explore sessions',
    galleryAction: 'View gallery',
    contactTitle: 'Have something in mind?',
    contactDescription: 'Tell me what you would like to photograph and where. We can start with your idea.',
    contactAction: 'Email Camila',
    services: {
      'wedding-couples': {
        title: 'Weddings & couples',
        category: 'Your story, together',
        description: 'Wedding days, engagements and the quiet moments in between. Photography that celebrates your connection.',
        imageAlt: 'A photograph from the weddings and couples collection',
      },
      pets: {
        title: 'Pets',
        category: 'A personality all their own',
        description: 'Portraits of your furry family members, with room for their spirit, playfulness and unmistakable personality.',
        imageAlt: 'Pet portrait by Camila Londoño',
      },
      'family-maternity': {
        title: 'Family & maternity',
        category: 'The little things, forever',
        description: 'From the anticipation of a new arrival to the joy of growing together. Photographs of the people closest to you.',
        imageAlt: 'Baby photograph from the family and maternity collection',
      },
      headshots: {
        title: 'Headshots',
        category: 'Show up as yourself',
        description: 'Professional portraits with plain or creative backgrounds. Put confidence and authenticity at the heart of your professional presence.',
        imageAlt: 'Professional headshot by Camila Londoño',
      },
    },
  },
  es: {
    navigation: 'Navegación de fotografía',
    home: 'Inicio',
    allPhotography: 'Toda la fotografía',
    eyebrow: 'Camila Londoño · Vancouver, BC',
    title: 'La vida, con tu propia luz.',
    introduction: 'Las personas que amas. Los animales que son familia. Los momentos que te hacen ser tú. Encuentra la experiencia fotográfica que conecte con tu historia.',
    explore: 'Encuentra tu sesión',
    heroAlt: 'Fotografía de bodas de Camila Londoño',
    heroCaption: 'Bodas y parejas',
    servicesLabel: 'Servicios de fotografía',
    servicesTitle: '¿Qué te gustaría recordar?',
    servicesIntro: 'Explora las fotografías y descubre los detalles de cada sesión. Cada experiencia tiene su propio mundo.',
    serviceAction: 'Explorar sesiones',
    galleryAction: 'Ver galería',
    contactTitle: '¿Tienes algo en mente?',
    contactDescription: 'Cuéntame qué te gustaría fotografiar y dónde. Podemos empezar con tu idea.',
    contactAction: 'Escribir a Camila',
    services: {
      'wedding-couples': {
        title: 'Bodas y parejas',
        category: 'Su historia, juntos',
        description: 'Bodas, compromisos y los momentos tranquilos entre ellos. Fotografía que celebra su conexión.',
        imageAlt: 'Una fotografía de la colección de bodas y parejas',
      },
      pets: {
        title: 'Mascotas',
        category: 'Una personalidad única',
        description: 'Retratos de los miembros peludos de tu familia, con espacio para su energía, sus juegos y su personalidad inconfundible.',
        imageAlt: 'Retrato de una mascota por Camila Londoño',
      },
      'family-maternity': {
        title: 'Familia y maternidad',
        category: 'Lo pequeño, para siempre',
        description: 'Desde la ilusión por una nueva llegada hasta la alegría de crecer juntos. Fotografías de las personas más cercanas a ti.',
        imageAlt: 'Fotografía de un bebé de la colección de familia y maternidad',
      },
      headshots: {
        title: 'Retratos profesionales',
        category: 'Muéstrate tal como eres',
        description: 'Retratos profesionales con fondos neutros o creativos. La confianza y la autenticidad como protagonistas de tu imagen profesional.',
        imageAlt: 'Retrato profesional por Camila Londoño',
      },
    },
  },
};

export interface PhotographyDirectoryService {
  id: PhotographyServiceId;
  image: string;
  imagePosition: string;
  background: string;
  accent: string;
  font: string;
}

export const photographyDirectoryServices: readonly PhotographyDirectoryService[] = [
  {
    id: 'wedding-couples',
    image: '/images/wedding/A7T00021.webp',
    imagePosition: 'center',
    background: '#F5ECE6',
    accent: '#663744',
    font: 'var(--font-cormorant), serif',
  },
  {
    id: 'pets',
    image: '/images/pets/A7T05223-horizontal.webp',
    imagePosition: 'center',
    background: '#F6EADD',
    accent: '#914C32',
    font: 'var(--font-poppins), sans-serif',
  },
  {
    id: 'family-maternity',
    image: '/images/family/baby/A7T03164.webp',
    imagePosition: 'center',
    background: '#EEF0E7',
    accent: '#45573E',
    font: 'var(--font-cormorant), serif',
  },
  {
    id: 'headshots',
    image: '/images/headshots/A7T01707.webp',
    imagePosition: 'center 25%',
    background: '#F0F0EE',
    accent: '#292D31',
    font: 'var(--font-montserrat), sans-serif',
  },
];

export const photographyDirectoryHero = '/images/wedding/A7T09955-2.webp';
