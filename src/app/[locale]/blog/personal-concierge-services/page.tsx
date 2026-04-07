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
        ? 'Personal Concierge Services: Benefits & Services | Montreal'
        : 'Services de Conciergerie Personnelle: Avantages et Services | Montréal',
    description:
      locale === 'en'
        ? 'Discover how personal concierge services save time for busy professionals, families, and executives. Learn what services are included and who benefits most.'
        : 'Découvrez comment les services de conciergerie personnelle font gagner du temps aux professionnels occupés et aux cadres supérieurs.',
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
        <section className="relative bg-gradient-to-br from-accent-600 to-accent-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="mb-6">
              <Link href="/blog" className="text-accent-100 hover:text-white text-sm font-semibold flex items-center gap-2">
                ← {isEnglish ? 'Back to Blog' : 'Retour au Blog'}
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isEnglish ? (
                <>Personal <strong className="text-white">Concierge Services</strong>: What They Include & Who Benefits</>
              ) : (
                <>Services de <strong className="text-white">Conciergerie Personnelle</strong>: Ce qu'ils Incluent et qui en Bénéficie</>
              )}
            </h1>
            <p className="text-accent-100 text-lg mb-4">
              {isEnglish ? (
                <>Save time, reduce stress, and focus on what matters most with professional personal assistant services.</>
              ) : (
                <>Gagnez du temps, réduisez le stress et concentrez-vous sur ce qui compte le plus.</>
              )}
            </p>
            <div className="flex gap-6 text-sm text-accent-100">
              <span>📅 {isEnglish ? 'April 4, 2026' : '4 avril 2026'}</span>
              <span>⏱️ {isEnglish ? '7 min read' : '7 min de lecture'}</span>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/services/property-maintenance-riviera-sud.jpg"
                alt={isEnglish ? 'Personal concierge services for busy professionals' : 'Services de conciergerie personnelle pour professionnels occupés'}
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
                  <>Modern professionals are busier than ever. Between demanding work schedules, family commitments, and administrative tasks, <strong>personal concierge services</strong> offer a lifeline. A <strong>professional personal assistant</strong> handles the everyday tasks that consume your time, freeing you to focus on your career, family, and priorities that matter most.</>
                ) : (
                  <>Les professionnels modernes sont plus occupés que jamais. Entre les horaires de travail exigeants, les engagements familiaux et les tâches administratives, les <strong>services de conciergerie personnelle</strong> offrent une bouée de sauvetage.</>
                )}
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {isEnglish ? (
                  <>What <strong>Personal Concierge Services</strong> Include</>
                ) : (
                  <>Ce que les <strong>Services de Conciergerie Personnelle</strong> Incluent</>
                )}
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: '📦',
                    title: isEnglish ? 'Errand & Task Management' : 'Gestion des Courses et Tâches',
                    desc: isEnglish ? 'Shopping, returns, deliveries, and household errands handled professionally' : 'Achats, retours, livraisons gérés professionnellement',
                  },
                  {
                    icon: '📅',
                    title: isEnglish ? 'Appointment Scheduling' : 'Prise de Rendez-vous',
                    desc: isEnglish ? 'Medical, dental, and professional appointments coordinated seamlessly' : 'Rendez-vous médicaux, dentaires et professionnels coordonnés',
                  },
                  {
                    icon: '✈️',
                    title: isEnglish ? 'Travel Coordination' : 'Coordination de Voyage',
                    desc: isEnglish ? 'Flight bookings, hotels, itineraries, and travel logistics simplified' : 'Réservations de vols, hôtels et itinéraires simplifiés',
                  },
                  {
                    icon: '🎉',
                    title: isEnglish ? 'Event Planning' : 'Organisation d\'Événements',
                    desc: isEnglish ? 'Parties, dinners, and celebrations planned and executed flawlessly' : 'Fêtes, dîners et célébrations planifiés professionnellement',
                  },
                  {
                    icon: '🏠',
                    title: isEnglish ? 'Household Management' : 'Gestion de Maison',
                    desc: isEnglish ? 'Cleaners, contractors, and home services coordinated and managed' : 'Nettoyeurs, entrepreneurs et services de maison coordonnés',
                  },
                  {
                    icon: '💼',
                    title: isEnglish ? 'Administrative Support' : 'Support Administratif',
                    desc: isEnglish ? 'Bill payments, document management, and paperwork handling' : 'Paiements de factures, gestion de documents',
                  },
                ].map((service, idx) => (
                  <div key={idx} className="p-6 bg-gray-50 rounded-lg border-l-4 border-accent-600">
                    <div className="text-3xl mb-3">{service.icon}</div>
                    <h3 className="font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-600">{service.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-amber-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {isEnglish ? (
                  <>Who Benefits Most from <strong>Personal Concierge Services</strong>?</>
                ) : (
                  <>Qui Bénéficie le Plus des <strong>Services de Conciergerie Personnelle</strong>?</>
                )}
              </h2>

              <ul className="space-y-4 text-gray-700">
                <li>
                  <strong>{isEnglish ? '💼 Busy Executives & Professionals' : '💼 Cadres et Professionnels Occupés'}</strong>
                  <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'Reclaim 5+ hours per week for strategic work and family time' : 'Récupérez 5+ heures par semaine pour le travail stratégique'}</p>
                </li>
                <li>
                  <strong>{isEnglish ? '👨‍👩‍👧‍👦 Busy Families' : '👨‍👩‍👧‍👦 Familles Occupées'}</strong>
                  <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'Manage kids\' schedules, school coordination, and household tasks seamlessly' : 'Gérez les horaires des enfants et les tâches ménagères'}</p>
                </li>
                <li>
                  <strong>{isEnglish ? '✈️ Frequent Travelers' : '✈️ Voyageurs Fréquents'}</strong>
                  <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'Stay organized while traveling with someone managing your home and errands' : 'Restez organisé pendant les voyages avec quelqu\'un gérant votre maison'}</p>
                </li>
                <li>
                  <strong>{isEnglish ? '👴 Seniors & Busy Parents' : '👴 Personnes Âgées et Parents Occupés'}</strong>
                  <p className="text-sm text-gray-600 mt-1">{isEnglish ? 'Get support for daily tasks and medical appointments with compassionate care' : 'Obtenez du support pour les tâches quotidiennes avec compassion'}</p>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {isEnglish ? (
                  <>Real Benefits: <strong>Time & Money Savings</strong></>
                ) : (
                  <>Avantages Réels: <strong>Économies de Temps et d'Argent</strong></>
                )}
              </h2>

              <div className="space-y-4 text-gray-700">
                <p>
                  {isEnglish ? (
                    <>A <strong>personal concierge</strong> is an investment that pays for itself through time reclaimed and stress reduced. Consider this:</>
                  ) : (
                    <>Un <strong>concierge personnel</strong> est un investissement qui se rembourse par le temps récupéré et le stress réduit.</>
                  )}
                </p>
                <ul className="space-y-2 text-sm">
                  <li>✅ {isEnglish ? '5 hours/week saved = 260 hours/year' : '5 heures/semaine économisées = 260 heures/an'}</li>
                  <li>✅ {isEnglish ? 'Stress reduced = better health and focus' : 'Stress réduit = meilleure santé et concentration'}</li>
                  <li>✅ {isEnglish ? 'Professional handling = fewer mistakes and better results' : 'Gestion professionnelle = moins d\'erreurs'}</li>
                </ul>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-accent-600 to-accent-700 text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">
                {isEnglish ? (
                  <>Ready for <strong>Professional Support</strong>?</>
                ) : (
                  <>Prêt pour un <strong>Support Professionnel</strong>?</>
                )}
              </h3>
              <Link
                href="/services"
                className="inline-block px-6 py-3 bg-white text-accent-600 font-bold rounded-lg hover:bg-gray-100 transition"
              >
                {isEnglish ? 'Explore Our Services' : 'Découvrir nos Services'}
              </Link>
            </section>
          </div>
        </article>

        {/* FAQ */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {isEnglish ? 'Frequently Asked Questions' : 'Questions Fréquemment Posées'}
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: isEnglish ? 'How much do personal concierge services cost?' : 'Combien coûtent les services de conciergerie personnelle?',
                  a: isEnglish ? 'Pricing is flexible: hourly rates ($20-40/hr), monthly retainers, or per-task pricing. Contact us for a customized quote.' : 'Les tarifs sont flexibles: tarifs horaires, forfaits mensuels ou prix à la tâche.',
                },
                {
                  q: isEnglish ? 'What tasks are included?' : 'Quelles tâches sont incluses?',
                  a: isEnglish ? 'We handle errands, appointments, travel booking, event planning, household management, and administrative tasks—basically anything that saves you time.' : 'Nous gérons les courses, rendez-vous, voyages, planification d\'événements et tâches administratives.',
                },
                {
                  q: isEnglish ? 'How quickly can you start?' : 'À quelle vitesse pouvez-vous commencer?',
                  a: isEnglish ? 'We respond within 60 minutes. Most clients start service within 1 week. We\'re flexible and fast.' : 'Nous répondons dans les 60 minutes. La plupart commencent le service en 1 semaine.',
                },
              ].map((faq, idx) => (
                <details key={idx} className="bg-white p-6 rounded-lg shadow-sm cursor-pointer group">
                  <summary className="font-bold text-gray-900 flex items-center justify-between">
                    {faq.q}
                    <span className="text-accent-600 group-open:rotate-180 transition">▼</span>
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
