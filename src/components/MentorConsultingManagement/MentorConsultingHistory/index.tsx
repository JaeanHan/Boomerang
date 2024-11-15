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
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Spinner,
  VStack,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

export const MentorConsultingHistory: React.FC = () => {
  const page = 0;
  const size = 30;

  const { data, isLoading, isError, error } = useQuery<
    ConsultationListResponse,
    Error
  >({
    queryKey: ['pastConsultations', page, size],
    queryFn: () => getConsultations(page, size, 'FINISHED'),
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
        <Alert status="error">
          <AlertIcon />
          {error?.message || '상담 내역을 불러오는 데 실패했습니다.'}
        </Alert>
      </Center>
    );
  }

  const { content: consultations } = data;

  const previousConsultingList = consultations.map(
    (consultation: ConsultationContent) => {
      const formattedDate = formatDate(consultation.consultation_date_time);
      const formattedTime = formatTime(consultation.consultation_date_time);

      const infoList: ConsultingInfoItem = {
        consultation_date_time: formattedTime,
        mentee_nick_name: consultation.mentee_nick_name,
        content: consultation.content,
      };

      return {
        id: consultation.id,
        date: formattedDate,
        infoList,
      };
    }
  );

  return (
    <Box flex="1" bg="white">
      <ConsultingManagementHeader category="과거 상담 내용 조회하기" />
      <VStack spacing="34px" mt="48px" pb="281px">
        {previousConsultingList.map(
          (item: {
            id: number;
            date: string;
            infoList: ConsultingInfoItem;
          }) => (
            <ScheduledConsultingRecord
              key={item.id}
              infoList={item.infoList}
              consultationId={item.id}
            />
          )
        )}
      </VStack>
    </Box>
  );
};

const ScheduledConsultingRecord = ({
  infoList,
  consultationId,
}: {
  infoList: ConsultingInfoItem;
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
      상담 채팅 조회하기
    </Button>
  );
};

const formatDate = (dateTime: string): string => {
  const [datePart] = dateTime.split(' ');
  const [year, month, day] = datePart.split('-');
  return `${month}/${day}/${year}`;
};

const formatTime = (dateTime: string): string => {
  const [, hourPart] = dateTime.split(' ');
  const hour = parseInt(hourPart, 10);
  const period = hour >= 12 ? '오후' : '오전';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${period} ${displayHour}시`;
};
