import React, { useEffect } from 'react';

import {
  DepositTypeBox,
  DepositTypeBoxProps,
} from '@/components/DamagePrevention/step2/DepositTypeBox';
import { QuestionText } from '@/components/commons/QuestionText';
import { preventionSurvey } from '@/pages/DamagePrevention';
import { Box, Flex, Text } from '@chakra-ui/react';
import calendar from '@images/calendar.svg';
import house from '@images/house2.svg';
import coinHouse from '@images/house3.svg';

interface Step2Props {
  setIsNextButtonEnabled: (value: boolean) => void;
  selectedId: number | null;
  setSelectedId: (value: number | null) => void;
}

const depositTypeList: DepositTypeBoxProps[] = [
  {
    id: 1,
    title: '신탁부동산',
    icon: calendar,
  },
  {
    id: 2,
    title: '경매개시결정',
    icon: house,
  },
  {
    id: 3,
    title: '임차권등기',
    icon: coinHouse,
  },
];

const messages: { [key: number]: string } = {
  1: '신탁부동산 - 집주인(임대인)이 다른 회사에게 이 집의 관리를 맡겨 집주인이 전월세 계약할 권한이 없기에 계약을 피해야합니다!',
  2: '경매개시결정 - 집주인(임대인)이 돈을 갚지 않아 법원에서 경매 절차가 시작됨을 의미해 계약을 하면 안됩니다!',
  3: '임차권등기 - 집주인(임대인)이 현재 세입자(임차인)에게 보증금을 돌려주지 않고 있어 계약을 하면 안됩니다!',
};

export const Step2: React.FC<Step2Props> = ({
  setIsNextButtonEnabled,
  selectedId,
  setSelectedId,
}) => {
  useEffect(() => {
    if (selectedId !== null) {
      setIsNextButtonEnabled(false);
    } else {
      setIsNextButtonEnabled(true);
    }
  }, [selectedId, setIsNextButtonEnabled]);

  const handleSelect = (id: number) => {
    if (selectedId === id) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  };

  return (
    <Box pl={71} pr={71} pt={35} h={622}>
      <QuestionText index={2} question={preventionSurvey[1]} />
      <Flex justifyContent="space-between" mt="90px">
        {depositTypeList.map((depositType) => (
          <DepositTypeBox
            key={depositType.id}
            id={depositType.id}
            title={depositType.title}
            icon={depositType.icon}
            isSelected={selectedId === depositType.id}
            onClick={() => handleSelect(depositType.id!)}
          />
        ))}
      </Flex>
      {selectedId !== null && (
        <Box mt={5} textAlign="center">
          <Text fontSize="18px" color="red.500">
            {messages[selectedId]}
          </Text>
        </Box>
      )}
    </Box>
  );
};
