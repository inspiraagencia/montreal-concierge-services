import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { SERVICE_CATEGORIES } from '@/lib/constants';

const SERVICE_DESIGN: Record<string, {
  icon: React.ReactNode;
  gradient: string;
  accent: string;
  ring: string;
}> = {
  commercial: {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #0a1a4e 0%, #1a4499 100%)',
    accent: '#3de7f8',
    ring: 'rgba(61,231,248,0.2)',
  },
  airbnb: {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #0c2261 0%, #00c0d4 100%)',
    accent: '#00c0d4',
    ring: 'rgba(0,192,212,0.2)',
  },
  property: {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #064e3b 0%, #059669 100%)',
    accent: '#34d399',
    ring: 'rgba(52,211,153,0.2)',
  },
  business: {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)',
    accent: '#fb923c',
    ring: 'rgba(251,146,60,0.2)',
  },
  dayporter: {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #134e4a 0%, #0d9488 100%)',
    accent: '#2dd4bf',
    ring: 'rgba(45,212,191,0.2)',
  },
};

export default function ServicesSection() {
  const t = useTranslations('services');
  const locale = useLocale();

  const services = SERVICE_CATEGORIES.map((cat) => ({
    id: cat.id,
    slug: locale === 'fr' ? cat.slug_fr : cat.slug_en,
    design: SERVICE_DESIGN[cat.id],
    title: t(`${cat.id}.title`),
    description: t(`${cat.id}.description`),
  }));

  return (
    <section className="section-padding" style={{ background: '#f7f9fc' }} id="services">
      <div className="section-container">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-label justify-center">
            {locale === 'fr' ? 'Ce que nous offrons' : 'What we offer'}
          </span>
          <h2
            className="font-heading font-bold mb-5"
            style={{ fontSize: 'clamp(1.875rem, 3vw, 2.75rem)', color: '#0a1a4e' }}
          >
            {t('title')}
          </h2>
          <div className="divider-cyan mx-auto mb-5" />
          <p className="text-lg leading-relaxed" style={{ color: '#617d96' }}>
            {t('subtitle')}
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mb-12">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} locale={locale} learnMore={t('learnMore')} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 border-2"
            style={{
              borderColor: '#0a1a4e',
              color: '#0a1a4e',
              background: 'transparent',
            }}
          >
            {t('viewAll')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index, locale, learnMore }: {
  service: ReturnType<typeof Array.prototype.map>[0] & {
    id: string; slug: string; title: string; description: string;
    design: typeof SERVICE_DESIGN[string];
  };
  index: number;
  locale: string;
  learnMore: string;
}) {
  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden flex flex-col"
      style={{
        boxShadow: '0 4px 24px rgba(10,26,78,0.07)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
      }}
    >
      {/* Top accent line */}
      <div
        className="h-1 w-full"
        style={{ background: service.design.gradient }}
      />

      <div className="p-7 flex flex-col flex-1">
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{
            background: service.design.gradient,
            color: 'white',
            boxShadow: `0 4px 16px ${service.design.ring}`,
          }}
        >
          {service.design.icon}
        </div>

        {/* Content */}
        <h3
          className="font-heading font-bold text-xl mb-3"
          style={{ color: '#0a1a4e' }}
        >
          {service.title}
        </h3>
        <p
          className="leading-relaxed flex-1 mb-6 text-sm"
          style={{ color: '#617d96', lineHeight: '1.7' }}
        >
          {service.description}
        </p>

        {/* Link */}
        <Link
          href={`/services/${service.slug}` as any}
          className="inline-flex items-center gap-1.5 font-semibold text-sm transition-all duration-200 group/link"
          style={{ color: service.design.accent !== '#3de7f8' ? service.design.accent : '#00c0d4' }}
        >
          {learnMore}
          <svg
            className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
