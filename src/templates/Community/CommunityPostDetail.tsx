import ForumPost from '@components/ForumPost/ForumPost';

import { Container } from '@chakra-ui/react';

export const CommunityPostDetail = () => {
  return (
    <Container bg={'#EDEDED'} maxW={1024} p={0} borderBottomRadius={20}>
      <ForumPost />
    </Container>
  );
};
