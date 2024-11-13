import { BoardExplorer } from '@components/CommunityBoard/BoardExplorer';
import { CategorySection } from '@components/CommunityBoard/CategorySection';
import { CommunityPostPages } from '@components/CommunityBoard/CommunityPostPages';
import CreatePostButton from '@components/CommunityBoard/CreatePostButton';
import { HotCommunity } from '@components/CommunityBoard/HotCommunity';
import {
  CommunityBoard,
  SortType,
  communityBoardTypes,
} from '@components/CommunityBoard/constants';

import React, { Suspense, useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import LoadingSpinner from './LoadingSpinner';
import SearchBar from './SearchBar';
import SortButtons from './SortButtons';

const HotCommunityDescription = () => {
  return (
    <Box mt={10} w="100%">
      <Text fontSize="3xl" fontWeight="extrabold" color="#202020">
        🔥 지금 가장 핫한 커뮤니티
      </Text>
      <Text ml={12} mt={2} fontSize="lg" lineHeight="short" color="#878787">
        지금 커뮤니티에서 가장 뜨거운 토론이 벌어지고 있는 게시글이에요!
        <br />
        다양한 의견을 나누고, 당신의 생각도 함께 더해보세요!
      </Text>
    </Box>
  );
};

const SpacedSpinner: React.FC<{
  h?: string;
}> = ({ h = '226px' }) => (
  <Flex h={h} justifyContent={'center'} alignItems={'center'}>
    <LoadingSpinner />
  </Flex>
);

export const MainContent: React.FC = () => {
  const [selectedBoard, setSelectedBoard] = useState<CommunityBoard>(
    communityBoardTypes[0]
  );
  const [searchWord, setSearchWord] = useState<string>('');
  const [sortType, setSortType] = useState<SortType>('ID');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const onClick = (newBoardType: CommunityBoard) =>
    setSelectedBoard(newBoardType);

  const handleSearch = (searchTerm: string) => setSearchWord(searchTerm);

  const handleSortChange = (newSortType: SortType) => setSortType(newSortType);

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      p="32px 100px"
      minH="100vh"
    >
      <CategorySection selectedTab={selectedBoard.type} onClick={onClick} />
      <HotCommunityDescription />
      <Suspense fallback={<SpacedSpinner />}>
        <HotCommunity boardType={selectedBoard.value} />
      </Suspense>
      <BoardExplorer boardType={selectedBoard.value} />
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        gap={5}
        mt={8}
        mb={6}
        w={'100%'}
      >
        <SearchBar onSearch={handleSearch} />
        <SortButtons sortType={sortType} onSortChange={handleSortChange} />
      </Flex>
      <CreatePostButton />
      <Suspense fallback={<SpacedSpinner h={'600px'} />}>
        <CommunityPostPages
          boardType={selectedBoard.value}
          searchWord={searchWord}
          sortType={sortType}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Suspense>
    </Flex>
  );
};
