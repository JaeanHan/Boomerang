import { fetchHotTopics } from '@components/CommunityBoard/utils/api';

import React from 'react';

import { Box, Flex } from '@chakra-ui/react';
import { useSuspenseQuery } from '@tanstack/react-query';

import HotTopic from './HotTopic';

interface HotCommunityProps {
  boardType: string;
}

export const HotCommunity: React.FC<HotCommunityProps> = ({ boardType }) => {
  const { data: hotTopics } = useSuspenseQuery({
    queryFn: () => fetchHotTopics(boardType),
    queryKey: [`hot topic ${boardType}`],
  });

  return (
    <Box width={'100%'}>
      <Flex
        flexDirection="column"
        pl={2}
        mt={7}
        fontSize="xl"
        fontWeight="bold"
        color="#363636"
      >
        {hotTopics.map((topic, index) => (
          <HotTopic key={topic.postId} title={topic.title} id={topic.postId} />
        ))}
      </Flex>
    </Box>
  );
};
