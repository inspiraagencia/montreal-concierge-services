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
        ? 'Luxury Concierge Services: What Defines a Truly High-End Experience | Montreal'
        : 'Services de Conciergerie Luxe: Ce qui Définit une Véritable Expérience Haut de Gamme | Montréal',
    description:
      locale === 'en'
        ? 'Discover the hallmarks of luxury concierge services and how premium service providers create exceptional, personalized experiences for high-net-worth individuals and executives.'
        : 'Découvrez les caractéristiques des services de conciergerie de luxe et comment les prestataires haut de gamme créent des expériences exceptionnelles et personnalisées.',
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
        <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="mb-6">
              <Link href="/blog" className="text-purple-100 hover:text-white text-sm font-semibold flex items-center gap-2">
                ← {isEnglish ? 'Back to Blog' : 'Retour au Blog'}
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isEnglish ? (
                <>Luxury <strong className="text-purple-200">Concierge Services</strong>: What Defines a Truly High-End Experience</>
              ) : (
                <>Services de <strong className="text-purple-200">Conciergerie Luxe</strong>: Ce qui Définit une Véritable Expérience Haut de Gamme</>
              )}
            </h1>
            <p className="text-purple-100 text-lg mb-4">
              {isEnglish ? (
                <>Understanding the difference between standard concierge and true luxury service. Personalization, discretion, and excellence at every touchpoint.</>
              ) : (
                <>Comprendre la différence entre conciergerie standard et véritable service de luxe. Personnalisation, discrétion et excellence à chaque contact.</>
              )}
            </p>
            <div className="flex gap-6 text-sm text-purple-100">
              <span>📅 {isEnglish ? 'April 2, 2026' : '2 avril 2026'}</span>
              <span>⏱️ {isEnglish ? '8 min read' : '8 min de lecture'}</span>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/team/team-leader-concierge-montreal.jpg"
                alt={isEnglish ? 'Luxury concierge service professional providing high-end assistance' : 'Professionnel de conciergerie de luxe fournissant une assistance haut de gamme'}
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
                  <>True <strong>luxury concierge services</strong> go far beyond basic convenience. They represent a commitment to <strong>personalized excellence</strong>, anticipating needs before they're articulated, and delivering experiences that reflect the client's unique lifestyle and values. For <strong>high-net-worth individuals</strong>, <strong>corporate executives</strong>, and discerning professionals, a premium concierge service isn't a luxury—it's an essential investment in their time and quality of life.</>
                ) : (
                  <>Les véritables <strong>services de conciergerie de luxe</strong> vont bien au-delà de la commodité basique. Ils représentent un engagement envers l'<strong>excellence personnalisée</strong>, anticipant les besoins avant qu'ils ne soient exprimés, et offrant des expériences qui reflètent le style de vie unique du client. Pour les <strong>personnes fortunées</strong>, les <strong>cadres supérieurs</strong> et les professionnels avertis, un service de conciergerie premium n'est pas un luxe—c'est un investissement essentiel dans leur temps et leur qualité de vie.</>
                )}
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {isEnglish ? (
                  <>What Defines <strong>True Luxury Concierge Services</strong></>
                ) : (
                  <>Ce qui Définit les <strong>Véritables Services de Conciergerie Luxe</strong></>
                )}
              </h2>

              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-bold mb-2 text-lg">🎯 <strong>Proactive, Anticipatory Service</strong></h3>
                  <p className="text-sm">True luxury means understanding your preferences, routines, and lifestyle—then seamlessly managing details without waiting for requests. Your concierge team studies your patterns and delivers before you realize you need it.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-lg">🤐 <strong>Absolute Discretion & Confidentiality</strong></h3>
                  <p className="text-sm">Privacy is paramount. Luxury concierge services operate with the highest standards of confidentiality, protecting your personal information, schedules, and preferences with discretion that rivals attorney-client privilege.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-lg">👥 <strong>Dedicated, Knowledgeable Team</strong></h3>
                  <p className="text-sm">You work with the same trusted team who becomes deeply familiar with your needs, preferences, and expectations. Consistency in relationship builds exceptional service quality and personalization.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-lg">🌍 <strong>Global Access & Connections</strong></h3>
                  <p className="text-sm">Premium concierge services provide access to exclusive networks—VIP reservations at impossible-to-book restaurants, invitations to private events, and connections that money alone cannot buy.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-lg">⚡ <strong>Immediate, 24/7 Availability</strong></h3>
                  <p className="text-sm">True luxury never sleeps. Your concierge is always available—whether it's 3 AM or during a holiday—to handle unexpected needs, emergencies, or last-minute changes with grace and efficiency.</p>
                </div>
              </div>
            </section>

            <section className="bg-purple-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {isEnglish ? (
                  <>The <strong>Luxury Concierge Difference</strong>: Beyond Standard Service</>
                ) : (
                  <>La <strong>Différence de Conciergerie Luxe</strong>: Au-delà du Service Standard</>
                )}
              </h2>

              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-bold mb-2">💎 <strong>Exclusivity & Access</strong></h3>
                  <p className="text-sm">Luxury means doors that others cannot open. Access to members-only clubs, private experiences, and exclusive events that define a premium lifestyle.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">🎨 <strong>Lifestyle Curation</strong></h3>
                  <p className="text-sm">Your concierge curates experiences—from wine tastings with sommeliers to art acquisitions, travel itineraries, and cultural experiences—all aligned with your unique preferences.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">📱 <strong>Seamless Coordination</strong></h3>
                  <p className="text-sm">Multiple domains—home, office, travel, personal—managed by a single, unified concierge team that ensures everything works together flawlessly.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">🏆 <strong>Results-Oriented Excellence</strong></h3>
                  <p className="text-sm">Not just completing tasks, but delivering exceptional outcomes. Quality control at every step ensures that every experience meets or exceeds your highest expectations.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {isEnglish ? (
                  <>Who Benefits Most from <strong>Luxury Concierge Services</strong>?</>
                ) : (
                  <>Qui Bénéficie le Plus des <strong>Services de Conciergerie Luxe</strong>?</>
                )}
              </h2>

              <ul className="space-y-4 text-gray-700">
                <li>
                  <strong>{isEnglish ? '💼 C-Suite Executives & Business Leaders' : '💼 Cadres Supérieurs et Leaders Commerciaux'}</strong>
                  <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'Time is your most valuable asset. Premium concierge frees you from administrative burden so you can focus on strategic decisions and leadership.' : 'Le temps est votre bien le plus précieux. La conciergerie premium vous libère du fardeau administratif pour vous concentrer sur les décisions stratégiques.'}</p>
                </li>
                <li>
                  <strong>{isEnglish ? '💰 High-Net-Worth Individuals & Entrepreneurs' : '💰 Personnes Fortunées et Entrepreneurs'}</strong>
                  <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'Maintain privacy while accessing exclusive experiences. Your concierge manages complex needs—from real estate to lifestyle coordination—with total discretion.' : 'Maintenez votre confidentialité tout en accédant à des expériences exclusives. Votre concierge gère des besoins complexes avec discrétion totale.'}</p>
                </li>
                <li>
                  <strong>{isEnglish ? '✈️ Global Travelers & Busy Professionals' : '✈️ Voyageurs Internationaux et Professionnels Occupés'}</strong>
                  <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'Ensure flawless experiences across multiple cities and countries. Your concierge manages homes, offices, and travel with consistency and excellence.' : 'Assurez des expériences impeccables dans plusieurs villes et pays. Votre concierge gère maisons, bureaux et voyages avec excellence.'}</p>
                </li>
                <li>
                  <strong>{isEnglish ? '👔 Corporate Clients & Enterprises' : '👔 Clients Corporatifs et Grandes Entreprises'}</strong>
                  <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'Elevate client experiences and employee satisfaction with premium concierge services that reflect your brand excellence and commitment to quality.' : 'Élevez les expériences client et la satisfaction des employés avec des services de conciergerie premium qui reflètent votre excellence de marque.'}</p>
                </li>
              </ul>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-purple-700 to-purple-900 text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">
                {isEnglish ? 'Experience True Luxury Service' : 'Expérimentez le Véritable Service de Luxe'}
              </h3>
              <Link
                href="/services"
                className="inline-block px-6 py-3 bg-white text-purple-700 font-bold rounded-lg hover:bg-gray-100 transition"
              >
                {isEnglish ? 'Explore Premium Services' : 'Découvrir les Services Premium'}
              </Link>
            </section>
          </div>
        </article>

        {/* FAQ */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {isEnglish ? 'Frequently Asked Questions About Luxury Concierge' : 'Questions Fréquemment Posées sur la Conciergerie Luxe'}
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: isEnglish ? 'How is luxury concierge different from standard concierge?' : 'Comment la conciergerie de luxe diffère-t-elle de la conciergerie standard?',
                  a: isEnglish ? 'Luxury concierge is proactive rather than reactive. We anticipate needs, provide 24/7 availability, maintain absolute discretion, and provide access to exclusive networks that standard services cannot.' : 'La conciergerie de luxe est proactive plutôt que réactive. Nous anticipons les besoins, offrons une disponibilité 24/7, maintenons la discrétion absolue et donnons accès à des réseaux exclusifs.',
                },
                {
                  q: isEnglish ? 'What services are included in premium concierge?' : 'Quels services sont inclus dans la conciergerie premium?',
                  a: isEnglish ? 'Everything from lifestyle curation, event planning, travel coordination, household management, to accessing exclusive experiences and managing complex multi-domain needs with seamless coordination.' : 'Tout, de la curation de style de vie, à la planification d\'événements, à la coordination de voyages, à la gestion de maison et l\'accès à des expériences exclusives.',
                },
                {
                  q: isEnglish ? 'How do you maintain confidentiality?' : 'Comment maintenez-vous la confidentialité?',
                  a: isEnglish ? 'Discretion is fundamental to our service model. We operate under strict confidentiality agreements, limit team access to sensitive information, and maintain security protocols equivalent to financial institutions.' : 'La discrétion est fondamentale à notre modèle de service. Nous opérons sous des accords de confidentialité stricts et maintenons des protocoles de sécurité rigoureux.',
                },
                {
                  q: isEnglish ? 'Is luxury concierge available 24/7?' : 'La conciergerie de luxe est-elle disponible 24/7?',
                  a: isEnglish ? 'Yes. True luxury service means we\'re always available—nights, weekends, holidays. Your needs don\'t follow business hours, and neither do we.' : 'Oui. Le véritable service de luxe signifie que nous sommes toujours disponibles—nuits, fins de semaine, jours fériés. Vos besoins ne suivent pas les heures de bureau.',
                },
              ].map((faq, idx) => (
                <details key={idx} className="bg-white p-6 rounded-lg shadow-sm cursor-pointer group">
                  <summary className="font-bold text-gray-900 flex items-center justify-between">
                    {faq.q}
                    <span className="text-purple-600 group-open:rotate-180 transition">▼</span>
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
