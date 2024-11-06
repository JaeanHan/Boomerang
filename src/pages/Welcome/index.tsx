import { BasicLayout } from '@components/commons/BasicLayout';

import React, { useState } from 'react';

import { ProfileSection } from '@/components/Welcome/ProfileSection';
import { SelectRoleSection } from '@/components/Welcome/SelectRoleSection';
import { VStack } from '@chakra-ui/react';

export const Welcome: React.FC = () => {
  const [nickname, setNickname] = useState<string>('');

  return (
    <BasicLayout maxW={1024}>
      <VStack maxW={1024} h={800} bg={'#FFF'} borderRadius={24} mt={'80px'}>
        <ProfileSection setNickname={setNickname} />
        <SelectRoleSection nickname={nickname} />
      </VStack>
    </BasicLayout>
  );
};
