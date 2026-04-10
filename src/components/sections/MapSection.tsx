import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import ScrollReveal from '@/components/ScrollReveal';

export default function MapSection() {
  const locale = useLocale();

  const areas = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      titleFr: 'Immeubles Commerciaux',
      titleEn: 'Commercial Buildings',
      descFr: 'Services de conciergerie professionnels pour les immeubles de bureaux, complexes commerciaux et centres d\'affaires.',
      descEn: 'Professional concierge services for office buildings, commercial complexes, and business centers.',
      gradient: 'linear-gradient(135deg, #0a1a4e, #1a4499)',
      borderColor: '#1a4499',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      titleFr: 'Propriétés Résidentielles',
      titleEn: 'Residential Properties',
      descFr: 'Services de gestion de propriété et conciergerie spécialisés pour immeubles résidentiels et condominiums.',
      descEn: 'Specialized property management and concierge services for residential buildings and condominiums.',
      gradient: 'linear-gradient(135deg, #064e3b, #059669)',
      borderColor: '#059669',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      ),
      titleFr: 'Airbnb & Hôtellerie',
      titleEn: 'Airbnb & Hospitality',
      descFr: 'Gestion complète de propriété pour annonces Airbnb avec maintenance quotidienne et coordination des hôtes.',
      descEn: 'Complete property management for Airbnb listings with daily maintenance and guest coordination.',
      gradient: 'linear-gradient(135deg, #0c2261, #00c0d4)',
      borderColor: '#00c0d4',
    },
  ];

  return (
    <section className="section-padding" style={{ background: '#f7f9fc' }}>
      <div className="section-container">

        {/* Header */}
        <ScrollReveal direction="left"><div className="mb-12">
          <span className="section-label">
            {locale === 'fr' ? 'Zones de service' : 'Service coverage'}
          </span>
          <h2
            className="font-heading font-bold mb-4"
            style={{ fontSize: 'clamp(1.875rem, 3vw, 2.75rem)', color: '#0a1a4e' }}
          >
            {locale === 'fr' ? (
              <>Services de <span style={{ background: 'linear-gradient(135deg, #00c0d4, #3de7f8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Conciergerie</span> à Montréal & <span style={{ background: 'linear-gradient(135deg, #00c0d4, #3de7f8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Riviera Sud</span></>
            ) : (
              <><span style={{ background: 'linear-gradient(135deg, #00c0d4, #3de7f8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Concierge Services</span> in Montreal & <span style={{ background: 'linear-gradient(135deg, #00c0d4, #3de7f8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Riviera Sud</span></>
            )}
          </h2>
          <div className="divider-cyan mb-5" />
          <p className="text-lg max-w-3xl" style={{ color: '#617d96' }}>
            {locale === 'fr'
              ? 'Services de conciergerie et nettoyage commercial professionnels à Montréal et dans la région de Riviera Sud. Cliquez sur la carte pour explorer nos zones de service.'
              : 'Professional concierge and commercial cleaning services across Montreal and the South Shore. Click the map to explore our service areas.'}
          </p>
        </div></ScrollReveal>

        {/* Map */}
        <div
          className="relative w-full overflow-hidden rounded-2xl mb-10"
          style={{
            aspectRatio: '16 / 7',
            boxShadow: '0 8px 40px rgba(10,26,78,0.12)',
            border: '1px solid rgba(10,26,78,0.08)',
          }}
        >
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1UVJiAbQNJpx4_oUeo7KBBX-wJL_VjaxN"
            className="w-full h-full border-0"
            style={{ minHeight: '350px' }}
            loading="lazy"
            title={locale === 'fr' ? 'Carte des Zones de Service — Montreal Concierge' : 'Service Areas Map — Montreal Concierge'}
          />
        </div>

        {/* Area cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {areas.map((area, i) => (
            <ScrollReveal key={i} direction="up" delay={(i + 1) as 1|2|3}>
            <div
              className="group rounded-2xl p-6 bg-white transition-all duration-300"
              style={{
                boxShadow: '0 2px 16px rgba(10,26,78,0.06)',
                border: `1px solid rgba(10,26,78,0.07)`,
                borderLeft: `3px solid ${area.borderColor}`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white transition-transform duration-300 group-hover:scale-110"
                style={{ background: area.gradient }}
              >
                {area.icon}
              </div>
              <h3 className="font-heading font-bold text-lg mb-2" style={{ color: '#0a1a4e' }}>
                {locale === 'fr' ? area.titleFr : area.titleEn}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#617d96', lineHeight: '1.7' }}>
                {locale === 'fr' ? area.descFr : area.descEn}
              </p>
            </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom note */}
        <div
          className="rounded-2xl p-7 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(10,26,78,0.04), rgba(0,192,212,0.06))',
            border: '1px solid rgba(0,192,212,0.18)',
          }}
        >
          <p className="mb-4 font-medium" style={{ color: '#46607a' }}>
            {locale === 'fr'
              ? 'Vous ne savez pas si nous desservons votre région? Contactez-nous pour confirmer.'
              : 'Not sure if we serve your area? Contact us to confirm.'}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-white text-sm transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #0a1a4e, #1a4499)' }}
          >
            {locale === 'fr' ? 'Nous Contacter' : 'Get in Touch'}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
