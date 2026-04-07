import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/forms/ContactForm';
import { SITE_CONFIG, LOCATIONS_SERVED } from '@/lib/constants';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'contact' });
  const isEn = locale === 'en';
  return {
    title: isEn
      ? 'Free Quote — Concierge Services Montreal South Shore | Contact Us'
      : 'Soumission Gratuite — Conciergerie Rive-Sud Montréal | Contactez-nous',
    description: isEn
      ? 'Get a free, no-obligation quote for concierge services in Montreal South Shore. Commercial cleaning, Airbnb management, property monitoring. Response guaranteed in 60 minutes.'
      : 'Obtenez une soumission gratuite et sans engagement pour vos services de conciergerie sur la Rive-Sud de Montréal. Nettoyage commercial, gestion Airbnb, surveillance immobilière. Réponse garantie en 60 minutes.',
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { en: '/en/contact', fr: '/fr/contact' },
    },
    openGraph: {
      title: isEn ? 'Free Concierge Quote — Montreal South Shore' : 'Soumission Conciergerie Gratuite — Rive-Sud Montréal',
      description: isEn ? 'Response in 60 minutes. No commitment required.' : 'Réponse en 60 minutes. Sans engagement.',
      url: `${SITE_CONFIG.url}/${locale}/contact`,
      siteName: SITE_CONFIG.name,
      locale: locale === 'fr' ? 'fr_CA' : 'en_CA',
      type: 'website',
    },
  };
}

export default async function ContactPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'contact' });
  const isEn = locale === 'en';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: isEn ? 'Contact Montreal Concierge Services' : 'Contacter Montreal Concierge Services',
    description: isEn
      ? 'Get a free concierge services quote in Montreal South Shore.'
      : 'Obtenez une soumission gratuite pour services de conciergerie sur la Rive-Sud.',
    url: `${SITE_CONFIG.url}/${locale}/contact`,
    mainEntity: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      telephone: SITE_CONFIG.phone,
      email: SITE_CONFIG.email,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: SITE_CONFIG.phone,
        email: SITE_CONFIG.email,
        availableLanguage: ['French', 'English'],
        contactOption: 'TollFree',
      },
    },
  };

  const trustItems = isEn
    ? [
        { icon: '⚡', title: '60-Minute Response', desc: 'Guaranteed response during business hours' },
        { icon: '🆓', title: 'Free & No Obligation', desc: 'Your quote is 100% free with no commitment' },
        { icon: '🛡️', title: 'Insured & Certified', desc: 'Fully insured team with background checks' },
        { icon: '🌍', title: 'Bilingual Service', desc: 'We serve you in French and English' },
      ]
    : [
        { icon: '⚡', title: 'Réponse en 60 Minutes', desc: 'Garantie pendant les heures d\'ouverture' },
        { icon: '🆓', title: 'Gratuit & Sans Engagement', desc: 'Votre soumission est 100% gratuite' },
        { icon: '🛡️', title: 'Assuré & Certifié', desc: 'Équipe entièrement assurée avec vérification des antécédents' },
        { icon: '🌍', title: 'Service Bilingue', desc: 'Nous vous servons en français et en anglais' },
      ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        {/* Page hero */}
        <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-14 md:py-18">
          <div className="section-container text-center">
            <span className="inline-block bg-accent-400/20 border border-accent-400/40 text-accent-300 text-sm font-semibold rounded-full px-4 py-1.5 mb-4">
              {isEn ? '⚡ Response in 60 minutes' : '⚡ Réponse en 60 minutes'}
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">{t('title')}</h1>
            <p className="text-primary-200 text-xl max-w-xl mx-auto">{t('subtitle')}</p>
          </div>
        </section>

        {/* Main content */}
        <section className="section-padding bg-neutral-50">
          <div className="section-container">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Form — takes 2 cols */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8">
                  <h2 className="font-heading text-2xl font-bold text-primary-900 mb-2">
                    {isEn ? 'Request Your Free Quote' : 'Demandez Votre Soumission Gratuite'}
                  </h2>
                  <p className="text-neutral-500 text-sm mb-8">
                    {isEn ? 'Fill in the form below and we\'ll get back to you within 60 minutes.' : 'Remplissez le formulaire ci-dessous et nous vous répondrons dans les 60 minutes.'}
                  </p>
                  <ContactForm />
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Trust items */}
                <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6">
                  <h3 className="font-heading font-bold text-lg text-primary-900 mb-5">
                    {isEn ? 'Why Choose Us?' : 'Pourquoi nous choisir?'}
                  </h3>
                  <div className="space-y-4">
                    {trustItems.map((item) => (
                      <div key={item.title} className="flex items-start gap-3">
                        <span className="text-2xl shrink-0 mt-0.5">{item.icon}</span>
                        <div>
                          <p className="font-semibold text-primary-900 text-sm">{item.title}</p>
                          <p className="text-neutral-500 text-xs mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct contact */}
                <div className="bg-primary-800 text-white rounded-2xl p-6">
                  <h3 className="font-heading font-bold text-lg mb-4">
                    {isEn ? 'Prefer to Call?' : 'Préférez appeler?'}
                  </h3>
                  <a
                    href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-xl px-4 py-3 transition-colors mb-3"
                  >
                    <svg className="w-5 h-5 text-accent-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="text-xs text-primary-300">{isEn ? 'Call us now' : 'Appelez-nous'}</p>
                      <p className="font-bold text-white">{SITE_CONFIG.phone}</p>
                    </div>
                  </a>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-xl px-4 py-3 transition-colors"
                  >
                    <svg className="w-5 h-5 text-accent-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-xs text-primary-300">{isEn ? 'Email us' : 'Écrivez-nous'}</p>
                      <p className="font-bold text-white text-sm">{SITE_CONFIG.email}</p>
                    </div>
                  </a>
                </div>

                {/* Areas served */}
                <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6">
                  <h3 className="font-heading font-bold text-base text-primary-900 mb-4">
                    {isEn ? '📍 Areas Served' : '📍 Zones desservies'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {LOCATIONS_SERVED.slice(0, 10).map((city) => (
                      <span key={city} className="text-xs bg-primary-50 text-primary-700 rounded-full px-2.5 py-1 font-medium">
                        {city}
                      </span>
                    ))}
                    <span className="text-xs bg-neutral-100 text-neutral-500 rounded-full px-2.5 py-1">
                      {isEn ? `+${LOCATIONS_SERVED.length - 10} more` : `+${LOCATIONS_SERVED.length - 10} autres`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
