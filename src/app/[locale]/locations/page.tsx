import { useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Link } from '@/i18n/routing';
import { LOCATIONS_SERVED, CITY_METADATA, SITE_CONFIG } from '@/lib/constants';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const isEn = locale === 'en';

  return {
    title: isEn
      ? `All Service Locations | Montreal Concierge Services`
      : `Toutes nos Locations | Conciergerie Montreal`,
    description: isEn
      ? `Professional concierge services across 27 locations in Montreal and the South Shore. Find our services in your city.`
      : `Services de conciergerie professionnels dans 27 villes à Montréal et sur la Rive-Sud. Trouvez nos services dans votre ville.`,
    keywords: 'concierge services locations, south shore montreal, commercial cleaning',
  };
}

export default function LocationsPage({ params: { locale } }: Props) {
  const isEn = locale === 'en';

  // Organize locations by region
  const regions = {
    westIsland: ['Île-des-Sœurs', 'Verdun'],
    longueuil: ['Longueuil', 'Greenfield Park', 'Saint-Hubert', 'Vieux-Longueuil'],
    westSouthShore: ['La Prairie', 'Saint-Constant', 'Saint-Philippe', 'Delson', 'Candiac', 'Châteauguay'],
    eastSouthShore: ['Saint-Lambert', 'Brossard', 'Sainte-Catherine', 'Saint-Jean-sur-Richelieu', 'Saint-Isidore', 'Carignan', 'Beloeil'],
    monteregie: ['Boucherville', 'Saint-Bruno-de-Montarville', 'Sainte-Julie', 'Saint-Basile-le-Grand', 'Varennes', 'Chambly', 'McMasterville'],
    laurentians: ['Repentigny', 'Terrebonne', 'Mont-Saint-Hilaire', 'Otterburn Park'],
  };

  const regionLabels: Record<keyof typeof regions, { en: string; fr: string }> = {
    westIsland: { en: 'West Island', fr: 'Île de Montréal (Ouest)' },
    longueuil: { en: 'Longueuil Area', fr: 'Région de Longueuil' },
    westSouthShore: { en: 'South Shore West', fr: 'Rive-Sud (Ouest)' },
    eastSouthShore: { en: 'South Shore East', fr: 'Rive-Sud (Est)' },
    monteregie: { en: 'Montérégie Region', fr: 'Région de Montérégie' },
    laurentians: { en: 'Laurentian Region', fr: 'Région de Laurentians' },
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <div className="section-container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              {isEn ? 'Service Locations' : 'Nos Emplacements'}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {isEn
                ? `Professional concierge services across 27 cities in Montreal and the South Shore. Find your location and learn how we can help your business.`
                : `Services de conciergerie professionnels dans 27 villes à Montréal et sur la Rive-Sud. Trouvez votre ville et découvrez comment nous pouvons aider votre entreprise.`}
            </p>
          </div>
        </section>

        {/* Locations by Region */}
        <section className="py-12 md:py-20 bg-white">
          <div className="section-container">
            {(Object.entries(regions) as Array<[keyof typeof regions, string[]]>).map(
              ([regionKey, cities]) => (
                <div key={regionKey} className="mb-16 last:mb-0">
                  <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 pb-4 border-b-2 border-blue-600">
                    {regionLabels[regionKey][isEn ? 'en' : 'fr']}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cities.map((city) => {
                      const metadata = CITY_METADATA[city as keyof typeof CITY_METADATA];
                      if (!metadata) return null;

                      return (
                        <Link
                          key={city}
                          href={`/locations/${metadata.slug}` as any}
                          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-8 text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                        >
                          {/* Background decoration */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                          {/* Content */}
                          <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-2">{city}</h3>
                            <p className="text-blue-100 text-sm leading-relaxed line-clamp-2">
                              {isEn ? metadata.description_en : metadata.description_fr}
                            </p>

                            {/* Arrow indicator */}
                            <div className="mt-4 flex items-center gap-2 text-blue-200 group-hover:translate-x-2 transition-transform">
                              <span className="text-sm font-semibold">
                                {isEn ? 'Learn More' : 'En Savoir Plus'}
                              </span>
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>

                          {/* Hover effect - colored overlay based on position */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* Service Coverage CTA */}
        <section className="py-12 md:py-20 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="section-container text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {isEn ? "Don't See Your Location?" : 'Vous ne voyez pas votre emplacement?'}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {isEn
                ? 'We may be able to serve your area or expand our service. Contact us to discuss your specific needs.'
                : 'Nous pourrions être en mesure de servir votre région ou d\'élargir nos services. Contactez-nous pour discuter de vos besoins spécifiques.'}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-blue-600 bg-white hover:bg-blue-50 transition-colors shadow-lg"
            >
              {isEn ? 'Contact Us' : 'Nous Contacter'}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
