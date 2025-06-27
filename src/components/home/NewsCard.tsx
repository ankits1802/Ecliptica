
import Link from 'next/link';
import type { ComponentProps } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowRight, ExternalLink } from 'lucide-react';

export type NewsCardProps = {
  title: string;
  description: string;
  href: string;
  linkText: string;
  isExternal?: boolean;
};

export function NewsCard({ title, description, href, linkText, isExternal = false }: NewsCardProps) {
  return (
    <Link 
      href={href} 
      target={isExternal ? '_blank' : undefined} 
      rel={isExternal ? 'noopener noreferrer' : undefined} 
      className="group block h-full"
      aria-label={`Read more about ${title}`}
    >
      <Card className="h-full flex flex-col transition-transform duration-300 ease-out hover:-translate-y-1">
        <CardHeader>
          <CardTitle className="group-hover:text-primary transition-colors">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter className="mt-auto pt-4 border-t">
          <span className="text-sm font-medium text-primary group-hover:underline flex items-center">
            {linkText}
            {isExternal ? <ExternalLink className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
