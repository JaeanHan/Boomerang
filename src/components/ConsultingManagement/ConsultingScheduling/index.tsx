import { useState } from 'react';

import { ConsultingManagementHeader } from '@/components/ConsultingManagement/ConsultingManagementHeader';
import { ConsultingInformationInputSection } from '@/components/ConsultingManagement/ConsultingScheduling/ConsultingInformationInputSection';
import { SelectConsultingDaySection } from '@/components/ConsultingManagement/ConsultingScheduling/SelectConsultingDaySection';
import { MentorDetailCard } from '@/components/ConsultingManagement/MentorDetailCard';
import { Box, VStack } from '@chakra-ui/react';

export const ConsultingScheduling = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');

  return (
    <Box flex="1" bg="white">
      <ConsultingManagementHeader category="멘토 상담예약하기" />
      <VStack mt="55px" pb="69px" spacing="52px">
        <MentorDetailCard />
        <SelectConsultingDaySection
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
        <ConsultingInformationInputSection
          selectedDate={selectedDate}
          selectedTime={selectedTime}
        />
      </VStack>
    </Box>
  );
};
