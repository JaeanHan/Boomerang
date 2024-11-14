import React from 'react';

import { Button as ChakraButton, Flex } from '@chakra-ui/react';

const Button: React.FC = () => {
  return (
    <Flex justifyContent="flex-end" mt={5}>
      <ChakraButton
        w="300px"
        h="65px"
        bg="#176CFF"
        color="white"
        fontSize="24px"
        fontWeight="extrabold"
        px={6}
        py={4}
        borderRadius="lg"
        _hover={{ bg: 'blue.700' }}
      >
        보험 가입 가능
      </ChakraButton>
    </Flex>
  );
};

export default Button;
