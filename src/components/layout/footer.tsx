
import Link from 'next/link';
import { Github, Linkedin, Mail, PenSquare, TerminalSquare } from 'lucide-react';
import { userData } from '@/data/user-data';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground order-2 md:order-1">
          &copy; {currentYear} {userData.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-4 order-1 md:order-2">
          <Link href={userData.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github className="h-5 w-5 text-muted-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1" />
          </Link>
          <Link href={userData.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1" />
          </Link>
          <Link href="https://medium.com/@ankits1802" target="_blank" rel="noopener noreferrer" aria-label="Medium">
            <PenSquare className="h-5 w-5 text-muted-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1" />
          </Link>
          <Link href="https://leetcode.com/u/ankits1802/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
            <TerminalSquare className="h-5 w-5 text-muted-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1" />
          </Link>
          <Link href={`mailto:${userData.email}`} aria-label="Email">
            <Mail className="h-5 w-5 text-muted-foreground hover:text-primary transition-all duration-300 hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
