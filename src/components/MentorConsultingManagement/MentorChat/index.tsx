import { ConsultingManagementHeader } from '@/components/ConsultingManagement/ConsultingManagementHeader';
import { MentorChatSection } from '@/components/MentorConsultingManagement/MentorChat/MentorChatSection';
import { MentorConsultingInfoSection } from '@/components/MentorConsultingManagement/MentorChat/MentorConsultingInfoSection';
import { Box, VStack } from '@chakra-ui/react';

export const MentorChat = () => {
  // const chatId = useParams();

  return (
    <Box flex="1" bg="white">
      <ConsultingManagementHeader category="상담 채팅" />
      <VStack mt="55px" spacing="52px">
        <MentorConsultingInfoSection />
        <MentorChatSection />
      </VStack>
    </Box>
  );
};
