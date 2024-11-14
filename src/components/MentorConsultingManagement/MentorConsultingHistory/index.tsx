import { ConsultingManagementHeader } from '@/components/ConsultingManagement/ConsultingManagementHeader';
import { MentorConsultingInfoBox } from '@/components/MentorConsultingManagement/MentorConsultingHistory/MentorConsultingInfoBox';
import { BoomerangColors } from '@/utils/colors';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Text,
  VStack,
} from '@chakra-ui/react';

const previousConsultingList = [
  {
    date: '2024-10-01',
    infoList: [
      {
        title: '상담 일정',
        content: '24/10/22 오후 3시~ 오후 4시',
      },
      {
        title: '신청자명',
        content: '김땡땡',
      },
      {
        title: '신청 내용',
        content:
          '주택 전세사기를 당했어요... 주택 전세사기를 당했어요...주택 전세사기를 당했어요...주택 전세사기를 당했어요...',
      },
      {
        title: '신청자 상담 평가',
        content: 3,
      },
    ],
  },
  {
    date: '2024-10-08',
    infoList: [
      {
        title: '상담 일정',
        content: '24/10/22 오후 3시~ 오후 4시',
      },
      {
        title: '신청자명',
        content: '김땡땡',
      },
      {
        title: '신청 내용',
        content:
          '주택 전세사기를 당했어요... 주택 전세사기를 당했어요...주택 전세사기를 당했어요...주택 전세사기를 당했어요...',
      },
      {
        title: '신청자 상담 평가',
        content: 3,
      },
    ],
  },
  {
    date: '2024-10-21',
    infoList: [
      {
        title: '상담 일정',
        content: '24/10/22 오후 3시~ 오후 4시',
      },
      {
        title: '신청자명',
        content: '김땡땡',
      },
      {
        title: '신청 내용',
        content:
          '주택 전세사기를 당했어요... 주택 전세사기를 당했어요...주택 전세사기를 당했어요...주택 전세사기를 당했어요...',
      },
      {
        title: '신청자 상담 평가',
        content: 3,
      },
    ],
  },
];

export const MentorConsultingHistory = () => {
  return (
    <Box flex="1" bg="white">
      <ConsultingManagementHeader category="과거 상담 내용 조회하기" />
      <VStack spacing="34px" mt="48px" pb="281px">
        {previousConsultingList.map((item) => (
          <Accordion key={item.date} allowToggle>
            <AccordionItem border="none">
              <AccordionButton
                bg="#176CFF"
                w="883px"
                h="50px"
                fontWeight="bold"
                fontSize="19px"
                color={BoomerangColors.white}
                pl={0}
                _hover={{ bg: '#176CFF' }}
              >
                <Flex
                  alignItems="center"
                  w="100%"
                  justifyContent="space-between"
                >
                  <Text textAlign="center" flex="1" pl="40px">
                    {item.date} 상담 내역 조회하기
                  </Text>
                  <AccordionIcon
                    justifySelf="flex-end"
                    color={BoomerangColors.white}
                    fontSize={'40px'}
                  />
                </Flex>
              </AccordionButton>
              <AccordionPanel p={0}>
                <MentorConsultingInfoBox infoList={item.infoList} />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ))}
      </VStack>
    </Box>
  );
};
