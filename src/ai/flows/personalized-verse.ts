// src/ai/flows/personalized-verse.ts
'use server';

/**
 * @fileOverview Provides personalized Bible verses tailored to the user's interests and relevant to Kenyan culture.
 *
 * - getPersonalizedVerse - A function that returns a personalized Bible verse.
 * - PersonalizedVerseInput - The input type for the getPersonalizedVerse function.
 * - PersonalizedVerseOutput - The return type for the getPersonalizedVerse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedVerseInputSchema = z.object({
  interests: z
    .string()
    .describe('The user specified interests to tailor the verse towards.'),
  isKenyanContextRelevant: z
    .boolean()
    .describe(
      'A boolean that indicates if the verse should be relevant to Kenyan culture.'
    ),
});
export type PersonalizedVerseInput = z.infer<typeof PersonalizedVerseInputSchema>;

const PersonalizedVerseOutputSchema = z.object({
  verse: z.string().describe('A Bible verse personalized to the user interests.'),
  explanation: z
    .string()
    .describe('Explanation of the verse and how it relates to the user interests.'),
});
export type PersonalizedVerseOutput = z.infer<typeof PersonalizedVerseOutputSchema>;

export async function getPersonalizedVerse(
  input: PersonalizedVerseInput
): Promise<PersonalizedVerseOutput> {
  return personalizedVerseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedVersePrompt',
  input: {schema: PersonalizedVerseInputSchema},
  output: {schema: PersonalizedVerseOutputSchema},
  prompt: `You are a spiritual guide who personalizes Bible verses based on user interests.

  Given the user's interests: {{{interests}}}, and whether the verse should be relevant to Kenyan culture: {{{isKenyanContextRelevant}}}.
  Find a Bible verse that resonates with these interests and provide a brief explanation of its relevance.
  If isKenyanContextRelevant is true, relate the verse to Kenyan culture, values, or current events.
  
  Verse:`,
});

const personalizedVerseFlow = ai.defineFlow(
  {
    name: 'personalizedVerseFlow',
    inputSchema: PersonalizedVerseInputSchema,
    outputSchema: PersonalizedVerseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
