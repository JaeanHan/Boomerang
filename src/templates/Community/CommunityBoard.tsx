import MainContent from '@components/CommunityBoard/MainContent';

import { Container } from '@chakra-ui/react';
import communityBoardBg from '@images/communityBoardBg.svg';

export const CommunityBoard = () => {
  return (
    <Container
      bg={'#EDEDED'}
      maxW={1024}
      p={0}
      borderBottomRadius={20}
      bgImage={communityBoardBg}
      bgSize={'cover'}
      bgRepeat={'no-repeat'}
      bgPosition={'0 -30px'}
    >
      <MainContent />
    </Container>
  );
};
