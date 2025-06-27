'use client';

import { useState } from 'react';
import { ProjectCard } from '@/components/project-card';
import { projectsData } from '@/data/projects';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle, Github, Loader2, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { GitHubProjectCard, type GitHubProject } from '@/components/github-project-card';

export default function ProjectsPage() {
  const [githubProjects, setGithubProjects] = useState<GitHubProject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showGithubProjects, setShowGithubProjects] = useState(false);


  const handleFetchMoreProjects = async () => {
    setIsLoading(true);
    setError(null);
    setShowGithubProjects(true);
    try {
      const response = await fetch('/api/github');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch projects from GitHub.');
      }
      const data = await response.json();
      setGithubProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 md:py-16">
      <header className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">My Projects</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A selection of my work in AI and Machine Learning.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        {!showGithubProjects && (
          <Card 
            className="flex flex-col h-full items-center justify-center text-center p-6 cursor-pointer group bg-card/50 hover:bg-card"
            onClick={handleFetchMoreProjects}
          >
            <Github className="h-12 w-12 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            <CardTitle className="mt-4 text-xl">Show More from GitHub</CardTitle>
            <CardDescription className="mt-2">
              Explore other projects and contributions directly from my GitHub profile.
            </CardDescription>
            {isLoading && <Loader2 className="mt-4 h-6 w-6 animate-spin" />}
          </Card>
        )}
      </div>
      
      {showGithubProjects && (
        <section className="mt-16 md:mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">More Projects from GitHub</h2>
          {isLoading && (
            <div className="flex justify-center items-center">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          )}
          {error && (
            <div className="flex flex-col items-center justify-center text-destructive bg-destructive/10 p-4 rounded-lg">
              <AlertTriangle className="h-8 w-8 mb-2" />
              <p className="font-semibold">Error loading projects</p>
              <p className="text-sm">{error}</p>
            </div>
          )}
          {!isLoading && !error && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {githubProjects.map((project) => (
                    <GitHubProjectCard key={project.id} project={project} />
                ))}
            </div>
          )}
        </section>
      )}

      <section className="mt-16 md:mt-24 py-12">
        <Card className="max-w-2xl mx-auto text-center shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl flex items-center justify-center gap-2">
              <MessageCircle className="h-7 w-7 text-primary" />
              Have a Project in Mind?
            </CardTitle>
            <CardDescription className="text-lg">
              If you&apos;re looking for expertise in AI/ML for your next project, or have a challenging problem to solve, I&apos;d love to hear about it.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/contact">
                Let&apos;s Discuss Your Project <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}