import React, { useState } from 'react';

import {
  IssuanceTypeBox,
  IssuanceTypeProps,
} from '@/components/DamagePrevention/step1/IssuanceTypeBox';
import { Search } from '@/components/DamagePrevention/step1/Search';
import { QuestionText } from '@/components/commons/QuestionText';
import { preventionSurvey } from '@/pages/DamagePrevention';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import document from '@images/document.svg';
import light from '@images/light.svg';
import message from '@images/message.svg';

const issuanceTypeList: IssuanceTypeProps[] = [
  {
    id: 1,
    title: `괜찮아요!\n이미 발급받았어요`,
    subtitle: '',
    icon: message,
  },
  {
    id: 2,
    title: `발급이 필요해요!`,
    subtitle: '* 발급시 수수료가 발생합니다.',
    icon: document,
  },
];

export const Step1: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <Box pl={71} pr={71} pt={35} h={622}>
      <QuestionText index={1} question={preventionSurvey[0]} />
      <Search />

      <Box mt={'48px'}>
        <Flex gap={'20px'}>
          <Image src={light} />
          <Text
            fontSize={18}
            fontWeight="bold"
            color="rgba(116, 134, 144, 0.72)"
          >
            우리 집 등기부등본이 없나요? 부메랑이 쉽게 바로 불러와줄게요!
          </Text>
        </Flex>
        <Flex gap={122} mt={33} justifyContent="center">
          {issuanceTypeList.map((issuanceType) => (
            <IssuanceTypeBox
              key={issuanceType.id}
              title={issuanceType.title}
              subtitle={issuanceType.subtitle}
              icon={issuanceType.icon}
              isSelected={selectedId === issuanceType.id}
              onClick={() => setSelectedId(issuanceType.id!)}
            />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};
