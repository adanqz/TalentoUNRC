
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
    .describe('Un arreglo de habilidades que posee el estudiante.'),
  studentInterests: z
    .array(z.string())
    .describe('Un arreglo de intereses del estudiante.'),
  availableOpportunities: z
    .array(z.string())
    .describe('Un arreglo de descripciones de oportunidades disponibles.'),
});
export type SuggestRelevantOpportunitiesInput = z.infer<
  typeof SuggestRelevantOpportunitiesInputSchema
>;

const SuggestRelevantOpportunitiesOutputSchema = z.object({
  relevantOpportunities: z
    .array(z.string())
    .describe(
      'Un arreglo de descripciones de oportunidades que coinciden con las habilidades e intereses del estudiante.'
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
  prompt: `Eres un asistente de IA diseñado para sugerir oportunidades relevantes a estudiantes según sus habilidades e intereses.

  Dadas las habilidades de un estudiante: {{{studentSkills}}} e intereses: {{{studentInterests}}}, 
  analiza las siguientes oportunidades disponibles y determina cuáles son las más relevantes para el estudiante.
  Devuelve solo las oportunidades que son una fuerte coincidencia para el perfil del estudiante.

  Oportunidades Disponibles:
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
