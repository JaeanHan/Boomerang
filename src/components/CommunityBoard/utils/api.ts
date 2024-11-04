import axios from 'axios';

import { HotTopicData, PostData } from '../types';

const baseUrl = 'http://3.34.197.198:8080';

export const fetchPosts = async (page: number) => {
  const response = await axios.get(`${baseUrl}/api/v1/board`, {
    params: {
      page: page - 1,
      size: 4,
      sort_direction: 'DESC',
      sort_by: 'id',
      board_type: 'ENTIRE',
      content_length: 20,
    },
  });

  return {
    posts: response.data.content.map((item: any) => ({
      postId: item.id,
      title: item.title,
      content: item.content,
      likes: item.like_count,
      comments: item.comment_count,
    })),
    totalPages: response.data.total_page,
  };
};

export const fetchHotTopics = async (): Promise<HotTopicData[]> => {
  const response = await axios.get(`${baseUrl}/api/v1/board/best`, {
    params: {
      size: 3,
      board_type: 'ENTIRE',
      content_length: 10,
    },
  });

  return response.data.content.map((item: any) => ({
    postId: item.id,
    title: item.title,
  }));
};

export const fetchPostById = async (postId: string): Promise<PostData> => {
  const response = await axios.get(`${baseUrl}/api/v1/board/${postId}`);
  const data = response.data;

  return {
    postId: data.id,
    title: data.title,
    content: data.content,
    likes: data.like_count,
    comments: data.comment_count,
    writerName: data.writer_name,
    createdAt: data.created_at,
    commentsList: data.comment_list_response_dto.comment_response_dto_list,
  };
};
