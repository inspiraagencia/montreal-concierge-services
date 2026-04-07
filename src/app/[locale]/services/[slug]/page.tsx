import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTASection from '@/components/sections/CTASection';
import { SERVICES_DATA, getServiceBySlug, getServiceLocaleData, getAllSlugs } from '@/lib/services-data';
import { SITE_CONFIG } from '@/lib/constants';

type Props = {
  params: { locale: string; slug: string };
};

export async function generateStaticParams() {
  return getAllSlugs().map(({ slug, locale }) => ({ slug, locale }));
}

export async function generateMetadata({ params: { locale, slug } }: Props): Promise<Metadata> {
  const service = getServiceBySlug(slug);
  if (!service) return { title: 'Service Not Found' };

  const data = getServiceLocaleData(service, locale);
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: {
      canonical: `/${locale}/services/${slug}`,
      languages: {
        en: `/en/services/${service.slug_en}`,
        fr: `/fr/services/${service.slug_fr}`,
      },
    },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: `${SITE_CONFIG.url}/${locale}/services/${slug}`,
      siteName: SITE_CONFIG.name,
      locale: locale === 'fr' ? 'fr_CA' : 'en_CA',
      type: 'website',
      images: [{ url: service.image, width: 1200, height: 630, alt: data.title }],
    },
  };
}

export default function ServiceDetailPage({ params: { locale, slug } }: Props) {
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const data = getServiceLocaleData(service, locale);
  const isEn = locale === 'en';
  const otherServices = SERVICES_DATA.filter((s) => s.id !== service.id);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.title,
    description: data.metaDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      telephone: SITE_CONFIG.phone,
      email: SITE_CONFIG.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Montréal',
        addressRegion: 'QC',
        addressCountry: 'CA',
      },
    },
    areaServed: [
      { '@type': 'City', name: 'Longueuil' },
      { '@type': 'City', name: 'Brossard' },
      { '@type': 'City', name: 'Repentigny' },
      { '@type': 'City', name: 'Terrebonne' },
    ],
    offers: data.packages.map((pkg) => ({
      '@type': 'Offer',
      name: pkg.name,
      description: pkg.description,
    })),
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />
      <main>
        {/* Breadcrumb */}
        <nav className="bg-neutral-50 border-b border-neutral-100 py-3">
          <div className="section-container">
            <ol className="flex items-center gap-2 text-sm text-neutral-500">
              <li><Link href="/" className="hover:text-primary-500 transition-colors">{isEn ? 'Home' : 'Accueil'}</Link></li>
              <li><span className="text-neutral-300">/</span></li>
              <li><Link href="/services" className="hover:text-primary-500 transition-colors">{isEn ? 'Services' : 'Services'}</Link></li>
              <li><span className="text-neutral-300">/</span></li>
              <li className="text-primary-600 font-medium truncate max-w-xs">{data.title}</li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-16 md:py-20">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className={`w-16 h-16 ${service.bg} rounded-2xl flex items-center justify-center mb-5`}>
                  <span className="text-3xl">{service.icon}</span>
                </div>
                <h1 className="font-heading text-4xl md:text-5xl font-bold mb-5 leading-tight">
                  {data.h1}
                </h1>
                <p className="text-primary-200 text-lg leading-relaxed mb-8">
                  {data.intro}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-accent-400 hover:bg-accent-500 text-primary-900 font-bold px-8 py-4 rounded-lg transition-all">
                    {data.cta}
                  </Link>
                  <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`} className="inline-flex items-center justify-center gap-2 border-2 border-white/40 hover:border-white text-white font-semibold px-8 py-4 rounded-lg transition-all">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {SITE_CONFIG.phone}
                  </a>
                </div>
              </div>

              {/* Image */}
              <div className="relative hidden lg:block rounded-2xl overflow-hidden aspect-video">
                <Image
                  src={service.image}
                  alt={data.title}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section-padding bg-white">
          <div className="section-container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-900 mb-3">
                {isEn ? 'What We Offer' : 'Ce que nous offrons'}
              </h2>
              <p className="text-neutral-600">
                {isEn ? 'A comprehensive range of professional services tailored to your needs.' : 'Une gamme complète de services professionnels adaptés à vos besoins.'}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.features.map((feature) => (
                <div key={feature.title} className="card group hover:border-primary-200 hover:shadow-md transition-all">
                  <div className={`w-12 h-12 ${service.bg} rounded-xl flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-primary-900 mb-2">{feature.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sub-services */}
        <section className="section-padding bg-neutral-50">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="font-heading text-3xl font-bold text-primary-900 mb-6">
                  {isEn ? 'All Included Services' : 'Tous les services inclus'}
                </h2>
                <div className="grid grid-cols-1 gap-2">
                  {data.subServices.map((sub) => (
                    <div key={sub} className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 border border-neutral-100">
                      <svg className="w-5 h-5 text-primary-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-neutral-700 text-sm font-medium">{sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Packages */}
              <div>
                <h2 className="font-heading text-3xl font-bold text-primary-900 mb-6">
                  {isEn ? 'Service Packages' : 'Forfaits de service'}
                </h2>
                <div className="space-y-4">
                  {data.packages.map((pkg, idx) => (
                    <div
                      key={pkg.name}
                      className={`rounded-xl p-6 border-2 ${idx === 1 ? 'border-primary-500 bg-primary-50' : 'border-neutral-200 bg-white'}`}
                    >
                      {idx === 1 && (
                        <span className="inline-block bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                          {isEn ? 'Most Popular' : 'Le plus populaire'}
                        </span>
                      )}
                      <h3 className="font-heading font-bold text-xl text-primary-900 mb-1">{pkg.name}</h3>
                      <p className="text-neutral-500 text-sm mb-4">{pkg.description}</p>
                      <ul className="space-y-1.5">
                        {pkg.included.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm text-neutral-700">
                            <svg className="w-4 h-4 text-primary-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                      <Link href="/contact" className={`mt-5 w-full inline-flex items-center justify-center py-3 rounded-lg font-semibold text-sm transition-all ${idx === 1 ? 'bg-primary-500 hover:bg-primary-600 text-white' : 'border border-primary-500 text-primary-500 hover:bg-primary-50'}`}>
                        {isEn ? 'Get a Quote' : 'Obtenir une soumission'}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding bg-white">
          <div className="section-container max-w-3xl">
            <h2 className="font-heading text-3xl font-bold text-primary-900 mb-10 text-center">
              {isEn ? 'Frequently Asked Questions' : 'Questions Fréquentes'}
            </h2>
            <div className="space-y-4">
              {data.faq.map((item, idx) => (
                <details key={idx} className="bg-neutral-50 rounded-xl border border-neutral-200 group">
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer font-semibold text-primary-900 list-none">
                    {item.q}
                    <svg className="w-5 h-5 text-primary-400 shrink-0 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-5 text-neutral-600 leading-relaxed text-sm">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Other services */}
        <section className="section-padding bg-neutral-50">
          <div className="section-container">
            <h2 className="font-heading text-2xl font-bold text-primary-900 mb-8 text-center">
              {isEn ? 'Other Services' : 'Autres Services'}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherServices.map((s) => {
                const d = isEn ? s.en : s.fr;
                const sl = isEn ? s.slug_en : s.slug_fr;
                return (
                  <Link
                    key={s.id}
                    href={`/services/${sl}` as any}
                    className="bg-white rounded-xl p-5 border border-neutral-100 hover:border-primary-200 hover:shadow-md transition-all group flex flex-col gap-3"
                  >
                    <div className={`w-10 h-10 ${s.bg} rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}>
                      {s.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-900 text-sm leading-tight mb-1">{d.title}</h3>
                      <p className="text-neutral-500 text-xs">{d.intro.slice(0, 80)}...</p>
                    </div>
                  </Link>
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
