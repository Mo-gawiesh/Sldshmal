import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="العودة إلى الأعلى"
          className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50 group flex h-12 w-12 items-center justify-center rounded-full bg-[#98c25f] text-[#101610] shadow-lg hover:bg-[#b3d37f] transition-all duration-300 hover:scale-110 cursor-pointer"
        >
          {/* pulsing ring */}
          <span className="absolute inset-0 rounded-full bg-[#98c25f]/30 animate-ping opacity-60 group-hover:animate-none" />
          {/* arrow rotated 90deg to point up */}
          <ArrowLeft className="h-5 w-5 rotate-90 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
