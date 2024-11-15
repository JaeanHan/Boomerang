import { Suspense } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ChatSection } from '@/components/ConsultingManagement/ConsultingChat/ChatSection';
import { ConsultingManagementHeader } from '@/components/ConsultingManagement/ConsultingManagementHeader';
import { ROUTER_PATH } from '@/routerPath';
import { Box, Spinner, VStack } from '@chakra-ui/react';

export const ConsultingChat = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  if (!id) {
    navigate(ROUTER_PATH.CONSULTING_START);
    return null;
  }

  const nId = parseInt(id);

  return (
    <Box flex="1" bg="white">
      <ConsultingManagementHeader category="상담 채팅" />
      <VStack spacing="52px">
        <Suspense fallback={<Spinner />}>
          <ChatSection id={nId} />
        </Suspense>
      </VStack>
    </Box>
  );
};
