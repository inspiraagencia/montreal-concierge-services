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
        ? 'Complete Airbnb Concierge Guide: Maximize Your Rental Income | Montreal'
        : 'Guide Complet des Services de Conciergerie Airbnb: Maximisez vos Revenus Locatifs | Montréal',
    description:
      locale === 'en'
        ? 'Master Airbnb property management with professional concierge services. Increase guest satisfaction, boost booking rates, and maximize rental income through expert property management.'
        : 'Maîtrisez la gestion de propriété Airbnb avec des services de conciergerie professionnels. Augmentez la satisfaction des clients, les taux de réservation et les revenus locatifs.',
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
        <section className="relative bg-gradient-to-br from-orange-900 via-orange-800 to-orange-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="mb-6">
              <Link href="/blog" className="text-orange-100 hover:text-white text-sm font-semibold flex items-center gap-2">
                ← {isEnglish ? 'Back to Blog' : 'Retour au Blog'}
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isEnglish ? (
                <>Complete <strong className="text-orange-200">Airbnb Concierge Guide</strong>: Maximize Your Rental Income</>
              ) : (
                <>Guide Complet des <strong className="text-orange-200">Services de Conciergerie Airbnb</strong>: Maximisez vos Revenus Locatifs</>
              )}
            </h1>
            <p className="text-orange-100 text-lg mb-4">
              {isEnglish ? (
                <>Professional property management that increases guest satisfaction, improves ratings, and maximizes bookings. Everything you need to know about Airbnb concierge services.</>
              ) : (
                <>Gestion de propriété professionnelle qui augmente la satisfaction des clients, améliore les cotes et maximise les réservations. Tout ce que vous devez savoir sur les services de conciergerie Airbnb.</>
              )}
            </p>
            <div className="flex gap-6 text-sm text-orange-100">
              <span>📅 {isEnglish ? 'March 31, 2026' : '31 mars 2026'}</span>
              <span>⏱️ {isEnglish ? '10 min read' : '10 min de lecture'}</span>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/services/airbnb-concierge.jpg"
                alt={isEnglish ? 'Professional Airbnb property management and concierge services in Montreal' : 'Gestion professionnelle de propriété Airbnb et services de conciergerie'}
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
                  <>Managing an <strong>Airbnb property</strong> is more than just listing it online. To maximize revenue and maintain the <strong>5-star ratings</strong> that drive bookings, you need professional <strong>concierge and property management services</strong>. In Montreal's booming short-term rental market, properties with excellent <strong>guest experiences and seamless management</strong> earn 30-50% more than those with basic management. This complete guide covers everything <strong>property owners</strong> need to know about <strong>Airbnb concierge services</strong>.</>
                ) : (
                  <>Gérer une <strong>propriété Airbnb</strong> n'est pas seulement la mettre en ligne. Pour maximiser vos revenus et maintenir les <strong>évaluations 5 étoiles</strong> qui génèrent des réservations, vous avez besoin de services de <strong>conciergerie et gestion de propriété professionnels</strong>. Sur le marché montréalais florissant des locations à court terme, les propriétés avec des <strong>expériences d'hôtes excellentes</strong> gagnent 30-50% plus que celles avec une gestion basique.</>
                )}
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {isEnglish ? (
                  <>What <strong>Airbnb Concierge Services</strong> Include</>
                ) : (
                  <>Ce que les <strong>Services de Conciergerie Airbnb</strong> Incluent</>
                )}
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: '👤',
                    title: isEnglish ? 'Guest Welcome & Check-in' : 'Accueil et Enregistrement des Clients',
                    desc: isEnglish ? 'Professional greeting, key handoff, building orientation, house rules, WiFi setup' : 'Accueil professionnel, remise des clés, orientation, règles, installation WiFi',
                  },
                  {
                    icon: '🏠',
                    title: isEnglish ? 'Professional Turnover Cleaning' : 'Nettoyage Professionnel Entre Clients',
                    desc: isEnglish ? 'Deep cleaning between guests, linen changes, restocking supplies, quality inspections' : 'Nettoyage professionnel entre les clients, changement de linge, réapprovisionnement',
                  },
                  {
                    icon: '🔧',
                    title: isEnglish ? 'Maintenance & Emergency Response' : 'Maintenance et Réponse aux Urgences',
                    desc: isEnglish ? 'Quick repairs, maintenance coordination, 24/7 emergency availability, guest satisfaction' : 'Réparations rapides, coordination maintenance, disponibilité 24/7 aux urgences',
                  },
                  {
                    icon: '📞',
                    title: isEnglish ? 'Guest Support & Communication' : 'Support Client et Communication',
                    desc: isEnglish ? 'Answer questions, handle complaints, provide local recommendations, resolve issues fast' : 'Répondre aux questions, traiter les plaintes, fournir des recommandations locales',
                  },
                  {
                    icon: '🎁',
                    title: isEnglish ? 'Welcome Amenities & Extras' : 'Cadeaux de Bienvenue et Suppléments',
                    desc: isEnglish ? 'Welcome baskets, local maps, guest guides, special touches that earn 5-star reviews' : 'Paniers de bienvenue, cartes locales, guides, touches spéciales pour 5 étoiles',
                  },
                  {
                    icon: '📋',
                    title: isEnglish ? 'Booking & Calendar Management' : 'Gestion des Réservations et Calendrier',
                    desc: isEnglish ? 'Coordinate availability, manage multiple platforms, optimize pricing, maximize occupancy' : 'Gérer la disponibilité, plateformes multiples, optimiser les prix, maximiser l\'occupation',
                  },
                ].map((service, idx) => (
                  <div key={idx} className="p-6 bg-orange-50 rounded-lg border-l-4 border-orange-600">
                    <div className="text-3xl mb-3">{service.icon}</div>
                    <h3 className="font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-600">{service.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-orange-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {isEnglish ? (
                  <>How <strong>Professional Concierge</strong> Increases Your Airbnb Revenue</>
                ) : (
                  <>Comment la <strong>Conciergerie Professionnelle</strong> Augmente vos Revenus Airbnb</>
                )}
              </h2>

              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-bold mb-2">⭐ <strong>Higher Ratings = More Bookings</strong></h3>
                  <p className="text-sm">Properties with 5-star ratings get 30-40% more bookings than 4-star properties. Professional concierge ensures guest satisfaction at every touchpoint, directly driving higher ratings and more bookings.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">💰 <strong>Premium Pricing Power</strong></h3>
                  <p className="text-sm">5-star properties command 15-25% higher nightly rates. Excellent reviews and guest experiences justify premium pricing that competitors with standard management cannot achieve.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">📅 <strong>Maximum Occupancy</strong></h3>
                  <p className="text-sm">Professional management minimizes vacancy periods. Turnover coordination, quick guest communications, and responsive maintenance maximize bookable days and revenue.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">🛡️ <strong>Property Protection & Risk Reduction</strong></h3>
                  <p className="text-sm">Professional management means property inspections, documented maintenance, guest rule enforcement, and issue documentation—protecting your investment from damage and liability.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">😌 <strong>Complete Peace of Mind</strong></h3>
                  <p className="text-sm">Stop managing overnight emergencies, guest complaints, and cleaning logistics. Professional concierge handles everything while you enjoy passive income and genuine peace of mind.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {isEnglish ? (
                  <>Expected <strong>ROI & Financial Impact</strong></>
                ) : (
                  <>Retour sur Investissement et <strong>Impact Financier Attendu</strong></>
                )}
              </h2>

              <div className="space-y-4 text-gray-700">
                <p>
                  {isEnglish ? (
                    <>Professional <strong>Airbnb concierge services</strong> typically cost 15-25% of gross booking revenue. This investment consistently delivers returns that far exceed the cost:</>
                  ) : (
                    <>Les services de <strong>conciergerie Airbnb</strong> professionnels coûtent généralement 15-25% des revenus bruts. Cet investissement génère systématiquement des rendements bien supérieurs au coût:</>
                  )}
                </p>
                <ul className="space-y-2 text-sm">
                  <li>✅ {isEnglish ? '30-40% increase in booking rates (5-star properties get more inquiries)' : 'Augmentation de 30-40% des taux de réservation (propriétés 5 étoiles obtiennent plus de demandes)'}</li>
                  <li>✅ {isEnglish ? '15-25% premium pricing ability (can charge more per night)' : 'Capacité de tarification premium de 15-25% (peut facturer plus par nuit)'}</li>
                  <li>✅ {isEnglish ? '10-20% higher annual revenue through maximized occupancy' : 'Augmentation de 10-20% des revenus annuels grâce à l\'occupation maximale'}</li>
                  <li>✅ {isEnglish ? 'Reduced damage & liability claims = savings on insurance and repairs' : 'Réduction des sinistres et réclamations = économies sur l\'assurance et les réparations'}</li>
                  <li>✅ {isEnglish ? 'Typical payback: 8-12 months. Then pure profit.' : 'Retour typique: 8-12 mois. Puis profit pur.'}</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {isEnglish ? (
                  <>5 Key Strategies to <strong>Maximize Airbnb Success</strong></>
                ) : (
                  <>5 Stratégies Clés pour <strong>Maximiser le Succès Airbnb</strong></>
                )}
              </h2>

              <ul className="space-y-3 text-gray-700">
                <li>
                  <strong>1. Invest in Professional Photography & Listings</strong>
                  <p className="text-sm text-gray-600">Professional photos and compelling descriptions increase inquiry rates by 50%+. First impressions matter in the digital world.</p>
                </li>
                <li>
                  <strong>2. Maintain Impeccable Property Condition</strong>
                  <p className="text-sm text-gray-600">Clean, well-maintained properties are the foundation of 5-star ratings. Professional cleaning between guests is non-negotiable.</p>
                </li>
                <li>
                  <strong>3. Provide Exceptional Guest Experiences</strong>
                  <p className="text-sm text-gray-600">Welcome amenities, thoughtful touches, and responsive support transform good reviews into excellent ones. Small details drive ratings.</p>
                </li>
                <li>
                  <strong>4. Respond Quickly to Guest Needs</strong>
                  <p className="text-sm text-gray-600">24/7 availability for questions, requests, and emergencies demonstrates that you care. Speed and professionalism earn 5-star reviews.</p>
                </li>
                <li>
                  <strong>5. Optimize Pricing & Availability</strong>
                  <p className="text-sm text-gray-600">Adjust pricing based on demand, events, and seasonality. Balance maximum revenue with consistent occupancy to maintain 5-star status.</p>
                </li>
              </ul>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-orange-700 to-orange-900 text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">
                {isEnglish ? 'Ready to Maximize Your Airbnb Income?' : 'Prêt à Maximiser vos Revenus Airbnb?'}
              </h3>
              <Link
                href="/services"
                className="inline-block px-6 py-3 bg-white text-orange-700 font-bold rounded-lg hover:bg-gray-100 transition"
              >
                {isEnglish ? 'Explore Airbnb Services' : 'Découvrir les Services Airbnb'}
              </Link>
            </section>
          </div>
        </article>

        {/* FAQ */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {isEnglish ? 'FAQs About Airbnb Concierge Services' : 'FAQ sur les Services de Conciergerie Airbnb'}
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: isEnglish ? 'What percentage of revenue does Airbnb concierge typically cost?' : 'Quel pourcentage de revenus coûte la conciergerie Airbnb?',
                  a: isEnglish ? 'Typically 15-25% of gross booking revenue, depending on service level and property size. For a $2,000/month property, expect $300-500/month. This investment delivers 30-40% increased revenue through higher ratings and occupancy.' : 'Généralement 15-25% des revenus bruts de réservation, selon le niveau de service et la taille de la propriété. Pour une propriété de 2 000$/mois, attendez-vous à 300-500$/mois. Cet investissement génère 30-40% de revenus supplémentaires.',
                },
                {
                  q: isEnglish ? 'How does professional management improve Airbnb ratings?' : 'Comment la gestion professionnelle améliore-t-elle les évaluations Airbnb?',
                  a: isEnglish ? 'Professional concierge ensures every guest interaction is positive—from clean apartments to responsive support to thoughtful amenities. Happy guests leave 5-star reviews. These ratings directly increase booking frequency and allow premium pricing.' : 'La conciergerie professionnelle s\'assure que chaque interaction avec les clients est positive—appartements propres, support réactif, équipements réfléchis. Les clients satisfaits laissent des avis 5 étoiles. Ces évaluations augmentent directement la fréquence de réservation.',
                },
                {
                  q: isEnglish ? 'Can concierge handle multiple Airbnb properties?' : 'La conciergerie peut-elle gérer plusieurs propriétés Airbnb?',
                  a: isEnglish ? 'Yes. Many property owners have 2-5 Airbnb listings. Professional concierge can manage multiple properties efficiently, coordinating cleaning, guest communication, and maintenance across all units with unified systems.' : 'Oui. De nombreux propriétaires ont 2-5 annonces Airbnb. La conciergerie professionnelle peut gérer plusieurs propriétés efficacement, en coordonnant le nettoyage, la communication avec les clients et la maintenance.',
                },
                {
                  q: isEnglish ? 'What happens if there\'s a guest complaint or emergency?' : 'Que se passe-t-il s\'il y a une plainte ou une urgence de client?',
                  a: isEnglish ? 'Professional concierge responds immediately (usually within 30 minutes for emergencies, 2 hours for requests). They handle maintenance issues, resolve complaints, and document everything. You\'re notified but protected from direct involvement.' : 'La conciergerie professionnelle répond immédiatement (généralement dans les 30 minutes pour les urgences). Elle gère les problèmes de maintenance, résout les plaintes et documente tout. Vous êtes avisé mais protégé de l\'implication directe.',
                },
                {
                  q: isEnglish ? 'How long until I see increased revenue?' : 'Combien de temps avant de voir une augmentation des revenus?',
                  a: isEnglish ? 'Most property owners see results within 60-90 days—higher ratings drive more bookings and allow price increases. Full ROI typically achieved within 8-12 months, after which additional revenue is nearly pure profit.' : 'La plupart des propriétaires voient des résultats en 60-90 jours—des évaluations plus élevées génèrent plus de réservations. Le retour complet est généralement atteint en 8-12 mois, après quoi les revenus supplémentaires sont presque purs profits.',
                },
              ].map((faq, idx) => (
                <details key={idx} className="bg-white p-6 rounded-lg shadow-sm cursor-pointer group">
                  <summary className="font-bold text-gray-900 flex items-center justify-between">
                    {faq.q}
                    <span className="text-orange-600 group-open:rotate-180 transition">▼</span>
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
