import { useNavigate } from 'react-router-dom';

import { getConsultations } from '@/apis/mentor';
import {
  ConsultationContent,
  ConsultationListResponse,
} from '@/apis/mentor/types';
import {
  ConsultingInfoBox,
  ConsultingInfoItem,
} from '@/components/ConsultingManagement/ConsultingInfoBox';
import { ConsultingManagementHeader } from '@/components/ConsultingManagement/ConsultingManagementHeader';
import { BoomerangColors } from '@/utils/colors';
import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import paper from '@images/paper.svg';
import { useQuery } from '@tanstack/react-query';

export const MentorScheduledConsulting = () => {
  const { data, isLoading, isError } = useQuery<
    ConsultationListResponse,
    Error
  >({
    queryKey: [
      'consultations',
      { page: 0, size: 30, consultation_status: 'PENDING' },
    ],
    queryFn: () => getConsultations(0, 30, 'PENDING'),
  });

  if (isLoading) {
    return (
      <Center flex="1" bg="white">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (isError || !data) {
    return (
      <Center flex="1" bg="white">
        <Text color="red.500">상담 내역을 불러오는 데 실패했습니다.</Text>
      </Center>
    );
  }

  return (
    <Box flex="1" bg="white">
      <ConsultingManagementHeader category="상담 예정 내용 확인하기" />
      <VStack mt="59px" pb="69px" justifyContent="center">
        <Flex gap="15px" mb="45px" w="883px">
          <Image src={paper} alt="Paper Icon" />
          <Text fontWeight="bold" fontSize="30px" color="#373737">
            현재 {data!.content.length}건의 상담이 예정되어있어요!
          </Text>
        </Flex>
        <Box>
          <Text fontSize="18px" fontWeight="bold" color="#979797" mb="17px">
            요청된 상담 내역
          </Text>
          {data!.content.map((item: ConsultationContent) => (
            <ScheduledConsultingRecord
              key={item.id}
              infoList={[
                { title: '상담 일정', content: item.consultation_date_time },
                { title: '신청자명', content: item.mentee_nick_name },
                { title: '신청 내용', content: item.content },
              ]}
              consultationId={item.id}
            />
          ))}
        </Box>
      </VStack>
    </Box>
  );
};

const ScheduledConsultingRecord = ({
  infoList,
  consultationId,
}: {
  infoList: ConsultingInfoItem[];
  consultationId: number;
}) => {
  return (
    <VStack spacing={0} alignItems="flex-end">
      <ConsultingInfoBox infoList={infoList} />
      <ConsultingStartBtn chatId={consultationId} />
    </VStack>
  );
};

const ConsultingStartBtn = ({ chatId }: { chatId: number }) => {
  const navigate = useNavigate();

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
