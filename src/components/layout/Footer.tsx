import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { SITE_CONFIG, SERVICE_CATEGORIES, LOCATIONS_SERVED } from '@/lib/constants';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: '/' as const, label: t('nav.home') },
    { href: '/services' as const, label: t('nav.services') },
    { href: '/about' as const, label: t('nav.about') },
    { href: '/blog' as const, label: t('nav.blog') },
    { href: '/contact' as const, label: t('nav.contact') },
  ];

  const serviceLinks = SERVICE_CATEGORIES.map((cat) => ({
    slug: locale === 'fr' ? cat.slug_fr : cat.slug_en,
    label: t(`services.${cat.id}.title`),
  }));

  // Show first 6 locations
  const displayLocations = LOCATIONS_SERVED.slice(0, 6);

  return (
    <footer className="text-white" style={{ background: '#060e2c' }}>
      {/* Main footer */}
      <div className="section-container py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5 group">
              <Image
                src="/images/logo.png"
                alt="Montreal Concierge Services"
                width={160}
                height={50}
                className="h-14 w-auto object-contain opacity-95 group-hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {t('footer.description')}
            </p>

            {/* Contact info */}
            <div className="space-y-2.5">
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2.5 text-sm transition-colors hover:opacity-100"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#00c0d4' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {SITE_CONFIG.phone}
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-2.5 text-sm transition-colors hover:opacity-100"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#00c0d4' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {SITE_CONFIG.email}
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider mb-5" style={{ color: 'rgba(255,255,255,0.9)' }}>
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm flex items-center gap-1.5 transition-colors hover:opacity-100" style={{ color: 'rgba(255,255,255,0.55)' }}
                  >
                    <svg className="w-3 h-3" style={{ color: '#00c0d4' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider mb-5" style={{ color: 'rgba(255,255,255,0.9)' }}>
              {t('footer.ourServices')}
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}` as any}
                    className="text-sm flex items-center gap-1.5 transition-colors hover:opacity-100" style={{ color: 'rgba(255,255,255,0.55)' }}
                  >
                    <svg className="w-3 h-3" style={{ color: '#00c0d4' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service areas */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider mb-5" style={{ color: 'rgba(255,255,255,0.9)' }}>
              {t('footer.serviceAreas')}
            </h3>
            <ul className="space-y-2.5">
              {displayLocations.map((city) => (
                <li key={city} className="text-sm flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  <svg className="w-3 h-3" style={{ color: '#00c0d4' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {city}
                </li>
              ))}
              <li className="text-sm font-medium" style={{ color: '#00c0d4' }}>
                {locale === 'fr' ? `+ ${LOCATIONS_SERVED.length - 6} autres villes` : `+ ${LOCATIONS_SERVED.length - 6} more cities`}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
          <p>
            © {currentYear} {SITE_CONFIG.name}. {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-white">
              {t('footer.privacy')}
            </a>
            <a href="#" className="transition-colors hover:text-white">
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
