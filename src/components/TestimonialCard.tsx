import { Testimonial } from '@/lib/testimonials-data';

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive: boolean;
}

export default function TestimonialCard({ testimonial, isActive }: TestimonialCardProps) {
  return (
    <div
      className={`
        absolute inset-0 transition-all duration-700 ease-in-out
        ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}
      `}
    >
      <div
        className="h-full flex flex-col justify-between p-8 md:p-10 rounded-2xl"
        style={{
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.12)',
          backdropFilter: 'blur(12px)',
          borderTop: '2px solid rgba(0,192,212,0.6)',
        }}
      >
        {/* Quote mark + stars */}
        <div>
          <div className="flex items-start justify-between mb-5">
            {/* Large quote */}
            <div
              className="font-heading font-bold leading-none select-none"
              style={{ fontSize: '4rem', color: 'rgba(0,192,212,0.35)', lineHeight: 1 }}
            >
              "
            </div>
            {/* Stars */}
            <div className="flex gap-1">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" style={{ color: '#e8aa1a' }} viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
            </div>
          </div>

          {/* Quote text */}
          <p
            className="text-base md:text-lg leading-relaxed italic mb-6"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            {testimonial.quote}
          </p>
        </div>

        {/* Client info */}
        <div
          className="flex items-center gap-4 pt-5"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          {/* Avatar */}
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl shrink-0"
            style={{ background: 'linear-gradient(135deg, #0a1a4e, #00c0d4)' }}
          >
            {testimonial.clientName.charAt(0)}
          </div>

          <div>
            <h4 className="font-bold text-white">{testimonial.clientName}</h4>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{testimonial.clientRole}</p>
            <span
              className="inline-block text-xs font-semibold mt-1 px-2.5 py-0.5 rounded-full"
              style={{ background: 'rgba(0,192,212,0.15)', color: '#3de7f8' }}
            >
              {testimonial.service}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
