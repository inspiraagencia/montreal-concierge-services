// Site configuration
export const SITE_CONFIG = {
  name: 'Montreal Concierge Services',
  domain: 'montrealconciergeservices.com',
  url: 'https://montrealconciergeservices.com',
  phone: '+1 (514) 000-0000', // TODO: Update with real phone
  email: 'info@montrealconciergeservices.com',
  address: {
    street: '',
    city: 'Montréal',
    region: 'Riviera Sud',
    province: 'QC',
    postalCode: '',
    country: 'CA',
  },
  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
    google: '',
  },
};

// SEO Keywords mapped to services
export const SEO_KEYWORDS = {
  primary: {
    en: ['concierge service', 'concierge services', 'montreal concierge services'],
    fr: ['conciergerie', 'service de conciergerie', 'services de conciergerie'],
  },
  commercial: {
    en: ['commercial cleaning montreal', 'office cleaning', 'janitorial services', 'building maintenance'],
    fr: ['nettoyage commercial', 'entretien ménager commercial', 'nettoyage de bureaux', 'conciergerie commerciale'],
  },
  airbnb: {
    en: ['airbnb concierge services', 'rental concierge', 'short-term stay management'],
    fr: ['conciergerie airbnb', 'conciergerie locative', 'gestion court séjour'],
  },
  property: {
    en: ['property management support', 'home concierge services', 'property monitoring'],
    fr: ['gestion de propriété', 'surveillance immobilière', 'entretien paysager'],
  },
  business: {
    en: ['business concierge services', 'corporate concierge', 'day porter services'],
    fr: ['services aux entreprises', 'conciergerie de jour', 'conciergerie d\'entreprise'],
  },
  local: {
    en: [
      'concierge services repentigny',
      'concierge services terrebonne',
      'concierge services longueuil',
      'concierge services south shore montreal',
    ],
    fr: [
      'conciergerie commerciale repentigny',
      'conciergerie commerciale terrebonne',
      'conciergerie commerciale lanaudière',
      'service de conciergerie saint-jean-sur-richelieu',
    ],
  },
};

// Service categories with slugs
export const SERVICE_CATEGORIES = [
  {
    id: 'commercial',
    slug_en: 'commercial-cleaning-montreal',
    slug_fr: 'nettoyage-commercial-montreal',
    icon: '🏢',
  },
  {
    id: 'airbnb',
    slug_en: 'airbnb-concierge-services',
    slug_fr: 'conciergerie-airbnb',
    icon: '🏠',
  },
  {
    id: 'property',
    slug_en: 'property-management-support',
    slug_fr: 'gestion-propriete',
    icon: '🔑',
  },
  {
    id: 'business',
    slug_en: 'business-concierge-services',
    slug_fr: 'services-entreprises',
    icon: '💼',
  },
  {
    id: 'dayporter',
    slug_en: 'day-porter-janitorial-services',
    slug_fr: 'conciergerie-de-jour',
    icon: '🧹',
  },
];

// Locations served (Riviera Sud)
export const LOCATIONS_SERVED = [
  'Longueuil',
  'Brossard',
  'Saint-Hubert',
  'Boucherville',
  'Saint-Bruno-de-Montarville',
  'Sainte-Julie',
  'Varennes',
  'Repentigny',
  'Terrebonne',
  'La Prairie',
  'Candiac',
  'Saint-Constant',
  'Chambly',
  'Saint-Jean-sur-Richelieu',
  'Beloeil',
  'Mont-Saint-Hilaire',
];

// Client sectors
export const CLIENT_SECTORS = {
  en: [
    'Office Buildings',
    'Retail Stores',
    'Schools & Education',
    'Retirement Homes',
    'Apartment Complexes',
    'Factories & Warehouses',
    'Institutions',
    'Pharmaceutical Labs',
    'Car Dealerships',
    'Hospitality Industry',
  ],
  fr: [
    'Immeubles de bureaux',
    'Commerces',
    'Écoles',
    'Maisons de retraite',
    'Complexes d\'appartements',
    'Usines et entrepôts',
    'Institutions',
    'Laboratoires pharmaceutiques',
    'Concessionnaires automobiles',
    'Industrie hôtelière',
  ],
};
