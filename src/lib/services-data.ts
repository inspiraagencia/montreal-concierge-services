// Full service data for each category - bilingual FR/EN
// Used for service pages, SEO meta, and structured data

export interface ServiceFeature {
  title: string;
  description: string;
  icon: string;
}

export interface ServicePackage {
  name: string;
  description: string;
  included: string[];
}

export interface ServiceData {
  id: string;
  slug_en: string;
  slug_fr: string;
  icon: string;
  image: string;
  color: string;
  bg: string;
  en: {
    title: string;
    metaTitle: string;
    metaDescription: string;
    h1: string;
    intro: string;
    features: ServiceFeature[];
    subServices: string[];
    packages: ServicePackage[];
    faq: { q: string; a: string }[];
    cta: string;
  };
  fr: {
    title: string;
    metaTitle: string;
    metaDescription: string;
    h1: string;
    intro: string;
    features: ServiceFeature[];
    subServices: string[];
    packages: ServicePackage[];
    faq: { q: string; a: string }[];
    cta: string;
  };
}

export const SERVICES_DATA: ServiceData[] = [
  {
    id: 'commercial',
    slug_en: 'commercial-cleaning-montreal',
    slug_fr: 'nettoyage-commercial-montreal',
    icon: '🏢',
    image: '/images/services/commercial-cleaning.jpg',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    en: {
      title: 'Commercial Cleaning',
      metaTitle: 'Commercial Cleaning Montreal | Office Cleaning South Shore | Montreal Concierge Services',
      metaDescription: 'Professional commercial cleaning services in Montreal South Shore. Office cleaning, floor maintenance, window washing, disinfection. Free quote in 60 minutes. Longueuil, Brossard, Repentigny, Terrebonne.',
      h1: 'Commercial Cleaning Services in Montreal South Shore',
      intro: 'Montreal Concierge Services offers professional commercial cleaning for businesses of all sizes across Montreal\'s South Shore. From daily office cleaning to specialized floor maintenance and window washing, our certified, insured team delivers impeccable results — every time.',
      features: [
        { icon: '🧹', title: 'Daily Office Cleaning', description: 'Complete cleaning of workstations, meeting rooms, common areas, and restrooms. Scheduled daily, weekly, or bi-weekly.' },
        { icon: '✨', title: 'Floor Maintenance', description: 'Stripping, waxing, buffing, and polishing for all floor types: vinyl, hardwood, ceramic, and carpet.' },
        { icon: '🪟', title: 'Window Washing', description: 'Interior and exterior window cleaning for offices, storefronts, and commercial buildings of all heights.' },
        { icon: '🦠', title: 'Disinfection & Sanitization', description: 'Hospital-grade disinfection protocols for high-touch surfaces, washrooms, and shared workspaces.' },
        { icon: '🏗️', title: 'Post-Construction Cleaning', description: 'Complete cleanup after renovations or new construction, including debris removal and deep cleaning.' },
        { icon: '🌿', title: 'Eco-Friendly Products', description: 'We use certified green cleaning products safe for your employees, clients, and the environment.' },
      ],
      subServices: [
        'Office building cleaning',
        'Retail store cleaning',
        'Medical clinic cleaning',
        'School & educational facility cleaning',
        'Warehouse & industrial cleaning',
        'Pharmaceutical lab cleaning',
        'Car dealership cleaning',
        'Restaurant & hospitality cleaning',
        'Carpet cleaning & extraction',
        'High-pressure washing',
      ],
      packages: [
        {
          name: 'Essential',
          description: 'Perfect for small offices up to 2,000 sq ft',
          included: ['2x weekly cleaning', 'Vacuuming & mopping', 'Restroom sanitization', 'Trash removal', 'Surface wiping'],
        },
        {
          name: 'Professional',
          description: 'Ideal for medium businesses 2,000–5,000 sq ft',
          included: ['Daily cleaning', 'Floor maintenance monthly', 'Window cleaning bi-monthly', 'Deep cleaning quarterly', 'Dedicated supervisor'],
        },
        {
          name: 'Enterprise',
          description: 'Complete solution for large facilities 5,000+ sq ft',
          included: ['Daily on-site team', 'Full floor program', 'Monthly deep cleaning', 'Post-event cleaning', 'Priority response', 'Quarterly audit report'],
        },
      ],
      faq: [
        { q: 'How quickly can you start commercial cleaning services?', a: 'We typically begin within 48–72 hours of signing an agreement. For urgent needs, we can often accommodate same-week starts.' },
        { q: 'Are your cleaning staff insured and background-checked?', a: 'Yes, all our employees are fully insured, uniformed, and have passed thorough background checks for your peace of mind.' },
        { q: 'Do you provide cleaning supplies and equipment?', a: 'Absolutely. We bring all professional-grade, eco-friendly cleaning products and equipment. You don\'t need to provide anything.' },
        { q: 'Can you clean outside of business hours?', a: 'Yes, we offer flexible scheduling including evenings, nights, and weekends to minimize disruption to your operations.' },
        { q: 'Do you serve all areas of the South Shore?', a: 'We serve Longueuil, Brossard, Saint-Hubert, Boucherville, Repentigny, Terrebonne, and 10+ other South Shore municipalities.' },
      ],
      cta: 'Get a Free Commercial Cleaning Quote',
    },
    fr: {
      title: 'Nettoyage Commercial',
      metaTitle: 'Nettoyage Commercial Montréal | Entretien Bureau Rive-Sud | Montreal Concierge Services',
      metaDescription: 'Services de nettoyage commercial professionnels sur la Rive-Sud de Montréal. Entretien de bureaux, planchers, vitres, désinfection. Soumission gratuite en 60 minutes. Longueuil, Brossard, Repentigny, Terrebonne.',
      h1: 'Services de Nettoyage Commercial sur la Rive-Sud de Montréal',
      intro: 'Montreal Concierge Services offre des services de nettoyage commercial professionnel pour les entreprises de toutes tailles sur la Rive-Sud de Montréal. Du nettoyage quotidien de bureaux à l\'entretien spécialisé des planchers et au lavage de vitres, notre équipe certifiée et assurée livre des résultats impeccables — à chaque intervention.',
      features: [
        { icon: '🧹', title: 'Nettoyage de Bureaux Quotidien', description: 'Nettoyage complet des postes de travail, salles de réunion, aires communes et toilettes. Planifié quotidiennement, hebdomadairement ou aux deux semaines.' },
        { icon: '✨', title: 'Entretien des Planchers', description: 'Décapage, cirage, lustrage et polissage pour tous les types de planchers : vinyle, bois franc, céramique et tapis.' },
        { icon: '🪟', title: 'Lavage de Vitres', description: 'Nettoyage intérieur et extérieur des vitres pour bureaux, commerces et immeubles commerciaux de toutes hauteurs.' },
        { icon: '🦠', title: 'Désinfection et Assainissement', description: 'Protocoles de désinfection de qualité hospitalière pour les surfaces fréquemment touchées, les toilettes et les espaces de travail partagés.' },
        { icon: '🏗️', title: 'Nettoyage Post-Construction', description: 'Nettoyage complet après rénovation ou nouvelle construction, incluant l\'enlèvement des débris et le nettoyage en profondeur.' },
        { icon: '🌿', title: 'Produits Écoresponsables', description: 'Nous utilisons des produits de nettoyage verts certifiés, sécuritaires pour vos employés, clients et l\'environnement.' },
      ],
      subServices: [
        'Nettoyage d\'immeubles de bureaux',
        'Nettoyage de commerces',
        'Nettoyage de cliniques médicales',
        'Nettoyage d\'écoles et établissements d\'enseignement',
        'Nettoyage d\'entrepôts et industriel',
        'Nettoyage de laboratoires pharmaceutiques',
        'Nettoyage de concessionnaires automobiles',
        'Nettoyage de restaurants et hôtellerie',
        'Nettoyage et extraction de tapis',
        'Lavage haute pression',
      ],
      packages: [
        {
          name: 'Essentiel',
          description: 'Parfait pour les petits bureaux jusqu\'à 185 m²',
          included: ['Nettoyage 2x par semaine', 'Aspirateur et lavage', 'Désinfection des toilettes', 'Vidage des poubelles', 'Essuyage des surfaces'],
        },
        {
          name: 'Professionnel',
          description: 'Idéal pour les entreprises moyennes de 185–465 m²',
          included: ['Nettoyage quotidien', 'Entretien planchers mensuel', 'Lavage vitres bimestriel', 'Nettoyage en profondeur trimestriel', 'Superviseur dédié'],
        },
        {
          name: 'Entreprise',
          description: 'Solution complète pour les grands espaces de 465 m²+',
          included: ['Équipe sur place quotidiennement', 'Programme plancher complet', 'Nettoyage profond mensuel', 'Nettoyage post-événement', 'Réponse prioritaire', 'Rapport d\'audit trimestriel'],
        },
      ],
      faq: [
        { q: 'Dans quel délai pouvez-vous commencer les services de nettoyage commercial?', a: 'Nous commençons généralement dans les 48 à 72 heures suivant la signature d\'une entente. Pour les besoins urgents, nous pouvons souvent débuter la même semaine.' },
        { q: 'Votre personnel est-il assuré et a-t-il subi une vérification des antécédents?', a: 'Oui, tous nos employés sont entièrement assurés, en uniforme et ont subi des vérifications approfondies des antécédents pour votre tranquillité d\'esprit.' },
        { q: 'Fournissez-vous les produits et équipements de nettoyage?', a: 'Absolument. Nous apportons tous les produits de nettoyage écologiques de qualité professionnelle et l\'équipement nécessaire. Vous n\'avez rien à fournir.' },
        { q: 'Pouvez-vous nettoyer en dehors des heures d\'ouverture?', a: 'Oui, nous offrons des horaires flexibles incluant les soirs, nuits et fins de semaine pour minimiser les perturbations à vos opérations.' },
        { q: 'Desservez-vous toute la Rive-Sud?', a: 'Nous desservons Longueuil, Brossard, Saint-Hubert, Boucherville, Repentigny, Terrebonne et plus de 10 autres municipalités de la Rive-Sud.' },
      ],
      cta: 'Obtenir une Soumission Gratuite',
    },
  },
  {
    id: 'airbnb',
    slug_en: 'airbnb-concierge-services',
    slug_fr: 'conciergerie-airbnb',
    icon: '🏠',
    image: '/images/services/airbnb-concierge.jpg',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    en: {
      title: 'Airbnb & Rental Concierge',
      metaTitle: 'Airbnb Concierge Services Montreal | Short-Term Rental Management South Shore',
      metaDescription: 'Professional Airbnb concierge services in Montreal South Shore. Guest check-in, key management, professional cleaning, laundry, welcome baskets. Maximize your rental income. Free quote.',
      h1: 'Airbnb Concierge Services in Montreal South Shore',
      intro: 'Maximize your Airbnb and short-term rental income with our complete concierge management service. From guest check-in to professional cleaning between stays, key management, and personalized welcome baskets — we handle everything so you can earn passively.',
      features: [
        { icon: '🤝', title: 'Guest Check-In & Check-Out', description: 'Warm in-person welcome for guests, property walkthrough, key handover, and smooth check-out management.' },
        { icon: '🗝️', title: 'Key Management', description: 'Secure key holding, lockbox installation coordination, and access management for multiple rentals.' },
        { icon: '🧺', title: 'Professional Cleaning Between Stays', description: 'Rapid, hotel-quality cleaning between guest departures and arrivals, including linen change and restocking.' },
        { icon: '👕', title: 'Laundry Service', description: 'Professional washing, drying, folding, and ironing of all linens, towels, and bedding.' },
        { icon: '🎁', title: 'Welcome Baskets', description: 'Custom welcome baskets with local Quebec products, snacks, and personalized notes to delight your guests.' },
        { icon: '📱', title: 'Guest Communication', description: 'Handling guest inquiries, local recommendations, and issue resolution on your behalf.' },
      ],
      subServices: [
        'Pre-arrival property inspection',
        'Deep cleaning & staging',
        'Linen and towel supply',
        'Damage assessment reports',
        'Emergency maintenance coordination',
        'Seasonal property preparation',
        'Photography coordination for listings',
        'Guest review management',
      ],
      packages: [
        {
          name: 'Basic',
          description: 'For occasional rental hosts (1–2 properties)',
          included: ['Check-in & check-out management', 'Between-stay cleaning', 'Key management', 'Basic restocking'],
        },
        {
          name: 'Complete Host',
          description: 'For active Airbnb hosts (2–5 properties)',
          included: ['All Basic services', 'Laundry service', 'Welcome basket', 'Damage reports', 'Priority same-day cleaning'],
        },
        {
          name: 'Full Management',
          description: 'Hands-free management (5+ properties)',
          included: ['All Complete Host services', 'Dedicated property manager', 'Monthly performance reports', 'Guest communication', 'Emergency 24/7 response'],
        },
      ],
      faq: [
        { q: 'How fast can you clean between guest stays?', a: 'We offer same-day turnaround cleaning, typically within 2–4 hours of checkout, ensuring your property is ready for the next guests on time.' },
        { q: 'Do you offer services for VRBO, Booking.com, and other platforms?', a: 'Yes, our concierge services work for any short-term rental platform — Airbnb, VRBO, Booking.com, and direct rentals.' },
        { q: 'Can you manage my property while I\'m out of town?', a: 'Absolutely. We offer full remote property management, handling everything from guest welcome to emergencies.' },
        { q: 'Do you provide linens and towels?', a: 'We can supply hotel-quality linens and towels as part of an all-inclusive package, or we can launder your own supplies.' },
      ],
      cta: 'Start Your Airbnb Concierge Service',
    },
    fr: {
      title: 'Conciergerie Airbnb & Locative',
      metaTitle: 'Conciergerie Airbnb Montréal | Gestion Location Court Terme Rive-Sud',
      metaDescription: 'Services de conciergerie Airbnb professionnels sur la Rive-Sud de Montréal. Accueil des locataires, gestion clés, ménage professionnel, buanderie, panier de bienvenue. Maximisez vos revenus locatifs. Soumission gratuite.',
      h1: 'Conciergerie Airbnb & Locative sur la Rive-Sud de Montréal',
      intro: 'Maximisez vos revenus Airbnb et de location à court terme grâce à notre service de gestion conciergerie complet. De l\'accueil des locataires au ménage professionnel entre les séjours, en passant par la gestion des clés et les paniers de bienvenue personnalisés — nous gérons tout pour que vous puissiez générer des revenus passifs.',
      features: [
        { icon: '🤝', title: 'Accueil et Départ des Locataires', description: 'Accueil chaleureux en personne, visite de la propriété, remise des clés et gestion fluide des départs.' },
        { icon: '🗝️', title: 'Gestion des Clés', description: 'Conservation sécurisée des clés, coordination de l\'installation de boîtes à clés et gestion des accès pour plusieurs locations.' },
        { icon: '🧺', title: 'Ménage Professionnel entre les Séjours', description: 'Nettoyage rapide de qualité hôtelière entre les départs et arrivées de locataires, incluant le changement de literie et le réapprovisionnement.' },
        { icon: '👕', title: 'Service de Buanderie', description: 'Lavage, séchage, pliage et repassage professionnels de toute la literie, serviettes et draps.' },
        { icon: '🎁', title: 'Paniers de Bienvenue', description: 'Paniers de bienvenue personnalisés avec des produits locaux québécois, collations et notes personnalisées pour ravir vos locataires.' },
        { icon: '📱', title: 'Communication avec les Locataires', description: 'Gestion des demandes des locataires, recommandations locales et résolution de problèmes en votre nom.' },
      ],
      subServices: [
        'Inspection de la propriété avant l\'arrivée',
        'Nettoyage en profondeur et mise en scène',
        'Fourniture de literie et serviettes',
        'Rapports d\'évaluation des dommages',
        'Coordination des travaux d\'urgence',
        'Préparation saisonnière de la propriété',
        'Coordination photographique pour les annonces',
        'Gestion des commentaires des locataires',
      ],
      packages: [
        {
          name: 'De base',
          description: 'Pour les hôtes occasionnels (1–2 propriétés)',
          included: ['Gestion des arrivées et départs', 'Ménage entre les séjours', 'Gestion des clés', 'Réapprovisionnement de base'],
        },
        {
          name: 'Hôte Complet',
          description: 'Pour les hôtes actifs Airbnb (2–5 propriétés)',
          included: ['Tous les services De base', 'Service de buanderie', 'Panier de bienvenue', 'Rapports de dommages', 'Nettoyage prioritaire le jour même'],
        },
        {
          name: 'Gestion Complète',
          description: 'Gestion sans tracas (5+ propriétés)',
          included: ['Tous les services Hôte Complet', 'Gestionnaire de propriété dédié', 'Rapports de performance mensuels', 'Communication avec les locataires', 'Réponse d\'urgence 24/7'],
        },
      ],
      faq: [
        { q: 'À quelle vitesse pouvez-vous nettoyer entre les séjours des locataires?', a: 'Nous offrons un nettoyage le jour même, généralement dans les 2 à 4 heures suivant le départ, pour que votre propriété soit prête à temps pour les prochains locataires.' },
        { q: 'Offrez-vous des services pour VRBO, Booking.com et autres plateformes?', a: 'Oui, nos services de conciergerie fonctionnent pour toutes les plateformes de location à court terme : Airbnb, VRBO, Booking.com et les locations directes.' },
        { q: 'Pouvez-vous gérer ma propriété pendant mon absence?', a: 'Absolument. Nous offrons une gestion complète à distance, prenant en charge tout, de l\'accueil des locataires aux urgences.' },
        { q: 'Fournissez-vous la literie et les serviettes?', a: 'Nous pouvons fournir de la literie et des serviettes de qualité hôtelière dans le cadre d\'un forfait tout inclus, ou laver vos propres fournitures.' },
      ],
      cta: 'Démarrer Votre Conciergerie Airbnb',
    },
  },
  {
    id: 'property',
    slug_en: 'property-management-support',
    slug_fr: 'gestion-propriete',
    icon: '🔑',
    image: '/images/services/property-management.jpg',
    color: 'text-green-600',
    bg: 'bg-green-50',
    en: {
      title: 'Property Management Support',
      metaTitle: 'Property Management Support Montreal South Shore | Property Monitoring & Maintenance',
      metaDescription: 'Professional property management support services in Montreal South Shore. Property monitoring, maintenance coordination, landscaping, snow removal. Trusted by property owners in Longueuil, Brossard, Repentigny.',
      h1: 'Property Management Support Services — Montreal South Shore',
      intro: 'Protect and maintain your investment with our comprehensive property management support services. Whether you own a condo, residential building, or commercial property, our team handles everything from regular inspections and maintenance coordination to seasonal services — giving you complete peace of mind.',
      features: [
        { icon: '👁️', title: 'Property Monitoring', description: 'Regular inspections and written reports on the condition of your property, including photos and maintenance recommendations.' },
        { icon: '🔧', title: 'Maintenance Coordination', description: 'We manage and coordinate reliable contractors for plumbing, electrical, HVAC, and general repairs on your behalf.' },
        { icon: '🌱', title: 'Landscaping & Grounds', description: 'Lawn mowing, garden maintenance, hedge trimming, and seasonal flower planting for year-round curb appeal.' },
        { icon: '❄️', title: 'Snow Removal', description: 'Reliable snow clearing for driveways, walkways, and parking lots throughout the Montreal winter season.' },
        { icon: '🏗️', title: 'Renovation Project Support', description: 'Coordination and supervision of renovation projects, ensuring quality workmanship and on-budget delivery.' },
        { icon: '📋', title: 'Condition Reports', description: 'Detailed written condition reports before and after tenancy, or after weather events, for documentation purposes.' },
      ],
      subServices: [
        'Vacant property monitoring',
        'Tenant move-in/move-out inspections',
        'Emergency response coordination',
        'Utility management support',
        'Seasonal property preparation',
        'Pool & spa maintenance coordination',
        'Exterior cleaning & pressure washing',
        'Vendor relationship management',
      ],
      packages: [
        {
          name: 'Watch',
          description: 'Property monitoring only',
          included: ['Monthly inspection visits', 'Photo condition reports', 'Emergency contact available', 'Maintenance alert notifications'],
        },
        {
          name: 'Care',
          description: 'Monitoring + basic maintenance coordination',
          included: ['All Watch services', 'Bi-weekly inspections', 'Contractor coordination', 'Seasonal services', 'Monthly summary reports'],
        },
        {
          name: 'Complete',
          description: 'Full property management support',
          included: ['All Care services', 'Weekly inspections', 'Full contractor network access', 'Renovation support', 'Priority emergency response', 'Quarterly portfolio review'],
        },
      ],
      faq: [
        { q: 'How often will you inspect my property?', a: 'Depending on your package, we offer monthly, bi-weekly, or weekly inspection visits with full written reports and photos.' },
        { q: 'Can you manage an empty/vacant property?', a: 'Yes, this is one of our specialties. We ensure vacant properties are secure, maintained, and ready for occupancy at all times.' },
        { q: 'Do you handle snow removal in the winter?', a: 'Yes, we offer seasonal snow removal contracts for driveways, walkways, and parking areas throughout the South Shore.' },
      ],
      cta: 'Protect Your Property Today',
    },
    fr: {
      title: 'Gestion de Propriété',
      metaTitle: 'Gestion de Propriété Rive-Sud Montréal | Surveillance et Entretien Immobilier',
      metaDescription: 'Services de soutien à la gestion de propriété professionnels sur la Rive-Sud de Montréal. Surveillance immobilière, coordination de maintenance, entretien paysager, déneigement. Propriétaires de Longueuil, Brossard, Repentigny nous font confiance.',
      h1: 'Services de Gestion de Propriété — Rive-Sud de Montréal',
      intro: 'Protégez et valorisez votre investissement avec nos services complets de soutien à la gestion immobilière. Que vous possédiez un condo, un immeuble résidentiel ou une propriété commerciale, notre équipe s\'occupe de tout, des inspections régulières à la coordination de la maintenance, en passant par les services saisonniers — pour une tranquillité d\'esprit totale.',
      features: [
        { icon: '👁️', title: 'Surveillance Immobilière', description: 'Inspections régulières et rapports écrits sur l\'état de votre propriété, incluant photos et recommandations de maintenance.' },
        { icon: '🔧', title: 'Coordination de la Maintenance', description: 'Nous gérons et coordonnons des entrepreneurs fiables pour la plomberie, l\'électricité, le CVC et les réparations générales en votre nom.' },
        { icon: '🌱', title: 'Entretien Paysager', description: 'Tonte du gazon, entretien des jardins, taille des haies et plantation saisonnière pour une belle apparence extérieure toute l\'année.' },
        { icon: '❄️', title: 'Déneigement', description: 'Déneigement fiable des entrées, allées et stationnements tout au long de l\'hiver montréalais.' },
        { icon: '🏗️', title: 'Soutien aux Projets de Rénovation', description: 'Coordination et supervision des projets de rénovation, assurant la qualité des travaux et le respect du budget.' },
        { icon: '📋', title: 'Rapports d\'État', description: 'Rapports écrits détaillés avant et après les locations, ou suite à des événements météorologiques, à des fins de documentation.' },
      ],
      subServices: [
        'Surveillance de propriétés vacantes',
        'Inspections d\'entrée et de sortie des locataires',
        'Coordination des interventions d\'urgence',
        'Soutien à la gestion des services publics',
        'Préparation saisonnière de la propriété',
        'Coordination de l\'entretien des piscines et spas',
        'Nettoyage extérieur et lavage haute pression',
        'Gestion des relations avec les fournisseurs',
      ],
      packages: [
        {
          name: 'Surveillance',
          description: 'Surveillance de propriété seulement',
          included: ['Visites d\'inspection mensuelles', 'Rapports photo sur l\'état', 'Disponibilité en cas d\'urgence', 'Notifications d\'alerte de maintenance'],
        },
        {
          name: 'Entretien',
          description: 'Surveillance + coordination de maintenance de base',
          included: ['Tous les services Surveillance', 'Inspections aux deux semaines', 'Coordination des entrepreneurs', 'Services saisonniers', 'Rapports mensuels'],
        },
        {
          name: 'Complet',
          description: 'Soutien à la gestion immobilière complète',
          included: ['Tous les services Entretien', 'Inspections hebdomadaires', 'Accès complet au réseau d\'entrepreneurs', 'Soutien aux rénovations', 'Réponse d\'urgence prioritaire', 'Revue trimestrielle du portefeuille'],
        },
      ],
      faq: [
        { q: 'À quelle fréquence inspecterez-vous ma propriété?', a: 'Selon votre forfait, nous offrons des visites d\'inspection mensuelles, aux deux semaines ou hebdomadaires avec des rapports complets écrits et photos.' },
        { q: 'Pouvez-vous gérer une propriété vide/vacante?', a: 'Oui, c\'est l\'une de nos spécialités. Nous nous assurons que les propriétés vacantes sont sécurisées, entretenues et prêtes à être occupées en tout temps.' },
        { q: 'Offrez-vous le déneigement en hiver?', a: 'Oui, nous offrons des contrats saisonniers de déneigement pour les entrées, allées et stationnements sur toute la Rive-Sud.' },
      ],
      cta: 'Protégez Votre Propriété Maintenant',
    },
  },
  {
    id: 'business',
    slug_en: 'business-concierge-services',
    slug_fr: 'services-entreprises',
    icon: '💼',
    image: '/images/services/business-concierge.jpg',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    en: {
      title: 'Business Concierge Services',
      metaTitle: 'Business Concierge Services Montreal | Corporate Concierge South Shore',
      metaDescription: 'Corporate concierge services for businesses in Montreal South Shore. Dry cleaning, parcel management, neighborhood errands, employee services. Increase productivity, reduce HR distractions.',
      h1: 'Business Concierge Services for Companies in Montreal',
      intro: 'Increase employee productivity and satisfaction with our business concierge services. From dry cleaning pickup and parcel management to neighborhood errands and personal assistance — we handle the day-to-day logistics so your team can focus on what matters most.',
      features: [
        { icon: '👔', title: 'Dry Cleaning & Pressing', description: 'Pickup, dry cleaning, pressing, and return of employee clothing at the office. Uniform and formal wear specialists.' },
        { icon: '📦', title: 'Parcel Management', description: 'Receiving, sorting, storing, and distributing mail and parcels for employees and departments.' },
        { icon: '🏪', title: 'Neighborhood Errands', description: 'Pharmacy pickups, grocery runs, office supply restocking, and other local errands handled efficiently.' },
        { icon: '🎁', title: 'Corporate Gift Management', description: 'Sourcing, wrapping, and delivering client or employee gifts for holidays, events, and milestones.' },
        { icon: '✈️', title: 'Travel & Event Support', description: 'Travel logistics assistance, restaurant reservations, event tickets, and VIP experience coordination.' },
        { icon: '🤲', title: 'Personal Assistant Services', description: 'Dedicated concierge support for executives including scheduling, research, and administrative assistance.' },
      ],
      subServices: [
        'Corporate event coordination',
        'Office catering coordination',
        'Document courier services',
        'Employee wellness program support',
        'Meeting room setup & teardown',
        'Supplier & vendor management',
        'Expense & receipt management',
        'Translation & interpretation coordination',
      ],
      packages: [
        {
          name: 'Starter',
          description: 'For teams up to 25 employees',
          included: ['Parcel management', '5 errand hours/month', 'Basic dry cleaning service', 'Email support'],
        },
        {
          name: 'Business',
          description: 'For companies with 25–100 employees',
          included: ['All Starter services', '15 errand hours/month', 'Corporate gift management', 'Event support (2x/month)', 'Dedicated contact person'],
        },
        {
          name: 'Executive',
          description: 'Premium service for 100+ employees',
          included: ['All Business services', 'Unlimited errands', 'Personal assistant support', 'Full event management', 'Priority VIP response', 'Monthly account review'],
        },
      ],
      faq: [
        { q: 'How does the dry cleaning service work?', a: 'We collect garments from the office in the morning and return them clean and pressed the next business day or same day for urgent needs.' },
        { q: 'Can concierge services help reduce employee distractions?', a: 'Absolutely. Studies show employees spend 1–2 hours per week on personal errands during work hours. Our service handles these efficiently, boosting productivity.' },
        { q: 'Do you offer services in both French and English?', a: 'Yes, our entire team is fully bilingual (French/English) and we serve businesses in both languages across the South Shore.' },
      ],
      cta: 'Request a Business Concierge Consultation',
    },
    fr: {
      title: 'Conciergerie d\'Entreprise',
      metaTitle: 'Conciergerie d\'Entreprise Montréal | Services aux Entreprises Rive-Sud',
      metaDescription: 'Services de conciergerie d\'entreprise pour les sociétés de la Rive-Sud de Montréal. Pressing, gestion de colis, courses de quartier, services aux employés. Augmentez la productivité, réduisez les distractions.',
      h1: 'Services de Conciergerie d\'Entreprise à Montréal',
      intro: 'Augmentez la productivité et la satisfaction de vos employés grâce à nos services de conciergerie d\'entreprise. Du ramassage pour le pressing à la gestion des colis, en passant par les courses de quartier et l\'assistance personnelle — nous gérons la logistique quotidienne pour que votre équipe puisse se concentrer sur l\'essentiel.',
      features: [
        { icon: '👔', title: 'Pressing et Nettoyage à Sec', description: 'Ramassage, nettoyage à sec, repassage et retour des vêtements des employés au bureau. Spécialistes des uniformes et tenues formelles.' },
        { icon: '📦', title: 'Gestion des Colis', description: 'Réception, tri, stockage et distribution du courrier et des colis pour les employés et les départements.' },
        { icon: '🏪', title: 'Courses de Quartier', description: 'Ramassage en pharmacie, courses d\'épicerie, réapprovisionnement en fournitures de bureau et autres courses locales traitées efficacement.' },
        { icon: '🎁', title: 'Gestion des Cadeaux d\'Entreprise', description: 'Recherche, emballage et livraison de cadeaux pour les clients ou les employés lors des fêtes, événements et étapes importantes.' },
        { icon: '✈️', title: 'Soutien aux Voyages et Événements', description: 'Aide à la logistique de voyage, réservations de restaurants, billets d\'événements et coordination d\'expériences VIP.' },
        { icon: '🤲', title: 'Services d\'Assistant Personnel', description: 'Soutien de conciergerie dédié aux cadres, incluant la planification, la recherche et l\'assistance administrative.' },
      ],
      subServices: [
        'Coordination d\'événements corporatifs',
        'Coordination de la restauration de bureau',
        'Services de messagerie de documents',
        'Soutien aux programmes de bien-être des employés',
        'Installation et démontage de salles de réunion',
        'Gestion des fournisseurs',
        'Gestion des dépenses et des reçus',
        'Coordination de traduction et d\'interprétation',
      ],
      packages: [
        {
          name: 'Démarrage',
          description: 'Pour les équipes jusqu\'à 25 employés',
          included: ['Gestion des colis', '5 heures de courses par mois', 'Service de pressing de base', 'Soutien par courriel'],
        },
        {
          name: 'Affaires',
          description: 'Pour les entreprises de 25 à 100 employés',
          included: ['Tous les services Démarrage', '15 heures de courses par mois', 'Gestion des cadeaux d\'entreprise', 'Soutien aux événements (2x/mois)', 'Personne de contact dédiée'],
        },
        {
          name: 'Exécutif',
          description: 'Service premium pour 100+ employés',
          included: ['Tous les services Affaires', 'Courses illimitées', 'Soutien d\'assistant personnel', 'Gestion complète des événements', 'Réponse prioritaire VIP', 'Revue de compte mensuelle'],
        },
      ],
      faq: [
        { q: 'Comment fonctionne le service de pressing?', a: 'Nous collectons les vêtements au bureau le matin et les retournons propres et repassés le jour ouvrable suivant, ou le jour même pour les besoins urgents.' },
        { q: 'Les services de conciergerie peuvent-ils aider à réduire les distractions des employés?', a: 'Absolument. Des études montrent que les employés consacrent 1 à 2 heures par semaine à des courses personnelles pendant les heures de travail. Notre service gère cela efficacement, augmentant la productivité.' },
        { q: 'Offrez-vous des services en français et en anglais?', a: 'Oui, toute notre équipe est entièrement bilingue (français/anglais) et nous servons les entreprises dans les deux langues sur toute la Rive-Sud.' },
      ],
      cta: 'Demander une Consultation Conciergerie',
    },
  },
  {
    id: 'dayporter',
    slug_en: 'day-porter-janitorial-services',
    slug_fr: 'conciergerie-de-jour',
    icon: '🧹',
    image: '/images/services/day-porter.jpg',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    en: {
      title: 'Day Porter Services',
      metaTitle: 'Day Porter Services Montreal South Shore | On-Site Janitorial Concierge',
      metaDescription: 'Professional day porter and janitorial concierge services in Montreal South Shore. On-site daytime cleaning, restroom maintenance, trash removal, emergency spill response. Available for offices, buildings, and complexes.',
      h1: 'Day Porter & Janitorial Concierge Services in Montreal',
      intro: 'Keep your facility clean, safe, and professional throughout the business day with our dedicated day porter services. Our uniformed, on-site team handles restroom maintenance, trash removal, lobby upkeep, and emergency cleaning so your environment always looks its best — while your business operates.',
      features: [
        { icon: '🚻', title: 'Restroom Maintenance', description: 'Continuous restroom monitoring, cleaning, sanitizing, and supply restocking throughout the day.' },
        { icon: '🗑️', title: 'Trash & Recycling Service', description: 'Regular emptying of trash bins, recycling sorting, and waste disposal throughout your facility.' },
        { icon: '🏢', title: 'Lobby & Common Area Upkeep', description: 'Ongoing maintenance of lobbies, hallways, elevators, and common areas to ensure a professional first impression.' },
        { icon: '☕', title: 'Break Room Maintenance', description: 'Keeping break rooms, kitchenettes, and coffee stations clean, stocked, and ready for use at all times.' },
        { icon: '⚡', title: 'Emergency Spill Response', description: 'Immediate response to spills, accidents, and unexpected cleaning needs anywhere in your facility.' },
        { icon: '🧼', title: 'Surface Disinfection Rounds', description: 'Scheduled disinfection of high-touch surfaces: door handles, elevator buttons, light switches, and shared equipment.' },
      ],
      subServices: [
        'Elevator cleaning & maintenance',
        'Conference room turnaround between meetings',
        'Recycling program management',
        'Floor spot cleaning & wet mop response',
        'Outdoor entrance maintenance',
        'Event setup & cleanup assistance',
        'Supply inventory management',
        'Seasonal deep cleaning coordination',
      ],
      packages: [
        {
          name: 'Part-Time',
          description: '4 hours/day, 5 days/week',
          included: ['Restroom checks (2x/day)', 'Trash removal (2x/day)', 'Break room maintenance', 'Lobby spot cleaning'],
        },
        {
          name: 'Full-Time',
          description: '8 hours/day, 5 days/week',
          included: ['All Part-Time services', 'Hourly restroom rounds', 'Full common area coverage', 'Emergency spill response', 'Supply management'],
        },
        {
          name: 'Extended',
          description: '12 hours/day or shift-based coverage',
          included: ['All Full-Time services', 'Extended hours coverage', 'Event support', 'Full facility rounds every 2 hours', 'Daily activity reports', 'Supervisor on-site'],
        },
      ],
      faq: [
        { q: 'What\'s the difference between a day porter and regular cleaning?', a: 'Regular cleaning typically happens after hours. A day porter is on-site during business hours, providing continuous maintenance and immediate response to cleaning needs as they arise.' },
        { q: 'Can the day porter respond to unexpected spills or emergencies?', a: 'Yes, emergency response is a core part of day porter services. Our team is trained to respond quickly to spills, accidents, and any unexpected situation.' },
        { q: 'Do you provide the day porter\'s supplies and equipment?', a: 'Yes, we supply all professional cleaning equipment, products, and personal protective equipment for our day porters.' },
        { q: 'Can I hire a day porter for a specific event?', a: 'Absolutely. We offer event-specific day porter services for conferences, trade shows, open houses, and corporate events.' },
      ],
      cta: 'Get a Day Porter Service Quote',
    },
    fr: {
      title: 'Conciergerie de Jour',
      metaTitle: 'Conciergerie de Jour Montréal Rive-Sud | Services de Conciergerie Diurne',
      metaDescription: 'Services professionnels de conciergerie de jour sur la Rive-Sud de Montréal. Nettoyage diurne sur place, entretien des toilettes, vidage des poubelles, intervention d\'urgence. Disponible pour bureaux, immeubles et complexes.',
      h1: 'Services de Conciergerie de Jour à Montréal',
      intro: 'Maintenez votre installation propre, sécuritaire et professionnelle tout au long de la journée de travail grâce à nos services de conciergerie de jour dédiés. Notre équipe en uniforme, sur place, s\'occupe de l\'entretien des toilettes, du vidage des poubelles, de l\'entretien du hall et du nettoyage d\'urgence — pour que votre environnement soit toujours impeccable pendant vos heures d\'opération.',
      features: [
        { icon: '🚻', title: 'Entretien des Toilettes', description: 'Surveillance continue, nettoyage, désinfection et réapprovisionnement des toilettes tout au long de la journée.' },
        { icon: '🗑️', title: 'Service de Poubelles et Recyclage', description: 'Vidage régulier des poubelles, tri du recyclage et évacuation des déchets dans toute votre installation.' },
        { icon: '🏢', title: 'Entretien du Hall et des Aires Communes', description: 'Maintenance continue des halls, couloirs, ascenseurs et aires communes pour garantir une première impression professionnelle.' },
        { icon: '☕', title: 'Entretien des Salles de Pause', description: 'Maintien de la propreté des salles de pause, cuisinettes et stations de café, stockées et prêtes à l\'utilisation en tout temps.' },
        { icon: '⚡', title: 'Intervention d\'Urgence en Cas de Déversement', description: 'Réponse immédiate aux déversements, accidents et besoins de nettoyage imprévus partout dans votre installation.' },
        { icon: '🧼', title: 'Rondes de Désinfection des Surfaces', description: 'Désinfection planifiée des surfaces fréquemment touchées : poignées de portes, boutons d\'ascenseur, interrupteurs et équipements partagés.' },
      ],
      subServices: [
        'Nettoyage et entretien des ascenseurs',
        'Remise en état des salles de conférence entre les réunions',
        'Gestion des programmes de recyclage',
        'Nettoyage ponctuel des planchers et intervention au lavage humide',
        'Entretien des entrées extérieures',
        'Aide à l\'installation et au nettoyage pour les événements',
        'Gestion de l\'inventaire des fournitures',
        'Coordination du nettoyage en profondeur saisonnier',
      ],
      packages: [
        {
          name: 'Temps partiel',
          description: '4 heures/jour, 5 jours/semaine',
          included: ['Vérifications des toilettes (2x/jour)', 'Vidage des poubelles (2x/jour)', 'Entretien des salles de pause', 'Nettoyage ponctuel du hall'],
        },
        {
          name: 'Temps plein',
          description: '8 heures/jour, 5 jours/semaine',
          included: ['Tous les services Temps partiel', 'Rondes horaires des toilettes', 'Couverture complète des aires communes', 'Intervention d\'urgence en cas de déversement', 'Gestion des fournitures'],
        },
        {
          name: 'Étendu',
          description: '12 heures/jour ou couverture par quarts',
          included: ['Tous les services Temps plein', 'Couverture en heures prolongées', 'Soutien aux événements', 'Rondes complètes de l\'installation toutes les 2 heures', 'Rapports d\'activité quotidiens', 'Superviseur sur place'],
        },
      ],
      faq: [
        { q: 'Quelle est la différence entre un concierge de jour et le nettoyage régulier?', a: 'Le nettoyage régulier se fait généralement après les heures. Un concierge de jour est sur place pendant les heures de travail, assurant une maintenance continue et une réponse immédiate aux besoins de nettoyage au fur et à mesure qu\'ils surviennent.' },
        { q: 'Le concierge de jour peut-il répondre aux déversements ou urgences imprévus?', a: 'Oui, la réponse aux urgences est un élément central des services de conciergerie de jour. Notre équipe est formée pour répondre rapidement aux déversements, accidents et toute situation imprévue.' },
        { q: 'Fournissez-vous les fournitures et équipements du concierge de jour?', a: 'Oui, nous fournissons tout l\'équipement de nettoyage professionnel, les produits et les équipements de protection individuelle pour nos concierges de jour.' },
        { q: 'Puis-je engager un concierge de jour pour un événement spécifique?', a: 'Absolument. Nous offrons des services de conciergerie de jour spécifiques aux événements pour les conférences, salons professionnels, portes ouvertes et événements corporatifs.' },
      ],
      cta: 'Obtenir une Soumission Conciergerie de Jour',
    },
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES_DATA.find(
    (s) => s.slug_en === slug || s.slug_fr === slug
  );
}

export function getServiceLocaleData(service: ServiceData, locale: string) {
  return locale === 'fr' ? service.fr : service.en;
}

export function getAllSlugs(): { slug: string; locale: string }[] {
  const slugs: { slug: string; locale: string }[] = [];
  SERVICES_DATA.forEach((s) => {
    slugs.push({ slug: s.slug_en, locale: 'en' });
    slugs.push({ slug: s.slug_fr, locale: 'fr' });
  });
  return slugs;
}
