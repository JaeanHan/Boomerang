import { ChatSection } from '@/components/ConsultingManagement/ConsultingChat/ChatSection';
import { ConsultingInfoSection } from '@/components/ConsultingManagement/ConsultingChat/ConsultingInfoSection';
import { ConsultingManagementHeader } from '@/components/ConsultingManagement/ConsultingManagementHeader';
import { Box, VStack } from '@chakra-ui/react';

export const ConsultingChat = () => {
  // const chatId = useParams();

  return (
    <Box flex="1" bg="white">
      <ConsultingManagementHeader category="상담 채팅" />
      <VStack mt="55px" spacing="52px">
        <ConsultingInfoSection />
        <ChatSection />
      </VStack>
    </Box>
  );
};
