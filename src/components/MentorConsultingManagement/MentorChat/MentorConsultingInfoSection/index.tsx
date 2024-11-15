import { useState } from 'react';

import {
  ConsultingInfoBox,
  ConsultingInfoItem,
} from '@/components/ConsultingManagement/ConsultingInfoBox';
import { BoomerangColors } from '@/utils/colors';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

const ConsultingInfo: ConsultingInfoItem = {
  consultation_date_time: '24/10/22 오후 3시~ 오후 4시',
  mentee_nick_name: '김땡땡',
  content:
    '주택 전세사기를 당했어요... 주택 전세사기를 당했어요...주택 전세사기를 당했어요...주택 전세사기를 당했어요...',
};

export const MentorConsultingInfoSection = () => {
  return (
    <Box>
      <Flex alignItems="flex-end" justifyContent="space-between" mb="17px">
        <Text fontSize="18px" fontWeight="bold" color="#979797">
          신청된 상담 정뵤
        </Text>
        <FinishButton />
      </Flex>
      <ConsultingInfoBox infoList={ConsultingInfo} />
    </Box>
  );
};

const FinishButton = () => {
  const [isProgress, setProgress] = useState(true);

  return (
    <Button
      width="182px"
      height="47px"
      borderRadius="5px"
      bg={isProgress ? '#FC5C7D' : '#828282'}
      shadow="1px 1px 4px rgba(0, 0, 0, 0.25)"
      color={BoomerangColors.white}
      fontSize="24px"
      fontWeight={800}
      //TODO: 상담종료 요청
      onClick={() => setProgress(false)}
      _hover={{}}
      isDisabled={!isProgress}
    >
      상담 종료하기
    </Button>
  );
};
