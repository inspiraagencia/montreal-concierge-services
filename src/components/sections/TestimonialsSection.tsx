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

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (!isAutoPlay || testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, testimonials.length]);

  const handlePrev = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlay(false);
    setCurrentIndex(index);
  };

  if (testimonials.length === 0) return null;

  const headingText = locale === 'en' ? 'What Our Clients Say' : 'Ce Que Disent Nos Clients';
  const prevText = locale === 'en' ? 'Previous' : 'Précédent';
  const nextText = locale === 'en' ? 'Next' : 'Suivant';

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {locale === 'en' ? (
              <>Client <strong>Testimonials</strong> - Why Businesses Trust Us</>
            ) : (
              <>Avis Clients - Pourquoi les Entreprises <strong>Nous Font Confiance</strong></>
            )}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {locale === 'en'
              ? 'Real reviews from satisfied clients who trust our professional concierge and cleaning services in Montreal and Riviera Sud.'
              : 'Avis authentiques de clients satisfaits qui font confiance à nos services de conciergerie professionnels à Montréal et Riviera Sud.'}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Testimonial Cards */}
          <div className="relative h-80 md:h-96 mb-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                isActive={index === currentIndex}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={handlePrev}
              className="
                p-3 rounded-full bg-white shadow-md hover:bg-blue-50
                transition transform hover:scale-110 active:scale-95
                border border-gray-200
              "
              aria-label={prevText}
              title={prevText}
            >
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dot Indicators */}
            <div className="flex gap-2 justify-center flex-wrap">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`
                    w-3 h-3 rounded-full transition transform
                    ${
                      index === currentIndex
                        ? 'bg-blue-600 scale-125'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }
                  `}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="
                p-3 rounded-full bg-white shadow-md hover:bg-blue-50
                transition transform hover:scale-110 active:scale-95
                border border-gray-200
              "
              aria-label={nextText}
              title={nextText}
            >
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Counter */}
          <div className="text-center text-sm text-gray-600">
            {currentIndex + 1} / {testimonials.length}
          </div>
        </div>
      </div>
    </section>
  );
}
