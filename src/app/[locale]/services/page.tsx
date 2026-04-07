import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTASection from '@/components/sections/CTASection';
import { SERVICES_DATA } from '@/lib/services-data';
import { SITE_CONFIG } from '@/lib/constants';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const isEn = locale === 'en';
  return {
    title: isEn
      ? 'Concierge Services Montreal South Shore | Commercial Cleaning, Airbnb, Property'
      : 'Services de Conciergerie Rive-Sud Montréal | Nettoyage, Airbnb, Propriété',
    description: isEn
      ? 'Complete concierge services in Montreal South Shore: commercial cleaning, Airbnb management, property monitoring, business concierge, and day porter services. Free quote in 60 minutes.'
      : 'Services de conciergerie complets sur la Rive-Sud de Montréal : nettoyage commercial, gestion Airbnb, surveillance immobilière, conciergerie d\'entreprise et conciergerie de jour. Soumission gratuite en 60 minutes.',
    alternates: {
      canonical: `/${locale}/services`,
      languages: { en: '/en/services', fr: '/fr/services' },
    },
    openGraph: {
      title: isEn ? 'Concierge Services — Montreal South Shore' : 'Services de Conciergerie — Rive-Sud Montréal',
      description: isEn
        ? '5 complete service categories for businesses, property owners, and Airbnb hosts.'
        : '5 catégories de services complets pour entreprises, propriétaires et hôtes Airbnb.',
      url: `${SITE_CONFIG.url}/${locale}/services`,
      siteName: SITE_CONFIG.name,
      locale: locale === 'fr' ? 'fr_CA' : 'en_CA',
      type: 'website',
    },
  };
}

export default async function ServicesPage({ params: { locale } }: Props) {
  const isEn = locale === 'en';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    provider: {
      '@type': 'LocalBusiness',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      telephone: SITE_CONFIG.phone,
    },
    areaServed: { '@type': 'Place', name: 'Montreal South Shore' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: isEn ? 'Concierge Services' : 'Services de Conciergerie',
      itemListElement: SERVICES_DATA.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: isEn ? s.en.title : s.fr.title,
          description: isEn ? s.en.intro.slice(0, 150) : s.fr.intro.slice(0, 150),
        },
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-16 md:py-20">
          <div className="section-container text-center">
            <span className="inline-block bg-accent-400/20 border border-accent-400/40 text-accent-300 text-sm font-semibold rounded-full px-4 py-1.5 mb-4">
              {isEn ? 'Professional Concierge Services' : 'Services de Conciergerie Professionnels'}
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              {isEn ? 'Our Concierge Services' : 'Nos Services de Conciergerie'}
            </h1>
            <p className="text-primary-200 text-xl max-w-2xl mx-auto mb-8">
              {isEn
                ? 'Complete concierge solutions for businesses, property owners, and Airbnb hosts across Montreal\'s South Shore.'
                : 'Solutions de conciergerie complètes pour les entreprises, propriétaires et hôtes Airbnb sur toute la Rive-Sud de Montréal.'}
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-accent-400 hover:bg-accent-500 text-primary-900 font-bold px-8 py-3 rounded-lg transition-all">
              {isEn ? 'Get a Free Quote' : 'Obtenir une Soumission Gratuite'}
            </Link>
          </div>
        </section>

        {/* Services grid */}
        <section className="section-padding bg-neutral-50">
          <div className="section-container">
            <div className="grid gap-8">
              {SERVICES_DATA.map((service, idx) => {
                const data = isEn ? service.en : service.fr;
                const slug = isEn ? service.slug_en : service.slug_fr;
                const isEven = idx % 2 === 0;

                return (
                  <div
                    key={service.id}
                    className={`bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden grid md:grid-cols-2 gap-0`}
                  >
                    {/* Content */}
                    <div className={`p-8 md:p-10 flex flex-col justify-center ${isEven ? '' : 'md:order-2'}`}>
                      <div className={`w-14 h-14 ${service.bg} rounded-xl flex items-center justify-center mb-5`}>
                        <span className="text-3xl">{service.icon}</span>
                      </div>
                      <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-900 mb-3">
                        {data.title}
                      </h2>
                      <p className="text-neutral-600 leading-relaxed mb-6">
                        {data.intro.slice(0, 200)}...
                      </p>

                      {/* Key features preview */}
                      <ul className="space-y-2 mb-8">
                        {data.features.slice(0, 3).map((f) => (
                          <li key={f.title} className="flex items-center gap-2 text-sm text-neutral-700">
                            <span className="w-5 h-5 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                            {f.title}
                          </li>
                        ))}
                      </ul>

                      <Link
                        href={`/services/${slug}` as any}
                        className="btn-primary self-start"
                      >
                        {isEn ? 'Learn More' : 'En savoir plus'}
                        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>

                    {/* Visual panel */}
                    <div className={`${service.bg} p-8 md:p-10 flex flex-col justify-center ${isEven ? '' : 'md:order-1'}`}>
                      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">
                        {isEn ? 'Services include' : 'Services inclus'}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {data.subServices.slice(0, 6).map((sub) => (
                          <div key={sub} className="bg-white/70 rounded-lg px-3 py-2 text-xs font-medium text-neutral-700 leading-snug">
                            {sub}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
