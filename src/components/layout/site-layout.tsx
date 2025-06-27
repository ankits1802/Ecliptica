
'use client';

import type { ReactNode } from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Footer } from './footer';
import { Toaster } from '@/components/ui/toaster';
import { BlackHoleVideo } from '@/components/effects/black-hole-video';
import { ScrollProgressBar } from './scroll-progress-bar';
import { useChat } from '@/contexts/chat-context';
import { ChatWidget } from '@/components/chatbot/chat-widget';
import { Bot, Home, User, Briefcase, BrainCircuit, Newspaper, FileText, MessageSquare, Music, VolumeX, Volume2, RotateCcw, Square as StopIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavBar } from './tubelight-navbar';
import { ThemeToggleButton } from './theme-toggle-button';
import { RainbowButton } from '../ui/rainbow-button';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileNav } from './mobile-nav';
import { usePathname } from 'next/navigation';
import { useAudio } from '@/contexts/audio-context';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

const navItems = [
  { name: 'Home', url: '/', icon: Home },
  { name: 'About', url: '/about', icon: User },
  { name: 'Projects', url: '/projects', icon: Briefcase },
  { name: 'Skills', url: '/skills', icon: BrainCircuit },
  { name: 'Blog', url: '/blog', icon: Newspaper },
  { name: 'Resume', url: '/resume', icon: FileText },
  { name: 'Contact', url: '/contact', icon: MessageSquare },
];


export function SiteLayout({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const { isOpen, toggleChat } = useChat();
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const { isPlaying, isMuted, toggleMute, stop, restart } = useAudio();
  const [isMounted, setIsMounted] = useState(false);

  // Easter egg state
  const [easterEggClickCount, setEasterEggClickCount] = useState(0);
  const firstClickTimestamp = useRef(0);

  // Stop music on page change
  useEffect(() => {
    if (pathname !== '/personal' && isPlaying) {
      stop();
    }
  }, [pathname, isPlaying, stop]);

  // Easter egg download logic
  useEffect(() => {
    if (easterEggClickCount >= 7) {
      const link = document.createElement('a');
      link.href = '/business-card-v5.pdf';
      link.download = 'business-card-v5.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setEasterEggClickCount(0); // Reset after download
      firstClickTimestamp.current = 0; // Reset timestamp
    }
  }, [easterEggClickCount]);

  const handleEasterEgg = () => {
    const now = Date.now();
    // If it's the first click or more than 10 seconds have passed since the first click, start a new sequence.
    if (easterEggClickCount === 0 || now - firstClickTimestamp.current > 10000) {
      setEasterEggClickCount(1);
      firstClickTimestamp.current = now;
    } else {
      setEasterEggClickCount(prev => prev + 1);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      const initialTheme = storedTheme || preferredTheme || 'dark';
      setTheme(initialTheme);
    }
  }, [isMounted]);

  useEffect(() => {
    if (isMounted) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    }
  }, [theme, isMounted]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  useEffect(() => {
    const body = document.body;
    if (pathname === '/personal') {
      body.classList.add('personal-page-dark');
    } else {
      body.classList.remove('personal-page-dark');
    }

    return () => {
        body.classList.remove('personal-page-dark');
    }
  }, [pathname]);

  if (!isMounted) {
    return (
      <div className="flex min-h-screen flex-col">
        {/* Render a static skeleton of the header on the server and initial client render to prevent hydration errors. */}
        <header className="fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-4 h-11">
            <div className="flex-1 flex justify-start h-9 w-9" />
            <div className="flex-1 flex justify-center" />
            <div className="flex-1 flex justify-end items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-transparent" />
                <div className="h-9 w-[150px] rounded-full bg-transparent" />
            </div>
        </header>
        <main className="flex-grow pt-24">{children}</main>
        <Footer />
        <Toaster />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[58] bg-black/30 backdrop-blur-sm"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <ScrollProgressBar />
      <BlackHoleVideo theme={theme} />
      
      <header className="fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-4">
          <div className="flex-1 flex justify-start">
              {pathname === '/personal' && isPlaying && (
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-white mix-blend-difference"
                            aria-label="Music Controls"
                            onClick={handleEasterEgg}
                        >
                            <Music />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right">
                        <DropdownMenuItem onClick={toggleMute}>
                            {isMuted ? <VolumeX className="mr-2 h-4 w-4" /> : <Volume2 className="mr-2 h-4 w-4" />}
                            <span>{isMuted ? 'Unmute' : 'Mute'}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={stop}>
                            <StopIcon className="mr-2 h-4 w-4" />
                            <span>Stop</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={restart}>
                            <RotateCcw className="mr-2 h-4 w-4" />
                            <span>Restart</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              )}
              {isMounted && isMobile && <MobileNav items={navItems} />}
          </div>

          <div className="flex-1 flex justify-center">
              {isMounted && !isMobile && <NavBar items={navItems} />}
          </div>

          <div className="flex-1 flex justify-end items-center gap-2">
              <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
              <RainbowButton onClick={toggleChat} className="h-9 px-3">
                  <Bot className="h-4 w-4"/>
                  <span className="hidden lg:inline ml-2">Chat with Alex</span>
              </RainbowButton>
          </div>
      </header>

      <main className="flex-grow pt-24">{children}</main>
      <Footer />
      <Toaster />
      
      <ChatWidget />
    </div>
  );
}
