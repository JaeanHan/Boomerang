import { ConsultingManagementHeader } from '@/components/ConsultingManagement/ConsultingManagementHeader';
import { MentorDetailCard } from '@/components/ConsultingManagement/MentorDetailCard';
import { BoomerangButton } from '@/components/commons/BoomerangButton';
import { Box, VStack } from '@chakra-ui/react';

export const MentorDetailSection = () => {
  return (
    <Box>
      <ConsultingManagementHeader category="멘토 정보 탐색하기" />
      <VStack mt="55px" pb="69px" gap="35px">
        <MentorDetailCard />
        <BoomerangButton w="350px" h="63px" fontSize="30px">
          멘토와 상담 신청하기
        </BoomerangButton>
      </VStack>
    </Box>
  );
};
