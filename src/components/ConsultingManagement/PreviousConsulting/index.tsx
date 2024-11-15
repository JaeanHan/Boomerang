import {
  ConsultingInfoBox,
  ConsultingInfoItem,
} from '@/components/ConsultingManagement/ConsultingInfoBox';
import { ConsultingManagementHeader } from '@/components/ConsultingManagement/ConsultingManagementHeader';
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

const previousConsultingList: ConsultingInfoItem[] = [
  {
    consultation_date_time: '24/10/22 오후 3시~ 오후 4시',
    mentor_nick_name: '김땡땡',
    consultation_status: 'PENDING',
    content:
      '주택 전세사기를 당했어요... 주택 전세사기를 당했어요...주택 전세사기를 당했어요...주택 전세사기를 당했어요...',
  },
  {
    consultation_date_time: '24/10/22 오후 3시~ 오후 4시',
    mentor_nick_name: '김땡땡',
    consultation_status: 'PENDING',
    content:
      '주택 전세사기를 당했어요... 주택 전세사기를 당했어요...주택 전세사기를 당했어요...주택 전세사기를 당했어요...',
  },
  {
    consultation_date_time: '24/10/22 오후 3시~ 오후 4시',
    mentor_nick_name: '김땡땡',
    consultation_status: 'PENDING',
    content:
      '주택 전세사기를 당했어요... 주택 전세사기를 당했어요...주택 전세사기를 당했어요...주택 전세사기를 당했어요...',
  },
];

export const PreviousConsulting = () => {
  return (
    <Box flex="1" bg="white">
      <ConsultingManagementHeader category="과거 상담 내용 조회하기" />
      <VStack spacing="34px" mt="48px" pb="281px">
        {previousConsultingList.map((item) => (
          <Accordion key={item.consultation_date_time} allowToggle>
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
                    {item.consultation_date_time} 상담 내역 조회하기
                  </Text>
                  <AccordionIcon
                    justifySelf="flex-end"
                    color={BoomerangColors.white}
                    fontSize={'40px'}
                  />
                </Flex>
              </AccordionButton>
              <AccordionPanel p={0}>
                <ConsultingInfoBox infoList={item} />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ))}
      </VStack>
    </Box>
  );
};
