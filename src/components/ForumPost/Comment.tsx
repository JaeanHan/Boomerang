import React, { useState } from 'react';

import { Box, Button, Flex, Input, Text, useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';

import { deleteComment, updateComment } from '../../apis/Forumpost';
import { formatDate } from '../../utils/dateUtils';
import { CommentData } from './types';

interface CommentProps {
  comment: CommentData;
  onCommentUpdatedOrDeleted: () => void;
}

interface ApiError {
  code: number;
  message: string;
}

export const Comment: React.FC<CommentProps> = ({
  comment,
  onCommentUpdatedOrDeleted,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState<string>(comment.text);
  const toast = useToast();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditConfirm = async () => {
    try {
      await updateComment(comment.id, editedText);
      onCommentUpdatedOrDeleted();
      setIsEditing(false);
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      toast({
        title: '댓글 수정에 실패했습니다.',
        description: axiosError.response?.data?.message || '',
        status: axiosError.response?.status === 401 ? 'error' : 'warning',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteComment(comment.id);
      onCommentUpdatedOrDeleted();
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      toast({
        title: '댓글 삭제에 실패했습니다.',
        description: axiosError.response?.data?.message || '',
        status: axiosError.response?.status === 401 ? 'error' : 'warning',
        duration: 2000,
        isClosable: true,
      });
    }
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
