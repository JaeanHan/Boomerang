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
