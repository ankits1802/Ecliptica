
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/data/projects';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, ListChecks, Lightbulb, Brain, BarChartBig, BookOpenText, TrendingUp, Calendar, Info } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export function ProjectCard({ project }: { project: Project }) {
  const getStatusVariant = (status: Project['status']) => {
    switch (status) {
      case 'ongoing':
        return 'default';
      case 'completed':
        return 'secondary';
      case 'archived':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const projectMetrics = project.metrics ? Object.entries(project.metrics).filter(([, value]) => value) : [];

  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <div className="relative w-full aspect-[16/9] group">
    <Image
      src={project.imageUrl}
      alt={project.title}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
      data-ai-hint={project.dataAiHint}
      priority={project.id === "project-autosql"}
    />
  </div>
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
            <CardTitle className="text-xl md:text-2xl">{project.title}</CardTitle>
            {project.status && (
            <Badge variant={getStatusVariant(project.status)} className="capitalize whitespace-nowrap self-start">
                {project.status}
            </Badge>
            )}
        </div>
        {project.timeline && (
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 pt-1">
                <Calendar size={14}/>
                {project.timeline}
            </p>
        )}
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="details" className="border-b-0">
            <AccordionTrigger className="text-sm font-semibold hover:no-underline py-2 text-muted-foreground hover:text-primary">
              <span className="flex items-center gap-1">
                <Info size={16} />
                Project Details
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-sm text-muted-foreground pt-2">
              {project.generalDetails && (
                <div className="space-y-1">
                  <h4 className="font-medium text-foreground flex items-center gap-1.5"><ListChecks size={16} className="text-primary"/> General Overview</h4>
                  <p>{project.generalDetails}</p>
                </div>
              )}
              {project.toolsAndMethods.length > 0 && (
                <div className="space-y-1">
                  <h4 className="font-medium text-foreground flex items-center gap-1.5"><Brain size={16} className="text-primary"/> Tools & Methods</h4>
                  <ul className="list-disc list-inside ml-4 space-y-0.5">
                    {project.toolsAndMethods.map(tool => <li key={tool}>{tool}</li>)}
                  </ul>
                </div>
              )}
              {project.results && (
              <div className="space-y-1">
                <h4 className="font-medium text-foreground flex items-center gap-1.5"><BarChartBig size={16} className="text-primary"/> Results</h4>
                <p>{project.results}</p>
              </div>
              )}
              {project.learnings && (
                <div className="space-y-1">
                  <h4 className="font-medium text-foreground flex items-center gap-1.5"><Lightbulb size={16} className="text-primary"/> Learnings</h4>
                  <p>{project.learnings}</p>
                </div>
              )}
              {projectMetrics.length > 0 && (
                <div className="space-y-1">
                  <h4 className="font-medium text-foreground flex items-center gap-1.5"><TrendingUp size={16} className="text-primary"/> Key Metrics</h4>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    {projectMetrics.map(([key, value]) => {
                        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
                        return <li key={key}><strong>{label}:</strong> {value}</li>
                    })}
                  </ul>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

      </CardContent>
      <CardFooter className="mt-auto pt-4 border-t">
        <div className="flex flex-wrap gap-2 w-full">
          {project.liveDemoUrl && (
            <Button asChild variant="outline" className="flex-1">
              <Link href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
              </Link>
            </Button>
          )}
          {project.repoUrl && (
            <Button asChild variant="secondary" className="flex-1">
              <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> View Code
              </Link>
            </Button>
          )}
          {project.caseStudyBlogSlug && (
             <Button asChild variant="link" className="flex-1 text-primary">
              <Link href={`/blog/${project.caseStudyBlogSlug}`}>
                <BookOpenText className="mr-2 h-4 w-4" /> Read Case Study
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
