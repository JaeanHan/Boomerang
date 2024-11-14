import React from 'react';

import { Flex, Heading, Image } from '@chakra-ui/react';
import vec from '@images/detailnvec.svg';

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <Flex
      as="header"
      bg="#176CFF"
      borderTopRadius="3xl"
      px={{ base: 5, md: 16 }}
      py={6}
      w="full"
      alignItems="center"
      justifyContent="center"
      fontSize="4xl"
      fontWeight="extrabold"
      color="white"
    >
      <Flex gap={1} w="254px" alignItems="center">
        <Heading as="h2" size="lg" flexGrow={1}>
          {title}
        </Heading>
        <Image
          src={vec}
          alt=""
          w="16px"
          h="21px"
          position="relative"
          right="10px"
          bottom="10px"
          mr="10px"
          objectFit="contain"
        />
      </Flex>
    </Flex>
  );
};

export default SectionHeader;
