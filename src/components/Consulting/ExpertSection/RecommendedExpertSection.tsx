import { MentorCard } from '@/components/Consulting/MentorCard';
import { MentorSelectionHeader } from '@/components/Consulting/MentorSelectionHeader';
import { BoomerangColors } from '@/utils/colors';
import { Box, Flex } from '@chakra-ui/react';
import BlueArrow from '@images/blueArrow.svg?react';

const RecommendedExperts = [
  {
    name: '김땡땡1',
    matchingCount: 33,
  },
  {
    name: '김땡땡2',
    matchingCount: 33,
  },
  {
    name: '김땡땡3',
    matchingCount: 33,
  },
  {
    name: '김땡땡4',
    matchingCount: 33,
  },
];

export const RecommendedExpertSection = () => {
  return (
    <Box mt="13px" p="26px 31px">
      <MentorSelectionHeader
        title="부메랑의 추천 전문가"
        subtitle="부메랑이 적극 추천하는 전문가"
        Icon={<BlueArrow />}
      />
      <Flex
        gap="63px"
        mt="25px"
        position={'relative'}
        _before={{
          content: '"<"',
          position: 'absolute',
          left: '-10px',
          top: '50%',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
          fontSize: '24px',
          fontWeight: 'bold',
          color: BoomerangColors.white,
          backgroundColor: BoomerangColors.blue,
          width: '25px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '4px',
        }}
        _after={{
          content: '">"',
          position: 'absolute',
          right: '-10px',
          top: '50%',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
          fontSize: '24px',
          fontWeight: 'bold',
          color: BoomerangColors.white,
          backgroundColor: BoomerangColors.blue,
          width: '25px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '4px',
        }}
      >
        {RecommendedExperts.map((mentor) => (
          <MentorCard
            key={mentor.name}
            w="300px"
            h="max-content"
            name={mentor.name}
            matchingCount={mentor.matchingCount}
          />
        ))}
      </Flex>
    </Box>
  );
};
