// src/components/blog-post-card.tsx
import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/data/blog-posts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarDays, User } from 'lucide-react';

export function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg transition-shadow duration-300">
      {post.imageUrl && (
        <Link href={`/blog/${post.slug}`} className="block relative w-full h-48 md:h-56 group">
          <Image
            src={post.imageUrl}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={post.dataAiHint || "blog image"}
          />
        </Link>
      )}
      <CardHeader>
        <Link href={`/blog/${post.slug}`}>
          <CardTitle className="text-xl md:text-2xl hover:text-primary transition-colors">{post.title}</CardTitle>
        </Link>
        <div className="text-xs text-muted-foreground flex items-center gap-4 mt-1">
          <span className="flex items-center gap-1"><CalendarDays size={14} /> {new Date(post.date).toLocaleDateString()}</span>
          <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{post.excerpt}</CardDescription>
      </CardContent>
      <CardFooter className="mt-auto pt-4 border-t flex flex-col items-start gap-4">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
        <Button asChild variant="link" className="px-0 text-primary">
          <Link href={`/blog/${post.slug}`}>
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
