import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const springVal = useSpring(0, { stiffness: 180, damping: 35 });

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      const pct = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setProgress(pct);
      springVal.set(pct);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [springVal]);

  return (
    <motion.div
      className="fixed top-0 inset-x-0 z-[9998] h-[3px] bg-[#98c25f] origin-left shadow-[0_0_8px_rgba(152,194,95,0.6)] pointer-events-none"
      style={{ scaleX: springVal, transformOrigin: 'left' }}
    />
  );
}
