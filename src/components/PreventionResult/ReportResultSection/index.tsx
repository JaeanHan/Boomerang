import React from 'react';

import { Flex, Image, Text, VStack } from '@chakra-ui/react';
import checklistIcon from '@images/checklist.svg';
import heartFaceIcon from '@images/heartFace.svg';
import noFaceIcon from '@images/noFaceIcon.svg';
import preventResultBg from '@images/preventResultBg.svg';

interface Mortgage {
  amount: number;
  creditor: string;
  registration_date: string;
}

interface ResultData {
  address: string;
  house_price: number;
  deposit_amount: number;
  total_mortgage_amount: number;
  date: string;
  mortgages: Mortgage[];
}

interface ReportResultSectionProps {
  resultData: ResultData;
}

export const ReportResultSection: React.FC<ReportResultSectionProps> = ({
  resultData,
}) => {
  const { house_price, deposit_amount, total_mortgage_amount, address, date } =
    resultData;
  const userName = localStorage.getItem('Nickname') || '사용자';

  const isSafe = house_price * 0.8 - deposit_amount - total_mortgage_amount > 0;

  const message = isSafe ? '내 보증금은 안전해요!' : '보증금이 위험해요';
  const color = isSafe ? '#005DFF' : '#9B111E';
  const bgColor = isSafe ? '#176CFF' : '#9B111E';
  const icon = isSafe ? heartFaceIcon : noFaceIcon;

  return (
    <VStack
      h={'682px'}
      bg={bgColor}
      mt={'44px'}
      borderTopRadius={20}
      spacing={0}
      position="relative"
    >
      <Image src={preventResultBg} position="absolute" />
      <Flex mt="70px" alignItems="center" gap="20px" zIndex={1}>
        <Image src={checklistIcon} />
        <Text
          color={'#FFF'}
          fontSize={'46px'}
          fontWeight={'regular'}
          lineHeight="55px"
        >
          부메랑이{' '}
          <Text fontWeight={800} as="span">
            {userName}
          </Text>
          님의 정보를
          <br /> 종합하여 분석한{' '}
          <Text fontWeight={800} as="span">
            리포트 결과
          </Text>
          입니다!
        </Text>
      </Flex>
      <VStack
        w={609}
        h={394}
        p="43px 0px"
        borderRadius={37}
        bgColor="#F6FBFF"
        mt="20px"
      >
        <Text
          fontWeight="bold"
          fontSize="21px"
          color="#4B4B4B"
          w="400px"
          textAlign="center"
          lineHeight="27px"
        >
          {address}
        </Text>
        <Image src={icon} />
        <Text fontWeight="bold" fontSize="20px" color="#979797">
          모든 정보를 종합해보았을 때,
        </Text>
        <Text fontWeight={800} fontSize="36px" color={color}>
          {message}
        </Text>
        <Text fontSize="19px" color="#979797">
          {date} 기준
        </Text>
      </VStack>
    </VStack>
  );
};
