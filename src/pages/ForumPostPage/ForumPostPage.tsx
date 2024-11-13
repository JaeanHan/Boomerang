import ForumPost from '@components/ForumPost/ForumPost';

import React from 'react';

import { Container } from '@chakra-ui/react';

export const ForumPostPage: React.FC = () => {
  return (
    <Container bg={'#EDEDED'} maxW={1024} p={0} borderBottomRadius={20}>
      <ForumPost />
    </Container>
  );
};
