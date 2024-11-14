import React from 'react';

import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import chat from '@images/chat2.svg';

const Header: React.FC = () => {
  return (
    <Box as="header" w={{ base: 'full', md: '718px' }}>
      <Flex gap={5} flexDirection={{ base: 'column', md: 'row' }}>
        <Box w={{ base: 'full', md: '15%' }}>
          <Image
            loading="lazy"
            src={chat}
            alt=""
            objectFit="contain"
            w="107px"
            h="107px"
            mt={{ base: 7, md: 0 }}
          />
        </Box>
        <Box w={{ base: 'full', md: '85%' }} ml={{ base: 0, md: 5 }}>
          <Heading
            mt={{ base: 10, md: 4 }}
            fontSize="4xl"
            fontWeight="bold"
            lineHeight="113%"
            color="#757575"
          >
            <Text as="span" fontWeight="extrabold" color="#474747">
              등기부등본
            </Text>
            에 변경사항이 생기면 <br />
            카카오톡으로{' '}
            <Text as="span" fontWeight="extrabold" color="#4B4B4B">
              알림
            </Text>
            을 받을 수 있어요!
          </Heading>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
