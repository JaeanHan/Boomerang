import { LandingMentorsResponse } from '@apis/mentor/types';

import apiInstance from '@/apis';

export const getMentorsList = async () => {
  const response = await apiInstance.get('api/v1/mentor');

  return response.data;
};

export const getLandingMentors = async (
  recommendSize = 8,
  expertSize = 4,
  normalSize = 4,
  paginationSize = 10
): Promise<LandingMentorsResponse> => {
  const response = await apiInstance.get<LandingMentorsResponse>(
    `/api/v1/mentor/initial?recommended_size=${recommendSize}&recommended_expert_size=${expertSize}&recommended_normal_size=${normalSize}&size=${paginationSize}`
  );

  return response.data;
};
