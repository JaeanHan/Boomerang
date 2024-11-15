import { useNavigate } from 'react-router-dom';

import { BoomerangButton } from '@/components/commons/BoomerangButton';
import { StarIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';

interface MentorConsultingInfoItem {
  title: string;
  content: string | number;
}

interface MentorConsultingInfoBoxProps {
  infoList: MentorConsultingInfoItem[];
  chatId: number;
}

export const MentorConsultingInfoBox: React.FC<
  MentorConsultingInfoBoxProps
> = ({ infoList, chatId }) => {
  const navigate = useNavigate();

  const goConsultingChat = () => {
    navigate(`/mentor/scheduled/chat/${chatId}`);
  };

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
      {infoList.map((item: MentorConsultingInfoItem) => (
        <MentorConsultingInfoItemComponent
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
          onClick={goConsultingChat}
        >
          과거 상담 채팅 조회하기
        </BoomerangButton>
      </Flex>
    </Flex>
  );
};

const MentorConsultingInfoItemComponent: React.FC<{
  title: string;
  content: string | number;
}> = ({ title, content }) => (
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
