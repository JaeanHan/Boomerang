import { getMentorSchedule } from '@apis/mentee';

import { Suspense } from 'react';
import Calendar from 'react-calendar';

import { ConsultingItemTitle } from '@/components/ConsultingManagement/ConsultingItemTitle';
import { BoomerangColors } from '@/utils/colors';
import { Box, Button, Flex, Spinner, VStack } from '@chakra-ui/react';
import pointer from '@images/pointer.svg';
import { useSuspenseQuery } from '@tanstack/react-query';

import './index.css';

const times: string[] = Array.from({ length: 15 }, (_, i) => {
  const hour = (9 + i).toString().padStart(2, '0');
  return `${hour}:00`;
});

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const SelectConsultingDaySection: React.FC<{
  selectedDate: Date | null;
  setSelectedDate: (
    value: ((prevState: Date | null) => Date | null) | Date | null
  ) => void;
  selectedTime: string;
  setSelectedTime: (value: ((prevState: string) => string) | string) => void;
  id: number;
}> = ({ selectedDate, setSelectedDate, selectedTime, setSelectedTime, id }) => {
  const handleDateChange = (value: Value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      setSelectedTime('');
    }
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
            value={selectedTime ?? new Date()}
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
            <Suspense fallback={<Spinner />}>
              <TimePicker
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                selectedDate={selectedDate}
                id={id}
              />
            </Suspense>
          </Box>
        </Flex>
      </VStack>
    </Box>
  );
};

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const formatTime = (hour: number): string => {
  return `${String(hour).padStart(2, '0')}:00`;
};

const TimePicker: React.FC<{
  selectedDate: Date | null;
  selectedTime: string;
  setSelectedTime: (value: ((prevState: string) => string) | string) => void;
  id: number;
}> = ({ setSelectedTime, selectedTime, selectedDate, id }) => {
  const { data } = useSuspenseQuery({
    queryFn: () => getMentorSchedule(id),
    queryKey: [`${id}`],
  });
  const { list } = data;

  const availables: string[] = !selectedDate
    ? []
    : (list[formatDate(selectedDate)]?.map((time) => formatTime(time)) ?? []);

  return (
    <Flex
      maxW={300}
      wrap="wrap"
      justifyContent="center"
      alignItems="center"
      gap={2}
      h="100%"
      p="5px 0"
    >
      {times.map((time) => (
        <Button
          key={time}
          onClick={() => setSelectedTime(time)}
          isDisabled={selectedDate == null || !availables.includes(time)}
          border="none"
          variant={selectedTime === time ? 'solid' : 'outline'}
          width="70px"
          height="40px"
          fontSize="1rem"
          fontWeight={500}
        >
          {time}
        </Button>
      ))}
    </Flex>
  );
};
