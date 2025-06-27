
'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Bot } from 'lucide-react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { userData } from '@/data/user-data';

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface MobileNavProps {
  items: NavItem[];
}

export function MobileNav({ items }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 pt-8 w-[250px] sm:w-[300px]">
        <Link href="/" className="mb-6 flex items-center gap-3 px-4" onClick={handleLinkClick}>
          <Bot className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl">{userData.name}</span>
        </Link>
        <nav className="flex flex-col gap-2 px-4">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = item.url === '/' ? pathname === '/' : pathname.startsWith(item.url);
            return (
              <Link
                key={item.name}
                href={item.url}
                onClick={handleLinkClick}
                className={cn(
                  "flex items-center gap-3 rounded-lg p-3 text-base font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
