// src/ai/flows/suggest-relevant-opportunities.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow to suggest relevant opportunities to students based on their skills and interests.
 *
 * - suggestRelevantOpportunities - A function that suggests relevant opportunities based on student skills and interests.
 * - SuggestRelevantOpportunitiesInput - The input type for the suggestRelevantOpportunities function.
 * - SuggestRelevantOpportunitiesOutput - The return type for the suggestRelevantOpportunities function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRelevantOpportunitiesInputSchema = z.object({
  studentSkills: z
    .array(z.string())
    .describe('An array of skills possessed by the student.'),
  studentInterests: z
    .array(z.string())
    .describe('An array of interests of the student.'),
  availableOpportunities: z
    .array(z.string())
    .describe('An array of descriptions of available opportunities.'),
});
export type SuggestRelevantOpportunitiesInput = z.infer<
  typeof SuggestRelevantOpportunitiesInputSchema
>;

const SuggestRelevantOpportunitiesOutputSchema = z.object({
  relevantOpportunities: z
    .array(z.string())
    .describe(
      'An array of descriptions of opportunities that match the student skills and interests.'
    ),
});
export type SuggestRelevantOpportunitiesOutput = z.infer<
  typeof SuggestRelevantOpportunitiesOutputSchema
>;

export async function suggestRelevantOpportunities(
  input: SuggestRelevantOpportunitiesInput
): Promise<SuggestRelevantOpportunitiesOutput> {
  return suggestRelevantOpportunitiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRelevantOpportunitiesPrompt',
  input: {schema: SuggestRelevantOpportunitiesInputSchema},
  output: {schema: SuggestRelevantOpportunitiesOutputSchema},
  prompt: `You are an AI assistant designed to suggest relevant opportunities to students based on their skills and interests.

  Given a student's skills: {{{studentSkills}}} and interests: {{{studentInterests}}}, 
  analyze the following available opportunities and determine which ones are most relevant to the student.
  Return only the opportunities that are a strong match for the student's profile.

  Available Opportunities:
  {{#each availableOpportunities}}
  - {{{this}}}
  {{/each}}
  `,
});

const suggestRelevantOpportunitiesFlow = ai.defineFlow(
  {
    name: 'suggestRelevantOpportunitiesFlow',
    inputSchema: SuggestRelevantOpportunitiesInputSchema,
    outputSchema: SuggestRelevantOpportunitiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
