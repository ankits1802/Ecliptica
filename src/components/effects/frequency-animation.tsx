'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const barVariants = {
  initial: {
    height: '2px',
    opacity: 0.5,
  },
  animate: (i: number) => ({
    height: ['4px', '24px', '8px', '16px', '6px', '20px', '4px'],
    opacity: [0.5, 1, 0.7, 0.9, 0.6, 1, 0.5],
    transition: {
      delay: i * 0.1,
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  }),
};

export const FrequencyAnimation = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex justify-center items-end gap-1 h-8 w-24", className)}>
      {[...Array(7)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1.5 bg-primary/80 rounded-full"
          custom={i}
          variants={barVariants}
          initial="initial"
          animate="animate"
        />
      ))}
    </div>
  );
};

