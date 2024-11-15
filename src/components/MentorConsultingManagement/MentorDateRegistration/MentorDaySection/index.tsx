import { useEffect } from 'react';
import Calendar from 'react-calendar';

import { ServerError } from '@/apis/errors';
import { getSchedule } from '@/apis/mentor';
import { ScheduleListResponse } from '@/apis/mentor/types';
import { ConsultingItemTitle } from '@/components/ConsultingManagement/ConsultingItemTitle';
import { BoomerangColors } from '@/utils/colors';
import { Box, Button, Flex, VStack } from '@chakra-ui/react';
import pointer from '@images/pointer.svg';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import './index.css';

const times: string[] = Array.from({ length: 15 }, (_, i) => {
  const hour = (9 + i).toString().padStart(2, '0');
  return `${hour}:00`;
});

type ReservedTimes = {
  [date: string]: number[];
};

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const DaySection: React.FC<{
  selectedDate: Date | null;
  setSelectedDate: (value: Date | null) => void;
  selectedTimes: number[];
  setSelectedTimes: React.Dispatch<React.SetStateAction<number[]>>;
}> = ({ selectedDate, setSelectedDate, selectedTimes, setSelectedTimes }) => {
  const { data: scheduleData, error } = useQuery<ScheduleListResponse>({
    queryKey: ['schedules'],
    queryFn: getSchedule,
  });

  useEffect(() => {
    if (error) {
      let message = '일정 조회에 실패했습니다.';
      if (axios.isAxiosError(error)) {
        const serverError = error.response?.data as ServerError;
        if (serverError && serverError.message) {
          message = serverError.message;
        }
      }
      alert(message);
    }
  }, [error]);

  const reservedTimes: ReservedTimes = scheduleData?.list || {};

  const handleDateChange = (value: Value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      setSelectedTimes([]);
    }
  };

  const getReservedTimes = (): number[] => {
    if (!selectedDate) return [];
    const dateString = selectedDate.toISOString().split('T')[0];
    return reservedTimes[dateString] || [];
  };

  const toggleTimeSelection = (timeIndex: number) => {
    setSelectedTimes((prevSelectedTimes) => {
      if (prevSelectedTimes.includes(timeIndex)) {
        return prevSelectedTimes.filter((t) => t !== timeIndex);
      } else {
        return [...prevSelectedTimes, timeIndex];
      }
    });
  };

  const isTimeReserved = (timeIndex: number): boolean => {
    return getReservedTimes().includes(timeIndex);
  };

  return (
    <Box w="951px">
      <ConsultingItemTitle
        title="원하시는 상담 날짜를 선택해주세요!"
        icon={pointer}
      />
      <VStack justifyContent="center">
        <Flex w="870px" h="394px" borderRadius="17px">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate ?? new Date()}
            locale="ko"
            calendarType="gregory"
            view="month"
            prev2Label={null}
            next2Label={null}
            showNeighboringMonth={false}
          />
          <Box
            borderTop={`2px solid ${BoomerangColors.deepBlue}`}
            borderBottom={`2px solid ${BoomerangColors.deepBlue}`}
          >
            <Flex
              maxW={300}
              wrap="wrap"
              justifyContent="center"
              alignItems="center"
              gap={2}
              h="100%"
              p="5px 0"
            >
              {times.map((time, index) => {
                const isReserved = isTimeReserved(index);
                const isSelected = selectedTimes.includes(index);

                let variant = 'outline';
                let colorScheme = 'blue';

                if (isReserved && isSelected) {
                  variant = 'solid';
                  colorScheme = 'red';
                } else if (isReserved) {
                  variant = 'outline';
                  colorScheme = 'red';
                } else if (isSelected) {
                  variant = 'solid';
                  colorScheme = 'blue';
                }

                return (
                  <Button
                    key={time}
                    onClick={() => toggleTimeSelection(index)}
                    border="none"
                    variant={variant}
                    colorScheme={colorScheme}
                    width="70px"
                    height="40px"
                    fontSize="1rem"
                    fontWeight={500}
                  >
                    {time}
                  </Button>
                );
              })}
            </Flex>
          </Box>
        </Flex>
      </VStack>
    </Box>
  );
};
