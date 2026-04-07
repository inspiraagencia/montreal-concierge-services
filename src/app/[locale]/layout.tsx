import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SITE_CONFIG } from '@/lib/constants';
import '@/styles/globals.css';

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: {
      default: t('title'),
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description: t('description'),
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        fr: '/fr',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      locale: locale === 'fr' ? 'fr_CA' : 'en_CA',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_CONFIG.name,
    description: locale === 'fr'
      ? 'Services de conciergerie professionnels à Montréal. Nettoyage commercial, gestion Airbnb, entretien de propriété.'
      : 'Professional concierge services in Montreal. Commercial cleaning, Airbnb management, property maintenance.',
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.province,
      addressCountry: SITE_CONFIG.address.country,
    },
    areaServed: [
      { '@type': 'City', name: 'Montréal' },
      { '@type': 'City', name: 'Longueuil' },
      { '@type': 'City', name: 'Brossard' },
      { '@type': 'City', name: 'Repentigny' },
      { '@type': 'City', name: 'Terrebonne' },
    ],
    serviceType: [
      'Commercial Cleaning',
      'Concierge Services',
      'Property Management',
      'Airbnb Management',
    ],
    availableLanguage: ['English', 'French'],
  };

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white font-sans">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
