import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { SITE_CONFIG } from '@/lib/constants';
import ScrollReveal from '@/components/ScrollReveal';

export default function CTASection() {
  const t = useTranslations('cta');
  const locale = useLocale();

  const trustItems = [
    { fr: 'Sans engagement', en: 'No commitment' },
    { fr: 'Soumission gratuite', en: 'Free quote' },
    { fr: 'Équipe assurée', en: 'Insured team' },
    { fr: 'Service bilingue FR/EN', en: 'Bilingual FR/EN' },
  ];

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #060e2c 0%, #0a1a4e 45%, #0c3060 100%)',
        padding: '80px 0',
      }}
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,192,212,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,192,212,1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Glow orbs */}
      <div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #00c0d4, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #3de7f8, transparent 70%)' }}
      />

      <div className="section-container relative z-10">
        <ScrollReveal><div className="max-w-3xl mx-auto text-center">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-sm font-semibold mb-7"
            style={{
              background: 'rgba(0,192,212,0.12)',
              border: '1px solid rgba(0,192,212,0.35)',
              color: '#3de7f8',
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: '#00c0d4', boxShadow: '0 0 8px #00c0d4' }}
            />
            {locale === 'fr' ? 'Réponse garantie en 60 minutes' : 'Response guaranteed in 60 minutes'}
          </div>

          {/* Headline */}
          <h2
            className="font-heading font-bold text-white mb-5"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.1 }}
          >
            {t('title')}
          </h2>

          <p
            className="text-lg mb-10 leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.72)' }}
          >
            {t('subtitle')}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-primary-900 text-base transition-all duration-300 shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #f0c040, #e8aa1a)',
                boxShadow: '0 8px 32px rgba(232,170,26,0.4)',
              }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {t('button')}
            </Link>

            <a
              href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-white text-base transition-all duration-300"
              style={{
                border: '1.5px solid rgba(0,192,212,0.6)',
                background: 'rgba(0,192,212,0.1)',
              }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {t('phone')}
            </a>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {trustItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm font-medium"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  style={{ color: '#00c0d4' }}
                >
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {locale === 'fr' ? item.fr : item.en}
              </div>
            ))}
          </div>
        </div></ScrollReveal>
      </div>
    </section>
  );
}
