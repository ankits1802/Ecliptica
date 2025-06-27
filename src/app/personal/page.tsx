
'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThanosSnapEffect, type ThanosSnapHandle } from '@/components/effects/thanos-snap-effect';
import { LightPullThemeSwitcher } from '@/components/effects/light-pull-theme-switcher';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ImageAutoSlider } from '@/components/effects/image-auto-slider';
import { useAudio } from '@/contexts/audio-context';
import { PixelCard } from '@/components/ui/pixel-card';


const DUMBLEDORE_QUOTE = "Happiness can be found, even in the darkest of times, if one only remembers to turn on the light.";
const DUMBLEDORE_AUTHOR = "— Dumbledore, J.K. Rowling, Harry Potter and the Prisoner of Azkaban";

const fullStoryText = `
## About Me: The Story Behind the Code
### A Happy Beginning: Roots of a Curious Soul
I was born into a life surrounded by warmth, laughter, and the quiet strength of a loving family. My childhood was one of sunshine and scraped knees, where the days were long and the world seemed infinitely wide and welcoming. I was that happy-go-lucky child—always running barefoot across fields, chasing butterflies, and chasing dreams before I even understood what they were.
From the very beginning, I was drawn to two seemingly different worlds: the kinetic rhythm of physical activity and the quiet refuge of books. Mornings found me sprinting across school grounds, practicing throws and jumps, or gathering friends for a spontaneous cricket match. The crack of the bat against the ball, the satisfying thud of a well-placed shot, and the collective cheer of teammates became the soundtrack of my early years. Afternoons, however, often faded into evenings with my nose buried in a book—mysteries that kept me guessing until the final page, biographies of remarkable individuals who had shaped history, fantasy worlds that expanded my imagination beyond the boundaries of reality, and science fiction that planted the first seeds of my fascination with artificial intelligence and technology.
This duality wasn't just a childhood phase; it was foundational to who I would become. The athlete and the reader, the thinker and the doer, the person who could find equal satisfaction in the physical achievement of a perfect sprint and the intellectual achievement of understanding a complex mathematical concept. These weren't competing aspects of my personality—they were complementary forces that taught me early on that human beings are beautifully complex creatures capable of excellence in multiple dimensions simultaneously.
Sports weren't just a pastime for me; they were a language, a way of understanding discipline, strategy, and resilience that would serve me well beyond the playing field. Cricket taught me about patience and timing—waiting for the right ball to attack, understanding when to defend and when to take calculated risks. Track and field introduced me to the pure mathematics of motion, the physics of acceleration and momentum, and the mental discipline required to push through physical barriers. Football showed me the beauty of collective intelligence, how individual skills could merge into something greater than the sum of their parts. Badminton taught me about anticipation and reaction time, about reading subtle cues and responding with lightning-fast precision.
The adrenaline of a match-winning stroke or the profound stillness before the starting gun taught me focus and emotional balance in ways that no classroom ever could. In sports, I learned to trust my instincts, to make split-second decisions under pressure, and to understand that failure wasn't the opposite of success but rather its most reliable teacher. Every missed shot, every lost race, every fumbled catch was data—information that could be analyzed, understood, and used to improve performance.
In contrast, literature introduced me to introspection, creativity, and the vast landscape of human thought and experience. Where sports taught me to trust my instincts and act decisively, books taught me to ask questions—and more importantly, to keep asking them even when the answers weren't immediately apparent. Through reading, I learned that every story contained multiple stories, that every perspective was both valid and limited, and that the most interesting truths often lived in the spaces between certainties.
I remember spending entire afternoons lost in the worlds created by authors who became my first teachers in the art of system thinking. Science fiction writers like Isaac Asimov and Arthur C. Clarke didn't just entertain me—they introduced me to concepts of artificial intelligence, robotics, and the profound philosophical questions that arise when we begin to create machines that can think. Fantasy authors taught me about world-building, about the importance of internal consistency and logical frameworks even in the most imaginative contexts. Mystery writers showed me the beauty of deductive reasoning and the satisfaction that comes from following clues to their logical conclusion.
### Growth, Change, and the Dawn of a Vision
As I grew older, these twin passions—movement and thought—began to find more refined expressions, evolving from childhood enthusiasms into more sophisticated interests that would eventually shape my career path. I started to notice patterns in everything: the elegant arc of a cricket ball as it spun through the air (which I would later understand in terms of physics and aerodynamics), the rhythmic structure of poetry (which taught me about pattern recognition and linguistic beauty), the careful architecture of a well-crafted paragraph (which showed me how complex ideas could be built from simple components), or the strategic logic of a chess move (which introduced me to concepts of game theory and decision trees).
My fascination with how things work gradually transformed into a deeper curiosity about systems, intelligence, and learning—both human and artificial. I began to see connections everywhere: the way a cricket team's field placement resembled an optimization problem, the way a compelling narrative followed patterns similar to algorithmic logic, the way my own learning process seemed to mirror the iterative improvement I was beginning to read about in early AI literature.
This growing curiosity found its perfect outlet in technology. I began tinkering with computers during my early teenage years, starting with simple tasks like customizing desktop environments and gradually working my way up to basic programming. My first "Hello, World!" program felt like magic—the idea that I could give instructions to a machine and have it execute them precisely was intoxicating. To me, programming felt like another language—just like literature had been—but this one could build, simulate, and bring ideas to life in ways that were both practical and profound.
The more I explored programming, the more I realized how profoundly computer science—and particularly artificial intelligence and machine learning—aligned with my natural desire to understand, solve, and create. Here was a field that combined the logical rigor I had learned from sports with the creative thinking I had developed through reading, the pattern recognition skills I had honed through years of diverse interests, and the systematic approach to problem-solving that had emerged from my multifaceted childhood experiences.
College became a transformative phase that accelerated my growth in ways I hadn't anticipated. The structured learning environment gave me access to resources, mentors, and peers who shared my passion for technology and innovation. I started formalizing my knowledge, taking courses that ranged from theoretical computer science to practical software engineering, from mathematical foundations of machine learning to the philosophical implications of artificial intelligence.
But the real learning happened outside the classroom, in the late-night coding sessions, the ambitious projects that pushed me beyond my comfort zone, and the research collaborations that taught me how knowledge is created and shared in the academic community. I began participating in hackathons, where I learned to work under pressure and collaborate with diverse teams to create functional prototypes in impossibly short timeframes. I joined research groups, where I discovered the thrill of contributing to the expansion of human knowledge, even in small ways.
It was during these formative college years that another passion blossomed—one that would profoundly influence both my technical work and my artistic sensibilities. Photography entered my life almost by accident when I needed to document a robotics project for a presentation. I borrowed a friend's DSLR camera, intending to take a few quick shots of our prototype, but something magical happened when I looked through the viewfinder for the first time.
The world suddenly became a composition of light, shadow, geometry, and emotion. I found myself spending far more time than necessary, adjusting angles, waiting for the light to change, trying to capture not just what our robot looked like, but what it represented—the culmination of months of work, the embodiment of theoretical concepts made tangible, the bridge between human creativity and mechanical precision.
From that moment, photography became an integral part of my life. I started carrying a camera everywhere, initially a simple point-and-shoot, later upgrading to more sophisticated equipment as my skills and understanding developed. I discovered that photography shared many fundamental principles with both programming and machine learning: pattern recognition, optimization, the importance of good data (in this case, interesting subjects and good light), and the iterative process of experimentation and refinement.
### The Intersection of Art and Algorithm: Discovering Photography
Photography taught me lessons that programming couldn't. It forced me to slow down, to be present in the moment, to really see the world around me instead of rushing through it focused on the next task or problem to solve. For example, most of you would actually rush over, instead of actually checking out the easter egg that appears when you quickly click the music button seven times. It taught me about patience—waiting for the perfect light, the right expression, the decisive moment when all elements of a composition aligned. It showed me the importance of perspective, both literally and metaphorically, and how changing your viewpoint by just a few degrees could completely transform the meaning and impact of an image.
I began to specialize in several areas of photography that reflected my diverse interests. Street photography appealed to my love of human stories and spontaneous moments—I would spend hours walking through different neighborhoods of Bengaluru, camera in hand, observing the small dramas and quiet beauties of everyday life. I learned to anticipate moments before they happened, to read body language and environmental cues, to be ready when the perfect intersection of light, subject, and emotion presented itself.
The bustling streets of my city became my classroom, teaching me about composition, timing, and the art of visual storytelling. I captured the morning rush of office workers hurrying to catch buses, the peaceful concentration of street vendors arranging their wares, the playful interactions of children in narrow alleyways, and the quiet dignity of elderly people watching the world change around them. Each photograph became a small story, a frozen moment that spoke to larger truths about human experience and urban life.
Landscape photography connected me to the natural world in ways I hadn't expected. Growing up, I had always been more focused on human-made environments and technological systems, but through photography, I developed a deep appreciation for natural patterns, geological formations, and the subtle ways light interacts with different materials and textures throughout the day. I would wake up before dawn to capture sunrise over mountain ranges during weekend trips, stay out past sunset to photograph the blue hour in urban environments, and plan excursions around weather patterns and seasonal changes that would provide the most interesting photographic opportunities.
Portrait photography became perhaps my most challenging and rewarding specialization. Working with people required not just technical skill, but emotional intelligence, communication ability, and the capacity to make subjects feel comfortable and authentic in front of the camera. I learned that the best portraits weren't just technically perfect images—they were collaborations between photographer and subject, moments of genuine connection captured and preserved.
As my skills developed, I began to see profound connections between photography and my work in artificial intelligence. Both fields involve pattern recognition, both require understanding of how to extract meaningful signal from noisy data, and both benefit from iterative improvement and systematic experimentation. I started experimenting with computational photography, using machine learning techniques to enhance image processing, and exploring how AI could be used to assist in photo editing and organization.
### Who I Am Today: The Convergence of Passions
Today, I find myself at a unique confluence of data, design, and discovery—a place where all my diverse interests and experiences have converged into a coherent vision of who I am and what I want to contribute to the world. I'm simultaneously a builder and a researcher, an artist and an engineer, a storyteller and a problem-solver. This multifaceted identity isn't a source of confusion or conflict; rather, it's become my greatest strength, allowing me to approach challenges from multiple angles and to see connections that might not be apparent to someone with a more narrowly focused background.
I think of machine learning models not just in terms of layers and loss functions, but as intelligent mirrors to human thought—systems that can reflect and amplify human capabilities while also revealing the assumptions and biases embedded in our thinking. This perspective, shaped by my background in literature and philosophy as much as by my technical training, leads me to approach AI development with both excitement about the possibilities and deep responsibility for the implications.
My current work spans both the technical and philosophical dimensions of artificial intelligence. On the technical side, I'm deeply involved in projects ranging from fine-tuning large language models for multilingual machine translation to building robust pipelines for hallucination mitigation in LLMs. My AutoSQL project, where I fine-tuned a 6.7B DeepSeek-Instruct-Coder model using LoRA and QLoRA adapters, achieved a 23% accuracy boost on complex SQL queries over the Spider dataset. I've developed real-time American Sign Language recognition systems that can bridge communication gaps for deaf and hard-of-hearing individuals, and I've created generative art systems inspired by classical Indian aesthetics that explore the intersection of cultural heritage and technological innovation.
But beyond the technical achievements, I'm equally invested in the broader questions that AI raises about human nature, creativity, and society. I spend significant time thinking about and writing about AI ethics, the future of human-AI collaboration, and the ways we can ensure that advanced AI systems remain aligned with human values and beneficial to society as a whole.
My journey in photography continues to inform my work in unexpected ways. The patience required to capture the perfect shot has taught me to approach debugging and model training with calm persistence. The art of framing a photograph has influenced how I communicate complex ideas—seeking clarity, focus, and the right perspective. Through the lens, I have learned to see beauty in patterns, randomness, and even in the imperfections that make each moment unique.
I still carry my childhood instincts with me, but they've evolved and matured in ways that serve my current work. The desire to explore has become a systematic approach to research and experimentation. The openness to wonder has transformed into intellectual humility and a willingness to question assumptions. The drive to excel has been tempered with self-compassion and an understanding that meaningful progress often requires patience and persistence rather than just intensity. The grit to persist has been refined into resilience—the ability to bounce back from setbacks, learn from failures, and maintain long-term vision even when facing short-term obstacles.
### Current Projects and Research Focus
My current research and development work reflects this multidisciplinary approach, combining rigorous technical investigation with broader questions about human-AI interaction and the social implications of advanced AI systems. I'm particularly focused on several key areas that I believe will be crucial for the future development of beneficial AI.
One major area of focus is hallucination mitigation in large language models. As these systems become more powerful and more widely deployed, ensuring their reliability and truthfulness becomes increasingly critical. I'm working on novel approaches that combine retrieval-augmented generation with uncertainty quantification to create systems that can not only provide accurate information but also communicate their confidence levels and limitations clearly to users.
Another significant project involves developing more inclusive and culturally sensitive AI systems. Drawing on my photography work and my appreciation for diverse perspectives, I'm researching ways to ensure that AI systems can understand and respect cultural differences, linguistic nuances, and diverse ways of thinking and communicating. This includes work on multilingual models that can preserve cultural context and meaning across translations, as well as research into bias detection and mitigation techniques.
I'm also deeply involved in exploring the creative applications of AI, particularly in areas where technology can augment rather than replace human creativity. My work in generative art, inspired by classical Indian aesthetics like Ragamala paintings, explores how AI can be used to create new forms of artistic expression while respecting and building upon traditional cultural forms. This project combines my technical skills in generative modeling with my artistic sensibilities developed through photography and my appreciation for cultural heritage and diversity.
### Goals and Aspirations: Building a Better Future
At the core of my ambitions is the fundamental belief that technology—when developed and deployed wisely—can be deeply humanizing rather than dehumanizing. I aim to contribute to the development of responsible AI systems that augment human creativity, bridge linguistic and cultural gaps, extend the frontiers of science and education, and help solve some of the most pressing challenges facing humanity.
In the short term, I'm focused on projects that combine rigorous research with practical utility. I'm working on intelligent database assistants that can help researchers and analysts extract insights from complex datasets more efficiently and accurately. I'm developing generative models for art and music that can serve as creative partners for human artists, helping them explore new possibilities while respecting their artistic vision and intent. I'm building language-agnostic translation tools that can preserve cultural context and nuance, not just literal meaning.
Long term, I see myself in a leadership role in building foundational AI systems that are robust, interpretable, and aligned with human values—whether in academia, an innovation-driven startup, or a research lab that bridges academic research and practical application. I aspire to be a builder of tools that empower others, not just a solver of isolated technical problems.
### Beyond the Algorithms: Life After Hours
When I'm not immersed in code, research papers, or model training runs, I'm still exploring—but in ways that nourish different aspects of my personality and provide the mental and emotional balance necessary for sustained creative work.
Reading remains one of my most cherished activities, and my appetite for books has only grown more diverse and sophisticated over the years. I read voraciously across genres and disciplines: contemporary fiction that helps me understand different perspectives and experiences, non-fiction that expands my knowledge of history, science, and culture, essays that challenge my thinking and introduce me to new ideas, philosophy that provides frameworks for thinking about complex ethical and existential questions, and technical literature that keeps me current with developments in AI and related fields.
Writing has become an increasingly important part of my life, serving multiple functions: it helps me process and integrate my experiences, it allows me to share my knowledge and perspectives with others, and it provides a creative outlet that complements my technical work. I maintain a technical blog where I write about AI research, share tutorials and insights, and discuss the ethical and social implications of AI development.
Running remains one of my most reliable sources of mental clarity and physical well-being. I typically run several times a week, varying between shorter, faster runs that provide an intense physical challenge and longer, more meditative runs that give me time to think and process. Some of my best insights and solutions to technical problems have come during runs, when my conscious mind is occupied with the rhythm of movement but my subconscious is free to make connections and generate new ideas.
Music plays an increasingly important role in my life, both as a listener and as an amateur creator. My musical tastes are eclectic, ranging from Hindustani classical music that connects me to my cultural heritage, to modern jazz that challenges my ear and introduces me to new harmonic possibilities, to old ghazals that combine poetry and melody in ways that move me deeply, to ambient and lo-fi music that provides the perfect background for focused work.
And, of course, there's photography. Whether I'm capturing the vibrant chaos of a Bengaluru street, the serenity of a misty morning in the Western Ghats, or the subtle interplay of light and shadow in everyday life, photography remains a grounding force. It reminds me to look up, to notice, to appreciate the world as it is—complex, beautiful, and infinitely interesting. My camera has become an extension of my curiosity, a tool for exploring not just the visual world but also the stories and emotions that lie beneath the surface.
### What Drives Me: Values and Principles
I am driven by curiosity more than certainty, and by integrity more than mere output. I believe in depth over hype, in systems thinking over reductionism, and in the power of collaborative intelligence over individual brilliance. These values shape not just how I approach my work, but how I interact with others and how I think about my role in the broader AI community.
Photography, in particular, has taught me that every picture—like every dataset—has a story, a context, and a perspective. This awareness shapes how I approach AI: with humility, empathy, and a commitment to responsible innovation. I try to remind myself that behind every model is a world of assumptions, and behind every dataset is a world of lived realities.
My curiosity is both broad and deep—I'm interested in understanding how things work at a fundamental level, but I'm also fascinated by the connections between different domains and the ways that insights from one field can illuminate problems in another. This curiosity drives me to continuously learn and explore, to question assumptions, and to remain open to new ideas and perspectives even when they challenge my existing beliefs.
### The Continuous Journey: Learning and Growing
Through it all, I remain, at heart, the same child who once ran freely across sunlit grounds with a book in one hand and a ball in the other—learning, loving, and leaping forward. My journey is far from over, and I look forward to every new challenge, every new discovery, and every new story—whether told in code, in words, or in images.
The story continues to unfold, each day bringing new questions to explore, new problems to solve, and new opportunities to make a positive difference in the world. I'm grateful for the journey so far, excited about what lies ahead, and committed to approaching whatever comes next with the same combination of technical rigor, creative thinking, ethical grounding, and joyful curiosity that has brought me to this point.
In the end, I believe that the best AI systems—like the best human lives—are those that combine multiple forms of intelligence, that draw on diverse sources of knowledge and inspiration, and that remain always in service of something larger than themselves. That's the kind of AI I want to build, and that's the kind of life I want to live.
`;

const parseStory = (text: string) => {
    // Remove the conversational intro if it exists, case-insensitively
    const storyText = text.replace(/Based on the conversation history,[\s\S]*?response:/i, '').trim();
    const lines = storyText.split('\n');

    const mainTitle = lines.find(l => l.startsWith('## '))?.replace('## ', '').trim() || '';

    const sections = [];
    let currentSection: { title: string; content: string } | null = null;

    for (const line of lines) {
        if (line.startsWith('### ')) {
            if (currentSection) {
                sections.push({ ...currentSection, content: currentSection.content.trim() });
            }
            currentSection = { title: line.replace('### ', '').trim(), content: '' };
        } else if (currentSection && !line.startsWith('## ')) {
            currentSection.content += line + '\n';
        }
    }
    if (currentSection) {
        sections.push({ ...currentSection, content: currentSection.content.trim() });
    }
    
    return { mainTitle, sections };
};

export default function PersonalPage() {
    const [isLit, setIsLit] = useState(false);
    const [showQuote, setShowQuote] = useState(false);
    const [quoteVanished, setQuoteVanished] = useState(false);
    const [showCards, setShowCards] = useState(false);
    const [showAudioPrompt, setShowAudioPrompt] = useState(true);
    const [shouldPlayAudio, setShouldPlayAudio] = useState(false);
    
    const snapRef = useRef<ThanosSnapHandle>(null);
    const router = useRouter();
    const { mainTitle, sections } = parseStory(fullStoryText);
    const { play } = useAudio();

    useEffect(() => {
        if (!isLit) {
            document.body.classList.add('personal-page-dark');
        } else {
            document.body.classList.remove('personal-page-dark');
        }
        return () => {
            document.body.classList.remove('personal-page-dark');
        };
    }, [isLit]);
    
    const handleLightOn = () => {
        setIsLit(true);
        
        setTimeout(() => {
            if (shouldPlayAudio) {
                play();
            }
            setShowQuote(true);
            
            setTimeout(() => {
                snapRef.current?.snap(() => {
                    setShowQuote(false);
                    setQuoteVanished(true); 
                    setTimeout(() => setShowCards(true), 200);
                });
            }, 4000); 
        }, 500);
    };

    const renderContent = (content: string) => {
        return content.split('\n').map((paragraph, index) => (
            <p key={index} className="text-muted-foreground mb-4 last:mb-0 leading-relaxed">
                {paragraph}
            </p>
        ));
    };

    const handleProceedWithAudio = () => {
      setShouldPlayAudio(true);
      setShowAudioPrompt(false);
    };

    const handleProceedWithoutAudio = () => {
      setShowAudioPrompt(false);
    };

    const handleGoBack = () => {
      router.back();
    };

    return (
        <div className="min-h-screen">
            <AlertDialog open={showAudioPrompt}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Immersive Audio Experience</AlertDialogTitle>
                        <AlertDialogDescription>
                            For the best experience, please wear headphones. This page features background music to set the mood.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button variant="destructive" onClick={handleGoBack}>Go Back</Button>
                        <Button variant="secondary" onClick={handleProceedWithoutAudio}>Proceed without Audio</Button>
                        <Button className="bg-green-600 hover:bg-green-700 text-primary-foreground" onClick={handleProceedWithAudio}>Proceed</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AnimatePresence>
                {!isLit && !showAudioPrompt && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
                    >
                        <div className="absolute top-1/4 text-center text-white px-4">
                            <h2 className="text-2xl font-serif">A Glimpse Into the Story</h2>
                            <p className="text-muted-foreground mt-2">Pull down the light to begin.</p>
                        </div>
                        <LightPullThemeSwitcher onLightOn={handleLightOn} />
                    </motion.div>
                )}
            </AnimatePresence>

            {isLit && (
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <AnimatePresence>
                        {!quoteVanished && showQuote && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="min-h-[calc(100vh-8rem)] flex items-center justify-center"
                            >
                                <ThanosSnapEffect ref={snapRef}>
                                    <blockquote className="text-center max-w-3xl mx-auto">
                                        <p className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-foreground">
                                            &ldquo;{DUMBLEDORE_QUOTE}&rdquo;
                                        </p>
                                        <footer className="mt-4 text-lg text-muted-foreground font-serif">{DUMBLEDORE_AUTHOR}</footer>
                                    </blockquote>
                                </ThanosSnapEffect>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                    <AnimatePresence>
                    {showCards && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                            className="max-w-4xl mx-auto space-y-8"
                        >
                             <PixelCard>
                                 <CardHeader>
                                     <CardTitle className="text-3xl md:text-4xl text-center text-primary">{mainTitle}</CardTitle>
                                 </CardHeader>
                             </PixelCard>

                            {sections.map((section, index) => (
                                <React.Fragment key={index}>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-2xl md:text-3xl">{section.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            {renderContent(section.content)}
                                        </CardContent>
                                    </Card>
                                    {index === 2 && <ImageAutoSlider />}
                                </React.Fragment>
                            ))}
                        </motion.div>
                    )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}

    
