import { BoomerangColors } from '@/utils/colors';
import { Flex, Image, Text } from '@chakra-ui/react';
import mentorProfile from '@images/mentor_profile.svg';

export interface Message {
  message: string;
  isUser: boolean;
}

export const ChatMessage: React.FC<Message> = ({ message, isUser }) => (
  <Flex
    zIndex={99}
    alignSelf={isUser ? 'flex-end' : 'flex-start'}
    gap="27px"
    alignItems="center"
  >
    {!isUser && (
      <Image src={mentorProfile} w="81px" h="81px" borderRadius={50} />
    )}
    <Flex
      maxW="664px"
      h="fit-content"
      bg={isUser ? BoomerangColors.white : '#0963FF'}
      p="16px 38px"
      border="1px solid #4488FF"
      borderBottomRadius={50}
      borderTopLeftRadius={isUser ? 50 : 3}
      borderTopRightRadius={isUser ? 3 : 50}
    >
      <Text
        color={isUser ? '#242424' : '#FFF'}
        fontWeight="bold"
        fontSize="18px"
      >
        {message}
      </Text>
    </Flex>
  </Flex>
);
