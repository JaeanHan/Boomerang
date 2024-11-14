import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Image, Text } from '@chakra-ui/react';
import vec from '@images/kakaovec.svg';

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

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
      onClick={handleClick}
      _active={{ bg: '#176CFF' }}
      _focus={{ bg: '#176CFF' }}
    >
      <Image loading="lazy" src={vec} alt="" objectFit="contain" w="14px" />
      <Text>이전</Text>
    </Button>
  );
};

export default BackButton;
