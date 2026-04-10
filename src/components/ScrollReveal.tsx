'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type Direction = 'up' | 'left' | 'right' | 'scale';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  threshold?: number;
}

const directionClass: Record<Direction, string> = {
  up: 'reveal',
  left: 'reveal-left',
  right: 'reveal-right',
  scale: 'reveal-scale',
};

export default function ScrollReveal({
  children,
  direction = 'up',
  delay,
  className = '',
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const staggerClass = delay ? `stagger-${delay}` : '';

  return (
    <div
      ref={ref}
      className={`${directionClass[direction]} ${staggerClass} ${className}`}
    >
      {children}
    </div>
  );
}
