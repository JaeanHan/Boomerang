import apiInstance from '@/apis';

import { PostData } from '../types';

export const fetchPostById = async (postId: string): Promise<PostData> => {
  const response = await apiInstance.get(`/api/v1/board/${postId}`);
  const data = response.data;

  const actualCommentCount = Array.isArray(
    data.comment_list_response_dto.content
  )
    ? data.comment_list_response_dto.content.length
    : 0;

  return {
    postId: data.id.toString(),
    title: data.title,
    content: data.content,
    likes: data.like_count,
    comments: actualCommentCount,
    writerName: data.writer_name,
    createdAt: data.created_at,
    commentsList: data.comment_list_response_dto.content || [],
    location: data.location,
  };
};
