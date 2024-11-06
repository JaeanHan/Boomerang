import { MentorCard } from '@/components/Consulting/MentorCard';
import { MentorSelectionHeader } from '@/components/Consulting/MentorSelectionHeader';
import { Box, Flex } from '@chakra-ui/react';
import BlueArrow from '@images/blueArrow.svg?react';

export const RecommendedExpertSection = () => {
  return (
    <Box mt="13px" p="26px 31px">
      <MentorSelectionHeader
        title="부메랑의 추천 전문가"
        subtitle="부메랑이 적극 추천하는 전문가"
        Icon={<BlueArrow />}
      />
      <Flex gap="63px" mt="25px">
        {Array.from({ length: 2 }).map((_, index) => (
          <MentorCard key={index} w="399px" h="189px" />
        ))}
      </Flex>
    </Box>
  );
};
