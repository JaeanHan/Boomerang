import { Suspense } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { ChatSection } from '@/components/ConsultingManagement/ConsultingChat/ChatSection';
import { ConsultingManagementHeader } from '@/components/ConsultingManagement/ConsultingManagementHeader';
import { ROUTER_PATH } from '@/routerPath';
import { Box, Spinner, VStack } from '@chakra-ui/react';

export const ConsultingChat = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return <Navigate to={ROUTER_PATH.CONSULTING_START} />;
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
