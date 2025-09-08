'use server';

/**
 * @fileOverview A party package recommendation AI agent.
 *
 * - recommendPartyPackages - A function that handles the party package recommendation process.
 * - RecommendPartyPackagesInput - The input type for the recommendPartyPackages function.
 * - RecommendPartyPackagesOutput - The return type for the recommendPartyPackages function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendPartyPackagesInputSchema = z.object({
  numberOfGuests: z
    .number()
    .describe('The number of guests attending the party.'),
  desiredDuration: z
    .number()
    .describe('The desired duration of the party in hours.'),
});
export type RecommendPartyPackagesInput = z.infer<
  typeof RecommendPartyPackagesInputSchema
>;

const RecommendPartyPackagesOutputSchema = z.object({
  recommendedPackages: z.array(
    z.object({
      packageName: z.string().describe('The name of the party package.'),
      description: z.string().describe('A description of the party package.'),
      duration: z.number().describe('The duration of the party package in hours.'),
      capacity: z.number().describe('The maximum number of guests allowed.'),
      suitable: z
        .boolean()
        .describe(
          'Whether the package is suitable for the given number of guests and duration.'
        ),
      addons: z.array(
        z.object({
          addonName: z.string().describe('The name of the addon.'),
          addonDescription: z.string().describe('A description of the addon.'),
          addonPrice: z.number().describe('The price of the addon.'),
        })
      ).optional().describe('Available addons for the party package')
    })
  ),
});
export type RecommendPartyPackagesOutput = z.infer<
  typeof RecommendPartyPackagesOutputSchema
>;

export async function recommendPartyPackages(
  input: RecommendPartyPackagesInput
): Promise<RecommendPartyPackagesOutput> {
  return recommendPartyPackagesFlow(input);
}

const getPartyPackages = ai.defineTool({
  name: 'getPartyPackages',
  description: 'Retrieves available party packages with their details.',
  inputSchema: z.object({
    numberOfGuests: z.number().describe('The number of guests attending the party.'),
    desiredDuration: z.number().describe('The desired duration of the party in hours.'),
  }),
  outputSchema: z.array(
    z.object({
      packageName: z.string().describe('The name of the party package.'),
      description: z.string().describe('A description of the party package.'),
      duration: z.number().describe('The duration of the party package in hours.'),
      capacity: z.number().describe('The maximum number of guests allowed.'),
      addons: z.array(
        z.object({
          addonName: z.string().describe('The name of the addon.'),
          addonDescription: z.string().describe('A description of the addon.'),
          addonPrice: z.number().describe('The price of the addon.'),
        })
      ).optional().describe('Available addons for the party package')
    })
  ),
},
async (input) => {
  const partyPackages = [
    {
      packageName: 'Genesis',
      description: 'The Genesis package offers a foundational party experience.',
      duration: 2,
      capacity: 10,
      addons: [
        {
          addonName: 'Pizza',
          addonDescription: 'Add pizza to your party.',
          addonPrice: 20,
        },
        {
          addonName: 'Cake',
          addonDescription: 'Add a cake to your party.',
          addonPrice: 30,
        },
      ]
    },
    {
      packageName: 'Matrix Experience',
      description: 'The Matrix Experience package offers a comprehensive party experience.',
      duration: 3,
      capacity: 15,
      addons: [
        {
          addonName: 'Pizza',
          addonDescription: 'Add pizza to your party.',
          addonPrice: 20,
        },
        {
          addonName: 'Cake',
          addonDescription: 'Add a cake to your party.',
          addonPrice: 30,
        },
        {
          addonName: 'Drinks',
          addonDescription: 'Add drinks to your party.',
          addonPrice: 15,
        },
      ]
    },
    {
      packageName: 'Corporate Neural Link',
      description:
        'The Corporate Neural Link package offers a premium party experience.',
      duration: 4,
      capacity: 20,
      addons: [
        {
          addonName: 'Pizza',
          addonDescription: 'Add pizza to your party.',
          addonPrice: 20,
        },
        {
          addonName: 'Cake',
          addonDescription: 'Add a cake to your party.',
          addonPrice: 30,
        },
        {
          addonName: 'Drinks',
          addonDescription: 'Add drinks to your party.',
          addonPrice: 15,
        },
        {
          addonName: 'Photographer',
          addonDescription: 'Add a photographer to your party.',
          addonPrice: 100,
        },
      ]
    },
  ];

  return partyPackages;
});

const prompt = ai.definePrompt({
  name: 'recommendPartyPackagesPrompt',
  tools: [getPartyPackages],
  input: {schema: RecommendPartyPackagesInputSchema},
  output: {schema: RecommendPartyPackagesOutputSchema},
  prompt: `Based on the number of guests ({{{numberOfGuests}}}) and the desired duration ({{{desiredDuration}}} hours), recommend the most suitable party packages, filtering by capacity and duration. Also display the available addons for each package.

Use the getPartyPackages tool to retrieve the party packages.
`,
});

const recommendPartyPackagesFlow = ai.defineFlow(
  {
    name: 'recommendPartyPackagesFlow',
    inputSchema: RecommendPartyPackagesInputSchema,
    outputSchema: RecommendPartyPackagesOutputSchema,
  },
  async input => {
    const partyPackages = await getPartyPackages(input);

    const packages = partyPackages.map(packageDetails => ({
        ...packageDetails,
        suitable: packageDetails.capacity >= input.numberOfGuests && packageDetails.duration <= input.desiredDuration,
      }));

    const {output} = await prompt(input);

    return {
      recommendedPackages: packages,
    };
  }
);
