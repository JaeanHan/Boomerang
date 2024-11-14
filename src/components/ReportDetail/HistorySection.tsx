import React from 'react';

import { Box, Flex, Image, Text } from '@chakra-ui/react';
import ex from '@images/detailex.svg';

import HistoryItem from './HistoryItem';
import SectionHeader from './SectionHeader';

interface HistoryData {
  date: string;
  type: string;
  description: string;
  status: string;
}

interface HistorySectionProps {
  historyData: HistoryData[];
}

const HistorySection: React.FC<HistorySectionProps> = ({ historyData }) => {
  return (
    <Box
      as="section"
      bg="white"
      borderRadius="3xl"
      shadow="lg"
      mt={14}
      pb={14}
      w="full"
      textAlign="center"
    >
      <SectionHeader title="위험 요소 체크" />
      <Box mt={6} ml={20} w="full" fontSize="2xl" maxW="754px" textAlign="left">
        <Flex
          flexWrap="wrap"
          gap={3.5}
          justifyContent="flex-end"
          mr={7}
          fontSize="4xl"
          fontWeight="bold"
          color="gray.700"
          lineHeight="none"
        >
          <Image
            src={ex}
            position="relative"
            bottom="13px"
            left="150px"
            objectFit="contain"
          />
          <Text textAlign="center" ml="150px" flexGrow={1}>
            주의해야 할 요소들이{' '}
            <Text as="span" fontWeight="extrabold" color="#176CFF">
              {historyData.length}
            </Text>
            종류 있어요!
          </Text>
        </Flex>
        <Flex
          gap={8}
          fontSize="2xl"
          fontWeight="extrabold"
          color="gray.600"
          mt={4}
        >
          <Box bg="blue.500" borderRadius="xl" w="19px" h="18px" />
          <Text as="time">2024</Text>
        </Flex>
        {historyData.map((item, index) => (
          <HistoryItem key={index} {...item} />
        ))}
      </Box>
    </Box>
  );
};

export default HistorySection;
