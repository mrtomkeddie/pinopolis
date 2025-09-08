'use server';

import {
  recommendPartyPackages,
  type RecommendPartyPackagesOutput,
} from '@/ai/flows/recommend-party-packages';

type FormState = {
  data: RecommendPartyPackagesOutput | null;
  error: string | null;
};

export async function getRecommendations(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const numberOfGuests = Number(formData.get('numberOfGuests'));
    const desiredDuration = Number(formData.get('desiredDuration'));

    if (isNaN(numberOfGuests) || numberOfGuests <= 0) {
      return { data: null, error: 'Please enter a valid number of guests.' };
    }
    if (isNaN(desiredDuration) || desiredDuration <= 0) {
      return { data: null, error: 'Please enter a valid duration.' };
    }

    const recommendations = await recommendPartyPackages({
      numberOfGuests,
      desiredDuration,
    });
    return { data: recommendations, error: null };
  } catch (e) {
    return {
      data: null,
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}
