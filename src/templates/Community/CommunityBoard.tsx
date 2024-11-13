import MainContent from '@components/CommunityBoard/MainContent';

import React from 'react';

import { Container } from '@chakra-ui/react';

export const CommunityBoard = () => {
  return (
    <Container bg={'#EDEDED'} maxW={1024} p={0} borderBottomRadius={20}>
      <MainContent />
    </Container>
  );
};
