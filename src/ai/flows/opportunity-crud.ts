
'use server';

/**
 * @fileOverview Flows for CRUD operations on opportunities.
 * This is a demonstration of how Genkit can be used to manage data.
 * - createOpportunity
 * - readOpportunity
 * - updateOpportunity
 * - deleteOpportunity
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Schemas for Opportunity
const OpportunitySchema = z.object({
  id: z.string().describe('The ID of the opportunity.'),
  title: z.string().describe('The title of the opportunity.'),
  description: z.string().describe('A description of the opportunity.'),
  businessName: z.string().describe('The name of the business offering the opportunity.'),
});

// Create
const CreateOpportunityInputSchema = OpportunitySchema.omit({ id: true });
const CreateOpportunityOutputSchema = OpportunitySchema;
export type CreateOpportunityInput = z.infer<typeof CreateOpportunityInputSchema>;

export async function createOpportunity(input: CreateOpportunityInput): Promise<z.infer<typeof CreateOpportunityOutputSchema>> {
  return createOpportunityFlow(input);
}

const createOpportunityFlow = ai.defineFlow(
  {
    name: 'createOpportunityFlow',
    inputSchema: CreateOpportunityInputSchema,
    outputSchema: CreateOpportunityOutputSchema,
  },
  async (input) => {
    console.log(`Creating opportunity: ${input.title}`);
    // In a real app, you would save this to a database.
    const newId = `opp-${Math.floor(Math.random() * 1000)}`;
    return { id: newId, ...input };
  }
);


// Read
const ReadOpportunityInputSchema = z.object({
  id: z.string().describe('The ID of the opportunity to read.'),
});
const ReadOpportunityOutputSchema = OpportunitySchema.optional();
export type ReadOpportunityInput = z.infer<typeof ReadOpportunityInputSchema>;

export async function readOpportunity(input: ReadOpportunityInput): Promise<z.infer<typeof ReadOpportunityOutputSchema>> {
    return readOpportunityFlow(input);
}

const readOpportunityFlow = ai.defineFlow(
    {
        name: 'readOpportunityFlow',
        inputSchema: ReadOpportunityInputSchema,
        outputSchema: ReadOpportunityOutputSchema,
    },
    async (input) => {
        console.log(`Reading opportunity: ${input.id}`);
        // In a real app, you would fetch this from a database.
        if (input.id === 'opp-123') {
            return {
                id: 'opp-123',
                title: 'Software Engineer Intern',
                description: 'Work on our amazing new product.',
                businessName: 'Tech Innovators Inc.'
            };
        }
        return undefined;
    }
);


// Update
const UpdateOpportunityInputSchema = OpportunitySchema;
const UpdateOpportunityOutputSchema = OpportunitySchema;
export type UpdateOpportunityInput = z.infer<typeof UpdateOpportunityInputSchema>;

export async function updateOpportunity(input: UpdateOpportunityInput): Promise<z.infer<typeof UpdateOpportunityOutputSchema>> {
    return updateOpportunityFlow(input);
}

const updateOpportunityFlow = ai.defineFlow(
    {
        name: 'updateOpportunityFlow',
        inputSchema: UpdateOpportunityInputSchema,
        outputSchema: UpdateOpportunityOutputSchema,
    },
    async (input) => {
        console.log(`Updating opportunity: ${input.id}`);
        // In a real app, you would update this in a database.
        return input;
    }
);


// Delete
const DeleteOpportunityInputSchema = z.object({
  id: z.string().describe('The ID of the opportunity to delete.'),
});
const DeleteOpportunityOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export async function deleteOpportunity(input: z.infer<typeof DeleteOpportunityInputSchema>): Promise<z.infer<typeof DeleteOpportunityOutputSchema>> {
    return deleteOpportunityFlow(input);
}

const deleteOpportunityFlow = ai.defineFlow(
    {
        name: 'deleteOpportunityFlow',
        inputSchema: DeleteOpportunityInputSchema,
        outputSchema: DeleteOpportunityOutputSchema,
    },
    async (input) => {
        console.log(`Deleting opportunity: ${input.id}`);
        // In a real app, you would delete this from a database.
        return {
            success: true,
            message: `Opportunity ${input.id} has been deleted.`,
        };
    }
);
