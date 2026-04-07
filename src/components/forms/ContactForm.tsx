'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { contactSchema, contactSchemaFr, ContactFormData } from '@/lib/validations';
import { SERVICE_CATEGORIES, LOCATIONS_SERVED } from '@/lib/constants';

const SERVICE_OPTIONS_EN = [
  { value: 'Commercial Cleaning', label: 'Commercial Cleaning' },
  { value: 'Airbnb Concierge', label: 'Airbnb & Rental Concierge' },
  { value: 'Property Management', label: 'Property Management Support' },
  { value: 'Business Concierge', label: 'Business Concierge Services' },
  { value: 'Day Porter', label: 'Day Porter / Janitorial Services' },
  { value: 'Other', label: 'Other / Multiple Services' },
];

const SERVICE_OPTIONS_FR = [
  { value: 'Nettoyage Commercial', label: 'Nettoyage Commercial' },
  { value: 'Conciergerie Airbnb', label: 'Conciergerie Airbnb & Locative' },
  { value: 'Gestion de Propriété', label: 'Gestion de Propriété' },
  { value: "Conciergerie d'Entreprise", label: "Conciergerie d'Entreprise" },
  { value: 'Conciergerie de Jour', label: 'Conciergerie de Jour' },
  { value: 'Autre', label: 'Autre / Plusieurs services' },
];

const BUDGET_OPTIONS_EN = [
  { value: 'under-500', label: 'Under $500/month' },
  { value: '500-1000', label: '$500 – $1,000/month' },
  { value: '1000-2500', label: '$1,000 – $2,500/month' },
  { value: '2500-5000', label: '$2,500 – $5,000/month' },
  { value: 'over-5000', label: 'Over $5,000/month' },
  { value: 'custom', label: 'Custom / One-time service' },
];

const BUDGET_OPTIONS_FR = [
  { value: 'under-500', label: 'Moins de 500$/mois' },
  { value: '500-1000', label: '500$ – 1 000$/mois' },
  { value: '1000-2500', label: '1 000$ – 2 500$/mois' },
  { value: '2500-5000', label: '2 500$ – 5 000$/mois' },
  { value: 'over-5000', label: 'Plus de 5 000$/mois' },
  { value: 'custom', label: 'Personnalisé / Service ponctuel' },
];

const URGENCY_OPTIONS_EN = [
  { value: 'asap', label: 'As soon as possible' },
  { value: 'this-week', label: 'This week' },
  { value: 'this-month', label: 'This month' },
  { value: 'planning', label: 'Just planning ahead' },
];

const URGENCY_OPTIONS_FR = [
  { value: 'asap', label: 'Dès que possible' },
  { value: 'this-week', label: 'Cette semaine' },
  { value: 'this-month', label: 'Ce mois-ci' },
  { value: 'planning', label: 'Simple planification' },
];

export default function ContactForm() {
  const locale = useLocale();
  const t = useTranslations('contact.form');
  const isEn = locale === 'en';
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const schema = isEn ? contactSchema : contactSchemaFr;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: { terms: false },
  });

  const serviceOptions = isEn ? SERVICE_OPTIONS_EN : SERVICE_OPTIONS_FR;
  const budgetOptions = isEn ? BUDGET_OPTIONS_EN : BUDGET_OPTIONS_FR;
  const urgencyOptions = isEn ? URGENCY_OPTIONS_EN : URGENCY_OPTIONS_FR;

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-locale': locale,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Submit failed');

      setSubmitStatus('success');
      reset();
    } catch {
      setSubmitStatus('error');
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="text-center py-12 px-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading text-2xl font-bold text-primary-900 mb-3">
          {isEn ? 'Request Sent!' : 'Demande envoyée!'}
        </h3>
        <p className="text-neutral-600 mb-8 max-w-md mx-auto">
          {t('success')}
        </p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="btn-secondary"
        >
          {isEn ? 'Send Another Request' : 'Envoyer une autre demande'}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {/* Row 1: Name + Email */}
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="label-field">
            {t('name')} <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder={isEn ? 'John Smith' : 'Jean Tremblay'}
            className={`input-field ${errors.name ? 'border-red-400 focus:ring-red-400' : ''}`}
            {...register('name')}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="label-field">
            {t('email')} <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="votre@email.com"
            className={`input-field ${errors.email ? 'border-red-400 focus:ring-red-400' : ''}`}
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Phone + Service */}
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="label-field">
            {t('phone')} <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 (514) 000-0000"
            className={`input-field ${errors.phone ? 'border-red-400 focus:ring-red-400' : ''}`}
            {...register('phone')}
          />
          {errors.phone && (
            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              {errors.phone.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="service_type" className="label-field">
            {t('serviceType')} <span className="text-red-500">*</span>
          </label>
          <select
            id="service_type"
            className={`input-field ${errors.service_type ? 'border-red-400 focus:ring-red-400' : ''}`}
            {...register('service_type')}
          >
            <option value="">{t('selectService')}</option>
            {serviceOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {errors.service_type && (
            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              {errors.service_type.message}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="label-field">
          {t('description')} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          rows={4}
          placeholder={t('descriptionPlaceholder')}
          className={`input-field resize-none ${errors.description ? 'border-red-400 focus:ring-red-400' : ''}`}
          {...register('description')}
        />
        {errors.description && (
          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Row 3: Budget + Urgency */}
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="budget" className="label-field">
            {t('budget')} <span className="text-red-500">*</span>
          </label>
          <select
            id="budget"
            className={`input-field ${errors.budget ? 'border-red-400 focus:ring-red-400' : ''}`}
            {...register('budget')}
          >
            <option value="">{t('selectBudget')}</option>
            {budgetOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {errors.budget && (
            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              {errors.budget.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="urgency" className="label-field">
            {t('urgency')} <span className="text-red-500">*</span>
          </label>
          <select
            id="urgency"
            className={`input-field ${errors.urgency ? 'border-red-400 focus:ring-red-400' : ''}`}
            {...register('urgency')}
          >
            <option value="">{t('selectUrgency')}</option>
            {urgencyOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {errors.urgency && (
            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              {errors.urgency.message}
            </p>
          )}
        </div>
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className="label-field">
          {t('location')} <span className="text-red-500">*</span>
        </label>
        <select
          id="location"
          className={`input-field ${errors.location ? 'border-red-400 focus:ring-red-400' : ''}`}
          {...register('location')}
        >
          <option value="">{t('selectLocation')}</option>
          {LOCATIONS_SERVED.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
          <option value="Other">{isEn ? 'Other / Outside listed areas' : 'Autre / Hors des zones listées'}</option>
        </select>
        {errors.location && (
          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            {errors.location.message}
          </p>
        )}
      </div>

      {/* Terms */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            className="mt-0.5 w-4 h-4 rounded border-neutral-300 text-primary-500 focus:ring-primary-500 shrink-0"
            {...register('terms')}
          />
          <span className="text-sm text-neutral-600 group-hover:text-neutral-800 transition-colors">
            {t('terms')}
          </span>
        </label>
        {errors.terms && (
          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            {errors.terms.message}
          </p>
        )}
      </div>

      {/* Error global */}
      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <p className="text-sm text-red-700">{t('error')}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitStatus === 'loading'}
        className="w-full btn-primary py-4 text-base font-bold disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitStatus === 'loading' ? (
          <span className="flex items-center justify-center gap-3">
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {t('sending')}
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            {t('submit')}
          </span>
        )}
      </button>

      {/* Trust signals under button */}
      <div className="flex flex-wrap justify-center gap-4 pt-2 text-xs text-neutral-400">
        <span className="flex items-center gap-1">🔒 {isEn ? 'Secure & confidential' : 'Sécurisé et confidentiel'}</span>
        <span className="flex items-center gap-1">⚡ {isEn ? '60-min response' : 'Réponse en 60 min'}</span>
        <span className="flex items-center gap-1">🆓 {isEn ? '100% free quote' : 'Soumission 100% gratuite'}</span>
      </div>
    </form>
  );
}
