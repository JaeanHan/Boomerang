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
