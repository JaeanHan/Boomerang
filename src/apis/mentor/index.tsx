import apiInstance from '@/apis';

import { ScheduleListResponse, ScheduleRegisterRequest } from './types';
import { ConsultationListResponse } from './types';

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

export const getConsultations = async (
  page: number,
  size: number,
  consultationStatus: string
): Promise<ConsultationListResponse> => {
  const response = await apiInstance.get<ConsultationListResponse>(
    '/api/v1/member/consultation',
    {
      params: {
        page,
        size,
        consultation_status: consultationStatus,
      },
    }
  );
  return response.data;
};

export const confirmConsultation = async (id: number): Promise<void> => {
  await apiInstance.put(`/api/v1/consultation/${id}`);
};

export const rejectConsultation = async (id: number): Promise<void> => {
  await apiInstance.delete(`/api/v1/consultation/${id}`);
};
