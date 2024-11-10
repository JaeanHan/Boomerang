import React, { useEffect, useState } from 'react';

import apiInstance from '@/apis';
import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

import { Comment } from './Comment';
import { CommentData } from './types';

interface CommentSectionProps {
  postId: string;
  onCommentAdded: (comment: CommentData) => void;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  onCommentAdded,
}) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<CommentData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const response = await apiInstance.get(
          `/api/v1/board/${postId}/comments`
        );
        const commentsData: CommentData[] = response.data.content || [];
        setComments(commentsData);
      } catch (error) {
        console.error('댓글 불러오기 에러:', error);
        toast({
          title: '댓글을 불러오는데 실패했습니다.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [postId, toast]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentText.trim()) {
      toast({
        title: '댓글을 입력해주세요.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const authToken = localStorage.getItem('Authorization') || '';

    try {
      const response = await apiInstance.post<CommentData>(
        `/api/v1/board/${postId}/comments`,
        { text: commentText },
        {
          headers: {
            Authorization: authToken,
          },
        }
      );

      const newComment: CommentData = response.data;
      setComments((prevComments) => [...prevComments, newComment]);
      onCommentAdded(newComment);
      setCommentText('');

      toast({
        title: '댓글이 성공적으로 작성되었습니다.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        typeof error.response.data.message === 'string'
      ) {
        toast({
          title: '댓글 작성에 실패했습니다.',
          description: error.response.data.message,
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: '댓글 작성에 실패했습니다.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };

  const handleCommentUpdateOrDelete = () => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const response = await apiInstance.get(
          `/api/v1/board/${postId}/comments`
        );
        const commentsData: CommentData[] = response.data.content || [];
        setComments(commentsData);
      } catch (error) {
        console.error('댓글 불러오기 에러:', error);
        toast({
          title: '댓글을 불러오는데 실패했습니다.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  };

  return (
    <Box w="full" px={{ base: 5, md: 20 }} mt={7}>
      <Divider borderColor="blue.600" borderStyle="dashed" borderWidth="3px" />
      <Flex mt={8} ml={{ base: 2.5, md: 9 }} align="center" gap={2}>
        <Text fontSize="2xl" fontWeight="extrabold" color="blue.600">
          댓글 달기
        </Text>
      </Flex>
      <Flex
        as="form"
        direction={{ base: 'column', md: 'row' }}
        bg="gray.50"
        border="2px solid"
        borderColor="blue.300"
        borderRadius="2xl"
        p={5}
        mt={2}
        mx={{ base: 0, md: 4 }}
        onSubmit={handleCommentSubmit}
      >
        <Input
          placeholder="댓글을 입력해주세요."
          fontSize="l"
          border="none"
          color="blue.400"
          flex="1"
          mb={{ base: 10, md: 0 }}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button
          type="submit"
          bg="blue.600"
          color="white"
          ml={{ md: 4 }}
          mt={{ base: 4, md: 0 }}
        >
          댓글 달기
        </Button>
      </Flex>
      <VStack align="stretch" spacing={4} mt={9} bg="#EDEDED" p={5}>
        {isLoading ? (
          <Text>댓글을 불러오는 중입니다...</Text>
        ) : (
          comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onCommentUpdatedOrDeleted={handleCommentUpdateOrDelete}
            />
          ))
        )}
      </VStack>
    </Box>
  );
};
