import {
  ConsultingInfoBox,
  ConsultingInfoItem,
} from '@/components/ConsultingManagement/ConsultingInfoBox';
import { Box, Text } from '@chakra-ui/react';
 
const ConsultingInfo: ConsultingInfoItem[] = [
  {
    consultation_date_time: '24/10/22 오후 3시~ 오후 4시',
    mentor_nick_name: '김땡땡',
    content:
      '주택 전세사기를 당했어요... 주택 전세사기를 당했어요...주택 전세사기를 당했어요...주택 전세사기를 당했어요...',
  },
  {
    consultation_date_time: '24/10/22 오후 3시~ 오후 4시',
    mentor_nick_name: '김땡땡',
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
      {ConsultingInfo.map((infoList) => (
        <ConsultingInfoBox infoList={infoList} />
      ))}
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
