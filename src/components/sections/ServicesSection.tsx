import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { SERVICE_CATEGORIES } from '@/lib/constants';

const SERVICE_ICONS: Record<string, { icon: string; color: string; bg: string }> = {
  commercial: { icon: '🏢', color: 'text-blue-600', bg: 'bg-blue-50' },
  airbnb: { icon: '🏠', color: 'text-purple-600', bg: 'bg-purple-50' },
  property: { icon: '🔑', color: 'text-green-600', bg: 'bg-green-50' },
  business: { icon: '💼', color: 'text-orange-600', bg: 'bg-orange-50' },
  dayporter: { icon: '🧹', color: 'text-teal-600', bg: 'bg-teal-50' },
};

export default function ServicesSection() {
  const t = useTranslations('services');
  const locale = useLocale();

  const services = SERVICE_CATEGORIES.map((cat) => ({
    id: cat.id,
    slug: locale === 'fr' ? cat.slug_fr : cat.slug_en,
    icon: SERVICE_ICONS[cat.id],
    title: t(`${cat.id}.title`),
    description: t(`${cat.id}.description`),
  }));

  return (
    <section className="section-padding bg-white" id="services">
      <div className="section-container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-primary-500 font-semibold text-sm uppercase tracking-widest mb-3">
            {locale === 'fr' ? 'Ce que nous offrons' : 'What we offer'}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-neutral-600 text-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {services.map((service) => (
            <div
              key={service.id}
              className="group card hover:border-primary-200 hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Icon */}
              <div className={`w-14 h-14 ${service.icon.bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <span className="text-2xl">{service.icon.icon}</span>
              </div>

              {/* Content */}
              <h3 className="font-heading font-bold text-xl text-primary-900 mb-3">
                {service.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed flex-1 mb-5">
                {service.description}
              </p>

              {/* Link */}
              <Link
                href={`/services/${service.slug}` as any}
                className="inline-flex items-center gap-1 text-primary-500 font-semibold text-sm hover:gap-2 transition-all"
              >
                {t('learnMore')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/services" className="btn-secondary inline-flex items-center gap-2">
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
