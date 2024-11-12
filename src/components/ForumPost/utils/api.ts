import {
  fetchPostById,
  getLikedStatus,
  likePost,
  unlikePost,
} from '../../../apis/Forumpost';
import { PostData } from '../types';

export const getPostById = async (postId: string): Promise<PostData> => {
  return await fetchPostById(postId);
};

export const getLikedStatusAsync = async (
  postId: string,
  authToken: string
): Promise<boolean> => {
  return await getLikedStatus(postId, authToken);
};

export const likePostAsync = async (
  postId: string,
  authToken: string
): Promise<void> => {
  return await likePost(postId, authToken);
};

export const unlikePostAsync = async (
  postId: string,
  authToken: string
): Promise<void> => {
  return await unlikePost(postId, authToken);
};
