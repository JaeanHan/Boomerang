// src/components/CommuityBoard/ForumPost/ForumPost.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Flex } from '@chakra-ui/react';

import LoadingSpinner from '../CommunityBoard/LoadingSpinner';
import { CommentSection } from './CommentSection';
import { PostContent } from './PostContent';
import { PostHeader } from './PostHeader';
import { PostStats } from './PostStats';
import { ReportButton } from './ReportButton';
import { CommentData, PostData } from './types';
import { getPostById } from './utils/api';

const ForumPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [commentCount, setCommentCount] = useState<number>(0);

  const handleCommentAdded = (comment: CommentData) => {
    setPost((prev) =>
      prev ? { ...prev, commentsList: [...prev.commentsList, comment] } : prev
    );
    setCommentCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      try {
        if (postId) {
          const data = await getPostById(postId);
          setPost(data);
          setCommentCount(data.comments);
        } else {
          setError('유효하지 않은 게시글 ID입니다.');
        }
      } catch {
        setError('게시글을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [postId]);

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
        <PostHeader />
        <PostContent
          title={post.title}
          location={post.location}
          date={post.createdAt}
          content={post.content}
        />
        <PostStats
          likes={post.likes}
          comments={commentCount}
          postId={postId!}
        />
        <ReportButton />
        <CommentSection postId={postId!} onCommentAdded={handleCommentAdded} />
      </Flex>
    </Box>
  );
};

export default ForumPost;
