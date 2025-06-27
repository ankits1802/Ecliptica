
import { blogPostsData, type BlogPost } from '@/data/blog-posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { PenSquare, ArrowRight, CalendarDays, User } from 'lucide-react';
import { userData } from '@/data/user-data';


// Function to generate static paths
export async function generateStaticParams() {
  return blogPostsData.map((post) => ({
    slug: post.slug,
  }));
}

// Function to get post data
async function getPost(slug: string): Promise<BlogPost | undefined> {
  return blogPostsData.find((post) => post.slug === slug);
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-6 py-12 md:py-16 max-w-4xl">
       <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          {post.title}
        </h1>
        <div className="mt-4 text-sm text-muted-foreground flex items-center justify-center gap-4">
          <span className="flex items-center gap-1.5"><CalendarDays size={14} /> {new Date(post.date).toLocaleDateString()}</span>
          <span className="flex items-center gap-1.5"><User size={14} /> Published on Medium by {post.author}</span>
        </div>
      </header>
      
      {post.imageUrl && (
        <div className="relative w-full h-64 md:h-96 mb-12 rounded-lg overflow-hidden shadow-xl border">
          <Image
            src={post.imageUrl}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={post.dataAiHint || "blog image"}
            priority
          />
        </div>
      )}

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <PenSquare className="h-6 w-6 text-primary" />
              In a Nutshell...
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
          </CardContent>
        </Card>

        <Card className="p-0">
           <CardContent className="p-6 flex flex-col items-center justify-center text-center">
             <h3 className="text-xl font-semibold mb-4">Enjoyed the teaser?</h3>
             <RainbowButton asChild>
                <Link href={userData.mediumUrl} target="_blank" rel="noopener noreferrer">
                    Read the Full Article on Medium
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
             </RainbowButton>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}
