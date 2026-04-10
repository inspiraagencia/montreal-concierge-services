import { useTranslations, useLocale } from 'next-intl';
import ScrollReveal from '@/components/ScrollReveal';

const WHY_US_ITEMS = [
  {
    key: 'professional',
    gradient: 'linear-gradient(135deg, #0a1a4e, #1a4499)',
    bg: 'rgba(10,26,78,0.06)',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    key: 'flexible',
    gradient: 'linear-gradient(135deg, #00838f, #00c0d4)',
    bg: 'rgba(0,192,212,0.08)',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    key: 'eco',
    gradient: 'linear-gradient(135deg, #064e3b, #059669)',
    bg: 'rgba(5,150,105,0.07)',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    key: 'local',
    gradient: 'linear-gradient(135deg, #7c2d12, #dc2626)',
    bg: 'rgba(220,38,38,0.07)',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const STATS = [
  { value: '500+', labelFr: 'Clients satisfaits', labelEn: 'Happy clients', icon: '🏆' },
  { value: '10+', labelFr: "Années d'expérience", labelEn: 'Years of experience', icon: '📅' },
  { value: '60min', labelFr: 'Délai de réponse', labelEn: 'Response time', icon: '⚡' },
  { value: '16', labelFr: 'Villes desservies', labelEn: 'Cities served', icon: '📍' },
];

export default function WhyUsSection() {
  const t = useTranslations('whyUs');
  const locale = useLocale();

  return (
    <section className="section-padding bg-white" id="about">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left column */}
          <ScrollReveal direction="left"><div>
            <span className="section-label">
              {locale === 'fr' ? 'Notre engagement' : 'Our commitment'}
            </span>
            <h2
              className="font-heading font-bold mb-4"
              style={{ fontSize: 'clamp(1.875rem, 3vw, 2.625rem)', color: '#0a1a4e' }}
            >
              {locale === 'fr' ? (
                <>Pourquoi les Entreprises<br />Nous Font <span style={{ background: 'linear-gradient(135deg, #00c0d4, #3de7f8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Confiance</span>?</>
              ) : (
                <>Why Businesses<br />Trust <span style={{ background: 'linear-gradient(135deg, #00c0d4, #3de7f8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Our Services</span>?</>
              )}
            </h2>
            <div className="divider-cyan mb-8" />

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {STATS.map((stat) => (
                <div
                  key={stat.value}
                  className="relative overflow-hidden rounded-2xl p-5"
                  style={{
                    background: 'linear-gradient(145deg, #f7f9fc, #eef3fc)',
                    border: '1px solid rgba(10,26,78,0.07)',
                  }}
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <p
                    className="font-heading font-bold text-3xl leading-none mb-1"
                    style={{ color: '#0a1a4e' }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-sm font-medium" style={{ color: '#617d96' }}>
                    {locale === 'fr' ? stat.labelFr : stat.labelEn}
                  </p>
                  {/* Decorative corner */}
                  <div
                    className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full opacity-10"
                    style={{ background: 'linear-gradient(135deg, #0a1a4e, #00c0d4)' }}
                  />
                </div>
              ))}
            </div>

            {/* Quote */}
            <div
              className="relative overflow-hidden rounded-2xl p-7"
              style={{
                background: 'linear-gradient(135deg, #0a1a4e, #0c2261)',
              }}
            >
              {/* Decorative quote mark */}
              <div
                className="absolute -top-4 -left-2 font-heading font-bold text-9xl leading-none select-none"
                style={{ color: 'rgba(0,192,212,0.12)' }}
              >
                "
              </div>
              <p
                className="relative z-10 leading-relaxed text-base mb-4"
                style={{ color: 'rgba(255,255,255,0.82)' }}
              >
                {locale === 'fr'
                  ? 'Nous croyons que chaque espace mérite d\'être impeccable. Notre équipe apporte professionnalisme, fiabilité et souci du détail à chaque intervention — pour que vous puissiez vous concentrer sur votre entreprise.'
                  : 'We believe every space deserves to be impeccable. Our team brings professionalism, reliability, and attention to detail to every job — so you can focus on your business.'}
              </p>
              <p className="font-semibold text-sm relative z-10" style={{ color: '#3de7f8' }}>
                {locale === 'fr' ? '— Fondateur, Montreal Concierge Services' : '— Founder, Montreal Concierge Services'}
              </p>

              {/* Decorative glow */}
              <div
                className="absolute bottom-0 right-0 w-40 h-40 rounded-full opacity-20"
                style={{ background: 'radial-gradient(circle, #00c0d4, transparent)' }}
              />
            </div>
          </div></ScrollReveal>

          {/* Right column — why us items */}
          <ScrollReveal direction="right"><div className="flex flex-col gap-4 lg:mt-16">
            {WHY_US_ITEMS.map((item) => (
              <div
                key={item.key}
                className="group flex gap-5 rounded-2xl p-5 transition-all duration-300"
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(10,26,78,0.07)',
                  boxShadow: '0 2px 16px rgba(10,26,78,0.05)',
                }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: item.gradient,
                    color: 'white',
                  }}
                >
                  {item.icon}
                </div>

                {/* Text */}
                <div>
                  <h3
                    className="font-heading font-bold text-lg mb-1.5"
                    style={{ color: '#0a1a4e' }}
                  >
                    {t(`items.${item.key}.title`)}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: '#617d96', lineHeight: '1.7' }}
                  >
                    {t(`items.${item.key}.description`)}
                  </p>
                </div>
              </div>
            ))}

            {/* Certifications strip */}
            <div
              className="rounded-2xl p-5 mt-2"
              style={{
                background: 'linear-gradient(135deg, rgba(0,192,212,0.06), rgba(10,26,78,0.04))',
                border: '1px solid rgba(0,192,212,0.2)',
              }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: '#00c0d4' }}
              >
                {locale === 'fr' ? 'Accréditations & Certifications' : 'Accreditations & Certifications'}
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  locale === 'fr' ? 'Assuré & Cautionné' : 'Insured & Bonded',
                  locale === 'fr' ? 'CNESST Conforme' : 'CNESST Compliant',
                  locale === 'fr' ? 'Produits éco-certifiés' : 'Eco-certified products',
                  locale === 'fr' ? 'Service bilingue' : 'Bilingual service',
                ].map((cert) => (
                  <span
                    key={cert}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{
                      background: 'white',
                      color: '#0a1a4e',
                      border: '1px solid rgba(10,26,78,0.12)',
                    }}
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#00c0d4' }}>
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div></ScrollReveal>
        </div>
      </div>
    </section>
  );
}
