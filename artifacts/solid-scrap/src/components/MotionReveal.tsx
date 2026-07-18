import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface MotionRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;
  duration?: number;
  className?: string;
}

export function MotionReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  className = '',
}: MotionRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Bypass animations on mobile or if reduced motion is preferred
  if (shouldReduceMotion || isMobile) {
    return <div className={className}>{children}</div>;
  }

  const directions = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
    fade: { x: 0, y: 0 },
  };

  const initial = {
    opacity: 0,
    ...directions[direction],
  };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // premium custom cubic-bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
