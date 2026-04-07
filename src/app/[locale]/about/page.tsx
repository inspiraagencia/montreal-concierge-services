import { useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function AboutPage() {
  const locale = useLocale();
  const isEnglish = locale === 'en';

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 overflow-hidden pt-20 pb-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                  {isEnglish ? (
                    <>About <strong className="text-accent-300">Montreal Concierge Services</strong></>
                  ) : (
                    <>À Propos de <strong className="text-accent-300">Montreal Concierge Services</strong></>
                  )}
                </h1>
                <p className="text-primary-100 text-lg leading-relaxed mb-8">
                  {isEnglish ? (
                    <>Professional <strong className="text-white">concierge services</strong> and <strong className="text-white">commercial cleaning</strong> on the Riviera Sud since 2014. We serve businesses, property owners, and Airbnb hosts with excellence and reliability.</>
                  ) : (
                    <>Services de <strong className="text-white">conciergerie professionnels</strong> et <strong className="text-white">nettoyage commercial</strong> sur la Riviera Sud depuis 2014. Nous servons les entreprises, propriétaires et hôtes Airbnb avec excellence et fiabilité.</>
                  )}
                </p>
              </div>

              <div className="relative hidden lg:block">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                  <Image
                    src="/images/team/team-leader-concierge-montreal.jpg"
                    alt={isEnglish ? "Professional concierge team Montreal" : "Équipe professionnelle de conciergerie Montreal"}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 0px, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary-600 mb-2">10+</p>
                <p className="text-gray-600 font-medium">
                  {isEnglish ? 'Years in Business' : "Années d'Expérience"}
                </p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary-600 mb-2">500+</p>
                <p className="text-gray-600 font-medium">
                  {isEnglish ? 'Satisfied Clients' : 'Clients Satisfaits'}
                </p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary-600 mb-2">16</p>
                <p className="text-gray-600 font-medium">
                  {isEnglish ? 'Cities Served' : 'Villes Desservies'}
                </p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary-600 mb-2">60min</p>
                <p className="text-gray-600 font-medium">
                  {isEnglish ? 'Response Time' : 'Délai de Réponse'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {isEnglish ? (
                <>Our <strong>Story</strong> & Mission</>
              ) : (
                <>Notre <strong>Histoire</strong> & Mission</>
              )}
            </h2>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {isEnglish ? (
                    <>Founded in 2014, Montreal Concierge Services started with a simple vision: to provide <strong>professional-grade concierge and cleaning solutions</strong> to businesses and property owners in the Riviera Sud region. What began as a small team has grown into the most trusted name in <strong>commercial cleaning and property management</strong> across Montreal's South Shore.</>
                  ) : (
                    <>Fondée en 2014, Montreal Concierge Services a commencé avec une vision simple : fournir des <strong>solutions de conciergerie et de nettoyage professionnelles</strong> aux entreprises et propriétaires de la région Riviera Sud. Ce qui a commencé par une petite équipe est devenu le nom le plus fiable en <strong>nettoyage commercial et gestion de propriété</strong> sur la Rive-Sud de Montréal.</>
                  )}
                </p>

                <p className="text-gray-700 text-lg leading-relaxed">
                  {isEnglish ? (
                    <>Today, we're proud to serve over 500 satisfied clients, from small offices to large commercial complexes. Our commitment to <strong>excellence, reliability, and attention to detail</strong> has made us the go-to choice for <strong>Airbnb management, office cleaning, and residential property services</strong> across Montreal and surrounding areas.</>
                  ) : (
                    <>Aujourd'hui, nous sommes fiers de servir plus de 500 clients satisfaits, des petits bureaux aux grands complexes commerciaux. Notre engagement envers <strong>l'excellence, la fiabilité et l'attention aux détails</strong> nous a fait le choix privilégié pour <strong>la gestion Airbnb, le nettoyage de bureaux et les services de propriété résidentielle</strong> à Montréal et dans les régions environnantes.</>
                  )}
                </p>
              </div>

              <div className="relative">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/images/hero/team-professional-cleaning-montreal.jpg"
                    alt={isEnglish ? "Professional team Montreal Concierge" : "Équipe professionnelle Montreal Concierge"}
                    width={600}
                    height={400}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              {isEnglish ? (
                <>Our <strong>Core Values</strong></>
              ) : (
                <>Nos <strong>Valeurs Fondamentales</strong></>
              )}
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Value 1: Excellence */}
              <div className="bg-blue-50 p-8 rounded-lg border-l-4 border-primary-600">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {isEnglish ? 'Excellence' : 'Excellence'}
                </h3>
                <p className="text-gray-700">
                  {isEnglish ? (
                    <>We deliver <strong>professional-grade services</strong> with meticulous attention to detail on every project, every time.</>
                  ) : (
                    <>Nous livrons des <strong>services de qualité professionnelle</strong> avec une attention méticuleuse aux détails à chaque projet.</>
                  )}
                </p>
              </div>

              {/* Value 2: Reliability */}
              <div className="bg-green-50 p-8 rounded-lg border-l-4 border-green-600">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {isEnglish ? 'Reliability' : 'Fiabilité'}
                </h3>
                <p className="text-gray-700">
                  {isEnglish ? (
                    <>You can count on us. We show up on time, every time, with the <strong>professional team</strong> you expect.</>
                  ) : (
                    <>Vous pouvez compter sur nous. Nous arrivons à l'heure, chaque fois, avec <strong>l'équipe professionnelle</strong> que vous attendez.</>
                  )}
                </p>
              </div>

              {/* Value 3: Eco-Conscious */}
              <div className="bg-yellow-50 p-8 rounded-lg border-l-4 border-yellow-600">
                <div className="text-4xl mb-4">🌿</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {isEnglish ? 'Eco-Conscious' : 'Respectueux de l\'Environnement'}
                </h3>
                <p className="text-gray-700">
                  {isEnglish ? (
                    <>We use <strong>eco-friendly products and methods</strong> to protect your space and the environment.</>
                  ) : (
                    <>Nous utilisons des <strong>produits et méthodes respectueux de l'environnement</strong> pour protéger votre espace.</>
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Trust Us Section */}
        <section className="py-20 bg-primary-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
              {isEnglish ? (
                <>Why <strong>Businesses Trust</strong> Us</>
              ) : (
                <>Pourquoi les <strong>Entreprises Nous Font Confiance</strong></>
              )}
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600 text-white">
                    <span>✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {isEnglish ? 'Certified & Insured' : 'Certifiés & Assurés'}
                  </h3>
                  <p className="text-gray-600">
                    {isEnglish ? 'All team members are trained, verified, and insured for complete peace of mind.' : 'Tous les membres de l\'équipe sont formés, vérifiés et assurés pour votre tranquillité d\'esprit.'}
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600 text-white">
                    <span>✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {isEnglish ? 'Flexible Schedules' : 'Horaires Flexibles'}
                  </h3>
                  <p className="text-gray-600">
                    {isEnglish ? 'Daily, weekly, or monthly service tailored to your specific business needs.' : 'Service quotidien, hebdomadaire ou mensuel adapté à vos besoins spécifiques.'}
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600 text-white">
                    <span>✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {isEnglish ? 'Fast Response' : 'Réponse Rapide'}
                  </h3>
                  <p className="text-gray-600">
                    {isEnglish ? 'We respond to inquiries within 60 minutes. Your urgent needs are our priority.' : 'Nous répondons aux demandes dans les 60 minutes. Vos besoins urgents sont notre priorité.'}
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600 text-white">
                    <span>✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {isEnglish ? 'Proven Track Record' : 'Antécédents Éprouvés'}
                  </h3>
                  <p className="text-gray-600">
                    {isEnglish ? '500+ satisfied clients across Montreal & Riviera Sud trust us for their commercial cleaning and property management.' : '500+ clients satisfaits à travers Montréal et Riviera Sud nous font confiance pour leur nettoyage commercial et gestion de propriété.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              {isEnglish ? (
                <>Our <strong>Certifications & Standards</strong></>
              ) : (
                <>Nos <strong>Certifications & Normes</strong></>
              )}
            </h2>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-5xl mb-4">🏆</div>
                <h3 className="font-bold text-gray-900">5/5 Google</h3>
                <p className="text-sm text-gray-600 mt-2">
                  {isEnglish ? 'Highly Rated' : 'Très Bien Noté'}
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-5xl mb-4">🛡️</div>
                <h3 className="font-bold text-gray-900">
                  {isEnglish ? 'Insured' : 'Assuré'}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {isEnglish ? 'Fully Covered' : 'Couverture Complète'}
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-5xl mb-4">🌿</div>
                <h3 className="font-bold text-gray-900">
                  {isEnglish ? 'Eco-Certified' : 'Éco-Certifié'}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {isEnglish ? 'Green Standards' : 'Normes Vertes'}
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-5xl mb-4">✓</div>
                <h3 className="font-bold text-gray-900">
                  {isEnglish ? 'Bonded' : 'Cautionné'}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {isEnglish ? 'Your Protection' : 'Votre Protection'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Service Expertise Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
              {isEnglish ? (
                <>Our <strong>Service Expertise</strong></>
              ) : (
                <>Notre <strong>Expertise en Services</strong></>
              )}
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🏢</span>
                  {isEnglish ? 'Commercial Cleaning' : 'Nettoyage Commercial'}
                </h3>
                <p className="text-gray-700 mb-6">
                  {isEnglish ? (
                    <>Professional <strong>office cleaning</strong> and <strong>building maintenance</strong> for businesses of all sizes across Montreal and Riviera Sud.</>
                  ) : (
                    <>Nettoyage professionnel de <strong>bureaux</strong> et <strong>entretien d'immeubles</strong> pour entreprises de toutes tailles sur Montréal et Riviera Sud.</>
                  )}
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🏠</span>
                  {isEnglish ? 'Property Management' : 'Gestion de Propriété'}
                </h3>
                <p className="text-gray-700">
                  {isEnglish ? (
                    <>Complete <strong>residential property management</strong>, maintenance coordination, and <strong>concierge services</strong> for property owners.</>
                  ) : (
                    <>Gestion complète de <strong>propriétés résidentielles</strong>, coordination d'entretien et <strong>services de conciergerie</strong> pour propriétaires.</>
                  )}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🏨</span>
                  {isEnglish ? 'Airbnb Management' : 'Gestion Airbnb'}
                </h3>
                <p className="text-gray-700 mb-6">
                  {isEnglish ? (
                    <>Specialized <strong>Airbnb concierge services</strong>: guest check-ins, professional cleaning, maintenance, and 24/7 support for short-term rentals.</>
                  ) : (
                    <>Services de <strong>conciergerie Airbnb</strong> spécialisés : enregistrement des hôtes, nettoyage professionnel, entretien et support 24/7.</>
                  )}
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>💼</span>
                  {isEnglish ? 'Business Services' : 'Services Entreprise'}
                </h3>
                <p className="text-gray-700">
                  {isEnglish ? (
                    <>Employee benefits including <strong>workplace concierge</strong>, errand services, and business support solutions.</>
                  ) : (
                    <>Avantages pour employés incluant <strong>conciergerie au travail</strong>, services de courses et solutions de support commercial.</>
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary-600 text-white">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {isEnglish ? (
                <>Ready to Experience <strong>Professional Concierge Services</strong>?</>
              ) : (
                <>Prêt à Expérimenter les <strong>Services de Conciergerie Professionnels</strong>?</>
              )}
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              {isEnglish ? (
                <>Join 500+ satisfied clients who trust Montreal Concierge Services for their commercial cleaning, property management, and Airbnb needs.</>
              ) : (
                <>Rejoignez 500+ clients satisfaits qui font confiance à Montreal Concierge Services pour leurs besoins de nettoyage commercial, gestion de propriété et Airbnb.</>
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-accent-400 text-primary-900 font-bold rounded-lg hover:bg-accent-500 transition"
              >
                {isEnglish ? 'Get Free Quote' : 'Obtenir une Soumission Gratuite'}
              </Link>
              <Link
                href="/services"
                className="inline-block px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition"
              >
                {isEnglish ? 'View Our Services' : 'Voir Nos Services'}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
