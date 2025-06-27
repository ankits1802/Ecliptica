'use server';
/**
 * @fileOverview A Genkit flow for parsing and querying documents.
 *
 * - queryDocument - A function that analyzes a document based on a user's query.
 * - QueryDocumentInput - The input type for the queryDocument function.
 * - QueryDocumentOutput - The return type for the queryDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QueryDocumentInputSchema = z.object({
  documentDataUri: z
    .string()
    .describe(
      "A document file (like PDF, TXT, DOCX) as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  query: z.string().describe('The user\'s query about the document (e.g., "Summarize this").'),
});
export type QueryDocumentInput = z.infer<typeof QueryDocumentInputSchema>;

const QueryDocumentOutputSchema = z.object({
  response: z.string().describe('The answer to the user\'s query about the document.'),
});
export type QueryDocumentOutput = z.infer<typeof QueryDocumentOutputSchema>;

export async function queryDocument(input: QueryDocumentInput): Promise<QueryDocumentOutput> {
  return queryDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'queryDocumentPrompt',
  input: {schema: QueryDocumentInputSchema},
  output: {schema: QueryDocumentOutputSchema},
  system: `You are an AI assistant that analyzes documents provided by a user.
Answer the user's query based *only* on the content of the provided document.
If the query cannot be answered from the document, state that the information is not present.
Format your responses using Markdown when appropriate.
`,
  prompt: `DOCUMENT:
{{media url=documentDataUri}}

USER QUERY:
{{{query}}}
  `,
});

const queryDocumentFlow = ai.defineFlow(
  {
    name: 'queryDocumentFlow',
    inputSchema: QueryDocumentInputSchema,
    outputSchema: QueryDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output || { response: "I'm sorry, I couldn't process the document." };
  }
);
