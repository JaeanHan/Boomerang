import { MentorSelectionHeader } from '@components/Consulting/MentorSelectionHeader';
import { ConsultingManagementHeader } from '@components/ConsultingManagement/ConsultingManagementHeader';
import { ConsultingExperts } from '@components/ConsultingManagement/SelectMentor/ConsultingExperts';

import { Suspense } from 'react';

import { Box, Flex, Spacer, Spinner, VStack } from '@chakra-ui/react';
import BlueArrow from '@images/blueArrow.svg?react';

export const SelectMentor = () => {
  return (
    <Box flex="1" bg="white">
      <Box>
        <ConsultingManagementHeader category="부메랑 멘토 탐색하기" />
        <VStack>
          <Suspense fallback={<SkeletonLayout />}>
            <ConsultingExperts />
          </Suspense>
        </VStack>
      </Box>
      <Spacer h="40px" />
    </Box>
  );
};

const SkeletonLayout = () => {
  return (
    <Flex
      width={'100%'}
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
        <Spinner />
      </Box>
    </Flex>
  );
};
