import apiInstance from '@/apis';

import { PostData } from '../types';

export const fetchPostById = async (postId: string): Promise<PostData> => {
  const response = await apiInstance.get(`/api/v1/board/${postId}`);
  const data = response.data;

  return {
    postId: data.id,
    title: data.title,
    content: data.content,
    likes: data.like_count,
    comments: data.comment_count,
    writerName: data.writer_name,
    createdAt: data.created_at,
    commentsList:
      data.comment_list_response_dto?.comment_response_dto_list || [],
    location: data.location,
  };
};
