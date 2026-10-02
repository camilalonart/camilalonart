import React from 'react';
import { Montserrat, Cormorant_Garamond, Poppins } from 'next/font/google';
import localFont from 'next/font/local';
import StyledComponentsRegistry from '@/lib/registry';
import RootLayoutClient from './RootLayoutClient';
import { TranslationProvider } from '@/i18n/TranslationContext';
import { generateLocalBusinessSchema, generatePhotographerSchema } from '@/lib/seo';
import { getMetadataCatalog } from '@/i18n/route-metadata';
import type { Locale } from '@/i18n/routing';
import LocalizedStructuredData from './LocalizedStructuredData';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-montserrat', display: 'swap' });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-cormorant', display: 'swap' });
const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-poppins', display: 'swap', preload: false });
const railey = localFont({ src: '../../public/fonts/Railey.woff2', variable: '--font-railey', display: 'swap', preload: false });

export default async function LocaleDocument({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  const metadataCatalog = await getMetadataCatalog();
  return (
    <html lang={locale} className={`${montserrat.variable} ${cormorant.variable} ${poppins.variable} ${railey.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <TranslationProvider initialLocale={locale} metadataCatalog={metadataCatalog}>
            <LocalizedStructuredData
              en={[generateLocalBusinessSchema('en'), generatePhotographerSchema('en')]}
              es={[generateLocalBusinessSchema('es'), generatePhotographerSchema('es')]}
            />
            <RootLayoutClient>{children}</RootLayoutClient>
          </TranslationProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
