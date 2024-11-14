import React, { useEffect } from 'react';

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

interface Step1Props {
  isNextButtonEnabled: boolean;
  setIsNextButtonEnabled: (value: boolean) => void;
  address: string;
  setAddress: (value: string) => void;
  selectedId: number | null;
  setSelectedId: (value: number) => void;
}

const issuanceTypeList: IssuanceTypeProps[] = [
  {
    id: 1,
    title: `괜찮아요!\n이미 발급받았어요`,
    subtitle: '',
    icon: document,
  },
  {
    id: 2,
    title: `발급이 필요해요!`,
    subtitle: '* 클릭시 발급 안내를 도와드려요',
    icon: message,
  },
];

export const Step1: React.FC<Step1Props> = ({
  setIsNextButtonEnabled,
  address,
  setAddress,
  selectedId,
  setSelectedId,
}) => {
  useEffect(() => {
    if (address.trim() !== '' && selectedId === 1) {
      setIsNextButtonEnabled(true);
    } else {
      setIsNextButtonEnabled(false);
    }
  }, [address, selectedId, setIsNextButtonEnabled]);

  return (
    <Box pl={71} pr={71} pt={35} h={622}>
      <QuestionText index={1} question={preventionSurvey[0]} />
      <Search address={address} setAddress={setAddress} />

      <Box mt={'48px'}>
        <Flex gap={'20px'}>
          <Image src={light} />
          <Text
            fontSize={18}
            fontWeight="bold"
            color="rgba(116, 134, 144, 0.72)"
          >
            부메랑은 핵심 서비스 무료 이용을 지향하기에, 등기부등본을 본인이
            직접 발급받아야해요!
          </Text>
        </Flex>
        <Flex gap={122} mt={33} justifyContent="center">
          {issuanceTypeList.map((issuanceType) => (
            <IssuanceTypeBox
              key={issuanceType.id}
              id={issuanceType.id}
              title={issuanceType.title}
              subtitle={issuanceType.subtitle}
              icon={issuanceType.icon}
              isSelected={selectedId === issuanceType.id}
              onClick={() => setSelectedId(issuanceType.id!)}
            />
          ))}
        </Flex>
        {selectedId === 2 && (
          <Box mt={5} textAlign="center">
            <Text fontSize="18px" color="red.500">
              등기부등본 발급 방법은 다음 사이트를 확인하세요!{' '}
              <a
                href="http://www.iros.go.kr/pos1/jsp/help2/jsp/001001004001.jsp"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'blue', textDecoration: 'underline' }}
              >
                등기부등본 발급 방법
              </a>
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};
