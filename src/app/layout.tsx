import React from 'react';
import { Montserrat, Cormorant_Garamond, Poppins } from 'next/font/google';
import localFont from 'next/font/local';
import StyledComponentsRegistry from '../lib/registry';
import RootLayoutClient from '../components/RootLayoutClient';
import { TranslationProvider } from '../i18n/TranslationContext';
import { baseMetadata, generateLocalBusinessSchema, generatePhotographerSchema } from '../lib/seo';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const railey = localFont({
  src: '../../public/fonts/Railey.woff2',
  variable: '--font-railey',
  display: 'swap',
});

// Use the comprehensive SEO metadata
export const metadata = baseMetadata;

const navigation = [
  {
    title: 'Photography Services',
    href: '/photography',
    items: [
      { title: 'Professional Headshots', href: '/photography/headshots' },
      { title: 'Pet Photography', href: '/photography/pets' },
      { title: 'Wedding & Couples', href: '/photography/wedding-couples' },
      { title: 'Family & Maternity', href: '/photography/family-maternity' }
    ]
  },
  {
    title: 'My Art',
    href: '/my-art',
    items: [
      { title: 'Digital Art', href: '/my-art/digital-art' },
      { title: 'Traditional Art', href: '/my-art/traditional-art' },
      { title: 'Wildlife Photography', href: '/my-art/wildlife-photography' },
      { title: 'Everyday Photography', href: '/my-art/everyday-photography' },
      { title: 'Blog', href: '/my-art/blog' }
    ]
  },
  {
    title: 'Creative Services',
    href: '/creative-services',
    items: [
      { title: 'Brand Identity', href: '/creative-services/brand-identity' },
      { title: 'Graphic Recording', href: '/creative-services/graphic-recording' },
      { title: 'UX/UI Design', href: '/creative-services/ux-ui-design' },
      { title: 'Art Classes', href: '/creative-services/art-classes' }
    ]
  },
  {
    title: 'Tech',
    href: '/tech',
    items: [
      { title: 'Software Engineering', href: '/tech/engineering' },
      { title: 'Tech Courses', href: '/tech/courses' }
    ]
  }
];

// Generate structured data for the business
const localBusinessSchema = generateLocalBusinessSchema();
const photographerSchema = generatePhotographerSchema();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${cormorant.variable} ${poppins.variable} ${railey.variable}`}>
      <head>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(photographerSchema) }}
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <TranslationProvider>
            <RootLayoutClient>
              {children}
            </RootLayoutClient>
          </TranslationProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
} 