export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  clientPhoto: string;
  quote: string;
  rating: number;
  service: string;
  locale: 'en' | 'fr';
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    clientName: 'Jean-François Dubois',
    clientRole: 'Directeur, Immeubles Commerciaux Montréal',
    clientPhoto: '/images/testimonials/client-jean-francois.jpg',
    quote: 'Leur service de conciergerie a transformé la gestion de notre immeuble. Professionnels, fiables et toujours disponibles.',
    rating: 5,
    service: 'Conciergerie Commerciale',
    locale: 'fr',
  },
  {
    id: '2',
    clientName: 'Sarah Mitchell',
    clientRole: 'Property Manager, Riviera Sud',
    clientPhoto: '/images/testimonials/client-sarah.jpg',
    quote: 'Outstanding concierge services! They handle everything with precision and attention to detail. Highly recommended.',
    rating: 5,
    service: 'Commercial Cleaning',
    locale: 'en',
  },
  {
    id: '3',
    clientName: 'Marie-Louise Gagnon',
    clientRole: 'Propriétaire, Résidence Haut-de-Gamme',
    clientPhoto: '/images/testimonials/client-marie.jpg',
    quote: 'Un service impeccable et discret. Ils comprennent parfaitement nos besoins et les satisfont avec excellence.',
    rating: 5,
    service: 'Gestion Résidentielle',
    locale: 'fr',
  },
  {
    id: '4',
    clientName: 'Robert Chen',
    clientRole: 'CFO, Corporate Office Montreal',
    clientPhoto: '/images/testimonials/client-robert.jpg',
    quote: "Professional, reliable, and cost-effective. They've streamlined our building operations significantly.",
    rating: 5,
    service: 'Office Management',
    locale: 'en',
  },
  {
    id: '5',
    clientName: 'Véronique Beaumont',
    clientRole: 'Gestionnaire, Airbnb Riviera Sud',
    clientPhoto: '/images/testimonials/client-veronique.jpg',
    quote: 'Parfait pour la gestion Airbnb! Nos locataires adorent le service impeccable et la réactivité.',
    rating: 5,
    service: 'Gestion Airbnb',
    locale: 'fr',
  },
];

export const testimonialsByLocale = {
  en: testimonials.filter((t) => t.locale === 'en'),
  fr: testimonials.filter((t) => t.locale === 'fr'),
};
