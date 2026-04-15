'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { CITY_METADATA, LOCATION_KEYWORDS } from '@/lib/constants';
import { getGoogleMapsEmbed } from '@/lib/google-maps-embeds';

interface LocationPageProps {
  city: string;
  locale: string;
}

export function LocationPage({ city, locale }: LocationPageProps) {
  const t = useTranslations();
  const metadata = CITY_METADATA[city as keyof typeof CITY_METADATA];
  const isEn = locale === 'en';

  if (!metadata) {
    return <div>Location not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isEn ? `Professional Concierge Services in ${city}` : `Services de Conciergerie Professionnels à ${city}`}
          </h1>
          <p className="text-xl text-blue-100 mb-6">
            {isEn
              ? `Expert commercial cleaning, property management, and concierge services serving ${city} and the surrounding areas.`
              : `Services complets de conciergerie commerciale, nettoyage professionnel et gestion immobilière à ${city}.`
            }
          </p>
          <Link
            href="/contact"
            className="inline-flex bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg font-bold text-lg hover:bg-yellow-300 transition"
          >
            {isEn ? 'Get Free Quote' : 'Demander un Devis Gratuit'}
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto py-16 px-4">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Text Content */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {isEn ? `Why Choose Our ${city} Services?` : `Pourquoi Nous Choisir à ${city}?`}
            </h2>

            <div className="space-y-4 text-gray-700">
              <p className="text-lg">
                {getLocationDescription(city, isEn)}
              </p>

              <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {isEn ? 'Our Services' : 'Nos Services'}
                </h3>
                <ul className="space-y-3">
                  {[
                    {
                      en: '✓ Commercial Cleaning & Maintenance',
                      fr: '✓ Nettoyage et Entretien Commerciaux',
                    },
                    {
                      en: '✓ Airbnb Concierge & Guest Management',
                      fr: '✓ Conciergerie Airbnb et Gestion Locataires',
                    },
                    {
                      en: '✓ Property Management Support',
                      fr: '✓ Support en Gestion Immobilière',
                    },
                    {
                      en: '✓ Day Porter & Janitorial Services',
                      fr: '✓ Services de Conciergerie de Jour',
                    },
                    {
                      en: '✓ Building Maintenance & Operations',
                      fr: '✓ Maintenance et Opérations Immobilières',
                    },
                  ].map((item, idx) => (
                    <li key={idx} className="text-lg font-semibold text-blue-600">
                      {isEn ? item.en : item.fr}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {isEn ? 'Quick Response Time' : 'Intervention Rapide'}
                </h3>
                <p className="text-gray-700">
                  {isEn
                    ? 'We pride ourselves on rapid response times across all South Shore locations. Contact us for immediate assistance.'
                    : 'Nous nous engageons à répondre rapidement dans toutes les villes de la Rive-Sud. Contactez-nous pour une aide immédiate.'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="h-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {isEn ? `Our Service Area: ${city}` : `Zone de Service: ${city}`}
            </h3>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-96 mb-6">
              <div
                dangerouslySetInnerHTML={{
                  __html: getGoogleMapsEmbed(metadata.slug),
                }}
              />
            </div>

            {/* Contact Info */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-3">
                {isEn ? 'Contact Us' : 'Nous Contacter'}
              </h4>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">{isEn ? 'Phone:' : 'Téléphone:'}</span> +1 (514) 000-0000
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">{isEn ? 'Email:' : 'Courriel:'}</span> info@montrealconcierge.com
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">{isEn ? 'Service Area:' : 'Zone de Service:'}</span> {city}, South Shore & Greater Montreal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Keywords Section for SEO */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isEn ? 'Related Services in ' + city : 'Services Connexes à ' + city}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {(isEn ? LOCATION_KEYWORDS.en : LOCATION_KEYWORDS.fr).map((keyword, idx) => (
              <div key={idx} className="flex items-center p-3 bg-white rounded-lg shadow">
                <span className="text-blue-600 mr-3">→</span>
                <span className="text-gray-700 font-medium">{keyword} in {city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-blue-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {isEn ? 'Trusted by Businesses in ' + city : 'De Confiance pour les Entreprises de ' + city}
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            {isEn
              ? `Over 500+ businesses across ${city} and the South Shore trust us with their concierge and facility management needs.`
              : `Plus de 500+ entreprises à ${city} et sur la Rive-Sud nous font confiance pour leurs besoins en conciergerie.`
            }
          </p>
          <Link
            href="/contact"
            className="inline-flex bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
          >
            {isEn ? 'Request Your Free Consultation' : 'Demander Votre Consultation Gratuite'}
          </Link>
        </div>
      </section>
    </div>
  );
}

// Location-specific descriptions with unique persuasive copy for each city
function getLocationDescription(city: string, isEn: boolean): string {
  const descriptions: Record<string, { en: string; fr: string }> = {
    'Longueuil': {
      en: 'As the largest city on the South Shore, Longueuil demands premium concierge services. Our team specializes in office buildings, retail complexes, and residential properties throughout Greater Longueuil. From commercial cleaning to property management, we handle every detail with precision and care.',
      fr: 'Plus grande ville de la Rive-Sud, Longueuil mérite des services de conciergerie premium. Notre équipe se spécialise dans les immeubles de bureaux, les complexes commerciaux et les propriétés résidentielles. Nettoyage professionnel et gestion immobilière complète.',
    },
    'Brossard': {
      en: 'Brossard\'s business district requires reliable, professional concierge services. Whether you manage office buildings, retail locations, or Airbnb properties, we deliver consistent excellence across all our services. Our team understands the unique needs of Brossard\'s diverse business community.',
      fr: 'Le secteur commercial de Brossard demande des services de conciergerie fiables et professionnels. Que vous gériez des immeubles, des commerces ou des propriétés Airbnb, nous garantissons l\'excellence à chaque service.',
    },
    'Saint-Bruno-de-Montarville': {
      en: 'Saint-Bruno-de-Montarville\'s growing commercial sector benefits from our targeted concierge solutions. We pride ourselves on personalized service that adapts to the unique character of this vibrant community. Your business deserves dedicated attention to detail.',
      fr: 'Le secteur commercial en croissance de Saint-Bruno-de-Montarville bénéficie de nos solutions de conciergerie ciblées. Service personnalisé et attention au détail pour chaque client.',
    },
    'Sainte-Julie': {
      en: 'Sainte-Julie businesses thrive with our comprehensive facility management and concierge services. From boutique Airbnb operations to large commercial complexes, we scale our services to match your specific needs. Trust our expertise in the Sainte-Julie market.',
      fr: 'Les entreprises de Sainte-Julie prospèrent avec nos services complets de gestion et conciergerie. Nous adaptons nos services à vos besoins spécifiques, du petit Airbnb au complexe commercial.',
    },
    'Varennes': {
      en: 'Varennes\'s strategic location and growing industrial presence make it essential to have reliable concierge partners. We provide consistent, professional service that keeps your facilities operating smoothly and impressively.',
      fr: 'La position stratégique de Varennes nécessite des partenaires de conciergerie fiables. Service professionnel et constant pour vos installations.',
    },
    'Beloeil': {
      en: 'In Beloeil, quality matters. Our concierge services reflect our commitment to excellence, serving everything from corporate offices to hospitality ventures. We understand what sets Beloeil\'s market apart.',
      fr: 'À Beloeil, la qualité compte. Nos services de conciergerie reflètent notre engagement envers l\'excellence, des bureaux aux propriétés hôtelières.',
    },
    'Boucherville': {
      en: 'Boucherville\'s established business community deserves mature, reliable concierge solutions. We bring years of experience to every property we serve, delivering results that exceed expectations.',
      fr: 'La communauté commerciale établie de Boucherville mérite des solutions de conciergerie fiables et matures. Résultats qui surpassent les attentes.',
    },
    'Candiac': {
      en: 'Candiac\'s dynamic business environment calls for flexible, responsive concierge services. Our team adapts quickly to changing needs, whether seasonal or project-based, ensuring your operations run without interruption.',
      fr: 'L\'environnement commercial dynamique de Candiac exige des services de conciergerie souples et réactifs. Notre équipe s\'adapte rapidement à vos besoins.',
    },
    'Carignan': {
      en: 'Carignan businesses benefit from our dedicated service approach. We take pride in building lasting relationships with our clients, delivering consistent quality that builds trust over time.',
      fr: 'Les entreprises de Carignan bénéficient de notre approche de service dédiée. Nous construisons des relations durables basées sur la qualité et la confiance.',
    },
    'Chambly': {
      en: 'Chambly\'s heritage and growth create unique concierge opportunities. Our services respect the community\'s character while delivering modern, efficient facility management that local businesses need.',
      fr: 'L\'héritage et la croissance de Chambly créent des opportunités uniques. Nos services respectent le caractère de la communauté tout en offrant une gestion efficace.',
    },
    'Châteauguay': {
      en: 'Châteauguay\'s west-side location makes us an ideal concierge partner. Our local expertise ensures fast response times and deep understanding of your community\'s specific requirements.',
      fr: 'La position côté ouest de Châteauguay fait de nous un partenaire idéal. Notre expertise locale garantit des temps de réponse rapides.',
    },
    'Delson': {
      en: 'Delson\'s industrial and commercial sectors require specialized facility management. We bring targeted expertise to serve Delson\'s unique business landscape effectively.',
      fr: 'Les secteurs industriels et commerciaux de Delson nécessitent une gestion spécialisée. Nous apportons une expertise ciblée pour servir efficacement.',
    },
    'La Prairie': {
      en: 'La Prairie\'s established character and growing business presence mean you need a concierge partner that understands both heritage and progress. That\'s us.',
      fr: 'Le caractère établi de La Prairie et sa présence commerciale croissante exigent un partenaire qui comprend l\'héritage et le progrès.',
    },
    'Mont-Saint-Hilaire': {
      en: 'Mont-Saint-Hilaire\'s natural beauty shouldn\'t compete with facility management challenges. Let our expert team maintain your properties while you focus on your business.',
      fr: 'La beauté naturelle de Mont-Saint-Hilaire ne devrait pas être entravée par des défis de gestion. Laissez-nous maintenir vos propriétés.',
    },
    'Otterburn Park': {
      en: 'Otterburn Park\'s close-knit business community values personal service and reliability. We deliver both, along with professional-grade facility management.',
      fr: 'La communauté commerciale unie d\'Otterburn Park valorise le service personnalisé et la fiabilité. Nous offrons les deux.',
    },
    'Saint-Basile-le-Grand': {
      en: 'Saint-Basile-le-Grand businesses deserve attentive, detail-oriented concierge services. Our team brings that focus to every property and every service interaction.',
      fr: 'Les entreprises de Saint-Basile-le-Grand méritent des services attentifs et détaillés. Notre équipe apporte cette rigueur à chaque interaction.',
    },
    'Saint-Jean-sur-Richelieu': {
      en: 'Saint-Jean-sur-Richelieu\'s vibrant business scene requires professional concierge services that match the city\'s energy. We deliver exactly that.',
      fr: 'La scène commerciale dynamique de Saint-Jean-sur-Richelieu exige des services professionnels qui correspondent à l\'énergie de la ville.',
    },
    'Saint-Isidore': {
      en: 'Saint-Isidore\'s growing commercial sector needs dedicated support. Our concierge services provide the professional foundation that success requires.',
      fr: 'Le secteur commercial en croissance de Saint-Isidore a besoin d\'un soutien dédiée. Nos services fournissent la fondation professionnelle.',
    },
    'Saint-Constant': {
      en: 'Saint-Constant businesses benefit from our comprehensive approach to facility management and concierge services. We handle the details so you can focus on growth.',
      fr: 'Les entreprises de Saint-Constant bénéficient de notre approche complète. Nous gérons les détails pour que vous puissiez vous concentrer sur la croissance.',
    },
    'Saint-Lambert': {
      en: 'Saint-Lambert\'s sophisticated business environment demands refined concierge services. Our team delivers the professionalism and attention your community expects.',
      fr: 'L\'environnement commercial sophistiqué de Saint-Lambert exige des services raffinés. Notre équipe offre le professionnalisme attendu.',
    },
    'Saint-Philippe': {
      en: 'Saint-Philippe\'s growing presence in the business community needs reliable partners. We\'re here to support your success with professional, consistent service.',
      fr: 'La présence croissante de Saint-Philippe dans la communauté commerciale a besoin de partenaires fiables. Service professionnel et cohérent.',
    },
    'Sainte-Catherine': {
      en: 'Sainte-Catherine\'s commercial and industrial sectors rely on quality facility management. Our expertise ensures your operations meet professional standards consistently.',
      fr: 'Les secteurs commerciaux et industriels de Sainte-Catherine comptent sur une gestion de qualité. Notre expertise garantit des normes professionnelles.',
    },
    'Repentigny': {
      en: 'Repentigny\'s dynamic business growth requires scalable, professional concierge solutions. Our services grow with your business, maintaining quality at every stage.',
      fr: 'La croissance commerciale dynamique de Repentigny nécessite des solutions évolutives et professionnelles. Nos services croissent avec votre entreprise.',
    },
    'Terrebonne': {
      en: 'Terrebonne\'s expanding commercial landscape creates new opportunities for specialized concierge services. We\'re positioned to support that growth with expert facility management.',
      fr: 'Le paysage commercial en expansion de Terrebonne crée de nouvelles opportunités. Nous sommes positionnés pour soutenir cette croissance.',
    },
    'McMasterville': {
      en: 'McMasterville\'s unique position in the South Shore market means you need a concierge partner that understands local dynamics. We do.',
      fr: 'La position unique de McMasterville signifie que vous avez besoin d\'un partenaire qui comprend la dynamique locale. C\'est nous.',
    },
    'Greenfield Park': {
      en: 'Greenfield Park\'s residential and commercial mix requires versatile concierge expertise. Our team excels at serving diverse property types with equal professionalism.',
      fr: 'Le mélange résidentiel et commercial de Greenfield Park nécessite une expertise polyvalente. Notre équipe excelle à servir.',
    },
    'Vieux-Longueuil': {
      en: 'Vieux-Longueuil\'s established character and growing business sector deserve mature, professional concierge services. We understand this vibrant neighborhood.',
      fr: 'Le caractère établi de Vieux-Longueuil mérite un service professionnel et mature. Nous comprenons ce quartier vibrant.',
    },
    'Saint-Hubert': {
      en: 'Saint-Hubert businesses benefit from our targeted approach to commercial facility management. We deliver results that support your bottom line.',
      fr: 'Les entreprises de Saint-Hubert bénéficient de notre approche ciblée. Nous livrons des résultats qui soutiennent votre rentabilité.',
    },
    'Verdun': {
      en: 'Verdun\'s urban location and diverse business community require specialized concierge services that we\'re equipped to provide with expertise and care.',
      fr: 'La localisation urbaine de Verdun et sa communauté commerciale diverse nécessitent des services spécialisés. Notre expertise est à votre service.',
    },
    'Île-des-Sœurs': {
      en: 'Île-des-Sœurs\' unique island community creates special concierge requirements. Our team understands these unique needs and delivers accordingly.',
      fr: 'La communauté insulaire unique d\'Île-des-Sœurs crée des exigences spéciales. Notre équipe comprend ces besoins uniques.',
    },
  };

  const desc = descriptions[city];
  return desc ? (isEn ? desc.en : desc.fr) : 'Professional concierge services for your business.';
}
