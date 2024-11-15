import { useEffect, useRef, useState } from 'react';

import { ChatDate } from '@/components/ConsultingManagement/ConsultingChat/ChatSection';
import { ChatInput } from '@/components/ConsultingManagement/ConsultingChat/ChatSection/Chat/ChatInput';
import { ChatMessage } from '@/components/ConsultingManagement/ConsultingChat/ChatSection/Chat/ChatMessage';
import { ChatStatusBubble } from '@/components/ConsultingManagement/ConsultingChat/ChatSection/Chat/ChatStatusBubble';
import { Box, VStack } from '@chakra-ui/react';
import chatBgImg from '@images/chatBgImg.svg';

export const MentorChatSection = () => {
  const [messages, setMessages] = useState([
    {
      nickname: '멘토1',
      message:
        '고객님, 신청해주신 상담내역을 확인했습니다! 상담을 시작하겠습니다.',
    },
    {
      nickname: '멘티11',
      message:
        '안녕하세요, 다른 아니라 주택 전세 사기에 관하여 질문드릴 게 있는데요, 제가.... 어쩌고 저쩌고 때문에 지금 너무 힘들어요. 보통 이런 경우는 어떻게 대처해야 하나요? 부탁드릴게요',
    },
    {
      nickname: '멘토1',
      message: '현재, 그런 상황이시군요. 비슷한 사례로는 ...',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  //임시
  const myNickname = '멘토1';

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

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
          {messages.map((msg) => {
            const isMine = msg.nickname === myNickname;
            // const isMentor = isMine;
            return (
              <ChatMessage
                key={msg.message}
                message={msg.message}
                isMine={isMine}
              />
            );
          })}
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
        messages={messages}
        setMessages={setMessages}
        userNickname={myNickname}
      />
    </VStack>
  );
};
