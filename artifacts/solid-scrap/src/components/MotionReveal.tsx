'use client';

import React, { useRef } from 'react';
import { m, useInView, useReducedMotion } from 'framer-motion';

interface MotionRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;
  duration?: number;
  className?: string;
}

const directions = {
  up: { y: 30, x: 0 },
  down: { y: -30, x: 0 },
  left: { x: 30, y: 0 },
  right: { x: -30, y: 0 },
  fade: { x: 0, y: 0 },
};

export function MotionReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  className = '',
}: MotionRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  // No animation on reduced-motion preference
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const initial = { opacity: 0, ...directions[direction] };
  const animate = isInView ? { opacity: 1, x: 0, y: 0 } : initial;

  return (
    <m.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}
