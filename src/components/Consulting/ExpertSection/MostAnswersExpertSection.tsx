import { MentorType, MentorTypeConvertor } from '@apis/mentor/types';

import { MentorCard } from '@/components/Consulting/MentorCard';
import { MentorSelectionHeader } from '@/components/Consulting/MentorSelectionHeader';
import { Box, Flex } from '@chakra-ui/react';

export const MostAnswersExpertSection: React.FC<{
  expertMentors: MentorType[];
  normalMentors: MentorType[];
}> = ({ expertMentors, normalMentors }) => {
  return (
    <Box h="669px" bg="#F3F3F3" borderRadius={22} mt="25px" p="26px 31px">
      <Box>
        <MentorSelectionHeader
          title="가장 답변을 많이 단 위원회⚡"
          subtitle="전세사기 위원회 경력 3년 이상"
        />
        <Flex gap="63px" mt="25px">
          {expertMentors.slice(0, 3).map((mentor) => (
            <MentorCard
              key={mentor.id}
              name={mentor.nickname}
              matchingCount={22}
              w="399px"
              h="189px"
              mentorType={MentorTypeConvertor[mentor.mentor_type]}
              imgSrc={mentor.profile_image}
            />
          ))}
        </Flex>
      </Box>
      <Box mt="50px">
        <MentorSelectionHeader
          title="가장 답변을 많이 단 경험자🧾"
          subtitle="보험없이 소송으로 해결한 경험자"
        />
        <Flex gap="63px" mt="25px">
          {normalMentors.slice(0, 3).map((mentor) => (
            <MentorCard
              key={mentor.id}
              name={mentor.nickname}
              matchingCount={22}
              w="399px"
              h="189px"
              mentorType={MentorTypeConvertor[mentor.mentor_type]}
              imgSrc={mentor.profile_image}
            />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};
