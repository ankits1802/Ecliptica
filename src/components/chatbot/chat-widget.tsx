// src/components/chatbot/chat-widget.tsx
'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@/contexts/chat-context';
import { cn } from '@/lib/utils';
import { Bot, Expand, Loader2, Mic, Send, Volume2, X, Shrink, Headphones, Paperclip, Sparkles, ChevronUp, User, Trash2, Briefcase, BrainCircuit, Database, MessageSquare, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { analyzeDocumentAction, askChatbotAction } from '@/app/actions/chat-actions';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { userData } from '@/data/user-data';
import { SpiralAnimation } from '@/components/effects/spiral-animation';
import { FrequencyAnimation } from '@/components/effects/frequency-animation';
import { ThanosSnapEffect, type ThanosSnapHandle } from '@/components/effects/thanos-snap-effect';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Lottie from "lottie-react";
import micWaveAnimation from "./mic-wave.json";

// Enhanced MicLottie Component
export function MicLottie({ isListening, size = 48 }: { isListening: boolean; size?: number }) {
  return (
    <div className="flex items-center justify-center" style={{ width: size, height: size }}>
      {isListening ? (
        <Lottie 
          animationData={micWaveAnimation} 
          loop={true} 
          style={{ width: size, height: size }}
        />
      ) : (
        <Mic size={size * 0.6} />
      )}
    </div>
  );
}

declare global {
    interface Window {
        SpeechRecognition: typeof CustomSpeechRecognition;
        webkitSpeechRecognition: typeof CustomSpeechRecognition;
    }
    
    var CustomSpeechRecognition: {
        prototype: CustomSpeechRecognition;
        new(): CustomSpeechRecognition;
    };
}

interface CustomSpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    grammars?: any;
    maxAlternatives?: number;
    onaudioend?: ((this: CustomSpeechRecognition, ev: Event) => any) | null;
    onaudiostart?: ((this: CustomSpeechRecognition, ev: Event) => any) | null;
    onstart: ((this: CustomSpeechRecognition, ev: Event) => any) | null;
    onend: ((this: CustomSpeechRecognition, ev: Event) => any) | null;
    onerror: ((this: CustomSpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
    onresult: ((this: CustomSpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
    onnomatch?: ((this: CustomSpeechRecognition, ev: Event) => any) | null;
    onsoundend?: ((this: CustomSpeechRecognition, ev: Event) => any) | null;
    onsoundstart?: ((this: CustomSpeechRecognition, ev: Event) => any) | null;
    onspeechend?: ((this: CustomSpeechRecognition, ev: Event) => any) | null;
    onspeechstart?: ((this: CustomSpeechRecognition, ev: Event) => any) | null;
    start(): void;
    stop(): void;
    abort?(): void;
}

interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message: string;
}

interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
    resultIndex: number;
}

interface SpeechRecognitionResultList {
    length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
    length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
    isFinal: boolean;
}

interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}

export type Message = {
    role: 'user' | 'bot';
    content: string;
    audioUrl?: string;
    id: number;
    isTyping?: boolean;
    displayedContent?: string;
    isLocked?: boolean;
    shouldSpeak?: boolean;
};

type StagedFile = {
    name: string;
    dataUri: string;
};

const suggestionPrompts = [
  {
    icon: Briefcase,
    title: 'Summarize your professional experience.',
    description: "Get a quick overview of Ankit's roles and companies.",
  },
  {
    icon: BrainCircuit,
    title: 'What are your top 3 machine learning skills?',
    description: 'Find out which ML technologies Ankit is most proficient in.',
  },
  {
    icon: Database,
    title: 'Tell me about the AutoSQL project.',
    description: 'Learn more about the text-to-SQL generation project.',
  },
  {
    icon: MessageSquare,
    title: 'How can I contact you for work?',
    description: 'Get information on how to reach out for opportunities.',
  },
  {
    icon: Users,
    title: 'What are you passionate about outside of work?',
    description: "Discover Ankit's personal interests and hobbies.",
  },
  {
    icon: Award,
    title: 'Which certifications do you hold?',
    description: 'Ask about professional credentials and certifications.',
  },
];

// Enhanced TypewriterText component with voice mode support
const TypewriterText = React.memo(({ 
    text, 
    speed = 0.25, 
    onComplete, 
    messageId,
    isVoiceMode = false
}: { 
    text: string; 
    speed?: number; 
    onComplete?: (messageId: number) => void;
    messageId: number;
    isVoiceMode?: boolean;
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const indexRef = useRef(0);
    const textRef = useRef(text);

    // Faster typing in voice mode
    const actualSpeed = isVoiceMode ? speed * 0.1 : speed;

    useEffect(() => {
        // Only reset if the text actually changed
        if (textRef.current !== text) {
            textRef.current = text;
            setDisplayedText('');
            setIsTyping(true);
            indexRef.current = 0;
        }

        // Clear any existing interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        // Start typing animation
        intervalRef.current = setInterval(() => {
            if (indexRef.current < textRef.current.length) {
                setDisplayedText(textRef.current.slice(0, indexRef.current + 1));
                indexRef.current++;
            } else {
                // Typing complete
                clearInterval(intervalRef.current!);
                setIsTyping(false);
                if (onComplete) {
                    onComplete(messageId);
                }
            }
        }, actualSpeed);

        // Cleanup function
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [text, actualSpeed, onComplete, messageId]);

    // Custom components for ReactMarkdown
    const components = {
        h1: ({ children }: any) => <h1 className="text-xl font-bold mb-2 text-foreground">{children}</h1>,
        h2: ({ children }: any) => <h2 className="text-lg font-semibold mb-2 text-foreground">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-base font-medium mb-1 text-foreground">{children}</h3>,
        p: ({ children }: any) => <p className="mb-2 text-foreground leading-relaxed">{children}</p>,
        ul: ({ children }: any) => <ul className="list-disc list-outside pl-5 mb-2 space-y-1">{children}</ul>,
        ol: ({ children }: any) => <ol className="list-decimal list-outside pl-5 mb-2 space-y-1">{children}</ol>,
        li: ({ children }: any) => <li className="text-foreground">{children}</li>,
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-primary/50 pl-4 py-2 mb-2 bg-muted/30 rounded-r-md">
                {children}
            </blockquote>
        ),
        code: ({ inline, children }: any) => 
            inline ? (
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary">
                    {children}
                </code>
            ) : (
                <pre className="bg-muted p-3 rounded-md overflow-x-auto mb-2">
                    <code className="text-sm font-mono text-foreground">{children}</code>
                </pre>
            ),
        strong: ({ children }: any) => (
            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground shadow-sm mr-1">
                {children}
            </span>
        ),
        em: ({ children }: any) => <em className="italic text-foreground">{children}</em>,
        a: ({ href, children }: any) => (
            <a 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary underline hover:opacity-80 transition-opacity"
            >
                {children}
            </a>
        ),
        hr: () => <hr className="border-border my-4" />,
        table: ({ children }: any) => (
            <div className="overflow-x-auto mb-2">
                <table className="min-w-full border-collapse border border-border">
                    {children}
                </table>
            </div>
        ),
        thead: ({ children }: any) => <thead className="bg-muted">{children}</thead>,
        tbody: ({ children }: any) => <tbody>{children}</tbody>,
        tr: ({ children }: any) => <tr className="border-b border-border">{children}</tr>,
        th: ({ children }: any) => (
            <th className="border border-border px-3 py-2 text-left font-semibold text-foreground">
                {children}
            </th>
        ),
        td: ({ children }: any) => (
            <td className="border border-border px-3 py-2 text-foreground">
                {children}
            </td>
        ),
    };

    return (
        <div className="prose prose-sm dark:prose-invert max-w-none text-left">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={components}
            >
                {displayedText}
            </ReactMarkdown>
            {isTyping && <span className="animate-pulse text-primary">|</span>}
        </div>
    );
});

TypewriterText.displayName = 'TypewriterText';

// Static markdown renderer for non-typing messages
const MarkdownRenderer = React.memo(({ content }: { content: string }) => {
    const components = {
        h1: ({ children }: any) => <h1 className="text-xl font-bold mb-2 text-foreground">{children}</h1>,
        h2: ({ children }: any) => <h2 className="text-lg font-semibold mb-2 text-foreground">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-base font-medium mb-1 text-foreground">{children}</h3>,
        p: ({ children }: any) => <p className="mb-2 text-foreground leading-relaxed">{children}</p>,
        ul: ({ children }: any) => <ul className="list-disc list-outside pl-5 mb-2 space-y-1">{children}</ul>,
        ol: ({ children }: any) => <ol className="list-decimal list-outside pl-5 mb-2 space-y-1">{children}</ol>,
        li: ({ children }: any) => <li className="text-foreground">{children}</li>,
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-primary/50 pl-4 py-2 mb-2 bg-muted/30 rounded-r-md">
                {children}
            </blockquote>
        ),
        code: ({ inline, children }: any) => 
            inline ? (
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary">
                    {children}
                </code>
            ) : (
                <pre className="bg-muted p-3 rounded-md overflow-x-auto mb-2">
                    <code className="text-sm font-mono text-foreground">{children}</code>
                </pre>
            ),
        strong: ({ children }: any) => (
            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground shadow-sm mr-1">
                {children}
            </span>
        ),
        em: ({ children }: any) => <em className="italic text-foreground">{children}</em>,
        a: ({ href, children }: any) => (
            <a 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary underline hover:opacity-80 transition-opacity"
            >
                {children}
            </a>
        ),
        hr: () => <hr className="border-border my-4" />,
        table: ({ children }: any) => (
            <div className="overflow-x-auto mb-2">
                <table className="min-w-full border-collapse border border-border">
                    {children}
                </table>
            </div>
        ),
        thead: ({ children }: any) => <thead className="bg-muted">{children}</thead>,
        tbody: ({ children }: any) => <tbody>{children}</tbody>,
        tr: ({ children }: any) => <tr className="border-b border-border">{children}</tr>,
        th: ({ children }: any) => (
            <th className="border border-border px-3 py-2 text-left font-semibold text-foreground">
                {children}
            </th>
        ),
        td: ({ children }: any) => (
            <td className="border border-border px-3 py-2 text-foreground">
                {children}
            </td>
        ),
    };

    return (
        <div className="prose prose-sm dark:prose-invert max-w-none text-left">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={components}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
});

MarkdownRenderer.displayName = 'MarkdownRenderer';

export function ChatWidget() {
    const { isOpen, setIsOpen } = useChat();
    const { toast } = useToast();
    const [isExpanded, setIsExpanded] = useState(false);
    const snapRef = useRef<ThanosSnapHandle>(null);
    
    // Memoize initial messages to prevent recreation
    const initialMessages = useMemo<Message[]>(() => [
        { id: 0, role: 'bot', content: "Hello! I'm Alex, your AI assistant. How can I help you today?" }
    ], []);
    
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isBotSpeaking, setIsBotSpeaking] = useState(false);
    const [stagedFile, setStagedFile] = useState<StagedFile | null>(null);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const [isVoiceMode, setIsVoiceMode] = useState(false);
    const [isAnyMessageTyping, setIsAnyMessageTyping] = useState(false);
    const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<CustomSpeechRecognition | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const speechSynthRef = useRef<SpeechSynthesis | null>(null);
    const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    // Enhanced male voice selection function
    const selectMaleVoice = useCallback((voices: SpeechSynthesisVoice[]) => {
        // Priority list of known male voice names
        const maleVoiceNames = [
            'Google US English Male',
            'Microsoft David Desktop - English (United States)',
            'Microsoft Mark - English (United States)',
            'Alex', // macOS male voice
            'Daniel', // macOS male voice
            'en-US-AriaNeural', // Microsoft male voice
            'en-US-GuyNeural', // Microsoft male voice
            'en-US-DavisNeural', // Microsoft male voice
        ];
        
        // First try to find a voice by name
        const namedMaleVoice = voices.find(voice => 
            maleVoiceNames.some(maleName => voice.name.includes(maleName))
        );
        
        if (namedMaleVoice) {
            console.log('Found named male voice:', namedMaleVoice.name);
            return namedMaleVoice;
        }
        
        // Fallback: look for voices with "male" in the name
        const maleKeywordVoice = voices.find(voice => 
            voice.name.toLowerCase().includes('male')
        );
        
        if (maleKeywordVoice) {
            console.log('Found male keyword voice:', maleKeywordVoice.name);
            return maleKeywordVoice;
        }
        
        // Look for common male voice identifiers
        const commonMaleVoice = voices.find(voice => 
            ['david', 'mark', 'alex', 'daniel', 'guy', 'davis'].some(name => 
                voice.name.toLowerCase().includes(name.toLowerCase())
            )
        );
        
        if (commonMaleVoice) {
            console.log('Found common male voice:', commonMaleVoice.name);
            return commonMaleVoice;
        }
        
        // Last resort: return first English voice (might be male or female)
        const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
        console.log('Using fallback English voice:', englishVoice?.name || 'None found');
        return englishVoice || voices[0];
    }, []);

    // Initialize speech synthesis and load voices with male voice detection
    useEffect(() => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            speechSynthRef.current = window.speechSynthesis;
            
            const loadVoices = () => {
                const voices = speechSynthRef.current?.getVoices() || [];
                setAvailableVoices(voices);
                
                // Log available male voices for debugging
                const maleVoices = voices.filter(voice => 
                    voice.name.toLowerCase().includes('male') ||
                    ['david', 'mark', 'alex', 'daniel', 'guy', 'davis'].some(name => 
                        voice.name.toLowerCase().includes(name.toLowerCase())
                    )
                );
                console.log('Available male voices:', maleVoices.map(v => v.name));
                console.log('Total voices available:', voices.length);
            };

            // Load voices immediately
            loadVoices();
            
            // Also listen for voices changed event (Chrome needs this)
            speechSynthRef.current.addEventListener('voiceschanged', loadVoices);
            
            return () => {
                speechSynthRef.current?.removeEventListener('voiceschanged', loadVoices);
            };
        }
    }, []);

    useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollElement = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
            if (scrollElement) {
                scrollElement.scrollTo({ top: scrollElement.scrollHeight, behavior: 'smooth' });
            }
        }
    }, [messages]);

    // Markdown stripping function
    const stripMarkdown = useCallback((markdown: string): string => {
        return markdown
            // Remove headers (### Header -> Header)
            .replace(/^#{1,6}\s+/gm, '')
            // Remove bold/italic (**text** or *text* -> text)
            .replace(/\*{1,2}([^*]+)\*{1,2}/g, '$1')
            .replace(/_{1,2}([^_]+)_{1,2}/g, '$1')
            // Remove strikethrough (~~text~~ -> text)
            .replace(/~~([^~]+)~~/g, '$1')
            // Remove inline code (`code` -> code)
            .replace(/`([^`]+)`/g, '$1')
            // Remove code blocks (`````` -> code)
            .replace(/``````/g, '')
            // Remove blockquotes (> text -> text)
            .replace(/^>\s+/gm, '')
            // Remove links ([text](url) -> text)
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            // Remove horizontal rules (--- -> empty)
            .replace(/^[-*_]{3,}$/gm, '')
            // Remove list markers (- item -> item, 1. item -> item)
            .replace(/^[\s]*[-*+]\s+/gm, '')
            .replace(/^[\s]*\d+\.\s+/gm, '')
            // Clean up extra whitespace
            .replace(/\n{3,}/g, '\n\n')
            .trim();
    }, []);

    const handleClearChat = useCallback(() => {
        // Stop any ongoing speech
        if (speechSynthRef.current) {
            speechSynthRef.current.cancel();
            setIsBotSpeaking(false);
        }
        
        snapRef.current?.snap(() => {
            setMessages(initialMessages);
            setIsAnyMessageTyping(false);
            if (isExpanded) {
                setShowSuggestions(true);
            }
        });
    }, [isExpanded, initialMessages]);
    
    const handleFileAnalysis = useCallback(async (query: string) => {
        if (!stagedFile) return;

        setMessages(prev => [...prev, {id: Date.now(), role: 'user', content: query}]);
        setIsLoading(true);
        const fileInfo = stagedFile;
        setStagedFile(null); 

        const result = await analyzeDocumentAction(fileInfo.dataUri, query);
        
        const botMessage: Message = {
            id: Date.now() + 1,
            role: 'bot',
            content: result.response || "Sorry, I couldn't analyze the document.",
            isTyping: true,
            isLocked: true,
            shouldSpeak: isVoiceMode,
        };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
        setIsAnyMessageTyping(true);
    }, [stagedFile, isVoiceMode]);

    const handleSubmit = useCallback(async (query: string) => {
        const trimmedQuery = query.trim();
        if (!trimmedQuery || isLoading || isBotSpeaking || isAnyMessageTyping) return;

        setInput('');
        
        if (stagedFile) {
            handleFileAnalysis(trimmedQuery);
            return;
        }

        const userMessage: Message = { id: Date.now(), role: 'user', content: trimmedQuery };
        const historyForAI = messages.slice(1).filter(msg => !msg.isTyping);

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        const aiResponse = await askChatbotAction(trimmedQuery, historyForAI);
        setIsLoading(false); 

        let botMessage: Message;
        if (aiResponse.success && aiResponse.response) {
            botMessage = { 
                id: Date.now() + 1, 
                role: 'bot', 
                content: aiResponse.response,
                isTyping: true,
                isLocked: true,
                shouldSpeak: isVoiceMode,
            };
            setMessages(prev => [...prev, botMessage]);
            setIsAnyMessageTyping(true);
        } else {
            botMessage = { 
                id: Date.now() + 1, 
                role: 'bot', 
                content: aiResponse.error || "Sorry, something went wrong.",
                isTyping: true,
                isLocked: true,
                shouldSpeak: isVoiceMode,
            };
            setMessages(prev => [...prev, botMessage]);
            setIsAnyMessageTyping(true);
        }
    }, [isLoading, isBotSpeaking, stagedFile, isVoiceMode, messages, handleFileAnalysis, isAnyMessageTyping]);

    // Enhanced TTS function with male voice selection
    const handleTts = useCallback(async (text: string, messageId: number) => {
        if (!speechSynthRef.current) {
            console.error('Speech synthesis not supported');
            if (isVoiceMode) {
                setTimeout(() => handleMicClick(), 500);
            }
            return;
        }

        try {
            // Strip markdown formatting before TTS
            const plainText = stripMarkdown(text);
            console.log('Original text:', text.substring(0, 50) + '...');
            console.log('Plain text for TTS:', plainText.substring(0, 50) + '...');
            
            setIsBotSpeaking(true);

            // Cancel any ongoing speech
            speechSynthRef.current.cancel();

            // Wait for voices to be available
            let voices = availableVoices;
            if (voices.length === 0) {
                console.log('Waiting for voices to load...');
                await new Promise<void>((resolve) => {
                    const checkVoices = () => {
                        voices = speechSynthRef.current?.getVoices() || [];
                        if (voices.length > 0) {
                            setAvailableVoices(voices);
                            resolve();
                        } else {
                            setTimeout(checkVoices, 100);
                        }
                    };
                    checkVoices();
                });
            }

            // Create utterance with plain text
            const utterance = new SpeechSynthesisUtterance(plainText);
            currentUtteranceRef.current = utterance;

            // Configure utterance for male voice
            utterance.rate = 1.0;
            utterance.pitch = 0.9; // Slightly lower pitch for more masculine sound
            utterance.volume = 1.0;
            utterance.lang = 'en-US';

            // **Key change: Select male voice instead of female**
            const maleVoice = selectMaleVoice(voices);
            if (maleVoice) {
                utterance.voice = maleVoice;
                console.log('Using male voice:', maleVoice.name);
            } else {
                console.log('No male voice found, using default');
            }

            // Set up event handlers
            utterance.onstart = () => {
                console.log('Speech started');
                setIsBotSpeaking(true);
            };

            utterance.onend = () => {
                console.log('Speech ended');
                setIsBotSpeaking(false);
                currentUtteranceRef.current = null;
                
                if (isVoiceMode) {
                    // Small delay before starting to listen again
                    setTimeout(() => {
                        handleMicClick();
                    }, 300);
                }
            };

            utterance.onerror = (event) => {
                console.error('Speech synthesis error:', event.error);
                setIsBotSpeaking(false);
                currentUtteranceRef.current = null;
                
                if (isVoiceMode) {
                    setTimeout(() => {
                        handleMicClick();
                    }, 500);
                }
            };

            utterance.onpause = () => {
                console.log('Speech paused');
            };

            utterance.onresume = () => {
                console.log('Speech resumed');
            };

            // Start speaking
            console.log('Starting speech synthesis...');
            speechSynthRef.current.speak(utterance);

        } catch (error) {
            console.error('TTS Error:', error);
            setIsBotSpeaking(false);
            currentUtteranceRef.current = null;
            
            if (isVoiceMode) {
                setTimeout(() => {
                    handleMicClick();
                }, 500);
            }
        }
    }, [isVoiceMode, availableVoices, stripMarkdown, selectMaleVoice]);
    
    const handleMicClick = useCallback(() => {
        if (isBotSpeaking || isAnyMessageTyping) return;
        if (!recognitionRef.current) {
            toast({ title: 'Unsupported Browser', description: 'Speech recognition is not supported.', variant: 'destructive' });
            return;
        }
        if (isRecording) {
            recognitionRef.current.stop();
        } else {
            setInput('');
            recognitionRef.current.start();
        }
    }, [isRecording, toast, isBotSpeaking, isAnyMessageTyping]);

    // Memoize the speech recognition setup to prevent recreation on every render
    const speechRecognitionSetup = useMemo(() => {
        if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
            const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;
            return new SpeechRecognitionConstructor() as CustomSpeechRecognition;
        }
        return null;
    }, []);

    useEffect(() => {
        if (speechRecognitionSetup) {
            recognitionRef.current = speechRecognitionSetup;
            
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onstart = () => {
                console.log('Speech recognition started');
                setIsRecording(true);
            };
            
            recognitionRef.current.onend = () => {
                console.log('Speech recognition ended');
                setIsRecording(false);
            };
            
            recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
                console.error('Speech recognition error', event.error);
                toast({ title: 'Speech Recognition Error', description: event.error, variant: 'destructive' });
                setIsRecording(false);
            };
            
            recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
                const transcript = Array.from(event.results)
                  .map((result: SpeechRecognitionResult) => result[0])
                  .map((result) => result.transcript)
                  .join('');
                
                setInput(transcript);

                if (event.results[0].isFinal) {
                    console.log('Final transcript:', transcript);
                    handleSubmit(transcript);
                }
            };
        }
    }, [speechRecognitionSetup, toast, handleSubmit]);
    
    const playAudio = useCallback((text: string) => {
        if (speechSynthRef.current && !isBotSpeaking) {
            const plainText = stripMarkdown(text);
            const utterance = new SpeechSynthesisUtterance(plainText);
            
            // Configure utterance for male voice
            utterance.rate = 1.0;
            utterance.pitch = 0.9; // Lower pitch for male voice
            utterance.volume = 1.0;
            utterance.lang = 'en-US';

            // Select male voice
            const maleVoice = selectMaleVoice(availableVoices);
            if (maleVoice) {
                utterance.voice = maleVoice;
            }

            utterance.onstart = () => setIsBotSpeaking(true);
            utterance.onend = () => setIsBotSpeaking(false);
            utterance.onerror = () => setIsBotSpeaking(false);

            speechSynthRef.current.speak(utterance);
        }
    }, [isBotSpeaking, availableVoices, stripMarkdown, selectMaleVoice]);

    const toggleVoiceMode = useCallback(() => {
        if (isVoiceMode) {
            // Exiting voice mode
            setIsVoiceMode(false);
            if (isRecording && recognitionRef.current) {
                recognitionRef.current.stop();
            }
            if (speechSynthRef.current) {
                speechSynthRef.current.cancel();
                setIsBotSpeaking(false);
            }
        } else {
            // Entering voice mode
            setIsVoiceMode(true);
        }
    }, [isVoiceMode, isRecording]);

    const handleAttachmentClick = useCallback(() => fileInputRef.current?.click(), []);
    
    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const dataUri = e.target?.result as string;
            if (dataUri) {
                setStagedFile({ name: file.name, dataUri });
                setMessages(prev => [...prev, { id: Date.now(), role: 'bot', content: `Loaded "${file.name}". What would you like to know about it?` }]);
            }
        };
        reader.readAsDataURL(file);
        if(fileInputRef.current) fileInputRef.current.value = "";
    }, []);

    const handleTypingComplete = useCallback((messageId: number) => {
        setMessages(prev => prev.map(msg => 
            msg.id === messageId ? { ...msg, isTyping: false, isLocked: false } : msg
        ));
        setIsAnyMessageTyping(false);
        
        // Check if this message should be spoken
        const message = messages.find(m => m.id === messageId);
        if (message?.shouldSpeak && isVoiceMode) {
            // Start TTS immediately after typing completes
            setTimeout(() => {
                handleTts(message.content, messageId);
            }, 200);
        }
    }, [messages, isVoiceMode, handleTts]);

    // Memoize the SuggestionCard component to prevent recreation
    const SuggestionCard = useCallback(({ icon: Icon, title, description, onClick }: { icon: React.ElementType, title: string, description: string, onClick: () => void }) => (
      <button
        onClick={onClick}
        className="text-left p-3 rounded-xl border bg-muted/40 hover:bg-muted/80 hover:border-primary/50 transition-all duration-200 ease-out w-full space-y-1"
        disabled={isAnyMessageTyping}
      >
        <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-primary flex-shrink-0" />
            <p className="font-semibold text-foreground text-sm">{title}</p>
        </div>
        <p className="text-xs text-muted-foreground pl-6">{description}</p>
      </button>
    ), [isAnyMessageTyping]);

    // Enhanced VoiceUIPanel component with bigger MicLottie and frequency animation
    const VoiceUIPanel = useCallback(({ view }: { view: 'minimized' | 'maximized' }) => {
        const isMinimized = view === 'minimized';
        const spiralSize = isRecording ? (isMinimized ? 320 : 280) : (isMinimized ? 300 : 240);
        const frequencyClassName = isMinimized ? "h-48 w-96" : "h-36 w-72";
        const micSize = isRecording ? (isMinimized ? 130 : 110) : (isMinimized ? 120 : 96);
    
        return (
            <div className={cn(
                "flex flex-col items-center justify-center h-full text-center relative gap-6",
                !isMinimized && "pt-12",
                view === 'maximized' && "border-r"
            )}>
                {isLoading ? (
                    <>
                        <SpiralAnimation size={spiralSize} />
                        <p className="text-sm text-muted-foreground animate-pulse">Alex is thinking...</p>
                    </>
                ) : isBotSpeaking ? (
                    <div className="flex flex-col items-center gap-10">
                        <SpiralAnimation size={spiralSize} />
                        <FrequencyAnimation className={frequencyClassName} />
                        <p className="text-sm text-muted-foreground">Alex is speaking...</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-4">
                        {/* Mic at center with slight upward movement when active */}
                        <div className={cn(
                            "transition-all duration-300 flex flex-col items-center",
                            isRecording ? "translate-y-[-10px]" : "translate-y-0"
                        )}>
                            <button
                                onClick={handleMicClick}
                                className={cn(
                                    "rounded-full p-6 transition-all duration-200 hover:scale-105",
                                    "focus:outline-none focus:ring-4 focus:ring-primary/30",
                                    isRecording ? "bg-transparent" : "bg-transparent hover:bg-muted/20"
                                )}
                                disabled={isAnyMessageTyping}
                            >
                                <MicLottie isListening={isRecording} size={micSize} />
                            </button>
    
                            {/* Frequency directly below mic */}
                            {isRecording && (
                                <div className="mt-4">
                                    <FrequencyAnimation className={frequencyClassName} />
                                </div>
                            )}
                        </div>
    
                        <p className="text-sm text-muted-foreground">
                            {isAnyMessageTyping ? "Alex is typing..." : isRecording ? "Listening..." : "Tap mic to speak"}
                        </p>
                    </div>
                )}
            </div>
        );
    }, [isLoading, isBotSpeaking, isRecording, handleMicClick, isAnyMessageTyping]);
    

    // Memoize the ChatHistoryView component
    const ChatHistoryView = useCallback(() => (
        <ScrollArea className="h-full" ref={scrollAreaRef}>
            <div className="p-4">
                <ThanosSnapEffect ref={snapRef}>
                    <div className="space-y-6">
                        {messages.map(msg => (
                            <div key={msg.id} className={cn("flex items-start gap-3", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                                {msg.role === 'bot' && (
                                    <Avatar className="w-8 h-8 flex-shrink-0 border-2 border-primary/50">
                                        <AvatarFallback className="bg-primary/20 text-primary">A</AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={cn(
                                    "max-w-[80%] rounded-2xl px-4 py-3 text-sm break-words flex items-center gap-2", 
                                    msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-bl-none'
                                )}>
                                    {msg.role === 'bot' && msg.isTyping ? (
                                        <TypewriterText 
                                            text={msg.content} 
                                            speed={0.25}
                                            onComplete={handleTypingComplete}
                                            messageId={msg.id}
                                            isVoiceMode={isVoiceMode}
                                        />
                                    ) : (
                                        <MarkdownRenderer content={msg.content} />
                                    )}
                                    {msg.role === 'bot' && !msg.isTyping && (
                                        <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={() => playAudio(msg.content)} disabled={isBotSpeaking}>
                                            <Volume2 size={14} />
                                        </Button>
                                    )}
                                </div>
                                {msg.role === 'user' && (
                                    <Avatar className="w-8 h-8 flex-shrink-0">
                                        <AvatarImage src={userData.headshotUrl} alt="User"/>
                                        <AvatarFallback><User size={16}/></AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                        {isLoading && !isVoiceMode && (
                            <div className="flex items-start gap-3">
                                <Avatar className="w-8 h-8 flex-shrink-0 border-2 border-primary/50"><AvatarFallback className="bg-primary/20 text-primary">A</AvatarFallback></Avatar>
                                <div className="bg-muted rounded-2xl rounded-bl-none px-4 py-3 flex items-center">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                </div>
                            </div>
                        )}
                        {messages.length <= 1 && !isVoiceMode && isExpanded && (
                            <div className="pt-4 space-y-3">
                                <div className="flex items-center justify-between px-1">
                                    <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                                        <Sparkles className="h-4 w-4 text-primary" />
                                        AI Suggestions
                                    </h4>
                                    <Button variant="ghost" size="sm" onClick={() => setShowSuggestions(!showSuggestions)} className="text-xs text-muted-foreground h-auto p-1 rounded-sm">
                                        {showSuggestions ? 'Hide' : 'Show'}
                                        <ChevronUp className={cn("h-4 w-4 ml-1 transition-transform", !showSuggestions && "rotate-180")} />
                                    </Button>
                                </div>
                                <AnimatePresence>
                                    {showSuggestions && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pb-2">
                                                {suggestionPrompts.slice(0, 6).map((prompt, i) => (
                                                    <SuggestionCard
                                                        key={i}
                                                        icon={prompt.icon}
                                                        title={prompt.title}
                                                        description={prompt.description}
                                                        onClick={() => handleSubmit(prompt.title)}
                                                    />
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </ThanosSnapEffect>
            </div>
        </ScrollArea>
    ), [messages, isLoading, isVoiceMode, isExpanded, showSuggestions, handleTypingComplete, playAudio, isBotSpeaking, SuggestionCard, handleSubmit]);

    // Memoize the ChatBody component
    const ChatBody = useCallback(() => {
        if (isVoiceMode) {
            if (isExpanded) {
                return (
                    <div className="flex h-full">
                        <div className="w-2/5 flex-shrink-0">
                            <VoiceUIPanel view='maximized' />
                        </div>
                        <div className="w-3/5 flex-grow overflow-hidden relative">
                            <ChatHistoryView />
                        </div>
                    </div>
                );
            } else {
                return <VoiceUIPanel view='minimized' />;
            }
        } else {
            return <ChatHistoryView />;
        }
    }, [isVoiceMode, isExpanded, VoiceUIPanel, ChatHistoryView]);

    // Memoize the form submission handler to prevent recreation
    const handleFormSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isAnyMessageTyping) {
            handleSubmit(input);
        }
    }, [handleSubmit, input, isAnyMessageTyping]);

    // Memoize the input change handler
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        if (!isAnyMessageTyping) {
            setInput(e.target.value);
        }
    }, [isAnyMessageTyping]);

    // Memoize the key down handler
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (input.trim() && !isAnyMessageTyping) {
                handleSubmit(input);
            }
        }
    }, [handleSubmit, input, isAnyMessageTyping]);

    // Memoize the expand toggle handler
    const handleExpandToggle = useCallback(() => {
        setIsExpanded(!isExpanded);
    }, [isExpanded]);

    // Memoize the close handler
    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    // Memoize the staged file removal handler
    const handleStagedFileRemove = useCallback(() => {
        setStagedFile(null);
    }, []);

    const ChatUI = useMemo(() => (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={cn(
                "fixed z-[59] flex flex-col bg-background/80 backdrop-blur-xl border rounded-2xl shadow-2xl transition-all duration-300 ease-in-out",
                isExpanded 
                ? "inset-5" 
                : "bottom-24 right-5 w-[calc(100vw-2.5rem)] max-w-[520px] h-[85vh] max-h-[800px]"
            )}
        >
            <header className="flex items-center justify-between p-4 border-b bg-transparent">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Avatar className="w-10 h-10 border-2 border-primary">
                            <AvatarFallback className="bg-primary/10 text-primary font-bold">A</AvatarFallback>
                        </Avatar>
                        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-card" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Alex</h3>
                        <p className="text-xs text-muted-foreground">AI Assistant</p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleClearChat} disabled={isAnyMessageTyping}><Trash2 size={16} /></Button>
                    <Button variant={isVoiceMode ? "secondary" : "ghost"} size="icon" className="h-8 w-8" onClick={toggleVoiceMode} disabled={isLoading || isAnyMessageTyping}><Headphones size={16} /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleExpandToggle}>{isExpanded ? <Shrink size={16} /> : <Expand size={16} />}</Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleClose}><X size={16} /></Button>
                </div>
            </header>
            
            <div className="flex-1 overflow-hidden">
                <ChatBody />
            </div>

            <footer className="p-3 border-t bg-background/95">
                {!isVoiceMode ? (
                    <form onSubmit={handleFormSubmit} className="flex items-end gap-2">
                        <div className="relative flex-grow">
                            <Textarea
                                value={input}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                placeholder={isAnyMessageTyping ? "Alex is typing..." : "Ask Alex anything..."}
                                rows={1}
                                className="w-full resize-none rounded-2xl border-input bg-muted p-3 pr-24 text-sm shadow-sm transition-all duration-200 focus-visible:ring-1 focus-visible:ring-primary max-h-32"
                                disabled={isAnyMessageTyping}
                            />
                            <div className="absolute right-2 bottom-2 flex items-center gap-1">
                                <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={handleAttachmentClick} disabled={isLoading || isAnyMessageTyping}><Paperclip className="h-4 w-4" /></Button>
                                <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={handleMicClick} disabled={isLoading || isAnyMessageTyping}>
                                    <MicLottie isListening={isRecording} size={16} />
                                </Button>
                            </div>
                        </div>
                        <Button type="submit" size="icon" className="h-10 w-10 shrink-0 rounded-full" disabled={isLoading || !input.trim() || isAnyMessageTyping}><Send className="h-5 w-5" /></Button>
                    </form>
                ) : (
                    <div className="flex items-center justify-center h-[92px] text-center text-xs text-muted-foreground">
                        {isAnyMessageTyping ? "Alex is typing..." : "Voice mode is active."}
                    </div>
                )}
                 {stagedFile && !isVoiceMode && (
                    <div className="mt-2 text-xs text-muted-foreground p-2 bg-muted rounded-md flex justify-between items-center">
                        <span>Attached: {stagedFile.name}</span>
                        <Button variant="ghost" size="icon" className="h-5 w-5" onClick={handleStagedFileRemove} disabled={isAnyMessageTyping}><X size={14} /></Button>
                    </div>
                )}
            </footer>
            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept=".pdf,.txt,.md,.docx"/>
        </motion.div>
    ), [isExpanded, handleClearChat, isVoiceMode, toggleVoiceMode, isLoading, handleExpandToggle, handleClose, ChatBody, handleFormSubmit, input, handleInputChange, handleKeyDown, handleAttachmentClick, handleMicClick, isRecording, stagedFile, handleStagedFileRemove, handleFileChange, isAnyMessageTyping]);

    return (
        <AnimatePresence>
            {isOpen && ChatUI}
        </AnimatePresence>
    );
}
