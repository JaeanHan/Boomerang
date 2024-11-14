import React from 'react';

import BackButton from '@/components/Channel/BackButton';
import Header from '@/components/Channel/Header';
import KakaoButton from '@/components/Channel/KakaoButton';
import NotificationSection from '@/components/Channel/NotificationSection';
import { BasicLayout } from '@/components/commons/BasicLayout';
import { Box } from '@chakra-ui/react';

const Channel: React.FC = () => {
  return (
    <BasicLayout maxW="full">
      <Box
        as="main"
        display="flex"
        flexDirection="column"
        alignItems="center"
        px={{ base: 5, md: 20 }}
        pt={{ base: 24, md: 44 }}
        pb={20}
        bg="#F6F6F6"
        overflow="hidden"
      >
        <Box
          as="section"
          display="flex"
          flexDirection="column"
          w="full"
          maxW="1029px"
        >
          <Box
            as="article"
            display="flex"
            flexDirection="column"
            px={{ base: 5, md: 14 }}
            pt={10}
            pb={10}
            w="full"
            bg="white"
            borderRadius="24px"
            boxShadow="0px 0px 20px rgba(0,0,0,0.13)"
          >
            <Header />
            <NotificationSection />
            <KakaoButton />
          </Box>
          <BackButton />
        </Box>
      </Box>
    </BasicLayout>
  );
};

export default Channel;
