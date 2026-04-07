import { useLocale } from 'next-intl';
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
        ? 'Concierge Services for Apartments & Condominiums: What Property Owners Should Expect | Montreal'
        : 'Services de Conciergerie pour Appartements et Condominiums: Ce que les Propriétaires Doivent Attendre | Montréal',
    description:
      locale === 'en'
        ? 'Learn how professional concierge services for residential buildings enhance property value, tenant satisfaction, and operational efficiency. Complete guide for property owners.'
        : 'Découvrez comment les services professionnels de conciergerie pour immeubles résidentiels améliorent la valeur de la propriété, la satisfaction des locataires et l\'efficacité opérationnelle.',
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
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="mb-6">
              <Link href="/blog" className="text-blue-100 hover:text-white text-sm font-semibold flex items-center gap-2">
                ← {isEnglish ? 'Back to Blog' : 'Retour au Blog'}
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isEnglish ? (
                <>Concierge Services for <strong className="text-blue-200">Apartments & Condominiums</strong>: What Property Owners Should Expect</>
              ) : (
                <>Services de Conciergerie pour <strong className="text-blue-200">Appartements et Condominiums</strong>: Ce que les Propriétaires Doivent Attendre</>
              )}
            </h1>
            <p className="text-blue-100 text-lg mb-4">
              {isEnglish ? (
                <>Enhance property value, improve tenant retention, and create a premium living experience. Complete guide for residential building owners and managers.</>
              ) : (
                <>Améliorez la valeur de la propriété, améliorez la rétention des locataires et créez une expérience de vie premium. Guide complet pour les propriétaires et gestionnaires d\'immeubles résidentiels.</>
              )}
            </p>
            <div className="flex gap-6 text-sm text-blue-100">
              <span>📅 {isEnglish ? 'April 1, 2026' : '1 avril 2026'}</span>
              <span>⏱️ {isEnglish ? '7 min read' : '7 min de lecture'}</span>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/hero/hero-cleaning.jpg"
                alt={isEnglish ? 'Modern apartment building with professional concierge services in Montreal' : 'Immeuble d\'appartements moderne avec services de conciergerie professionnels'}
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
          <div className="max-w-4xl mx-auto px-6 space-y-8">
            <section>
              <p className="text-lg text-gray-700 leading-relaxed">
                {isEnglish ? (
                  <>For property owners and managers, <strong>professional concierge services for residential buildings</strong> represent a strategic investment that pays dividends in <strong>tenant satisfaction</strong>, <strong>property value</strong>, and operational peace of mind. In Montreal's competitive rental market, the difference between a standard apartment building and a sought-after residential community often comes down to the quality of <strong>concierge and building management services</strong>.</>
                ) : (
                  <>Pour les propriétaires et les gestionnaires, les <strong>services professionnels de conciergerie pour immeubles résidentiels</strong> représentent un investissement stratégique qui offre des rendements en <strong>satisfaction des locataires</strong>, <strong>valeur de la propriété</strong> et tranquillité d'esprit opérationnelle. Sur le marché locatif concurrentiel de Montréal, la différence entre un immeuble d'appartements standard et une communauté résidentielle recherchée repose souvent sur la qualité des <strong>services de conciergerie et de gestion d'immeuble</strong>.</>
                )}
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {isEnglish ? (
                  <>What <strong>Concierge Services</strong> Include for Residential Buildings</>
                ) : (
                  <>Ce que les <strong>Services de Conciergerie</strong> Incluent pour les Immeubles Résidentiels</>
                )}
              </h2>

              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>24/7 Building Security & Access Control</strong> – Badge management, visitor screening, emergency response</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>Common Area Maintenance</strong> – Lobbies, hallways, gardens, and shared spaces kept pristine and inviting</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>Package & Mail Management</strong> – Organized receiving and delivery system that prevents theft and confusion</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>Tenant Support & Communication</strong> – First point of contact for maintenance requests, complaints, and building information</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>Vendor & Service Coordination</strong> – Scheduling and managing contractors, maintenance, repairs, and building services</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>Cleaning & Sanitation Standards</strong> – Daily upkeep of shared spaces, ensuring health and safety compliance</span>
                </li>
              </ul>
            </section>

            <section className="bg-blue-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {isEnglish ? (
                  <>Why Residential Buildings Need <strong>Professional Concierge Services</strong></>
                ) : (
                  <>Pourquoi les Immeubles Résidentiels Ont Besoin de <strong>Services Professionnels de Conciergerie</strong></>
                )}
              </h2>

              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-bold mb-2">📈 <strong>Increase Property Value & Marketability</strong></h3>
                  <p className="text-sm">Buildings with professional concierge services command 10-15% higher rental rates and attract premium tenants. It's a visible sign of quality management and tenant care.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">😊 <strong>Boost Tenant Satisfaction & Retention</strong></h3>
                  <p className="text-sm">Happy tenants stay longer and refer friends. Professional concierge creates a welcoming, responsive environment that makes residents feel valued and supported.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">⚡ <strong>Reduce Management Workload</strong></h3>
                  <p className="text-sm">Stop being the 24/7 problem solver. Concierge staff handle tenant requests, emergency coordination, and day-to-day issues—freeing your management team to focus on strategic decisions.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">💵 <strong>Improve Operational Efficiency & Lower Costs</strong></h3>
                  <p className="text-sm">Professional vendor coordination, centralized service management, and proactive maintenance prevent costly emergency repairs and ensure services are delivered efficiently.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {isEnglish ? (
                  <>Expected <strong>Outcomes & Benefits</strong> for Property Owners</>
                ) : (
                  <>Résultats et <strong>Avantages Attendus</strong> pour les Propriétaires</>
                )}
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    metric: '10-15%',
                    label: isEnglish ? 'Increased Rental Rates' : 'Augmentation des Tarifs Locatifs',
                    desc: isEnglish ? 'Professional concierge justifies premium pricing' : 'La conciergerie professionnelle justifie les tarifs premium',
                  },
                  {
                    metric: '30%',
                    label: isEnglish ? 'Higher Tenant Retention' : 'Rétention Plus Élevée des Locataires',
                    desc: isEnglish ? 'Satisfied tenants renew leases and stay longer' : 'Les locataires satisfaits renouvellent les baux et restent plus longtemps',
                  },
                  {
                    metric: '40%',
                    label: isEnglish ? 'Fewer Complaints & Issues' : 'Moins de Plaintes et de Problèmes',
                    desc: isEnglish ? 'Proactive service prevents and resolves problems quickly' : 'Le service proactif prévient et résout rapidement les problèmes',
                  },
                  {
                    metric: '24/7',
                    label: isEnglish ? 'Tenant Support Available' : 'Support Locataire Disponible',
                    desc: isEnglish ? 'Professional response to any situation, day or night' : 'Réponse professionnelle à toute situation, jour ou nuit',
                  },
                ].map((benefit, idx) => (
                  <div key={idx} className="p-6 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{benefit.metric}</div>
                    <h3 className="font-bold text-gray-900 mb-2">{benefit.label}</h3>
                    <p className="text-sm text-gray-600">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {isEnglish ? (
                  <>Types of <strong>Residential Buildings</strong> That Benefit from Concierge</>
                ) : (
                  <>Types d'<strong>Immeubles Résidentiels</strong> qui Bénéficient de Conciergerie</>
                )}
              </h2>

              <ul className="space-y-3 text-gray-700">
                <li><strong>🏢 Luxury Condominiums</strong> – Premium properties where service quality defines competitive advantage</li>
                <li><strong>🏠 Apartment Complexes (100+ units)</strong> – Require professional management to handle scale and tenant diversity</li>
                <li><strong>🏘️ Mixed-Use Residential Buildings</strong> – Retail on ground floor + residential + commercial spaces requiring coordinated management</li>
                <li><strong>🌆 Urban Residential High-Rises</strong> – Security, access control, and tenant services are critical</li>
                <li><strong>🤝 Co-housing & Cooperative Buildings</strong> – Community-oriented spaces benefit from professional relationship management</li>
              </ul>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">
                {isEnglish ? 'Enhance Your Residential Property Today' : 'Améliorez Votre Propriété Résidentielle Dès Maintenant'}
              </h3>
              <Link
                href="/services"
                className="inline-block px-6 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-gray-100 transition"
              >
                {isEnglish ? 'Explore Residential Services' : 'Découvrir les Services Résidentiels'}
              </Link>
            </section>
          </div>
        </article>

        {/* FAQ */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {isEnglish ? 'FAQs About Residential Concierge Services' : 'FAQ sur les Services de Conciergerie Résidentielle'}
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: isEnglish ? 'What is the cost of concierge services for apartment buildings?' : 'Quel est le coût des services de conciergerie pour les immeubles d\'appartements?',
                  a: isEnglish ? 'Costs vary by building size and service scope. Small buildings (20-50 units): $2,000-3,500/month. Medium (50-150 units): $3,500-6,000/month. Large (150+ units): Custom pricing. ROI typically recovers within 12 months through increased rents and reduced turnover.' : 'Les coûts varient selon la taille de l\'immeuble et l\'étendue des services. Petits immeubles: 2 000-3 500$/mois. Moyens: 3 500-6 000$/mois. Grands: prix personnalisé. Le ROI se récupère généralement en 12 mois.',
                },
                {
                  q: isEnglish ? 'How does concierge service reduce tenant turnover?' : 'Comment le service de conciergerie réduit-il le roulement des locataires?',
                  a: isEnglish ? 'Professional concierge creates a premium living experience. Tenants feel valued when their concerns are addressed promptly, problems solved efficiently, and building maintained beautifully. This directly correlates with longer tenancies and higher satisfaction scores.' : 'La conciergerie professionnelle crée une expérience de vie premium. Les locataires se sentent valorisés lorsque leurs préoccupations sont traitées rapidement. Cela se traduit directement par des baux plus longs et une satisfaction plus élevée.',
                },
                {
                  q: isEnglish ? 'Can concierge services handle emergency maintenance?' : 'Les services de conciergerie peuvent-ils gérer les réparations d\'urgence?',
                  a: isEnglish ? 'Yes. Professional concierge is trained and equipped to respond to emergencies—flooding, HVAC failure, security issues—immediately. They coordinate contractors, manage repairs, and keep you and tenants informed throughout the process.' : 'Oui. La conciergerie professionnelle est formée et équipée pour répondre aux urgences—inondations, défaillance du climatiseur, problèmes de sécurité—immédiatement et efficacement.',
                },
                {
                  q: isEnglish ? 'Will concierge services be available 24/7?' : 'Les services de conciergerie seront-ils disponibles 24h/24, 7j/7?',
                  a: isEnglish ? 'Yes. Professional building concierge operates 24/7 for emergencies and tenant support. Standard hours can be customized—some buildings have day service plus 24-hour emergency availability. We\'ll design the schedule that fits your property\'s needs.' : 'Oui. La conciergerie d\'immeuble professionnelle fonctionne 24h/24, 7j/7 pour les urgences et le support des locataires. Les horaires standard peuvent être personnalisés selon les besoins de votre propriété.',
                },
              ].map((faq, idx) => (
                <details key={idx} className="bg-white p-6 rounded-lg shadow-sm cursor-pointer group">
                  <summary className="font-bold text-gray-900 flex items-center justify-between">
                    {faq.q}
                    <span className="text-blue-600 group-open:rotate-180 transition">▼</span>
                  </summary>
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
