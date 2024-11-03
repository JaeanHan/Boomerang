import React from 'react';

import { Box, Flex } from '@chakra-ui/react';

import LoadingSpinner from '../CommunityBoard/LoadingSpinner';
import { CommentSection } from './CommentSection';
import { PostContent } from './PostContent';
import { PostHeader } from './PostHeader';
import { PostStats } from './PostStats';
import { ReportButton } from './ReportButton';
import usePostDetail from './hooks/usePostDetail';

const ForumPost: React.FC = () => {
  const { post, loading, error } = usePostDetail();

  if (loading) return <LoadingSpinner />;
  if (error) return <Box>{error}</Box>;
  if (!post) return <Box>게시글이 존재하지 않습니다.</Box>;

  return (
    <Box bg="white">
      <Flex
        direction="column"
        align="center"
        pt={16}
        bg="#EDEDED"
        borderRadius="3xl"
        shadow="md"
        maxW="screen-lg"
        mx="auto"
      >
        <PostHeader boardType={post.board_type} />
        <PostContent
          title={post.title}
          location={post.location}
          date={post.createdAt}
          content={post.content}
        />
        <PostStats likes={post.likes} comments={post.comments} />
        <ReportButton />
        <CommentSection comments={post.commentsList} />
      </Flex>
    </Box>
  );
};

export default ForumPost;
