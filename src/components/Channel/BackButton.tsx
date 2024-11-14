import React from 'react';

import { Button, Image, Text } from '@chakra-ui/react';
import vec from '@images/kakaovec.svg';

const BackButton: React.FC = () => {
  return (
    <Button
      h="50px"
      display="flex"
      gap={5}
      alignItems="center"
      alignSelf="flex-start"
      px={5}
      py={4}
      mt={10}
      ml={3.5}
      fontSize="2xl"
      fontWeight="extrabold"
      lineHeight="none"
      color="white"
      bg="#176CFF"
      borderRadius="lg"
      letterSpacing="6.24px"
    >
      <Image loading="lazy" src={vec} alt="" objectFit="contain" w="14px" />
      <Text>이전</Text>
    </Button>
  );
};

export default BackButton;
