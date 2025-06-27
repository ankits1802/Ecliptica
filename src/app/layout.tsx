
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { SiteLayout } from '@/components/layout/site-layout';
import Preloader from '@/components/layout/preloader'; // Import Preloader
import { ChatProvider } from '@/contexts/chat-context';
import { SplashCursor } from '@/components/effects/splash-cursor';
import { AudioProvider } from '@/contexts/audio-context';

const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: 'Ecliptica | Ankit Kumar',
  description: 'Portfolio of an AI/ML Engineer showcasing projects, skills, and experience.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The 'dark' class will now be managed by SiteLayout/ThemeProvider
    <html lang="en" className={`${geistSans.variable} ${geistMono ? geistMono.variable : ''}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Cormorant+Garamond:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-background text-foreground transition-colors duration-300">
        <SplashCursor />
        <ChatProvider>
          <AudioProvider>
            <Preloader /> {/* Add Preloader here, it will be on top */}
            <SiteLayout>{children}</SiteLayout>
          </AudioProvider>
        </ChatProvider>
      </body>
    </html>
  );
}
