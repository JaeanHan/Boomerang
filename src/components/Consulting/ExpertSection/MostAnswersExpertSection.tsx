import { MentorCard } from '@/components/Consulting/MentorCard';
import { MentorSelectionHeader } from '@/components/Consulting/MentorSelectionHeader';
import { Box, Flex } from '@chakra-ui/react';

export const MostAnswersExpertSection = () => {
  return (
    <Box h="669px" bg="#D9D9D9" borderRadius={22} mt="45px" p="26px 31px">
      <Box>
        <MentorSelectionHeader
          title="가장 답변을 많이 단 위원회⚡"
          subtitle="전세사기 위원회 경력 3년 이상"
        />
        <Flex gap="63px" mt="25px">
          {Array.from({ length: 2 }).map((_, index) => (
            <MentorCard key={index} w="399px" h="189px" />
          ))}
        </Flex>
      </Box>

      <Box mt="50px">
        <MentorSelectionHeader
          title="가장 답변을 많이 단 경험자🧾"
          subtitle="보험없이 소송으로 해결한 경험자"
        />
        <Flex gap="63px" mt="25px">
          {Array.from({ length: 2 }).map((_, index) => (
            <MentorCard key={index} w="399px" h="189px" />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};
