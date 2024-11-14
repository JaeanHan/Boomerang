import { ServerError } from '@apis/errors';
import {
  ConsultationRequest,
  ConsultationResponse,
  ConsultationScheduleResponse,
  LandingMentorsResponse,
} from '@apis/mentee/types';

import apiInstance from '@/apis';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

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

const postConsultation = async (data: ConsultationRequest) => {
  const response = await apiInstance.post('/api/v1/consultation', data);

  return response.data;
};

export const useConsultationMutation = () => {
  return useMutation<
    ConsultationResponse,
    AxiosError<ServerError>,
    ConsultationRequest
  >({
    mutationFn: (request: ConsultationRequest) => postConsultation(request),
  });
};

export const getMentorSchedule = async (
  mentorId: number
): Promise<ConsultationScheduleResponse> => {
  const response = await apiInstance.get<ConsultationScheduleResponse>(
    `/api/v1/consultation/schedule/${mentorId}`
  );
  return response.data;
};
