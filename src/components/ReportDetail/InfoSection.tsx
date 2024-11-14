import React from 'react';

import { Box, Divider, Flex, Image, Text } from '@chakra-ui/react';
import search from '@images/search2.svg';

interface InfoSectionProps {
  name: string;
}

const InfoSection: React.FC<InfoSectionProps> = () => {
  return (
    <Box
      as="section"
      bg="#176CFF"
      borderRadius="2xl"
      shadow="lg"
      mt={12}
      pt={7}
      w="full"
      textAlign="center"
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        gap={4}
        mx="auto"
        maxW="full"
        fontSize="4xl"
        fontWeight="bold"
        color="white"
      >
        <Image src={search} alt="" w="35px" objectFit="contain" />
        <Text>
          <Text as="span" fontWeight="extrabold" color="white">
            안전도 분석 공식
          </Text>
          에 대해 설명드릴게요!
        </Text>
      </Flex>
      <Box
        bg="white"
        mt={7}
        pb={10}
        fontSize="3xl"
        color="neutral.700"
        lineHeight="9"
        borderBottomRadius="2xl"
      >
        <Divider borderColor="neutral.400" borderStyle="dashed" />
        <Text mt={9}>
          공식은{' '}
          <Text as="span" fontWeight="extrabold" color="blue.600">
            (집값 * 0.8) - 채권 - 보증금이&nbsp;
          </Text>
          0보다 커야해요!
          <br />
          <br />집 값에 곱하는 이유는{' '}
          <Text as="span" fontWeight="extrabold" color="blue.600">
            경매에 넘어갔을때 1회 유찰율
          </Text>
          을 고려한 것이에요.
        </Text>
      </Box>
    </Box>
  );
};

export default InfoSection;
