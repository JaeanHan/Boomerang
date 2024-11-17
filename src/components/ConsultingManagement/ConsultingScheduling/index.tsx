import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { ConsultingManagementHeader } from '@/components/ConsultingManagement/ConsultingManagementHeader';
import { ConsultingInformationInputSection } from '@/components/ConsultingManagement/ConsultingScheduling/ConsultingInformationInputSection';
import { SelectConsultingDaySection } from '@/components/ConsultingManagement/ConsultingScheduling/SelectConsultingDaySection';
import { MentorDetailCard } from '@/components/ConsultingManagement/MentorDetailCard';
import { useSidebar } from '@/pages/ConsultingManagement/SidebarContext';
import { ROUTER_PATH } from '@/routerPath';
import { useToast } from '@chakra-ui/icons';
import { Box, VStack } from '@chakra-ui/react';

export const ConsultingScheduling = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const { isSidebarOpen } = useSidebar();
  const toast = useToast();
  const { id } = useParams<{ id: string }>();
  if (!id) {
    toast({
      title: '지식인을 찾지 못했습니다.',
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
    return <Navigate to={ROUTER_PATH.SELECT_MENTOR} />;
  }

  const nId = parseInt(id);

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
          id={nId}
        />
        <ConsultingInformationInputSection
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          id={nId}
        />
      </VStack>
    </Box>
  );
};
