
'use client';

import Link from 'next/link';
import { userData } from '@/data/user-data';
import { ContactForm } from '@/components/contact-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, MapPin, PenSquare, TerminalSquare, Newspaper, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { ThanosSnapEffect, type ThanosSnapHandle } from '@/components/effects/thanos-snap-effect';

export default function ContactPage() {
  const snapRef = useRef<ThanosSnapHandle>(null);

  const handleSnap = (onComplete: () => void) => {
    snapRef.current?.snap(onComplete);
  };

  return (
    <div className="container mx-auto px-6 py-12 md:py-16">
      <header className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Get In Touch</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          I&apos;m open to collaborations, opportunities, or just a friendly chat.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Column 1: Contact Form */}
        <ThanosSnapEffect ref={snapRef}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl">Contact Form</CardTitle>
              <CardDescription>Send me a message directly.</CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm onSnap={handleSnap} />
            </CardContent>
          </Card>
        </ThanosSnapEffect>

        {/* Column 2: Contact Info Cards in a single parent card */}
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl md:text-3xl">Contact Information</CardTitle>
                <CardDescription>Other ways to connect with me.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ContactInfoCard
                icon={<Mail className="h-6 w-6" />}
                label="Email"
                value={userData.email}
                href={`mailto:${userData.email}`}
              />
              <ContactInfoCard
                icon={<Linkedin className="h-6 w-6" />}
                label="LinkedIn"
                value="Connect on LinkedIn"
                href={userData.linkedinUrl}
                isExternal
              />
              <ContactInfoCard
                icon={<Github className="h-6 w-6" />}
                label="GitHub"
                value="Explore My Repositories"
                href={userData.githubUrl}
                isExternal
              />
              <ContactInfoCard
                icon={<PenSquare className="h-6 w-6" />}
                label="Medium"
                value="Read My Articles"
                href={userData.mediumUrl}
                isExternal
              />
              <ContactInfoCard
                icon={<TerminalSquare className="h-6 w-6" />}
                label="LeetCode"
                value="View My Profile"
                href={userData.leetcodeUrl}
                isExternal
              />
              <ContactInfoCard
                icon={<MapPin className="h-6 w-6" />}
                label="Location"
                value="New Delhi, India"
              />
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-foreground">Availability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                      I am currently actively seeking new opportunities and collaborations. Feel free to reach out if you think my skills and experience would be a good fit for your team or project.
                  </p>
                </CardContent>
              </Card>
            </CardContent>
        </Card>
      </div>

      <section className="mt-16 md:mt-24 py-8">
        <Card className="w-full max-w-3xl mx-auto text-center">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl flex items-center justify-center gap-2">
              <Newspaper className="h-7 w-7 text-primary" />
              Stay Updated with My Newsletter!
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Subscribe to my Substack for insights on AI, ML, tech trends, and project updates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="https://ankits1802.substack.com/" target="_blank" rel="noopener noreferrer">
                Subscribe on Substack <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

type ContactInfoCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  isExternal?: boolean;
};

function ContactInfoCard({ icon, label, value, href, isExternal = false }: ContactInfoCardProps) {
  const cardContent = (
    <Card className="transition-all duration-300 ease-out group-hover:border-primary/70 group-hover:-translate-y-1">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="flex-shrink-0 text-primary">{icon}</div>
        <div className="flex-grow">
          <h3 className="font-semibold text-foreground">{label}</h3>
          <p className="text-sm text-muted-foreground break-all">{value}</p>
        </div>
        {href && <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />}
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="group"
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
