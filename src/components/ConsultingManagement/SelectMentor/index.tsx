import { MentorSelectionHeader } from '@components/Consulting/MentorSelectionHeader';
import { ConsultingManagementHeader } from '@components/ConsultingManagement/ConsultingManagementHeader';
import { ConsultingExperts } from '@components/ConsultingManagement/SelectMentor/ConsultingExperts';
import { sidebarWidth } from '@components/Sidebar/constants';

import { Fragment, Suspense } from 'react';

import { useSidebar } from '@/pages/ConsultingManagement/SidebarContext';
import { Box, Spacer, Spinner, VStack } from '@chakra-ui/react';
import BlueArrow from '@images/blueArrow.svg?react';

export const SelectMentor = () => {
  return (
    <Box flex="1" bg="white">
      <Box>
        <ConsultingManagementHeader category="부메랑 멘토 탐색하기" />
        <VStack>
          <Suspense fallback={<ExpertSkeleton />}>
            <ConsultingExperts />
          </Suspense>
        </VStack>
      </Box>
      <Spacer h="40px" />
    </Box>
  );
};

const ExpertSkeleton = () => {
  const { isSidebarOpen } = useSidebar();
  const w = `calc(100vw - ${isSidebarOpen ? sidebarWidth : 0}px - 30px)`;
  return (
    <Fragment>
      <Box
        w={w}
        mt="13px"
        p="26px 31px"
        justifyContent={'flex-start'}
        overflow={'hidden'}
        flexDirection={'column'}
      >
        <MentorSelectionHeader
          title="부메랑의 추천 전문가"
          subtitle="부메랑이 적극 추천하는 전문가"
          Icon={<BlueArrow />}
        />
        <Box h={'162px'}>
          <Spinner ml={50} mt={50} />
        </Box>
      </Box>
      <Box
        w={w}
        h="669px"
        bg="#F3F3F3"
        borderRadius={22}
        mt="25px"
        p="26px 31px"
      >
        <Box>
          <MentorSelectionHeader
            title="가장 답변을 많이 단 위원회⚡"
            subtitle="전세사기 위원회 경력 3년 이상"
          />
          <Box mt="25px" h={'189px'}>
            <Spinner ml={50} mt={50} />
          </Box>
        </Box>
        <Box mt="50px">
          <MentorSelectionHeader
            title="가장 답변을 많이 단 경험자🧾"
            subtitle="보험없이 소송으로 해결한 경험자"
          />
          <Box mt="25px" h={'189px'}>
            <Spinner ml={50} mt={50} />
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};
