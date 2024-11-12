import apiInstance from '@/apis';

import { CommentData, PostData } from '../../components/ForumPost/types';

export const updateComment = async (
  commentId: number,
  editedText: string
): Promise<CommentData> => {
  const response = await apiInstance.put<CommentData>(
    `/api/v1/board/comments/${commentId}`,
    { text: editedText }
  );
  return response.data;
};

export const deleteComment = async (commentId: number): Promise<void> => {
  await apiInstance.delete(`/api/v1/board/comments/${commentId}`);
};

export const postComment = async (
  postId: string,
  text: string
): Promise<CommentData> => {
  const authToken = localStorage.getItem('Authorization') || '';
  const response = await apiInstance.post<CommentData>(
    `/api/v1/board/${postId}/comments`,
    { text },
    {
      headers: {
        Authorization: authToken,
      },
    }
  );
  return response.data;
};

export const fetchComments = async (postId: string): Promise<CommentData[]> => {
  const response = await apiInstance.get<{ content: CommentData[] }>(
    `/api/v1/board/${postId}/comments`
  );
  return response.data.content || [];
};

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

export const getLikedStatus = async (
  postId: string,
  authToken: string
): Promise<boolean> => {
  const response = await apiInstance.get<{ liked: boolean }>(
    `/api/v1/board/${postId}/likes`,
    {
      headers: {
        Authorization: authToken,
      },
    }
  );
  return response.data.liked;
};

export const likePost = async (
  postId: string,
  authToken: string
): Promise<void> => {
  await apiInstance.post(
    `/api/v1/board/${postId}/likes`,
    {},
    {
      headers: {
        Authorization: authToken,
      },
    }
  );
};

export const unlikePost = async (
  postId: string,
  authToken: string
): Promise<void> => {
  await apiInstance.delete(`/api/v1/board/${postId}/likes`, {
    headers: {
      Authorization: authToken,
    },
  });
};
