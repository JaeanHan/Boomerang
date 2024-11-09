import React, { useState } from 'react';

import apiInstance from '@/apis';
import { Box, Button, Flex, Input, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';

import { CommentData } from './types';

interface CommentProps {
  comment: CommentData;
  onCommentUpdatedOrDeleted: () => void;
}

export const Comment: React.FC<CommentProps> = ({
  comment,
  onCommentUpdatedOrDeleted,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const toast = useToast();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditConfirm = async () => {
    try {
      const response = await apiInstance.put<CommentData>(
        `/api/v1/board/comments/${comment.id}`,
        { text: editedText }
      );
      const updatedComment = response.data;
      onCommentUpdatedOrDeleted();
      setIsEditing(false);
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 401
      ) {
        toast({
          title: '로그인이 필요합니다.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: '댓글 수정에 실패했습니다.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };

  const handleDelete = async () => {
    try {
      await apiInstance.delete(`/api/v1/board/comments/${comment.id}`);
      onCommentUpdatedOrDeleted();
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 401
      ) {
        toast({
          title: '로그인이 필요합니다.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: '댓글 삭제에 실패했습니다.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  return (
    <Box bg="white" p={5} borderRadius="md" shadow="sm">
      {isEditing ? (
        <>
          <Input
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            mb={2}
          />
          <Button size="sm" onClick={handleEditConfirm} mr={2}>
            확인
          </Button>
          <Button size="sm" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </>
      ) : (
        <>
          <Text fontSize="xl" color="gray.700">
            {comment.text}
          </Text>
          <Text fontSize="sm" color="gray.500" mt={2}>
            {comment.writer_name} {formatDate(comment.last_modified_at)}
          </Text>
          <Flex mt={2} gap={2}>
            <Button size="sm" onClick={handleEdit}>
              수정
            </Button>
            <Button size="sm" onClick={handleDelete}>
              삭제
            </Button>
          </Flex>
        </>
      )}
    </Box>
  );
};
