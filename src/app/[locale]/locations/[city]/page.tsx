import { useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { LocationPage } from '@/components/LocationPage';
import { CITY_METADATA, LOCATIONS_SERVED, SITE_CONFIG } from '@/lib/constants';

type Props = {
  params: { locale: string; city: string };
};

// Generate static params for all 27 cities
export async function generateStaticParams() {
  return LOCATIONS_SERVED.map((city) => ({
    locale: 'en',
    city: CITY_METADATA[city as keyof typeof CITY_METADATA]?.slug || city.toLowerCase().replace(/\s+/g, '-'),
  })).concat(
    LOCATIONS_SERVED.map((city) => ({
      locale: 'fr',
      city: CITY_METADATA[city as keyof typeof CITY_METADATA]?.slug || city.toLowerCase().replace(/\s+/g, '-'),
    }))
  );
}

// Resolve city slug to full city name
function getCityFromSlug(slug: string): string | null {
  const city = Object.entries(CITY_METADATA).find(([_, metadata]) => metadata.slug === slug)?.[0];
  return city || null;
}

export async function generateMetadata({ params: { locale, city: citySlug } }: Props): Promise<Metadata> {
  const city = getCityFromSlug(citySlug);
  if (!city) {
    return {
      title: 'Location Not Found',
      description: 'This location is not available.',
    };
  }

  const metadata = CITY_METADATA[city as keyof typeof CITY_METADATA];
  const isEn = locale === 'en';

  return {
    title: isEn
      ? `Professional Concierge Services in ${city} | Montreal Concierge`
      : `Services de Conciergerie à ${city} | Conciergerie Montreal`,
    description: isEn ? metadata.description_en : metadata.description_fr,
    openGraph: {
      title: isEn
        ? `Concierge Services in ${city}`
        : `Services de Conciergerie à ${city}`,
      description: isEn ? metadata.description_en : metadata.description_fr,
      type: 'website',
    },
    keywords: metadata.keywords.join(', '),
  };
}

export default function CityLocationPage({ params: { locale, city: citySlug } }: Props) {
  const city = getCityFromSlug(citySlug);

  if (!city) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Location Not Found</h1>
            <p className="text-gray-600 mb-8">The location you're looking for doesn't exist.</p>
            <a href={`/${locale}`} className="text-blue-600 hover:underline font-semibold">
              Return to Home
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const metadata = CITY_METADATA[city as keyof typeof CITY_METADATA];

  // Breadcrumb schema markup
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'en' ? 'Home' : 'Accueil',
        item: `${SITE_CONFIG.url}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: locale === 'en' ? 'Locations' : 'Emplacements',
        item: `${SITE_CONFIG.url}/${locale}/locations`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: city,
        item: `${SITE_CONFIG.url}/${locale}/locations/${metadata.slug}`,
      },
    ],
  };

  return (
    <>
      <Header />
      <main>
        {/* Breadcrumb Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <LocationPage city={city} locale={locale} />

        {/* SEO Content Section - Hidden but indexed */}
        <div className="hidden">
          <h1>
            {locale === 'en'
              ? `Professional Concierge Services in ${city}, South Shore, Montreal`
              : `Services de Conciergerie Professionnels à ${city}, Rive-Sud, Montréal`
            }
          </h1>
          <p>
            {locale === 'en'
              ? `Discover professional concierge and commercial cleaning services in ${city}. We offer comprehensive facility management, property support, and concierge solutions for businesses and property owners throughout the South Shore and Montreal area.`
              : `Découvrez les services de conciergerie professionnels et de nettoyage commercial à ${city}. Nous offrons une gestion complète des installations et des solutions de conciergerie pour les entreprises et les propriétaires immobiliers.`
            }
          </p>

          {/* Local Keywords for SEO */}
          <ul>
            {[
              `concierge services ${city}`,
              `commercial cleaning ${city}`,
              `property management ${city}`,
              `airbnb concierge ${city}`,
              `building maintenance ${city}`,
              `office cleaning ${city}`,
              `janitorial services ${city}`,
              `day porter ${city}`,
            ].map((keyword) => (
              <li key={keyword}>{keyword}</li>
            ))}
          </ul>

          {/* French Keywords */}
          {locale === 'fr' && (
            <ul>
              {[
                `conciergerie ${city}`,
                `nettoyage commercial ${city}`,
                `gestion de propriété ${city}`,
                `services de conciergerie ${city}`,
                `entretien immeuble ${city}`,
                `nettoyage de bureaux ${city}`,
              ].map((keyword) => (
                <li key={keyword}>{keyword}</li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
