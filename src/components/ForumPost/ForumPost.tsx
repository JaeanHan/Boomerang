import { AsyncBoundary } from '@components/AsyncBoundary';
import { CommentSection } from '@components/ForumPost/CommentSection';
import { CommentData } from '@components/ForumPost/types';

import React, { Suspense, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Spinner,
  Text,
  chakra,
} from '@chakra-ui/react';

import { PostContent } from './PostContent';
import { PostHeader } from './PostHeader';

const ForumPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [comments, setComments] = useState<CommentData[]>([]);
  const navigate = useNavigate();
  if (!postId) {
    navigate('/404');
    return null;
  }

  return (
    <Flex
      direction="column"
      align="center"
      pt={'30px'}
      bg="#EDEDED"
      borderTopRadius={0}
      shadow="md"
      maxW="screen-lg"
      mx="auto"
    >
      <PostHeader />
      <AsyncBoundary
        // ref={boundaryRef}
        pendingFallback={<BlankPage />}
        // rejectedFallback={
        //   <button onClick={() => boundaryRef.current?.reset()}>재시도</button>
        // }
      >
        <PostContent postId={postId} setComments={setComments} />
      </AsyncBoundary>
      <CommentWritingSection />
      <Suspense fallback={<Spinner />}>
        <CommentSection postId={postId} initialComment={comments} />
      </Suspense>
    </Flex>
  );
};

const CommentWritingSection = () => (
  <Box w="full" px={{ base: 5, md: 20 }}>
    <Divider
      mt={8}
      borderColor="blue.600"
      borderStyle="dashed"
      borderWidth="3px"
    />
    <Box mt={8} ml={{ base: 2.5, md: 9 }} alignItems="center" gap={2}>
      <Text fontSize="2xl" fontWeight="extrabold" color="blue.600">
        댓글 달기
      </Text>
    </Box>
    <chakra.form
      // onSubmit={handleCommentSubmit}
      display="flex"
      flexDirection={{ base: 'column', md: 'row' }}
      bg="gray.50"
      border="2px solid"
      borderColor="blue.300"
      borderRadius="2xl"
      p={5}
      mt={2}
      mx={{ base: 0, md: 4 }}
    >
      <Input
        name="comment"
        placeholder="댓글을 입력해주세요."
        fontSize="l"
        border="none"
        color="blue.400"
        flex="1"
        mb={{ base: 10, md: 0 }}
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
    </chakra.form>
  </Box>
);

const BlankPage = () => (
  <Box
    bg="white"
    borderRadius="2xl"
    p={{ base: 5, md: 10 }}
    mt={7}
    w={{ base: 'full', md: '867px' }}
  />
);

export default ForumPost;
