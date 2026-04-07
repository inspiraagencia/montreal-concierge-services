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
  return {
    title:
      locale === 'en'
        ? 'What Is a Concierge Service? Professional Guide | Montreal'
        : 'Qu\'est-ce qu\'un Service de Conciergerie? Guide Professionnel | Montréal',
    description:
      locale === 'en'
        ? 'Complete guide to concierge services. Learn how professional cleaning and property management can save time, improve operations, and reduce costs for your business.'
        : 'Guide complet des services de conciergerie. Découvrez comment les services professionnels peuvent améliorer vos opérations et réduire les coûts.',
  };
}

export default function BlogPost() {
  const locale = useLocale();
  const isEnglish = locale === 'en';

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-primary-900 to-primary-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="mb-6">
              <Link href="/blog" className="text-primary-200 hover:text-white text-sm font-semibold flex items-center gap-2">
                ← {isEnglish ? 'Back to Blog' : 'Retour au Blog'}
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {isEnglish ? (
                <>What Is a <strong className="text-accent-300">Concierge Service</strong> and How Can It Help Your Business?</>
              ) : (
                <>Qu'est-ce qu'un <strong className="text-accent-300">Service de Conciergerie</strong> et Comment Peut-il Aider votre Entreprise?</>
              )}
            </h1>
            <p className="text-primary-100 text-lg mb-4">
              {isEnglish ? (
                <>A complete guide to understanding professional concierge services, building maintenance, and how they drive business success.</>
              ) : (
                <>Un guide complet pour comprendre les services de conciergerie professionnels et comment ils favorisent le succès commercial.</>
              )}
            </p>
            <div className="flex gap-6 text-sm text-primary-200">
              <span>📅 {isEnglish ? 'April 5, 2026' : '5 avril 2026'}</span>
              <span>⏱️ {isEnglish ? '8 min read' : '8 min de lecture'}</span>
              <span>📁 {isEnglish ? 'Business' : 'Entreprise'}</span>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/services/commercial-cleaning-office-montreal.jpg"
                alt={isEnglish ? 'Professional concierge and commercial cleaning services' : 'Services de conciergerie et nettoyage commercial professionnel'}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          </div>
        </section>

        {/* Content */}
        <article className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 prose prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-12">
              <p className="text-lg leading-relaxed text-gray-700">
                {isEnglish ? (
                  <>A <strong>concierge service</strong> in Montreal is more than just cleaning. It's a comprehensive solution that combines <strong>professional maintenance</strong>, <strong>operational support</strong>, and <strong>customer experience management</strong>. Whether you run an office, manage residential properties, or coordinate Airbnb listings, understanding what concierge services offer is the first step to unlocking significant business benefits.</>
                ) : (
                  <>Un <strong>service de conciergerie</strong> à Montréal est bien plus que du nettoyage. C'est une solution complète qui combine <strong>l'entretien professionnel</strong>, <strong>le support opérationnel</strong>, et <strong>la gestion de l'expérience client</strong>. Que vous gériez un bureau, des propriétés résidentielles ou des annonces Airbnb, comprendre ce que les services de conciergerie offrent est la première étape.</>
                )}
              </p>
            </section>

            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {isEnglish ? (
                  <>What Exactly Is a <strong>Concierge Service</strong>?</>
                ) : (
                  <>Qu'est-ce qu'un <strong>Service de Conciergerie</strong> au Juste?</>
                )}
              </h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                {isEnglish ? (
                  <>At its core, a concierge service provides <strong>building management</strong> and <strong>operational support</strong> for businesses and properties. This includes:</>
                ) : (
                  <>À la base, un service de conciergerie fournit <strong>la gestion d'immeuble</strong> et <strong>le support opérationnel</strong> pour entreprises et propriétés. Cela inclut:</>
                )}
              </p>

              <ul className="space-y-3 text-gray-700 mb-6">
                <li className="flex gap-3">
                  <span className="text-primary-600 font-bold">•</span>
                  <span>
                    {isEnglish ? (
                      <><strong>Daily cleaning</strong> of common areas, offices, and hallways</>
                    ) : (
                      <><strong>Nettoyage quotidien</strong> des zones communes, bureaux et couloirs</>
                    )}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary-600 font-bold">•</span>
                  <span>
                    {isEnglish ? (
                      <><strong>Waste management</strong> and recycling coordination</>
                    ) : (
                      <><strong>Gestion des déchets</strong> et coordination du recyclage</>
                    )}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary-600 font-bold">•</span>
                  <span>
                    {isEnglish ? (
                      <><strong>Maintenance support</strong> and vendor coordination</>
                    ) : (
                      <><strong>Support d'entretien</strong> et coordination de fournisseurs</>
                    )}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary-600 font-bold">•</span>
                  <span>
                    {isEnglish ? (
                      <><strong>Access control</strong> and basic security oversight</>
                    ) : (
                      <><strong>Contrôle d'accès</strong> et supervision de sécurité basique</>
                    )}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary-600 font-bold">•</span>
                  <span>
                    {isEnglish ? (
                      <><strong>Guest reception</strong> and administrative support</>
                    ) : (
                      <><strong>Réception d'invités</strong> et support administratif</>
                    )}
                  </span>
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="mb-12 bg-blue-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {isEnglish ? (
                  <>How <strong>Concierge Services</strong> Benefit Your Business</>
                ) : (
                  <>Comment les <strong>Services de Conciergerie</strong> Bénéficient à votre Entreprise</>
                )}
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {isEnglish ? '1. Save Time & Cut Costs' : '1. Gagnez du Temps et Réduisez les Coûts'}
                  </h3>
                  <p className="text-gray-700">
                    {isEnglish ? (
                      <>Instead of managing <strong>multiple cleaning contractors</strong> and maintenance vendors, a single concierge service handles everything. This <strong>reduces overhead</strong> and eliminates coordination headaches.</>
                    ) : (
                      <>Au lieu de gérer <strong>plusieurs entrepreneurs en nettoyage</strong>, un seul service de conciergerie s'occupe de tout. Cela <strong>réduit les frais généraux</strong>.</>
                    )}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {isEnglish ? '2. Boost Property Value & Appeal' : '2. Augmentez la Valeur et l\'Attrait de votre Propriété'}
                  </h3>
                  <p className="text-gray-700">
                    {isEnglish ? (
                      <>Well-maintained, <strong>clean properties</strong> attract better tenants, command higher rents, and improve overall <strong>tenant satisfaction</strong>. A professional concierge is your property's best investment.</>
                    ) : (
                      <>Les propriétés bien entretenues et <strong>propres</strong> attirent de meilleurs locataires et améliorent la <strong>satisfaction des résidents</strong>.</>
                    )}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {isEnglish ? '3. Improve Tenant & Guest Experience' : '3. Améliorez l\'Expérience des Résidents et des Hôtes'}
                  </h3>
                  <p className="text-gray-700">
                    {isEnglish ? (
                      <>A <strong>responsive concierge team</strong> addresses issues quickly, manages guest requests, and creates a positive living or working environment. For Airbnb hosts, this directly increases ratings and bookings.</>
                    ) : (
                      <>Une <strong>équipe de conciergerie réactive</strong> traite les problèmes rapidement et améliore les cotes des hôtes Airbnb et les réservations.</>
                    )}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {isEnglish ? '4. Ensure Consistency & Reliability' : '4. Assurez la Cohérence et la Fiabilité'}
                  </h3>
                  <p className="text-gray-700">
                    {isEnglish ? (
                      <>Professional concierge teams follow <strong>standard protocols</strong>, use <strong>quality materials</strong>, and deliver <strong>consistent results</strong> day after day. No more surprises—just reliable service.</>
                    ) : (
                      <>Les équipes professionnelles de conciergerie suivent des <strong>protocoles standard</strong> et livrent des <strong>résultats constants</strong>.</>
                    )}
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {isEnglish ? (
                  <>Who Should Consider <strong>Concierge Services</strong>?</>
                ) : (
                  <>Qui Devrait Envisager les <strong>Services de Conciergerie</strong>?</>
                )}
              </h2>

              <ul className="space-y-4 text-gray-700 mb-6">
                <li className="flex gap-4">
                  <span className="text-2xl">🏢</span>
                  <div>
                    <strong>{isEnglish ? 'Office Buildings & Corporate Spaces' : 'Bureaux et Espaces Corporatifs'}</strong>
                    <p className="text-sm text-gray-600 mt-1">
                      {isEnglish ? 'Maintain professional appearance and employee satisfaction' : 'Maintenez l\'apparence professionnelle et la satisfaction des employés'}
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-2xl">🏠</span>
                  <div>
                    <strong>{isEnglish ? 'Residential Buildings & Condos' : 'Immeubles Résidentiels et Condos'}</strong>
                    <p className="text-sm text-gray-600 mt-1">
                      {isEnglish ? 'Improve tenant retention and property valuation' : 'Améliorez la rétention des locataires et l\'évaluation immobilière'}
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-2xl">🏨</span>
                  <div>
                    <strong>{isEnglish ? 'Airbnb & Short-Term Rentals' : 'Airbnb et Locations à Court Terme'}</strong>
                    <p className="text-sm text-gray-600 mt-1">
                      {isEnglish ? 'Increase guest satisfaction and 5-star reviews' : 'Augmentez la satisfaction et les avis 5 étoiles'}
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-2xl">🏪</span>
                  <div>
                    <strong>{isEnglish ? 'Retail & Commercial Centers' : 'Centres Commerciaux et Détail'}</strong>
                    <p className="text-sm text-gray-600 mt-1">
                      {isEnglish ? 'Create clean, inviting spaces for customers' : 'Créez des espaces propres et accueillants'}
                    </p>
                  </div>
                </li>
              </ul>
            </section>

            {/* Call to Action */}
            <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-8 rounded-lg mb-12">
              <h3 className="text-2xl font-bold mb-4">
                {isEnglish ? (
                  <>Ready to Transform Your Property with <strong>Professional Services</strong>?</>
                ) : (
                  <>Prêt à Transformer votre Propriété avec des <strong>Services Professionnels</strong>?</>
                )}
              </h3>
              <p className="mb-6 text-primary-100">
                {isEnglish ? (
                  <>Montreal Concierge Services specializes in commercial cleaning, property management, and Airbnb concierge support across Montreal and Riviera Sud.</>
                ) : (
                  <>Montreal Concierge Services se spécialise dans le nettoyage commercial, la gestion de propriété et le support de conciergerie Airbnb.</>
                )}
              </p>
              <Link
                href="/services"
                className="inline-block px-6 py-3 bg-accent-400 text-primary-900 font-bold rounded-lg hover:bg-accent-500 transition"
              >
                {isEnglish ? 'Explore Our Services' : 'Découvrir nos Services'}
              </Link>
            </section>
          </div>
        </article>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {isEnglish ? 'Frequently Asked Questions' : 'Questions Fréquemment Posées'}
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: isEnglish ? 'What\'s the difference between concierge and cleaning service?' : 'Quelle est la différence entre conciergerie et service de nettoyage?',
                  a: isEnglish ? 'Concierge services include cleaning plus administrative support, maintenance coordination, access control, and guest management. It\'s a comprehensive solution, not just cleaning.' : 'Les services de conciergerie incluent le nettoyage plus le support administratif, la coordination d\'entretien et la gestion des hôtes.',
                },
                {
                  q: isEnglish ? 'How much does professional concierge service cost?' : 'Combien coûte un service de conciergerie professionnel?',
                  a: isEnglish ? 'Cost varies based on building size, service frequency, and scope. Contact us for a free quote tailored to your property.' : 'Le coût varie selon la taille de l\'immeuble et la fréquence. Contactez-nous pour un devis gratuit.',
                },
                {
                  q: isEnglish ? 'Can concierge services help with Airbnb property management?' : 'Les services de conciergerie peuvent-ils aider avec la gestion de propriété Airbnb?',
                  a: isEnglish ? 'Yes! Our Airbnb concierge services include guest check-ins, turnover cleaning, key management, and 24/7 support—proven to increase ratings and bookings.' : 'Oui! Nos services incluent l\'enregistrement, le nettoyage et le support 24/7.',
                },
                {
                  q: isEnglish ? 'How quickly can we start service?' : 'À quelle vitesse pouvons-nous commencer le service?',
                  a: isEnglish ? 'We respond within 60 minutes. Most clients begin service within 1-2 weeks of initial contact.' : 'Nous répondons dans les 60 minutes. La plupart des clients commencent le service en 1-2 semaines.',
                },
              ].map((faq, idx) => (
                <details key={idx} className="bg-white p-6 rounded-lg shadow-sm cursor-pointer group">
                  <summary className="font-bold text-gray-900 flex items-center justify-between">
                    {faq.q}
                    <span className="text-primary-600 group-open:rotate-180 transition">▼</span>
                  </summary>
                  <p className="text-gray-700 mt-4">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {isEnglish ? 'Related Articles' : 'Articles Connexes'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link
                href="/blog/business-concierge-solutions"
                className="p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition group"
              >
                <h3 className="font-bold text-gray-900 group-hover:text-primary-600">
                  {isEnglish ? 'Business Concierge Solutions' : 'Solutions de Conciergerie d\'Entreprise'}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {isEnglish ? 'Optimize your office operations' : 'Optimisez vos opérations de bureau'}
                </p>
              </Link>
              <Link
                href="/blog/airbnb-concierge-guide"
                className="p-6 bg-green-50 rounded-lg hover:bg-green-100 transition group"
              >
                <h3 className="font-bold text-gray-900 group-hover:text-primary-600">
                  {isEnglish ? 'Airbnb Concierge Guide' : 'Guide de Conciergerie Airbnb'}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {isEnglish ? 'Maximize your rental income' : 'Maximisez vos revenus locatifs'}
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
