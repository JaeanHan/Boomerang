import { useCallback, useState } from 'react';

import { MentorCard } from '@/components/Consulting/MentorCard';
import { MentorSelectionHeader } from '@/components/Consulting/MentorSelectionHeader';
import { BoomerangColors } from '@/utils/colors';
import { Box, Flex, keyframes } from '@chakra-ui/react';
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
  {
    name: '김땡땡5',
    matchingCount: 33,
  },
  {
    name: '김땡땡6',
    matchingCount: 33,
  },
  {
    name: '김땡땡7',
    matchingCount: 33,
  },
];

type sliceIdx = {
  start: number;
  end: number;
};

const displayCount = 4;
const step = 4;
const scaleUp = keyframes`
  0% { transform: translate(-50%, 0); }
  100% { transform: translate(0, 0); }
`;

export const RecommendedExpertSection = () => {
  const [idx, setIdx] = useState<sliceIdx>(() => ({ start: 0, end: 4 }));
  const handlePrevious = useCallback(() => {
    setIdx((prev) => {
      const prevStart = Math.max(prev.start - step, 0);
      const prevEnd = prevStart + displayCount;
      return { start: prevStart, end: prevEnd };
    });
  }, [setIdx]);

  const handleNext = useCallback(() => {
    setIdx((prev) => {
      const nextStart = Math.min(
        prev.start + step,
        RecommendedExperts.length - displayCount
      );
      const nextEnd = nextStart + displayCount;
      return { start: nextStart, end: nextEnd };
    });
  }, [setIdx]);

  return (
    <Box mt="13px" p="26px 31px" overflow={'hidden'}>
      <MentorSelectionHeader
        title="부메랑의 추천 전문가"
        subtitle="부메랑이 적극 추천하는 전문가"
        Icon={<BlueArrow />}
      />
      <Flex gap="63px" mt="25px" position={'relative'}>
        <ArrowButton
          onClick={handlePrevious}
          direction="left"
          isDisabled={idx.start === 0}
        />
        <ArrowButton
          onClick={handleNext}
          direction="right"
          isDisabled={idx.end >= RecommendedExperts.length}
        />
        {RecommendedExperts.slice(idx.start, idx.end).map((mentor) => (
          <Box
            key={mentor.name}
            animation={`${scaleUp} 0.6s ease-in-out forwards`}
            transition={'all .5s ease-in-out'}
          >
            <MentorCard
              key={mentor.name}
              w="300px"
              h="max-content"
              name={mentor.name}
              matchingCount={mentor.matchingCount}
            />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

const ArrowButton = ({ onClick, direction, isDisabled }) => (
  <Box
    onClick={onClick}
    cursor={isDisabled ? 'not-allowed' : 'pointer'}
    fontSize="24px"
    fontWeight="bold"
    color={BoomerangColors.white}
    backgroundColor={BoomerangColors.blue}
    width="25px"
    display="flex"
    justifyContent="center"
    alignItems="center"
    borderRadius="4px"
    position="absolute"
    top="50%"
    transform="translateY(-50%)"
    zIndex={1}
    left={direction === 'left' ? '-10px' : 'unset'}
    right={direction === 'right' ? '-10px' : 'unset'}
  >
    {direction === 'left' ? '<' : '>'}
  </Box>
);
