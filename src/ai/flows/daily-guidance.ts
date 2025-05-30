// Use server directive is required for Genkit Flows.
'use server';

/**
 * @fileOverview Generates daily Biblical guidance and reflections based on a verse and user input.
 *
 * - generateDailyGuidance - A function that generates daily guidance.
 * - DailyGuidanceInput - The input type for the generateDailyGuidance function.
 * - DailyGuidanceOutput - The return type for the generateDailyGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DailyGuidanceInputSchema = z.object({
  dailyVerse: z.string().describe('The daily Bible verse.'),
  userInput: z.string().describe('User input or questions related to the verse.'),
});
export type DailyGuidanceInput = z.infer<typeof DailyGuidanceInputSchema>;

const DailyGuidanceOutputSchema = z.object({
  guidance: z.string().describe('AI-crafted daily guidance and reflections.'),
});
export type DailyGuidanceOutput = z.infer<typeof DailyGuidanceOutputSchema>;

export async function generateDailyGuidance(input: DailyGuidanceInput): Promise<DailyGuidanceOutput> {
  return dailyGuidanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dailyGuidancePrompt',
  input: {schema: DailyGuidanceInputSchema},
  output: {schema: DailyGuidanceOutputSchema},
  prompt: `You are a spiritual guide providing daily guidance and reflections based on a Bible verse and user input.

  Verse: {{{dailyVerse}}}
  User Input: {{{userInput}}}

  Provide insightful and practical guidance related to the verse, addressing the user's input and offering reflections for daily life.`,
});

const dailyGuidanceFlow = ai.defineFlow(
  {
    name: 'dailyGuidanceFlow',
    inputSchema: DailyGuidanceInputSchema,
    outputSchema: DailyGuidanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
