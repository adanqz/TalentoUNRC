
'use server';

/**
 * @fileOverview Flows for CRUD operations on students.
 * This is a demonstration of how Genkit can be used to manage data.
 * - createStudent
 * - readStudent
 * - updateStudent
 * - deleteStudent
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Schemas for Student
const StudentSchema = z.object({
  id: z.string().describe('The ID of the student.'),
  name: z.string().describe('The name of the student.'),
  email: z.string().email().describe('The email of the student.'),
  skills: z.array(z.string()).describe('A list of the student\'s skills.'),
});

// Create
const CreateStudentInputSchema = StudentSchema.omit({ id: true });
const CreateStudentOutputSchema = StudentSchema;
export type CreateStudentInput = z.infer<typeof CreateStudentInputSchema>;

export async function createStudent(input: CreateStudentInput): Promise<z.infer<typeof CreateStudentOutputSchema>> {
  return createStudentFlow(input);
}

const createStudentFlow = ai.defineFlow(
  {
    name: 'createStudentFlow',
    inputSchema: CreateStudentInputSchema,
    outputSchema: CreateStudentOutputSchema,
  },
  async (input) => {
    console.log(`Creating student: ${input.name}`);
    // In a real app, you would save this to a database.
    const newId = `student-${Math.floor(Math.random() * 1000)}`;
    return { id: newId, ...input };
  }
);


// Read
const ReadStudentInputSchema = z.object({
  id: z.string().describe('The ID of the student to read.'),
});
const ReadStudentOutputSchema = StudentSchema.optional();
export type ReadStudentInput = z.infer<typeof ReadStudentInputSchema>;

export async function readStudent(input: ReadStudentInput): Promise<z.infer<typeof ReadStudentOutputSchema>> {
    return readStudentFlow(input);
}

const readStudentFlow = ai.defineFlow(
    {
        name: 'readStudentFlow',
        inputSchema: ReadStudentInputSchema,
        outputSchema: ReadStudentOutputSchema,
    },
    async (input) => {
        console.log(`Reading student: ${input.id}`);
        // In a real app, you would fetch this from a database.
        if (input.id === 'student-123') {
            return {
                id: 'student-123',
                name: 'Ana Torres',
                email: 'ana.t@example.com',
                skills: ['React', 'Node.js', 'TypeScript']
            };
        }
        return undefined;
    }
);


// Update
const UpdateStudentInputSchema = StudentSchema;
const UpdateStudentOutputSchema = StudentSchema;
export type UpdateStudentInput = z.infer<typeof UpdateStudentInputSchema>;

export async function updateStudent(input: UpdateStudentInput): Promise<z.infer<typeof UpdateStudentOutputSchema>> {
    return updateStudentFlow(input);
}

const updateStudentFlow = ai.defineFlow(
    {
        name: 'updateStudentFlow',
        inputSchema: UpdateStudentInputSchema,
        outputSchema: UpdateStudentOutputSchema,
    },
    async (input) => {
        console.log(`Updating student: ${input.id}`);
        // In a real app, you would update this in a database.
        return input;
    }
);


// Delete
const DeleteStudentInputSchema = z.object({
  id: z.string().describe('The ID of the student to delete.'),
});
const DeleteStudentOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export async function deleteStudent(input: z.infer<typeof DeleteStudentInputSchema>): Promise<z.infer<typeof DeleteStudentOutputSchema>> {
    return deleteStudentFlow(input);
}

const deleteStudentFlow = ai.defineFlow(
    {
        name: 'deleteStudentFlow',
        inputSchema: DeleteStudentInputSchema,
        outputSchema: DeleteStudentOutputSchema,
    },
    async (input) => {
        console.log(`Deleting student: ${input.id}`);
        // In a real app, you would delete this from a database.
        return {
            success: true,
            message: `Student ${input.id} has been deleted.`,
        };
    }
);
