import { useState } from 'react';

import { ServerError } from '@/apis/errors';
import { deleteSchedule, registerSchedule } from '@/apis/mentor';
import { ScheduleRegisterRequest } from '@/apis/mentor/types';
import { ConsultingManagementHeader } from '@/components/ConsultingManagement/ConsultingManagementHeader';
import { BoomerangButton } from '@/components/commons/BoomerangButton';
import { Box, Flex, VStack } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { DaySection } from './MentorDaySection';

export const MentorDateRegistration = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimes, setSelectedTimes] = useState<number[]>([]);
  const queryClient = useQueryClient();

  const registrationDate = async () => {
    if (selectedDate && selectedTimes.length > 0) {
      const dateString = selectedDate.toISOString().split('T')[0];
      const data: ScheduleRegisterRequest = {
        list: {
          [dateString]: selectedTimes,
        },
      };
      try {
        await registerSchedule(data);
        alert('일정이 성공적으로 등록되었습니다.');
        setSelectedTimes([]);
        await queryClient.invalidateQueries({ queryKey: ['schedules'] });
      } catch (error: unknown) {
        let message = '일정 등록에 실패했습니다.';
        if (axios.isAxiosError(error)) {
          const serverError = error.response?.data as ServerError;
          if (serverError && serverError.message) {
            message = serverError.message;
          }
        }
        alert(message);
      }
    } else {
      alert('날짜와 시간을 선택해주세요.');
    }
  };

  const cancelSchedule = async () => {
    if (selectedDate && selectedTimes.length > 0) {
      const dateString = selectedDate.toISOString().split('T')[0];
      const data: ScheduleRegisterRequest = {
        list: {
          [dateString]: selectedTimes,
        },
      };
      try {
        await deleteSchedule(data);
        alert('일정이 성공적으로 삭제되었습니다.');
        setSelectedTimes([]);
        await queryClient.invalidateQueries({ queryKey: ['schedules'] });
      } catch (error: unknown) {
        let message = '일정 삭제에 실패했습니다.';
        if (axios.isAxiosError(error)) {
          const serverError = error.response?.data as ServerError;
          if (serverError && serverError.message) {
            message = serverError.message;
          }
        }
        alert(message);
      }
    } else {
      alert('삭제할 날짜와 시간을 선택해주세요.');
    }
  };

  return (
    <Box flex="1" bg="white">
      <ConsultingManagementHeader category="상담 일자 등록하기" />
      <VStack mt="56px">
        <DaySection
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTimes={selectedTimes}
          setSelectedTimes={setSelectedTimes}
        />
        <Flex justifyContent="flex-end" w="876px" mt="15px" gap="15px">
          <BoomerangButton
            w="154px"
            h="47px"
            fontSize="24px"
            onClick={registrationDate}
          >
            등록하기
          </BoomerangButton>
          <BoomerangButton
            w="154px"
            h="47px"
            fontSize="24px"
            onClick={cancelSchedule}
          >
            삭제하기
          </BoomerangButton>
        </Flex>
      </VStack>
    </Box>
  );
};
