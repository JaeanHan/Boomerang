import apiInstance from '@/apis';

import { HotTopicData, PostData } from '../types';

type PostItem = {
  id: number;
  title: string;
  content: string;
  writer_email: string;
  writer_name: string; // 작성자의 이름
  like_count: number; // 좋아요 수
  comment_count: number; // 댓글 수
};

type FetchPostResponse = {
  total_page: number;
  current_page: number;
  content: PostItem[];
};

type Comment = {
  id: number; // 댓글 ID
  content: string; // 댓글 내용
  writer_name: string; // 댓글 작성자의 이름
  created_at: string; // 댓글 생성 날짜 및 시간
};

type PostDataResponse = {
  comment_list_response_dto: {
    total_page: number; // 댓글의 총 페이지 수
    current_page: number; // 현재 페이지 번호
    content: Comment[]; // 댓글 내용 배열
  };
  created_at: string; // 게시물 생성 날짜 및 시간
  liked: boolean; // 좋아요 여부
} & PostItem;

export const fetchPosts = async (page: number) => {
  const response = await apiInstance.get<FetchPostResponse>('/api/v1/board', {
    params: {
      page: page - 1,
      size: 4,
      sort_direction: 'DESC',
      sort_by: 'id',
      board_type: 'ENTIRE',
      content_length: 20,
    },
  });

  const data = response.data;
  return {
    posts: data.content.map((item: PostItem) => ({
      postId: item.id,
      title: item.title,
      content: item.content,
      likes: item.like_count,
      comments: item.comment_count,
    })),
    totalPages: data.total_page,
  };
};

export const fetchHotTopics = async (): Promise<HotTopicData[]> => {
  const response = await apiInstance.get<FetchPostResponse>(
    '/api/v1/board/best',
    {
      params: {
        size: 3,
        board_type: 'ENTIRE',
        content_length: 10,
      },
    }
  );

  return response.data.content.map((item: PostItem) => ({
    postId: item.id,
    title: item.title,
  }));
};

export const fetchPostById = async (postId: string): Promise<PostData> => {
  const response = await apiInstance.get<PostDataResponse>(
    `/api/v1/board/${postId}`
  );
  const data = response.data;

  return {
    postId: data.id,
    title: data.title,
    content: data.content,
    likes: data.like_count,
    comments: data.comment_count,
    writerName: data.writer_name,
    createdAt: data.created_at,
    commentsList: data.comment_list_response_dto,
  };
};
