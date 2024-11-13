import React, { useEffect } from 'react';

import {
  Box,
  Button,
  Divider,
  Input,
  Text,
  VStack,
  chakra,
  useToast,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { fetchComments, postComment } from '../../apis/Forumpost';
import { Comment } from './Comment';
import { CommentData } from './types';

interface CommentSectionProps {
  postId: string;
  initialComment: CommentData[];
}

interface ApiError {
  code: number;
  message: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  initialComment,
}) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const comments = initialComment;
  //
  // const { data: comments, error } = useQuery<
  //   CommentData[],
  //   AxiosError<ApiError>
  // >({
  //   queryKey: ['comments', postId],
  //   queryFn: () => fetchComments(postId),
  //   retry: false,
  // });

  // useEffect(() => {
  //   if (error) {
  //     toast({
  //       title: '댓글을 불러오는데 실패했습니다.',
  //       status: 'error',
  //       duration: 2000,
  //       isClosable: true,
  //     });
  //   }
  // }, [error, toast]);

  // const mutation = useMutation<CommentData, AxiosError<ApiError>, string>({
  //   mutationFn: (text: string) => postComment(postId, text),
  //   onSuccess: (newComment: CommentData) => {
  //     queryClient.invalidateQueries({ queryKey: ['comments', postId] });
  //     onCommentAdded(newComment);
  //     toast({
  //       title: '댓글이 성공적으로 작성되었습니다.',
  //       status: 'success',
  //       duration: 2000,
  //       isClosable: true,
  //     });
  //   },
  //   onError: (error: AxiosError<ApiError>) => {
  //     toast({
  //       title: '댓글 작성에 실패했습니다.',
  //       description: error.response?.data?.message || '',
  //       status: error.response?.status === 401 ? 'error' : 'warning',
  //       duration: 2000,
  //       isClosable: true,
  //     });
  //   },
  // });

  const handleCommentSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem('comment') as HTMLInputElement;
    const commentText = input.value.trim();

    if (!commentText) {
      toast({
        title: '댓글을 입력해주세요.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    // mutation.mutate(commentText);
    input.value = '';
  };

  return (
    <Box w="full" px={{ base: 5, md: 20 }} mt={7}>
      <VStack align="stretch" spacing={4} mt={9} bg="#EDEDED" p={5}>
        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map((comment: CommentData) => (
            <Comment
              key={comment.id}
              comment={comment}
              onCommentUpdatedOrDeleted={() =>
                queryClient.invalidateQueries({
                  queryKey: ['comments', postId],
                })
              }
            />
          ))
        ) : (
          <Text>등록된 댓글이 없습니다.</Text>
        )}
      </VStack>
    </Box>
  );
};
