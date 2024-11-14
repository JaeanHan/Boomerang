import { useNavigate } from 'react-router-dom';

import {
  ConsultingInfoBox,
  ConsultingInfoItem,
} from '@/components/ConsultingManagement/ConsultingInfoBox';
import { ConsultingManagementHeader } from '@/components/ConsultingManagement/ConsultingManagementHeader';
import { BoomerangColors } from '@/utils/colors';
import { Box, Button, Flex, Image, Text, VStack } from '@chakra-ui/react';
import paper from '@images/paper.svg';

const ConsultingInfo: ConsultingInfoItem[][] = [
  [
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
  ],
  [
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
  ],
];

export const MentorScheduledConsulting = () => {
  return (
    <Box flex="1" bg="white">
      <ConsultingManagementHeader category="상담 예정 내용 확인하기" />
      <VStack mt="59px" pb="69px" justifyContent="center">
        <Flex gap="15px" mb="45px" w="883px">
          <Image src={paper} />
          <Text fontWeight="bold" fontSize="30px" color="#373737">
            현재 2건의 상담이 예정되어있어요!
          </Text>
        </Flex>
        <Box>
          <Text fontSize="18px" fontWeight="bold" color="#979797" mb="17px">
            요청된 상담 내역
          </Text>
          {ConsultingInfo.map((record) => (
            <ScheduledConsultingRecord
              key={record[1].content}
              infoList={record}
            />
          ))}
        </Box>
      </VStack>
    </Box>
  );
};

const ScheduledConsultingRecord = ({
  infoList,
}: {
  infoList: ConsultingInfoItem[];
}) => {
  return (
    <VStack spacing={0} alignItems="flex-end">
      <ConsultingInfoBox infoList={infoList} />
      <ConsultingStartBtn />
    </VStack>
  );
};

const ConsultingStartBtn = () => {
  const navigate = useNavigate();
  //TODO: 추후 수정
  const chatId = 1;

  const goConsultingChat = () => {
    navigate(`/mentor/scheduled/chat/${chatId}`);
  };

  return (
    <Button
      w="207px"
      h="60px"
      mt="19px"
      mb="65px"
      bg={BoomerangColors.deepBlue}
      fontSize="24px"
      fontWeight={800}
      color={BoomerangColors.white}
      onClick={goConsultingChat}
    >
      상담 시작하기
    </Button>
  );
};
