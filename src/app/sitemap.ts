import type { MetadataRoute } from 'next';
import data from '@/data/artPortfolio';
import { artEvents } from '@/components/artExperiences/data';
import { canonicalUrl } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  // Keep this list limited to published pages, not redirects or unfinished portfolios.
  const paths = [
    '/',
    '/art/',
    '/art/about/',
    '/art/collections/',
    '/art/all-paintings/',
    '/art/early-first-paintings/',
    '/art/collaborations/',
    '/art/contact/',
    '/art-experiences/',
    '/art-experiences/events/',
    '/art-experiences/you-and-i-gallery/',
    '/photography/wedding-couples/',
    '/photography/wedding-couples/gallery/',
    '/photography/pets/',
    '/photography/pets/gallery/',
    '/photography/family-maternity/',
    '/photography/family-maternity/gallery/',
    '/photography/headshots/',
    '/photography/headshots/gallery/',
    '/my-art/wildlife-photography/',
    '/my-art/wildlife-photography/gallery/',
    '/creative-services/graphic-recording/',
    '/creative-services/art-classes/',
    '/creative-services/ux-ui-design/',
  ];
  const allCollections = [...data.collections, ...data.earlyFirstPaintings];
  // Route resolution uses the first matching collection ID.
  const collections = allCollections.filter((collection, index) =>
    allCollections.findIndex(item => item.id === collection.id) === index
  );
  for (const collection of collections) {
    paths.push(`/art/${collection.id}/`);
    for (const painting of collection.paintings) {
      paths.push(`/art/${collection.id}/${painting.id}/`);
    }
  }
  for (const event of artEvents) {
    paths.push(`/art-experiences/events/${event.id}/`);
  }
  return Array.from(new Set(paths), path => ({ url: canonicalUrl(path) }));
}
