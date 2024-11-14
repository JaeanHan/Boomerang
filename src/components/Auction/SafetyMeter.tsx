import React from 'react';

import { Box, Flex } from '@chakra-ui/react';

import DepositInfo from './DepositInfo';

const SafetyMeter: React.FC = () => {
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
                display="flex"
                flexDirection="column"
                pt={2}
                pb={{ base: 24, md: 32 }}
                bg="red.500"
                borderRadius="lg"
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  pb={20}
                  bg="yellow.500"
                  borderRadius="2xl"
                >
                  <Box
                    zIndex={10}
                    mt={-2}
                    bg="sky.500"
                    borderRadius="lg"
                    h="269px"
                  />
                </Box>
              </Box>
              <Box
                display={{ base: 'none', md: 'flex' }}
                flexDirection="column"
                mt={2}
              ></Box>
            </Flex>
          </Box>
          <DepositInfo />
        </Flex>
      </Box>
    </Box>
  );
};

export default SafetyMeter;
