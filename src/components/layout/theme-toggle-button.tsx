
'use client';

import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

type ThemeToggleButtonProps = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

export function ThemeToggleButton({ theme, toggleTheme }: ThemeToggleButtonProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder or null to avoid hydration mismatch
    return <Button variant="ghost" size="icon" className="w-9 h-9" disabled />;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative w-9 h-9 overflow-hidden"
    >
      <Sun
        className={`absolute transition-all duration-500 ease-in-out transform
          ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`}
      />
      <Moon
        className={`absolute transition-all duration-500 ease-in-out transform
          ${theme === 'light' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'}`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
