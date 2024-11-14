export type CommunityBoard = {
  type: string;
  value: string;
};

export const communityBoardTypes: CommunityBoard[] = [
  { type: '자유게시판', value: 'ENTIRE' },
  { type: '지역게시판', value: 'LOCATION' },
  { type: '비밀게시판', value: 'SECRETE' },
  { type: '단계별게시판', value: 'STEP' },
];

export type SortType = 'ID' | 'LIKE' | 'COMMENT';
