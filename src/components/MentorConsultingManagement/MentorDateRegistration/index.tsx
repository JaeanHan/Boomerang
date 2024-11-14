import { useState } from 'react';

import { ConsultingManagementHeader } from '@/components/ConsultingManagement/ConsultingManagementHeader';
import { SelectConsultingDaySection } from '@/components/ConsultingManagement/ConsultingScheduling/SelectConsultingDaySection';
import { BoomerangButton } from '@/components/commons/BoomerangButton';
import { Box, Flex, VStack } from '@chakra-ui/react';

export const MentorDateRegistration = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');

  const registrationDate = () => {
    console.log(selectedDate, selectedTime);
  };

  return (
    <Box flex="1" bg="white">
      <ConsultingManagementHeader category="상담 일자 등록하기" />
      <VStack mt="56px">
        <SelectConsultingDaySection
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
        <Flex justifyContent="flex-end" w="876px" mt="15px">
          <BoomerangButton
            w="154px"
            h="47px"
            fontSize="24px"
            onClick={registrationDate}
          >
            적용하기
          </BoomerangButton>
        </Flex>
      </VStack>
    </Box>
  );
};
