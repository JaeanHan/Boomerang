import { loadChatData } from '@apis/chat';

import { ChatMessage } from '@components/ConsultingManagement/ConsultingChat/ChatSection/Chat/ChatMessage';

import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ChatInput } from '@/components/ConsultingManagement/ConsultingChat/ChatSection/Chat/ChatInput';
import { ChatStatusBubble } from '@/components/ConsultingManagement/ConsultingChat/ChatSection/Chat/ChatStatusBubble';
import { useUserContext } from '@/pages/Login/userContext';
import { Box, Text, VStack } from '@chakra-ui/react';
import chatBgImg from '@images/chatBgImg.svg';
import { useSuspenseQuery } from '@tanstack/react-query';

export const ChatSection: React.FC<{
  id: number;
}> = ({ id }) => {
  const { user } = useUserContext();
  const { data } = useSuspenseQuery({
    queryFn: () => loadChatData(id),
    queryKey: [`chat-${id}`],
  });
  const {
    mentorProfileImage,
    menteeProfileImage,
    // consultationResponseDto,
    chatMessageResponseDtoPage,
    mentor,
  } = data;
  const { content } = chatMessageResponseDtoPage;

  const [messages, setMessages] = useState<
    {
      nickname: string;
      message: string;
    }[]
  >([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <VStack spacing={0}>
      <VStack
        position="relative"
        bgColor="#E5F2FF"
        w="1548px"
        minH="378px"
        flex="1"
        p="0 88px 27px"
        overflowY="auto"
        maxH="658px"
        ref={messagesEndRef}
      >
        <VStack flex="1" w="full">
          <ChatDate date="2024-10-22" />
          <ChatStatusBubble status="PENDING" />
          {content.map((chat) => {
            return (
              <ChatMessage
                key={chat.message}
                message={chat.message}
                isMine={chat.nickname === user?.nickname}
                imgSrc={mentor ? menteeProfileImage : mentorProfileImage}
              />
            );
          })}
          <ChatStatusBubble status="FINISHED" />
        </VStack>
        <Box
          w="100%"
          h={messagesEndRef.current?.scrollHeight}
          position="absolute"
          bgImage={chatBgImg}
          bgAttachment="scroll"
          bgRepeat="repeat-y"
          bgSize="auto"
        />
      </VStack>
      <ChatInput
        userNickname={user.nickname}
        messages={messages}
        setMessages={setMessages}
      />
    </VStack>
  );
};

export const ChatDate = ({ date }: { date: string }) => (
  <Text fontSize="15px" color="#7B7B7B" mt="17px">
    {date}
  </Text>
);
