
'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={cn(
        "fixed top-0 left-0 right-0 h-1 bg-primary origin-[0%] z-[100]",
        "scroll-progress-bar"
      )}
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
