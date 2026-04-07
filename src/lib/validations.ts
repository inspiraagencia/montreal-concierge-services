import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(100),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' }),
  phone: z
    .string()
    .min(10, { message: 'Please enter a valid phone number' })
    .max(20),
  service_type: z
    .string()
    .min(1, { message: 'Please select a service type' }),
  description: z
    .string()
    .min(10, { message: 'Please describe your needs (at least 10 characters)' })
    .max(2000),
  budget: z
    .string()
    .min(1, { message: 'Please select a budget range' }),
  urgency: z
    .string()
    .min(1, { message: 'Please select when you need the service' }),
  location: z
    .string()
    .min(1, { message: 'Please select your area' }),
  terms: z
    .boolean()
    .refine((val) => val === true, { message: 'You must accept the terms' }),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// French error messages override via i18n — base validation is in English
export const contactSchemaFr = z.object({
  name: z
    .string()
    .min(2, { message: 'Le nom doit contenir au moins 2 caractères' })
    .max(100),
  email: z
    .string()
    .email({ message: 'Veuillez saisir une adresse courriel valide' }),
  phone: z
    .string()
    .min(10, { message: 'Veuillez saisir un numéro de téléphone valide' })
    .max(20),
  service_type: z
    .string()
    .min(1, { message: 'Veuillez sélectionner un type de service' }),
  description: z
    .string()
    .min(10, { message: 'Veuillez décrire vos besoins (minimum 10 caractères)' })
    .max(2000),
  budget: z
    .string()
    .min(1, { message: 'Veuillez sélectionner une fourchette budgétaire' }),
  urgency: z
    .string()
    .min(1, { message: 'Veuillez indiquer quand vous avez besoin du service' }),
  location: z
    .string()
    .min(1, { message: 'Veuillez sélectionner votre zone' }),
  terms: z
    .boolean()
    .refine((val) => val === true, { message: 'Vous devez accepter les conditions' }),
});
