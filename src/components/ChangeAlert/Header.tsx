import React from 'react';

import { Box, Flex, Heading, Text } from '@chakra-ui/react';

const Header: React.FC = () => {
  return (
    <Box
      as="header"
      bg="#4488FF"
      px={{ base: 5, md: 20 }}
      py={20}
      textAlign="center"
      w="full"
    >
      <Flex flexDirection="column" maxW="630px" mx="auto">
        <Heading
          as="h1"
          size="2xl"
          fontWeight="extrabold"
          color="white"
          fontSize={{ base: '4xl', md: '6xl' }}
        >
          BOOMERANG
        </Heading>
        <Text
          mt={3.5}
          fontSize="2xl"
          fontWeight="bold"
          color="gray.800"
          mx={{ base: 0, md: 3.5 }}
        >
          전세 사기 관련 전문가에게 상담 받고 싶어요!🥺
        </Text>
      </Flex>
    </Box>
  );
};

export default Header;
