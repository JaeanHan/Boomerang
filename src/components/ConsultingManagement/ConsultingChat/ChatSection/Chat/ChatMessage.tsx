import { BoomerangColors } from '@/utils/colors';
import { Flex, Image, Text } from '@chakra-ui/react';
import mentorProfile from '@images/mentor_profile.svg';

export interface MessageProps {
  message: string;
  isMine: boolean;
  imgSrc?: string;
}

export const ChatMessage: React.FC<MessageProps> = ({
  message,
  isMine,
  imgSrc = mentorProfile,
}) => {
  return (
    <Flex
      zIndex={9}
      alignSelf={isMine ? 'flex-end' : 'flex-start'}
      gap="27px"
      alignItems="center"
    >
      {!isMine && <Image src={imgSrc} w="81px" h="81px" borderRadius={50} />}
      <Flex
        maxW="664px"
        h="fit-content"
        bg={isMine ? BoomerangColors.white : '#0963FF'}
        p="16px 38px"
        border="1px solid #4488FF"
        borderBottomRadius={50}
        borderTopLeftRadius={isMine ? 50 : 3}
        borderTopRightRadius={isMine ? 3 : 50}
      >
        <Text
          color={isMine ? '#242424' : '#FFF'}
          fontWeight="bold"
          fontSize="18px"
        >
          {message}
        </Text>
      </Flex>
    </Flex>
  );
};
