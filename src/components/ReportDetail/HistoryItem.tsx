import React from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

interface HistoryItemProps {
  date: string;
  type: string;
  description: string;
  status: string;
}

const HistoryItem: React.FC<HistoryItemProps> = ({
  date,
  type,
  description,
  status,
}) => {
  return (
    <Flex
      flexWrap="wrap"
      justifyContent="space-between"
      bg="gray.200"
      px={14}
      py={6}
      mt={2.5}
      w="full"
      maxW="704px"
      borderRadius="60px 60px 60px 2px"
    >
      <Box>
        <Flex gap={5}>
          <Text fontWeight="bold" color="gray.600">
            {date}
          </Text>
          <Text fontWeight="extrabold" color="blue.500" letterSpacing="widest">
            {type}
          </Text>
        </Flex>
        <Text mt={3.5} fontWeight="bold" color="neutral.600">
          {description}
        </Text>
      </Box>
      <Text
        alignSelf="start"
        fontWeight="extrabold"
        color="red.400"
        letterSpacing="wider"
      >
        {status}
      </Text>
    </Flex>
  );
};

export default HistoryItem;
