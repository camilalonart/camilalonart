import PhotographyDirectory from '@/components/photography/PhotographyDirectory';
import { isExperienceEnabled } from '@/config/experienceRollout';
import { photographyDirectoryHero, photographyDirectoryCopy, photographyDirectoryServices } from '@/data/photographyDirectory';
import { canonicalUrl, generateBreadcrumbSchema, generateMetadata } from '@/lib/seo';
import LocalizedStructuredData from '@/components/LocalizedStructuredData';
import { localizedPath, type Locale } from '@/i18n/routing';

export const metadata = generateMetadata({
  title: 'Photography in Vancouver — Weddings, Pets, Family & Headshots',
  description: 'Explore wedding and couples photography, pet portraits, family and maternity sessions, and professional headshots with Camila Londoño in Vancouver, BC.',
  path: '/photography',
  images: [{ url: photographyDirectoryHero, alt: 'Wedding photography by Camila Londoño' }],
  noIndex: !isExperienceEnabled('photographyDiscovery'),
});

export default function PhotographyPage() {
  const schemas = (locale: Locale) => {
    const copy = photographyDirectoryCopy[locale];
    return [
      generateBreadcrumbSchema([
        { name: copy.home, path: localizedPath('/', locale) },
        { name: copy.servicesLabel, path: localizedPath('/photography/', locale) },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: copy.servicesLabel,
        url: canonicalUrl(localizedPath('/photography/', locale)),
        inLanguage: locale,
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: photographyDirectoryServices.map((service, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: copy.services[service.id].title,
            url: canonicalUrl(localizedPath(`/photography/${service.id}/`, locale)),
          })),
        },
      },
    ];
  };
  return (
    <>
      {isExperienceEnabled('photographyDiscovery') && <LocalizedStructuredData en={schemas('en')} es={schemas('es')} />}
      <PhotographyDirectory />
    </>
  );
}
