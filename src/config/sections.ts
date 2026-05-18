export interface Section {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
  category: 'photography' | 'art' | 'services' | 'other';
}

export const visibleSections: Section[] = [
  {
    id: 'art-experiences',
    title: 'Art Experiences',
    description: 'Paint & sip events, creative community & art instruction in Vancouver.',
    href: '/art-experiences',
    icon: '🖌️',
    category: 'art',
  },
  {
    id: 'art',
    title: 'Art',
    description: 'Oil paintings and artistic collections',
    href: '/art',
    icon: '🎨',
    category: 'art',
  },
  {
    id: 'wedding',
    title: 'Wedding & Couples Photography',
    description: 'Elopements, engagements, and love stories',
    href: '/photography/wedding-couples',
    icon: '💍',
    category: 'photography',
  },
  {
    id: 'pets',
    title: 'Pet Photography',
    description: 'Capture your furry friends\' personality',
    href: '/photography/pets',
    icon: '🐾',
    category: 'photography',
  },
  {
    id: 'family',
    title: 'Family & Maternity Photography',
    description: 'Precious moments with those you love',
    href: '/photography/family-maternity',
    icon: '👨‍👩‍👧‍👦',
    category: 'photography',
  },
  {
    id: 'wildlife',
    title: 'Wildlife Photography',
    description: 'Nature and animals in their element',
    href: '/my-art/wildlife-photography',
    icon: '🦁',
    category: 'photography',
  },
  {
    id: 'ux-ui',
    title: 'UX/UI Design',
    description: 'User experience and interface design',
    href: '/creative-services/ux-ui-design',
    icon: '💻',
    category: 'services',
  },
  {
    id: 'headshots',
    title: 'Professional Headshots',
    description: 'Sharp, polished professional portraits',
    href: '/photography/headshots',
    icon: '📸',
    category: 'photography',
  },
];

export const hiddenSections: Section[] = [
  {
    id: 'brand-identity',
    title: 'Brand Identity',
    description: 'Logo design and brand guidelines',
    href: '/creative-services/brand-identity',
    icon: '✨',
    category: 'services',
  },
  {
    id: 'graphic-recording',
    title: 'Graphic Recording',
    description: 'Visual storytelling and events',
    href: '/creative-services/graphic-recording',
    icon: '📝',
    category: 'services',
  },
  {
    id: 'tech',
    title: 'Tech & Engineering',
    description: 'Software development and courses',
    href: '/tech/engineering',
    icon: '⚙️',
    category: 'other',
  },
];
