import apiInstance from '@/apis';

import { CommentData, PostData } from '../../components/ForumPost/types';

// 댓글 수정 API 함수
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

// 댓글 삭제 API 함수
export const deleteComment = async (commentId: number): Promise<void> => {
  await apiInstance.delete(`/api/v1/board/comments/${commentId}`);
};

// 댓글 작성 API 함수
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

// 댓글 조회 API 함수
export const fetchComments = async (postId: string): Promise<CommentData[]> => {
  const response = await apiInstance.get<{ content: CommentData[] }>(
    `/api/v1/board/${postId}/comments`
  );
  return response.data.content || [];
};

// 게시글 조회 API 함수
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

// 좋아요 상태 조회 API 함수
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

// 좋아요 추가 API 함수
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

// 좋아요 삭제 API 함수
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
