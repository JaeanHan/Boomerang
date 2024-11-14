import { useNavigate } from 'react-router-dom';

import { BoomerangButton } from '@/components/commons/BoomerangButton';
import { StarIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';

interface MentorConsultingInfoItem {
  title: string;
  content: string | number;
}

export const MentorConsultingInfoBox = ({
  infoList,
}: {
  infoList: MentorConsultingInfoItem[];
}) => {
  const navigate = useNavigate();
  //TODO: 수정
  const chatId = 1;

  return (
    <Flex
      w="883px"
      bg="#F3F3F3"
      flexDir="column"
      p="33px 58px"
      gap="13px"
      overflowY="auto"
      position="relative"
    >
      {infoList.map((item) => (
        <MentorConsultingInfoItem
          key={item.title}
          title={item.title}
          content={item.content}
        />
      ))}
      <Flex alignSelf="flex-end" mt="10px">
        <BoomerangButton
          w="179px"
          h="40px"
          fontSize="15px"
          onClick={() => navigate(`/mentor/scheduled/chat/${chatId}`)}
        >
          과거 상담 채팅 조회하기
        </BoomerangButton>
      </Flex>
    </Flex>
  );
};

const MentorConsultingInfoItem = ({
  title,
  content,
}: {
  title: string;
  content: string | number;
}) => (
  <Flex fontSize="20px" fontWeight="bold" color="#176CFF" gap="135px">
    <Text w="135px">{title}</Text>
    {title === '신청자 상담 평가' && typeof content === 'number' ? (
      <Flex color="#FFD700" maxW="450px" gap="6px">
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon
            key={i}
            color={i < content ? '#FFD700' : '#E0E0E0'}
            w="27px"
            h="27px"
          />
        ))}
      </Flex>
    ) : (
      <Text color="#777" maxW="450px">
        {content}
      </Text>
    )}
  </Flex>
);
