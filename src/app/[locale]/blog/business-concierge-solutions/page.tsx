import { useLocale } from 'next-intl';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';

export async function generateMetadata({ params: { locale } }: any): Promise<Metadata> {
  return {
    title:
      locale === 'en'
        ? 'Business Concierge Services: Solutions for Offices | Montreal'
        : 'Services de Conciergerie d\'Entreprise: Solutions pour Bureaux | Montréal',
    description:
      locale === 'en'
        ? 'Discover how business concierge services optimize office operations, reduce costs, and improve employee satisfaction for commercial properties.'
        : 'Découvrez comment les services de conciergerie d\'entreprise optimisent les opérations de bureau et réduisent les coûts.',
  };
}

export default function BlogPost() {
  const locale = useLocale();
  const isEnglish = locale === 'en';

  return (
    <>
      <Header />
      <main>
        <section className="relative bg-gradient-to-br from-green-600 to-green-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isEnglish ? (
                <>Business <strong className="text-white">Concierge Services</strong>: Smart Solutions for Offices</>
              ) : (
                <>Services de <strong className="text-white">Conciergerie d'Entreprise</strong>: Solutions pour Bureaux</>
              )}
            </h1>
            <p className="text-green-100 text-lg">
              {isEnglish ? (
                <>Optimize operations, reduce costs, and improve employee & client satisfaction with professional business concierge services.</>
              ) : (
                <>Optimisez les opérations, réduisez les coûts et améliorez la satisfaction des employés et clients.</>
              )}
            </p>
          </div>
        </section>

        <section className="py-8 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/services/business-concierge.jpg"
                alt="Professional business concierge services for offices"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          </div>
        </section>

        <article className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 space-y-8">
            <section>
              <p className="text-lg text-gray-700 leading-relaxed">
                {isEnglish ? (
                  <>For modern offices and commercial buildings, <strong>business concierge services</strong> are essential. They manage everything from <strong>facility maintenance</strong> and **access control** to <strong>vendor coordination</strong> and **employee support**—freeing your management team to focus on core business operations.</>
                ) : (
                  <>Pour les bureaux modernes et immeubles commerciaux, les <strong>services de conciergerie d'entreprise</strong> sont essentiels. Ils gèrent tout, de <strong>l'entretien des installations</strong> à la **coordination des fournisseurs** et au **support des employés**.</>
                )}
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {isEnglish ? 'What Business Concierge Services Include' : 'Ce que les Services de Conciergerie d\'Entreprise Incluent'}
              </h2>

              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Reception & Visitor Management</strong> – Professional first impressions</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Cleaning & Maintenance</strong> – Daily office upkeep and sanitization</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Mail & Package Management</strong> – Organized delivery handling</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Access Control & Security</strong> – Badge management and building security</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Vendor Coordination</strong> – HVAC, IT, plumbing repairs scheduled and managed</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Administrative Support</strong> – Document management, scheduling assistance</span>
                </li>
              </ul>
            </section>

            <section className="bg-green-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {isEnglish ? 'Business Benefits of Professional Concierge Services' : 'Avantages Commerciaux des Services Professionnels'}
              </h2>

              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-bold mb-2">💰 <strong>Reduce Operating Costs</strong></h3>
                  <p className="text-sm">Single provider replaces multiple contractors. Reduces overhead by 20-30% through centralized management.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">📈 <strong>Improve Employee Productivity</strong></h3>
                  <p className="text-sm">Well-maintained, clean office = happier, more productive employees. Reduces stress and improves morale.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">🎯 <strong>Enhance Client Experience</strong></h3>
                  <p className="text-sm">Professional appearance, organized reception, quick problem resolution = positive client impressions.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">🔒 <strong>Ensure Compliance & Security</strong></h3>
                  <p className="text-sm">Professional concierge ensures building standards, safety compliance, and organized access control.</p>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">
                {isEnglish ? 'Optimize Your Office Today' : 'Optimisez votre Bureau Aujourd\'hui'}
              </h3>
              <Link
                href="/services"
                className="inline-block px-6 py-3 bg-white text-green-600 font-bold rounded-lg hover:bg-gray-100 transition"
              >
                {isEnglish ? 'View Business Services' : 'Voir les Services Commerciaux'}
              </Link>
            </section>
          </div>
        </article>

        {/* FAQ */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {isEnglish ? 'Frequently Asked Questions' : 'Questions Fréquemment Posées'}
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: isEnglish ? 'How much does business concierge service cost?' : 'Combien coûte un service de conciergerie d\'entreprise?',
                  a: isEnglish ? 'Cost depends on building size and services needed. Most clients see 20-30% savings vs. multiple contractors. Get a free quote.' : 'Le coût dépend de la taille et des services. Obtenez un devis gratuit.',
                },
                {
                  q: isEnglish ? 'Can you start immediately?' : 'Pouvez-vous commencer immédiatement?',
                  a: isEnglish ? 'We respond within 60 minutes. Most businesses start within 1-2 weeks. We\'re flexible with your timeline.' : 'Nous répondons en 60 minutes. La plupart commencent en 1-2 semaines.',
                },
              ].map((faq, idx) => (
                <details key={idx} className="bg-white p-6 rounded-lg shadow-sm cursor-pointer">
                  <summary className="font-bold text-gray-900">{faq.q}</summary>
                  <p className="text-gray-700 mt-4">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
