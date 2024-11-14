import apiInstance from '@/apis';

import { ScheduleListResponse, ScheduleRegisterRequest } from './types';

export const getSchedule = async (): Promise<ScheduleListResponse> => {
  const response = await apiInstance.get<ScheduleListResponse>(
    '/api/v1/consultation/schedule'
  );
  return response.data;
};

export const registerSchedule = async (
  data: ScheduleRegisterRequest
): Promise<void> => {
  await apiInstance.post('/api/v1/consultation/schedule', data);
};

export const deleteSchedule = async (
  data: ScheduleRegisterRequest
): Promise<void> => {
  await apiInstance.delete('/api/v1/consultation/schedule', { data });
};
