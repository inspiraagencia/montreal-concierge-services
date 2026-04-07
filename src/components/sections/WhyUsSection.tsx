import { useTranslations, useLocale } from 'next-intl';

const WHY_US_ITEMS = [
  {
    key: 'professional',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    color: 'text-primary-500',
    bg: 'bg-primary-50',
  },
  {
    key: 'flexible',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'text-accent-500',
    bg: 'bg-accent-50',
  },
  {
    key: 'eco',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    key: 'local',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: 'text-red-500',
    bg: 'bg-red-50',
  },
];

const STATS = [
  { value: '500+', labelFr: 'Clients satisfaits', labelEn: 'Happy clients' },
  { value: '10+', labelFr: "Années d'expérience", labelEn: 'Years of experience' },
  { value: '60min', labelFr: 'Délai de réponse', labelEn: 'Response time' },
  { value: '16', labelFr: 'Villes desservies', labelEn: 'Cities served' },
];

export default function WhyUsSection() {
  const t = useTranslations('whyUs');
  const locale = useLocale();

  return (
    <section className="section-padding bg-neutral-50" id="about">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: stats + image area */}
          <div>
            <span className="inline-block text-primary-500 font-semibold text-sm uppercase tracking-widest mb-3">
              {locale === 'fr' ? 'Notre engagement' : 'Our commitment'}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-900 mb-6">
              {locale === 'fr' ? (
                <>Pourquoi Choisir Nos <strong>Services de Conciergerie</strong>?</>
              ) : (
                <>Why Choose Our <strong>Concierge Services</strong>?</>
              )}
            </h2>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {STATS.map((stat) => (
                <div key={stat.value} className="bg-white rounded-xl p-5 shadow-sm border border-neutral-100 text-center">
                  <p className="font-heading text-3xl font-bold text-primary-600 mb-1">{stat.value}</p>
                  <p className="text-sm text-neutral-500 font-medium">
                    {locale === 'fr' ? stat.labelFr : stat.labelEn}
                  </p>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="bg-primary-700 text-white rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 text-primary-600 text-8xl font-serif leading-none select-none opacity-20">"</div>
              <p className="text-primary-100 leading-relaxed relative z-10">
                {locale === 'fr'
                  ? 'Nous croyons que chaque espace mérite d\'être impeccable. Notre équipe apporte professionnalisme, fiabilité et souci du détail à chaque intervention.'
                  : 'We believe every space deserves to be impeccable. Our team brings professionalism, reliability, and attention to detail to every job.'}
              </p>
              <p className="mt-3 text-accent-300 font-semibold text-sm">
                {locale === 'fr' ? '— Fondateur, Montreal Concierge Services' : '— Founder, Montreal Concierge Services'}
              </p>
            </div>
          </div>

          {/* Right: why us items */}
          <div className="grid grid-cols-1 gap-5">
            {WHY_US_ITEMS.map((item) => (
              <div key={item.key} className="flex gap-5 bg-white rounded-xl p-5 shadow-sm border border-neutral-100 group hover:border-primary-200 hover:shadow-md transition-all">
                <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-primary-900 mb-1">
                    {t(`items.${item.key}.title`)}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed text-sm">
                    {t(`items.${item.key}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
