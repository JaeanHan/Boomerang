export type MentorType = {
  id: number;
  nickname: string;
  profile_image: string;
  mentor_type: 'LAWYER' | 'PREVIOUS_DAMAGE_RESOLVER';
  career: string;
  introduce: string;
  advertisement_status: boolean;
  contact: string;
};

export const MentorTypeConvertor = {
  LAWYER: '변호사',
  PREVIOUS_DAMAGE_RESOLVER: '경험자',
} as const;

export type MentorsPagination = {
  total_page: number;
  current_page: number;
  content: MentorType[];
};

export type LandingMentorsResponse = {
  recommendedMentors: MentorType[];
  expertMentors: MentorType[];
  normalMentors: MentorType[];
  mentors: MentorsPagination;
};

export type ConsultationRequest = {
  mentor_id: number;
  consultation_date_time: string; // ISO 8601 형식의 날짜 문자열
  title: string;
  content: string;
};

export type ConsultationResponse = {
  consultation_id: number;
  mentor_id: number;
  mentor_nick_name: string;
  mentee_id: number;
  mentee_nick_name: string;
  consultation_date: string; // "YYYY-MM-DD" 형식의 날짜 문자열
  consultation_time: number;
  consultation_status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
};

export type ConsultationScheduleResponse = {
  list: {
    [date: string]: number[];
  };
};

export interface IConsultation {
  id: number;
  mentor_nick_name: string;
  mentee_nick_name: string;
  consultation_date_time: string;
  consultation_status: 'RECEIVED' | 'PENDING' | 'ONGOING' | 'FINISHED';
  title: string;
  content: string;
}

export type InfiniteIConsultationResponse = {
  total_page: number;
  current_page: number;
  content: IConsultation[];
};
