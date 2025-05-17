import React from 'react';
import { Montserrat, Cormorant_Garamond } from 'next/font/google';
import StyledComponentsRegistry from '../lib/registry';
import { GlobalStyles } from '../styles/globalStyles';
import Navigation from '../components/Navigation';
import ThemeProvider from '../components/ThemeProvider';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
});

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

export const metadata = {
  title: 'Camilalonart - Photography & Creative Services',
  description: 'Professional photography services including weddings, elopements, portraits, wildlife, and creative services including graphic recording, illustrations, and UX/UI design.',
  keywords: 'photography, wedding photography, elopement, portraits, wildlife photography, graphic recording, illustrations, UX/UI design',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${cormorant.variable}`}>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <GlobalStyles />
            <Navigation />
            <main style={{ paddingTop: '80px' }}>
              {children}
            </main>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
} 