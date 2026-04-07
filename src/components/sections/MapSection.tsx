import { useLocale } from 'next-intl';

export default function MapSection() {
  const locale = useLocale();

  const headingText = locale === 'en' ? 'Serving Montreal & Riviera Sud' : 'Service à Montréal & Riviera Sud';

  const descriptionText =
    locale === 'en'
      ? 'Professional concierge and commercial cleaning services across Montreal and the South Shore (Riviera Sud) region. Click the map to explore our service areas.'
      : 'Services de conciergerie et nettoyage commercial professionnels à Montréal et dans la région de Riviera Sud. Cliquez sur la carte pour explorer nos zones de service.';

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {locale === 'en' ? (
              <><strong>Concierge Services</strong> in Montreal & <strong>Riviera Sud</strong></>
            ) : (
              <>Services de <strong>Conciergerie</strong> à Montréal & <strong>Riviera Sud</strong></>
            )}
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl">
            {descriptionText}
          </p>
        </div>

        {/* Map Container */}
        <div className="relative w-full overflow-hidden rounded-lg shadow-lg" style={{ aspectRatio: '16 / 9' }}>
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1UVJiAbQNJpx4_oUeo7KBBX-wJL_VjaxN"
            className="w-full h-full border-0"
            style={{ minHeight: '400px' }}
            loading="lazy"
            title={
              locale === 'en'
                ? 'Montreal Concierge Services - Service Areas Map'
                : 'Services de Conciergerie Montréal - Carte des Zones de Service'
            }
            aria-label={
              locale === 'en'
                ? 'Google Map showing service coverage in Montreal and Riviera Sud'
                : 'Carte Google montrant la couverture de service à Montréal et Riviera Sud'
            }
          />
        </div>

        {/* Service Areas Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
            <h3 className="font-bold text-gray-900 mb-2 text-lg">
              {locale === 'en' ? '🏢 Commercial Buildings' : '🏢 Immeubles Commerciaux'}
            </h3>
            <p className="text-gray-700">
              {locale === 'en'
                ? 'Professional concierge services for office buildings, commercial complexes, and business centers.'
                : 'Services de conciergerie professionnels pour les immeubles de bureaux, complexes commerciaux et centres d\'affaires.'}
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
            <h3 className="font-bold text-gray-900 mb-2 text-lg">
              {locale === 'en' ? '🏠 Residential Properties' : '🏠 Propriétés Résidentielles'}
            </h3>
            <p className="text-gray-700">
              {locale === 'en'
                ? 'Specialized property management and concierge services for residential buildings and condominiums.'
                : 'Services de gestion de propriété et conciergerie spécialisés pour immeubles résidentiels et condominiums.'}
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600">
            <h3 className="font-bold text-gray-900 mb-2 text-lg">
              {locale === 'en' ? '🏨 Airbnb & Hospitality' : '🏨 Airbnb & Hôtellerie'}
            </h3>
            <p className="text-gray-700">
              {locale === 'en'
                ? 'Complete property management for Airbnb listings with daily maintenance and guest coordination.'
                : 'Gestion complète de propriété pour annonces Airbnb avec maintenance quotidienne et coordination des hôtes.'}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gray-100 p-8 rounded-lg text-center">
          <p className="text-gray-700 mb-6">
            {locale === 'en'
              ? 'Not sure if we serve your area? Contact us to confirm.'
              : 'Vous ne savez pas si nous desservons votre région? Contactez-nous pour confirmer.'}
          </p>
          <a
            href={`/${locale}/contact`}
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
          >
            {locale === 'en' ? 'Get in Touch' : 'Nous Contacter'}
          </a>
        </div>
      </div>
    </section>
  );
}
