import { BasicLayout } from '@components/commons/BasicLayout';

import React from 'react';

import { BoomerangColors } from '@/utils/colors';
import { Box, Button, Flex, Image, Text, VStack } from '@chakra-ui/react';
import clover from '@images/clover.svg';
import guidlinePeople from '@images/guidlinePeople.svg';

export const GuidelineResult: React.FC = () => {
  return (
    <BasicLayout maxW={1024}>
      <Box
        h="723px"
        bg={BoomerangColors.white}
        borderBottomRadius={20}
        boxShadow="0px 0px 4.3px rgba(0, 0, 0, 0.25)"
      >
        <가이드라인결과이미지 />
      </Box>
      <BackButton />
    </BasicLayout>
  );
};

const 가이드라인결과이미지 = () => (
  <Flex>
    <Box>
      <Image src={clover} />
      <VStack
        bg="#176CFF"
        borderRadius={50}
        borderBottomEndRadius={2}
        w="575px"
        h="116px"
        justifyContent="center"
      >
        <Text fontSize="35px" fontWeight={800} color={BoomerangColors.white}>
          모든 과정을 다 진행하셨어요!
        </Text>
      </VStack>

      <VStack
        bg="#E8ECED"
        borderRadius={50}
        borderBottomEndRadius={2}
        w="575px"
        h="116px"
        justifyContent="center"
      >
        <Text fontSize="30px" fontWeight="bold" color="#3E3E3E">
          수고하셨습니다.
          <br />
          당신의 앞 날에 행운이 가득하길 바랍니다!
        </Text>
      </VStack>
    </Box>
    <Image src={guidlinePeople} />
  </Flex>
);

const BackButton = () => {
  return (
    <Button borderRadius="8px" bgColor="#176CFF" w="350px" h="63px">
      <Text fontSize="30px" fontWeight={800} color={BoomerangColors.white}>
        메인화면으로 돌아가기
      </Text>
    </Button>
  );
};
