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
          <span className="section-label justify-center">
            {locale === 'fr' ? 'Notre clientèle' : 'Our clientele'}
          </span>
          <h2
            className="font-heading font-bold mb-4"
            style={{ fontSize: 'clamp(1.875rem, 3vw, 2.75rem)', color: '#0a1a4e' }}
          >
            {t('title')}
          </h2>
          <div className="divider-cyan mx-auto mb-4" />
          <p className="text-lg" style={{ color: '#617d96' }}>
            {t('subtitle')}
          </p>
        </div>

        {/* Sectors grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {sectors.map((sector) => (
            <div
              key={sector}
              className="group flex flex-col items-center gap-3 rounded-xl p-5 text-center transition-all duration-200 cursor-default"
              style={{
                background: '#f7f9fc',
                border: '1px solid rgba(10,26,78,0.07)',
              }}
            >
              <span className="text-3xl transition-transform duration-200 group-hover:scale-125">
                {iconMap[sector] || '🏢'}
              </span>
              <p
                className="text-sm font-semibold leading-tight transition-colors duration-200"
                style={{ color: '#314556' }}
              >
                {sector}
              </p>
            </div>
          ))}
        </div>

        {/* Coverage band */}
        <div
          className="rounded-2xl p-8 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #060e2c 0%, #0a1a4e 50%, #0c2261 100%)' }}
        >
          {/* Background grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(0,192,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,192,212,1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
          <div className="relative z-10">
            <h3 className="font-heading text-xl font-bold text-white mb-2">
              {locale === 'fr' ? 'Couverture complète de la Rive-Sud' : 'Complete South Shore Coverage'}
            </h3>
            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {locale === 'fr'
                ? 'Nous desservons plus de 16 municipalités dans la grande région de Montréal'
                : 'We serve more than 16 municipalities in the greater Montreal area'}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Longueuil', 'Brossard', 'Repentigny', 'Terrebonne', 'Saint-Jean-sur-Richelieu', 'Boucherville', 'Varennes', 'Chambly', 'La Prairie', 'Candiac'].map((city) => (
                <span
                  key={city}
                  className="text-sm font-medium rounded-full px-4 py-1.5 transition-all"
                  style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {city}
                </span>
              ))}
              <span
                className="text-sm font-semibold rounded-full px-4 py-1.5"
                style={{ background: 'rgba(0,192,212,0.2)', color: '#3de7f8', border: '1px solid rgba(0,192,212,0.3)' }}
              >
                {locale === 'fr' ? '+ 6 autres villes' : '+ 6 more cities'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
