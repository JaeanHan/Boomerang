import { MentorType, MentorTypeConvertor } from '@apis/mentee/types';

import { useCallback, useState } from 'react';

import { MentorCard } from '@/components/Consulting/MentorCard';
import { MentorSelectionHeader } from '@/components/Consulting/MentorSelectionHeader';
import { BoomerangColors } from '@/utils/colors';
import { Box, Flex, keyframes } from '@chakra-ui/react';
import BlueArrow from '@images/blueArrow.svg?react';

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
const cardWidth = 280;
const gap = 63;

export const RecommendedExpertSection: React.FC<{
  recommendedMentors: MentorType[];
}> = ({ recommendedMentors }) => {
  const [idx, setIdx] = useState<sliceIdx>(() => ({
    start: 0,
    end: displayCount,
  }));

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
        recommendedMentors.length - displayCount
      );
      const nextEnd = nextStart + displayCount;
      return { start: nextStart, end: nextEnd };
    });
  }, [setIdx, recommendedMentors]);

  const translateX = -(idx.start * (cardWidth + gap));

  return (
    <Box mt="13px" p="26px 31px" overflow={'hidden'}>
      <MentorSelectionHeader
        title="부메랑의 추천 전문가"
        subtitle="부메랑이 적극 추천하는 전문가"
        Icon={<BlueArrow />}
      />
      <Flex
        gap={`${gap}px`}
        mt="25px"
        position={'relative'}
        width={`calc(${cardWidth * displayCount + gap * (displayCount - 1)}px)`}
      >
        <ArrowButton
          onClick={handlePrevious}
          direction="left"
          isDisabled={idx.start === 0}
        />
        <ArrowButton
          onClick={handleNext}
          direction="right"
          isDisabled={idx.end >= recommendedMentors.length}
        />
        <Flex
          transform={`translateX(${translateX}px)`}
          transition="transform 0.6s ease-in-out"
          gap={`${gap}px`}
        >
          {recommendedMentors.map((mentor) => (
            <Box
              key={mentor.id}
              animation={`${scaleUp} 0.6s ease-in-out forwards`}
              transition={'all .5s ease-in-out'}
            >
              <MentorCard
                w={`${cardWidth}px`}
                h="max-content"
                mentorType={MentorTypeConvertor[mentor.mentor_type]}
                name={mentor.nickname ?? '김멘토'}
                matchingCount={33}
                gap="10px"
                imgSrc={mentor.profile_image}
                id={mentor.id}
              />
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

const ArrowButton: React.FC<{
  onClick: () => void;
  direction: string;
  isDisabled: boolean;
}> = ({ onClick, direction, isDisabled }) => (
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
