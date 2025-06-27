
'use client';

import { useState, useEffect, useRef } from 'react';

type AnimatedTitleProps = {
  titles: string[];
  baseClassName?: string;
  animationClassName?: string; // For initial entry animation
};

const FLIP_DURATION = 400; // ms, should match CSS animation duration
const CHANGE_INTERVAL = 5000; // ms

export function AnimatedTitle({ titles, baseClassName, animationClassName }: AnimatedTitleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState(titles[0]);
  const [animationClass, setAnimationClass] = useState(''); // 'animate-flip-out' or 'animate-flip-in'
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const flipOutTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const flipInTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Set initial display text
    setDisplayText(titles[currentIndex]);
  }, [titles, currentIndex]);

  useEffect(() => {
    const changeTitle = () => {
      setAnimationClass('animate-flip-out');

      if (flipOutTimeoutRef.current) clearTimeout(flipOutTimeoutRef.current);
      flipOutTimeoutRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % titles.length;
          setDisplayText(titles[nextIndex]);
          return nextIndex;
        });
        setAnimationClass('animate-flip-in');

        if (flipInTimeoutRef.current) clearTimeout(flipInTimeoutRef.current);
        flipInTimeoutRef.current = setTimeout(() => {
          setAnimationClass(''); // Clear animation class after flip-in
        }, FLIP_DURATION);

      }, FLIP_DURATION);
    };

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(changeTitle, CHANGE_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (flipOutTimeoutRef.current) clearTimeout(flipOutTimeoutRef.current);
      if (flipInTimeoutRef.current) clearTimeout(flipInTimeoutRef.current);
    };
  }, [titles]); // Rerun effect if titles array changes

  return (
    <div 
      className={`${animationClassName} title-flipper`} // animationClassName for initial entry, title-flipper for perspective
      style={{ 
        minHeight: '1.5em', // Adjust as needed based on font size
        perspective: '800px' 
      }}
    >
      <p
        className={`${baseClassName || ''} ${animationClass} flipping-text`}
      >
        {displayText}
      </p>
    </div>
  );
}
