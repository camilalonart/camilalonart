import type { Metadata } from 'next';
import { cache } from 'react';
import data, { localizedDescription, localizedMaterials } from '@/data/artPortfolio';
import { artEvents, localizedEventDate } from '@/components/artExperiences/data';
import { baseMetadata, canonicalUrl, SITE_CONFIG } from '@/lib/seo';
import { localizedPath, routeKey, type Locale } from './routing';
import { spanishSeo } from './seo-es';
import { routeSources } from './route-sources.generated';
import type { MetadataCatalog, PageMetadataText } from './metadata-types';

function titleText(metadata: Metadata): string {
  const title = metadata.title;
  return typeof title === 'string' ? title : title && 'absolute' in title ? title.absolute : title && 'default' in title ? title.default : SITE_CONFIG.name;
}

export function routePath(pattern: string, params: Record<string, string>) {
  return pattern.replace(/\[([^\]]+)\]/g, (_, key: string) => params[key]);
}

function spanishText(path: string, source: Metadata): PageMetadataText {
  const key = routeKey(path);
  if (spanishSeo[key]) return spanishSeo[key];
  const segments = key.split('/').filter(Boolean);
  if (segments[0] === 'art' && segments[1]) {
    const collection = [...data.collections, ...data.earlyFirstPaintings].find(item => item.id === segments[1]);
    const painting = collection?.paintings.find(item => item.id === segments[2]);
    if (collection && painting) {
      const materials = localizedMaterials(painting.materials, 'es');
      return {
        title: `${painting.title} — Camila Londoño`,
        description: `${painting.title}${painting.year > 0 ? `, ${painting.year}` : ''}. ${materials ? `${materials}.` : 'Obra de Camila Londoño.'}`,
      };
    }
    if (collection) {
      return { title: `${collection.name} — Camila Londoño`, description: localizedDescription(collection, 'es') || `${collection.name}, una colección de pinturas de Camila Londoño.` };
    }
  }
  if (segments[0] === 'art-experiences' && segments[1] === 'events') {
    const event = artEvents.find(item => item.id === segments[2]);
    if (event) {
      const date = localizedEventDate(event.dateISO, 'es');
      return { title: `${event.title.es} — ${date}`, description: event.description.es.slice(0, 160) };
    }
  }
  if (source.robots && typeof source.robots === 'object' && source.robots.index === false) {
    return { title: 'Evento artístico', description: 'Continúa a los detalles del evento artístico.' };
  }
  throw new Error(`Missing Spanish SEO copy for ${path}`);
}

export function localizeMetadata(source: Metadata, path: string, locale: Locale): Metadata {
  const sourceCanonical = source.alternates?.canonical;
  const canonicalPath = typeof sourceCanonical === 'string'
    ? new URL(sourceCanonical, SITE_CONFIG.url).pathname
    : path;
  const canonical = canonicalUrl(localizedPath(canonicalPath, locale));
  const text = locale === 'es' ? spanishText(path, source) : { title: titleText(source), description: source.description ?? '' };
  const title = /camilalonart|camila londoño/i.test(text.title) ? text.title : `${text.title} | ${SITE_CONFIG.name}`;
  const images = source.openGraph?.images;
  const translatedImages = locale === 'es' && Array.isArray(images)
    ? images.map(image => typeof image === 'object' && !(image instanceof URL) ? { ...image, alt: text.title } : image)
    : images;
  return {
    ...source,
    title: { absolute: title },
    description: text.description,
    alternates: {
      canonical,
      languages: {
        en: canonicalUrl(localizedPath(canonicalPath, 'en')),
        es: canonicalUrl(localizedPath(canonicalPath, 'es')),
        'x-default': canonicalUrl(localizedPath(canonicalPath, 'en')),
      },
    },
    openGraph: {
      ...baseMetadata.openGraph,
      ...source.openGraph,
      title,
      description: text.description,
      url: canonical,
      locale: locale === 'es' ? 'es_CA' : 'en_CA',
      alternateLocale: locale === 'es' ? 'en_CA' : 'es_CA',
      images: translatedImages ?? baseMetadata.openGraph?.images,
    },
    twitter: { ...baseMetadata.twitter, ...source.twitter, title, description: text.description },
  };
}

export async function metadataForRoute(pattern: string, params: Record<string, string>, locale: Locale): Promise<Metadata> {
  const source = routeSources.find(item => item.pattern === pattern);
  if (!source) throw new Error(`Unknown route pattern: ${pattern}`);
  return localizeMetadata(await source.metadata({ params }), routePath(pattern, params), locale);
}

/** Only small text pairs reach the client; artwork data and filesystem checks stay server-side. */
export const getMetadataCatalog = cache(async (): Promise<MetadataCatalog> => {
  const catalog: MetadataCatalog = {};
  for (const source of routeSources) {
    const params = source.params ? await source.params() : [{}];
    for (const values of params) {
      const path = routePath(source.pattern, values);
      const metadata = await source.metadata({ params: values });
      const english = localizeMetadata(metadata, path, 'en');
      const spanish = localizeMetadata(metadata, path, 'es');
      catalog[routeKey(path)] = {
        en: { title: titleText(english), description: english.description ?? '', canonical: String(english.alternates?.canonical ?? '') },
        es: { title: titleText(spanish), description: spanish.description ?? '', canonical: String(spanish.alternates?.canonical ?? '') },
      };
    }
  }
  return catalog;
});
