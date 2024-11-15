export interface ScheduleListResponse {
  list: {
    [date: string]: number[];
  };
}

export interface ScheduleRegisterRequest {
  list: {
    [date: string]: number[];
  };
}

export interface ConsultationContent {
  id: number;
  mentor_nick_name: string;
  mentee_nick_name: string;
  consultation_date_time: string;
  consultation_status: 'RECEIVED' | 'FINISHED' | string;
  title: string;
  content: string;
}

export interface ConsultationListResponse {
  total_page: number;
  current_page: number;
  content: ConsultationContent[];
}
