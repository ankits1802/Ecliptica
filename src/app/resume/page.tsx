
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { userData } from '@/data/user-data';
import { skillsData } from '@/data/skills';
import { Download, ExternalLink, Briefcase, GraduationCap, Star, Trophy, Lightbulb, Award, BookOpenText, Sparkles, FileDown } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { PixelCard } from '@/components/ui/pixel-card';
import { ThanosSnapEffect, type ThanosSnapHandle } from '@/components/effects/thanos-snap-effect';
import { Badge } from '@/components/ui/badge';


const SectionDivider = () => (
  <div className="my-10">
    <div className="w-full h-px bg-primary/20" style={{boxShadow: '0 -4px 15px 0px hsl(var(--primary) / 0.25)'}} />
  </div>
);

const educationData = [
  {
    degree: "B.Tech. Major: CSE (Current)",
    board: "Bihar Engineering University, India",
    score: "9.56",
    year: "2021-2025",
    type: 'cgpa' as const,
    comparison: {
      yourScore: 9.56,
      classHighest: 9.56,
      stateHighest: 9.56,
      classAverage: 8.5,
      stateAverage: 8.2,
    },
  },
  {
    degree: "B.Tech. Major: CSE (Cumulative)",
    board: "Bihar Engineering University, India",
    score: "9.16",
    year: "2021-2025",
    type: 'cgpa' as const,
    comparison: {
      yourScore: 9.16,
      classHighest: 9.16,
      stateHighest: 9.16,
      classAverage: 8.2,
      stateAverage: 7.9,
    },
  },
  {
    degree: "Diploma: Electronics Engineering",
    board: "State Board of Technical Education, Bihar",
    score: "9.27",
    year: "2019-2022",
    type: 'cgpa' as const,
    comparison: {
      yourScore: 9.27,
      classHighest: 9.27,
      stateHighest: 9.27,
      classAverage: 8.3,
      stateAverage: 8.0,
    },
  },
  {
    degree: "AISSE: Matriculation (10th)",
    board: "CBSE Board, New Delhi",
    score: "97.60%",
    year: "2019",
    type: 'percentage' as const,
    comparison: {
      yourScore: 97.60,
      classHighest: 97.60,
      stateHighest: 99.00,
      classAverage: 85.0,
      stateAverage: 82.0,
    },
  },
];


function PerformanceChart({ data }: { data: { yourScore: number, classHighest: number, stateHighest: number, classAverage: number, stateAverage: number, type: 'cgpa' | 'percentage' } }) {
    const chartData = [
        { name: "Ankit's Score", value: data.yourScore, fill: "hsl(var(--primary))" },
        { name: "Class Avg", value: data.classAverage, fill: "hsl(var(--accent))" },
        { name: "State Avg", value: data.stateAverage, fill: "hsl(var(--muted-foreground))" },
        { name: "State Highest", value: data.stateHighest, fill: "hsl(var(--destructive))" },
    ];

    const maxValue = data.type === 'percentage' ? 100 : 10;

    return (
        <div className="w-80 h-60 p-4 bg-background">
            <h4 className="text-md font-semibold mb-4 text-center text-foreground">Performance Comparison</h4>
            <ResponsiveContainer width="100%" height="80%">
                <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                    <XAxis type="number" dataKey="value" domain={[0, maxValue]} tick={{ fontSize: 10, fill: 'hsl(var(--foreground))' }} />
                    <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }} width={90} />
                    <Tooltip
                        cursor={{ fill: 'hsl(var(--accent) / 0.2)' }}
                        contentStyle={{
                            background: 'hsl(var(--background))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: 'var(--radius)',
                            fontSize: '12px'
                        }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={20}>
                        {chartData.map((entry) => (
                            <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

function EducationSection() {
    const educationDegrees = userData.about.education.filter(edu => !edu.isCertification);
    return (
        <section>
          <h2 className="text-xl font-semibold text-primary mb-3 flex items-center gap-2"><GraduationCap /> Education</h2>
          
          <div className="rounded-md border mb-8">
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead className="font-semibold">Degree/Certificate</TableHead>
                          <TableHead className="font-semibold">Institute/Board</TableHead>
                          <TableHead className="font-semibold text-right">CGPA/%</TableHead>
                          <TableHead className="font-semibold text-right">Year</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {educationData.map((edu) => (
                          <Popover key={edu.degree}>
                              <PopoverTrigger asChild>
                                  <TableRow className="cursor-pointer hover:bg-accent/50">
                                      <TableCell className="font-medium">{edu.degree}</TableCell>
                                      <TableCell>{edu.board}</TableCell>
                                      <TableCell className="text-right">{edu.score}</TableCell>
                                      <TableCell className="text-right">{edu.year}</TableCell>
                                  </TableRow>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0 border-primary" side="top" align="center">
                                  <PerformanceChart data={{...edu.comparison, type: edu.type}} />
                              </PopoverContent>
                          </Popover>
                      ))}
                  </TableBody>
              </Table>
          </div>

          <div className="space-y-8">
            {educationDegrees.map((edu, index) => (
                <div key={`edu-detail-${index}`} className={index < educationDegrees.length - 1 ? 'pb-6 border-b border-border' : ''}>
                    <h3 className="text-lg font-bold text-foreground">
                        {edu.degree}{edu.field ? `, ${edu.field}` : ''}
                    </h3>
                    <p className="text-muted-foreground">{edu.institution}</p>
                    {edu.duration && <p className="text-sm text-muted-foreground italic my-1">{edu.duration}</p>}
                    {edu.cgpa && <p className="text-sm text-muted-foreground">{edu.cgpa}</p>}
                    
                    {edu.relevantCoursework && (
                        <div className="mt-4">
                        <h4 className="font-semibold text-foreground mb-2">Relevant Coursework:</h4>
                        <div className="space-y-3">
                            {Object.entries(edu.relevantCoursework).map(([category, courses]) => (
                            <div key={category}>
                                <p className="font-medium text-foreground/90 text-sm">{category}:</p>
                                <p className="text-sm text-muted-foreground pl-2">{courses}</p>
                            </div>
                            ))}
                        </div>
                        </div>
                    )}
                </div>
            ))}
          </div>
        </section>
    );
}

function CertificationsSection() {
    const certificationItems = userData.about.education.filter(edu => edu.isCertification);
    return (
        <section>
            <h2 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2"><Award /> Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                {certificationItems.map((cert, index) => (
                    <div key={`cert-${index}`} className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">{cert.degree}</span> - {cert.institution}
                    </div>
                ))}
            </div>
        </section>
    );
}

const allBusinessCards = [
  { id: 1, name: 'Default Style', file: '/business-card-v1.pdf', variant: 'default' as const },
  { id: 2, name: 'Blue Hue', file: '/business-card-v2.pdf', variant: 'blue' as const },
  { id: 3, name: 'Golden Touch', file: '/business-card-v3.pdf', variant: 'yellow' as const },
  { id: 4, name: 'Rose Tint', file: '/business-card-v4.pdf', variant: 'pink' as const }
];

const quotes = [
    { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
    { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
    { text: "Simplicity is a prerequisite for reliability.", author: "Edsger W. Dijkstra" },
    { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
    { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
    { text: "The computer was born to solve problems that did not exist before.", author: "Bill Gates" },
    { text: "Walking on water and developing software from a specification are easy if both are frozen.", author: "Edward V. Berard" },
    { text: "The question of whether a computer can think is no more interesting than the question of whether a submarine can swim.", author: "Edsger W. Dijkstra" }
];

const shuffleArray = (array: any[]) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

export default function ResumePage() {
  const [showBusinessCards, setShowBusinessCards] = useState(false);
  const [businessCardOptions, setBusinessCardOptions] = useState<(typeof allBusinessCards[number] & { quote: { text: string; author: string; } })[]>([]);
  const snapRefs = useRef<React.RefObject<ThanosSnapHandle>[]>([]);
  const businessCardsSectionRef = useRef<HTMLDivElement>(null);

  if (snapRefs.current.length !== allBusinessCards.length) {
      snapRefs.current = Array(allBusinessCards.length).fill(null).map((_, i) => snapRefs.current[i] || React.createRef());
  }
  
  const publications = userData.publications || [];
  const achievements = userData.achievements || [];
  const certificationItems = userData.about.education.filter(edu => edu.isCertification);


  const resumeSections = [
    {
      key: 'education',
      condition: true,
      content: <EducationSection />
    },
    {
      key: 'experience',
      condition: true,
      content: (
        <section>
          <h2 className="text-xl font-semibold text-primary mb-3 flex items-center gap-2"><Briefcase /> Work Experience</h2>
          <div className="space-y-6">
              {userData.about.experience.map((exp, index) => (
                <div key={index} className="pb-3 border-b border-border last:border-b-0 last:pb-0">
                  <h3 className="font-semibold text-lg text-foreground">{exp.role}</h3>
                  <div className="flex justify-between items-center text-sm text-muted-foreground italic">
                    <span>{exp.company}</span>
                    <span className="whitespace-nowrap">{exp.duration}</span>
                  </div>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground text-sm">
                    {exp.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4"><em>(Comprehensive details and achievements are available in the downloadable PDF resume.)</em></p>
        </section>
      )
    },
    {
      key: 'skills',
      condition: true,
      content: (
        <section>
            <h2 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2"><Star /> Key Skills</h2>
            <div className="space-y-4">
                {skillsData.map((category) => (
                    <div key={category.name}>
                        <h3 className="text-md font-semibold text-foreground mb-1.5 flex items-center gap-2">
                            <category.icon className="h-5 w-5 text-primary" />
                            {category.name}
                        </h3>
                        <p className="text-sm text-muted-foreground ml-7">
                            {category.skills.map(skill => skill.name).join(', ')}
                        </p>
                    </div>
                ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
                <em>For more details on proficiency levels and descriptions, please <Link href="/skills" className="text-primary hover:underline">view all skills</Link>.</em>
            </p>
        </section>
      )
    },
    {
      key: 'projects',
      condition: true,
      content: (
        <section>
            <h2 className="text-xl font-semibold text-primary mb-3 flex items-center gap-2"><Lightbulb /> Projects</h2>
            <p className="text-muted-foreground">Led impactful projects in document analysis, machine translation, music generation, sign language recognition, and text-to-SQL systems. <Link href="/projects" className="text-primary hover:underline">See project details</Link>.</p>
            <p className="text-sm text-muted-foreground mt-2"><em>(Specific achievements and metrics are detailed in the PDF resume and project pages.)</em></p>
        </section>
      )
    },
    {
      key: 'publications',
      condition: publications.length > 0,
      content: (
        <section>
          <h2 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2"><BookOpenText /> Publications & Research</h2>
          <div className="space-y-6">
            {publications.map((pub, index) => (
              <div key={`pub-${index}`} className="pb-3 border-b border-border last:border-b-0 last:pb-0">
                <h3 className="font-semibold text-lg text-foreground">{pub.title}</h3>
                <div className="text-sm text-muted-foreground italic">
                  <span>{pub.venue}</span>
                  {pub.date && <span> • {pub.date}</span>}
                </div>
                {pub.repoUrl && (
                  <Link href={pub.repoUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                    View Repository <ExternalLink className="inline h-3 w-3 ml-1" />
                  </Link>
                )}
                <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground text-sm">
                    {pub.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                </ul>
                {pub.tags && pub.tags.length > 0 && (
                   <div className="mt-3">
                     <h4 className="text-sm font-semibold text-foreground/90 mb-2">Tools & Frameworks:</h4>
                     <div className="flex flex-wrap gap-2">
                      {pub.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                   </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )
    },
    {
      key: 'achievements',
      condition: achievements.length > 0,
      content: (
        <section>
            <h2 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2"><Trophy /> Achievements</h2>
            <div className="space-y-6">
              {achievements.map((ach, index) => (
                <div key={`ach-${index}`} className="pb-3 border-b border-border last:border-b-0 last:pb-0">
                  <h3 className="font-semibold text-lg text-foreground">{ach.title}</h3>
                  <div className="text-sm text-muted-foreground italic">
                    <span>Issued by {ach.issuer}</span>
                    {ach.date && <span> • {ach.date}</span>}
                  </div>
                  {ach.association && (
                    <div className="text-sm text-muted-foreground italic">
                      Associated with {ach.association}
                    </div>
                  )}
                  <p className="text-muted-foreground mt-1 text-sm">{ach.description}</p>
                </div>
              ))}
            </div>
        </section>
      )
    },
    {
      key: 'certifications',
      condition: certificationItems.length > 0,
      content: <CertificationsSection />
    }
  ];

  const visibleSections = resumeSections.filter(s => s.condition);

  const handleShowCards = () => {
    const shuffledCards = shuffleArray([...allBusinessCards]);
    const shuffledQuotes = shuffleArray([...quotes]);
    
    const cardOptions = shuffledCards.map((card, index) => ({
      ...card,
      quote: shuffledQuotes[index % shuffledQuotes.length],
    }));

    setBusinessCardOptions(cardOptions);
    setShowBusinessCards(true);
  };
  
  useEffect(() => {
    if (showBusinessCards) {
      setTimeout(() => {
        businessCardsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [showBusinessCards]);

  const handleCardClick = (selectedCardId: number, pdfUrl: string) => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    const fileName = pdfUrl.split('/').pop() || 'business-card.pdf';
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    businessCardOptions.forEach((card, index) => {
        if (card.id !== selectedCardId) {
            snapRefs.current[index]?.current?.snap();
        }
    });

    setTimeout(() => {
        setShowBusinessCards(false);
    }, 1200);
  };


  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <header className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">My Resume</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A detailed account of my professional journey, skills, and achievements.
        </p>
      </header>

      <div className="flex justify-center mb-12 gap-4">
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href={userData.resumeUrl} target="_blank" download>
            <Download className="mr-2 h-5 w-5" /> Download PDF
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href={userData.linkedinUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-5 w-5" /> View on LinkedIn
          </Link>
        </Button>
      </div>
      
      <Card className="w-full max-w-4xl mx-auto shadow-xl mb-12">
        <CardHeader>
            <CardTitle className="text-2xl text-center md:text-3xl">Resume Overview</CardTitle>
        </CardHeader>
        <CardContent className="p-6 md:p-10">
          {visibleSections.map((section, index) => (
            <React.Fragment key={section.key}>
              {section.content}
              {index < visibleSections.length - 1 && <SectionDivider />}
            </React.Fragment>
          ))}
        </CardContent>
      </Card>

      <Card className="w-full max-w-4xl mx-auto shadow-xl mb-12">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-2xl md:text-3xl">PDF Preview</CardTitle>
          <Button asChild size="sm">
            <Link href={userData.resumeUrl} target="_blank" download>
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="h-[calc(100vh-100px)] min-h-[600px] md:min-h-[800px] border rounded-lg shadow-inner overflow-hidden">
            <iframe
              src={`${userData.resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`}
              title="Resume PDF Viewer"
              className="w-full h-full"
              aria-label="Embedded Resume PDF"
            />
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4">
            Note: Embedded PDF viewer might have limited functionality. For the best experience, please download the PDF.
          </p>
        </CardContent>
      </Card>

       <Card className="w-full max-w-4xl mx-auto shadow-xl mb-12">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Downloads</CardTitle>
          <CardDescription>Get a copy of my CV or a unique business card.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-center justify-center gap-4 p-6">
          <RainbowButton>
            <a href="/Ankit_Kumar_CV.pdf" download className='flex items-center gap-2'>
              <FileDown className="h-5 w-5" />
              Download Detailed CV
            </a>
          </RainbowButton>
          <RainbowButton onClick={handleShowCards}>
            <Sparkles className="h-5 w-5" />
            Download Business Card
          </RainbowButton>
        </CardContent>
      </Card>
      
      {showBusinessCards && (
        // <section ref={businessCardsSectionRef} className="mt-12 w-full max-w-6xl mx-auto">
        //     <h2 className="text-2xl font-bold text-center mb-2">Try Your Luck!</h2>
        //     <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
        //       Choose a card to reveal a wise quote and download a unique business card. Don't worry, you can always try again!
        //     </p>
        //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        //         {businessCardOptions.map((card, index) => (
        //             <ThanosSnapEffect key={card.id} ref={snapRefs.current[index]}>
        //                 <div onClick={() => handleCardClick(card.id, card.file)} className="cursor-pointer">
        //                     <PixelCard variant={card.variant} className="min-h-[400px]">
        //                       <div className="flex flex-col justify-between items-center text-center p-4 w-full h-full">
        //                         <div className="flex-grow p-auto flex items-center">
        //                           <blockquote>
        //                             <p className="text-base italic leading-relaxed">
        //                                 &ldquo;{card.quote.text}&rdquo;
        //                             </p>
        //                             <footer className="mt-4 text-sm font-semibold text-right">
        //                                 &mdash; {card.quote.author}
        //                             </footer>
        //                           </blockquote>
        //                         </div>
        //                         <div className="px-4 py-2 border border-current rounded-full text-center mt-auto">
        //                           <p className="text-sm font-bold uppercase tracking-wider">Click to Download</p>
        //                         </div>
        //                       </div>
        //                     </PixelCard>
        //                 </div>
        //             </ThanosSnapEffect>
        //         ))}
        //     </div>
        // </section>
                <section ref={businessCardsSectionRef} className="mt-12 w-full max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-2">Try Your Luck!</h2>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              Choose a card to reveal a wise quote and download a unique business card. Don't worry, you can always try again!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
                {businessCardOptions.map((card, index) => (
                    <ThanosSnapEffect key={card.id} ref={snapRefs.current[index]}>
                        <div onClick={() => handleCardClick(card.id, card.file)} className="cursor-pointer h-full">
                            <PixelCard variant={card.variant} className="min-h-[400px] h-full">
                              <div className="flex flex-col justify-between items-center text-center p-4 w-full h-full min-h-[400px]">
                                <div className="flex-1 flex items-center justify-center">
                                  <blockquote className="w-full">
                                    <p className="text-base italic leading-relaxed">
                                        &ldquo;{card.quote.text}&rdquo;
                                    </p>
                                    <footer className="mt-4 text-sm font-semibold text-right">
                                        &mdash; {card.quote.author}
                                    </footer>
                                  </blockquote>
                                </div>
                                <div className="px-4 py-2 border border-current rounded-full text-center flex-shrink-0">
                                  <p className="text-sm font-bold uppercase tracking-wider">Click to Download</p>
                                </div>
                              </div>
                            </PixelCard>
                        </div>
                    </ThanosSnapEffect>
                ))}
            </div>
        </section>
      )}

    </div>
  );
}
