import { ServerError } from '@apis/errors';
import {
  ConsultationRequest,
  ConsultationResponse,
  ConsultationScheduleResponse,
  InfiniteIConsultationResponse,
  LandingMentorsResponse,
} from '@apis/mentee/types';

import apiInstance from '@/apis';
import { useMutation, useSuspenseInfiniteQuery } from '@tanstack/react-query';
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

export type ConsultStatus = 'RECEIVED' | 'PENDING' | 'ONGOING' | 'FINISHED';

const getInfiniteConsultRecords = async (
  pageParam: number,
  status: ConsultStatus,
  size: number = 10
): Promise<InfiniteIConsultationResponse> => {
  const response = await apiInstance.get('/api/v1/member/consultation', {
    params: {
      page: pageParam,
      size: size,
      consultation_status: status,
    },
  });

  return response.data;
};

export const useInfiniteConsultRecords = (
  status: ConsultStatus,
  size: number
) => {
  return useSuspenseInfiniteQuery({
    queryKey: [`${status}`],
    queryFn: async ({ pageParam }) =>
      getInfiniteConsultRecords(pageParam as number, status, size),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.current_page < lastPage.total_page - 1) {
        return lastPage.current_page + 1;
      }
      return undefined;
    },
    getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
      if (firstPageParam === 1) {
        console.log(`avoid lint error ${firstPage} ${allPages}`);
        return undefined;
      }
      return firstPageParam - 1;
    },
  });
};