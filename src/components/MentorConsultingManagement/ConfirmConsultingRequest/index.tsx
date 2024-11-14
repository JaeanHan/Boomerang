import {
  ConsultingInfoBox,
  ConsultingInfoItem,
} from '@/components/ConsultingManagement/ConsultingInfoBox';
import { ConsultingManagementHeader } from '@/components/ConsultingManagement/ConsultingManagementHeader';
import { BoomerangButton } from '@/components/commons/BoomerangButton';
import { BoomerangColors } from '@/utils/colors';
import { Box, Button, Flex, Image, Text, VStack } from '@chakra-ui/react';
import roundCheck from '@images/roundCheck.svg';

const ConsultingInfo: ConsultingInfoItem[][] = [
  [
    {
      title: '상담 일정',
      content: '24/10/22 오후 3시~ 오후 4시',
    },
    {
      title: '신청자명',
      content: '김땡땡',
    },
    {
      title: '신청 내용',
      content:
        '주택 전세사기를 당했어요... 주택 전세사기를 당했어요...주택 전세사기를 당했어요...주택 전세사기를 당했어요...',
    },
  ],
  [
    {
      title: '상담 일정',
      content: '24/10/22 오후 3시~ 오후 4시',
    },
    {
      title: '신청자명',
      content: '김땡땡',
    },
    {
      title: '신청 내용',
      content:
        '주택 전세사기를 당했어요... 주택 전세사기를 당했어요...주택 전세사기를 당했어요...주택 전세사기를 당했어요...',
    },
  ],
];

export const ConfirmConsultingRequest = () => {
  return (
    <Box flex="1" bg="white">
      <ConsultingManagementHeader category="신청 내역 확인하기" />
      <VStack mt="59px" pb="69px" justifyContent="center">
        <Flex gap="15px" mb="45px" w="883px">
          <Image src={roundCheck} />
          <Text fontWeight="bold" fontSize="30px" color="#373737">
            현재 2건의 상담 신청이 들어왔어요!
          </Text>
        </Flex>
        <Box>
          <Text fontSize="18px" fontWeight="bold" color="#979797" mb="17px">
            요청된 상담 내역
          </Text>
          {ConsultingInfo.map((record) => (
            <ConsultingRequestRecord
              key={record[1].content}
              infoList={record}
            />
          ))}
        </Box>
      </VStack>
    </Box>
  );
};

const ConsultingRequestRecord = ({
  infoList,
}: {
  infoList: ConsultingInfoItem[];
}) => {
  return (
    <VStack spacing={0} alignItems="flex-end" mb="68px">
      <ConsultingInfoBox infoList={infoList} />
      <Flex gap="34px" mt="15px">
        <BoomerangButton w="179px" h="51px" fontSize="22px" onClick={() => ''}>
          상담 확정하기
        </BoomerangButton>
        <Button
          width="133px"
          height="51px"
          borderRadius={5}
          bg="#FC5C7D"
          shadow="1px 1px 4px rgba(0, 0, 0, 0.25)"
          color={BoomerangColors.white}
          fontSize="22px"
          fontWeight="bold"
          onClick={() => ''}
          _hover={{}}
        >
          거절하기
        </Button>
      </Flex>
    </VStack>
  );
};
