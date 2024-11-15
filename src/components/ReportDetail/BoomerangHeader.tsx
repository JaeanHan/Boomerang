import React from 'react';

import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import vec from '@images/detailnvec.svg';
import reportback from '@images/reportbac.svg';

interface BoomerangHeaderProps {
  title: string;
}

const BoomerangHeader: React.FC<BoomerangHeaderProps> = ({ title }) => {
  return (
    <Box
      as="header"
      bg="#176CFF"
      pt={3}
      w="full"
      h="244px"
      backgroundImage={reportback}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="center"
      maxW={{ base: 'full', md: 'full' }}
    >
      <Box bg="whiteAlpha.200" h="11px" />

      <Text
        color="white"
        fontSize={{ base: 'lg', md: 'xl' }}
        textAlign="center"
        mt={6}
        mb={2}
      >
        부메랑만의 자가 진단 서비스
      </Text>

      <Flex
        w="full"
        maxW="829px"
        flexDirection={{ base: 'column', md: 'row' }}
        align="center"
        justify="center"
        gap={5}
        ml="108px"
      >
        <Heading
          as="h1"
          size="2xl"
          fontWeight="bold"
          color="white"
          textAlign={{ base: 'center', md: 'left' }}
          fontSize={{ base: '4xl', md: '5xl' }}
        >
          {title}
        </Heading>

        <Image
          src={vec}
          alt="Vec Image"
          w="17px"
          h="23px"
          position="relative"
          right="15px"
          bottom="18px"
          objectFit="contain"
        />
      </Flex>

      <Box
        w={{ base: 'full', md: '414px' }}
        h="49px"
        bg="white"
        borderRadius=" 50px 50px 50px 0"
        mt={6}
        mx="auto"
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxShadow="md"
      >
        <Text color="gray.700" fontSize="lg" fontWeight="bold">
          손 쉽게 볼 수 있는 위험 요소들을 확인해요! 😉
        </Text>
      </Box>
    </Box>
  );
};

export default BoomerangHeader;
