import { Dispatch, SetStateAction, useState } from 'react';

import { BoomerangColors } from '@/utils/colors';
import { Button, Flex, IconButton, Textarea, VStack } from '@chakra-ui/react';
import Clip from '@images/clip2.svg?react';

interface ChatMessage {
  nickname: string;
  message: string;
}

interface ChatInputProps {
  messages: ChatMessage[];
  userNickname: string;
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  messages,
  setMessages,
  userNickname,
}) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    setMessages([...messages, { nickname: userNickname, message: newMessage }]);
    setNewMessage('');
  };

  return (
    <VStack
      w="100%"
      h="241px"
      bg={BoomerangColors.white}
      shadow="0px -1px 3.7px rgba(0, 0, 0, 0.25)"
      p="38px 55px 20px"
      justifyContent="space-between"
    >
      <Textarea
        h="115px"
        border="none"
        _focus={{
          boxShadow: 'none',
        }}
        placeholder="메시지 입력하기..."
        _placeholder={{
          color: '#BABABA',
          fontSize: '20px',
        }}
        resize="none"
        fontSize="20px"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (newMessage.trim()) {
              handleSend();
            }
          }
        }}
      />
      <Flex justifyContent="space-between" alignItems="center" w="100%">
        <IconButton
          icon={<Clip />}
          aria-label="파일첨부 버튼"
          bg="white"
          _hover={{ bg: '#F3F3F3' }}
        />
        <Button
          onClick={handleSend}
          bgColor={newMessage ? BoomerangColors.deepBlue : '#818181'}
          w="98px"
          h="47px"
          borderRadius={5}
          color={BoomerangColors.white}
          fontSize="24px"
          fontWeight={800}
          isDisabled={!newMessage}
        >
          전송
        </Button>
      </Flex>
    </VStack>
  );
};
