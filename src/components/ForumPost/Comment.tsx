import { deleteComment, updateComment } from '@apis/forumpost';

import { AutoSizingTextarea } from '@components/AutoSizingTextarea';

import React, { Fragment, useState } from 'react';

import { useUserContext } from '@/pages/Login/userContext';
import { formatDate } from '@/utils/dateUtils';
import { Box, Button, Flex, Input, Text, useToast } from '@chakra-ui/react';

import { CommentData } from './types';

interface CommentProps {
  comment: CommentData;
  removeComment: (commentId: number) => void;
}

export const Comment: React.FC<CommentProps> = ({ comment, removeComment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState<string>(() => comment.text);
  const toast = useToast();
  const { user } = useUserContext();

  const handleEditConfirm = () => {
    updateComment(comment.id, editedText)
      .then(() => setIsEditing(false))
      .catch((err) => {
        setEditedText(comment.text);
        toast({
          title: '댓글 수정에 실패했습니다.',
          description: err.response?.data?.message || '',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      });
  };

  const handleDelete = async () => {
    deleteComment(comment.id)
      .then(() => {
        removeComment(comment.id);
      })
      .catch((err) => {
        toast({
          title: '댓글 삭제에 실패했습니다.',
          description: err.response?.data?.message || '',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      });
  };

  return (
    <Box bg="white" p={5} borderRadius="md" shadow="sm">
      {isEditing ? (
        <Fragment>
          <AutoSizingTextarea setContent={setEditedText} resize={'none'} />
          <Button size="sm" onClick={handleEditConfirm} mr={2} mt={2}>
            확인
          </Button>
          <Button size="sm" onClick={() => setIsEditing(false)} mt={2}>
            취소
          </Button>
        </Fragment>
      ) : (
        <Fragment>
          <Text fontSize="xl" color="gray.700" whiteSpace={'preserve-breaks'}>
            {editedText}
          </Text>
          <Text fontSize="sm" color="gray.500" mt={2}>
            {comment.writer_name} {formatDate(comment.last_modified_at)}
          </Text>
          {comment.writer_name === user?.nickname ? (
            <Flex mt={2} gap={2}>
              <Button size="sm" onClick={() => setIsEditing(true)}>
                수정
              </Button>
              <Button size="sm" onClick={handleDelete}>
                삭제
              </Button>
            </Flex>
          ) : null}
        </Fragment>
      )}
    </Box>
  );
};
