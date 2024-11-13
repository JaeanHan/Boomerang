import React from 'react';

import { Box, Text, VStack } from '@chakra-ui/react';

import { Comment } from './Comment';
import { CommentData } from './types';

interface CommentSectionProps {
  postId: string;
  comments: CommentData[];
}

export const CommentSection: React.FC<CommentSectionProps> = ({ comments }) => {
  return (
    <Box w="full" px={{ base: 5, md: 20 }} mt={7}>
      <VStack align="stretch" spacing={4} mt={9} bg="#EDEDED" p={5}>
        {comments.length > 0 ? (
          comments.map((comment: CommentData) => (
            <Comment key={comment.id} comment={comment} />
          ))
        ) : (
          <Text>등록된 댓글이 없습니다.</Text>
        )}
      </VStack>
    </Box>
  );
};
