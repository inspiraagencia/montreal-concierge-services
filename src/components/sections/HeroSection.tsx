import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { SITE_CONFIG } from '@/lib/constants';
import Image from 'next/image';

export default function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();

  const trustBadges = [
    { icon: '⭐', text: locale === 'fr' ? '5/5 Google' : '5/5 Google' },
    { icon: '🛡️', text: locale === 'fr' ? 'Assuré & certifié' : 'Insured & certified' },
    { icon: '⚡', text: locale === 'fr' ? 'Réponse en 60 min' : '60-min response' },
    { icon: '🌿', text: locale === 'fr' ? 'Produits éco' : 'Eco products' },
  ];

  return (
    <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="section-container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-16 md:py-24">
          {/* Content */}
          <div className="text-white animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent-400/20 border border-accent-400/40 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></span>
              <span className="text-accent-300 text-sm font-medium">
                {locale === 'fr' ? 'Service professionnel — Riviera Sud' : 'Professional service — South Shore'}
              </span>
            </div>

            {/* H1 */}
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {locale === 'fr' ? (
                <>Services de <strong className="text-accent-300">Conciergerie Professionnels</strong> à Montréal</>
              ) : (
                <>Professional <strong className="text-accent-300">Concierge Services</strong> in Montreal</>
              )}
            </h1>

            <p className="text-primary-100 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
              {locale === 'fr' ? (
                <><strong className="text-white">Nettoyage commercial</strong>, <strong className="text-white">gestion Airbnb</strong> et <strong className="text-white">entretien de propriété</strong> pour la Rive-Sud et le Grand Montréal.</>
              ) : (
                <><strong className="text-white">Commercial cleaning</strong>, <strong className="text-white">Airbnb management</strong> and <strong className="text-white">property maintenance</strong> for Riviera Sud and Greater Montreal.</>
              )}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-accent-400 hover:bg-accent-500 text-primary-900 font-bold px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg text-base"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {t('cta')}
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/40 hover:border-white text-white font-semibold px-8 py-4 rounded-lg transition-all hover:bg-white/10"
              >
                {t('ctaSecondary')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Trust badges */}
            <div>
              <p className="text-primary-300 text-sm font-medium mb-3">{t('trusted')}</p>
              <div className="flex flex-wrap gap-3">
                {trustBadges.map((badge, i) => (
                  <div key={i} className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1.5 text-sm text-white">
                    <span>{badge.icon}</span>
                    <span>{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="/images/hero/hero-team.jpg"
                alt={locale === 'fr'
                  ? 'Équipe de conciergerie professionnelle Montreal Concierge Services'
                  : 'Professional concierge team Montreal Concierge Services'}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 0px, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent" />
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-5 min-w-[200px]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary-800">500+</p>
                  <p className="text-xs text-neutral-500">
                    {locale === 'fr' ? 'Clients satisfaits' : 'Happy clients'}
                  </p>
                </div>
              </div>
            </div>

            {/* Floating service areas */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-4">
              <p className="text-xs font-semibold text-neutral-500 mb-2">
                {locale === 'fr' ? 'Zones desservies' : 'Service areas'}
              </p>
              <div className="flex flex-wrap gap-1 max-w-[180px]">
                {['Longueuil', 'Brossard', 'Repentigny', 'Terrebonne'].map((city) => (
                  <span key={city} className="text-xs bg-primary-50 text-primary-700 rounded-full px-2 py-0.5 font-medium">
                    {city}
                  </span>
                ))}
                <span className="text-xs text-primary-500 font-medium">+12 {locale === 'fr' ? 'villes' : 'cities'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L1440 60L1440 30C1440 30 1080 0 720 0C360 0 0 30 0 30L0 60Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
