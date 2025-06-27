// src/app/blog/page.tsx
import Link from 'next/link';
import { BlogPostCard } from '@/components/blog-post-card';
import { blogPostsData } from '@/data/blog-posts';

export default function BlogPage() {
  return (
    <div className="container mx-auto px-6 py-12 md:py-16">
      <header className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">My Blog</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Thoughts, tutorials, and insights on AI, Machine Learning, and technology.
        </p>
      </header>

      {blogPostsData.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPostsData.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No blog posts yet. Stay tuned!</p>
      )}
    </div>
  );
}
