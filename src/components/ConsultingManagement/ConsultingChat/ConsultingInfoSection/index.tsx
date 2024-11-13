import { ConsultingInfoBox } from '@/components/ConsultingManagement/ConsultingInfoBox';
import { Box, Text } from '@chakra-ui/react';

const ConsultingInfo = [
  {
    title: '상담 일정',
    content: '24/10/22 오후 3시~ 오후 4시',
  },
  {
    title: '멘토명',
    content: '김땡땡',
  },
  {
    title: '신청 내용',
    content:
      '주택 전세사기를 당했어요... 주택 전세사기를 당했어요...주택 전세사기를 당했어요...주택 전세사기를 당했어요...',
  },
];

export const ConsultingInfoSection = () => {
  return (
    <Box>
      <Text fontSize="18px" fontWeight="bold" color="#979797" mb="17px">
        신청된 상담 내역
      </Text>
      <ConsultingInfoBox infoList={ConsultingInfo} />
      <Text
        fontSize="15px"
        fontWeight="bold"
        color="#95AFFF"
        textAlign="right"
        mt="8px"
        mr="17px"
      >
        *신청된 상담 정보가 올바르게 입력되었는지 확인해주세요!
      </Text>
    </Box>
  );
};
