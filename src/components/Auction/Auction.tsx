import React from 'react';

import { Box, Heading, Image, Text } from '@chakra-ui/react';
import liner from '@images/liner.svg';

import InfoBox from './InfoBox';
import SafetyMeter from './SafetyMeter';

const Auction: React.FC = () => {
  return (
    <Box
      as="main"
      display="flex"
      flexDirection="column"
      alignItems="center"
      px={{ base: 5, md: 20 }}
      pt={20}
      pb={8}
      bg="#F6F6F6"
      overflow="hidden"
    >
      <Box
        as="section"
        display="flex"
        flexDirection="column"
        px={{ base: 5, md: 6 }}
        pt={20}
        pb={10}
        w="full"
        bg="white"
        maxW="1029px"
      >
        <Heading
          as="h1"
          alignSelf="flex-start"
          ml={{ base: 2.5, md: 32 }}
          fontSize="3xl"
          fontWeight="extrabold"
          textAlign="center"
          color="#0071DE"
        >
          내가 되돌려 받을 수 있는 보증금은?
        </Heading>
        <Box
          alignSelf="flex-start"
          px={{ base: 5, md: 16 }}
          py={5}
          mt={5}
          ml={{ base: 0, md: 16 }}
          fontSize="3xl"
          fontWeight="bold"
          textAlign="center"
          bg="#EAEAEA"
          borderRadius="2px 43px 43px 43px"
          color="gray.600"
        >
          집이 팔리면 보증금 중{' '}
          <Text as="span" color="red.600">
            최소 7,500만원은 받을 수 없어요!
          </Text>
        </Box>
        <InfoBox />
        <Image
          loading="lazy"
          src={liner}
          objectFit="contain"
          mt={{ base: 10, md: 14 }}
          w="full"
        />
        <Heading
          as="h2"
          alignSelf="flex-start"
          mt={{ base: 10, md: 12 }}
          ml={{ base: 0, md: 20 }}
          fontSize="4xl"
          fontWeight="extrabold"
          lineHeight="tall"
          color="gray.700"
        >
          <Text as="span" color="blue.600">
            보증금의 안전도
          </Text>
          <Text as="span" fontWeight="bold" color="gray.600">
            를 확인하고,
          </Text>
          <br />
          <Text as="span" fontWeight="bold" color="gray.600">
            되돌려 받을 수 있는 보증금을 돌려받아요!
          </Text>
        </Heading>
        <SafetyMeter />
      </Box>
    </Box>
  );
};

export default Auction;
