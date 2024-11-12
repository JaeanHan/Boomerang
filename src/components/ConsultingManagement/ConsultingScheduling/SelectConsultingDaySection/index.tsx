import { useState } from 'react';
import Calendar from 'react-calendar';

import { ConsultingItemTitle } from '@/components/ConsultingManagement/ConsultingItemTitle';
import { Box, Flex, VStack } from '@chakra-ui/react';
import pointer from '@images/pointer.svg';

import './index.css';

export const SelectConsultingDaySection = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');

  const times = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  return (
    <Box w="951px">
      <ConsultingItemTitle
        title="원하시는 상담 날짜를 선택해주세요!"
        icon={pointer}
      />
      <VStack justifyContent="center">
        <Flex w="870px" h="394px" borderRadius="17px" bg="#F4F4F4">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            locale={'ko'}
            calendarType="gregory"
            view="month"
            prev2Label={null}
            next2Label={null}
            showNeighboringMonth={false}
          />
          {selectedDate && (
            <div>
              <h3>시간 선택</h3>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="" disabled>
                  시간을 선택하세요
                </option>
                {times.map((time) => (
                  <option key={time} value={time} disabled={false}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          )}
        </Flex>
      </VStack>
    </Box>
  );
};
