import { RatingCardSection } from '@/components/ConsultingManagement/ConsultingChat/ChatSection/RatingCard';
import { BoomerangColors } from '@/utils/colors';
import { Text, VStack } from '@chakra-ui/react';

interface StatusType {
  status: 'PENDING' | 'ONGOING' | 'FINISHED';
}

export const ChatStatusBubble: React.FC<StatusType> = ({ status }) => {
  const chatStatus = {
    PENDING: '상담 시작 전입니다!',
    ONGOING: '상담이 시작되었습니다!',
    FINISHED: '상담이 종료되었습니다!',
  };

  return (
    <VStack>
      <VStack
        zIndex={9}
        bg="rgba(0, 0, 0, 0.65)"
        borderRadius={50}
        p="10px 40px"
        justifyContent="center"
        mb="47px"
      >
        <Text fontSize="17px" color={BoomerangColors.white} fontWeight="bold">
          {chatStatus[status]}
        </Text>
      </VStack>
      {status === 'FINISHED' && <RatingCardSection />}
    </VStack>
  );
};
