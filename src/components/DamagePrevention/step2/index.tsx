import React, { useState } from 'react';

import {
  DepositTypeBox,
  DepositTypeBoxProps,
} from '@/components/DamagePrevention/step2/DepositTypeBox';
import { QuestionText } from '@/components/commons/QuestionText';
import { preventionSurvey } from '@/pages/DamagePrevention';
import { Box, Flex } from '@chakra-ui/react';
import calendar from '@images/calendar.svg';
import house from '@images/house2.svg';
import coinHouse from '@images/house2.svg';

const depositTypeList: DepositTypeBoxProps[] = [
  {
    id: 1,
    title: '월세',
    icon: calendar,
  },
  {
    id: 2,
    title: '전세',
    icon: house,
  },
  {
    id: 3,
    title: '반전세',
    icon: coinHouse,
  },
];

export const Step2: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <Box pl={71} pr={71} pt={35} h={622}>
      <QuestionText index={2} question={preventionSurvey[1]} />
      <Flex justifyContent="space-between" mt="90px">
        {depositTypeList.map((depositType) => (
          <DepositTypeBox
            key={depositType.id}
            title={depositType.title}
            icon={depositType.icon}
            isSelected={selectedId === depositType.id}
            onClick={() => setSelectedId(depositType.id!)}
          />
        ))}
      </Flex>
    </Box>
  );
};
