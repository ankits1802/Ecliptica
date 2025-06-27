// // src/app/actions/chat-actions.ts
// 'use server';

// import { portfolioChat, textToSpeech, type PortfolioChatInput, type TextToSpeechInput } from '@/ai/flows/portfolio-chat-flow';
// import { queryDocument, type QueryDocumentInput } from '@/ai/flows/document-parser-flow';
// import type { Message } from '@/components/chatbot/chat-widget';

// // Add input validation
// function validateInput(value: string, fieldName: string): void {
//     if (!value || typeof value !== 'string' || value.trim().length === 0) {
//         throw new Error(`${fieldName} is required and must be a non-empty string`);
//     }
// }

// export async function askChatbotAction(query: string, history: Message[]) {
//     try {
//         // Input validation
//         validateInput(query, 'Query');
        
//         if (!Array.isArray(history)) {
//             throw new Error('History must be an array');
//         }

//         const input: PortfolioChatInput = { 
//             query: query.trim(), 
//             history: history.map(m => ({
//                 role: m.role, 
//                 content: m.content
//             })) 
//         };
        
//         const result = await portfolioChat(input);
        
//         if (!result?.response) {
//             throw new Error('Invalid response from AI service');
//         }
        
//         return { success: true, response: result.response };
//     } catch (error) {
//         console.error("Error in askChatbotAction:", error);
//         const errorMessage = error instanceof Error ? error.message : 'Failed to get response from AI.';
//         return { success: false, error: errorMessage };
//     }
// }

// export async function synthesizeSpeechAction(text: string) {
//     try {
//         // Input validation
//         validateInput(text, 'Text');
        
//         // Check text length limit (typical TTS services have limits)
//         if (text.length > 5000) {
//             throw new Error('Text is too long for speech synthesis (max 5000 characters)');
//         }

//         const input: TextToSpeechInput = { text: text.trim() };
//         const result = await textToSpeech(input);
        
//         if (!result?.audioDataUri) {
//             throw new Error('Invalid audio response from TTS service');
//         }
        
//         return { success: true, audioDataUri: result.audioDataUri };
//     } catch (error) {
//         console.error("Error in synthesizeSpeechAction:", error);
//         const errorMessage = error instanceof Error ? error.message : 'Failed to synthesize speech.';
//         return { success: false, error: errorMessage };
//     }
// }

// export async function analyzeDocumentAction(documentDataUri: string, query: string) {
//     try {
//         // Input validation
//         validateInput(documentDataUri, 'Document data URI');
//         validateInput(query, 'Query');
        
//         // Validate data URI format
//         if (!documentDataUri.startsWith('data:')) {
//             throw new Error('Invalid document data URI format');
//         }

//         const input: QueryDocumentInput = { 
//             documentDataUri, 
//             query: query.trim() 
//         };
        
//         const result = await queryDocument(input);
        
//         if (!result?.response) {
//             throw new Error('Invalid response from document analysis service');
//         }
        
//         return { success: true, response: result.response };
//     } catch (error) {
//         console.error("Error in analyzeDocumentAction:", error);
//         const errorMessage = error instanceof Error ? error.message : 'Failed to analyze document.';
//         return { success: false, error: errorMessage };
//     }
// }

// src/app/actions/chat-actions.ts
'use server';

import { portfolioChat, textToSpeech, type PortfolioChatInput, type TextToSpeechInput } from '@/ai/flows/portfolio-chat-flow';
import { queryDocument, type QueryDocumentInput } from '@/ai/flows/document-parser-flow';
import type { Message } from '@/components/chatbot/chat-widget';

// Add input validation
function validateInput(value: string, fieldName: string): void {
    if (!value || typeof value !== 'string' || value.trim().length === 0) {
        throw new Error(`${fieldName} is required and must be a non-empty string`);
    }
}

export async function askChatbotAction(query: string, history: Message[], isVoiceMode: boolean = false) {
    try {
        // Input validation
        validateInput(query, 'Query');
        
        if (!Array.isArray(history)) {
            throw new Error('History must be an array');
        }

        const input: PortfolioChatInput = { 
            query: query.trim(), 
            history: history.map(m => ({
                role: m.role, 
                content: m.content
            })) 
        };
        
        const result = await portfolioChat(input);
        
        if (!result?.response) {
            throw new Error('Invalid response from AI service');
        }
        
        // Generate TTS immediately if in voice mode
        let audioDataUri = null;
        if (isVoiceMode) {
            try {
                const ttsInput: TextToSpeechInput = { text: result.response.trim() };
                const ttsResult = await textToSpeech(ttsInput);
                if (ttsResult?.audioDataUri) {
                    audioDataUri = ttsResult.audioDataUri;
                }
            } catch (ttsError) {
                console.error("TTS generation failed:", ttsError);
                // Continue without audio if TTS fails
            }
        }
        
        return { 
            success: true, 
            response: result.response,
            audioDataUri: audioDataUri
        };
    } catch (error) {
        console.error("Error in askChatbotAction:", error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to get response from AI.';
        return { success: false, error: errorMessage };
    }
}

export async function synthesizeSpeechAction(text: string) {
    try {
        // Input validation
        validateInput(text, 'Text');
        
        // Check text length limit (typical TTS services have limits)
        if (text.length > 5000) {
            throw new Error('Text is too long for speech synthesis (max 5000 characters)');
        }

        const input: TextToSpeechInput = { text: text.trim() };
        const result = await textToSpeech(input);
        
        if (!result?.audioDataUri) {
            throw new Error('Invalid audio response from TTS service');
        }
        
        return { success: true, audioDataUri: result.audioDataUri };
    } catch (error) {
        console.error("Error in synthesizeSpeechAction:", error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to synthesize speech.';
        return { success: false, error: errorMessage };
    }
}

export async function analyzeDocumentAction(documentDataUri: string, query: string) {
    try {
        // Input validation
        validateInput(documentDataUri, 'Document data URI');
        validateInput(query, 'Query');
        
        // Validate data URI format
        if (!documentDataUri.startsWith('data:')) {
            throw new Error('Invalid document data URI format');
        }

        const input: QueryDocumentInput = { 
            documentDataUri, 
            query: query.trim() 
        };
        
        const result = await queryDocument(input);
        
        if (!result?.response) {
            throw new Error('Invalid response from document analysis service');
        }
        
        return { success: true, response: result.response };
    } catch (error) {
        console.error("Error in analyzeDocumentAction:", error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to analyze document.';
        return { success: false, error: errorMessage };
    }
}
