import { sidebarWidth } from '@components/Sidebar/constants';

import { Outlet } from 'react-router-dom';

import { useSidebar } from '@/pages/ConsultingManagement/SidebarContext';
import { Box } from '@chakra-ui/react';

export const ConsultingOutlet = () => {
  const { isSidebarOpen } = useSidebar();
  return (
    <Box
      pl={isSidebarOpen ? sidebarWidth : 0}
      transition={isSidebarOpen ? 'padding-left 0.5s ease 0.05s' : undefined}
      overflowX={'hidden'}
      m={!isSidebarOpen ? '0 auto' : 0}
    >
      <Outlet />
    </Box>
  );
};
