import React from 'react';

import {
  Box,
  Flex,
  Image,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import ex from '@images/exclamation.svg';

const InfoBox: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      alignSelf="center"
      px={{ base: 5, md: 16 }}
      py={9}
      mt={{ base: 10, md: 12 }}
      w={{ base: 'full', md: '861px' }}
      fontSize="3xl"
      fontWeight="bold"
      textAlign="center"
      bg="#F6F7F9"
      borderRadius="3xl"
      boxShadow="0px 0px 12px rgba(0,0,0,0.23)"
      color="gray.600"
    >
      <Flex gap={5} fontWeight="extrabold" color="gray.700">
        <Image
          loading="lazy"
          src={ex}
          alt=""
          objectFit="contain"
          w="48px"
          h="48px"
        />
        <Text flex="1" my="auto">
          집이 경매에 넘어가면?
        </Text>
      </Flex>
      <UnorderedList mt={4} spacing={2} textAlign="left">
        <ListItem>
          약{' '}
          <Text as="span" color="red.600">
            5,815만원
          </Text>
          에 팔릴 것으로 예상돼요.
        </ListItem>
        <ListItem>
          나는{' '}
          <Text as="span" color="red.600">
            두 번째
          </Text>
          로 돈을 받을 수 있어요.
        </ListItem>
        <ListItem>
          먼저 줄 서있는 돈은{' '}
          <Text as="span" color="red.600">
            16억 3,200만원
          </Text>
          이에요.
        </ListItem>
      </UnorderedList>
    </Box>
  );
};

export default InfoBox;
