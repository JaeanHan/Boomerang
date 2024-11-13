import { BasicLayout } from '@components/commons/BasicLayout';

import React from 'react';

import { UserInfoSection } from '@/components/User/UserInfoSection';
import { VStack } from '@chakra-ui/react';

export const User: React.FC = () => {
  return (
    <BasicLayout maxW={1024}>
      <VStack bg="#FFF" h="100vh">
        <UserInfoSection />
      </VStack>
    </BasicLayout>
  );
};
