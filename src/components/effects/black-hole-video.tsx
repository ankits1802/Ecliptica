
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type BlackHoleVideoProps = {
  theme: 'light' | 'dark';
};

export function BlackHoleVideo({ theme }: BlackHoleVideoProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  // Only render if the theme is dark
  if (theme !== 'dark') return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 overflow-hidden z-[-2] pointer-events-none blackhole-video-container"
      aria-hidden="true"
    >
      <video
        // IMPORTANT: You need to place a 'blackhole.webm' file in your /public directory
        src="/blackhole.webm"
        className="absolute rotate-180 top-[-340px] left-0 w-[700px] h-[670px] lg:w-full lg:h-[700px] object-cover overflow-hidden opacity-70"
        autoPlay
        loop
        muted
        playsInline
      />
    </motion.div>
  );
}
