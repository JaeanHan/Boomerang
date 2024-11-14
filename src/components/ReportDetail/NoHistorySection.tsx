import React from 'react';

import { Box, Flex, Image, Link, Text } from '@chakra-ui/react';
import ex from '@images/smilede.svg';

import SectionHeader from './SectionHeader';

interface NoHistorySectionProps {
  title: string;
  message: string;
  link?: string;
}

const NoHistorySection: React.FC<NoHistorySectionProps> = ({
  title,
  message,
  link,
}) => {
  return (
    <Box
      as="section"
      bg="white"
      borderRadius="3xl"
      shadow="lg"
      mt={16}
      pb={10}
      w="full"
      textAlign="center"
    >
      <SectionHeader title={title} />
      <Flex
        gap={2}
        alignItems="center"
        mt={8}
        mx="auto"
        w="383px"
        fontSize="3xl"
        fontWeight="bold"
        color="gray.400"
        lineHeight="none"
      >
        <Image
          src={ex}
          alt=""
          position="relative"
          left="15px"
          bottom="3px"
          w="51px"
          objectFit="contain"
        />
        {link ? (
          <Link href={link} isExternal flexGrow={1} color="blue.300">
            {message}
          </Link>
        ) : (
          <Text flexGrow={1}>{message}</Text>
        )}
      </Flex>
    </Box>
  );
};

export default NoHistorySection;
