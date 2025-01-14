import { fetchPostById } from '@apis/forumpost';

import { PostStats } from '@components/ForumPost/PostStats';
import { ReportButton } from '@components/ForumPost/ReportButton';
import { CommentData } from '@components/ForumPost/types';

import React, { Fragment, useEffect } from 'react';

import { BoomerangColors } from '@/utils/colors';
import { Box, Text } from '@chakra-ui/react';
import { useSuspenseQuery } from '@tanstack/react-query';

const formatDate = (dateStr: string): string => {
  const replaced = dateStr.replace(/-/g, '/');
  return replaced.replace(/:\d{2}$/, '');
};

export const PostContent: React.FC<{
  postId: string;
  setComments: (
    value: ((prevState: CommentData[]) => CommentData[]) | CommentData[]
  ) => void;
}> = ({ postId, setComments }) => {
  const { data } = useSuspenseQuery({
    queryFn: () => fetchPostById(postId),
    queryKey: [`post:${postId}`],
  });
  const { title, content, location, comments, commentsList, likes, createdAt } =
    data;

  useEffect(() => {
    setComments(commentsList);
  }, []);

  return (
    <Fragment>
      <Box
        bg="white"
        borderRadius="2xl"
        p={'50px 80px'}
        mt={7}
        w={{ base: 'full', md: '867px' }}
      >
        <Text fontSize="3xl" fontWeight="extrabold" color="gray.700">
          {title}
        </Text>
        <Text fontSize="lg" color="gray.400" mt={2}>
          {location}{' '}
          <Text as="span" color={BoomerangColors.blue}>
            {formatDate(createdAt)}
          </Text>
        </Text>
        <div
          style={{
            marginTop: '50px',
          }}
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
        <PostStats postId={postId} comments={comments} likes={likes} />
      </Box>
      <ReportButton />
    </Fragment>
  );
};
