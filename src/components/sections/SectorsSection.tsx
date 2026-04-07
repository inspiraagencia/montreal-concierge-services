import { useTranslations, useLocale } from 'next-intl';
import { CLIENT_SECTORS } from '@/lib/constants';

const SECTOR_ICONS: Record<string, string> = {
  'Office Buildings': '🏢',
  'Retail Stores': '🛍️',
  'Schools & Education': '🎓',
  'Retirement Homes': '🏥',
  'Apartment Complexes': '🏘️',
  'Factories & Warehouses': '🏭',
  'Institutions': '🏛️',
  'Pharmaceutical Labs': '🔬',
  'Car Dealerships': '🚗',
  'Hospitality Industry': '🏨',
};

const SECTOR_ICONS_FR: Record<string, string> = {
  'Immeubles de bureaux': '🏢',
  'Commerces': '🛍️',
  'Écoles': '🎓',
  'Maisons de retraite': '🏥',
  "Complexes d'appartements": '🏘️',
  'Usines et entrepôts': '🏭',
  'Institutions': '🏛️',
  'Laboratoires pharmaceutiques': '🔬',
  'Concessionnaires automobiles': '🚗',
  'Industrie hôtelière': '🏨',
};

export default function SectorsSection() {
  const t = useTranslations('sectors');
  const locale = useLocale();

  const sectors = locale === 'fr' ? CLIENT_SECTORS.fr : CLIENT_SECTORS.en;
  const iconMap = locale === 'fr' ? SECTOR_ICONS_FR : SECTOR_ICONS;

  return (
    <section className="section-padding bg-white" id="sectors">
      <div className="section-container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-primary-500 font-semibold text-sm uppercase tracking-widest mb-3">
            {locale === 'fr' ? 'Notre clientèle' : 'Our clientele'}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-neutral-600 text-lg">
            {t('subtitle')}
          </p>
        </div>

        {/* Sectors grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {sectors.map((sector) => (
            <div
              key={sector}
              className="flex flex-col items-center gap-3 bg-neutral-50 hover:bg-primary-50 rounded-xl p-5 text-center transition-all group cursor-default border border-neutral-100 hover:border-primary-200"
            >
              <span className="text-3xl group-hover:scale-125 transition-transform">
                {iconMap[sector] || '🏢'}
              </span>
              <p className="text-sm font-semibold text-neutral-700 group-hover:text-primary-700 leading-tight">
                {sector}
              </p>
            </div>
          ))}
        </div>

        {/* Coverage band */}
        <div className="bg-gradient-to-r from-primary-800 to-primary-600 rounded-2xl p-8 text-white text-center">
          <h3 className="font-heading text-xl font-bold mb-2">
            {locale === 'fr' ? 'Couverture complète de la Rive-Sud' : 'Complete South Shore Coverage'}
          </h3>
          <p className="text-primary-200 text-sm mb-6">
            {locale === 'fr'
              ? 'Nous desservons plus de 16 municipalités dans la grande région de Montréal'
              : 'We serve more than 16 municipalities in the greater Montreal area'}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Longueuil', 'Brossard', 'Repentigny', 'Terrebonne', 'Saint-Jean-sur-Richelieu', 'Boucherville', 'Varennes', 'Chambly', 'La Prairie', 'Candiac'].map((city) => (
              <span key={city} className="bg-white/15 hover:bg-white/25 text-white text-sm font-medium rounded-full px-4 py-1.5 transition-colors">
                {city}
              </span>
            ))}
            <span className="bg-accent-400/30 text-accent-200 text-sm font-medium rounded-full px-4 py-1.5">
              {locale === 'fr' ? '+ 6 autres villes' : '+ 6 more cities'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
