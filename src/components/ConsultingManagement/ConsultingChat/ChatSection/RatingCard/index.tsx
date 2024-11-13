import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Star } from '@/components/ConsultingManagement/ConsultingChat/ChatSection/RatingCard/Star';
import { BoomerangButton } from '@/components/commons/BoomerangButton';
import { BoomerangColors } from '@/utils/colors';
import {
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import businessman from '@images/businessman.svg';
import cursor from '@images/cursor.svg';

export const RatingCardSection = () => {
  const navigate = useNavigate();

  const mentor = {
    name: '김땡땡',
    matchingCount: 33,
  };

  return (
    <VStack>
      <Flex
        w="949px"
        h="286px"
        bg={BoomerangColors.white}
        borderRadius={19}
        border="2px solid #4488FF"
        justifyContent="center"
        alignItems="center"
        mb="31px"
      >
        <VStack alignItems="flex-start" spacing={0}>
          <Flex alignItems="flex-start" gap="15px">
            <Image src={cursor} />
            <Text
              color={BoomerangColors.deepBlue}
              fontSize="28px"
              fontWeight="bold"
              lineHeight="33px"
            >
              방금 전 상담은 어떠셨나요?
              <br /> 더 나은 부메랑을 위해 별점을 남겨주세요!
            </Text>
          </Flex>
          <Flex gap="20px" mt="18px">
            <Image w={100} src={businessman} />
            <Flex flexDir="column" gap="5px" mt="10px">
              <Text fontWeight={800} fontSize="20px" color="#5C5C5C">
                {mentor.name}
                <Text fontSize="15px" color="#A2A2A2" as="span">
                  ({mentor.matchingCount})
                </Text>
              </Text>
              <Text fontWeight={800} fontSize="20px" color="#383838" mb="10spx">
                매칭건수 총
                <Text color="#188EFF" as="span" ml={1} mr={1}>
                  {mentor.matchingCount}
                </Text>
                회
              </Text>
              <StarRating />
            </Flex>
          </Flex>
        </VStack>
      </Flex>
      <BoomerangButton
        w="240px"
        h="47px"
        fontSize="24px"
        onClick={() => navigate(-1)}
      >
        채팅방에서 나가기
      </BoomerangButton>
    </VStack>
  );
};

export const StarRating = () => {
  const [rating, setRating] = useState(0);

  return (
    <HStack spacing="10px">
      {Array.from({ length: 5 }).map((_, i) => (
        <IconButton
          key={i + 1}
          onClick={() => setRating(i + 1)}
          aria-label="star rating"
          icon={<Star color={i + 1 <= rating ? '#FFD04E' : '#DEDEDE'} />}
          variant="unstyled"
        />
      ))}
    </HStack>
  );
};
