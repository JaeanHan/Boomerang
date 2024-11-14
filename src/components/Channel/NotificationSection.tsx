import React from 'react';

import { Box, Flex, Image, Text } from '@chakra-ui/react';
import man from '@images/alertman.svg';

const NotificationSection: React.FC = () => {
  return (
    <Box as="section">
      <Text
        alignSelf="flex-start"
        ml={{ base: 2.5, md: 140 }}
        fontSize="xl"
        lineHeight="6"
        color="#A5A5A5"
      >
        부메랑 채널 친구추가하면 변경 사항이 생길 때<br />
        알림톡으로 알려드려요!
      </Text>
      <Box alignSelf="center" mt={7} w={{ base: 'full', md: '820px' }}>
        <Flex gap={5} flexDirection={{ base: 'column', md: 'row' }}>
          <Box w={{ base: 'full', md: '69%' }}>
            <Box flexGrow={1} mt={{ base: 10, md: 0 }}>
              <Flex gap={5} flexDirection={{ base: 'column', md: 'row' }}>
                <Box w={{ base: 'full', md: '63%' }}>
                  <Box
                    px={{ base: 5, md: 9 }}
                    py={5}
                    mt={{ base: 10, md: 14 }}
                    ml="50px"
                    w="327px"
                    h="58px"
                    fontSize="18px"
                    fontWeight="bold"
                    lineHeight="none"
                    bg="#F1F1F1"
                    borderRadius="39px 39px 6px 39px"
                    color="#A5A5A5"
                  >
                    부메랑이 변경사항을 알려드릴게요!
                  </Box>
                </Box>
                <Box w={{ base: 'full', md: '37%' }} ml={{ base: 0, md: 5 }}>
                  <Image
                    ml={10}
                    loading="lazy"
                    src={man}
                    alt=""
                    objectFit="contain"
                    w="196px"
                    mt={{ base: 3.5, md: 0 }}
                  />
                </Box>
              </Flex>
            </Box>
          </Box>
          <Box w={{ base: 'full', md: '31%' }} ml={{ base: 0, md: 5 }}>
            <Box
              px={{ base: 5, md: 8 }}
              py={5}
              mt={{ base: 10, md: 32 }}
              ml="50px"
              mb="10px"
              w="full"
              fontSize="lg"
              fontWeight="bold"
              lineHeight="none"
              bg="#F1F1F1"
              borderRadius="39px 39px 39px 6px"
              color="#A5A5A5"
            >
              부메랑 알림이 왔어요!
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default NotificationSection;
