import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Text } from '@chakra-ui/react';

interface HotTopicProps {
  title: string;
  id: number;
}

const HotTopic: React.FC<HotTopicProps> = ({ title, id }) => {
  const navigate = useNavigate();
  return (
    <Box px={3} py={3.5} bg="#FFDEDE" borderRadius="xl" mb={2}>
      <Text
        onClick={() => navigate(`/community/post/${id}`)}
        cursor={'pointer'}
        lineHeight={'100%'}
      >
        🔥 {title}
      </Text>
    </Box>
  );
};

export default HotTopic;
