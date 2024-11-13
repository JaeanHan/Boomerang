import React from 'react';

import { Box, Text } from '@chakra-ui/react';

export const BoardExplorer: React.FC<{
  boardType: string;
}> = ({ boardType }) => (
  <Box mt={10} w={'100%'}>
    <Text fontSize="3xl" fontWeight="extrabold" color="#202020">
      🔍 {boardType} 탐색하기
    </Text>
    <Text mt={2} ml={12} fontSize="lg" color="#878787" lineHeight="short">
      전세사기에 대한 고민과 경험을 자유롭게 나누고, 유용한 정보와 조언을
      얻어가세요.
      <br />
      함께 더 안전한 선택을 만들어가요!
    </Text>
  </Box>
);
