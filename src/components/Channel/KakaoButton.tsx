import React from 'react';

import { Button, Image, Text } from '@chakra-ui/react';
import kakao from '@images/kakaologo.svg';

const KakaoButton: React.FC = () => {
  return (
    <Button
      display="flex"
      gap={3.5}
      alignItems="flex-start"
      alignSelf="center"
      px={3.5}
      pt={3}
      pb={1.5}
      mt={2.5}
      ml={5}
      maxW="full"
      fontSize="xl"
      fontWeight="extrabold"
      bg="#FEE500"
      color="#181600"
      borderRadius="lg"
      w="330px"
      h="68px"
    >
      <Image
        loading="lazy"
        src={kakao}
        alt=""
        objectFit="contain"
        w="57px"
        h="52px"
      />
      <Text alignSelf="center" w="194px" mb="6px">
        카카오톡 채널 추가하기
      </Text>
    </Button>
  );
};

export default KakaoButton;
