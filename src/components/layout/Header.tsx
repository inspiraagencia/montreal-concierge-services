'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { SITE_CONFIG } from '@/lib/constants';
import Image from 'next/image';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLocale = () => {
    const newLocale = locale === 'fr' ? 'en' : 'fr';
    router.replace(pathname as any, { locale: newLocale });
  };

  const navLinks = [
    { href: '/' as const, label: t('home') },
    { href: '/services' as const, label: t('services') },
    { href: '/about' as const, label: t('about') },
    { href: '/blog' as const, label: t('blog') },
    { href: '/contact' as const, label: t('contact') },
  ];

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(255,255,255,0.97)'
          : 'rgba(255,255,255,1)',
        boxShadow: scrolled
          ? '0 4px 32px rgba(10, 26, 78, 0.12)'
          : '0 1px 0 rgba(10, 26, 78, 0.06)',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
      }}
    >
      {/* Top info bar */}
      <div
        className="text-white text-xs hidden md:block"
        style={{ background: 'linear-gradient(90deg, #0a1a4e 0%, #0c2261 100%)' }}
      >
        <div className="section-container flex justify-between items-center py-2.5">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity"
            >
              <svg className="w-3.5 h-3.5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-medium">{SITE_CONFIG.phone}</span>
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity"
            >
              <svg className="w-3.5 h-3.5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>{SITE_CONFIG.email}</span>
            </a>
          </div>

          {/* Rating + lang */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 opacity-80">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3 h-3 text-gold-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <span className="text-white/70 text-xs">5.0 Google</span>
            </div>
            <button
              onClick={switchLocale}
              className="flex items-center gap-1.5 px-3 py-1 rounded-md font-semibold text-xs transition-all hover:bg-white/10"
              style={{ border: '1px solid rgba(0,192,212,0.4)', color: '#00c0d4' }}
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              {locale === 'fr' ? 'EN' : 'FR'}
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="section-container">
        <div className="flex items-center justify-between h-18 md:h-20 py-3">

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 group">
            <div className="relative h-14 w-auto">
              <Image
                src="/images/logo.png"
                alt="Montreal Concierge Services"
                width={180}
                height={56}
                className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                priority
              />
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link px-4 ${pathname === link.href ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + mobile */}
          <div className="flex items-center gap-3">
            {/* Mobile lang */}
            <button
              onClick={switchLocale}
              className="md:hidden px-2.5 py-1 text-xs font-bold rounded-md border"
              style={{ borderColor: '#00c0d4', color: '#00c0d4' }}
            >
              {locale === 'fr' ? 'EN' : 'FR'}
            </button>

            {/* CTA button */}
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #0a1a4e, #1a4499)',
              }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {t('getQuote')}
            </Link>

            {/* Mobile hamburger - circular, bottom-right */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden fixed bottom-20 right-4 z-40 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                background: '#0a1a4e',
                boxShadow: '0 4px 20px rgba(10,26,78,0.4)',
              }}
              aria-label="Toggle menu"
            >
              <div className="w-6 flex flex-col gap-1.5 transition-all">
                <span
                  className="h-0.5 w-full bg-white rounded-full transition-all duration-300 origin-center"
                  style={{ transform: mobileOpen ? 'rotate(45deg) translateY(8px)' : '' }}
                />
                <span
                  className="h-0.5 w-full bg-white rounded-full transition-all duration-300"
                  style={{ opacity: mobileOpen ? 0 : 1, transform: mobileOpen ? 'scaleX(0)' : '' }}
                />
                <span
                  className="h-0.5 w-full bg-white rounded-full transition-all duration-300 origin-center"
                  style={{ transform: mobileOpen ? 'rotate(-45deg) translateY(-8px)' : '' }}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu - full screen overlay */}
        {mobileOpen && (
          <div
            className="lg:hidden fixed inset-0 z-30"
            style={{
              background: 'linear-gradient(145deg, #060e2c 0%, #0a1a4e 50%, #0c2261 100%)',
              animation: 'fadeIn 0.3s ease-out both',
            }}
          >
            <div className="flex flex-col h-full">
              {/* Logo at top */}
              <div className="pt-6 px-4 pb-4 border-b" style={{ borderColor: 'rgba(0,192,212,0.2)' }}>
                <Image
                  src="/images/logo.png"
                  alt="Montreal Concierge Services"
                  width={160}
                  height={50}
                  className="h-12 w-auto object-contain"
                />
              </div>

              {/* Nav links */}
              <div className="flex-1 overflow-y-auto px-4 py-6">
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, i) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold text-base transition-all"
                      style={{
                        color: pathname === link.href ? '#0a1a4e' : 'white',
                        background: pathname === link.href ? 'rgba(0,192,212,0.2)' : 'rgba(255,255,255,0.08)',
                        animationDelay: `${i * 0.04}s`,
                      }}
                    >
                      {pathname === link.href && (
                        <span className="w-1 h-4 rounded-full" style={{ background: '#00c0d4' }} />
                      )}
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA button at bottom */}
              <div className="p-4 border-t" style={{ borderColor: 'rgba(0,192,212,0.2)' }}>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-primary-900 transition-all"
                  style={{ background: 'linear-gradient(135deg, #f0c040, #e8aa1a)' }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  {t('getQuote')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
