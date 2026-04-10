import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { SITE_CONFIG } from '@/lib/constants';
import Image from 'next/image';

export default function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();

  const trustBadges = [
    {
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      text: locale === 'fr' ? 'Assuré & certifié' : 'Insured & certified',
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      text: locale === 'fr' ? 'Réponse en 60 min' : '60-min response',
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
        </svg>
      ),
      text: locale === 'fr' ? 'Produits écologiques' : 'Eco products',
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      text: locale === 'fr' ? 'Équipe bilingue FR/EN' : 'Bilingual FR/EN team',
    },
  ];

  const stats = [
    { value: '500+', label: locale === 'fr' ? 'Clients satisfaits' : 'Happy clients' },
    { value: '10+', label: locale === 'fr' ? "Années d'exp." : 'Years exp.' },
    { value: '16', label: locale === 'fr' ? 'Villes' : 'Cities' },
    { value: '60min', label: locale === 'fr' ? 'Réponse' : 'Response' },
  ];

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, #060e2c 0%, #0a1a4e 40%, #0c2261 70%, #0f2f78 100%)',
        minHeight: 'min(90vh, 780px)',
      }}
    >
      {/* ── Background layers ── */}

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,192,212,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,192,212,1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow — left */}
      <div
        className="absolute -left-32 top-1/3 w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #00c0d4 0%, transparent 70%)',
        }}
      />

      {/* Radial glow — right */}
      <div
        className="absolute -right-48 bottom-0 w-[600px] h-[600px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, #1a4499 0%, transparent 70%)',
        }}
      />

      {/* Decorative arc */}
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-10"
        style={{
          background: 'conic-gradient(from 180deg at 100% 0%, #00c0d4, transparent 60%)',
        }}
      />

      {/* ── Content ── */}
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16 md:py-24">

          {/* Left: text */}
          <div style={{ animation: 'slideUp 0.7s ease-out both' }}>

            {/* Service badge */}
            <div className="inline-flex items-center gap-2.5 mb-7 px-4 py-2 rounded-full text-sm font-semibold"
              style={{
                background: 'rgba(0,192,212,0.12)',
                border: '1px solid rgba(0,192,212,0.35)',
                color: '#3de7f8',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" style={{ boxShadow: '0 0 8px #00c0d4' }} />
              {locale === 'fr' ? 'Service professionnel — Riviera Sud & Grand Montréal' : 'Professional service — South Shore & Greater Montreal'}
            </div>

            {/* Headline */}
            <h1
              className="font-heading font-bold leading-[1.1] mb-6 text-white"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}
            >
              {locale === 'fr' ? (
                <>
                  Services de{' '}
                  <span
                    className="block"
                    style={{
                      background: 'linear-gradient(135deg, #00c0d4, #3de7f8)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Conciergerie
                  </span>
                  à Montréal
                </>
              ) : (
                <>
                  Professional{' '}
                  <span
                    className="block"
                    style={{
                      background: 'linear-gradient(135deg, #00c0d4, #3de7f8)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Concierge Services
                  </span>
                  in Montreal
                </>
              )}
            </h1>

            {/* Description */}
            <p
              className="text-lg leading-relaxed mb-8 max-w-lg"
              style={{ color: 'rgba(255,255,255,0.72)' }}
            >
              {locale === 'fr' ? (
                <>
                  <strong className="text-white font-semibold">Nettoyage commercial</strong>,{' '}
                  <strong className="text-white font-semibold">conciergerie Airbnb</strong>,{' '}
                  <strong className="text-white font-semibold">gestion de propriété</strong> et{' '}
                  <strong className="text-white font-semibold">conciergerie de jour</strong>{' '}
                  — des équipes certifiées pour les entreprises, condos et gestionnaires exigeants.
                </>
              ) : (
                <>
                  <strong className="text-white font-semibold">Commercial cleaning</strong>,{' '}
                  <strong className="text-white font-semibold">Airbnb concierge service</strong>,{' '}
                  <strong className="text-white font-semibold">property management</strong> and{' '}
                  <strong className="text-white font-semibold">day porter services</strong>{' '}
                  — certified teams for businesses, condo buildings, and property managers.
                </>
              )}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10" style={{ animationDelay: '0.2s' }}>
              <Link
                href="/contact"
                className="hero-cta-primary inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-primary-900 transition-all duration-300 shadow-xl text-base"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {t('cta')}
              </Link>

              <Link
                href="/services"
                className="hero-cta-secondary inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 text-base group"
              >
                {t('ctaSecondary')}
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Trust badges */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                {t('trusted')}
              </p>
              <div className="flex flex-wrap gap-2">
                {trustBadges.map((badge, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium"
                    style={{
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: 'rgba(255,255,255,0.85)',
                    }}
                  >
                    <span style={{ color: '#3de7f8' }}>{badge.icon}</span>
                    {badge.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: image + cards */}
          <div
            className="relative hidden lg:block"
            style={{ animation: 'slideInRight 0.8s ease-out 0.15s both' }}
          >
            {/* Main image */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                aspectRatio: '4/3',
                boxShadow: '0 24px 80px rgba(6,14,44,0.6), 0 0 0 1px rgba(0,192,212,0.2)',
              }}
            >
              <Image
                src="/images/hero/hero-team.jpg"
                alt={locale === 'fr'
                  ? 'Équipe professionnelle Montreal Concierge Services'
                  : 'Professional team Montreal Concierge Services'}
                fill
                className="object-cover"
                priority
                sizes="50vw"
              />
              {/* Overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, transparent 50%, rgba(6,14,44,0.5) 100%)',
                }}
              />
            </div>

            {/* Stats row — floating below image */}
            <div
              className="absolute -bottom-5 left-4 right-4 rounded-xl p-4"
              style={{
                background: 'rgba(255,255,255,0.97)',
                boxShadow: '0 8px 32px rgba(6,14,44,0.25)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="grid grid-cols-4 divide-x divide-neutral-100">
                {stats.map((stat) => (
                  <div key={stat.value} className="text-center px-3">
                    <p
                      className="font-heading font-bold text-xl leading-tight"
                      style={{ color: '#0a1a4e' }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-xs text-neutral-500 mt-0.5 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge — top left */}
            <div
              className="absolute -top-4 -left-4 flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.95)',
                boxShadow: '0 8px 24px rgba(6,14,44,0.2)',
                animation: 'float 4s ease-in-out infinite',
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'rgba(0,192,212,0.12)' }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#00c0d4' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-primary-900">Google Rating</p>
                <div className="flex gap-0.5 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 fill-current" style={{ color: '#e8aa1a' }} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge — bottom right */}
            <div
              className="absolute -right-6 top-1/2 -translate-y-1/2 px-4 py-3 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, #0a1a4e, #0c2261)',
                boxShadow: '0 8px 24px rgba(6,14,44,0.4)',
                animation: 'float 4s ease-in-out infinite 2s',
              }}
            >
              <p className="text-xs font-semibold mb-1.5" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {locale === 'fr' ? 'Zones desservies' : 'Service areas'}
              </p>
              <div className="flex flex-wrap gap-1 max-w-[160px]">
                {['Longueuil', 'Brossard', 'Repentigny'].map((city) => (
                  <span
                    key={city}
                    className="text-xs rounded-full px-2.5 py-0.5 font-medium"
                    style={{ background: 'rgba(0,192,212,0.2)', color: '#3de7f8' }}
                  >
                    {city}
                  </span>
                ))}
                <span className="text-xs font-semibold" style={{ color: '#3de7f8' }}>
                  +13 {locale === 'fr' ? 'villes' : 'cities'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 leading-none">
        <svg viewBox="0 0 1440 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 72L1440 72L1440 36C1440 36 1080 0 720 0C360 0 0 36 0 36L0 72Z" fill="#f7f9fc"/>
        </svg>
      </div>
    </section>
  );
}
