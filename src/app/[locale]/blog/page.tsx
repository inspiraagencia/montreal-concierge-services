import { useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'blog' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

const BLOG_POSTS = [
  {
    id: 'what-is-concierge-service',
    title: {
      en: 'What Is a Concierge Service and How Can It Help Your Business?',
      fr: 'Qu\'est-ce qu\'un Service de Conciergerie et Comment Peut-il Aider votre Entreprise?',
    },
    excerpt: {
      en: 'Discover how professional concierge services can streamline your business operations and improve client satisfaction.',
      fr: 'Découvrez comment les services de conciergerie professionnels peuvent rationaliser vos opérations commerciales.',
    },
    category: { en: 'Business', fr: 'Entreprise' },
    readTime: { en: '8 min read', fr: '8 min de lecture' },
    image: '/images/services/commercial-cleaning-office-montreal.jpg',
    date: '2026-04-05',
    tags: ['concierge', 'business', 'commercial-cleaning'],
  },
  {
    id: 'personal-concierge-services',
    title: {
      en: 'Personal Concierge Services: What They Include and Who Benefits',
      fr: 'Services de Conciergerie Personnelle: Ce qu\'ils Incluent et qui en Bénéficie',
    },
    excerpt: {
      en: 'Learn how personal concierge services save time and reduce stress for busy professionals and families.',
      fr: 'Apprenez comment les services de conciergerie personnelle font gagner du temps aux professionnels occupés.',
    },
    category: { en: 'Lifestyle', fr: 'Mode de Vie' },
    readTime: { en: '7 min read', fr: '7 min de lecture' },
    image: '/images/services/property-maintenance-riviera-sud.jpg',
    date: '2026-04-04',
    tags: ['personal', 'lifestyle', 'time-saving'],
  },
  {
    id: 'business-concierge-solutions',
    title: {
      en: 'Business Concierge Services: Smart Solutions for Offices and Commercial Spaces',
      fr: 'Services de Conciergerie d\'Entreprise: Solutions Intelligentes pour Bureaux et Espaces Commerciaux',
    },
    excerpt: {
      en: 'Explore how business concierge services optimize operations for offices, buildings, and commercial properties.',
      fr: 'Explorez comment les services de conciergerie d\'entreprise optimisent les opérations des bureaux.',
    },
    category: { en: 'Commercial', fr: 'Commercial' },
    readTime: { en: '9 min read', fr: '9 min de lecture' },
    image: '/images/services/business-concierge.jpg',
    date: '2026-04-03',
    tags: ['commercial', 'business', 'operations'],
  },
  {
    id: 'luxury-concierge-services',
    title: {
      en: 'Luxury Concierge Services: What Defines a Truly High-End Experience',
      fr: 'Services de Conciergerie Luxe: Ce qui Définit une Véritable Expérience Haut de Gamme',
    },
    excerpt: {
      en: 'Understand the hallmarks of luxury concierge services and how they create exceptional experiences.',
      fr: 'Comprenez les caractéristiques des services de conciergerie de luxe et expériences exceptionnelles.',
    },
    category: { en: 'Premium', fr: 'Premium' },
    readTime: { en: '8 min read', fr: '8 min de lecture' },
    image: '/images/team/team-leader-concierge-montreal.jpg',
    date: '2026-04-02',
    tags: ['luxury', 'premium', 'exclusive'],
  },
  {
    id: 'concierge-apartments-condominiums',
    title: {
      en: 'Concierge Services for Apartments: What Property Owners Should Expect',
      fr: 'Services de Conciergerie pour Appartements: Ce que les Propriétaires Doivent Attendre',
    },
    excerpt: {
      en: 'Learn what to expect from concierge services for residential buildings and how they add value.',
      fr: 'Découvrez ce qu\'il faut attendre des services de conciergerie pour immeubles résidentiels.',
    },
    category: { en: 'Residential', fr: 'Résidentiel' },
    readTime: { en: '7 min read', fr: '7 min de lecture' },
    image: '/images/hero/hero-cleaning.jpg',
    date: '2026-04-01',
    tags: ['residential', 'apartments', 'property-management'],
  },
  {
    id: 'airbnb-concierge-guide',
    title: {
      en: 'Complete Guide to Airbnb Concierge Services: Maximize Your Rental Income',
      fr: 'Guide Complet des Services de Conciergerie Airbnb: Maximisez vos Revenus Locatifs',
    },
    excerpt: {
      en: 'Master Airbnb concierge services and discover how to increase guest satisfaction and rental revenue.',
      fr: 'Maîtrisez les services de conciergerie Airbnb et augmentez la satisfaction des hôtes.',
    },
    category: { en: 'Airbnb', fr: 'Airbnb' },
    readTime: { en: '10 min read', fr: '10 min de lecture' },
    image: '/images/services/airbnb-concierge.jpg',
    date: '2026-03-31',
    tags: ['airbnb', 'property-management', 'rental'],
  },
];

export default function BlogPage() {
  const locale = useLocale();
  const isEnglish = locale === 'en';

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 overflow-hidden pt-20 pb-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                {isEnglish ? (
                  <>Professional <strong className="text-accent-300">Concierge Services</strong> Guide</>
                ) : (
                  <>Guide des <strong className="text-accent-300">Services de Conciergerie</strong> Professionnels</>
                )}
              </h1>
              <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8">
                {isEnglish ? (
                  <>Expert insights on commercial cleaning, property management, Airbnb concierge, and business services. Learn how to optimize operations and increase client satisfaction.</>
                ) : (
                  <>Conseils d'experts sur le nettoyage commercial, la gestion de propriété, la conciergerie Airbnb et les services commerciaux.</>
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {BLOG_POSTS.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all group"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <Image
                      src={post.image}
                      alt={isEnglish ? post.title.en : post.title.fr}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-bold rounded-full">
                        {isEnglish ? post.category.en : post.category.fr}
                      </span>
                      <span className="text-xs text-gray-500">
                        {isEnglish ? post.readTime.en : post.readTime.fr}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-primary-600 transition">
                      {isEnglish ? post.title.en : post.title.fr}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {isEnglish ? post.excerpt.en : post.excerpt.fr}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs text-gray-500">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Date & CTA */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{post.date}</span>
                      <span className="text-primary-600 font-bold group-hover:translate-x-1 transition">
                        {isEnglish ? 'Read More →' : 'Lire Plus →'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary-50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {isEnglish ? (
                <>Ready to Implement <strong>Professional Services</strong>?</>
              ) : (
                <>Prêt à Mettre en Œuvre des <strong>Services Professionnels</strong>?</>
              )}
            </h2>
            <p className="text-gray-700 mb-8">
              {isEnglish ? (
                <>Contact us today for a free consultation. Our expert team will help you find the perfect concierge solution for your business or property.</>
              ) : (
                <>Contactez-nous dès aujourd'hui pour une consultation gratuite. Notre équipe d'experts vous aidera à trouver la solution parfaite.</>
              )}
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition"
            >
              {isEnglish ? 'Get Free Quote' : 'Obtenir une Soumission Gratuite'}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
