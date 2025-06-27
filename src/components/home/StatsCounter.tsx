
// src/components/home/StatsCounter.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Award, Briefcase, Users, Lightbulb } from 'lucide-react';
import { motion, useInView, animate } from 'framer-motion';
import { PixelCard } from '@/components/ui/pixel-card';

const iconMap: Record<string, LucideIcon> = {
  Award,
  Briefcase,
  Users,
  Lightbulb,
};

export type StatItem = {
  id: string;
  label: string;
  value: number;
  iconName: string;
  suffix?: string;
  prefix?: string;
};

function AnimatedNumber({ value, duration = 1.5 }: { value: number, duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px -50px 0px" });
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          setCurrentValue(Math.floor(latest));
        }
      });
      return () => controls.stop();
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{currentValue.toLocaleString()}</span>;
}

export function StatsCounter({ stats }: { stats: StatItem[] }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, index) => {
        const IconComponent = iconMap[stat.iconName];
        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
          >
            <PixelCard className="rounded-xl h-full">
              <div className="flex flex-col items-center p-4 md:p-6 bg-card/70 rounded-xl shadow-lg border border-border text-center h-full">
                {IconComponent && <IconComponent className="h-10 w-10 md:h-12 md:w-12 text-primary mb-3" />}
                <div className="text-3xl md:text-4xl font-bold text-foreground">
                  {stat.prefix}
                  <AnimatedNumber value={stat.value} />
                  {stat.suffix}
                </div>
                <p className="text-sm md:text-base text-muted-foreground mt-1">{stat.label}</p>
              </div>
            </PixelCard>
          </motion.div>
        );
      })}
    </div>
  );
}
