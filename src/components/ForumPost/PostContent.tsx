import { fetchPostById } from '@apis/Forumpost';

import { PostStats } from '@components/ForumPost/PostStats';
import { ReportButton } from '@components/ForumPost/ReportButton';
import { CommentData } from '@components/ForumPost/types';

import React, { Fragment, useEffect } from 'react';

import { Box, Text } from '@chakra-ui/react';
import { useSuspenseQuery } from '@tanstack/react-query';

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
  const { title, date, content, location, comments, commentsList, likes } =
    data;

  useEffect(() => {
    setComments(commentsList);
  }, []);

  return (
    <Fragment>
      <Box
        bg="white"
        borderRadius="2xl"
        p={{ base: 5, md: 10 }}
        mt={7}
        w={{ base: 'full', md: '867px' }}
      >
        <Text fontSize="3xl" fontWeight="extrabold" color="gray.700">
          {title}
        </Text>
        <Text fontSize="lg" color="gray.400" mt={2}>
          {location} {date}
        </Text>
        <div
          style={{
            marginTop: '50px',
          }}
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
        <PostStats comments={comments} likes={likes} />
      </Box>
      <ReportButton />
    </Fragment>
  );
};
