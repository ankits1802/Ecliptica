'use client';

import Image from 'next/image';
import Link from 'next/link';
import { userData } from '@/data/user-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, GraduationCap, Sparkles, Target, FileText as ResumeIcon, Grid3X3 as ProjectsIcon } from 'lucide-react';
import { RainbowButton } from '@/components/ui/rainbow-button';

export default function AboutPage() {
  const educationDegrees = userData.about.education.filter(edu => !edu.isCertification);
  const certifications = userData.about.education.filter(edu => edu.isCertification);

  return (
    <div className="container mx-auto px-6 py-12 md:py-16">
      <header className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">About Me</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          My journey, skills, and aspirations in the world of AI and Machine Learning.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1 flex justify-center">
           <div className="relative">
            <Image
              src={userData.headshotUrl}
              alt={userData.name}
              width={250}
              height={250}
              className="rounded-lg shadow-xl border-4 border-card object-cover aspect-square"
              data-ai-hint="Ankit Kumar portrait"
            />
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                My Story
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>{userData.about.introduction}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-primary" />
                Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground">
              {userData.about.experience.map((exp, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-lg text-foreground">{exp.role}</h3>
                  <div className="flex justify-between items-center text-sm text-gray-500 italic">
                    <span>{exp.company}</span>
                    <span className="whitespace-nowrap">{exp.duration}</span>
                  </div>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    {exp.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-primary" />
                Education & Certifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {educationDegrees.map((edu, index) => (
                <div key={`edu-${index}`} className="mb-6 pb-4 border-b border-border last:border-b-0 last:pb-0">
                  <h3 className="font-semibold text-lg text-foreground">
                    {edu.degree}{edu.field ? `, ${edu.field}` : ''}
                  </h3>
                  <p className="text-sm text-muted-foreground">{edu.institution}</p>
                  {edu.duration && <p className="text-sm text-muted-foreground italic">{edu.duration}</p>}
                  {edu.cgpa && <p className="text-sm text-muted-foreground">{edu.cgpa}</p>}
                  
                  {edu.relevantCoursework && (
                    <div className="mt-3">
                      <h4 className="font-medium text-foreground mb-1 text-sm">Relevant Coursework:</h4>
                      {Object.entries(edu.relevantCoursework).map(([category, courses]) => (
                        <div key={category} className="mb-2">
                          <p className="text-xs font-semibold text-foreground/90">{category}:</p>
                          <p className="text-xs text-muted-foreground pl-2">{courses}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {certifications.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">Certifications</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {certifications.map((cert, index) => (
                      <li key={`cert-${index}`} className="text-sm">{cert.degree} ({cert.institution})</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Interests & Aspirations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-1">Interests:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {userData.about.interests.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Career Aspirations:</h3>
                <p>{userData.about.aspirations}</p>
              </div>
              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/resume">
                    <ResumeIcon className="mr-2 h-5 w-5" /> View My Full Resume
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/projects">
                    <ProjectsIcon className="mr-2 h-5 w-5" /> Explore My Projects
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
                <CardTitle className="text-2xl md:text-3xl flex items-center justify-center gap-2">
                    <Sparkles className="h-7 w-7 text-primary" />
                    Beyond the Resume
                </CardTitle>
                <CardDescription className="text-lg text-center mt-2">
                    Curious about the story behind the code?
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
                <RainbowButton asChild>
                    <Link href="/personal">
                        <Sparkles className="mr-2 h-5 w-5" />
                        Know Who I Am Beyond My Profession
                    </Link>
                </RainbowButton>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
