import LocalizedStructuredData from './LocalizedStructuredData';
import { canonicalUrl, generateBreadcrumbSchema, generateServiceSchema } from '@/lib/seo';
import { localizedPath, type Locale } from '@/i18n/routing';

const services = {
  pets: {
    en: { name: 'Pet Photography in Vancouver', description: 'Pet portrait photography by Camila Londoño in Vancouver, BC.' },
    es: { name: 'Fotografía de mascotas en Vancouver', description: 'Retratos de mascotas con Camila Londoño en Vancouver, BC.' },
  },
  headshots: {
    en: { name: 'Professional Headshots in Vancouver', description: 'Professional portrait and headshot photography by Camila Londoño in Vancouver, BC.' },
    es: { name: 'Retratos profesionales en Vancouver', description: 'Retratos profesionales con Camila Londoño en Vancouver, BC.' },
  },
  'family-maternity': {
    en: { name: 'Family & Maternity Photography in Vancouver', description: 'Family, maternity and baby photography by Camila Londoño in Vancouver, BC.' },
    es: { name: 'Fotografía familiar y de maternidad en Vancouver', description: 'Fotografía familiar, de maternidad y de bebés con Camila Londoño en Vancouver, BC.' },
  },
};

export default function PhotographyStructuredData({ service }: { service: keyof typeof services }) {
  const schemas = (locale: Locale) => {
    const text = services[service][locale];
    const path = localizedPath(`/photography/${service}/`, locale);
    return [
      {
        ...generateServiceSchema({ ...text, type: text.name }),
        '@id': `${canonicalUrl(path)}#service`,
        url: canonicalUrl(path),
      },
      generateBreadcrumbSchema([
        { name: locale === 'es' ? 'Inicio' : 'Home', path: localizedPath('/', locale) },
        { name: text.name, path },
      ]),
    ];
  };
  return <LocalizedStructuredData en={schemas('en')} es={schemas('es')} />;
}
