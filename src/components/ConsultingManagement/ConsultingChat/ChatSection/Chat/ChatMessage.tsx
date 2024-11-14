import { BoomerangColors } from '@/utils/colors';
import { Flex, Image, Text } from '@chakra-ui/react';
import mentorProfile from '@images/mentor_profile.svg';

export interface MessageProps {
  message: string;
  isMine: boolean;
  isMentor: boolean;
}

export const ChatMessage: React.FC<MessageProps> = ({
  message,
  isMine,
  isMentor,
}) => {
  return (
    <Flex
      zIndex={9}
      alignSelf={isMine ? 'flex-end' : 'flex-start'}
      gap="27px"
      alignItems="center"
    >
      {!isMine && (
        <Image src={mentorProfile} w="81px" h="81px" borderRadius={50} />
      )}
      <Flex
        maxW="664px"
        h="fit-content"
        bg={isMentor ? '#0963FF' : BoomerangColors.white}
        p="16px 38px"
        border="1px solid #4488FF"
        borderBottomRadius={50}
        borderTopLeftRadius={isMine ? 50 : 3}
        borderTopRightRadius={isMine ? 3 : 50}
      >
        <Text
          color={isMentor ? '#FFF' : '#242424'}
          fontWeight="bold"
          fontSize="18px"
        >
          {message}
        </Text>
      </Flex>
    </Flex>
  );
};
