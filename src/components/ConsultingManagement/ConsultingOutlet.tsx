import { sidebarWidth } from '@components/Sidebar/constants';

import { Outlet } from 'react-router-dom';

import { useSidebar } from '@/pages/ConsultingManagement/SidebarContext';
import { BoomerangColors } from '@/utils/colors';
import { Box } from '@chakra-ui/react';

export const ConsultingOutlet = () => {
  const { isSidebarOpen } = useSidebar();

  return (
    <Box
      ml={isSidebarOpen ? `${sidebarWidth}px` : 0}
      transition={
        isSidebarOpen
          ? 'padding-left 0.5s ease 0.05s'
          : 'padding-left 0.3s ease 0.02s'
      }
      outline={`4000px solid ${BoomerangColors.white}`}
      margin={!isSidebarOpen ? '0 auto' : undefined}
    >
      <Outlet />
    </Box>
  );
};
