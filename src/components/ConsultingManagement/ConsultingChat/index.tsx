import { useNavigate, useParams } from 'react-router-dom';

import { ChatSection } from '@/components/ConsultingManagement/ConsultingChat/ChatSection';
import { ConsultingManagementHeader } from '@/components/ConsultingManagement/ConsultingManagementHeader';
import { ROUTER_PATH } from '@/routerPath';
import { Box, VStack } from '@chakra-ui/react';

export const ConsultingChat = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  if (!id) {
    navigate(ROUTER_PATH.CONSULTING_START);
    return null;
  }

  return (
    <Box flex="1" bg="white">
      <ConsultingManagementHeader category="상담 채팅" />
      <VStack mt="55px" spacing="52px">
        <ChatSection />
      </VStack>
    </Box>
  );
};
