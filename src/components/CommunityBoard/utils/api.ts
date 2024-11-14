import { SortType } from '@components/CommunityBoard/constants';

import apiInstance from '@/apis';

import { CommentData, HotTopicData, PostData } from '../types';

type PostItem = {
  id: number;
  title: string;
  content: string;
  writer_email: string;
  writer_name: string;
  like_count: number;
  comment_count: number;
};

type FetchPostResponse = {
  total_page: number;
  current_page: number;
  content: PostItem[];
};

type Comment = {
  id: number;
  content: string;
  writer_name: string;
  created_at: string;
};

type PostDataResponse = {
  comment_list_response_dto: {
    total_page: number;
    current_page: number;
    content: Comment[];
  };
  created_at: string;
  liked: boolean;
} & PostItem;

export const fetchPosts = async (
  page: number,
  boardType: string,
  searchWord?: string,
  sortType: SortType = 'ID'
): Promise<{ posts: PostData[]; totalPages: number }> => {
  const params: Record<string, string | number> = {
    page: page - 1,
    size: 4,
    sort_direction: 'DESC',
    board_sort_type: sortType,
    board_type: boardType,
    content_length: 20,
  };

  if (searchWord && searchWord.trim() !== '') {
    params.search_word = searchWord.trim();
  }

  const response = await apiInstance.get<FetchPostResponse>('/api/v1/board', {
    params,
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

export const fetchHotTopics = async (
  boardType: string,
  size = 3,
  contentLength = 10
): Promise<HotTopicData[]> => {
  const response = await apiInstance.get<FetchPostResponse>(
    '/api/v1/board/best',
    {
      params: {
        size: size,
        board_type: boardType,
        content_length: contentLength,
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
    commentsList: data.comment_list_response_dto.content.map((commentDto) =>
      toComment(commentDto)
    ),
  };
};

const toComment = (commentDto: Comment): CommentData => {
  return {
    id: commentDto.id,
    writer_email: 'default@example.com',
    writer_name: commentDto.writer_name,
    text: commentDto.content,
    last_modified_at: commentDto.created_at,
    edited: false,
  };
};
