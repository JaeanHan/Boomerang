import { ConsultingOutlet } from '@components/ConsultingManagement/ConsultingOutlet';

import { Sidebar } from '@/components/Sidebar';
import { SidebarOpenBtn } from '@/components/Sidebar/SidebarOpenBtn';
import { BasicLayout } from '@/components/commons/BasicLayout';
import { SidebarProvider } from '@/pages/ConsultingManagement/SidebarContext';
import { Flex } from '@chakra-ui/react';

export const ConsultingManagement = () => {
  return (
    <BasicLayout maxW="100%">
      <Flex>
        <SidebarProvider>
          <SidebarOpenBtn />
          <Sidebar />
          <ConsultingOutlet />
        </SidebarProvider>
      </Flex>
    </BasicLayout>
  );
};
