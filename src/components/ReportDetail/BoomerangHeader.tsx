import React from 'react';

import { Box, Flex, Heading } from '@chakra-ui/react';
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
      maxW={{ base: 'full', md: 'full' }}
    >
      <Box bg="whiteAlpha.200" h="11px" />
      <Flex
        mt={3}
        w="full"
        maxW="829px"
        flexDirection={{ base: 'column', md: 'row' }}
        gap={5}
      >
        <Flex
          flexDirection="column"
          w={{ base: 'full', md: '24%' }}
          ml={{ base: 0, md: 0 }}
        ></Flex>
        <Flex
          flexDirection="column"
          w={{ base: 'full', md: '76%' }}
          ml={{ base: 0, md: 5 }}
        >
          <Heading
            as="h1"
            size="1xl"
            fontWeight="bold"
            color="white"
            textAlign="center"
            fontSize={{ base: '4xl', md: '5xl' }}
          >
            {title}
          </Heading>
        </Flex>
      </Flex>
    </Box>
  );
};

export default BoomerangHeader;
