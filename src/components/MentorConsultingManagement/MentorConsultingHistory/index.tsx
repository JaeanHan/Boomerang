import { ConsultingManagementHeader } from '@/components/ConsultingManagement/ConsultingManagementHeader';
import { Box } from '@chakra-ui/react';

export const MentorConsultingHistory = () => {
  return (
    <Box flex="1" bg="white">
      <ConsultingManagementHeader category="과거 상담 내용 조회하기" />
    </Box>
  );
};
