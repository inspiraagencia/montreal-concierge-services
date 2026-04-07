import { Testimonial } from '@/lib/testimonials-data';

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive: boolean;
}

export default function TestimonialCard({ testimonial, isActive }: TestimonialCardProps) {
  return (
    <div
      className={`
        absolute inset-0 transition-all duration-1000 ease-in-out
        ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}
      `}
    >
      <div className="bg-white p-8 md:p-10 rounded-lg shadow-lg border-t-4 border-blue-600 h-full flex flex-col justify-between">
        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <span key={i} className="text-yellow-400 text-xl">
              ⭐
            </span>
          ))}
        </div>

        {/* Quote */}
        <div className="mb-6 flex-grow">
          <p className="text-gray-700 italic text-lg leading-relaxed">
            "{testimonial.quote}"
          </p>
        </div>

        {/* Client Info */}
        <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
          {/* Avatar Placeholder */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
            {testimonial.clientName.charAt(0)}
          </div>

          <div className="flex-grow">
            <h4 className="font-bold text-gray-900">{testimonial.clientName}</h4>
            <p className="text-sm text-gray-600">{testimonial.clientRole}</p>
            <p className="text-xs text-blue-600 font-semibold mt-1">{testimonial.service}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
