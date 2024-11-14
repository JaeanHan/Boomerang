import React from 'react';

import { Box, Flex } from '@chakra-ui/react';

import DepositInfo from './DepositInfo';

interface SafetyMeterProps {
  safeAmount: number;
  cautionAmount: number;
  dangerAmount: number;
}

const SafetyMeter: React.FC<SafetyMeterProps> = ({
  safeAmount,
  cautionAmount,
  dangerAmount,
}) => {
  const totalAmount = safeAmount + cautionAmount + dangerAmount;
  const safeHeight = (safeAmount / totalAmount) * 100;
  const cautionHeight = (cautionAmount / totalAmount) * 100;
  const dangerHeight = (dangerAmount / totalAmount) * 100;

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      alignSelf="center"
      px={{ base: 5, md: 16 }}
      py={14}
      mt={{ base: 10, md: 12 }}
      w={{ base: 'full', md: '850px' }}
      bg="gray.100"
      borderRadius="xl"
    >
      <Box w={{ base: 'full', md: '607px' }}>
        <Flex gap={5} flexDirection={{ base: 'column', md: 'row' }}>
          <Box w={{ base: 'full', md: '36%' }}>
            <Flex
              flexGrow={1}
              gap={5}
              justifyContent="space-between"
              mt={{ base: 10, md: 0 }}
            >
              <Box
                position="relative"
                width="100px"
                height="400px"
                bg="gray.200"
                borderRadius="md"
                overflow="hidden"
              >
                <Box
                  position="absolute"
                  bottom="0"
                  width="100%"
                  height={`${dangerHeight}%`}
                  bg="red.500"
                />
                <Box
                  position="absolute"
                  bottom={`${dangerHeight}%`}
                  width="100%"
                  height={`${cautionHeight}%`}
                  bg="yellow.400"
                />
                <Box
                  position="absolute"
                  bottom={`${dangerHeight + cautionHeight}%`}
                  width="100%"
                  height={`${safeHeight}%`}
                  bg="green.500"
                />
              </Box>
            </Flex>
          </Box>
          <DepositInfo
            safeAmount={safeAmount}
            cautionAmount={cautionAmount}
            dangerAmount={dangerAmount}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default SafetyMeter;
