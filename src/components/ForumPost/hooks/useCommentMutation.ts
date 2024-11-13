import { ServerError } from '@apis/errors';
import { postComment } from '@apis/forumpost';

import { CommentData } from '@components/ForumPost/types';

import { useToast } from '@chakra-ui/icons';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useCommentMutation = (
  postId: string,
  appendNewComment: (newComment: CommentData) => void
) => {
  const toast = useToast();
  return useMutation<CommentData, AxiosError<ServerError>, string>({
    mutationFn: (text: string) => postComment(postId, text),
    onSuccess: (newComment: CommentData) => {
      appendNewComment(newComment);
      toast({
        title: '댓글이 성공적으로 작성되었습니다.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    },
    onError: (error: AxiosError<ServerError>) => {
      toast({
        title: '댓글 작성에 실패했습니다.',
        description: error.response?.data?.message || '',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    },
  });
};
