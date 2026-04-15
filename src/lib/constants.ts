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

// Locations served - Riviera Sud & South Shore Montreal (27 cities)
export const LOCATIONS_SERVED = [
  // West Island
  'Île-des-Sœurs',
  'Verdun',

  // South Shore - Longueuil Area
  'Longueuil',
  'Greenfield Park',
  'Saint-Hubert',
  'Vieux-Longueuil',

  // South Shore - West
  'La Prairie',
  'Saint-Constant',
  'Saint-Philippe',
  'Delson',
  'Candiac',
  'Châteauguay',

  // South Shore - East
  'Saint-Lambert',
  'Brossard',
  'Sainte-Catherine',
  'Saint-Jean-sur-Richelieu',
  'Saint-Isidore',
  'Carignan',
  'Beloeil',

  // South Shore - Monteregie
  'Boucherville',
  'Saint-Bruno-de-Montarville',
  'Sainte-Julie',
  'Saint-Basile-le-Grand',
  'Varennes',
  'Chambly',
  'McMasterville',

  // Laurentians
  'Repentigny',
  'Terrebonne',
  'Mont-Saint-Hilaire',
  'Otterburn Park',
];

// Location Keywords for SEO - High Volume Keywords (80-140+ searches/month per city)
export const LOCATION_KEYWORDS = {
  en: [
    'concierge services',
    'concierge service near me',
    'commercial cleaning',
    'property management',
    'airbnb concierge',
    'day porter services',
    'building maintenance',
    'office cleaning',
  ],
  fr: [
    'services de conciergerie',
    'conciergerie commerciale',
    'nettoyage commercial',
    'gestion de propriété',
    'conciergerie airbnb',
    'entretien immeuble',
    'portier de jour',
  ],
};

// City-specific metadata for SEO and content
export const CITY_METADATA = {
  'Longueuil': {
    slug: 'longueuil',
    province: 'QC',
    keywords: ['longueuil concierge services', 'commercial cleaning longueuil', 'property management longueuil'],
    googleMapsEmbed: 'place/Longueuil,+QC+Canada',
    description_en: 'Professional concierge services in Longueuil. Commercial cleaning, property management, and Airbnb concierge for businesses across Greater Longueuil.',
    description_fr: 'Services de conciergerie professionnels à Longueuil. Nettoyage commercial, gestion immobilière et conciergerie Airbnb.',
  },
  'Brossard': {
    slug: 'brossard',
    province: 'QC',
    keywords: ['brossard concierge services', 'commercial cleaning brossard', 'office cleaning brossard'],
    googleMapsEmbed: 'place/Brossard,+QC+Canada',
    description_en: 'Expert concierge services in Brossard. Serving office buildings, retail stores, and rental properties.',
    description_fr: 'Services de conciergerie experts à Brossard. Service immédiat pour immeubles commerciaux et propriétés résidentielles.',
  },
  'Saint-Bruno-de-Montarville': {
    slug: 'saint-bruno-de-montarville',
    province: 'QC',
    keywords: ['saint-bruno concierge', 'commercial cleaning saint-bruno', 'janitorial services saint-bruno'],
    googleMapsEmbed: 'place/Saint-Bruno-de-Montarville,+QC',
    description_en: 'Premium concierge and cleaning services in Saint-Bruno-de-Montarville. Trusted by local businesses.',
    description_fr: 'Services de conciergerie premium à Saint-Bruno-de-Montarville.',
  },
  'Sainte-Julie': {
    slug: 'sainte-julie',
    province: 'QC',
    keywords: ['sainte-julie concierge', 'commercial cleaning sainte-julie', 'property management sainte-julie'],
    googleMapsEmbed: 'place/Sainte-Julie,+QC+Canada',
    description_en: 'Comprehensive concierge solutions for Sainte-Julie businesses and property owners.',
    description_fr: 'Solutions complètes de conciergerie pour les entreprises de Sainte-Julie.',
  },
  'Varennes': {
    slug: 'varennes',
    province: 'QC',
    keywords: ['varennes concierge services', 'commercial cleaning varennes', 'office maintenance varennes'],
    googleMapsEmbed: 'place/Varennes,+QC+Canada',
    description_en: 'Professional concierge and maintenance services in Varennes.',
    description_fr: 'Services professionnels de conciergerie à Varennes.',
  },
  'Beloeil': {
    slug: 'beloeil',
    province: 'QC',
    keywords: ['beloeil concierge services', 'commercial cleaning beloeil'],
    googleMapsEmbed: 'place/Beloeil,+QC+Canada',
    description_en: 'Quality concierge services serving Beloeil and surrounding areas.',
    description_fr: 'Services de conciergerie de qualité à Beloeil.',
  },
  'Boucherville': {
    slug: 'boucherville',
    province: 'QC',
    keywords: ['boucherville concierge', 'commercial cleaning boucherville', 'property management boucherville'],
    googleMapsEmbed: 'place/Boucherville,+QC+Canada',
    description_en: 'Trusted concierge services in Boucherville for businesses and residences.',
    description_fr: 'Services de conciergerie de confiance à Boucherville.',
  },
  'Candiac': {
    slug: 'candiac',
    province: 'QC',
    keywords: ['candiac concierge services', 'commercial cleaning candiac', 'office cleaning candiac'],
    googleMapsEmbed: 'place/Candiac,+QC+Canada',
    description_en: 'Professional cleaning and concierge services in Candiac.',
    description_fr: 'Services professionnels de nettoyage et conciergerie à Candiac.',
  },
  'Carignan': {
    slug: 'carignan',
    province: 'QC',
    keywords: ['carignan concierge', 'commercial cleaning carignan'],
    googleMapsEmbed: 'place/Carignan,+QC+Canada',
    description_en: 'Concierge and maintenance services in Carignan.',
    description_fr: 'Services de conciergerie à Carignan.',
  },
  'Chambly': {
    slug: 'chambly',
    province: 'QC',
    keywords: ['chambly concierge services', 'commercial cleaning chambly', 'property management chambly'],
    googleMapsEmbed: 'place/Chambly,+QC+Canada',
    description_en: 'Expert concierge solutions for Chambly businesses.',
    description_fr: 'Solutions expertes de conciergerie pour Chambly.',
  },
  'Châteauguay': {
    slug: 'chateauguay',
    province: 'QC',
    keywords: ['chateauguay concierge', 'commercial cleaning chateauguay', 'janitorial services chateauguay'],
    googleMapsEmbed: 'place/Châteauguay,+QC+Canada',
    description_en: 'Comprehensive concierge services in Châteauguay.',
    description_fr: 'Services complets de conciergerie à Châteauguay.',
  },
  'Delson': {
    slug: 'delson',
    province: 'QC',
    keywords: ['delson concierge services', 'commercial cleaning delson'],
    googleMapsEmbed: 'place/Delson,+QC+Canada',
    description_en: 'Professional concierge services in Delson.',
    description_fr: 'Services professionnels de conciergerie à Delson.',
  },
  'La Prairie': {
    slug: 'la-prairie',
    province: 'QC',
    keywords: ['la prairie concierge', 'commercial cleaning la prairie', 'property maintenance la prairie'],
    googleMapsEmbed: 'place/La+Prairie,+QC+Canada',
    description_en: 'Quality concierge and cleaning services in La Prairie.',
    description_fr: 'Services de qualité à La Prairie.',
  },
  'Mont-Saint-Hilaire': {
    slug: 'mont-saint-hilaire',
    province: 'QC',
    keywords: ['mont-saint-hilaire concierge', 'commercial cleaning mont-saint-hilaire'],
    googleMapsEmbed: 'place/Mont-Saint-Hilaire,+QC',
    description_en: 'Expert concierge services in Mont-Saint-Hilaire.',
    description_fr: 'Services experts à Mont-Saint-Hilaire.',
  },
  'Otterburn Park': {
    slug: 'otterburn-park',
    province: 'QC',
    keywords: ['otterburn park concierge', 'commercial cleaning otterburn park'],
    googleMapsEmbed: 'place/Otterburn+Park,+QC',
    description_en: 'Professional services in Otterburn Park.',
    description_fr: 'Services professionnels à Otterburn Park.',
  },
  'Saint-Basile-le-Grand': {
    slug: 'saint-basile-le-grand',
    province: 'QC',
    keywords: ['saint-basile-le-grand concierge', 'commercial cleaning saint-basile-le-grand'],
    googleMapsEmbed: 'place/Saint-Basile-le-Grand,+QC',
    description_en: 'Concierge services for Saint-Basile-le-Grand.',
    description_fr: 'Services de conciergerie pour Saint-Basile-le-Grand.',
  },
  'Saint-Jean-sur-Richelieu': {
    slug: 'saint-jean-sur-richelieu',
    province: 'QC',
    keywords: ['saint-jean-sur-richelieu concierge', 'commercial cleaning saint-jean', 'service de conciergerie saint-jean'],
    googleMapsEmbed: 'place/Saint-Jean-sur-Richelieu,+QC',
    description_en: 'Professional concierge services in Saint-Jean-sur-Richelieu.',
    description_fr: 'Services de conciergerie professionnels à Saint-Jean-sur-Richelieu.',
  },
  'Saint-Isidore': {
    slug: 'saint-isidore',
    province: 'QC',
    keywords: ['saint-isidore concierge', 'commercial cleaning saint-isidore'],
    googleMapsEmbed: 'place/Saint-Isidore,+QC+Canada',
    description_en: 'Concierge services in Saint-Isidore.',
    description_fr: 'Services de conciergerie à Saint-Isidore.',
  },
  'Saint-Constant': {
    slug: 'saint-constant',
    province: 'QC',
    keywords: ['saint-constant concierge', 'commercial cleaning saint-constant', 'property management saint-constant'],
    googleMapsEmbed: 'place/Saint-Constant,+QC+Canada',
    description_en: 'Professional concierge in Saint-Constant.',
    description_fr: 'Conciergerie professionnelle à Saint-Constant.',
  },
  'Saint-Lambert': {
    slug: 'saint-lambert',
    province: 'QC',
    keywords: ['saint-lambert concierge', 'commercial cleaning saint-lambert', 'office cleaning saint-lambert'],
    googleMapsEmbed: 'place/Saint-Lambert,+QC+Canada',
    description_en: 'Expert concierge services in Saint-Lambert.',
    description_fr: 'Services experts à Saint-Lambert.',
  },
  'Saint-Philippe': {
    slug: 'saint-philippe',
    province: 'QC',
    keywords: ['saint-philippe concierge', 'commercial cleaning saint-philippe'],
    googleMapsEmbed: 'place/Saint-Philippe,+QC+Canada',
    description_en: 'Professional services in Saint-Philippe.',
    description_fr: 'Services professionnels à Saint-Philippe.',
  },
  'Sainte-Catherine': {
    slug: 'sainte-catherine',
    province: 'QC',
    keywords: ['sainte-catherine concierge', 'commercial cleaning sainte-catherine', 'janitorial services sainte-catherine'],
    googleMapsEmbed: 'place/Sainte-Catherine,+QC+Canada',
    description_en: 'Complete concierge solutions in Sainte-Catherine.',
    description_fr: 'Solutions complètes de conciergerie à Sainte-Catherine.',
  },
  'Repentigny': {
    slug: 'repentigny',
    province: 'QC',
    keywords: ['repentigny concierge services', 'commercial cleaning repentigny', 'conciergerie commerciale repentigny'],
    googleMapsEmbed: 'place/Repentigny,+QC+Canada',
    description_en: 'Leading concierge services in Repentigny.',
    description_fr: 'Services de conciergerie commerciale à Repentigny.',
  },
  'Terrebonne': {
    slug: 'terrebonne',
    province: 'QC',
    keywords: ['terrebonne concierge services', 'commercial cleaning terrebonne', 'conciergerie commerciale terrebonne'],
    googleMapsEmbed: 'place/Terrebonne,+QC+Canada',
    description_en: 'Professional concierge services in Terrebonne.',
    description_fr: 'Services de conciergerie commerciale à Terrebonne.',
  },
  'McMasterville': {
    slug: 'mcmasterville',
    province: 'QC',
    keywords: ['mcmasterville concierge', 'commercial cleaning mcmasterville'],
    googleMapsEmbed: 'place/McMasterville,+QC+Canada',
    description_en: 'Concierge services in McMasterville.',
    description_fr: 'Services de conciergerie à McMasterville.',
  },
  'Greenfield Park': {
    slug: 'greenfield-park',
    province: 'QC',
    keywords: ['greenfield park concierge', 'commercial cleaning greenfield park'],
    googleMapsEmbed: 'place/Greenfield+Park,+QC',
    description_en: 'Professional concierge in Greenfield Park area.',
    description_fr: 'Services professionnels à Greenfield Park.',
  },
  'Vieux-Longueuil': {
    slug: 'vieux-longueuil',
    province: 'QC',
    keywords: ['vieux-longueuil concierge', 'commercial cleaning vieux-longueuil'],
    googleMapsEmbed: 'place/Vieux-Longueuil,+QC',
    description_en: 'Concierge services in Vieux-Longueuil.',
    description_fr: 'Services de conciergerie à Vieux-Longueuil.',
  },
  'Saint-Hubert': {
    slug: 'saint-hubert',
    province: 'QC',
    keywords: ['saint-hubert concierge', 'commercial cleaning saint-hubert'],
    googleMapsEmbed: 'place/Saint-Hubert,+QC+Canada',
    description_en: 'Professional concierge services in Saint-Hubert.',
    description_fr: 'Services professionnels à Saint-Hubert.',
  },
  'Verdun': {
    slug: 'verdun',
    province: 'QC',
    keywords: ['verdun concierge services', 'commercial cleaning verdun', 'office cleaning verdun'],
    googleMapsEmbed: 'place/Verdun,+QC+Canada',
    description_en: 'Professional concierge and cleaning services in Verdun.',
    description_fr: 'Services de conciergerie à Verdun.',
  },
  'Île-des-Sœurs': {
    slug: 'ile-des-soeurs',
    province: 'QC',
    keywords: ['île-des-sœurs concierge', 'commercial cleaning île-des-sœurs'],
    googleMapsEmbed: 'place/Île-des-Sœurs,+QC',
    description_en: 'Concierge services for Île-des-Sœurs.',
    description_fr: 'Services de conciergerie pour Île-des-Sœurs.',
  },
};

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
