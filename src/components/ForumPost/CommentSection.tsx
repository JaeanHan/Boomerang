import React, { useEffect, useState } from 'react';

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
  const toast = useToast();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://3.34.197.198:8080/api/v1/board/${postId}/comments`
        );

        const commentsData: CommentData[] = response.data.content || [];
        setComments(commentsData);
      } catch (error: unknown) {
        console.error('댓글 불러오기 에러:', error);
        toast({
          title: '댓글을 불러오는데 실패했습니다.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
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
      const response = await axios.post<CommentData>(
        `http://3.34.197.198:8080/api/v1/board/${postId}/comments`,
        { text: commentText },
        {
          headers: {
            Authorization: authToken,
          },
          validateStatus: function () {
            return true;
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
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
      } else {
        toast({
          title: '댓글 작성에 실패했습니다.',
          description: response.data.message || '서버 오류가 발생했습니다.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error: unknown) {
      console.error('댓글 작성 에러:', error);
      toast({
        title: '댓글 작성에 실패했습니다.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleCommentUpdateOrDelete = (
    updatedComment?: CommentData,
    deleted?: boolean
  ) => {
    if (deleted && updatedComment) {
      setComments((prevComments) =>
        prevComments.filter((c) => c.id !== updatedComment.id)
      );
    } else if (updatedComment) {
      setComments((prevComments) =>
        prevComments.map((c) =>
          c.id === updatedComment.id ? updatedComment : c
        )
      );
    }
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
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onCommentUpdatedOrDeleted={handleCommentUpdateOrDelete}
          />
        ))}
      </VStack>
    </Box>
  );
};
