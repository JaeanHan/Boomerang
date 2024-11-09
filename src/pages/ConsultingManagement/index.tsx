import { useState } from 'react';

import { ConsultingManagementSection } from '@/components/ConsultingManagement';
import { Sidebar } from '@/components/Sidebar';
import { SidebarOpenBtn } from '@/components/Sidebar/SidebarOpenBtn';
import { BasicLayout } from '@/components/commons/BasicLayout';
import { Flex } from '@chakra-ui/react';

export const ConsultingManagement = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <BasicLayout maxW="100%">
      <Flex>
        <SidebarOpenBtn
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
        <ConsultingManagementSection />
      </Flex>
    </BasicLayout>
  );
};
