import { Flex, Text } from '@chakra-ui/react';

export interface ConsultingInfoItem {
  mentor_nick_name?: string;
  mentee_nick_name?: string;
  consultation_date_time: string;
  consultation_status?: 'PENDING' | 'ONGOING' | 'FINISHED';
  content: string;
}

//TODO: overflow인 경우 그라이데이션 추가
export const ConsultingInfoBox = ({
  infoList,
}: {
  infoList: ConsultingInfoItem;
}) => {
  return (
    <Flex
      w="883px"
      h="183px"
      bg="#F3F3F3"
      flexDir="column"
      p="33px 58px"
      gap="13px"
      overflowY="auto"
      position="relative"
    >
      <Flex fontSize="20px" fontWeight="bold" color="#176CFF" gap="210px">
        <Text w="79px">상담 일정</Text>
        <Text color="#777" maxW="450px">
          {infoList.consultation_date_time}
        </Text>
      </Flex>
      <Flex fontSize="20px" fontWeight="bold" color="#176CFF" gap="210px">
        <Text w="79px">{infoList.mentor_nick_name ? '멘토명' : '멘티명'}</Text>
        <Text color="#777" maxW="450px">
          {infoList.mentor_nick_name}
        </Text>
      </Flex>
      <Flex fontSize="20px" fontWeight="bold" color="#176CFF" gap="210px">
        <Text w="79px">신청내용</Text>
        <Text color="#777" maxW="450px">
          {infoList.content}
        </Text>
      </Flex>
    </Flex>
  );
};
