import apiInstance from '@/apis';
import { ServerError } from '@/apis/errors';
import {
  FormValues,
  SendResponse,
  SwitchResponse,
  ValidationResponse,
  emailType,
  emailVaildationType,
} from '@/components/MentorSwitch/type';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import {
  ConsultationListResponse,
  ScheduleListResponse,
  ScheduleRegisterRequest,
} from './types';

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

export const getPastConsultations = async (
  page: number,
  size: number,
  consultationStatus: 'FINISHED'
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

const postMentorRole = async (data: FormValues) => {
  const response = await apiInstance.post('/api/v1/mentor', data);
  return response.data;
};

export const useSwitchMutation = () => {
  return useMutation<SwitchResponse, AxiosError<ServerError>, FormValues>({
    mutationFn: (request: FormValues) => postMentorRole(request),
  });
};

const postEmailValidation = async (data: emailVaildationType) => {
  const response = await apiInstance.post(
    'api/v1/email-verifications/validation',
    data
  );

  return response.data;
};

export const useValidationMutation = () => {
  return useMutation<
    ValidationResponse,
    AxiosError<ServerError>,
    emailVaildationType
  >({
    mutationFn: (request: emailVaildationType) => postEmailValidation(request),
  });
};

const sendVerificationEmail = async (data: emailType) => {
  const response = await apiInstance.post('/api/v1/email-verifications', data);
  return response.data;
};

export const useSendMailMutation = () => {
  return useMutation<SendResponse, AxiosError<ServerError>, emailType>({
    mutationFn: (request: emailType) => sendVerificationEmail(request),
  });
};
