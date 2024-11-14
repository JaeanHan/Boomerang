import React from 'react';

import { Button as ChakraButton, Flex, Image } from '@chakra-ui/react';
import vec from '@images/alervec.svg';

interface ButtonProps {
  url: string;
}

const Button: React.FC<ButtonProps> = ({ url }) => {
  const handleClick = () => {
    window.open(url, '_blank');
  };

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
        rightIcon={<Image src={vec} alt="" w="14px" objectFit="contain" />}
        onClick={handleClick}
      >
        보험 가입하러가기
      </ChakraButton>
    </Flex>
  );
};

export default Button;
