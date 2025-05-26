import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Professional Pet Photography Services | Vancouver Pet Photographer',
  description: 'Capture your pet\'s unique personality with our professional pet photography services in Vancouver. Indoor studio and outdoor sessions available. Book your session today!',
  keywords: 'pet photography, dog photography, cat photography, Vancouver pet photographer, professional pet portraits',
  openGraph: {
    type: 'website',
    url: 'https://camilalonart.com/photography/pets',
    title: 'Professional Pet Photography Services | Vancouver Pet Photographer',
    description: 'Capture your pet\'s unique personality with our professional pet photography services in Vancouver. Indoor studio and outdoor sessions available.',
    images: [
      {
        url: 'https://camilalonart.com/images/pets/A7T05223-horizontal.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional Pet Photography Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Pet Photography Services | Vancouver Pet Photographer',
    description: 'Capture your pet\'s unique personality with our professional pet photography services in Vancouver. Indoor studio and outdoor sessions available.',
    images: ['https://camilalonart.com/images/pets/A7T05223-horizontal.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
}; 