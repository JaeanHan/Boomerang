import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { BoomerangButton } from '@/components/commons/BoomerangButton';
import { Flex, Image, Text, VStack } from '@chakra-ui/react';
import businessman from '@images/businessman.svg';

interface MentorCardProps {
  name: string;
  matchingCount: number;
}

export const MentorCard: React.FC<
  MentorCardProps & { w: string; h: string }
> = ({ w, h, name, matchingCount }) => {
  const navigate = useNavigate();
  const navigateConsulting = useCallback(() => {
    navigate(`/consulting/selectMentor/scheduling/${name}`);
  }, [name]);

  return (
    <VStack
      w={w}
      h={h}
      borderRadius={19}
      bg="#FFF"
      shadow="0px 0px 3.7px rgba(0, 0, 0, 0.31)"
      p="20px 10px 20px 0"
    >
      <Flex gap="20px">
        <Image w={100} src={businessman} />
        <Flex flexDir="column" gap="5px" mt="10px">
          <Text fontWeight={800} fontSize="20px" color="#5C5C5C">
            {name}
            <Text fontSize="15px" color="#A2A2A2" as="span">
              ({matchingCount})
            </Text>
          </Text>
          <Text fontWeight={800} fontSize="20px" color="#383838" mb="10spx">
            매칭건수 총
            <Text color="#188EFF" as="span" ml={1} mr={1}>
              {matchingCount}
            </Text>
            회
          </Text>
          <BoomerangButton
            w="127px"
            h="41px"
            fontSize="16px"
            onClick={navigateConsulting}
          >
            상담하러 가기
          </BoomerangButton>
        </Flex>
      </Flex>
    </VStack>
  );
};
