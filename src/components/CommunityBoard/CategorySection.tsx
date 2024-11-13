import {
  CommunityBoard,
  communityBoardTypes,
} from '@components/CommunityBoard/constants';

import React from 'react';

import { BoomerangColors } from '@/utils/colors';
import { Box, Divider, Flex, Image, Text } from '@chakra-ui/react';
import freeBoardImage from '@images/free.svg';
import localBoardImage from '@images/local.svg';
import notice from '@images/noticeboard.svg';
import secretBoardImage from '@images/secret.svg';
import stepBoardImage from '@images/steps.svg';

interface CategorySectionProps {
  selectedTab: string;
  onClick: (newBoardType: CommunityBoard) => void;
}

const boardContents: {
  [key: string]: { image: string; text: string };
} = {
  자유게시판: {
    image: freeBoardImage,
    text: '자유롭게 질문하고, 서로 조언을 주고받으며\n더 나은 아이디어를 함께 만들어가요!',
  },
  지역게시판: {
    image: localBoardImage,
    text: '같은 지역 사람들과 자유롭게 질문하고,\n함께 더 나은 우리 동네를 만들어가요!',
  },
  비밀게시판: {
    image: secretBoardImage,
    text: '같은 임대인을 가진 사람들끼리 모여 이야기하고,\n서로의 경험을 나누며 함께 해결책을 찾아보세요!',
  },
  단계별게시판: {
    image: stepBoardImage,
    text: '나와 같은 상황과 단계를 겪고 있는 사람들과 소통하며,\n함께 해결책을 찾아가요!',
  },
};

const CategoryHeader = () => {
  return (
    <Flex
      gap={1.5}
      alignItems="center"
      fontSize="3xl"
      fontWeight="extrabold"
      letterSpacing="wide"
      lineHeight="none"
      color={BoomerangColors.deepBlue}
      mb={4}
    >
      <Image
        loading="lazy"
        src={notice}
        objectFit="contain"
        flexShrink={0}
        boxSize="60px"
        alt="부메랑 카테고리 아이콘"
      />
      <Text flex="1" my="auto">
        부메랑 게시판 카테고리
      </Text>
    </Flex>
  );
};

const categoryNavHeight = 45;
const categoryNavColor = '#2C79FF';

export const CategorySection: React.FC<CategorySectionProps> = ({
  selectedTab,
  onClick,
}) => {
  const selectedContent = boardContents[selectedTab];

  return (
    <Box
      as="section"
      display="flex"
      position="relative"
      flexDirection="column"
      w={'100%'}
    >
      <CategoryHeader />
      <Box>
        <Flex h={`${categoryNavHeight}px`}>
          {communityBoardTypes.map((board) => (
            <Text
              key={board.type}
              width="25%"
              fontSize="18px"
              fontWeight="700"
              lineHeight={`${categoryNavHeight}px`}
              textAlign="center"
              borderTopRadius="13px"
              bg={selectedTab === board.type ? categoryNavColor : '#D3D3D3'}
              color={
                selectedTab === board.type ? BoomerangColors.white : '#B1B1B1'
              }
              cursor="pointer"
              onClick={() => onClick(board)}
            >
              {board.type}
            </Text>
          ))}
        </Flex>
        <Box bg={categoryNavColor} display="flex" alignItems="center" p={4}>
          <Image
            src={selectedContent.image}
            alt={`${selectedTab} 이미지`}
            boxSize="100px"
            mr={20}
            ml={10}
          />
          <Box>
            <Text
              fontSize="27px"
              fontWeight="bold"
              color={BoomerangColors.white}
              mb={2}
            >
              {selectedTab}
            </Text>
            <Text
              color={BoomerangColors.white}
              fontSize="21px"
              whiteSpace="pre-line"
              opacity={0.85}
            >
              {selectedContent.text}
            </Text>
          </Box>
        </Box>
        <Divider h={1} bg={'#90b9ff'} />
        <Box bg={categoryNavColor} h={'13px'} borderBottomRadius="13px" />
      </Box>
    </Box>
  );
};
