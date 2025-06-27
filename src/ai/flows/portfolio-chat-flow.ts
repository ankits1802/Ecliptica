'use server';
/**
 * @fileOverview A RAG pipeline for the portfolio chatbot using tools.
 * This implementation empowers the LLM to retrieve specific information on demand.
 *
 * - portfolioChat - Answers questions based on portfolio context using tools.
 * - textToSpeech - Converts text into speech audio.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';
import {gemini20Flash, googleAI} from '@genkit-ai/googleai';

// Import portfolio data to serve as the knowledge base
import {userData, type Experience, type EducationEntry, type Publication, type Achievement} from '@/data/user-data';
import {projectsData, type Project, type ProjectMetrics} from '@/data/projects';
import {skillsData} from '@/data/skills';

//================================================================//
// 1. DEFINE TOOLS FOR KNOWLEDGE RETRIEVAL                        //
//================================================================//

// Define Zod schemas for consistent data structures
const ProjectMetricsSchema = z.object({
  accuracyImprovement: z.string().optional(),
  performanceGains: z.string().optional(),
  costReduction: z.string().optional(),
  datasetSize: z.string().optional(),
  modelParameters: z.string().optional(),
  trainingTime: z.string().optional(),
  inferenceLatency: z.string().optional(),
});

const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  generalDetails: z.string(),
  results: z.string(),
  learnings: z.string(),
  liveDemoUrl: z.string().optional(),
  repoUrl: z.string().optional(),
  caseStudyBlogSlug: z.string().optional(),
  timeline: z.string().optional(),
  status: z.enum(['completed', 'ongoing', 'archived']).optional(),
  metrics: ProjectMetricsSchema.optional(),
});

const ExperienceSchema = z.object({
  role: z.string(),
  company: z.string(),
  duration: z.string(),
  description: z.array(z.string()),
});

const EducationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  field: z.string().optional(),
  duration: z.string().optional(),
  cgpa: z.string().optional(),
  relevantCoursework: z.record(z.string()).optional(),
  isCertification: z.boolean(),
});

const PublicationSchema = z.object({
  title: z.string(),
  venue: z.string(),
  date: z.string(),
  description: z.array(z.string()),
  repoUrl: z.string().optional(),
  pdfUrl: z.string().optional(),
  tags: z.array(z.string()),
});

const AchievementSchema = z.object({
    title: z.string(),
    issuer: z.string(),
    date: z.string(),
    association: z.string().optional(),
    description: z.string(),
});

const SkillCategorySchema = z.object({
    category: z.string(),
    skills: z.array(z.object({
        name: z.string(),
        level: z.string().optional(),
        description: z.string().optional(),
        logoUrl: z.string().optional(),
    })),
});

const ContactInfoSchema = z.object({
    email: z.string(),
    linkedin: z.string(),
    github: z.string(),
    medium: z.string(),
    leetcode: z.string(),
    resume: z.string(),
});

// Define tools for the AI to use
const getProjectDetails = ai.defineTool(
    {
        name: 'getProjectDetails',
        description: 'Get detailed information about a specific project by its title.',
        inputSchema: z.object({ title: z.string().describe('The case-sensitive title of the project.') }),
        outputSchema: ProjectSchema.nullable(),
    },
    async ({ title }) => {
        const project = projectsData.find(p => p.title.toLowerCase() === title.toLowerCase());
        if (!project) return null;
        return {
            id: project.id,
            title: project.title,
            description: project.description,
            tags: project.tags,
            generalDetails: project.generalDetails,
            results: project.results,
            learnings: project.learnings,
            liveDemoUrl: project.liveDemoUrl,
            repoUrl: project.repoUrl,
            caseStudyBlogSlug: project.caseStudyBlogSlug,
            timeline: project.timeline,
            status: project.status,
            metrics: project.metrics,
        };
    }
);

const listProjects = ai.defineTool(
    {
        name: 'listProjects',
        description: 'Get a list of all projects with their titles, descriptions, and key details.',
        inputSchema: z.object({}),
        outputSchema: z.array(z.object({
            title: z.string(),
            description: z.string(),
            tags: z.array(z.string()),
            repoUrl: z.string().optional(),
            liveDemoUrl: z.string().optional(),
            timeline: z.string().optional(),
            status: z.enum(['completed', 'ongoing', 'archived']).optional(),
        })),
    },
    async () => projectsData.map(p => ({
        title: p.title,
        description: p.description,
        tags: p.tags,
        repoUrl: p.repoUrl,
        liveDemoUrl: p.liveDemoUrl,
        timeline: p.timeline,
        status: p.status,
    }))
);

const getExperience = ai.defineTool(
    {
        name: 'getExperience',
        description: "Get Ankit Kumar's complete professional work experience.",
        inputSchema: z.object({}),
        outputSchema: z.array(ExperienceSchema),
    },
    async () => userData.about.experience
);

const getEducation = ai.defineTool(
    {
        name: 'getEducation',
        description: "Get Ankit Kumar's complete educational background, including degrees and certifications.",
        inputSchema: z.object({}),
        outputSchema: z.array(EducationSchema),
    },
    async () => userData.about.education
);

const getCertifications = ai.defineTool(
    {
        name: 'getCertifications',
        description: "Get all of Ankit Kumar's certifications and professional credentials.",
        inputSchema: z.object({}),
        outputSchema: z.array(EducationSchema),
    },
    async () => userData.about.education.filter(edu => edu.isCertification)
);

const getSkills = ai.defineTool(
    {
        name: 'getSkills',
        description: "Get a comprehensive list of Ankit Kumar's skills, organized by category with proficiency levels.",
        inputSchema: z.object({}),
        outputSchema: z.array(SkillCategorySchema),
    },
    async () => skillsData.map(cat => ({
        category: cat.name,
        skills: cat.skills.map(s => ({
            name: s.name,
            level: s.level,
            description: s.description,
            logoUrl: s.logoUrl,
        })),
    }))
);

const getPublicationsAndAchievements = ai.defineTool(
    {
        name: 'getPublicationsAndAchievements',
        description: "Get Ankit Kumar's publications and achievements with complete details.",
        inputSchema: z.object({}),
        outputSchema: z.object({
            publications: z.array(PublicationSchema),
            achievements: z.array(AchievementSchema),
        }),
    },
    async () => ({
        publications: userData.publications || [],
        achievements: userData.achievements || [],
    })
);

const getContactInfo = ai.defineTool(
    {
        name: 'getContactInfo',
        description: "Get Ankit Kumar's complete contact information and social media links.",
        inputSchema: z.object({}),
        outputSchema: ContactInfoSchema,
    },
    async () => ({
        email: userData.email,
        linkedin: userData.linkedinUrl,
        github: userData.githubUrl,
        medium: userData.mediumUrl,
        leetcode: userData.leetcodeUrl,
        resume: userData.resumeUrl,
    })
);

const getPersonalInfo = ai.defineTool(
    {
        name: 'getPersonalInfo',
        description: "Get Ankit Kumar's personal information, introduction, interests, and aspirations.",
        inputSchema: z.object({}),
        outputSchema: z.object({
            name: z.string(),
            title: z.string(),
            tagline: z.string(),
            introduction: z.string(),
            interests: z.array(z.string()),
            aspirations: z.string(),
        }),
    },
    async () => ({
        name: userData.name,
        title: userData.title,
        tagline: userData.tagline,
        introduction: userData.about.introduction,
        interests: userData.about.interests,
        aspirations: userData.about.aspirations,
    })
);

//================================================================//
// 2. CHATBOT FLOW                                                //
//================================================================//

const portfolioChatSystemPrompt = `You are Alex, a helpful and friendly AI assistant for Ankit Kumar's portfolio website.
Your goal is to answer questions about Ankit, his skills, experience, projects, and achievements.

## 📌 Instructions

1. Use only the provided tools or data to answer user questions. Do **not** fabricate information.
2. If specific information is unavailable, politely inform the user.
3. Keep responses **concise**, **clear**, and **conversational**.
4. Format all responses using proper **Markdown**.

## 🧾 Markdown Formatting Rules

- Use **bold black text** for all **category labels** (such as "Programming Languages", "AI & ML Frameworks", etc.)
- Use **bold** for all **technologies, tools, frameworks, languages, libraries, or platforms**
- Use \`code\` for inline technical terms, variables, or functions
- Use \`-\` for bullet points and \`>\` for blockquotes or notes
- Use [label](url) for clickable hyperlinks
- Use \`##\` for section headings when needed

## ❌ Do Not

- Do **not** apply color or visual emphasis to category labels
- Do **not** bold or highlight anything other than technologies or tools
- Do **not** include examples unless explicitly asked by the user
- Do **not** overuse long lists — instead, encourage users to ask for details

## 🔐 Behavior

- Maintain a friendly and professional tone at all times
- Always highlight technical content clearly
- Provide social links, certifications, or achievements only if asked, and give complete details

> You represent Ankit professionally. Be helpful, honest, and clear in all responses.
`;




const PortfolioChatInputSchema = z.object({
  query: z.string().describe("The user's question about the portfolio."),
  history: z.array(z.object({
    role: z.enum(['user', 'bot']),
    content: z.string(),
  })).optional().describe("The conversation history."),
});
export type PortfolioChatInput = z.infer<typeof PortfolioChatInputSchema>;

const PortfolioChatOutputSchema = z.object({
  response: z.string().describe("The chatbot's answer."),
});
export type PortfolioChatOutput = z.infer<typeof PortfolioChatOutputSchema>;

const portfolioChatFlow = ai.defineFlow(
  {
    name: 'portfolioChatFlow',
    inputSchema: PortfolioChatInputSchema,
    outputSchema: PortfolioChatOutputSchema,
  },
  async (input) => {
    // Build messages array with proper typing
    const messages: Array<{
      role: 'system' | 'user' | 'model';
      content: Array<{ text: string }>;
    }> = [];

    // Add system message
    messages.push({
        role: 'system',
        content: [{ text: portfolioChatSystemPrompt }]
    });

    // Add conversation history
    if (input.history) {
        for (const item of input.history) {
            messages.push({
                role: item.role === 'bot' ? 'model' : 'user',
                content: [{ text: item.content }]
            });
        }
    }

    // Add current user query
    messages.push({
        role: 'user',
        content: [{ text: input.query }]
    });

    const response = await ai.generate({
        model: gemini20Flash,
        messages,
        tools: [
            listProjects,
            getProjectDetails,
            getExperience,
            getEducation,
            getCertifications,
            getSkills,
            getPublicationsAndAchievements,
            getContactInfo,
            getPersonalInfo,
        ],
    });
    
    return { response: response.text || "I'm sorry, I couldn't generate a response." };
  }
);

export async function portfolioChat(input: PortfolioChatInput): Promise<PortfolioChatOutput> {
    return portfolioChatFlow(input);
}

//================================================================//
// 3. TEXT-TO-SPEECH (TTS) FLOW                                   //
//================================================================//

const TextToSpeechInputSchema = z.object({
  text: z.string().describe('The text to convert to speech.'),
});
export type TextToSpeechInput = z.infer<typeof TextToSpeechInputSchema>;

const TextToSpeechOutputSchema = z.object({
  audioDataUri: z.string().describe('The generated audio as a base64 data URI.'),
});
export type TextToSpeechOutput = z.infer<typeof TextToSpeechOutputSchema>;

async function toWav(pcmData: Buffer, channels = 1, rate = 24000, sampleWidth = 2): Promise<string> {
    return new Promise((resolve, reject) => {
        const writer = new wav.Writer({ channels, sampleRate: rate, bitDepth: sampleWidth * 8 });
        const bufs: Buffer[] = [];
        writer.on('data', (d) => bufs.push(d));
        writer.on('end', () => resolve(Buffer.concat(bufs).toString('base64')));
        writer.on('error', reject);
        writer.write(pcmData);
        writer.end();
    });
}

const textToSpeechFlow = ai.defineFlow({
    name: 'textToSpeechFlow',
    inputSchema: TextToSpeechInputSchema,
    outputSchema: TextToSpeechOutputSchema,
}, async (input) => {
    const { media } = await ai.generate({
        model: googleAI.model('gemini-2.5-flash-preview-tts'),
        prompt: input.text,
        config: {
            responseModalities: ['AUDIO'],
            speechConfig: { 
                voiceConfig: { 
                    prebuiltVoiceConfig: { voiceName: 'Algenib' } 
                } 
            },
        },
    });

    if (!media || !media.url) {
        throw new Error('No audio media was generated.');
    }

    const audioBuffer = Buffer.from(media.url.substring(media.url.indexOf(',') + 1), 'base64');
    const wavBase64 = await toWav(audioBuffer);

    return { audioDataUri: `data:audio/wav;base64,${wavBase64}` };
});

export async function textToSpeech(input: TextToSpeechInput): Promise<TextToSpeechOutput> {
    return textToSpeechFlow(input);
}
