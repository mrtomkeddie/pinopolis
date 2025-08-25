'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting activities to users based on their age and booking history.
 *
 * @module suggest-activities
 * @exports suggestActivities - An async function that takes user age and booking history and returns suggested activities.
 * @exports SuggestActivitiesInput - The input type for the suggestActivities function.
 * @exports SuggestActivitiesOutput - The output type for the suggestActivities function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema
const SuggestActivitiesInputSchema = z.object({
  userAge: z.number().describe('The age of the user.'),
  bookingHistory: z.string().describe('The user booking history as a string.'),
});
export type SuggestActivitiesInput = z.infer<typeof SuggestActivitiesInputSchema>;

// Define the output schema
const SuggestActivitiesOutputSchema = z.object({
  suggestedActivities: z.string().describe('A list of suggested activities based on user age and booking history.'),
});
export type SuggestActivitiesOutput = z.infer<typeof SuggestActivitiesOutputSchema>;

// Define the Genkit flow
export async function suggestActivities(input: SuggestActivitiesInput): Promise<SuggestActivitiesOutput> {
  return suggestActivitiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestActivitiesPrompt',
  input: {schema: SuggestActivitiesInputSchema},
  output: {schema: SuggestActivitiesOutputSchema},
  prompt: `You are an AI assistant designed to suggest activities at a family entertainment center.

  Based on the user's age and booking history, suggest other activities that they might enjoy.

  User Age: {{{userAge}}}
  Booking History: {{{bookingHistory}}}

  Suggest activities that are appropriate for their age and that complement their previous bookings.
  Return a simple list of suggested activities.
`,
});

const suggestActivitiesFlow = ai.defineFlow(
  {
    name: 'suggestActivitiesFlow',
    inputSchema: SuggestActivitiesInputSchema,
    outputSchema: SuggestActivitiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
