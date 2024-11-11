import React from 'react';

import { useSidebar } from '@/pages/ConsultingManagement/SidebarContext';
import { IconButton } from '@chakra-ui/react';
import SidebarArrowOpen from '@images/sidebarArrowOpen.svg?react';

export const SidebarOpenBtn: React.FC = () => {
  const { isSidebarOpen, setSidebarOpen } = useSidebar();

  return (
    <IconButton
      position="fixed"
      icon={<SidebarArrowOpen />}
      aria-label="사이드바 열기"
      onClick={() => setSidebarOpen(!isSidebarOpen)}
      variant="outline"
      top="80px"
      left="20px"
      opacity={isSidebarOpen ? 0 : 1}
    />
  );
};
