import {
  confirmConsultation,
  getConsultations,
  rejectConsultation,
} from '@/apis/mentor';
import { ConsultationListResponse } from '@/apis/mentor/types';
import {
  ConsultingInfoBox,
  ConsultingInfoItem,
} from '@/components/ConsultingManagement/ConsultingInfoBox';
import { ConsultingManagementHeader } from '@/components/ConsultingManagement/ConsultingManagementHeader';
import { BoomerangColors } from '@/utils/colors';
import { Box, Flex, Image, Text, VStack, useToast } from '@chakra-ui/react';
import roundCheck from '@images/roundCheck.svg';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { LoadingButton } from './LoadingButton';

export const ConfirmConsultingRequest = () => {
  const { data, isLoading, isError } = useQuery<ConsultationListResponse>({
    queryKey: [
      'consultations',
      { page: 0, size: 20, consultation_status: 'RECEIVED' },
    ],
    queryFn: () => getConsultations(0, 20, 'RECEIVED'),
  });

  if (isLoading) {
    return (
      <Box flex="1" bg="white">
        <ConsultingManagementHeader category="신청 내역 확인하기" />
        <VStack mt="59px" pb="69px" justifyContent="center">
          <Text>로딩 중...</Text>
        </VStack>
      </Box>
    );
  }

  if (isError || !data) {
    return (
      <Box flex="1" bg="white">
        <ConsultingManagementHeader category="신청 내역 확인하기" />
        <VStack mt="59px" pb="69px" justifyContent="center">
          <Text>데이터를 불러오는데 실패했습니다.</Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box flex="1" bg="white">
      <ConsultingManagementHeader category="신청 내역 확인하기" />
      <VStack mt="59px" pb="69px" justifyContent="center">
        <Flex gap="15px" mb="45px" w="883px">
          <Image src={roundCheck} alt="Round Check" />
          <Text fontWeight="bold" fontSize="30px" color="#373737">
            현재 {data.content.length}건의 상담 신청이 들어왔어요!
          </Text>
        </Flex>
        <Box>
          <Text fontSize="18px" fontWeight="bold" color="#979797" mb="17px">
            요청된 상담 내역
          </Text>
          {data.content.map((consultation) => {
            const infoList: ConsultingInfoItem = {
              consultation_date_time: consultation.consultation_date_time,
              mentee_nick_name: consultation.mentee_nick_name,
              content: consultation.content,
            };

            return (
              <ConsultingRequestRecord
                key={consultation.id}
                infoList={infoList}
                consultationId={consultation.id}
              />
            );
          })}
        </Box>
      </VStack>
    </Box>
  );
};

const ConsultingRequestRecord = ({
  infoList,
  consultationId,
}: {
  infoList: ConsultingInfoItem;
  consultationId: number;
}) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const confirmMutation = useMutation({
    mutationFn: () => confirmConsultation(consultationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          'consultations',
          { page: 0, size: 20, consultation_status: 'RECEIVED' },
        ],
      });
      toast({
        title: '상담 확정 완료',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: '상담 확정 실패',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: () => rejectConsultation(consultationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          'consultations',
          { page: 0, size: 20, consultation_status: 'RECEIVED' },
        ],
      });
      toast({
        title: '상담 거절 완료',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: '상담 거절 실패',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  return (
    <VStack spacing={0} alignItems="flex-end" mb="68px">
      <ConsultingInfoBox infoList={infoList} />
      <Flex gap="34px" mt="15px">
        <LoadingButton
          w="179px"
          h="51px"
          fontSize="22px"
          onClick={() => {
            confirmMutation.mutate();
          }}
          isLoading={confirmMutation.status === 'pending'}
          bg="blue.500"
          color="white"
          borderRadius={5}
        >
          상담 확정하기
        </LoadingButton>
        <LoadingButton
          w="133px"
          h="51px"
          fontSize="22px"
          onClick={() => {
            rejectMutation.mutate();
          }}
          isLoading={rejectMutation.status === 'pending'}
          bg="#FC5C7D"
          shadow="1px 1px 4px rgba(0, 0, 0, 0.25)"
          color={BoomerangColors.white}
          borderRadius={5}
        >
          거절하기
        </LoadingButton>
      </Flex>
    </VStack>
  );
};
