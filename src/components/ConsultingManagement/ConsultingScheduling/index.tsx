import { useState } from 'react';

import { ConsultingManagementHeader } from '@/components/ConsultingManagement/ConsultingManagementHeader';
import { ConsultingInformationInputSection } from '@/components/ConsultingManagement/ConsultingScheduling/ConsultingInformationInputSection';
import { SelectConsultingDaySection } from '@/components/ConsultingManagement/ConsultingScheduling/SelectConsultingDaySection';
import { MentorDetailCard } from '@/components/ConsultingManagement/MentorDetailCard';
import { useSidebar } from '@/pages/ConsultingManagement/SidebarContext';
import { Box, VStack } from '@chakra-ui/react';

export const ConsultingScheduling = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const { isSidebarOpen } = useSidebar();
  return (
    <Box flex="1" bg="white">
      <ConsultingManagementHeader category="멘토 상담예약하기" />
      <VStack
        mt="55px"
        pb="69px"
        spacing="52px"
        ml={isSidebarOpen ? '60px' : 0}
      >
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
