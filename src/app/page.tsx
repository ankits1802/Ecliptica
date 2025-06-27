
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Briefcase, BrainCircuit, FileText, MessageSquare, UserCircle, Download, Award, Users, Lightbulb, Newspaper, ExternalLink, Quote as QuoteIcon, CodeSquare } from 'lucide-react';
import { userData } from '@/data/user-data';
import { StatsCounter, type StatItem } from '@/components/home/StatsCounter';
import { AnimatedTitle } from '@/components/home/animated-title';
import { NewsCard, type NewsCardProps } from '@/components/home/NewsCard';
import { TestimonialCard } from '@/components/home/TestimonialCard';
import { TechStackSnippet } from '@/components/home/TechStackSnippet';
import { TextRevealCard, TextRevealCardDescription, TextRevealCardTitle } from '@/components/ui/text-reveal-card';
import { PixelCard } from '@/components/ui/pixel-card';


const stats: Omit<StatItem, 'icon'> & { iconName: string }[] = [
  { id: 'experience', label: 'Years of AI/ML Expertise', value: 5, iconName: 'Award', suffix: '+' },
  { id: 'projects', label: 'AI/ML Projects Delivered', value: 25, iconName: 'Briefcase', suffix: '+' },
  { id: 'clients', label: 'Clients Served Globally', value: 10, iconName: 'Users', suffix: '+' },
  { id: 'insights', label: 'AI Insights Generated', value: 10, iconName: 'Lightbulb', suffix: 'K+' },
];


const heroTitles = [
  "AI/ML Engineer",
  "Data Scientist",
  "Problem Solver",
  "Tech Innovator"
];

const newsItems: NewsCardProps[] = [
  {
    title: "New Blog Post: Understanding GANs",
    description: "Dive into the world of Generative Adversarial Networks. A beginner-friendly guide to their architecture and applications.",
    href: "/blog/understanding-gans",
    linkText: "Read Full Post",
  },
  {
    title: "Project Spotlight: Intelligent Document Analyzer",
    description: "Discover the latest updates and impact of the NLP-powered document analysis tool. Read the full case study.",
    href: "/blog/case-study-intelligent-document-analyzer",
    linkText: "View Case Study",
  },
  {
    title: "Explore My Thoughts on Medium",
    description: "I share in-depth articles and insights on AI, machine learning, and technology. Follow my journey!",
    href: userData.mediumUrl,
    linkText: "Visit Medium Profile",
    isExternal: true,
  },
];


export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden min-h-[calc(100vh-4rem)] flex items-center">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative z-10 space-y-6 text-center md:text-left initial-hidden animate-slideInFromLeft">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-anton tracking-tighter">
                {userData.name.toUpperCase()}
              </h1>
              <AnimatedTitle
                titles={heroTitles}
                baseClassName="text-xl md:text-2xl text-primary font-medium"
                animationClassName="initial-hidden animate-slideInFromLeft animation-delay-200ms"
              />
              <p className="text-lg text-muted-foreground initial-hidden animate-slideInFromLeft animation-delay-400ms">
                {userData.tagline}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start initial-hidden animate-fadeInUp animation-delay-600ms">
                <Button asChild size="lg" className="font-anton text-lg bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/contact">
                    HIRE ME <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="font-anton text-lg">
                  <Link href={userData.resumeUrl} target="_blank" download>
                    My Resume <Download className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative z-10 flex justify-center initial-hidden animate-fadeIn animation-delay-800ms">
              <div className="hero-profile-image-container"> {/* Wrapper for the glow effect */}
                <Image
                  src={userData.headshotUrl}
                  alt={`${userData.name} - ${userData.title}`}
                  width={350}
                  height={350}
                  priority
                  className="rounded-full border-4 border-card object-cover aspect-square relative"
                  data-ai-hint="Ankit Kumar headshot"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <StatsCounter stats={stats} />
        </div>
      </section>


      {/* Quick Links/Intro to Sections */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 initial-hidden animate-fadeInUp">Explore My Portfolio</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <IntroCard
              icon={<UserCircle className="h-10 w-10 text-primary" />}
              title="About Me"
              description="Discover my background, experience, and passion for AI/ML."
              href="/about"
            />
            <IntroCard
              icon={<Briefcase className="h-10 w-10 text-primary" />}
              title="Projects"
              description="See a showcase of my machine learning projects and their impact."
              href="/projects"
            />
            <IntroCard
              icon={<BrainCircuit className="h-10 w-10 text-primary" />}
              title="Skills & Technologies"
              description="A comprehensive list of my technical capabilities and expertise."
              href="/skills"
            />
             <IntroCard
              icon={<FileText className="h-10 w-10 text-primary" />}
              title="My Resume"
              description="View or download my detailed curriculum vitae."
              href="/resume"
            />
             <IntroCard
              icon={<MessageSquare className="h-10 w-10 text-primary" />}
              title="Contact Me"
              description="Get in touch for collaborations, opportunities, or inquiries."
              href="/contact"
            />
          </div>
        </div>
      </section>

      {/* Tech Stack Snippet Section */}
      <section className="py-16 md:py-24"> {/* Removed bg-card/50 to make it transparent if needed */}
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 initial-hidden animate-fadeInUp flex items-center justify-center gap-3">
            <CodeSquare className="h-8 w-8 text-primary" />
            My Go-To Tech Stack
          </h2>
        </div>
        {/* TechStackSnippet is full-width now, so it's outside the container's padding for x-axis */}
        <div className="initial-hidden animate-fadeInUp animation-delay-200ms">
          <TechStackSnippet />
        </div>
      </section>

      {/* Philosophy / Text Reveal Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 flex flex-col items-center justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 initial-hidden animate-fadeInUp flex items-center justify-center gap-3">
                <QuoteIcon className="h-8 w-8 text-primary" />
                My Philosophy
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl initial-hidden animate-fadeInUp animation-delay-200ms">
                A glimpse into how I approach technology, problem-solving, and the systems we build.
            </p>
            <div className="flex items-center justify-center bg-transparent w-full initial-hidden animate-fadeInUp animation-delay-400ms">
                 <TextRevealCard
                    text="I build systems that think..."
                    revealText="....and reflect on how we think about systems."
                    className="w-full max-w-4xl"
                >
                    <TextRevealCardTitle>
                        From Code to Cognition
                    </TextRevealCardTitle>
                    <TextRevealCardDescription>
                        This is my core belief. It's not just about making machines smart; it's about using that process to better understand our own patterns of thought. Hover over the card to see the full picture.
                    </TextRevealCardDescription>
                     <p className="text-xs text-[#a9a9a9] mt-4 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-yellow-400" />
                        "And in a world that is trying to fit in so hard, I am unique and ingenuine, much like this card."
                    </p>
                </TextRevealCard>
            </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {userData.testimonials && userData.testimonials.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 initial-hidden animate-fadeInUp flex items-center justify-center gap-3">
              <QuoteIcon className="h-8 w-8 text-primary" />
              What Others Say
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 initial-hidden animate-fadeInUp animation-delay-200ms">
              {userData.testimonials.map((testimonial, index) => (
                <PixelCard key={testimonial.id} className="rounded-lg h-full">
                  <TestimonialCard testimonial={testimonial} index={index} />
                </PixelCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* News Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 initial-hidden animate-fadeInUp flex items-center justify-center gap-3">
            <Newspaper className="h-8 w-8 text-primary" />
            Latest News & Updates
          </h2>
          {newsItems.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 initial-hidden animate-fadeInUp animation-delay-200ms">
              {newsItems.map((item, index) => (
                <NewsCard
                  key={index}
                  title={item.title}
                  description={item.description}
                  href={item.href}
                  linkText={item.linkText}
                  isExternal={item.isExternal}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No news to share at the moment. Check back soon!</p>
          )}
        </div>
      </section>
    </div>
  );
}

type IntroCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
};

function IntroCard({ icon, title, description, href }: IntroCardProps) {
  return (
    <Link href={href} className="group block">
      <Card className="h-full border bg-card transition-all duration-300 ease-out transform hover:-translate-y-2 group-hover:border-primary/70">
        <CardHeader className="items-center text-center">
          {icon}
          <CardTitle className="mt-4">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">{description}</p>
          <Button variant="link" className="mt-4 text-primary group-hover:underline">
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
