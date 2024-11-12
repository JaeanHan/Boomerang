// src/components/CommuityBoard/ForumPost/types.ts

export interface CommentData {
  id: number;
  writer_email: string;
  writer_name: string;
  text: string;
  last_modified_at: string;
  edited: boolean;
}

export interface CommentListResponseDto {
  total_page: number;
  current_page: number;
  content: CommentData[];
}

export interface PostData {
  postId: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  writerName: string;
  createdAt: string;
  commentsList: CommentData[];
  location: string;
}

export interface PostStatsProps {
  likes: number;
  comments: number;
  postId: string;
}
