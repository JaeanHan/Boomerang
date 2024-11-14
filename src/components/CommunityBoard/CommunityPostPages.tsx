import { Pagination } from '@components/CommunityBoard/Pagination';
import PostCard from '@components/CommunityBoard/PostCard';
import { SortType } from '@components/CommunityBoard/constants';
import { fetchPosts } from '@components/CommunityBoard/utils/api';

import React, { Fragment } from 'react';

import { Flex, VStack } from '@chakra-ui/react';
import { useSuspenseQuery } from '@tanstack/react-query';

export const CommunityPostPages: React.FC<{
  boardType: string;
  searchWord: string;
  sortType: SortType;
  currentPage: number;
  setCurrentPage: (value: ((prevState: number) => number) | number) => void;
}> = ({ boardType, sortType, searchWord, currentPage, setCurrentPage }) => {
  const { data } = useSuspenseQuery({
    queryFn: () => fetchPosts(currentPage, boardType, searchWord, sortType),
    queryKey: [`${currentPage}-${boardType}-${searchWord}-${sortType}`],
  });
  const { posts, totalPages } = data;

  return (
    <Fragment>
      <VStack spacing={4} align="stretch" w="full" mt={5}>
        {posts.map((post) => (
          <PostCard key={post.postId} {...post} />
        ))}
      </VStack>
      <Flex
        flexDirection="column"
        alignSelf="flex-end"
        mt={6}
        w="full"
        fontWeight="bold"
      >
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Flex>
    </Fragment>
  );
};
