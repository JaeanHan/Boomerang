import React, { useState } from 'react';

import { QuestionText } from '@/components/commons/QuestionText';
import { Box, Button, Flex, Image, Text, VStack } from '@chakra-ui/react';
import cryinFace from '@images/cryingFace.svg';
import thumbsUp from '@images/thumbsUp.svg';

export interface SurveyQuestions {
  id: number;
  title: string;
  subtitle: string;
}

const questions: SurveyQuestions[] = [
  {
    id: 1,
    title: '전세권 설정을 하셨나요?',
    subtitle: '전세권 설정이 무엇인가요?',
  },
  {
    id: 2,
    title: '보증 보험에 가입 되어있나요 ?',
    subtitle: '보증 보험이 무엇인가요?',
  },
];

export const QuestionSection: React.FC = () => {
  const [isLeaseType, setIsLeaseType] = useState('');
  const [isInsured, setIsInsured] = useState('');

  return (
    <VStack pt={35} pb={41} pl={120} pr={120} align="stretch">
      <VStack align="stretch" gap={'35px'}>
        <SelectItem
          key={questions[0].id}
          index={questions[0].id}
          question={questions[0]}
          isSelected={isLeaseType}
          setIsSelected={setIsLeaseType}
        />
        {isLeaseType === 'N' && (
          <SelectItem
            key={questions[1].id}
            index={questions[1].id}
            question={questions[1]}
            isSelected={isInsured}
            setIsSelected={setIsInsured}
          />
        )}
      </VStack>
      <Button
        mt={'67px'}
        w="415px"
        h="113px"
        borderRadius="8px"
        bg="#176CFF"
        color="#fff"
        fontSize="35px"
        fontWeight={800}
        alignSelf="center"
      >
        다음 단계로 넘어가기
      </Button>
    </VStack>
  );
};

const SelectItem: React.FC<{
  index: number;
  question: SurveyQuestions;
  isSelected: string;
  setIsSelected: (value: string) => void;
}> = ({ index, question, isSelected, setIsSelected }) => {
  return (
    <Box>
      <QuestionText index={index} question={question} />
      <Flex ml={33} justifyContent="space-between" mt={'32px'}>
        <Button
          bgColor={
            isSelected === 'Y'
              ? '#176CFF'
              : isSelected === 'N'
                ? '#D9D9D9'
                : '#E7F4FF'
          }
          border="2px solid #176CFF"
          h={94}
          p={22}
          onClick={() => setIsSelected('Y')}
          _hover={{
            bgColor: isSelected === 'Y' ? '#145BCC' : '#CFE9FF',
          }}
          opacity={isSelected && isSelected !== 'Y' ? 0.6 : 1}
        >
          <Image src={thumbsUp} />
          <Text
            color={isSelected === 'Y' ? '#FFF' : '#176CFF'}
            fontSize={25}
            fontWeight="bold"
            ml={13}
          >
            네! 가입되어 있어요
          </Text>
        </Button>
        <Button
          bgColor={
            isSelected === 'N'
              ? '#FF3939'
              : isSelected === 'Y'
                ? '#D9D9D9'
                : '#FFCFCF'
          }
          border="2px solid #FF3939"
          h={94}
          onClick={() => setIsSelected('N')}
          _hover={{
            bgColor: isSelected === 'N' ? '#CC3030' : '#F7B6B6',
          }}
          opacity={isSelected && isSelected !== 'N' ? 0.6 : 1}
        >
          <Image src={cryinFace} />
          <Text
            color={isSelected === 'N' ? '#FFF' : '#FF3939'}
            fontSize={25}
            fontWeight="bold"
            ml={'10px'}
          >
            아니요, 아직 안되어있어요
          </Text>
        </Button>
      </Flex>
    </Box>
  );
};
