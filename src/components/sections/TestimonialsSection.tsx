'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import TestimonialCard from '@/components/TestimonialCard';
import { testimonialsByLocale } from '@/lib/testimonials-data';

export default function TestimonialsSection() {
  const locale = useLocale() as 'en' | 'fr';
  const testimonials = testimonialsByLocale[locale];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay || testimonials.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlay, testimonials.length]);

  const handlePrev = () => { setIsAutoPlay(false); setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length); };
  const handleNext = () => { setIsAutoPlay(false); setCurrentIndex((prev) => (prev + 1) % testimonials.length); };
  const handleDotClick = (i: number) => { setIsAutoPlay(false); setCurrentIndex(i); };

  if (testimonials.length === 0) return null;

  return (
    <section
      className="section-padding"
      style={{ background: 'linear-gradient(160deg, #060e2c 0%, #0a1a4e 50%, #0c2261 100%)' }}
    >
      <div className="section-container">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label justify-center" style={{ color: '#3de7f8' }}>
            <span className="inline-block w-6 h-px" style={{ background: '#3de7f8' }} />
            {locale === 'fr' ? 'Témoignages' : 'Testimonials'}
          </span>
          <h2
            className="font-heading font-bold text-white mb-4"
            style={{ fontSize: 'clamp(1.875rem, 3vw, 2.75rem)' }}
          >
            {locale === 'fr' ? (
              <>Avis Clients — Pourquoi les Entreprises{' '}
                <span style={{ background: 'linear-gradient(135deg, #00c0d4, #3de7f8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Nous Font Confiance
                </span>
              </>
            ) : (
              <>Client Reviews — Why Businesses{' '}
                <span style={{ background: 'linear-gradient(135deg, #00c0d4, #3de7f8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Trust Us
                </span>
              </>
            )}
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {locale === 'fr'
              ? 'Avis authentiques de clients satisfaits — entreprises, propriétaires et gestionnaires de la Rive-Sud et Grand Montréal.'
              : 'Real reviews from satisfied clients — businesses, property owners and managers across South Shore and Greater Montreal.'}
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative min-h-72 mb-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                isActive={index === currentIndex}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'white',
              }}
              aria-label={locale === 'fr' ? 'Précédent' : 'Previous'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-2 items-center">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDotClick(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === currentIndex ? '24px' : '8px',
                    height: '8px',
                    background: i === currentIndex ? '#00c0d4' : 'rgba(255,255,255,0.25)',
                  }}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'white',
              }}
              aria-label={locale === 'fr' ? 'Suivant' : 'Next'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <p className="text-center text-sm mt-4" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {currentIndex + 1} / {testimonials.length}
          </p>
        </div>
      </div>
    </section>
  );
}
