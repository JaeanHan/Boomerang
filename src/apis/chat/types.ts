import { ConsultStatus } from '@apis/mentee';

export type ConsultationResponseDto = {
  id: number;
  mentor_nick_name: string;
  mentee_nick_name: string;
  consultation_date_time: string;
  consultation_status: ConsultStatus;
  title: string;
  content: string;
};

export type ChatMessage = {
  nickname: string;
  message: string;
  createdAt: string;
};

export type ChatMessageResponseDtoPage = {
  total_page: number;
  current_page: number;
  content: ChatMessage[];
};

export type ChatResponse = {
  mentorProfileImage: string;
  menteeProfileImage: string;
  consultationResponseDto: ConsultationResponseDto;
  chatMessageResponseDtoPage: ChatMessageResponseDtoPage;
  mentor: boolean;
};
